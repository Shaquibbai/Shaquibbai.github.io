import React from 'react';

export default function ProjectMoon({ name, xOffset, yOffset, color }) {
  return (
    <div
      className="project-tech-satellite"
      style={{
        position: 'absolute',
        left: `calc(50% + ${xOffset}px)`,
        top: `calc(50% + ${yOffset}px)`,
        transform: 'translate(-50%, -50%)',
        zIndex: yOffset > 0 ? 15 : 5,
        pointerEvents: 'auto',
        userSelect: 'none'
      }}
    >
      <div
        className="font-mono tech-satellite-label"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.35rem',
          fontSize: '0.8rem',
          color: 'var(--text-secondary)',
          background: 'rgba(13, 6, 9, 0.82)',
          border: '1px solid rgba(156, 163, 175, 0.22)',
          padding: '0.25rem 0.65rem',
          borderRadius: '12px',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.45)',
          transition: 'border-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease',
          whiteSpace: 'nowrap'
        }}
      >
        <span 
          style={{ 
            color: color || '#fb7185',
            fontSize: '0.6rem',
            lineHeight: 1 
          }}
        >
          ◆
        </span>
        <span style={{ color: 'var(--text-primary)' }}>{name}</span>
      </div>
    </div>
  );
}
