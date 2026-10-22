import {
  R, RX, P, L, C, E, T, TC, G, TR, rot, glow,
  f, resetSeed, INK
} from './svgHelpers';
import { buildShell, pool, cs, motes, FY, CY } from './roomShell';
import { obj } from './objHelper';
import { winGlass, lampPend } from './scenePieces';
import { floorDoorArt } from './doorArt';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { BugItem, ProjectItemData } from '../types/portfolio';

export const JAR_X = [646, 732, 818, 904];
export const JAR_BASE = 560;
export const SHELF_BOARDS = [322, 454, 586];
export const SK_X0 = 212;
export const SK_DX = 68;

export function icon(name: string, col = '#c9a463'): string {
  let s = '';
  let i: number;
  let a: number;

  switch (name) {
    case 'gyro':
      s = L('M8 44H36M22 44V38', 1.6) +
          E(22, 22, 17, 17, 'none', 0).replace('fill="none"', 'fill="none" stroke="' + INK + '" stroke-width="2.4"') +
          E(22, 22, 17, 17, 'none', 0).replace('fill="none"', 'fill="none" stroke="' + col + '" stroke-width="1"') +
          rot(60, 22, 22, E(22, 22, 12, 17, 'none', 0).replace('fill="none"', 'fill="none" stroke="' + INK + '" stroke-width="2.2"')) +
          rot(60, 22, 22, E(22, 22, 12, 17, 'none', 0).replace('fill="none"', 'fill="none" stroke="#7fb3a6" stroke-width=".9"')) +
          C(22, 22, 4.4, col, 1.4) +
          '<g class="spin"><path d="M22 18V26M18 22H26" stroke="' + INK + '" stroke-width="1.1"/></g>';
      break;

    case 'stopwatch':
      s = R(19, 2, 6, 5, '#8a8490', 1.2) +
          C(22, 25, 16, '#e8dcca', 1.8) +
          C(22, 25, 12.6, '#f3ead9', 1) +
          L('M22 25V16M22 25L29 28', 1.6, INK) +
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(function (k) {
            a = k * Math.PI / 6;
            return L('M' + f(22 + Math.sin(a) * 10.4) + ' ' + f(25 - Math.cos(a) * 10.4) + 'L' + f(22 + Math.sin(a) * 12) + ' ' + f(25 - Math.cos(a) * 12), 0.8, INK);
          }).join('') +
          C(22, 25, 1.6, '#6f2639');
      break;

    case 'nut':
      s = P([[22, 5], [37, 13.5], [37, 30.5], [22, 39], [7, 30.5], [7, 13.5]], col, 1.8) +
          P([[22, 5], [37, 13.5], [22, 22], [7, 13.5]], '#fff', 0).replace('/>', ' opacity=".18"/>') +
          C(22, 22, 8, '#1d1527', 1.6) +
          L('M10 14L22 22M34 14L22 22', 0.7, INK, 0.5) +
          L('M10 44H34', 1.4);
      break;

    case 'parcel':
      s = R(4, 14, 36, 28, '#b58a58', 1.8) +
          R(4, 14, 36, 28, 'url(#pHatch)').replace('/>', ' opacity=".4"/>') +
          R(19, 14, 6, 28, '#e8dcca', 0).replace('/>', ' opacity=".85"/>') +
          L('M4 14L9 8H35L40 14', 1.6) +
          R(9, 8, 26, 6, '#c79a68', 1.4) +
          R(10, 26, 14, 9, '#f0e6d0', 0.9) +
          L('M12 29h10M12 32h7', 0.6, INK, 0.7) +
          L('M22 8c-3-6-9-6-9-2s6 3 9 2c3 1 9 2 9-2s-6-4-9 2', 1.2, '#6f2639');
      break;

    case 'plug':
      s = RX(10, 6, 24, 20, 5, '#3a2f3f', 1.8) +
          R(15, 26, 5, 9, '#c9bba3', 1.2) +
          R(24, 26, 5, 9, '#c9bba3', 1.2) +
          L('M12 12H32', 0.8, '#a1a0a8', 0.6) +
          L('M22 35C22 40 14 38 12 44', 2, INK) +
          C(22, 16, 2.2, '#7fb3a6', 0.8);
      break;

    case 'book':
      s = R(8, 6, 26, 38, '#6f2639', 1.8) +
          R(8, 6, 5, 38, '#4d1a2a', 1.2) +
          L('M16 14H30M16 18H27', 1, '#e8dcca', 0.8) +
          R(15, 26, 16, 9, 'none', 0.8, '#e8dcca') +
          R(6, 41, 30, 3, '#e8dcca', 1);
      break;

    case 'toolbox':
      s = R(3, 16, 38, 26, '#7a3b2e', 1.8) +
          R(3, 24, 38, 3, '#000').replace('/>', ' opacity=".3"/>') +
          R(17, 22, 10, 8, '#c9a463', 1.2) +
          L('M13 16V10Q13 6 17 6H27Q31 6 31 10V16', 2.2) +
          L('M13 16V10Q13 6 17 6H27Q31 6 31 10V16', 0.8, '#a1a0a8');
      break;

    case 'compass':
      s = C(22, 24, 17, '#c9a463', 1.8) +
          C(22, 24, 13, '#f1e6cf', 1.2) +
          P([[22, 12], [26, 24], [22, 36], [18, 24]], '#fff', 0) +
          P([[22, 12], [25, 24], [19, 24]], '#6f2639', 0.8) +
          P([[22, 36], [25, 24], [19, 24]], '#3f6f64', 0.8) +
          C(22, 24, 1.6, INK) +
          '<rect x="19" y="3" width="6" height="5" fill="#8a8490" stroke="' + INK + '" stroke-width="1.2"/>';
      break;

    case 'lens':
      s = C(18, 18, 13, '#bfe3d8', 2) +
          C(18, 18, 13, '#fff', 0).replace('/>', ' opacity=".15"/>') +
          L('M12 12Q14 8 19 8', 1.3, '#fff', 0.8) +
          L('M28 28L40 42', 5, INK) +
          L('M28 28L40 42', 2.6, '#8a5a38') +
          C(18, 18, 13, 'none', 2.4, '#c9a463');
      break;

    case 'cog': {
      let d = '';
      for (i = 0; i < 8; i++) {
        a = i * Math.PI / 4;
        const a1 = a - 0.17;
        const a2 = a + 0.17;
        d += (i ? 'L' : 'M') +
             f(22 + Math.cos(a1) * 14) + ' ' + f(22 + Math.sin(a1) * 14) + 'L' +
             f(22 + Math.cos(a1 + 0.06) * 19) + ' ' + f(22 + Math.sin(a1 + 0.06) * 19) + 'L' +
             f(22 + Math.cos(a2 - 0.06) * 19) + ' ' + f(22 + Math.sin(a2 - 0.06) * 19) + 'L' +
             f(22 + Math.cos(a2) * 14) + ' ' + f(22 + Math.sin(a2) * 14);
      }
      s = '<g class="spin">' +
          '<path d="' + d + 'Z" fill="#8a8490" stroke="' + INK + '" stroke-width="1.8"/>' +
          C(22, 22, 6, '#1d1527', 1.6) +
          '</g>';
      break;
    }

    case 'notebook':
      s = R(8, 4, 28, 38, '#2d3a55', 1.8) +
          R(8, 4, 4, 38, '#1a2236', 1) +
          R(15, 12, 16, 10, '#e8dcca', 0.8) +
          L('M17 16H29M17 19H25', 0.6, INK, 0.7);
      break;

    case 'floppy':
      s = P([[5, 6], [35, 6], [40, 11], [40, 40], [5, 40]], '#2b2f3a', 1.8) +
          R(11, 6, 18, 12, '#a1a0a8', 1) +
          R(22, 8, 4, 8, '#2b2f3a', 0.8) +
          R(10, 24, 26, 16, '#e8dcca', 1) +
          L('M13 29H33M13 33H29', 0.6, INK, 0.6);
      break;
  }

  return s;
}

