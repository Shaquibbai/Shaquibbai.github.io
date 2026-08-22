import React from 'react';

export default function SectionHeader({ title, description }) {
  return (
    <div className="section-header-cinematic animate-fade-in">
      <h2 className="section-title-cinematic">
        {title}
      </h2>
      {description && <p className="section-desc-cinematic">{description}</p>}
    </div>
  );
}
