import React, { useMemo } from 'react';
import { buildScene2 } from '../../utils/workshopArt';

export const WorkshopFloor: React.FC<{
  viewBox: string;
  isActive: boolean;
  isBelow: boolean;
}> = ({ viewBox, isActive, isBelow }) => {
  const markup = useMemo(() => buildScene2(), []);

  return (
    <svg
      id="sc2"
      className={`scene ${isActive ? 'on' : ''} ${isBelow ? 'below' : ''}`}
      data-floor="2"
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      role="group"
      aria-label="The Workshop"
      tabIndex={-1}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
};