export function bugArt(k: string): string {
  let s = '';
  if (k === 'beetle') {
    s = L('M-6 -4L-10 -8M-6 0L-11 0M-6 4L-10 8M6 -4L10 -8M6 0L11 0M6 4L10 8', 1, INK) +
        E(0, 0, 8, 5.6, '#2d3a55', 1) +
        L('M0 -5.4V5.4', 0.8, '#7fb3a6') +
        E(-1, -1, 5, 2, '#fff', 0).replace('/>', ' opacity=".15"/>') +
        C(8.6, 0, 3, '#0b090d') +
        L('M10 -2L13 -5M10 2L13 5', 0.8, INK);
  }
  if (k === 'moth') {
    s = P([[0, 0], [-9, -8], [-11, 2], [-4, 5]], '#c9bba3', 0.9) +
        P([[0, 0], [9, -8], [11, 2], [4, 5]], '#c9bba3', 0.9) +
        E(0, 1, 2, 5, '#6b5a4a', 0.8) +
        L('M-1 -4L-3 -9M1 -4L3 -9', 0.8, INK) +
        C(-3, -3, 1.2, '#6f2639') +
        C(3, -3, 1.2, '#6f2639');
  }
  if (k === 'firefly') {
    s = '<circle r="9" fill="url(#gLamp)"/>' +
        E(0, 0, 6, 3.4, '#2b2f3a', 0.9) +
        E(-3, 0, 3, 3, '#ffe9a8', 0) +
        P([[-1, -2], [-7, -7], [0, -3]], '#cfd8f0', 0.4).replace('/>', ' opacity=".7"/>') +
        C(5, 0, 2.2, '#0b090d');
  }
  if (k === 'ant') {
    s = L('M-3 0L-6 -5M0 0L-1 -6M3 0L5 -5M-3 0L-6 5M0 0L-1 6M3 0L5 5', 0.8, INK) +
        E(-5, 0, 3.4, 2.6, '#6f2639', 0.7) +
        E(0, 0, 2.2, 2, '#6f2639', 0.7) +
        E(5, 0, 2.8, 2.4, '#6f2639', 0.7) +
        L('M7 -1L10 -4M7 1L10 4', 0.7, INK);
  }
  return s;
}

