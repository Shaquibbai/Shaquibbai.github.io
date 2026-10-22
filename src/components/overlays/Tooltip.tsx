import React from 'react';

interface TooltipProps {
  visible: boolean;
  x: number;
  y: number;
  label: string;
  verb?: string;
}

/**
 * Concise, unobtrusive tooltip showing the object name without oversized explanatory verb panels.
 */
export const Tooltip: React.FC<TooltipProps> = ({
  visible,
  x,
  y,
  label
}) => {
  return (
    <div
      id="tip"
      className={visible ? 'show' : ''}
      style={{ left: `${x}px`, top: `${y}px` }}
      aria-hidden="true"
    >
      {label}
    </div>
  );
};
