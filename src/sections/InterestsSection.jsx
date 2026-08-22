import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { siteConfig } from '../data/portfolioData';

export default function InterestsSection() {
  const { interests } = siteConfig;

  return (
    <section id="interests" className="section-wrapper">
      <div className="container">
        <SectionHeader title="INTERESTS" />

        <div style={{ maxWidth: '800px' }}>
          {/* Lead Quote */}
          <blockquote 
            className="font-display" 
            style={{ 
              fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', 
              color: 'var(--text-primary)', 
              borderLeft: '3px solid var(--accent-crimson)', 
              paddingLeft: '1.5rem', 
              marginBottom: '3rem',
              lineHeight: 1.35
            }}
          >
            "I like stories where imagination stops being a limitation."
          </blockquote>

          {/* Typographic Interest List */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem 1.75rem', fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
            {interests.topics.map((topic, idx) => (
              <span key={idx} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: 'var(--text-primary)' }}>{topic.name}</span>
                {idx < interests.topics.length - 1 && (
                  <span style={{ color: 'var(--accent-crimson)', opacity: 0.5 }}>/</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