export function techLogo(id: string): string {
  switch (id) {
    case 'cpp':
      return (
        '<g class="logo-cpp">' +
        '<polygon points="18,3 32,10 32,26 18,33 4,26 4,10" fill="#00599c" stroke="#004482" stroke-width="1.2"/>' +
        '<polygon points="18,5 30,11 30,25 18,31 6,25 6,11" fill="none" stroke="#659ad2" stroke-width="0.8" opacity="0.6"/>' +
        '<path d="M19,13 A6,6 0 1 0 19,23" fill="none" stroke="#ffffff" stroke-width="2.6" stroke-linecap="round"/>' +
        '<path d="M21,16 h3 M22.5,14.5 v3 M26,18 h3 M27.5,16.5 v3" stroke="#659ad2" stroke-width="1.8" stroke-linecap="round"/>' +
        '</g>'
      );
    case 'c':
      return (
        '<g class="logo-c">' +
        '<polygon points="18,3 32,10 32,26 18,33 4,26 4,10" fill="#004482" stroke="#002d57" stroke-width="1.2"/>' +
        '<polygon points="18,5 30,11 30,25 18,31 6,25 6,11" fill="none" stroke="#659ad2" stroke-width="0.8" opacity="0.6"/>' +
        '<path d="M21,12 A6.5,6.5 0 1 0 21,24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>' +
        '</g>'
      );
    case 'java':
      return (
        '<g class="logo-java">' +
        '<path d="M15,6 Q17,9 14,12 Q12,15 16,17" fill="none" stroke="#ea2d2e" stroke-width="1.5" stroke-linecap="round"/>' +
        '<path d="M19,4 Q22,8 18,12 Q16,15 20,18" fill="none" stroke="#f89820" stroke-width="1.5" stroke-linecap="round"/>' +
        '<path d="M10,18 H26 L24,27 Q23,30 18,30 Q13,30 12,27 Z" fill="#5382a1" stroke="#2c5364" stroke-width="1"/>' +
        '<path d="M24,20 Q29,20 28,24 Q27,27 23,27" fill="none" stroke="#5382a1" stroke-width="1.8"/>' +
        '<path d="M8,30 Q18,33 28,30" fill="none" stroke="#f89820" stroke-width="1.8" stroke-linecap="round"/>' +
        '</g>'
      );
    case 'sql':
      return (
        '<g class="logo-sql">' +
        '<ellipse cx="18" cy="24" rx="10" ry="3.5" fill="#005e73" stroke="#00758f" stroke-width="1"/>' +
        '<path d="M8,24 v4 c0,2 4.5,3.5 10,3.5 s10,-1.5 10,-3.5 v-4" fill="#00758f" stroke="#004b5c" stroke-width="1"/>' +
        '<path d="M10,18 Q16,8 24,11 Q27,13 28,17 Q25,16 23,19 Q18,17 14,21 Z" fill="#f29111"/>' +
        '<circle cx="25" cy="13" r="0.8" fill="#fff"/>' +
        '</g>'
      );
    case 'git':
      return (
        '<g class="logo-git">' +
        '<rect x="6" y="6" width="24" height="24" rx="4" transform="rotate(45 18 18)" fill="#f05032" stroke="#d0381e" stroke-width="1"/>' +
        '<circle cx="13" cy="18" r="2.2" fill="#fff"/>' +
        '<circle cx="23" cy="14" r="2.2" fill="#fff"/>' +
        '<circle cx="23" cy="22" r="2.2" fill="#fff"/>' +
        '<path d="M13,18 H19 Q21,18 21,16 V14 M19,18 Q21,18 21,20 V22" fill="none" stroke="#fff" stroke-width="1.8"/>' +
        '</g>'
      );
    case 'javafx':
      return (
        '<g class="logo-javafx">' +
        '<path d="M8,11 L16,7 L20,17 L12,21 Z" fill="#e76f00"/>' +
        '<path d="M16,15 L28,9 L24,25 L14,23 Z" fill="#2c72b8"/>' +
        '<rect x="9" y="25" width="18" height="8" rx="2" fill="#1d1527" stroke="#e8dcca" stroke-width="0.8"/>' +
        '<text x="18" y="31.5" font-family="sans-serif" font-size="6.5" font-weight="bold" fill="#f2b35e" text-anchor="middle">FX</text>' +
        '</g>'
      );
    case 'react':
      return (
        '<g class="logo-react">' +
        '<circle cx="18" cy="18" r="2.8" fill="#61dafb"/>' +
        '<ellipse cx="18" cy="18" rx="14" ry="5.2" fill="none" stroke="#61dafb" stroke-width="1.4"/>' +
        '<ellipse cx="18" cy="18" rx="14" ry="5.2" transform="rotate(60 18 18)" fill="none" stroke="#61dafb" stroke-width="1.4"/>' +
        '<ellipse cx="18" cy="18" rx="14" ry="5.2" transform="rotate(120 18 18)" fill="none" stroke="#61dafb" stroke-width="1.4"/>' +
        '</g>'
      );
    case 'node':
      return (
        '<g class="logo-node">' +
        '<polygon points="18,4 31,11 31,25 18,32 5,25 5,11" fill="#212121" stroke="#539e43" stroke-width="1.6"/>' +
        '<path d="M12,24 V12 L24,24 V12" fill="none" stroke="#68a063" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' +
        '</g>'
      );
    case 'socket':
      return (
        '<g class="logo-socket">' +
        '<circle cx="18" cy="18" r="14" fill="#010101" stroke="#ffffff" stroke-width="1.5"/>' +
        '<path d="M19,7 L12,19 H18 L17,29 L24,17 H18 Z" fill="#ffffff"/>' +
        '</g>'
      );
    case 'htmlcss':
      return (
        '<g class="logo-htmlcss">' +
        '<polygon points="7,8 19,8 17.5,25 13,27 8.5,25" fill="#e44d26"/>' +
        '<polygon points="17,8 29,8 27.5,25 23,27 18.5,25" fill="#1572b6" opacity="0.95"/>' +
        '<path d="M10,12 h6 M10,16 h5.5 L15,22 L13,23 L11,22 L10.8,19" fill="none" stroke="#fff" stroke-width="1.2"/>' +
        '<path d="M20,12 h6 M20,16 h5.5 L25,22 L23,23 L21,22" fill="none" stroke="#fff" stroke-width="1.2"/>' +
        '</g>'
      );
    case 'libgdx':
      return (
        '<g class="logo-libgdx">' +
        '<rect x="6" y="10" width="24" height="16" rx="5" fill="#e02424" stroke="#a31414" stroke-width="1"/>' +
        '<path d="M11,15 v6 M8,18 h6" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>' +
        '<circle cx="22" cy="15" r="1.4" fill="#fff"/>' +
        '<circle cx="26" cy="19" r="1.4" fill="#fff"/>' +
        '<circle cx="22" cy="21" r="1.1" fill="#ffe066"/>' +
        '<circle cx="18" cy="18" r="1.1" fill="#ffe066"/>' +
        '</g>'
      );
    case 'tiled':
      return (
        '<g class="logo-tiled">' +
        '<polygon points="18,6 28,12 18,18 8,12" fill="#d9534f"/>' +
        '<polygon points="28,12 28,24 18,30 18,18" fill="#5cb85c"/>' +
        '<polygon points="8,12 18,18 18,30 8,24" fill="#428bca"/>' +
        '<path d="M18,6 L28,12 L18,18 L8,12 Z M18,18 V30 M28,12 V24 L18,30 M8,12 V24 L18,30" fill="none" stroke="#222" stroke-width="1"/>' +
        '</g>'
      );
    case 'godot':
      return (
        '<g class="logo-godot">' +
        '<circle cx="18" cy="6" r="1.8" fill="#478cbf"/>' +
        '<path d="M18,7.8 V10" stroke="#478cbf" stroke-width="1.5"/>' +
        '<path d="M9,11 h18 l1.5,4 l2,1 v11 c0,3 -3,5 -6,5 h-13 c-3,0 -6,-2 -6,-5 v-11 l2,-1 z" fill="#478cbf" stroke="#33668a" stroke-width="1"/>' +
        '<circle cx="13" cy="19" r="2.8" fill="#fff"/><circle cx="13" cy="19" r="1.4" fill="#202b38"/>' +
        '<circle cx="23" cy="19" r="2.8" fill="#fff"/><circle cx="23" cy="19" r="1.4" fill="#202b38"/>' +
        '<circle cx="18" cy="22" r="0.9" fill="#202b38"/>' +
        '<path d="M15,25 Q18,27 21,25" fill="none" stroke="#202b38" stroke-width="1.2" stroke-linecap="round"/>' +
        '</g>'
      );
    case 'raylib':
      return (
        '<g class="logo-raylib">' +
        '<rect x="6" y="6" width="24" height="24" rx="2" fill="#18181b" stroke="#ffffff" stroke-width="1.4"/>' +
        '<path d="M12,12 h6 c3,0 4.5,1.5 4.5,3.5 c0,1.8 -1.2,3 -3,3.5 l3.5,5 h-2.5 l-3,-4.5 h-3 v4.5 h-2.5 z M14.5,14.5 v3 h3.5 c1.5,0 2,-0.5 2,-1.5 s-0.5,-1.5 -2,-1.5 z" fill="#ffffff"/>' +
        '</g>'
      );
    case 'worldbuilding':
      return (
        '<g class="logo-worldbuilding">' +
        '<circle cx="18" cy="18" r="13" fill="#2b1a1f" stroke="#c9a463" stroke-width="1.2"/>' +
        '<polygon points="18,7 20,16 29,18 20,20 18,29 16,20 7,18 16,16" fill="#c9a463"/>' +
        '<polygon points="18,10 19,16 25,18 19,19 18,25 17,19 11,18 17,16" fill="#6f2639"/>' +
        '<circle cx="18" cy="18" r="2.2" fill="#fff"/>' +
        '</g>'
      );
    default:
      return icon('nut');
  }
}

