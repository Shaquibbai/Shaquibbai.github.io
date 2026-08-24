import React from 'react';
import { siteConfig } from '../data/portfolioData';
import CvRocketDownload from './CvRocketDownload';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      style={{
        borderTop: '1px solid var(--border-dim)',
        background: 'var(--bg-secondary)',
        padding: '2.5rem 1.5rem',
        fontSize: '0.8rem',
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-mono)',
        position: 'relative'
      }}
    >
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.25rem' }}>
        <div>
          SHAQUIB_WASIF.SYS // CS STUDENT @ IUT
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          {/* Subtle Space CV Download Interaction */}
          <CvRocketDownload />

          <span>© {currentYear} {siteConfig.profile.name}. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
