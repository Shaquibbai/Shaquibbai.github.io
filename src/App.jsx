import React, { useState, useCallback } from 'react';
import './styles/global.css';
import './styles/components.css';

import MouseWaveCanvas from './components/MouseWaveCanvas';
import SpaceJourney from './components/SpaceJourney/SpaceJourney';
import IntroScreen from './components/IntroScreen';
import TitleScreen from './components/TitleScreen';
import ProfileSection from './sections/ProfileSection';
import StatsSection from './sections/StatsSection';
import QuestsSection from './sections/QuestsSection';
import AcademicsSection from './sections/AcademicsSection';
import ResearchSection from './sections/ResearchSection';
import InterestsSection from './sections/InterestsSection';
import ContactSection from './sections/ContactSection';
import Footer from './components/Footer';

export default function App() {
  const [introCompleted, setIntroCompleted] = useState(false);

  console.log('[APP] introCompleted:', introCompleted);

  const handleIntroComplete = useCallback(() => {
    console.log('[APP] handleIntroComplete fired! Setting introCompleted = true');
    setIntroCompleted(true);
  }, []);

  const handleStartExploring = (targetId) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="top" className="portfolio-app">
      {/* Directional Light Wave Canvas (z-index: 1) */}
      <MouseWaveCanvas />

      {/* Space Journey Tethered Astronaut System */}
      <SpaceJourney />

      {/* CRT Scanline overlay */}
      <div className="scanlines-overlay" />

      {/* Intro Boot Sequence (~3.5 seconds) */}
      {!introCompleted && (
        <IntroScreen onComplete={handleIntroComplete} />
      )}

      <main style={{ position: 'relative', zIndex: 2 }}>
        {/* Title Screen Hero */}
        <TitleScreen onStart={handleStartExploring} />

        {/* Section Dividers & Continuous Scroll Journey */}
        <div className="section-divider" />
        <ProfileSection />

        <div className="section-divider" />
        <StatsSection />

        <div className="section-divider" />
        <QuestsSection />

        <div className="section-divider" />
        <AcademicsSection />

        <div className="section-divider" />
        <ResearchSection />

        <div className="section-divider" />
        <InterestsSection />

        <div className="section-divider" />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