export function techShortLabel(id: string): string {
  switch (id) {
    case 'c': return 'C';
    case 'cpp': return 'C++';
    case 'java': return 'Java';
    case 'sql': return 'MySQL';
    case 'git': return 'Git';
    case 'javafx': return 'JavaFX';
    case 'react': return 'React';
    case 'node': return 'Node.js';
    case 'socket': return 'Socket.IO';
    case 'htmlcss': return 'HTML/CSS';
    case 'libgdx': return 'LibGDX';
    case 'tiled': return 'Tiled';
    case 'godot': return 'Godot';
    case 'raylib': return 'Raylib';
    case 'worldbuilding': return 'Design';
    default: return id;
  }
}

export function skillSlot(i: number, shelf: number): { x: number; y: number } {
  return { x: SK_X0 + i * SK_DX, y: SHELF_BOARDS[shelf] };
}

export function skillShelf(): string {
  let s = '';
  const x0 = 176;
  const x1 = 562;
  const top = 196;

  s += R(x0 - 6, top, x1 - x0 + 12, FY - top, '#2a170f', 2) +
       R(x0, top + 6, x1 - x0, FY - top - 6, '#150d0a', 0) +
       R(x0, top + 6, x1 - x0, FY - top - 6, 'url(#pPlank)').replace('/>', ' opacity=".3"/>');
  s += R(x0 - 12, top - 12, x1 - x0 + 24, 16, '#4a2e1d', 2) +
       R(x0 - 12, top - 12, x1 - x0 + 24, 16, 'url(#pWood)');

  const names = ['LANGUAGES & FOUNDATIONS', 'DESKTOP & WEB (LEARNING)', 'GAME TOOLS & ENGINES'];

  SHELF_BOARDS.forEach(function (by, k) {
    s += R(x0 - 4, by, x1 - x0 + 8, 10, '#4a2e1d', 1.6) +
         R(x0 - 4, by, x1 - x0 + 8, 10, 'url(#pWood)');

    /* brass tag on the board edge */
    s += R(x0 + 4, by + 14, 136, 15, '#c9a463', 1.2) +
         T(x0 + 8, by + 25, names[k], 6.6, '#2a1a14', 'eng', 'letter-spacing=".6"');

    /* dust on the board */
    s += L('M' + (x0 + 20) + ' ' + (by - 1) + 'h' + (x1 - x0 - 40), 1.4, '#e8dcca', 0.12);
  });

  /* items */
  const used: Record<number, number> = {};
  PORTFOLIO_DATA.SKILLS.forEach(function (sk) {
    const idx = (used[sk.shelf] = used[sk.shelf] || 0);
    used[sk.shelf]++;
    const p = skillSlot(idx, sk.shelf);

    const bx = p.x + 8;
    const by = p.y - 64;
    const bw = 52;
    const bh = 62;

    // Contact shadow resting solidly on the shelf board
    let art = E(bx + bw / 2, p.y + 1, 24, 3, '#0b0705', 0).replace('/>', ' opacity=".65"/>');

    // Solid wooden block with burnished bevel
    art += R(bx, by, bw, bh, '#241610', 1.4, '#4a2e1d') +
           R(bx + 2, by + 2, bw - 4, bh - 4, '#140c08', 0.8, '#321c12');

    // Recognizable official technology logo
    art += '<g transform="translate(' + (bx + 8) + ' ' + (by + 4) + ')">' + techLogo(sk.id) + '</g>';

    // Permanent typographic label visible immediately without hovering!
    const label = techShortLabel(sk.id);
    art += R(bx + 3, by + 45, bw - 6, 13, '#2a1a14', 0.7, '#c9a463') +
           TC(bx + bw / 2, by + 54.5, label, 6.8, '#f3e8d4', 'mono', 'letter-spacing=".3"');

    s += obj('skill:' + sk.id, sk.name, 'Examine ' + sk.name, art, [bx - 2, by - 4, bw + 4, bh + 8], { cls: 'skobj' });
  });

  /* empty slots */
  [0, 1, 2].forEach(function (k) {
    const n = PORTFOLIO_DATA.SKILLS.filter(function (q) { return q.shelf === k; }).length;
    for (let j = n; j < 5; j++) {
      const p = skillSlot(j, k);
      s += R(p.x + 8, p.y - 50, 50, 48, 'none', 0.8, '#e8dcca').replace('stroke-width="0.8"', 'stroke-width="0.8" stroke-dasharray="2 4" opacity=".16"');
    }
  });

  return s;
}

