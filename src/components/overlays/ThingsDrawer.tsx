import React from 'react';
import { FLOORS } from '../../data/portfolioData';

export interface ThingItem {
  id: string;
  label: string;
  verb: string;
  cx: number;
}

interface ThingsDrawerProps {
  isOpen: boolean;
  floor: number;
  items: ThingItem[];
  onClose: () => void;
  onSelectItem: (item: ThingItem) => void;
}

export const ThingsDrawer: React.FC<ThingsDrawerProps> = ({
  isOpen,
  floor,
  items,
  onClose,
  onSelectItem
}) => {
  const currentFloor = FLOORS.find((f) => f.n === floor);

  return (
    <aside
      id="things"
      className={isOpen ? 'open' : ''}
      aria-label="Things on this floor"
      role="dialog"
    >
      <button
        type="button"
        className="x"
        id="thingsX"
        aria-label="Close list"
        onClick={onClose}
      >
        ×
      </button>

      <p className="k" id="thK">
        {currentFloor ? `Floor ${floor} · ${currentFloor.k}` : ''}
      </p>
      <h3 id="thH">Things here</h3>

      <ul id="thList">
        {items.map((it) => (
          <li key={it.id}>
            <button
              type="button"
              onClick={() => onSelectItem(it)}
            >
              <span className="t">{it.label}</span>
              <span className="s">{it.verb}</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};
