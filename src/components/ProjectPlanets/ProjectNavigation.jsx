import React from 'react';
import { ChevronLeft, ChevronRight, Navigation } from 'lucide-react';

export default function ProjectNavigation({ 
  projects, 
  activeIndex, 
  onNavigatePrev, 
  onNavigateNext,
  onSelectProject 
}) {
  const currentProject = projects[activeIndex];

  return (
    <div 
      className="project-nav-bar"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.75rem 1.25rem',
        background: 'rgba(13, 6, 9, 0.75)',
        backdropFilter: 'blur(12px)',
        border: '1px solid var(--border-dim)',
        borderRadius: 'var(--radius-md)',
        maxWidth: '680px',
        margin: '2rem auto 0 auto',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)'
      }}
    >
      {/* Flight Control Previous */}
      <button
        type="button"
        className="btn btn-ghost-dark"
        onClick={onNavigatePrev}
        aria-label="Navigate rocket to previous project planet"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.825rem',
          fontFamily: 'var(--font-mono)',
          padding: '0.4rem 0.8rem'
        }}
      >
        <ChevronLeft size={16} /> PREV SYSTEM
      </button>

      {/* Current Destination Status Indicator */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          textAlign: 'center'
        }}
      >
        <Navigation size={14} className="text-crimson animate-pulse" />
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          <span className="text-crimson" style={{ fontWeight: 600 }}>
            DESTINATION [{activeIndex + 1}/{projects.length}]:
          </span>{' '}
          <strong style={{ color: 'var(--text-primary)' }}>{currentProject?.title}</strong>
        </div>
      </div>

      {/* Flight Control Next */}
      <button
        type="button"
        className="btn btn-ghost-dark"
        onClick={onNavigateNext}
        aria-label="Navigate rocket to next project planet"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.825rem',
          fontFamily: 'var(--font-mono)',
          padding: '0.4rem 0.8rem'
        }}
      >
        NEXT SYSTEM <ChevronRight size={16} />
      </button>
    </div>
  );
}
