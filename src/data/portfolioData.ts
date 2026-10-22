import { PortfolioData, FloorMeta } from '../types/portfolio';

export const FLOORS: FloorMeta[] = [
  { n: 1, name: 'Ground floor', short: 'Ground', k: 'Introduction & study', lede: 'Hello. The letter on the mat is the place to start.', y0: 660, y1: 790 },
  { n: 2, name: 'The Workshop', short: 'Workshop', k: 'Projects · tools · experiments', lede: 'Where code meets imagination. Pull a project file off the shelf.', y0: 525, y1: 660 },
  { n: 3, name: 'The Bedroom', short: 'Bedroom', k: 'Worlds, stories & diversions', lede: 'Quieter up here. Bedside light, television reception, and distractions.', y0: 390, y1: 525 },
  { n: 4, name: 'Under Construction', short: 'Building', k: 'Future ideas & contact', lede: 'Unfinished, on purpose. The contact noticeboard is always open.', y0: 240, y1: 390, todo: 1 }
];

export const PORTFOLIO_DATA: PortfolioData = {
  SITE: {
    name: 'Shaquib Wasif',
    tagline: 'I like telling stories. Sometimes, I build them.',
    school: 'Islamic University of Technology (IUT)',
    degree: 'B.Sc. in Computer Science and Engineering',
    short: 'CSE · IUT',
    intro: "I'm a CSE student fascinated by fictional worlds and interactive media. I build things where code meets imagination — and I'm still figuring out what I'll build next.",
    lede: 'I like telling stories. Sometimes, I build them.',
    path: "Building where code meets imagination — still figuring out what comes next.",
    plaque: ['Looks forbidding.', 'Usually isn’t.'],
    mat: 'Friendlier than I look.'
  },
  LINKS: [
    {
      id: 'github',
      label: 'GitHub',
      url: 'https://github.com/Shaquibbai',
      show: 'github.com/Shaquibbai',
      note: 'Code & repositories'
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/shaquib-wasif-9b4b06328/',
      show: 'linkedin.com/in/shaquib-wasif',
      note: 'Professional hellos'
    },
    {
      id: 'itch',
      label: 'itch.io',
      url: 'https://shaquibwasif.itch.io/',
      show: 'shaquibwasif.itch.io',
      note: 'Games & interactive builds'
    },
    {
      id: 'resume',
      label: 'Résumé / CV',
      url: '#resume',
      show: 'View & Download PDF',
      note: 'Verified credentials & skills'
    },
    {
      id: 'email',
      label: 'Email',
      url: 'mailto:sushmit.ssc21@gmail.com',
      show: 'sushmit.ssc21@gmail.com',
      note: 'Direct email'
    }
  ],
  COLLAB: "There's still work to do. Got an idea? Something interesting to build? Or just want to talk? I'd love to hear about it. Let's build the rest of this place together.",

  /* FLOOR 1 — Ground Floor: Introduction & Education */
  LETTER: {
    title: 'Hello, and come in.',
    paras: [
      'I like telling stories. Sometimes, I build them.',
      "I'm a CSE student fascinated by fictional worlds and interactive media. I build things where code meets imagination — and I'm still figuring out what I'll build next.",
      "This house is how I introduce myself: what I study on the ground floor, what I build in the workshop upstairs, the things that keep me up at night in the bedroom, and what I want to build next at the top.",
      'Everything in the house can be explored freely. If you prefer words without the architecture, there is a plain view at top right.'
    ],
    sign: 'Shaquib Wasif'
  },
  STUDY: [
    {
      t: 'Islamic University of Technology (IUT)',
      d: 'B.Sc. in Computer Science and Engineering · 2024–2028'
    },
    {
      t: 'Notre Dame College',
      d: 'Higher Secondary Certificate (HSC) · 2021–2023 · GPA 5.00'
    },
    {
      t: 'Monipur High School & College, Branch 3',
      d: 'Secondary School Certificate (SSC) · 2011–2021 · GPA 5.00'
    }
  ],
  BOARD: [
    { t: 'Studying', d: 'B.Sc. in CSE at Islamic University of Technology (2024–2028).' },
    { t: 'Building', d: 'Khelbi-Naki (real-time multiplayer party games) and story-driven mechanics.' },
    { t: 'Interests', d: 'Interactive media, fictional worlds, world-building, and systems architecture.' },
    { t: 'Wondering', d: 'What to construct next once the attic rafters are secured.' }
  ],
  CAL: [
    { m: 'Semester', n: 'CSE at IUT' },
    { m: 'Focus', n: 'Real-time systems & game dev' },
    { m: 'Free time', n: 'Tinkering with side projects' }
  ],
  BACKPACK: [
    { i: 'Laptop', n: 'Where game engines and terminal windows stay open simultaneously.' },
    { i: 'Notebook', n: 'Sketches of maps, level layouts, and plot outlines.' },
    { i: 'Headphones', n: 'Atmospheric game soundtracks and podcasts.' },
    { i: 'Charger', n: 'Constantly tethered to the nearest wall outlet.' },
    { i: 'Dice', n: 'A single twenty-sided die from an unfinished tabletop game.' }
  ],
  NOTEBOOK: [
    'A good fictional world makes you want to explore even when there is no quest marker left.',
    'Room synchronization in Socket.IO: magical when it works on localhost, hilarious when four cousins connect on 3G.',
    'Started an idea at 2 AM. Looked like a breakthrough on paper. By noon it was three nested loops and an unhandled Promise.'
  ],

  /* FLOOR 2 — Workshop: Featured Projects, Experiments & Skills */
  SKILLS: [
    /* Shelf 0: Core Languages & Foundational Systems */
    { id: 'c', name: 'C', icon: 'nut', shelf: 0, level: 'comfortable', exp: 'Low-level systems programming, memory management, and procedural logic.', ex: ['Coursework & algorithmic problem solving.'], proj: ['farmos'] },
    { id: 'cpp', name: 'C++', icon: 'nut', shelf: 0, level: 'comfortable', exp: 'Object-oriented programming, data structures, and terminal simulations.', ex: ['farmOS farm management simulation.'], proj: ['farmos'] },
    { id: 'java', name: 'Java', icon: 'book', shelf: 0, level: 'comfortable', exp: 'Object-oriented design, desktop applications, and 2D game loops.', ex: ['Deadline Dash adventure game', 'JavaFX desktop interfaces.'], proj: ['deadline-dash', 'archive'] },
    { id: 'sql', name: 'SQL & MySQL', icon: 'lens', shelf: 0, level: 'using', exp: 'Relational data modeling with SQL and MySQL, entity relationships and query operations.', ex: ['Schema design and query operations.'], proj: ['khelbi'] },
    { id: 'git', name: 'Git & GitHub', icon: 'toolbox', shelf: 0, level: 'comfortable', exp: 'Branching workflows, version control, and team collaboration.', ex: ['All public and collaborative repositories.'], proj: ['deadline-dash', 'khelbi'] },

    /* Shelf 1: Desktop & Web (Currently Learning) */
    { id: 'javafx', name: 'JavaFX', icon: 'compass', shelf: 1, level: 'using', exp: 'Desktop GUI development with modular layouts and event handlers.', ex: ['Netflix Copy', 'ChatKor messaging interface.'], proj: ['archive'] },
    { id: 'react', name: 'React', icon: 'gyro', shelf: 1, level: 'using', exp: 'Component-driven front-ends, state management, and real-time interactive UI.', ex: ['Front end of Khelbi-Naki.'], proj: ['khelbi'] },
    { id: 'node', name: 'Node.js', icon: 'nut', shelf: 1, level: 'using', exp: 'Server runtimes, event loops, and asynchronous web services.', ex: ['Server runtime for Khelbi-Naki.'], proj: ['khelbi'] },
    { id: 'socket', name: 'Socket.IO', icon: 'plug', shelf: 1, level: 'using', exp: 'Bi-directional WebSocket communication and real-time room synchronization.', ex: ['Multiplayer room sync in Khelbi-Naki.'], proj: ['khelbi'] },
    { id: 'htmlcss', name: 'HTML5 & CSS3', icon: 'parcel', shelf: 1, level: 'comfortable', exp: 'Responsive layouts, SVG illustrations, and handcrafted UI animations.', ex: ['Custom web apps and interactive experiences.'], proj: ['khelbi'] },

    /* Shelf 2: Game Tools, Engines & World-Building */
    { id: 'libgdx', name: 'LibGDX', icon: 'toolbox', shelf: 2, level: 'using', exp: 'Cross-platform Java game framework for 2D rendering, audio, and physics.', ex: ['Deadline Dash campus adventure game.'], proj: ['deadline-dash'] },
    { id: 'tiled', name: 'Tiled Map Editor', icon: 'lens', shelf: 2, level: 'comfortable', exp: 'Orthogonal tilemaps, collision layers, and environmental world-building.', ex: ['IUT campus map design in Deadline Dash.'], proj: ['deadline-dash'] },
    { id: 'godot', name: 'Godot', icon: 'gyro', shelf: 2, level: 'learning', exp: 'Scene trees, node architecture, and 2D/3D gameplay prototyping.', ex: ['Game jam experiments and mechanics prototyping.'], proj: [] },
    { id: 'raylib', name: 'Raylib', icon: 'stopwatch', shelf: 2, level: 'using', exp: 'Hardware-accelerated 2D graphics programming in C/C++.', ex: ['Lightweight game loops and rendering experiments.'], proj: [] },
    { id: 'worldbuilding', name: 'Game Design & World-Building', icon: 'book', shelf: 2, level: 'comfortable', exp: 'Narrative structure, quest systems, atmosphere, and player pacing.', ex: ['Deadline Dash narrative branches and IUT setting.'], proj: ['deadline-dash'] }
  ],
  LEVELS: {
    comfortable: { label: 'Comfortable', pips: 3, cls: '' },
    using: { label: 'In regular use', pips: 2, cls: '' },
    learning: { label: 'Still learning', pips: 1, cls: 'learn' },
    unrated: { label: 'Core tool', pips: 0, cls: 'dash' }
  },
  BUGS: [
    {
      id: 'b1',
      bug: 'beetle',
      tag: 'JAR 01',
      name: 'Off-by-one collision on room boundaries',
      sym: 'Player clipped through the library brick wall when sprinting diagonally.',
      steps: 'Move diagonally into any north-west corner while holding shift.',
      cause: 'Hitbox bounds check evaluated floating-point tile coordinates before ceil().',
      fix: 'Clamped discrete tile bounding boxes prior to velocity projection.',
      lesson: 'Collision detection should never trust raw continuous delta coordinates.',
      where: 'Deadline Dash'
    },
    {
      id: 'b2',
      bug: 'moth',
      tag: 'JAR 02',
      name: 'Socket zombie room desync',
      sym: 'Disconnected mobile players remained listed as active voters during Werewolf rounds.',
      steps: 'Toggle airplane mode during nighttime voting phase.',
      cause: 'Client disconnect event failed to clean up the ephemeral room member registry.',
      fix: 'Added heartbeat ping-pong timeout and room reaper loop on server disconnect.',
      lesson: 'Mobile networks drop silently; never assume a client will send a polite goodbye.',
      where: 'Khelbi-Naki'
    },
    {
      id: 'b3',
      bug: 'firefly',
      tag: 'JAR 03',
      name: 'Floating point inventory drift',
      sym: 'Grain silo inventory in farmOS displayed -0.00001 bushels after sale.',
      steps: 'Sell exact remaining harvest in fractional units.',
      cause: 'IEEE 754 precision error in double subtraction.',
      fix: 'Transitioned all unit accounting to integer cents / grams.',
      lesson: 'Never store money or discrete stock as floating-point numbers.',
      where: 'farmOS'
    },
    {
      id: 'b4',
      bug: 'ant',
      tag: 'JAR 04',
      name: 'Unbound dialogue queue recursion',
      sym: 'NPC repeated campus lore endlessly if dialogue was skipped on the exact frame.',
      steps: 'Spam spacebar while walking past the campus tea stall.',
      cause: 'Debounce flag cleared prior to dialogue completion callback.',
      fix: 'Locked player interaction trigger state until the textbox transitions out.',
      lesson: 'Debounce states must lock the trigger, not just the handler.',
      where: 'Deadline Dash'
    }
  ],
  PROJECTS: [
    {
      id: 'khelbi',
      type: 'binder',
      status: 'wip',
      row: 0,
      name: 'Khelbi-Naki',
      blurb: 'A real-time multiplayer party-game platform built around the idea of having something fun to play with friends and cousins.',
      role: 'Full-stack development and game design',
      contrib: [
        'Real-time multiplayer and room synchronization.',
        'Party-game experiences including OneShot, Kings Dice, and Werewolf.',
        'React and Vite client with low-latency responsive room UI for mobile browsers.',
        'Node.js and Express server with Socket.IO room coordination and reconnection resilience.'
      ],
      tech: ['React', 'Vite', 'Node.js', 'Express', 'Socket.IO'],
      shots: [],
      links: [
        { label: 'Live Demo', url: 'https://khelbi-naki.onrender.com/' },
        { label: 'Repository', url: 'https://github.com/Shaquibbai/Khelbi_Naki' }
      ]
    },
    {
      id: 'deadline-dash',
      type: 'folder',
      status: 'live',
      row: 0,
      name: 'Deadline Dash',
      blurb: 'A 2D, story-driven adventure set around the IUT campus, featuring NPCs, quests, inventory, a countdown, reputation, and multiple endings.',
      role: 'Campus world-building, mechanics, and core systems',
      contrib: [
        'Campus maps and world-building (the part I’m most proud of).',
        'Player movement, physics, and sprite animation systems.',
        'Camera tracking, countdown timer, and quest state machines.',
        'Reputation system and branching narrative endings.',
        'Opening and ending narrative sequences.',
        'The campus football minigame (a particularly technical part).'
      ],
      tech: ['Java', 'LibGDX', 'Tiled', 'Game Design'],
      shots: [],
      links: [
        { label: 'Repository', url: 'https://github.com/Shaquibbai/Deadline-Dash' }
      ]
    },
    {
      id: 'farmos',
      type: 'box',
      status: 'live',
      row: 1,
      name: 'farmOS',
      blurb: 'A C/C++ terminal-based farm management system.',
      role: 'Collaborative academic development',
      contrib: [
        '“Maybe every guy has dreamed of owning a farm at some point. We decided to build a farm management system.”',
        'Modular terminal user interface with structured menu hierarchies and ASCII layout.',
        'Core C/C++ simulation algorithms for crop growth cycles, livestock upkeep, and market fluctuations.',
        'File persistence system saving farm state across CLI sessions.'
      ],
      tech: ['C++', 'C', 'Terminal / CLI'],
      shots: [],
      links: [
        { label: 'Repository', url: 'https://github.com/sanmugdho/farmOS' }
      ]
    },
    {
      id: 'archive',
      type: 'drawer',
      status: 'idea',
      row: 2,
      name: 'Coursework & Desktop Experiments',
      blurb: 'Smaller desktop interfaces and earlier experiments kept together in the flat-file drawer.',
      role: 'Student developer',
      contrib: [
        'Netflix Copy — JavaFX desktop interface inspired by Netflix with media browse grids.',
        'ChatKor — JavaFX messaging/chat interface exploring client networking.',
        'Stories — Story-driven desktop reader and narrative interface.'
      ],
      tech: ['Java', 'JavaFX', 'Desktop GUI'],
      shots: [],
      links: []
    }
  ],

  /* FLOOR 3 — Bedroom: Personality, Fictional Worlds & Collectibles */
  CHANNELS: [
    {
      id: 'cctv',
      name: 'CH 00 · UNLISTED',
      face: 'cctv',
      head: 'RESIDENCE CCTV // ARCHIVE FEED 00',
      lines: [
        'CAM 01: Ground Floor skirting board.',
        'Subject detected: drafting miniature blueprints on a matchbox using stolen pencils.',
        'STATUS: Progressing faster than the human upstairs.',
        'NOTE: Black feather recovered from Attic rafter. Cross-referencing suspected crow accomplice.'
      ],
      foot: 'Press 1-5 to return to regular broadcast'
    },
    {
      id: 'games',
      name: 'CH 01 · Games & Lore',
      face: 'games',
      head: 'NOW PLAYING · WORLD ARCHIVES',
      lines: [
        'Hollow Knight — Hallownest’s quiet ruin and storytelling through architecture.',
        'The Witcher 3 — Quests that make ordinary moral choices genuinely difficult.',
        'Khelbi-Naki — Playtesting party minigames with friends and cousins.'
      ],
      air: { label: 'Currently on air', text: 'Khelbi-Naki: multiplayer party games', url: 'https://khelbi-naki.onrender.com/' },
      foot: 'Press Ch + or Ch − to tune'
    },
    {
      id: 'anime',
      name: 'CH 02 · Fantasy & Anime',
      face: 'anime',
      head: 'ONE PIECE & FANTASY CHRONICLES',
      jp: '今夜の物語',
      body: 'From the Straw Hat crew sailing into uncharted seas to Demon Slayer’s breathless breathing forms and the grit of the Black Bulls — stories where ambition and friendship outgrow the world they were given.',
      ticker: 'One Piece: Chapter 1000+ still delivering · Demon Slayer animation craft · Black Clover perseverance · The Marauder’s Map was the best piece of magical UX ever conceived.'
    },
    {
      id: 'comedy',
      name: 'CH 03 · Stand-Up Comedy',
      face: 'comedy',
      head: 'LATE NIGHT OBSERVATIONS',
      lines: [
        '“I told myself I’d work on my project for thirty minutes. It’s now 3:45 AM and I’ve watched six videos on how samurai swords are folded.”',
        '“Debugging is like being the detective in a crime movie where you are also the murderer.”',
        '“The hardest part of game development is not the math. It’s admitting your character jumps like a refrigerator.”'
      ]
    },
    {
      id: 'tech',
      name: 'CH 04 · How It Works',
      face: 'tech',
      head: '$ explain --curious',
      lines: [
        'How WebSocket handshakes upgrade HTTP into persistent streams.',
        'Spatial partitioning: how quadtrees keep 2D game loops from choking.',
        'Why vintage CRT screens curved: electron gun geometry and phosphorus glow.'
      ]
    },
    {
      id: 'mystery',
      name: 'CH 05 · Unsolved Cases',
      face: 'mystery',
      head: 'CASE FILE: MISSING WORKSHOP TOOL',
      lines: [
        'Exhibit A: A tool-shaped empty outline on the Workshop pegboard.',
        'Exhibit B: The crow on the Attic rafters looking suspiciously satisfied.',
        'Conclusion: Tool was not stolen; it merely decided to seek higher ground.'
      ]
    }
  ],
  CARD: 'Please stand by.\nThere is more of this house than the picture shows.',
  BOOKS: [
    {
      t: 'One Piece, Vol. 1',
      a: 'Eiichiro Oda',
      c: '#b83b32',
      n: 'The Straw Hat on the shelf. The greatest journey starts with a small dinghy and an absurd dream.'
    },
    {
      t: 'Harry Potter & Prisoner of Azkaban',
      a: 'J.K. Rowling',
      c: '#2b385b',
      n: 'The Marauder’s Map. A magical world that felt like it lived in the margins of everyday life.'
    },
    {
      t: 'Game Programming Patterns',
      a: 'Robert Nystrom',
      c: '#3d6f64',
      n: 'The game loop and state machine chapters saved more projects than any stack overflow thread.'
    },
    {
      t: 'Demon Slayer: Kimetsu no Yaiba',
      a: 'Koyoharu Gotouge',
      c: '#8a6a3a',
      n: 'Perseverance, breath styles, and the beauty of characters who refuse to give up.'
    },
    {
      t: 'Designing Data-Intensive Applications',
      a: 'Martin Kleppmann',
      c: '#5c4a3b',
      n: 'A book you open innocently until you realize distributed consensus is an existential puzzle.'
    },
    {
      t: 'How to Procrastinate Productively',
      a: 'Anonymous',
      c: '#6f2639',
      n: 'Still on chapter one. Intending to finish it tomorrow afternoon.'
    }
  ],
  POSTERS: [
    {
      front: 'Grand Line Chart',
      back: 'An adventure-themed nautical map of strange islands, reverse currents, and uncharted waters.'
    },
    {
      front: 'The Black Bulls Banner',
      back: 'A rough ink emblem. A quiet reminder that outsiders and underdogs build their own way forward.'
    },
    {
      front: 'Night Sky Map',
      back: 'An ink and parchment star chart with one constellation circled lightly in pencil.'
    }
  ],
  PINS: [
    {
      t: 'Note to self',
      n: 'A story that does not take risks is just a manual in disguise.'
    },
    {
      t: 'Idea scrap',
      n: 'A game where talking to NPCs changes the physical layout of the building.'
    },
    {
      t: 'To-do (aged well)',
      n: 'Finish the portfolio house. Add a crow. Keep the roof open to the stars.'
    }
  ],
  CONTROLLER: {
    t: 'The controller',
    n: 'Story-driven adventures and casual multiplayer. Always willing to lose ten rounds in a row if the game is fun with friends.'
  },
  PHONE: {
    t: 'The smartphone',
    n: 'Just five more minutes. The feed is infinite: three cooking videos, an argument between strangers, and a recipe for soup you will never make.'
  },
  UNDERBED: {
    t: 'Under the bed',
    n: 'Dust motes, two missing socks, and a pair of glowing eyes that vanish the moment you look directly at them.'
  },
  DRAWER: {
    t: 'Bedside drawer',
    n: 'Inside: A notebook of game ideas, a spare USB drive, and the beginning of a story set in an old house.'
  },
  WINDOW: {
    t: 'The window',
    n: 'Night sky, distant hill silhouettes, and the quiet feeling that someone somewhere is also coding at 3 AM.'
  },

  /* FLOOR 4 — Under Construction: Future Ideas & Contact */
  AVAILABILITY: {
    t: 'Currently accepting side quests.',
    n: 'Open to internship opportunities, interesting collaborations, and projects worth getting carried away with.'
  },
  AMBITIONS: [
    {
      t: 'JARVIS-inspired Local Assistant',
      d: 'An ambitious idea. Exploring voice models, local LLM orchestration, and home automation hooks. Currently arguing with the blueprint.'
    },
    {
      t: 'Interactive Narrative Engine',
      d: 'A modular dialogue and quest graph system with reputation tracking and real-time environmental reactions.'
    },
    {
      t: 'What comes next',
      d: 'Still undecided. Software, games, or the space where code meets imagination.'
    }
  ],
  TOOLS: [
    { t: 'Godot Engine', d: 'Prototyping physics and node-based scene workflows.' },
    { t: 'WebSockets & RTC', d: 'Low-latency state synchronization across mobile networks.' },
    { t: 'Local AI Runtimes', d: 'Experimenting with lightweight on-device models on the bench.' }
  ],
  DOORWAY: {
    t: 'The unfinished doorway',
    d: 'This room hasn’t been decided yet. It might become a studio, a lab, or a place for whatever comes next. Stars through the gap are free.'
  },
  CHALK: ['Say hello →', 'Bring tea', 'Measure twice']
};
