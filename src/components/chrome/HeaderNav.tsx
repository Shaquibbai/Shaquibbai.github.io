import React from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

interface HeaderNavProps {
  onGoOutside: () => void;
  onOpenPlain: () => void;
  onOpenContact: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  onOpenPlain,
  onOpenContact
}) => {
  const gh = PORTFOLIO_DATA.LINKS.find((l) => l.id === 'github');

  return (
    <nav className="nav" aria-label="Quick links">
      <button
        type="button"
        id="plainBtn"
        data-testid="resume-btn"
        aria-label="View Résumé"
        onClick={onOpenPlain}
      >
        Résumé
      </button>
      <button type="button" id="contactBtn" className="hi" onClick={onOpenContact}>
        Contact
      </button>
      {gh && gh.url && (
        <a
          className="opt"
          id="navGit"
          href={gh.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      )}
    </nav>
  );
};