export function jarArt(b: BugItem, cx: number): string {
  let s = '';
  const x = cx;
  s += R(x - 22, JAR_BASE - 96, 44, 12, '#0b090d', 0).replace('/>', ' opacity="0"/>');

  /* inside */
  s += P([[x - 30, JAR_BASE - 86], [x + 30, JAR_BASE - 86], [x + 34, JAR_BASE], [x - 34, JAR_BASE]], '#0f1a18', 0).replace('/>', ' opacity=".55"/>');
  s += L('M' + (x - 20) + ' ' + JAR_BASE + 'C' + (x - 10) + ' ' + (JAR_BASE - 24) + ' ' + (x + 2) + ' ' + (JAR_BASE - 30) + ' ' + (x + 14) + ' ' + (JAR_BASE - 50), 1.8, '#6b4a30') +
       E(x + 14, JAR_BASE - 52, 7, 3, '#3f6f64', 0.7) +
       E(x - 12, JAR_BASE - 6, 16, 5, '#6b5a4a', 0.6).replace('stroke="#0b090d"', 'stroke="#0b090d" opacity=".9"');

  s += '<g class="bug" data-k="' + b.bug + '" transform="translate(' + x + ' ' + (JAR_BASE - 12) + ')">' + bugArt(b.bug) + '</g>';

  /* glass with distinct subtle glow per jar */
  const tint = b.bug === 'firefly' ? 'rgba(255,230,160,.16)' : b.bug === 'beetle' ? 'rgba(150,200,225,.11)' : b.bug === 'moth' ? 'rgba(220,210,190,.12)' : 'rgba(190,225,215,.10)';
  s += '<path d="M' + (x - 24) + ' ' + (JAR_BASE - 88) + 'h48q8 0 8 8v76q0 12 -10 12h-44q-10 0 -10 -12v-76q0 -8 8 -8z" fill="' + tint + '" stroke="#cfe8e0" stroke-width="1.4" stroke-opacity=".7"/>';
  s += L('M' + (x - 27) + ' ' + (JAR_BASE - 72) + 'v44', 2, '#fff', 0.22) +
       L('M' + (x + 26) + ' ' + (JAR_BASE - 76) + 'v10', 1.4, '#fff', 0.2);

  /* lid with air holes */
  s += R(x - 27, JAR_BASE - 100, 54, 13, '#8a6a3a', 1.6) +
       R(x - 27, JAR_BASE - 100, 54, 13, 'url(#pWood)') +
       [-14, -4, 6, 16].map(function (dx) { return C(x + dx, JAR_BASE - 93, 1.1, '#0b090d'); }).join('');

  /* tag */
  s += R(x - 21, JAR_BASE - 44, 42, 20, '#efe4cf', 1.2) +
       L('M' + x + ' ' + (JAR_BASE - 86) + 'q-4 18 0 42', 0.8, '#c9bba3', 0.8) +
       TC(x, JAR_BASE - 31, b.tag, 6.6, '#2a1a14', 'mono', 'letter-spacing=".6"') +
       TC(x, JAR_BASE - 23, b.bug.toUpperCase(), 5, '#6f2639', 'eng', 'letter-spacing=".4"');

  return s;
}

