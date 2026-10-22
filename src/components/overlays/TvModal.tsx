import React, { useEffect, useRef, useState, useCallback } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { tx, esc } from '../../utils/svgHelpers';
import { TvChannel } from '../../types/portfolio';

interface TvModalProps {
  isOpen: boolean;
  onClose: () => void;
  channel: number;
  onChannelChange: (ch: number) => void;
}

export const TvModal: React.FC<TvModalProps> = ({
  isOpen,
  onClose,
  channel,
  onChannelChange
}) => {
  const [currentCh, setCurrentCh] = useState<number | 'card'>(channel);
  const [isStatic, setIsStatic] = useState<boolean>(false);
  const [showOsd, setShowOsd] = useState<boolean>(false);
  const [osdText, setOsdText] = useState<string>('');
  const [isWarm, setIsWarm] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const staticTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const osdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tuneTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isReducedMotion = useRef(
    typeof window !== 'undefined' &&
      (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false)
  );

  // CRT Static noise simulation
  const triggerStatic = useCallback((ms: number) => {
    if (isReducedMotion.current) {
      setIsStatic(false);
      return;
    }

    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    setIsStatic(true);
    if (staticTimerRef.current) clearInterval(staticTimerRef.current);

    const w = cv.width;
    const h = cv.height;
    const t0 = performance.now();

    const frame = () => {
      const id = ctx.createImageData(w, h);
      const d = id.data;
      for (let j = 0; j < d.length; j += 4) {
        const v = (Math.random() * 255) | 0;
        d[j] = d[j + 1] = d[j + 2] = v;
        d[j + 3] = 255;
      }
      ctx.putImageData(id, 0, 0);

      if (performance.now() - t0 > ms) {
        if (staticTimerRef.current) clearInterval(staticTimerRef.current);
        setIsStatic(false);
      }
    };

    frame();
    staticTimerRef.current = setInterval(frame, 55);
  }, []);

  // Tune to a specific channel
  const tune = useCallback(
    (target: number | 'card', quiet = false) => {
      const n = PORTFOLIO_DATA.CHANNELS.length;
      let targetCh = target;
      if (targetCh !== 'card') {
        targetCh = (targetCh + n) % n;
      }

      const showOsdNotice = (chVal: number | 'card') => {
        setOsdText(chVal === 'card' ? '--' : chVal === 0 ? 'CH 00' : `CH ${String(chVal).padStart(2, '0')}`);
        setShowOsd(true);
        if (osdTimerRef.current) clearTimeout(osdTimerRef.current);
        osdTimerRef.current = setTimeout(() => {
          setShowOsd(false);
        }, 1400);
      };

      if (quiet || isReducedMotion.current) {
        setCurrentCh(targetCh);
        if (typeof targetCh === 'number') {
          onChannelChange(targetCh);
        }
        showOsdNotice(targetCh);
        return;
      }

      triggerStatic(420);
      showOsdNotice(targetCh);

      if (tuneTimerRef.current) clearTimeout(tuneTimerRef.current);
      tuneTimerRef.current = setTimeout(() => {
        setCurrentCh(targetCh);
        if (typeof targetCh === 'number') {
          onChannelChange(targetCh);
        }
      }, 180);
    },
    [onChannelChange, triggerStatic]
  );

  // Initialize TV power on when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsWarm(true);
      setCurrentCh(channel);
      triggerStatic(500);

      setOsdText(channel === 0 ? 'CH 00' : `CH ${String(channel).padStart(2, '0')}`);
      setShowOsd(true);
      if (osdTimerRef.current) clearTimeout(osdTimerRef.current);
      osdTimerRef.current = setTimeout(() => {
        setShowOsd(false);
      }, 1400);

      const focusTimer = setTimeout(() => {
        closeBtnRef.current?.focus({ preventScroll: true });
      }, 80);

      return () => clearTimeout(focusTimer);
    } else {
      setIsWarm(false);
      if (staticTimerRef.current) clearInterval(staticTimerRef.current);
      if (osdTimerRef.current) clearTimeout(osdTimerRef.current);
      if (tuneTimerRef.current) clearTimeout(tuneTimerRef.current);
    }
  }, [channel, isOpen, triggerStatic]);

  // Keyboard navigation inside TV
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      const curNum = typeof currentCh === 'number' ? currentCh : 0;

      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        e.preventDefault();
        tune(curNum - 1);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        e.preventDefault();
        tune(curNum + 1);
      } else if (e.key >= '0' && e.key <= '5') {
        e.preventDefault();
        tune(parseInt(e.key, 10));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentCh, isOpen, onClose, tune]);

  if (!isOpen) return null;

  const currentChannelObj: TvChannel | undefined =
    typeof currentCh === 'number' ? PORTFOLIO_DATA.CHANNELS[currentCh] : undefined;

  const renderChannelContent = () => {
    if (currentCh === 'card') {
      return (
        <div className="chan c-card" id="chanEl">
          <div>
            {PORTFOLIO_DATA.CARD.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </div>
        </div>
      );
    }

    if (!currentChannelObj) return null;

    switch (currentChannelObj.face) {
      case 'games':
        return (
          <div className="chan c-games" id="chanEl">
            <h4>{currentChannelObj.head}</h4>
            <ul style={{ margin: 0, padding: 0 }}>
              {currentChannelObj.lines?.map((l, idx) => (
                <li key={idx} dangerouslySetInnerHTML={{ __html: tx(l) }} />
              ))}
            </ul>
            {currentChannelObj.air && (
              <p
                style={{
                  margin: '16px 0 0',
                  font: '400 clamp(12px, 1.8vw, 15px)/1.6 var(--mono)',
                  color: '#7fffd0'
                }}
              >
                <span className="blink">●</span> {currentChannelObj.air.label}:{' '}
                <a
                  href={currentChannelObj.air.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#7fffd0', textDecoration: 'underline' }}
                >
                  {currentChannelObj.air.text}
                </a>
              </p>
            )}
            {currentChannelObj.foot && (
              <p
                className="blink"
                style={{
                  margin: '18px 0 0',
                  font: '400 11px var(--mono)',
                  color: '#ffd78a',
                  letterSpacing: '.2em',
                  textTransform: 'uppercase'
                }}
              >
                {currentChannelObj.foot}
              </p>
            )}
          </div>
        );

      case 'dev':
        return (
          <div className="chan c-dev" id="chanEl">
            <div className="tree">
              <b>{currentChannelObj.head}</b>
              <br />
              {currentChannelObj.tree?.map((t, idx) => {
                const indented = t.replace(/^(\s+)/, (m) => m.replace(/ /g, '\u00A0'));
                return (
                  <React.Fragment key={idx}>
                    <span dangerouslySetInnerHTML={{ __html: tx(indented) }} />
                    <br />
                  </React.Fragment>
                );
              })}
            </div>
            <div className="insp">
              <b>Inspector</b>
              <br />
              {currentChannelObj.insp?.map((item, idx) => (
                <React.Fragment key={idx}>
                  <span dangerouslySetInnerHTML={{ __html: tx(item) }} />
                  <br />
                </React.Fragment>
              ))}
            </div>
          </div>
        );

      case 'anime':
        return (
          <div className="chan c-anime" id="chanEl">
            <div className="bar" />
            <div className="mid">
              <span className="jp">{currentChannelObj.jp}</span>
              <h4 dangerouslySetInnerHTML={{ __html: tx(currentChannelObj.head) }} />
              <p dangerouslySetInnerHTML={{ __html: tx(currentChannelObj.body || '') }} />
            </div>
            <div className="tick">
              <span dangerouslySetInnerHTML={{ __html: tx(currentChannelObj.ticker || '') }} />
            </div>
            <div className="bar" />
          </div>
        );

      case 'stories':
        return (
          <div className="chan c-stories" id="chanEl">
            <div className="hd">
              <span>{currentChannelObj.head}</span>
              <span>{currentChannelObj.page}</span>
            </div>
            <h4>CONTENTS</h4>
            <ul style={{ margin: 0, padding: 0 }}>
              {currentChannelObj.items?.map((it, idx) => (
                <li key={idx}>
                  <span dangerouslySetInnerHTML={{ __html: tx(it[0]) }} />
                  <b>{it[1]}</b>
                </li>
              ))}
            </ul>
          </div>
        );

      case 'tech':
        return (
          <div className="chan c-tech" id="chanEl">
            <h4>{currentChannelObj.head}</h4>
            {currentChannelObj.lines?.map((l, idx) => (
              <p key={idx} dangerouslySetInnerHTML={{ __html: '&gt; ' + tx(l) }} />
            ))}
            <p className="cur">&gt; </p>
          </div>
        );

      case 'comedy':
        return (
          <div className="chan c-comedy" id="chanEl" style={{ padding: '8px 12px' }}>
            <h4 style={{ color: '#ffd78a', margin: '0 0 14px', fontFamily: 'var(--eng)', letterSpacing: '1px' }}>
              {currentChannelObj.head}
            </h4>
            {currentChannelObj.lines?.map((l, idx) => (
              <p
                key={idx}
                style={{
                  margin: '0 0 12px',
                  lineHeight: 1.6,
                  color: '#f5efe0',
                  fontStyle: 'italic',
                  fontSize: 'clamp(12px, 1.6vw, 14px)'
                }}
                dangerouslySetInnerHTML={{ __html: tx(l) }}
              />
            ))}
          </div>
        );

      case 'mystery':
        return (
          <div className="chan c-mystery" id="chanEl" style={{ padding: '8px 12px' }}>
            <h4 style={{ color: '#ff9e80', margin: '0 0 12px', fontFamily: 'var(--eng)', letterSpacing: '1.2px' }}>
              {currentChannelObj.head}
            </h4>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px 14px', borderLeft: '3px solid #ff9e80' }}>
              {currentChannelObj.lines?.map((l, idx) => (
                <p
                  key={idx}
                  style={{
                    margin: '0 0 8px',
                    lineHeight: 1.6,
                    color: '#e8dcca',
                    fontSize: 'clamp(11.5px, 1.5vw, 13.5px)'
                  }}
                  dangerouslySetInnerHTML={{ __html: tx(l) }}
                />
              ))}
            </div>
          </div>
        );

      case 'cctv':
        return (
          <div
            className="chan c-cctv"
            id="chanEl"
            style={{
              padding: '8px 10px',
              color: '#8fe0a2',
              fontFamily: 'var(--mono)',
              fontSize: 'clamp(11px, 1.5vw, 13px)',
              lineHeight: 1.6
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(143,224,162,0.4)',
                paddingBottom: '5px',
                marginBottom: '10px',
                fontSize: '11px',
                letterSpacing: '.1em'
              }}
            >
              <span>REC <span className="blink">●</span> 03:42:18</span>
              <span>{currentChannelObj.head}</span>
            </div>
            <p style={{ margin: '0 0 10px', color: '#caffd8', fontWeight: 600 }}>
              [SURVEILLANCE FEED: SECTOR 01 — SKIRTING BOARD]
            </p>
            <ul style={{ margin: 0, paddingLeft: '16px' }}>
              {currentChannelObj.lines?.map((l, idx) => (
                <li key={idx} style={{ marginBottom: '6px' }} dangerouslySetInnerHTML={{ __html: tx(l) }} />
              ))}
            </ul>
            <p
              style={{
                margin: '14px 0 0',
                opacity: 0.8,
                fontSize: '11px',
                borderTop: '1px dashed rgba(143,224,162,0.35)',
                paddingTop: '6px',
                color: '#ffd78a'
              }}
            >
              {currentChannelObj.foot}
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  const currentChNum = typeof currentCh === 'number' ? currentCh : 0;

  return (
    <div
      id="tv"
      role="dialog"
      aria-modal="true"
      aria-label="Vintage CRT Television"
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.dataset.tvclose === '1') {
          onClose();
        }
      }}
    >
      <div className="scr" data-tvclose="1" />
      <div className="set">
        <button
          type="button"
          id="tvClose"
          data-tvclose="1"
          ref={closeBtnRef}
          aria-label="Close television"
        >
          Close <kbd style={{ font: 'inherit', border: '1px solid currentColor', padding: '1px 5px', opacity: 0.6 }}>Esc</kbd>
        </button>

        <div className="shell">
          <div className={`glass ${isWarm ? 'warm' : ''}`} id="tvGlass">
            <div className={`osd ${showOsd ? 'show' : ''}`} id="tvOsd" aria-hidden="true">
              {osdText}
            </div>

            <canvas
              ref={canvasRef}
              id="tvCv"
              width={128}
              height={96}
              className={isStatic ? 'on' : ''}
              style={{ imageRendering: 'pixelated' }}
            />

            <div className="chan roll" key={String(currentCh)}>
              {renderChannelContent()}
            </div>
          </div>

          <div className="deck" id="tvDeck">
            <span className="led" title="power" />
            <button
              type="button"
              aria-label="Previous channel"
              onClick={() => tune(currentChNum - 1)}
            >
              Ch −
            </button>

            <div className="num">
              {PORTFOLIO_DATA.CHANNELS.map((c, k) => (
                <button
                  key={c.id}
                  type="button"
                  className={currentCh === k ? 'on' : ''}
                  aria-label={esc(c.name)}
                  onClick={() => tune(k)}
                >
                  {k === 0 ? '0' : k}
                </button>
              ))}
            </div>

            <button
              type="button"
              aria-label="Next channel"
              onClick={() => tune(currentChNum + 1)}
            >
              Ch +
            </button>

            <span className="nm" id="tvName" aria-live="polite">
              {currentCh === 'card'
                ? 'Test card'
                : PORTFOLIO_DATA.CHANNELS[currentCh]?.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TvModal;
