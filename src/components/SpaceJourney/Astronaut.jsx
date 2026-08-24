import React from 'react';

export default function Astronaut({ className = '', style = {}, rotation = 0, onClick }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (onClick) onClick();
    }
  };

  return (
    <button 
      type="button"
      className={`astronaut-wrapper astronaut-button ${className}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label="Return to top"
      tabIndex={0}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        background: 'transparent',
        border: 'none',
        padding: '8px',
        margin: '-8px',
        cursor: 'pointer',
        outline: 'none',
        transform: `rotate(${rotation}deg)`,
        transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), filter 0.2s ease',
        ...style
      }}
    >
      <svg 
        width="42" 
        height="50" 
        viewBox="0 0 38 46" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="astronaut-svg"
      >
        <defs>
          <linearGradient id="astroSuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#d1d5db" />
            <stop offset="100%" stopColor="#9ca3af" />
          </linearGradient>

          <linearGradient id="astroVisorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="70%" stopColor="#881337" />
            <stop offset="100%" stopColor="#e11d48" />
          </linearGradient>

          <linearGradient id="astroPackGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6b7280" />
            <stop offset="100%" stopColor="#374151" />
          </linearGradient>
        </defs>

        {/* Life Support Backpack */}
        <rect x="5" y="14" width="7" height="18" rx="2" fill="url(#astroPackGrad)" stroke="#1f2937" strokeWidth="0.8" />

        {/* Left Arm (Floating outward) */}
        <path d="M 12 18 C 8 20 6 25 8 28" stroke="url(#astroSuitGrad)" strokeWidth="4" strokeLinecap="round" />
        <circle cx="8" cy="28" r="2.2" fill="#6b7280" />

        {/* Left Leg */}
        <path d="M 16 33 C 14 37 13 41 12 43" stroke="url(#astroSuitGrad)" strokeWidth="4.5" strokeLinecap="round" />
        <ellipse cx="11.5" cy="43.5" rx="2.5" ry="1.8" fill="#374151" />

        {/* Right Leg */}
        <path d="M 23 33 C 25 37 26 41 27 43" stroke="url(#astroSuitGrad)" strokeWidth="4.5" strokeLinecap="round" />
        <ellipse cx="27.5" cy="43.5" rx="2.5" ry="1.8" fill="#374151" />

        {/* Torso / Spacesuit Body */}
        <rect x="12" y="16" width="15" height="18" rx="5" fill="url(#astroSuitGrad)" stroke="#374151" strokeWidth="1" />

        {/* Chest Utility Badge */}
        <rect x="16" y="20" width="7" height="4" rx="1" fill="#1f2937" />
        <circle cx="18" cy="22" r="0.8" fill="#e11d48" />
        <circle cx="21" cy="22" r="0.8" fill="#10b981" />

        {/* Safety Belt / Harness Ring */}
        <path d="M 12 28 H 27" stroke="#4b5563" strokeWidth="1.5" />
        <circle cx="19.5" cy="28" r="1.5" fill="#fb7185" />

        {/* Right Arm (Floating forward/up) */}
        <path d="M 27 18 C 31 20 33 22 32 26" stroke="url(#astroSuitGrad)" strokeWidth="4" strokeLinecap="round" />
        <circle cx="32" cy="26" r="2.2" fill="#6b7280" />

        {/* Helmet Outer Shell */}
        <circle cx="19.5" cy="11.5" r="9" fill="url(#astroSuitGrad)" stroke="#374151" strokeWidth="1" />

        {/* Helmet Visor */}
        <ellipse cx="20.5" cy="11.5" rx="6.5" ry="5.5" fill="url(#astroVisorGrad)" stroke="#0f172a" strokeWidth="0.8" />
        
        {/* Visor Glint Reflection */}
        <path d="M 17 9 C 19 7.5 22 7.5 24 8.5" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" opacity="0.8" className="astro-visor-glint" />
      </svg>
    </button>
  );
}
