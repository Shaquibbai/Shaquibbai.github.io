import React, { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, Clock } from 'lucide-react';

export default function QuestModal({ quest, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!quest) return null;

  const isCompleted = quest.status === 'COMPLETED';

  return (
    <div className="modal-backdrop" onClick={onClose} aria-modal="true" role="dialog">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        {/* Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <span className="font-mono text-crimson" style={{ fontSize: '0.8rem', letterSpacing: '0.1em' }}>
              {quest.code}
            </span>
            <span className={`badge-status ${isCompleted ? 'badge-completed' : 'badge-progress'}`}>
              {isCompleted ? <CheckCircle2 size={12} /> : <Clock size={12} />}
              {quest.status}
            </span>
          </div>

          <h2 className="font-display" style={{ fontSize: '1.85rem', color: 'var(--text-primary)' }}>
            {quest.title}
          </h2>
          <div className="font-mono text-muted" style={{ fontSize: '0.825rem', marginTop: '0.25rem' }}>
            {quest.type}
          </div>
        </div>

        {/* Quest Image */}
        {quest.image && (
          <div 
            style={{ 
              marginBottom: '1.5rem', 
              borderRadius: 'var(--radius-md)', 
              overflow: 'hidden', 
              border: '1px solid var(--border-medium)',
              maxHeight: '320px',
              background: 'var(--bg-primary)'
            }}
          >
            <img 
              src={quest.image} 
              alt={`${quest.title} screenshot`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        )}

        {/* Quest Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
          <div>
            <h4 className="font-mono text-crimson" style={{ fontSize: '0.85rem', marginBottom: '0.4rem' }}>
              // OVERVIEW
            </h4>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
              {quest.summary}
            </p>
          </div>

          {quest.details && quest.details.length > 0 && (
            <div>
              <h4 className="font-mono text-crimson" style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                // FEATURES & SPECIFICATIONS
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {quest.details.map((detail, index) => (
                  <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    <span className="text-crimson font-mono" style={{ fontSize: '0.8rem' }}>&gt;</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech stack tags */}
          <div>
            <h4 className="font-mono text-crimson" style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              // TECHNOLOGIES
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {quest.tech.map((t, idx) => (
                <span 
                  key={idx} 
                  className="font-mono"
                  style={{
                    fontSize: '0.75rem',
                    padding: '0.25rem 0.65rem',
                    background: 'var(--bg-panel)',
                    border: '1px solid var(--border-dim)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-secondary)'
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderTop: '1px solid var(--border-dim)', paddingTop: '1.25rem' }}>
          {quest.githubUrl && (
            <a 
              href={quest.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-crimson"
            >
              <Github size={16} /> VIEW REPOSITORY <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
