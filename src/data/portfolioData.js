import farmOsImg from '../../assets/farmOS/farmOS.jfif';
import deadlineDashImg from '../../assets/Deadline_Dash/Deadline_Dash.png';
import netflixCopyImg from '../../assets/netflix_copy/netflix_copy.png';
import chatkorImg from '../../assets/chatkor/chatkor.png';
import storiesImg from '../../assets/stories/stories.png';
import shaquibProfileImg from '../../assets/profile/shaquib-profile.png';

export const siteConfig = {
  profile: {
    name: 'Shaquib Wasif',
    username: 'shaquib_wasif',
    class: 'CS Student',
    level: '2nd Year — 2nd Semester',
    university: 'Islamic University of Technology',
    degree: 'B.Sc. in Computer Science and Engineering',
    graduationYear: '2028',
    tagline: 'Computer Science student. Storytelling through games — and trying to create one.',
    aboutHeading: 'System & Character Bio',
    aboutParagraphs: [
      'A 2nd-year CSE student exploring software engineering, graphics, cybersecurity, and game development. Fascinated by imaginative fictional worlds and how interactive media communicates stories.',
      'Driven by curiosity, technical experimentation, and a healthy dose of self-aware procrastination. Currently navigating core computer science while tinkering with 2D game loops, map design, and low-level software architectures.',
      'Not entirely certain where the eventual career path leads — whether deeply into game engines, security research, or system architecture — but building cool, meaningful projects along the way.'
    ],
    realPhotoUrl: shaquibProfileImg
  },

  stats: {
    title: 'Skills',
    description: 'Technical equipment, programming languages, tools, and platforms.',
    categories: [
      {
        id: 'languages',
        name: 'Languages',
        iconName: 'Code2',
        items: [
          { name: 'C', level: 'Core' },
          { name: 'C++', level: 'Core' },
          { name: 'Java', level: 'Proficient' },
          { name: 'SQL', level: 'Intermediate' },
          { name: 'Python', level: 'Basic' },
          { name: 'HTML', level: 'Standard' }
        ]
      },
      {
        id: 'databases',
        name: 'Databases',
        iconName: 'Database',
        items: [
          { name: 'PostgreSQL', level: 'Relational' },
          { name: 'MySQL', level: 'Relational' }
        ]
      },
      {
        id: 'frameworks',
        name: 'Frameworks & Engines',
        iconName: 'Cpu',
        items: [
          { name: 'LibGDX', level: '2D Engine' },
          { name: 'Godot', level: '2D/3D Engine' },
          { name: 'Raylib', level: 'C/C++ Graphics' },
          { name: 'Spring Boot', level: 'Java Backend' },
          { name: 'JavaFX', level: 'Desktop UI' }
        ]
      },
      {
        id: 'tools',
        name: 'Tools',
        iconName: 'Wrench',
        items: [
          { name: 'Git', level: 'Version Control' },
          { name: 'GitHub', level: 'Collab' },
          { name: 'Tiled', level: 'Map Editor' },
          { name: 'Scene Builder', level: 'JavaFX UI' },
          { name: 'Gradle', level: 'Build Tool' }
        ]
      },
      {
        id: 'ai',
        name: 'AI Workflow',
        iconName: 'Bot',
        items: [
          { name: 'AI-assisted development', level: 'Practical' },
          { name: 'LLM tools', level: 'Workflow' },
          { name: 'AI-assisted problem solving', level: 'Active' }
        ]
      }
    ]
  },

  quests: [
    {
      id: 'quest-01',
      code: 'PROJECT 01',
      title: 'Netflix Copy',
      type: 'CLASS PROJECT / LEARNING PROJECT',
      status: 'CLASS PROJECT',
      category: 'learning',
      tech: ['JavaFX', 'Scene Builder', 'Eclipse', 'CSS'],
      techDisplay: 'JavaFX / Scene Builder / Eclipse / CSS',
      image: netflixCopyImg,
      githubUrl: 'https://github.com/Shaquibbai',
      demoUrl: null,
      summary: 'A desktop clone of the Netflix application created as a class project while learning JavaFX and desktop UI layout.',
      details: [
        'Created as a class project exploring desktop UI development with JavaFX and Scene Builder.',
        'Implements custom CSS styling for dark media library cards and layout organization.',
        'Built using Eclipse IDE for Java GUI architecture fundamentals.'
      ],
      planetVisual: {
        hue: 350,
        gradient: 'radial-gradient(circle at 35% 35%, #f43f5e 0%, #be123c 55%, #4c0519 100%)',
        glow: 'rgba(244, 63, 94, 0.4)',
        sizeDesktop: 72,
        moons: [
          { name: 'JavaFX', dist: 52, speed: 22, color: '#f43f5e' },
          { name: 'Scene Builder', dist: 70, speed: 28, color: '#fb7185' },
          { name: 'Eclipse', dist: 86, speed: 34, color: '#e11d48' },
          { name: 'CSS', dist: 102, speed: 40, color: '#fda4af' }
        ]
      }
    },
    {
      id: 'quest-02',
      code: 'PROJECT 02',
      title: 'ChatKor',
      type: 'CLASS PROJECT / LEARNING PROJECT',
      status: 'CLASS PROJECT',
      category: 'learning',
      tech: ['JavaFX', 'Scene Builder', 'Eclipse', 'CSS'],
      techDisplay: 'JavaFX / Scene Builder / Eclipse / CSS',
      image: chatkorImg,
      githubUrl: 'https://github.com/Shaquibbai',
      demoUrl: null,
      summary: 'A desktop messaging and chat interface created as a class project exploring JavaFX event handling and UI layout.',
      details: [
        'Class project built to practice event-driven JavaFX desktop application architecture.',
        'Designed with Scene Builder layout containers and custom CSS theme styling.',
        'Features chat window layouts, messaging controls, and UI state handlers.'
      ],
      planetVisual: {
        hue: 280,
        gradient: 'radial-gradient(circle at 35% 35%, #a855f7 0%, #7e22ce 55%, #3b0764 100%)',
        glow: 'rgba(168, 85, 247, 0.4)',
        sizeDesktop: 72,
        moons: [
          { name: 'JavaFX', dist: 52, speed: 20, color: '#c084fc' },
          { name: 'Scene Builder', dist: 70, speed: 26, color: '#e879f9' },
          { name: 'Eclipse', dist: 86, speed: 32, color: '#a855f7' },
          { name: 'CSS', dist: 102, speed: 38, color: '#f0abfc' }
        ]
      }
    },
    {
      id: 'quest-03',
      code: 'PROJECT 03',
      title: 'Stories',
      type: 'CLASS PROJECT / LEARNING PROJECT',
      status: 'CLASS PROJECT',
      category: 'learning',
      tech: ['JavaFX', 'Scene Builder', 'Eclipse', 'CSS'],
      techDisplay: 'JavaFX / Scene Builder / Eclipse / CSS',
      image: storiesImg,
      githubUrl: 'https://github.com/Shaquibbai',
      demoUrl: null,
      summary: 'A story-driven desktop reader and application interface created as a class project exploring JavaFX UI composition.',
      details: [
        'Class project exploring interactive narrative presentation and UI composition in JavaFX.',
        'Built using Scene Builder and Eclipse IDE with modular desktop UI design.',
        'Demonstrates styled text views, custom navigation buttons, and CSS layouts.'
      ],
      planetVisual: {
        hue: 190,
        gradient: 'radial-gradient(circle at 35% 35%, #38bdf8 0%, #0284c7 55%, #082f49 100%)',
        glow: 'rgba(56, 189, 248, 0.4)',
        sizeDesktop: 72,
        moons: [
          { name: 'JavaFX', dist: 52, speed: 24, color: '#38bdf8' },
          { name: 'Scene Builder', dist: 70, speed: 30, color: '#7dd3fc' },
          { name: 'Eclipse', dist: 86, speed: 36, color: '#0284c7' },
          { name: 'CSS', dist: 102, speed: 42, color: '#bae6fd' }
        ]
      }
    },
    {
      id: 'quest-04',
      code: 'PROJECT 04',
      title: 'farmOS',
      type: 'TERMINAL FARM MANAGEMENT SYSTEM',
      status: 'COMPLETED',
      category: 'major',
      tech: ['C', 'C++', 'CLI', 'File Systems', 'Data Management'],
      techDisplay: 'C / C++ / CLI / File Systems',
      image: farmOsImg,
      githubUrl: 'https://github.com/sanmugdho/farmOS',
      demoUrl: null,
      summary: 'A terminal-based farm management system designed for managing agricultural data, inventory, and operations via CLI.',
      details: [
        'Built with C/C++ emphasizing structured CLI navigation and modular file processing.',
        'Provides inventory tracking, resource management, and state updates for farming workflows.',
        'Designed as a lightweight, terminal-native utility.'
      ],
      planetVisual: {
        hue: 340,
        gradient: 'radial-gradient(circle at 35% 35%, #fb7185 0%, #e11d48 50%, #881337 85%, #4c0519 100%)',
        glow: 'rgba(225, 29, 72, 0.5)',
        sizeDesktop: 88,
        moons: [
          { name: 'C', dist: 58, speed: 18, color: '#fb7185' },
          { name: 'C++', dist: 76, speed: 24, color: '#f43f5e' },
          { name: 'CLI', dist: 94, speed: 30, color: '#e11d48' },
          { name: 'File Systems', dist: 112, speed: 36, color: '#fda4af' },
          { name: 'Data Mgt', dist: 130, speed: 42, color: '#fecdd3' }
        ]
      }
    },
    {
      id: 'quest-05',
      code: 'PROJECT 05',
      title: 'Deadline Dash',
      type: '2D STORY-DRIVEN CAMPUS ADVENTURE',
      status: 'IN PROGRESS',
      category: 'major',
      tech: ['Java', 'LibGDX', 'Tiled', 'Gradle'],
      techDisplay: 'Java / LibGDX / Tiled / Gradle',
      image: deadlineDashImg,
      githubUrl: 'https://github.com/Shaquibbai/Deadline-Dash',
      demoUrl: null,
      summary: 'A 2D campus adventure game built around a story where a deadline gets shortened, forcing the player into a chaotic campus adventure.',
      details: [
        'Powered by Java and the LibGDX framework with custom game loop mechanics.',
        'Uses Tiled Map Editor for detailed 2D tilemap design and collision layer creation.',
        'Features custom story-driven quest progression inspired by real-life student deadline rushes.',
        'Managed and built via Gradle tooling.'
      ],
      planetVisual: {
        hue: 45,
        gradient: 'radial-gradient(circle at 35% 35%, #fde047 0%, #d97706 50%, #92400e 85%, #451a03 100%)',
        glow: 'rgba(217, 119, 6, 0.5)',
        sizeDesktop: 92,
        moons: [
          { name: 'Java', dist: 60, speed: 19, color: '#fde047' },
          { name: 'LibGDX', dist: 78, speed: 25, color: '#f59e0b' },
          { name: 'Tiled', dist: 96, speed: 31, color: '#d97706' },
          { name: 'Gradle', dist: 114, speed: 37, color: '#fef08a' }
        ]
      }
    }
  ],

  academics: [
    {
      id: 'bsc',
      level: 'B.Sc. in Computer Science and Engineering',
      institution: 'Islamic University of Technology',
      years: '2024 – 2028 (Expected)',
      gpa: 'In Progress (2nd Year, 2nd Semester)',
      highlight: 'Core CS subjects, Data Structures, Algorithms, Software Engineering.'
    },
    {
      id: 'hsc',
      level: 'Higher Secondary Certificate (HSC)',
      institution: 'Notre Dame College',
      years: '2021 – 2023',
      gpa: 'GPA 5.00',
      highlight: 'Science Stream — Focus on Mathematics, Physics, and ICT.'
    },
    {
      id: 'ssc',
      level: 'Secondary School Certificate (SSC)',
      institution: 'Monipur High School & College — Branch 3',
      years: '2011 – 2021',
      gpa: 'GPA 5.00',
      highlight: 'Science Stream — Foundational Academics.'
    }
  ],

  research: {
    status: 'UNDISCOVERED',
    heading: 'RESEARCH',
    title: 'Nothing here yet.',
    message: 'That\'s probably for another day. Currently building strong fundamentals in core computer science, graphics, and system architecture.',
    isDiscovered: false
  },

  interests: {
    title: 'INTERESTS',
    topics: [
      { name: 'Game Development', category: 'Creative' },
      { name: 'Storytelling', category: 'Creative' },
      { name: 'Game Design', category: 'Design' },
      { name: 'Map Design', category: 'Design' },
      { name: 'Graphics', category: 'Technical' },
      { name: 'Cybersecurity', category: 'Technical' },
      { name: 'AI', category: 'Technical' },
      { name: 'Anime', category: 'Fictional Worlds' },
      { name: 'One Piece', category: 'Fictional Worlds' },
      { name: 'Harry Potter', category: 'Fictional Worlds' },
      { name: 'Fantastic Beasts', category: 'Fictional Worlds' },
      { name: 'Imaginative Fiction', category: 'Worldbuilding' }
    ]
  },

  contact: {
    heading: 'CONTACT',
    description: 'Let\'s talk about games, code, or whatever comes next.',
    email: 'sushmit.ssc21@gmail.com',
    links: [
      {
        name: 'GitHub',
        label: 'github.com/Shaquibbai',
        url: 'https://github.com/Shaquibbai',
        iconName: 'Github'
      },
      {
        name: 'LinkedIn',
        label: 'linkedin.com/in/shaquib-wasif',
        url: 'https://www.linkedin.com/in/shaquib-wasif-9b4b06328/',
        iconName: 'Linkedin'
      },
      {
        name: 'Email',
        label: 'sushmit.ssc21@gmail.com',
        url: 'mailto:sushmit.ssc21@gmail.com',
        iconName: 'Mail'
      },
      {
        name: 'Discord',
        label: 'discordapp.com/users/1282724501758414870',
        url: 'https://discordapp.com/users/1282724501758414870',
        iconName: 'MessageSquare'
      },
      {
        name: 'itch.io',
        label: 'shaquibwasif.itch.io',
        url: 'https://shaquibwasif.itch.io/',
        iconName: 'Gamepad2'
      }
    ]
  }
};
