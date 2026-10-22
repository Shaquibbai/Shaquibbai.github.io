import React from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

interface FrontOverlayProps {
  onKnock: () => void;
}

export const FrontOverlay: React.FC<FrontOverlayProps> = ({ onKnock }) => {
  const S = PORTFOLIO_DATA.SITE;

  return (
    <section id="front" aria-labelledby="h1">
      <p className="eyebrow">A portfolio, in a house</p>
      <h1 id="h1">
        <span id="frontName">{S.name}</span>
      </h1>
      <p className="lede" id="frontLede">
        {S.tagline}
      </p>
      <button type="button" className="knock" id="knock" onClick={onKnock}>
        Knock{' '}
        <svg viewBox="0 0 30 10" aria-hidden="true">
          <path
            d="M0 5H28M23 1l5 4-5 4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      </button>
      <p className="foot">Four floors. Click a floor, the door, or press the button.</p>
    </section>
  );
};