function pegTool(kind: string, x: number, y: number, missing?: boolean): string {
  let s = '';
  const ink = missing ? 'none' : '#8a8490';
  const st = missing ? '#e8dcca' : INK;
  const sw = missing ? 'stroke-dasharray="3 3" opacity=".5"' : '';

  if (kind === 'hammer') {
    s = '<g ' + sw + '>' + R(x, y, 8, 60, missing ? 'none' : '#8a6a3a', 1.3, st) + R(x - 12, y - 6, 32, 16, ink, 1.3, st) + '</g>';
  }
  if (kind === 'wrench') {
    s = '<g ' + sw + '><path d="M' + x + ' ' + (y + 60) + 'L' + (x + 4) + ' ' + (y + 10) + '" stroke="' + st + '" stroke-width="9" fill="none" stroke-linecap="round"/>' +
        (missing ? '' : '<path d="M' + x + ' ' + (y + 60) + 'L' + (x + 4) + ' ' + (y + 10) + '" stroke="#8a8490" stroke-width="6" fill="none" stroke-linecap="round"/>') +
        C(x + 4, y + 6, 10, ink, 1.3, st) + '</g>';
  }
  if (kind === 'saw') {
    s = '<g ' + sw + '>' + P([[x, y], [x + 70, y + 14], [x + 70, y + 30], [x, y + 18]], ink, 1.3, st) + R(x - 16, y + 2, 16, 20, missing ? 'none' : '#8a6a3a', 1.3, st) + '</g>';
  }
  if (kind === 'pliers') {
    s = '<g ' + sw + '>' + L('M' + x + ' ' + (y + 56) + 'L' + (x + 8) + ' ' + (y + 24) + 'M' + (x + 16) + ' ' + (y + 56) + 'L' + (x + 8) + ' ' + (y + 24), 5, st) +
        P([[x + 2, y + 24], [x + 14, y + 24], [x + 12, y], [x + 4, y]], ink, 1.3, st) + '</g>';
  }
  return s;
}

export function pegboard(): string {
  let s = '';
  const x = 596;
  const y = 196;
  const w = 368;
  const h = 252;

  s += R(x, y, w, h, '#4b3e30', 2) +
       R(x, y, w, h, 'url(#pWood)').replace('/>', ' opacity=".5"/>');

  for (let i = 0; i < 18; i++) {
    for (let j = 0; j < 10; j++) {
      s += C(x + 14 + i * 20, y + 14 + j * 24, 1.1, '#000').replace('/>', ' opacity=".55"/>');
    }
  }

  s += pegTool('hammer', 630, 230) +
       pegTool('wrench', 700, 236) +
       pegTool('saw', 750, 246) +
       pegTool('pliers', 852, 232);

  /* the missing tool */
  const miss = pegTool('wrench', 914, 248, true) + TC(920, 322, '[tool]', 7, '#e8dcca', 'mono', 'opacity=".5"');
  s += obj('missing', 'An outline, and no tool', 'Look closer', miss, [890, 232, 60, 100], { nolift: true });

  /* index cards pinned */
  s += P([[640, 330], [704, 328], [706, 382], [642, 384]], '#efe4cf', 1).replace('/>', ' transform="rotate(-2 672 356)"/>') +
       TC(672, 346, 'TO FIX', 6, '#6f2639', 'eng', 'transform="rotate(-2 672 356)"') +
       L('M650 356h44M650 364h36M650 372h40', 0.8, '#2a1a14', 0.45, 'transform="rotate(-2 672 356)"');

  s += P([[726, 332], [800, 334], [798, 396], [724, 394]], '#d8c06e', 1).replace('/>', ' transform="rotate(2 762 364)"/>') +
       TC(762, 348, 'TO BUILD', 6, '#2a1a14', 'eng', 'transform="rotate(2 762 364)"') +
       L('M734 360h56M734 368h46M734 376h52', 0.8, '#2a1a14', 0.45, 'transform="rotate(2 762 364)"');

  return s;
}

export function workBench(): string {
  let s = '';
  /* legs and underbench clutter */
  s += R(590, JAR_BASE + 12, 10, FY - JAR_BASE - 12, '#2d1a10', 1.5) +
       R(950, JAR_BASE + 12, 10, FY - JAR_BASE - 12, '#2d1a10', 1.5) +
       R(600, JAR_BASE + 54, 350, 6, '#3a2418', 1.2);
  s += R(612, JAR_BASE + 60, 110, 40, '#7a3b2e', 1.6) +
       R(612, JAR_BASE + 60, 110, 40, 'url(#pHatch)').replace('/>', ' opacity=".3"/>') +
       TC(667, JAR_BASE + 84, 'SPARES', 7, '#e8dcca', 'eng', 'letter-spacing="1"');
  s += R(740, JAR_BASE + 68, 60, 32, '#3d6f64', 1.5) +
       R(812, JAR_BASE + 74, 30, 26, '#8a6a3a', 1.5);

  /* bench top */
  s += R(580, JAR_BASE, 392, 14, '#6b4a30', 2) +
       R(580, JAR_BASE, 392, 14, 'url(#pWood)') +
       R(580, JAR_BASE, 392, 3, '#fff', 0).replace('/>', ' opacity=".14"/>');

  return s;
}

export function jarsAll(): string {
  let s = '';
  PORTFOLIO_DATA.BUGS.forEach(function (b, i) {
    s += obj(
      'jar:' + b.id,
      'Specimen jar · ' + b.tag,
      'Tap the glass',
      jarArt(b, JAR_X[i]),
      [JAR_X[i] - 36, JAR_BASE - 102, 72, 104],
      { nolift: true, cls: 'jar' }
    );
  });



  return s;
}

