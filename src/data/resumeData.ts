/**
 * Single source of truth for Shaquib Wasif's Résumé.
 * Shared directly by both the Web Résumé View and the downloadable PDF generator.
 */

export interface ResumeProject {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  tech: string[];
  highlights: string[];
  repoUrl?: string;
  demoUrl?: string;
}

export interface EducationEntry {
  institution: string;
  degree: string;
  period: string;
  gpa?: string;
  details?: string;
}

export interface SkillCategory {
  category: string;
  note?: string;
  items: {
    name: string;
    detail?: string;
    learning?: boolean;
  }[];
}

export interface ResumeData {
  identity: {
    name: string;
    title: string;
    institution: string;
    degree: string;
    expectedGraduation: string;
    location: string;
    summary: string;
  };
  contact: {
    email: string;
    github: { label: string; url: string; display: string };
    linkedin: { label: string; url: string; display: string };
    itch: { label: string; url: string; display: string };
  };
  education: EducationEntry[];
  featuredProjects: ResumeProject[];
  additionalProjects: {
    name: string;
    tech: string;
    description: string;
  }[];
  skills: SkillCategory[];
}

export const RESUME_DATA: ResumeData = {
  identity: {
    name: 'Shaquib Wasif',
    title: 'Computer Science & Engineering Student',
    institution: 'Islamic University of Technology (IUT)',
    degree: 'B.Sc. in Computer Science and Engineering',
    expectedGraduation: '2028',
    location: 'Gazipur, Bangladesh',
    summary:
      'Computer Science and Engineering student at Islamic University of Technology, interested in game development, interactive experiences, and software engineering. Enjoys combining technical problem-solving with creative ideas and building projects that bring those ideas to life.'
  },

  contact: {
    email: 'sushmit.ssc21@gmail.com',
    github: {
      label: 'GitHub',
      url: 'https://github.com/Shaquibbai',
      display: 'github.com/Shaquibbai'
    },
    linkedin: {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/shaquib-wasif-9b4b06328/',
      display: 'linkedin.com/in/shaquib-wasif'
    },
    itch: {
      label: 'itch.io',
      url: 'https://shaquibwasif.itch.io/',
      display: 'shaquibwasif.itch.io'
    }
  },

  education: [
    {
      institution: 'Islamic University of Technology (IUT)',
      degree: 'B.Sc. in Computer Science and Engineering',
      period: '2024 – 2028 (Expected)',
      details:
        'Focus on algorithms, data structures, object-oriented software engineering, and database systems.'
    },
    {
      institution: 'Notre Dame College',
      degree: 'Higher Secondary Certificate (HSC) — Science',
      period: '2021 – 2023',
      gpa: 'GPA: 5.00 / 5.00'
    },
    {
      institution: 'Monipur High School & College — Branch 3',
      degree: 'Secondary School Certificate (SSC) — Science',
      period: '2011 – 2021',
      gpa: 'GPA: 5.00 / 5.00'
    }
  ],

  featuredProjects: [
    {
      id: 'khelbi-naki',
      name: 'Khelbi-Naki',
      subtitle: 'Real-Time Multiplayer Party Game Platform',
      description:
        'An ongoing multiplayer party-game platform built for playing games with friends and family.',
      tech: ['React', 'Vite', 'Node.js', 'Express', 'Socket.IO'],
      highlights: [
        'Implemented room-based multiplayer coordination with synchronized real-time player states and event handling.',
        'Designed interactive party game modes including OneShot, Kings Dice, and Werewolf.',
        'Engineered responsive, low-latency mobile browser interface with WebSocket reconnection resiliency.'
      ],
      repoUrl: 'https://github.com/Shaquibbai/Khelbi_Naki',
      demoUrl: 'https://khelbi-naki.onrender.com/'
    },
    {
      id: 'deadline-dash',
      name: 'Deadline Dash',
      subtitle: '2D Campus Story Adventure Game',
      description:
        'A 2D, story-driven game set around the IUT campus, in which the player completes quests under a time limit.',
      tech: ['Java', 'LibGDX', 'Tiled'],
      highlights: [
        'Designed authentic IUT campus maps, world-building, and environmental navigation using Tiled.',
        'Engineered player physics, sprite movement, and animation states in Java with LibGDX.',
        'Built camera tracking, countdown timer, quest state machines, and reputation mechanics.',
        'Scripted opening and ending narrative sequences and developed a custom campus football minigame.'
      ],
      repoUrl: 'https://github.com/Shaquibbai/Deadline-Dash'
    },
    {
      id: 'farmos',
      name: 'farmOS',
      subtitle: 'Terminal-Based Farm Management System',
      description:
        'A collaborative academic farm-management system implemented in C/C++ with a terminal-based interface.',
      tech: ['C++', 'C', 'Terminal / CLI'],
      highlights: [
        'Structured modular terminal user interface with navigable ASCII menus and input handling.',
        'Implemented core simulation algorithms for crop growth cycles, livestock upkeep, and market fluctuations.',
        'Developed robust file persistence routines to save and reload farm simulation states across sessions.'
      ],
      repoUrl: 'https://github.com/sanmugdho/farmOS'
    }
  ],

  additionalProjects: [
    {
      name: 'Netflix Copy',
      tech: 'Java, JavaFX',
      description: 'Desktop streaming interface inspired by Netflix with media browse grids and modular layouts.'
    },
    {
      name: 'ChatKor',
      tech: 'Java, JavaFX, Networking',
      description: 'Desktop messaging and chat application exploring client networking and event handling.'
    },
    {
      name: 'Stories',
      tech: 'Java, JavaFX',
      description: 'Story-driven desktop reader and interactive narrative interface.'
    }
  ],

  skills: [
    {
      category: 'Programming Languages',
      note: 'Foundations & core languages',
      items: [
        { name: 'C & C++', detail: 'Systems programming, data structures, terminal applications' },
        { name: 'Java', detail: 'Object-oriented programming, desktop UI (JavaFX), game loops (LibGDX)' }
      ]
    },
    {
      category: 'Databases',
      note: 'Relational data modeling',
      items: [
        { name: 'SQL & MySQL', detail: 'Relational schema design, entity modeling, query operations' }
      ]
    },
    {
      category: 'Game Development',
      note: 'Engines & graphics tools',
      items: [
        { name: 'LibGDX & Tiled', detail: '2D game architecture, tilemap rendering, sprite systems' },
        { name: 'Godot', detail: 'Scene trees, node architecture, 2D/3D gameplay prototyping' },
        { name: 'Raylib', detail: 'Hardware-accelerated 2D graphics programming in C/C++' }
      ]
    },
    {
      category: 'Desktop Development',
      note: 'GUI applications',
      items: [
        { name: 'JavaFX', detail: 'Project experience building desktop interfaces (Netflix Copy, ChatKor, Stories)' }
      ]
    },
    {
      category: 'Version Control',
      note: 'Collaboration & workflows',
      items: [
        { name: 'Git & GitHub', detail: 'Branching, repository management, collaborative version control' }
      ]
    },
    {
      category: 'Web Development — Currently Learning',
      note: 'Actively learning through project work & experimentation',
      items: [
        { name: 'React & Vite', detail: 'Component-driven front-ends, reactive state management (used in Khelbi-Naki)', learning: true },
        { name: 'Node.js & Express', detail: 'Server runtimes and lightweight REST services (used in Khelbi-Naki)', learning: true },
        { name: 'Socket.IO', detail: 'Real-time WebSocket event communication and room syncing', learning: true },
        { name: 'HTML5 & CSS3', detail: 'Responsive semantic layout and custom styling fundamentals', learning: true }
      ]
    },
    {
      category: 'Creative & Design Competencies',
      note: 'Narrative & player experience',
      items: [
        { name: 'Game Design & World-Building', detail: 'Narrative branching, environmental layout, quest pacing, atmosphere' }
      ]
    }
  ]
};
