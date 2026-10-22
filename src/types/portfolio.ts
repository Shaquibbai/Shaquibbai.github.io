export interface SiteInfo {
  name: string;
  tagline: string;
  school: string;
  degree: string;
  short: string;
  intro: string;
  lede: string;
  path: string;
  plaque: [string, string];
  mat: string;
}

export interface ContactLink {
  id: string;
  label: string;
  url: string;
  show?: string;
  ph?: string;
  note?: string;
}

export interface LetterData {
  title: string;
  paras: string[];
  sign: string;
}

export interface StudyItem {
  t: string;
  d: string;
}

export interface BoardItem {
  t: string;
  d: string;
}

export interface CalItem {
  m: string;
  n: string;
}

export interface BackpackItem {
  i: string;
  n: string;
}

export interface SkillItem {
  id: string;
  name: string;
  icon: string;
  shelf: number;
  level: 'comfortable' | 'using' | 'learning' | 'unrated';
  exp: string;
  ex: string[];
  proj: string[];
}

export interface SkillLevel {
  label: string;
  pips: number;
  cls: string;
}

export interface BugItem {
  id: string;
  bug: 'beetle' | 'moth' | 'firefly' | 'ant';
  tag: string;
  name: string;
  sym: string;
  steps: string;
  cause: string;
  fix: string;
  lesson: string;
  where: string;
}

export interface ProjectItemData {
  id: string;
  type: 'binder' | 'folder' | 'box' | 'blueprint' | 'floppy' | 'drawer';
  status: 'live' | 'wip' | 'idea';
  row: number;
  name: string;
  blurb: string;
  role: string;
  contrib: string[];
  tech: string[];
  shots: string[];
  links: { label: string; url: string }[];
}

export interface TvChannel {
  id: string;
  name: string;
  face: 'games' | 'dev' | 'anime' | 'stories' | 'tech' | 'comedy' | 'cctv' | 'mystery';
  head: string;
  lines?: string[];
  air?: { label: string; text: string; url: string };
  foot?: string;
  tree?: string[];
  insp?: string[];
  jp?: string;
  body?: string;
  ticker?: string;
  page?: string;
  items?: [string, string][];
}

export interface BookItem {
  t: string;
  a: string;
  c: string;
  n: string;
}

export interface PosterItem {
  front: string;
  back: string;
}

export interface PinItem {
  t: string;
  n: string;
}

export interface PortfolioData {
  SITE: SiteInfo;
  LINKS: ContactLink[];
  COLLAB: string;
  LETTER: LetterData;
  STUDY: StudyItem[];
  BOARD: BoardItem[];
  CAL: CalItem[];
  BACKPACK: BackpackItem[];
  NOTEBOOK: string[];
  SKILLS: SkillItem[];
  LEVELS: Record<string, SkillLevel>;
  BUGS: BugItem[];
  PROJECTS: ProjectItemData[];
  CHANNELS: TvChannel[];
  CARD: string;
  BOOKS: BookItem[];
  POSTERS: PosterItem[];
  PINS: PinItem[];
  CONTROLLER: { t: string; n: string };
  PHONE?: { t: string; n: string };
  UNDERBED: { t: string; n: string };
  DRAWER: { t: string; n: string };
  WINDOW: { t: string; n: string };
  AVAILABILITY?: { t: string; n: string };
  AMBITIONS: { t: string; d: string }[];
  TOOLS: { t: string; d: string }[];
  DOORWAY: { t: string; d: string };
  CHALK: string[];
}

export interface FloorMeta {
  n: number;
  name: string;
  short: string;
  k: string;
  lede: string;
  y0: number;
  y1: number;
  todo?: number;
}