export function projectShelf(): string {
  let s = '';
  const x0 = 996;
  const x1 = 1366;
  const top = 204;

  s += R(x0 - 6, top, x1 - x0 + 12, FY - top, '#2a170f', 2) +
       R(x0, top + 8, x1 - x0, 266, '#130b09', 0) +
       R(x0, top + 8, x1 - x0, 266, 'url(#pPlank)').replace('/>', ' opacity=".3"/>');
  s += R(x0 - 12, top - 12, x1 - x0 + 24, 16, '#4a2e1d', 2) +
       R(x0 - 12, top - 12, x1 - x0 + 24, 16, 'url(#pWood)');


  const rows = [{ y: 352, tag: 'FINISHED · LIVE' }, { y: 480, tag: 'IN PROGRESS' }];
  rows.forEach(function (r, k) {
    s += R(x0 - 4, r.y, x1 - x0 + 8, 10, '#4a2e1d', 1.6) +
         R(x0 - 4, r.y, x1 - x0 + 8, 10, 'url(#pWood)') +
         L('M' + (x0 + 16) + ' ' + (r.y - 1) + 'h' + (x1 - x0 - 32), 1.4, '#e8dcca', 0.14);
    s += R(x0 + 4, r.y + 13, k ? 84 : 108, 14, k ? 'none' : '#7fb3a6', 1.2, k ? '#f2b35e' : INK)
         .replace(k ? 'stroke-width="1.2"' : 'zzz', k ? 'stroke-width="1.2" stroke-dasharray="3 2"' : 'zzz') +
         T(x0 + 10, r.y + 24, r.tag, 7.4, k ? '#f2b35e' : '#10201c', 'eng', 'letter-spacing=".8"');
  });

  /* flat-file cabinet drawers */
  s += R(x0 - 4, FY - 170, x1 - x0 + 8, 170, '#3a2a22', 2) +
       R(x0 - 4, FY - 170, x1 - x0 + 8, 170, 'url(#pWood)');
  [0, 1, 2].forEach(function (k) {
    s += R(x0 + 8, FY - 162 + k * 54, x1 - x0 - 16, 48, '#4a382c', 1.4) +
         R(x0 + (x1 - x0) / 2 - 32, FY - 144 + k * 54, 64, 8, '#c9a463', 1.2) +
         R(x0 + (x1 - x0) / 2 - 26, FY - 157 + k * 54, 52, 10, '#efe4cf', 0.8) +
         L('M' + (x0 + (x1 - x0) / 2 - 20) + ' ' + (FY - 152 + k * 54) + 'h40', 0.6, '#2a1a14', 0.5);
  });

  return s;
}

export function projArt(p: ProjectItemData): { art: string; hit: [number, number, number, number] } {
  const st = p.status;
  const tag = function (x: number, y: number) {
    return st === 'live'
      ? '<g><path d="M' + x + ' ' + y + 'v12" stroke="' + INK + '" stroke-width=".8"/>' +
        R(x - 7, y + 12, 14, 18, '#7fb3a6', 1) +
        L('M' + (x - 3) + ' ' + (y + 21) + 'l2.5 3l4 -6', 1.4, '#10201c') +
        '</g>'
      : st === 'wip'
      ? R(x - 9, y + 2, 18, 7, '#f2b35e', 0.8) +
        L('M' + (x - 6) + ' ' + (y + 2) + 'l4 7M' + (x - 1) + ' ' + (y + 2) + 'l4 7M' + (x + 4) + ' ' + (y + 2) + 'l4 7', 0.7, INK, 0.5)
      : R(x - 8, y + 2, 16, 8, '#a1a0a8', 0.8).replace('/>', ' stroke-dasharray="2 1.5"/>');
  };

  let a = '';
  if (p.type === 'binder') {
    a = R(1012, 244, 46, 108, '#4d1a2a', 2) +
        R(1012, 244, 46, 108, 'url(#pHatchX)') +
        R(1016, 258, 8, 84, '#2d0f18', 0).replace('/>', ' opacity=".5"/>') +
        R(1028, 266, 24, 68, '#e8dcca', 0.9) +
        '<text transform="translate(1044 332) rotate(-90)" font-size="9" fill="#2a1a14" class="eng" letter-spacing="1">' +
        p.name.toUpperCase() +
        '</text>' +
        L('M1012 252h46M1012 344h46', 1.2, '#c9a463', 0.9) +
        tag(1035, 244);
    return { art: a, hit: [1008, 240, 54, 112] };
  }

  if (p.type === 'folder') {
    a = P([[1076, 352], [1070, 262], [1112, 258], [1120, 352]], '#c9a463', 1.8) +
        P([[1076, 262], [1082, 252], [1100, 251], [1106, 260]], '#b89150', 1.3) +
        R(1086, 288, 24, 34, '#efe4cf', 0.8).replace('/>', ' transform="rotate(-3 1098 305)"/>') +
        L('M1090 298h16M1090 306h12M1090 314h14', 0.7, '#2a1a14', 0.5) +
        tag(1096, 258);
    return { art: a, hit: [1066, 248, 60, 104] };
  }

  if (p.type === 'box') {
    a = R(1014, 404, 92, 68, '#b58a58', 2) +
        R(1014, 404, 92, 68, 'url(#pHatch)').replace('/>', ' opacity=".25"/>') +
        R(1010, 398, 100, 12, '#c79a68', 1.8) +
        R(1050, 404, 20, 68, '#efe4cf', 0).replace('/>', ' opacity=".7"/>') +
        TC(1060, 438, p.name.length > 16 ? 'PROJECT' : p.name.toUpperCase(), 6, '#2a1a14', 'eng', 'letter-spacing=".6"') +
        R(1030, 444, 60, 16, '#efe4cf', 0.8) +
        L('M1036 450h46M1036 456h34', 0.6, '#2a1a14', 0.5) +
        tag(1060, 396);
    return { art: a, hit: [1006, 392, 108, 82] };
  }

  if (p.type === 'blueprint') {
    a = R(1130, 392, 22, 82, '#1c3f66', 1.8) +
        E(1141, 392, 11, 4, '#3a6a9a', 1.4) +
        E(1141, 474, 11, 4, '#0f2a47', 0) +
        L('M1133 410h16M1133 430h16M1133 450h16', 0.8, '#bcd0e4', 0.6) +
        R(1146, 380, 10, 88, '#1c3f66', 1.8).replace('/>', ' transform="rotate(8 1150 424)"/>') +
        tag(1141, 380);
    return { art: a, hit: [1124, 372, 40, 106] };
  }

  if (p.type === 'floppy') {
    a = '<g>' +
        [0, 1, 2].map(function (k) {
          return P([[1184 + k * 3, 472 - k * 14], [1226 + k * 3, 472 - k * 14], [1230 + k * 3, 468 - k * 14], [1230 + k * 3, 458 - k * 14], [1184 + k * 3, 458 - k * 14]],
                   ['#2b2f3a', '#3a3f4e', '#2b2f3a'][k], 1.4);
        }).join('') +
        R(1194, 448, 26, 10, '#a1a0a8', 1) +
        R(1198, 420, 22, 9, '#e8dcca', 0.8) +
        tag(1210, 410) +
        '</g>';
    return { art: a, hit: [1176, 404, 64, 72] };
  }

  if (p.type === 'drawer') {
    a = R(1004, FY - 108, 358, 48, '#4a382c', 1.4) +
        R(1008, FY - 104, 350, 40, '#5a4638', 0) +
        R(1160, FY - 90, 64, 8, '#c9a463', 1.2) +
        R(1166, FY - 103, 52, 10, '#efe4cf', 0.8) +
        TC(1192, FY - 95, p.name.toUpperCase().slice(0, 12), 5, '#2a1a14', 'eng', '') +
        tag(1350, FY - 114);
    return { art: a, hit: [1004, FY - 112, 358, 52] };
  }

  return { art: '', hit: [0, 0, 0, 0] };
}

