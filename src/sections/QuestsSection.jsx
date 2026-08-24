import React from 'react';
import SectionHeader from '../components/SectionHeader';
import ProjectScene from '../components/ProjectPlanets/ProjectScene';
import { siteConfig } from '../data/portfolioData';

export default function QuestsSection() {
  const { quests } = siteConfig;

  return (
    <section id="projects" className="section-wrapper">
      <div className="container">
        <SectionHeader title="PROJECTS" />

        {/* Space Travel Single Planet Navigation System */}
        <ProjectScene projects={quests} />
      </div>
    </section>
  );
}
