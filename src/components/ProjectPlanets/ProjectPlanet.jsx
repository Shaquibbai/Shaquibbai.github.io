import React from 'react';

export default function ProjectPlanet({ project, onClickPlanet }) {
  if (!project) return null;

  const { title, image } = project;

  return (
    <div 
      className="project-lunar-planet-wrapper"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10
      }}
    >
      {/* Project Screenshot Transformed into a Celestial Moon Surface */}
      <button
        type="button"
        className="lunar-planet-sphere"
        onClick={() => onClickPlanet(project)}
        aria-label={`Inspect ${title} project details`}
        title={`Click ${title} moon to view details`}
        style={{
          width: '190px',
          height: '190px',
          borderRadius: '50%',
          position: 'relative',
          background: '#0d0609',
          border: 'none',
          boxShadow: '0 0 35px rgba(225, 29, 72, 0.25), 0 12px 28px rgba(0, 0, 0, 0.85)',
          cursor: 'pointer',
          outline: 'none',
          padding: 0,
          overflow: 'hidden',
          transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease'
        }}
      >
        {/* 1. Base Project Screenshot Image as Moon Surface */}
        {image ? (
          <img
            src={image}
            alt={`${title} project surface`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '50%',
              clipPath: 'circle(49.5% at 50% 50%)',
              display: 'block',
              pointerEvents: 'none',
              userSelect: 'none',
              filter: 'brightness(0.9) contrast(1.08) saturate(0.95)'
            }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', background: '#374151', borderRadius: '50%' }} />
        )}

        {/* 2. Organic Crater & Surface Texture Overlay */}
        <svg
          viewBox="0 0 200 200"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            mixBlendMode: 'overlay',
            opacity: 0.45
          }}
        >
          {/* Subtle Craters & Surface Formations */}
          <circle cx="65" cy="55" r="14" fill="#000000" opacity="0.5" />
          <circle cx="66" cy="56" r="13.5" fill="none" stroke="#ffffff" strokeWidth="0.8" opacity="0.6" />
          
          <circle cx="140" cy="120" r="22" fill="#000000" opacity="0.45" />
          <circle cx="141" cy="121" r="21.5" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.5" />
          <circle cx="140" cy="120" r="4" fill="#ffffff" opacity="0.6" />

          <circle cx="130" cy="50" r="10" fill="#000000" opacity="0.4" />
          <circle cx="80" cy="145" r="12" fill="#000000" opacity="0.4" />
          
          <path d="M 40,80 Q 90,70 150,110 Q 120,160 50,130 Z" fill="#000000" opacity="0.2" filter="blur(3px)" />
        </svg>

        {/* 3. Spherical 3D Lighting & Dark Limb Shadow Overlay (Light from Top-Right) */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 75% 25%, rgba(255, 255, 255, 0.18) 0%, transparent 40%), radial-gradient(circle at 82% 82%, rgba(13, 6, 9, 0.92) 0%, rgba(13, 6, 9, 0.5) 55%, transparent 80%)',
            pointerEvents: 'none'
          }}
        />

        {/* 4. Outer Edge Spherical Shading & Atmosphere Rim */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            boxShadow: 'inset 0 0 24px rgba(5, 2, 4, 0.85), inset -10px -10px 30px rgba(13, 6, 9, 0.95)',
            pointerEvents: 'none'
          }}
        />
      </button>
    </div>
  );
}
