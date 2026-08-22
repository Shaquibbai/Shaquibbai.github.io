import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Terminal, Play } from 'lucide-react';

export default function IntroScreen({ onComplete }) {
  const [lines, setLines] = useState([]);
  const [progress, setProgress] = useState(0);

  console.log('[INTRO] Rendering IntroScreen component...');

  // Store onComplete in a ref so the effect never needs to restart
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Track completion state
  const completedRef = useRef(false);

  const finishIntro = useCallback(() => {
    console.log('[INTRO] finishIntro called! completedRef.current:', completedRef.current);
    if (!completedRef.current) {
      completedRef.current = true;
      if (typeof onCompleteRef.current === 'function') {
        console.log('[INTRO] Calling onCompleteRef.current()...');
        onCompleteRef.current();
      }
    }
  }, []);

  useEffect(() => {
    console.log('[INTRO] useEffect started in IntroScreen');

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      console.log('[INTRO] prefers-reduced-motion active, calling finishIntro() immediately.');
      finishIntro();
      return;
    }

    const bootSequence = [
      { text: '> INITIALIZING...', delay: 200 },
      { text: '> SHAQUIB_WASIF.EXE', delay: 600 },
      { text: '> loading memories...', delay: 1200 },
      { text: '> loading unfinished projects...', delay: 1800 },
      { text: '> loading questionable decisions...', delay: 2400 },
      { text: '> SYSTEM READY', delay: 3000 }
    ];

    const timeouts = [];

    bootSequence.forEach((item) => {
      const t = setTimeout(() => {
        setLines((prev) => [...prev, item.text]);
      }, item.delay);
      timeouts.push(t);
    });

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 5;
      });
    }, 160);

    console.log('[INTRO] Scheduling autoFinish timeout for 3500ms...');
    const autoFinish = setTimeout(() => {
      console.log('[INTRO] 3500ms autoFinish timer fired! Calling finishIntro()...');
      finishIntro();
    }, 3500);

    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        console.log('[INTRO] Key pressed:', e.key);
        finishIntro();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      console.log('[INTRO] useEffect cleanup executing. Unmounting IntroScreen.');
      timeouts.forEach(clearTimeout);
      clearInterval(progressInterval);
      clearTimeout(autoFinish);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [finishIntro]);

  return (
    <div className="modal-backdrop" style={{ background: 'var(--bg-primary)', zIndex: 9999 }}>
      <div 
        className="modal-content animate-fade-in" 
        style={{ width: '100%', maxWidth: '580px', fontFamily: 'var(--font-mono)' }}
        onClick={finishIntro}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-dim)', paddingBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-crimson)' }}>
            <Terminal size={18} />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em' }}>BOOT_SEQUENCE // v2.0</span>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); finishIntro(); }}
            className="btn btn-ghost-dark" 
            style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
          >
            SKIP [ESC]
          </button>
        </div>

        <div style={{ minHeight: '150px', display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
          {lines.map((line, idx) => (
            <div key={idx} style={{ color: line.includes('questionable') ? 'var(--status-progress)' : line.includes('READY') ? 'var(--accent-crimson)' : 'inherit' }}>
              {line}
            </div>
          ))}
        </div>

        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ height: '4px', background: 'var(--bg-primary)', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: 'var(--accent-crimson)', transition: 'width 0.16s linear' }}></div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <span>INITIALIZATION: {progress}%</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--accent-crimson)' }}>
              CLICK OR PRESS ENTER <Play size={12} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
