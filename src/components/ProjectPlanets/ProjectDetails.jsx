import React, { useEffect } from 'react';
import { ExternalLink, Github, X } from 'lucide-react';

export default function ProjectDetails({ project, onClose, isClosing }) {
  if (!project) return null;

  const { title, summary, details, tech, githubUrl, demoUrl, status, category } = project;
  const isLearning = category === 'learning';

  // ESC Key listener to trigger smooth circular portal collapse
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div 
      className={`portal-overlay-container ${isClosing ? 'portal-closing' : 'portal-opening'}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(5, 2, 4, 0.72)',
        backdropFilter: 'blur(12px)',
        padding: '1rem',
        boxSizing: 'border-box'
      }}
    >
      {/* Large Circular Space Portal Container */}
      <div 
        className="circular-portal-body"
        style={{
          position: 'relative',
          width: '620px',
          height: '620px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 50% 40%, rgba(25, 12, 18, 0.96) 0%, rgba(13, 6, 9, 0.97) 65%, rgba(5, 2, 4, 0.99) 100%)',
          border: '1px solid rgba(225, 29, 72, 0.5)',
          boxShadow: '0 0 60px rgba(225, 29, 72, 0.35), inset 0 0 50px rgba(0, 0, 0, 0.88)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '3rem 3.5rem',
          boxSizing: 'border-box',
          textAlign: 'center',
          overflow: 'hidden'
        }}
      >
        {/* Subtle Close '×' Icon inside Portal (Upper Area) */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Circular Space Portal"
          title="Close Portal (ESC)"
          className="portal-close-btn font-mono"
          style={{
            position: 'absolute',
            top: '2.2rem',
            right: '50%',
            transform: 'translateX(50%)',
            background: 'rgba(13, 6, 9, 0.85)',
            border: '1px solid rgba(225, 29, 72, 0.4)',
            color: 'var(--text-muted)',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.25s ease',
            zIndex: 10
          }}
        >
          <X size={16} />
        </button>

        {/* Content Container Contained Comfortably Inside Circle */}
        <div 
          style={{
            width: '100%',
            maxHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '1rem'
          }}
        >
          {/* Project Status Badge */}
          <span 
            className="badge-status font-mono"
            style={{
              fontSize: '0.72rem',
              padding: '0.2rem 0.65rem',
              background: isLearning ? 'rgba(75, 85, 99, 0.35)' : 'rgba(225, 29, 72, 0.3)',
              border: `1px solid ${isLearning ? 'rgba(156, 163, 175, 0.5)' : 'rgba(225, 29, 72, 0.55)'}`,
              color: isLearning ? '#e5e7eb' : '#fb7185',
              borderRadius: '4px',
              marginBottom: '0.5rem',
              letterSpacing: '0.04em'
            }}
          >
            {isLearning ? 'CLASS PROJECT / LEARNING PROJECT' : status}
          </span>

          {/* Project Title */}
          <h2 
            className="font-display"
            style={{ 
              fontSize: '2.4rem', 
              color: 'var(--text-primary)',
              margin: '0 0 0.6rem 0',
              letterSpacing: '0.02em',
              lineHeight: 1.15,
              textShadow: '0 0 20px rgba(225, 29, 72, 0.35)'
            }}
          >
            {title}
          </h2>

          {/* Orbiting Technology Satellite Chips */}
          <div 
            style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              justifyContent: 'center', 
              gap: '0.4rem', 
              marginBottom: '1rem' 
            }}
          >
            {tech && tech.map((tName) => (
              <span 
                key={tName}
                className="font-mono"
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-primary)',
                  background: 'rgba(13, 6, 9, 0.8)',
                  border: '1px solid rgba(225, 29, 72, 0.35)',
                  padding: '0.2rem 0.55rem',
                  borderRadius: '10px'
                }}
              >
                ◆ {tName}
              </span>
            ))}
          </div>

          {/* Project Summary Description */}
          <p 
            style={{ 
              fontSize: '0.925rem', 
              lineHeight: '1.55', 
              color: 'var(--text-secondary)',
              maxWidth: '460px',
              margin: '0 0 1rem 0'
            }}
          >
            {summary}
          </p>

          {/* Key Bullet Highlights */}
          {details && details.length > 0 && (
            <ul 
              style={{ 
                listStyle: 'none', 
                padding: 0, 
                margin: '0 0 1.25rem 0', 
                textAlign: 'left',
                maxWidth: '440px',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem'
              }}
            >
              {details.map((point, idx) => (
                <li 
                  key={idx}
                  style={{
                    fontSize: '0.825rem',
                    color: 'var(--text-muted)',
                    lineHeight: '1.45',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.4rem'
                  }}
                >
                  <span style={{ color: 'var(--accent-crimson)', fontSize: '0.7rem', marginTop: '0.15rem' }}>◆</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Repository Action Link */}
          <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center' }}>
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary font-mono"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.78rem',
                  padding: '0.45rem 0.9rem'
                }}
              >
                <Github size={15} /> REPOSITORY
              </a>
            )}

            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary font-mono"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.78rem',
                  padding: '0.45rem 0.9rem'
                }}
              >
                <ExternalLink size={15} /> LIVE DEMO
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
