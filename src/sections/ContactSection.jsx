import React from 'react';
import { Mail, Github, Linkedin, MessageSquare, Gamepad2 } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { siteConfig } from '../data/portfolioData';

const iconMap = {
  Mail: Mail,
  Github: Github,
  Linkedin: Linkedin,
  MessageSquare: MessageSquare,
  Gamepad2: Gamepad2
};

export default function ContactSection() {
  const { contact, profile } = siteConfig;

  return (
    <section id="contact" className="section-wrapper" style={{ paddingBottom: '8rem' }}>
      <div className="container">
        <SectionHeader title="CONTACT" />

        <div className="contact-layout">
          {/* LEFT SIDE: Intro text & minimal icon buttons */}
          <div>
            <h3 className="font-display" style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
              Let's talk about games, code, or whatever comes next.
            </h3>

            <div className="contact-icons-row">
              {contact.links.map((link, idx) => {
                const IconComp = iconMap[link.iconName] || Mail;

                return (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-icon-btn"
                    title={link.name}
                    aria-label={link.name}
                  >
                    <IconComp size={18} className="text-crimson" />
                    <span>{link.name}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* RIGHT SIDE: Mysterious dark photo frame with hover fade reveal */}
          <div>
            <div className="photo-reveal-wrapper">
              <img 
                src={profile.realPhotoUrl} 
                alt={`${profile.name} profile photograph`} 
                className="photo-reveal-img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
