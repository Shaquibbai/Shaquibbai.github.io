import React from 'react';
import { siteConfig } from '../data/portfolioData';

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
        fontFamily: 'var(--font-mono)'
      }}
    >
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          SHAQUIB_WASIF.SYS // CS STUDENT @ IUT
        </div>

        <div>
          © {currentYear} {siteConfig.profile.name}. All rights reserved.
        </div>

        <div>
          <a href="#top" className="text-crimson" style={{ textDecoration: 'none' }}>[ RETURN TO TOP ↑ ]</a>
        </div>
      </div>
    </footer>
  );
}
