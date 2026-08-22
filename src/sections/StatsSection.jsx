import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { siteConfig } from '../data/portfolioData';

export default function StatsSection() {
  const { stats } = siteConfig;

  return (
    <section id="skills" className="section-wrapper">
      <div className="container">
        <SectionHeader title="SKILLS" />

        <div style={{ maxWidth: '850px' }}>
          {stats.categories.map((cat) => (
            <div key={cat.id} className="skills-group-item">
              <h3 className="skills-group-title">
                {cat.name}
              </h3>
              <div className="skills-word-list">
                {cat.items.map((item, idx) => (
                  <span key={idx} className="skill-word">
                    {item.name}
                    {idx < cat.items.length - 1 && (
                      <span style={{ color: 'var(--border-bright)', opacity: 0.4, margin: '0 0.25rem' }}>·</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
