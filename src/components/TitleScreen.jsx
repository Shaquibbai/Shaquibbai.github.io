import React from 'react';
import { ArrowDown } from 'lucide-react';
import { siteConfig } from '../data/portfolioData';
import Spacecraft from './SpaceJourney/Spacecraft';

export default function TitleScreen() {
  const { profile } = siteConfig;

  return (
    <section 
      style={{
        minHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '5rem 0',
        position: 'relative'
      }}
    >
      <div className="container" style={{ textAlign: 'left' }}>
        <div className="animate-fade-in">
          {/* Main Name in Handwritten Display Font + Spacecraft Anchor */}
          <h1 
            style={{ 
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 7vw, 5rem)', 
              fontWeight: 700, 
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              marginBottom: '0.25rem',
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              gap: 'clamp(2rem, 5vw, 5rem)',
              maxWidth: '1050px'
            }}
          >
            <span>{profile.name}</span>
            <div id="hero-spacecraft-anchor" style={{ display: 'inline-flex', alignItems: 'center' }}>
              <Spacecraft />
            </div>
          </h1>

          {/* Subtitle directly underneath */}
          <div 
            style={{ 
              fontFamily: 'var(--font-body)',
              fontSize: '1.25rem', 
              fontWeight: 600,
              color: 'var(--accent-crimson)', 
              marginBottom: '2rem',
              letterSpacing: '0.02em'
            }}
          >
            CS Student
          </div>

          {/* Tagline */}
          <p 
            style={{ 
              maxWidth: '580px', 
              color: 'var(--text-secondary)',
              fontSize: '1.15rem',
              lineHeight: 1.65,
              marginBottom: '3rem'
            }}
          >
            Computer Science student. Storytelling through games — and trying to create one.
          </p>

          {/* Subtle Scroll Indicator */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>
            <ArrowDown size={14} className="text-crimson" /> Scroll to explore
          </div>
        </div>
      </div>
    </section>
  );
}
