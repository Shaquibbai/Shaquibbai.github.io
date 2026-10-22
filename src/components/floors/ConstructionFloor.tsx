import React, { useMemo } from 'react';
import { buildScene4 } from '../../utils/constructionArt';

export const ConstructionFloor: React.FC<{
  viewBox: string;
  isActive: boolean;
  isBelow: boolean;
}> = ({ viewBox, isActive, isBelow }) => {
  const markup = useMemo(() => buildScene4(), []);

  return (
    <svg
      id="sc4"
      className={`scene ${isActive ? 'on' : ''} ${isBelow ? 'below' : ''}`}
      data-floor="4"
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      role="group"
      aria-label="Under Construction"
      tabIndex={-1}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
};

export default ConstructionFloor;
