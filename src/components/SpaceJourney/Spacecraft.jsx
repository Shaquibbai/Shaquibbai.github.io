import React from 'react';
import rocketSprite from '../../assets/rocket-sprite.png';

export default function Spacecraft({ className = '', style = {} }) {
  return (
    <div 
      className={`spacecraft-wrapper ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        pointerEvents: 'none',
        overflow: 'visible',
        ...style
      }}
    >
      <img
        src={rocketSprite}
        alt="Spacecraft"
        className="spacecraft-img"
        style={{
          width: '280px',
          height: 'auto',
          display: 'block',
          objectFit: 'contain',
          overflow: 'visible',
          pointerEvents: 'none',
          userSelect: 'none'
        }}
      />
    </div>
  );
}
