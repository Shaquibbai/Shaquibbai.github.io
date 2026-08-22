import React, { useState, useEffect } from 'react';
import { Menu, X, Shield } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { siteConfig } from '../data/portfolioData';

const navItems = [
  { id: 'profile', label: 'PROFILE', href: '#profile' },
  { id: 'stats', label: 'STATS', href: '#stats' },
  { id: 'quests', label: 'QUESTS', href: '#quests' },
  { id: 'academics', label: 'ACADEMICS', href: '#academics' },
  { id: 'research', label: 'RESEARCH', href: '#research' },
  { id: 'interests', label: 'INTERESTS', href: '#interests' },
  { id: 'contact', label: 'SAVE POINT', href: '#contact' },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('profile');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="hud-nav-sticky">
      <div className="container">
        <div className="hud-nav-container">
          {/* Brand */}
          <a href="#top" className="nav-brand">
            <Shield size={20} className="text-cyan" />
            <span>SHAQUIB WASIF</span>
            <span className="nav-brand-level">LVL 2.2</span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="nav-links-desktop" aria-label="Main Navigation">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => setActiveSection(item.id)}
              >
                [{item.label}]
              </a>
            ))}
          </nav>

          {/* Right utility items */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ThemeToggle />

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn btn-ghost mobile-menu-toggle"
              style={{ padding: '0.45rem', display: 'none' }}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            background: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-medium)',
            padding: '1rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--border-dim)' }}
              onClick={() => {
                setActiveSection(item.id);
                setMobileMenuOpen(false);
              }}
            >
              [{item.label}]
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .mobile-menu-toggle {
            display: inline-flex !important;
          }
        }
      `}</style>
    </header>
  );
}
