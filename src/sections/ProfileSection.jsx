import React from 'react';
import SectionHeader from '../components/SectionHeader';

export default function ProfileSection() {
  return (
    <section id="about" className="section-wrapper">
      <div className="container">
        <SectionHeader title="ABOUT" />

        <div style={{ maxWidth: '750px', display: 'flex', flexDirection: 'column', gap: '1.75rem', fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-primary)' }}>
          <p style={{ fontSize: '1.25rem', fontWeight: 500, color: 'var(--text-primary)', borderLeft: '3px solid var(--accent-crimson)', paddingLeft: '1.25rem' }}>
            I’m a 2nd-year Computer Science and Engineering student at the Islamic University of Technology (IUT), working across software development, graphics, cybersecurity, and game design.
          </p>

          <p style={{ color: 'var(--text-secondary)' }}>
            My interest in programming comes from a fascination with fictional worlds and interactive media. I like building software where logic and creative imagination intersect — whether that’s 2D render loops, custom map layers in Tiled, or low-level systems architecture.
          </p>

          <p style={{ color: 'var(--text-secondary)' }}>
            I am driven by curiosity, technical experimentation, and a healthy dose of self-aware procrastination. I haven't mapped out every detail of where my path leads — whether into game engine development, security research, or system architecture — but I enjoy the process of learning by building.
          </p>
        </div>
      </div>
    </section>
  );
}
