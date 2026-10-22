import React, { useRef, useEffect } from 'react';
import { RESUME_DATA } from '../../data/resumeData';
import { generateResumePdf } from '../../utils/generateResumePdf';

interface PlainViewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlainViewModal: React.FC<PlainViewModalProps> = ({ isOpen, onClose }) => {
  const backBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        backBtnRef.current?.focus({ preventScroll: true });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const id = RESUME_DATA.identity;
  const ct = RESUME_DATA.contact;

  return (
    <div id="plain" role="dialog" aria-modal="true" aria-labelledby="resumeTitle">
      <div className="wrap resume-wrap">
        {/* Navigation & Action Header */}
        <div className="resume-actions-bar">
          <button
            type="button"
            className="back"
            id="plainBack"
            ref={backBtnRef}
            onClick={onClose}
          >
            ← Back to the house
          </button>

          <button
            type="button"
            className="resume-download-btn"
            id="downloadResumePdf"
            onClick={() => generateResumePdf()}
            aria-label="Download Résumé as PDF"
          >
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" style={{ marginRight: 6 }}>
              <path
                d="M8 2v8m0 0l-3-3m3 3l3-3M3 13h10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Download PDF
          </button>
        </div>

        {/* Identity & Header */}
        <header className="resume-header">
          <h1 id="resumeTitle" className="resume-name">{id.name}</h1>
          <p className="resume-degree">{id.degree}</p>
          <p className="resume-institution">{id.institution} · Expected {id.expectedGraduation}</p>

          <div className="resume-links">
            <a href={`mailto:${ct.email}`} className="resume-link">
              Email: {ct.email}
            </a>
            <span className="sep">|</span>
            <a href={ct.github.url} target="_blank" rel="noopener noreferrer" className="resume-link">
              GitHub: {ct.github.display}
            </a>
            <span className="sep">|</span>
            <a href={ct.linkedin.url} target="_blank" rel="noopener noreferrer" className="resume-link">
              LinkedIn: {ct.linkedin.display}
            </a>
            <span className="sep">|</span>
            <a href={ct.itch.url} target="_blank" rel="noopener noreferrer" className="resume-link">
              itch.io: {ct.itch.display}
            </a>
          </div>
          <p className="resume-meta">{id.location}</p>
        </header>

        {/* Professional Summary */}
        <section className="resume-section">
          <h2 className="resume-section-title">Professional Summary</h2>
          <p className="resume-summary-text">{id.summary}</p>
        </section>

        {/* Education */}
        <section className="resume-section">
          <h2 className="resume-section-title">Education</h2>
          <div className="resume-edu-list">
            {RESUME_DATA.education.map((e, idx) => (
              <div key={idx} className="resume-edu-item">
                <div className="resume-item-top">
                  <h3 className="resume-item-title">{e.institution}</h3>
                  <span className="resume-item-period">{e.period}</span>
                </div>
                <div className="resume-item-sub">
                  <span>{e.degree}</span>
                  {e.gpa && <span className="resume-gpa"> — {e.gpa}</span>}
                </div>
                {e.details && <p className="resume-item-desc">{e.details}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* Featured Projects */}
        <section className="resume-section">
          <h2 className="resume-section-title">Featured Projects</h2>
          <div className="resume-project-list">
            {RESUME_DATA.featuredProjects.map((p) => (
              <article key={p.id} className="resume-project-card">
                <div className="resume-item-top">
                  <div>
                    <h3 className="resume-item-title">{p.name}</h3>
                    <p className="resume-project-sub">{p.subtitle}</p>
                  </div>
                  <div className="resume-project-actions">
                    {p.demoUrl && (
                      <a
                        href={p.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resume-pill-link"
                      >
                        Live Demo ↗
                      </a>
                    )}
                    {p.repoUrl && (
                      <a
                        href={p.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resume-pill-link repo"
                      >
                        Repository ↗
                      </a>
                    )}
                  </div>
                </div>

                <div className="resume-tech-row">
                  {p.tech.map((t) => (
                    <span key={t} className="resume-tech-badge">{t}</span>
                  ))}
                </div>

                <p className="resume-project-desc">{p.description}</p>

                <ul className="resume-bullets">
                  {p.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Additional Projects */}
        <section className="resume-section">
          <h2 className="resume-section-title">Additional Projects</h2>
          <div className="resume-additional-grid">
            {RESUME_DATA.additionalProjects.map((a, idx) => (
              <div key={idx} className="resume-addl-item">
                <div className="resume-addl-header">
                  <h3 className="resume-addl-title">{a.name}</h3>
                  <span className="resume-addl-tech">{a.tech}</span>
                </div>
                <p className="resume-addl-desc">{a.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Skills */}
        <section className="resume-section">
          <h2 className="resume-section-title">Technical Skills</h2>
          <div className="resume-skills-grid">
            {RESUME_DATA.skills.map((s, idx) => (
              <div key={idx} className="resume-skill-group">
                <div className="resume-skill-cat-head">
                  <h3 className="resume-skill-cat-name">{s.category}</h3>
                  {s.note && <span className="resume-skill-cat-note">{s.note}</span>}
                </div>
                <ul className="resume-skill-items">
                  {s.items.map((it, i) => (
                    <li key={i} className="resume-skill-pill-item">
                      <strong className="resume-skill-it-name">{it.name}</strong>
                      {it.detail && <span className="resume-skill-it-detail"> — {it.detail}</span>}
                      {it.learning && <span className="resume-learning-tag">Learning</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Actions Bar */}
        <div className="resume-bottom-bar">
          <button
            type="button"
            className="resume-download-btn large"
            onClick={() => generateResumePdf()}
          >
            <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" style={{ marginRight: 8 }}>
              <path
                d="M8 2v8m0 0l-3-3m3 3l3-3M3 13h10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Download Résumé (PDF)
          </button>
          <button
            type="button"
            className="back"
            onClick={onClose}
          >
            ← Return to the house
          </button>
        </div>
      </div>
    </div>
  );
};
