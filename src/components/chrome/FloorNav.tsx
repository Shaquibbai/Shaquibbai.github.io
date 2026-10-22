import React from 'react';
import { FLOORS } from '../../data/portfolioData';

interface FloorNavProps {
  currentFloor: number;
  onSelectFloor: (floor: number) => void;
}

export const FloorNav: React.FC<FloorNavProps> = ({
  currentFloor,
  onSelectFloor
}) => {
  return (
    <nav id="fnav" aria-label="Floors">
      {[4, 3, 2, 1].map((n) => {
        const fl = FLOORS[n - 1];
        const isActive = currentFloor === n;
        return (
          <button
            key={n}
            type="button"
            data-f={n}
            className={`${isActive ? 'on' : ''} ${fl.todo ? 'todo' : ''}`}
            aria-label={`Floor ${n}: ${fl.name}`}
            aria-current={isActive ? 'true' : 'false'}
            onClick={() => onSelectFloor(n)}
          >
            <span className="l">{fl.short}</span>
            <span className="n">{n}</span>
          </button>
        );
      })}

      <button
        type="button"
        className={`out ${currentFloor === 0 ? 'on' : ''}`}
        aria-label="Outside"
        aria-current={currentFloor === 0 ? 'true' : 'false'}
        onClick={() => onSelectFloor(0)}
      >
        <span className="l">Outside</span>
        <span className="n">
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <path
              d="M2 8L8 2l6 6M4 7v7h8V7"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
            />
          </svg>
        </span>
      </button>
    </nav>
  );
};
