import React, { useMemo } from 'react';
import { buildScene3 } from '../../utils/bedroomArt';

export const BedroomFloor: React.FC<{
  viewBox: string;
  isActive: boolean;
  isBelow: boolean;
}> = ({ viewBox, isActive, isBelow }) => {
  const markup = useMemo(() => buildScene3(), []);

  return (
    <svg
      id="sc3"
      className={`scene ${isActive ? 'on' : ''} ${isBelow ? 'below' : ''}`}
      data-floor="3"
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      role="group"
      aria-label="The Bedroom"
      tabIndex={-1}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
};

export default BedroomFloor;
