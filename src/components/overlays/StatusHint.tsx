import React from 'react';

interface StatusHintProps {
  message: string;
}

export const StatusHint: React.FC<StatusHintProps> = ({ message }) => {
  return (
    <p id="hint" className={message ? 'show' : ''} role="status">
      {message}
    </p>
  );
};
