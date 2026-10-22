import React from 'react';

interface CameraControlsProps {
  mode: 'outside' | 'floor';
  canPanLeft: boolean;
  canPanRight: boolean;
  miniLeftPct: number;
  miniWidthPct: number;
  showMini: boolean;
  onPanLeft: () => void;
  onPanRight: () => void;
  onMiniClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  onOpenThings: () => void;
  onOpenContact: () => void;
  onOpenPlain: () => void;
}

export const CameraControls: React.FC<CameraControlsProps> = ({
  mode,
  canPanLeft,
  canPanRight,
  miniLeftPct,
  miniWidthPct,
  showMini,
  onPanLeft,
  onPanRight,
  onMiniClick,
  onOpenThings
}) => {
  if (mode === 'outside') return null;

  return (
    <>
      <button
        type="button"
        className={`pan ${!canPanLeft ? 'off' : ''}`}
        id="panL"
        aria-label="Look left"
        onClick={onPanLeft}
      >
        <svg viewBox="0 0 16 16">
          <path d="M10 2L4 8l6 6" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </button>

      <button
        type="button"
        className={`pan ${!canPanRight ? 'off' : ''}`}
        id="panR"
        aria-label="Look right"
        onClick={onPanRight}
      >
        <svg viewBox="0 0 16 16">
          <path d="M6 2l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </button>

      <div id="bar">
        <div
          id="mini"
          className={!showMini ? 'off' : ''}
          role="presentation"
          aria-hidden="true"
          onClick={onMiniClick}
        >
          <i
            style={{
              left: `${miniLeftPct}%`,
              width: `${miniWidthPct}%`
            }}
          />
        </div>
      </div>

      <button
        type="button"
        id="thingsBtn"
        aria-haspopup="dialog"
        aria-label="Things on this floor (press T)"
        onClick={onOpenThings}
      >
        Things here <span className="desk" aria-hidden="true">·&nbsp;T</span>
      </button>
    </>
  );
};
