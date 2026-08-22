import React, { useState } from 'react';
import { Eye, ExternalLink, CheckCircle2, Clock } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import QuestModal from '../components/QuestModal';
import { siteConfig } from '../data/portfolioData';

export default function QuestsSection() {
  const { quests } = siteConfig;
  const [selectedQuest, setSelectedQuest] = useState(null);

  return (
    <section id="projects" className="section-wrapper">
      <div className="container">
        <SectionHeader title="PROJECTS" />

        <div>
          {quests.map((project, index) => {
            const isCompleted = project.status === 'COMPLETED';
            const isAltLayout = index % 2 === 1;

            return (
              <div 
                key={project.id}
                className={`project-editorial ${isAltLayout ? 'project-editorial-alt' : ''}`}
              >
                {/* Left: Image composition */}
                <div className="project-img-wrapper" style={{ order: isAltLayout ? 2 : 1 }}>
                  {project.image && (
                    <img src={project.image} alt={`${project.title} preview`} />
                  )}
                </div>

                {/* Right: Text composition */}
                <div style={{ order: isAltLayout ? 1 : 2, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span className={`badge-status ${isCompleted ? 'badge-completed' : 'badge-progress'}`}>
                      {isCompleted ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                      {project.status}
                    </span>
                  </div>

                  <h3 className="font-display" style={{ fontSize: '2.4rem', color: 'var(--text-primary)' }}>
                    {project.title}
                  </h3>

                  <div className="font-mono text-muted" style={{ fontSize: '0.85rem' }}>
                    {project.techDisplay}
                  </div>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
                    {project.summary}
                  </p>

                  <div style={{ marginTop: '0.75rem', display: 'flex', gap: '1rem' }}>
                    <button 
                      className="btn btn-crimson"
                      onClick={() => setSelectedQuest(project)}
                    >
                      <Eye size={16} /> VIEW DETAILS
                    </button>
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-ghost-dark"
                      >
                        <ExternalLink size={16} /> REPOSITORY
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Project Detail Modal */}
        {selectedQuest && (
          <QuestModal quest={selectedQuest} onClose={() => setSelectedQuest(null)} />
        )}
      </div>
    </section>
  );
}
