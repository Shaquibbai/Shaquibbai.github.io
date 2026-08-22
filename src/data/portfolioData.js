import farmOsImg from '../../assets/farmOS/farmOS.jfif';
import deadlineDashImg from '../../assets/Deadline_Dash/Deadline_Dash.png';
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
      title: 'farmOS',
      type: 'TERMINAL FARM MANAGEMENT SYSTEM',
      status: 'COMPLETED',
      tech: ['C', 'C++'],
      techDisplay: 'C / C++',
      image: farmOsImg,
      githubUrl: 'https://github.com/sanmugdho/farmOS',
      demoUrl: null,
      summary: 'A terminal-based farm management system designed for managing agricultural data, inventory, and operations via CLI.',
      details: [
        'Built with C/C++ emphasizing structured CLI navigation and modular file processing.',
        'Provides inventory tracking, resource management, and state updates for farming workflows.',
        'Designed as a lightweight, terminal-native utility.'
      ]
    },
    {
      id: 'quest-02',
      code: 'PROJECT 02',
      title: 'Deadline Dash',
      type: '2D STORY-DRIVEN CAMPUS ADVENTURE',
      status: 'IN PROGRESS',
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
      ]
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
