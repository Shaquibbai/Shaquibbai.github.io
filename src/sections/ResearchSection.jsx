import React from 'react';
import SectionHeader from '../components/SectionHeader';

export default function ResearchSection() {
  return (
    <section id="research" className="section-wrapper" style={{ padding: '6rem 0' }}>
      <div className="container">
        <SectionHeader title="RESEARCH" />

        <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <p className="font-display" style={{ fontSize: '2.2rem', color: 'var(--text-primary)' }}>
            Nothing here yet.
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, marginTop: '0.25rem' }}>
            Take me if you need a motivator :)
          </p>
        </div>
      </div>
    </section>
  );
}
