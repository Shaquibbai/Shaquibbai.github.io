import React from 'react';

interface FloorHudProps {
  floor: number;
}

/**
 * FloorHud is kept as a minimal component returning null.
 * Redundant floor-introduction headings and descriptive writing have been removed
 * to eliminate top-left clutter and give the room artwork breathing room.
 */
export const FloorHud: React.FC<FloorHudProps> = () => {
  return null;
};
