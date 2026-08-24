import React, { useState } from 'react';
import ProjectPlanet from './ProjectPlanet';
import ProjectMoon from './ProjectMoon';
import ProjectDetails from './ProjectDetails';
import './projectPlanets.css';

export default function ProjectScene({ projects }) {
  const [currentIndex, setCurrentIndex] = useState(0); // 01 Netflix Copy -> 02 ChatKor -> 03 Stories -> 04 farmOS -> 05 Deadline Dash
  const [transitionState, setTransitionState] = useState(null); // { targetIndex, direction: 'next' | 'prev' }
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [zoomState, setZoomState] = useState('idle'); // 'idle' | 'zooming-in' | 'zoomed' | 'zooming-out'
  const [selectedProject, setSelectedProject] = useState(null);

  const currentProject = projects[currentIndex];
  const nextIndex = (currentIndex + 1) % projects.length;
  const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
  const nextProject = projects[nextIndex];
  const prevProject = projects[prevIndex];

  // Spatial offsets for orbiting technology satellites around the 190px moon
  const techOffsets = [
    { x: -160, y: -105 },
    { x: 160, y: -95 },
    { x: -165, y: 55 },
    { x: 165, y: 45 },
    { x: 0, y: -155 }
  ];

  // Trigger NEXT Project Transition (CLICK >): Current slides LEFT, New enters from RIGHT
  const handleNext = () => {
    if (isTransitioning || zoomState !== 'idle') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCurrentIndex(nextIndex);
      return;
    }

    setIsTransitioning(true);
    setTransitionState({ targetIndex: nextIndex, direction: 'next' });

    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setTransitionState(null);
      setIsTransitioning(false);
    }, 650);
  };

  // Trigger PREVIOUS Project Transition (CLICK <): Current slides RIGHT, New enters from LEFT
  const handlePrev = () => {
    if (isTransitioning || zoomState !== 'idle') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCurrentIndex(prevIndex);
      return;
    }

    setIsTransitioning(true);
    setTransitionState({ targetIndex: prevIndex, direction: 'prev' });

    setTimeout(() => {
      setCurrentIndex(prevIndex);
      setTransitionState(null);
      setIsTransitioning(false);
    }, 650);
  };

  // Start Planet Zoom -> Emergence into Circular Space Portal
  const handlePlanetClick = (project) => {
    if (isTransitioning || zoomState !== 'idle') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setSelectedProject(project);
      setZoomState('zoomed');
      return;
    }

    setSelectedProject(project);
    setZoomState('zooming-in');

    setTimeout(() => {
      setZoomState('zoomed');
    }, 650);
  };

  // Reverse Zoom Journey: Synchronous Portal Collapse + Planet Zoom-Out (No pause, no blur)
  const handleCloseZoom = () => {
    if (zoomState === 'idle' || zoomState === 'zooming-out') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setZoomState('idle');
      setSelectedProject(null);
      return;
    }

    setZoomState('zooming-out');

    setTimeout(() => {
      setZoomState('idle');
      setSelectedProject(null);
    }, 550);
  };

  // Helper to render a complete unified Project Destination Scene (Moon + Satellites + Title + Label)
  const renderProjectDestination = (project, sceneRole = 'current') => {
    if (!project) return null;
    const isLearning = project.category === 'learning';

    return (
      <div 
        key={`${project.id}-${sceneRole}`}
        className="space-destination-stage"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '440px',
          width: '100%',
          maxWidth: '640px'
        }}
      >
        {/* Main Lunar Moon Celestial Body */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <ProjectPlanet
            project={project}
            onClickPlanet={(proj) => handlePlanetClick(proj)}
          />

          {/* Orbiting Technology Satellite Labels */}
          {project.tech && project.tech.map((techName, idx) => {
            const offset = techOffsets[idx % techOffsets.length];
            const colors = ['#fb7185', '#38bdf8', '#c084fc', '#fde047', '#fda4af'];

            return (
              <ProjectMoon
                key={`${project.id}-${techName}`}
                name={techName}
                xOffset={offset.x}
                yOffset={offset.y}
                color={colors[idx % colors.length]}
              />
            );
          })}
        </div>

        {/* Project Title & Classification Label */}
        <div 
          className="project-title-container"
          style={{
            marginTop: '2.5rem',
            textAlign: 'center',
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 20
          }}
        >
          <h3 
            className="font-display" 
            style={{ 
              fontSize: '2.4rem', 
              color: 'var(--text-primary)',
              margin: '0 0 0.4rem 0',
              letterSpacing: '0.02em',
              lineHeight: 1.1
            }}
          >
            {project.title}
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
            <span 
              className="badge-status font-mono"
              style={{
                fontSize: '0.75rem',
                padding: '0.22rem 0.65rem',
                background: isLearning ? 'rgba(75, 85, 99, 0.3)' : 'rgba(225, 29, 72, 0.25)',
                border: `1px solid ${isLearning ? 'rgba(156, 163, 175, 0.4)' : 'rgba(225, 29, 72, 0.45)'}`,
                color: isLearning ? '#d1d5db' : '#fb7185',
                borderRadius: '4px',
                letterSpacing: '0.04em'
              }}
            >
              {isLearning ? 'CLASS PROJECT / LEARNING PROJECT' : project.status}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const targetProject = transitionState ? projects[transitionState.targetIndex] : null;
  const isZoomed = zoomState !== 'idle';

  return (
    <div className={`project-clean-scene-container ${isZoomed ? `zoom-mode zoom-${zoomState}` : ''}`}>
      {/* Contained Space Viewport */}
      <div className="clean-scene-viewport">
        {/* Minimalist Floating Arrow Navigation Controls (< and >) */}
        {!isZoomed && (
          <>
            <button
              type="button"
              className="clean-arrow-btn clean-arrow-left font-mono"
              onClick={handlePrev}
              disabled={isTransitioning}
              aria-label={`Previous project: ${prevProject?.title}`}
              title={`Previous: ${prevProject?.title}`}
            >
              &lt;
            </button>

            <button
              type="button"
              className="clean-arrow-btn clean-arrow-right font-mono"
              onClick={handleNext}
              disabled={isTransitioning}
              aria-label={`Next project: ${nextProject?.title}`}
              title={`Next: ${nextProject?.title}`}
            >
              &gt;
            </button>
          </>
        )}

        {/* Dual Scene Viewport Stage (Always maintains underlying crisp planet mounted) */}
        <div 
          className={`space-stage-viewport ${transitionState ? `animating-${transitionState.direction}` : ''}`}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '640px',
            minHeight: '440px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: isZoomed ? 'visible' : 'hidden'
          }}
        >
          {/* Current Active Project Destination Scene */}
          <div className="scene-container current-scene" key={`${currentProject.id}-current`}>
            {renderProjectDestination(currentProject, 'current')}
          </div>

          {/* Target Incoming Project Destination Scene (rendered during horizontal transition) */}
          {transitionState && targetProject && (
            <div className="scene-container target-scene" key={`${targetProject.id}-target`}>
              {renderProjectDestination(targetProject, 'target')}
            </div>
          )}
        </div>

        {/* Large Circular Space Portal Container */}
        {selectedProject && (
          <ProjectDetails
            project={selectedProject}
            onClose={handleCloseZoom}
            isClosing={zoomState === 'zooming-out'}
          />
        )}
      </div>
    </div>
  );
}
