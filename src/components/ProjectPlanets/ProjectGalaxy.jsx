import React, { useState } from 'react';
import ProjectPlanet from './ProjectPlanet';
import ProjectNavigation from './ProjectNavigation';
import ProjectDetails from './ProjectDetails';
import './projectPlanets.css';

export default function ProjectGalaxy({ projects }) {
  const [activeIndex, setActiveIndex] = useState(3); // Default focus on farmOS (index 3)
  const [selectedProjectModal, setSelectedProjectModal] = useState(null);

  const handlePrev = () => {
    setActiveIndex(prev => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex(prev => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="project-galaxy-wrapper">
      {/* Contained Deep Space Constellation Cluster Viewport */}
      <div className="project-galaxy-viewport">
        {/* Ambient Nebula Background Glow */}
        <div className="galaxy-ambient-glow" />

        {/* Planet Constellation Grid / Organic Arrangement */}
        <div className="galaxy-constellation-grid">
          {projects.map((project, idx) => (
            <div 
              key={project.id} 
              className={`galaxy-planet-slot slot-${idx} ${idx === activeIndex ? 'is-active-slot' : ''}`}
            >
              <ProjectPlanet
                project={project}
                index={idx}
                isActive={idx === activeIndex}
                isTarget={idx === activeIndex}
                onSelect={(proj) => {
                  setActiveIndex(idx);
                }}
                onClick={(proj) => {
                  setSelectedProjectModal(proj);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Flight Control Rocket Navigation */}
      <ProjectNavigation
        projects={projects}
        activeIndex={activeIndex}
        onNavigatePrev={handlePrev}
        onNavigateNext={handleNext}
        onSelectProject={(idx) => setActiveIndex(idx)}
      />

      {/* Circular Organic Project Details Modal */}
      {selectedProjectModal && (
        <ProjectDetails
          project={selectedProjectModal}
          onClose={() => setSelectedProjectModal(null)}
        />
      )}
    </div>
  );
}