export function projectItems(): string {
  let s = '';
  PORTFOLIO_DATA.PROJECTS.forEach(function (p) {
    const r = projArt(p);
    const g = '<g class="pullout" id="pi-' + p.id + '">' +
              '<g class="pdust"></g>' +
              r.art +
              '</g>';
    s += obj(
      'proj:' + p.id,
      p.name + (p.status === 'live' ? ' · finished' : p.status === 'wip' ? ' · in progress' : ' · idea'),
      'Pull it out',
      g,
      r.hit,
      { nolift: true, cls: 'pj' }
    );
  });

  /* outline of next project */
  s += R(1140, 258, 92, 92, 'none', 0.8, '#e8dcca').replace('stroke-width="0.8"', 'stroke-width="0.8" stroke-dasharray="3 5" opacity=".18"') +
       TC(1186, 308, 'next', 8, '#e8dcca', 'ital', 'opacity=".3"');

  return s;
}

export function buildScene2(): string {
  resetSeed(66);
  let s = buildShell({
    wall: '#2c2a33',
    pat: 'pBrick',
    pat2: 'pStripe',
    dado: '#1d1a22',
    floor: '#241913',
    crown: '#14101a',
    skirt: '#120d12'
  });

  s += glow(380, 320, 380, 'gLamp', 0.2) +
       glow(780, 330, 340, 'gLamp', 0.24) +
       glow(1180, 330, 360, 'gLamp', 0.18);
  s += pool(380, 330, 40, 0.45) +
       pool(780, 300, 36, 0.5) +
       pool(1180, 330, 40, 0.4);
  s += motes(620, 230, 320, 300, 8) +
       cs(369, 400, 0.55) +
       cs(775, 400, 0.5) +
       cs(1180, 380, 0.55);

  /* ceiling pipes and turning gears */
  s += R(-100, CY + 4, 1800, 12, '#3a3640', 1.4) +
       R(-100, CY + 10, 1800, 3, '#fff', 0).replace('/>', ' opacity=".08"/>') +
       [120, 420, 760, 1120, 1420].map(function (x) {
         return R(x, CY + 2, 10, 16, '#6b6870', 1.2);
       }).join('');

  s += L('M700 ' + (CY + 16) + 'V130H980V' + (CY + 16), 9, INK) +
       L('M700 ' + (CY + 16) + 'V130H980V' + (CY + 16), 6, '#4a4652');

  s += TR(900, 122, '<g class="spin">' + icon('cog') + '</g>');
  s += TR(932, 150, G('scale(.9)', '<g class="spin r">' + icon('cog') + '</g>'));
  s += TR(1010, 112, G('scale(1.3)', '<g class="spin">' + icon('cog') + '</g>'));
  s += TR(1400, 108, G('scale(1.1)', '<g class="spin r">' + icon('cog') + '</g>'));

  /* window */
  s += R(76, 224, 72, 108, '#1a100d', 2) + winGlass(83, 231, 58, 94);

  /* major workshop zones */
  s += skillShelf();
  s += pegboard();
  s += workBench();
  s += lampPend(780, CY + 16, 176, 230, '#7a3b2e');
  s += jarsAll();
  s += projectShelf();
  s += projectItems();

  /* floor clutter: box, screws, washers */
  s += R(540, FY - 18, 22, 18, '#7a3b2e', 1.4) +
       L('M540 ' + (FY - 18) + 'l22 18M562 ' + (FY - 18) + 'l-22 18', 0.8, INK, 0.4);
  s += E(1380, FY - 3, 14, 3, '#e8dcca', 0).replace('/>', ' opacity=".12"/>');
  [[570, FY + 8], [960, FY + 10], [980, FY + 6], [500, FY + 14], [1368, FY + 12]].forEach(function (p) {
    s += E(p[0], p[1], 10, 2.2, '#a98458', 0).replace('/>', ' opacity=".25"/>');
  });

  /* doors */
  s += floorDoorArt(62, 'doorD', 'Downstairs — Introduction', 'Open the door', 'down');
  s += floorDoorArt(1394, 'doorU', 'Upstairs — Bedroom', 'Open the door', 'up');

  return s;
}
