import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { siteConfig } from '../data/portfolioData';

export default function AcademicsSection() {
  const { academics } = siteConfig;

  return (
    <section id="education" className="section-wrapper">
      <div className="container">
        <SectionHeader title="EDUCATION" />

        <div className="timeline-container" style={{ maxWidth: '750px' }}>
          <div className="timeline-line" />

          {academics.map((item) => (
            <div key={item.id} className="timeline-item">
              <div className="timeline-dot" />

              <div className="font-mono text-crimson" style={{ fontSize: '0.85rem', marginBottom: '0.25rem', letterSpacing: '0.05em' }}>
                {item.years}
              </div>

              <h3 className="font-display" style={{ fontSize: '1.85rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                {item.level}
              </h3>

              <div style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', fontWeight: 500, marginBottom: '0.4rem' }}>
                {item.institution}
              </div>

              <div className="font-mono text-muted" style={{ fontSize: '0.85rem' }}>
                RESULT: <span style={{ color: 'var(--text-primary)' }}>{item.gpa}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
