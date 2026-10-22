import {
  R, P, L, C, E, T, TC, G, TR, glow,
  f, rnd, rr, resetSeed, esc, INK
} from './svgHelpers';
import { cs, pool, motes, FY } from './roomShell';
import { obj } from './objHelper';
import { floorDoorArt } from './doorArt';
import { PORTFOLIO_DATA } from '../data/portfolioData';

/**
 * Structural timber beam (horizontal or vertical) with grain and bevel
 */
export function timber(x: number, y: number, w: number, h: number, vert: number | boolean): string {
  return (
    R(x, y, w, h, '#a98458', 1.5) +
    R(x, y, w, h, 'url(#pWood)') +
    (vert ? L('M' + f(x + w * 0.3) + ' ' + y + 'V' + (y + h), 0.6, '#000', 0.25) : '') +
    (vert ? '' : L('M' + x + ' ' + f(y + h * 0.3) + 'H' + (x + w), 0.6, '#fff', 0.15))
  );
}

/**
 * Angled structural roof rafter / diagonal brace
 */
export function beamLine(x1: number, y1: number, x2: number, y2: number, w: number): string {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const a = (Math.atan2(dy, dx) * 180) / Math.PI;
  return G(
    'translate(' + f(x1) + ' ' + f(y1) + ') rotate(' + f(a) + ')',
    R(0, -w / 2, len, w, '#a98458', 1.3) + R(0, -w / 2, len, w, 'url(#pWood)')
  );
}

/**
 * Scenic distant mountain ridges under night sky
 */
export function hillPath(y0: number, amp: number, col: string, step: number): string {
  const pts: [number, number][] = [];
  const ph = rnd() * 6;
  for (let x = -400; x <= 2400; x += step) {
    pts.push([
      x,
      y0 - amp * (0.5 + 0.5 * Math.sin(x / 230 + ph)) - amp * 0.4 * Math.sin(x / 90 + ph * 2)
    ]);
  }
  const d = 'M-400 900L' + pts.map((p) => f(p[0]) + ' ' + f(p[1])).join('L') + 'L2400 900Z';
  return '<path d="' + d + '" fill="' + col + '"/>';
}

/**
 * Stud framing partition wall
 */
export function studWall(x0: number, x1: number, top: number, bot: number, gap: number): string {
  let s = '';
  for (let x = x0; x <= x1; x += gap) {
    s += timber(x, top, 10, bot - top, 1);
  }
  s += timber(x0, top, x1 - x0 + 10, 10, 0) +
       timber(x0, bot - 10, x1 - x0 + 10, 10, 0) +
       timber(x0, (top + bot) / 2, x1 - x0 + 10, 8, 0);
  return s;
}

/**
 * Incomplete drywall paneling with pencil measurements & screws
 */
export function drywallArt(): string {
  let s = '';
  /* Two sheets screwed on, third cut sheet, pencil notes */
  s += P([[196, 660], [196, 296], [360, 296], [360, 660]], '#d8d0be', 1.6) +
       P([[196, 660], [196, 296], [360, 296], [360, 660]], 'url(#pDrywall)') +
       P([[196, 660], [196, 296], [360, 296], [360, 660]], 'url(#gShadeX)');
  s += P([[360, 660], [360, 330], [470, 330], [470, 360], [492, 360], [492, 660]], '#d3cab6', 1.6) +
       P([[360, 660], [360, 330], [470, 330], [470, 360], [492, 360], [492, 660]], 'url(#pDrywall)');

  /* Fastener / drywall screws along studs */
  for (let j = 0; j < 9; j++) {
    s += C(204, 316 + j * 38, 1.4, '#6b4a40').replace('/>', ' opacity=".6"/>') +
         C(352, 316 + j * 38, 1.4, '#6b4a40').replace('/>', ' opacity=".6"/>');
  }
  s += L('M196 560H360M360 520H492', 0.8, '#000', 0.14) +
       P([[196, 660], [196, 560], [360, 660]], '#000', 0).replace('/>', ' opacity=".08"/>');

  /* Restrained carpentry notes handwritten in pencil */
  s += T(214, 604, 'MEASURE TWICE', 9, '#6b4a40', 'mono', 'opacity=".85" transform="rotate(-2 214 604)"') +
       T(214, 620, 'CUT ONCE', 9, '#6b4a40', 'mono', 'opacity=".85" transform="rotate(-2 214 604)"');
  s += L('M210 330l28 8M300 340l-10 24M262 316l30 -6', 1.2, '#6b4a40', 0.5);

  /* Sheet leaning securely against studs */
  s += P([[494, 660], [494, 350], [512, 356], [512, 660]], '#a39a88', 1.2) +
       E(503, 661, 14, 2.5, '#000', 0).replace('/>', ' opacity=".35"/>');
  return s;
}

/**
 * Wooden jobsite ladder leaning securely against top plate
 */
export function ladderArt(): string {
  let s = '';
  s += L('M590 660L650 100M626 660L686 100', 4, INK) +
       L('M590 660L650 100M626 660L686 100', 2, '#a98458') +
       E(608, 661, 24, 3, '#000', 0).replace('/>', ' opacity=".4"/>');
  for (let i = 0; i < 12; i++) {
    const t = (i + 0.6) / 12.6;
    s += L('M' + f(590 + 60 * t) + ' ' + f(660 - 560 * t) + 'L' + f(626 + 60 * t) + ' ' + f(660 - 560 * t), 2.6, '#8a6a3a');
  }
  return s;
}

/**
 * 1. Drafting Table (The Blueprint Table)
 * Sturdy wooden trestle table, solidly grounded on subfloor (y=660) with contact shadows,
 * architectural blueprints, scale ruler, mug, and pencil.
 */
export function blueprintTable(): string {
  let s = '';

  /* Grounded trestle legs with broad foot pads meeting floor (y=660) */
  s += L('M639 660L690 520M891 660L840 520', 5, INK) +
       L('M639 660L690 520M891 660L840 520', 2.4, '#8a6a3a') +
       R(630, 655, 18, 5, '#8a6a3a', 1.2) +
       R(882, 655, 18, 5, '#8a6a3a', 1.2) +
       E(639, 661, 15, 2.8, '#000', 0).replace('/>', ' opacity=".45"/>') +
       E(891, 661, 15, 2.8, '#000', 0).replace('/>', ' opacity=".45"/>');

  /* Table stretcher and mortise wedge pegs */
  s += L('M664 610H866', 3.4, INK) +
       L('M664 610H866', 1.8, '#8a6a3a') +
       R(660, 606, 6, 8, '#5d4323', 1) +
       R(864, 606, 6, 8, '#5d4323', 1);

  /* Heavy drafted oak tabletop */
  s += R(640, 510, 252, 14, '#a98458', 1.8) +
       R(640, 510, 252, 14, 'url(#pWood)') +
       L('M640 511H892', 1, '#d5ba8c', 0.6);

  /* The architectural blueprint, pinned flat and curling slightly at one corner */
  let bp = P([[664, 510], [872, 510], [884, 468], [678, 466]], '#1c3f66', 1.6) +
           P([[664, 510], [872, 510], [884, 468], [678, 466]], 'url(#pGrid)');

  /* Architectural elevations & plan drawings */
  bp += L('M700 498L700 484L726 476L752 484L752 498Z', 1, '#bcd0e4', 0.85) +
        L('M726 476V494M706 490H748', 0.6, '#bcd0e4', 0.65) +
        L('M770 496L770 472L812 472L812 496Z', 1, '#bcd0e4', 0.75) +
        L('M780 472L791 460L802 472', 1, '#bcd0e4', 0.75) +
        L('M830 498H864M836 488H870M842 478H876', 0.8, '#bcd0e4', 0.55);

  /* Curled corner */
  bp += P([[872, 510], [884, 468], [891, 474], [879, 514]], '#2f5d8f', 1) +
        '<text x="680" y="488" font-size="6.5" fill="#bcd0e4" class="mono" opacity=".85" transform="rotate(-3 680 488)">FUTURE · rev ?</text>';

  /* Pencil, ceramic mug, brass tape measure */
  bp += L('M700 460L740 454', 2.4, '#c9a463') +
        L('M740 454l5 -1', 2.4, '#2a1a14') +
        R(840, 490, 14, 15, '#e8dcca', 1.2) +
        L('M854 495q7 0 7 5t-7 4', 1.3, INK) +
        C(808, 460, 9, '#c9a463', 1.3) +
        C(808, 460, 5, '#1d1527', 1);

  /* Rolled spare blueprints */
  bp += R(922, 518, 12, 92, '#1c3f66', 1.4).replace('/>', ' transform="rotate(-12 928 564)"/>') +
        R(940, 522, 12, 86, '#bcd0e4', 1.4).replace('/>', ' transform="rotate(7 946 564)"/>');

  s += obj('blueprint', 'The blueprint table', 'Unfold the blueprint', bp, [630, 440, 324, 224], {
    nolift: true,
    cls: 'bpobj',
    cx: 785
  });
  return s;
}

/**
 * 2. Toolbox and Lumber
 * Seasoned framing lumber stack grounded at floor (y=660), sturdy steel toolbox atop lumber,
 * paint can, oil can, and hinged tool tray.
 */
export function toolboxArt(): string {
  let s = '';

  /* Lumber pile resting squarely on subfloor (y=660) with contact shadow */
  s += R(924, 659, 136, 3, '#000', 0).replace('/>', ' opacity=".45"/>') +
       R(926, 652, 132, 8, '#a98458', 1.3) +
       R(926, 652, 132, 8, 'url(#pWood)') +
       R(934, 644, 120, 8, '#8a6a3a', 1.3) +
       R(934, 644, 120, 8, 'url(#pWood)') +
       R(930, 636, 128, 8, '#a98458', 1.3) +
       R(930, 636, 128, 8, 'url(#pWood)') +
       R(994, 635, 106, 2.5, '#000', 0).replace('/>', ' opacity=".4"/>');

  /* Paint bucket and solvent can beside lumber */
  s += R(1090, 626, 38, 34, '#6b6e78', 1.4) +
       E(1109, 626, 19, 5, '#2a2a30', 1.2) +
       L('M1094 626Q1109 602 1124 626', 1.4, INK) +
       R(1136, 642, 22, 18, '#6f2639', 1.3) +
       R(1136, 642, 22, 5, '#c9a463', 1);

  /* Toolbox body (resting securely on lumber stack) */
  s += R(996, 592, 100, 44, '#7a3b2e', 2) +
       R(996, 592, 100, 44, 'url(#pHatch)').replace('/>', ' opacity=".25"/>') +
       R(996, 608, 100, 3, '#000', 0).replace('/>', ' opacity=".3"/>') +
       R(1038, 600, 16, 10, '#c9a463', 1.2) +
       R(1036, 630, 20, 6, '#2a1a14', 0).replace('/>', ' opacity="0"/>');

  /* Tray of tools, revealed when the lid is up */
  s += '<g id="tbTray" class="tgl" style="opacity:0">' +
       R(1000, 586, 92, 8, '#4a2e1d', 0) +
       L('M1006 588l6 -10M1020 588v-12M1034 588l-3 -10', 2, '#a1a0a8') +
       C(1048, 580, 5, 'none', 1.6, '#c9a463') +
       R(1060, 576, 24, 6, '#8a8490', 1) +
       '</g>';

  /* Hinged lid */
  s += '<g id="tbLid" class="tgl" style="transform-box:fill-box;transform-origin:50% 100%">' +
       R(992, 574, 108, 20, '#8f4a3a', 2) +
       R(992, 574, 108, 20, 'url(#pHatch)').replace('/>', ' opacity=".25"/>') +
       L('M1010 574V562Q1010 554 1020 554H1072Q1082 554 1082 562V574', 2.6, INK) +
       L('M1010 574V562Q1010 554 1020 554H1072Q1082 554 1082 562V574', 1, '#a1a0a8') +
       '</g>';

  return obj('toolbox', 'The toolbox', 'Open it', s, [926, 546, 234, 116], { nolift: true, cls: 'tbobj', cx: 1000 });
}

/**
 * 3. Worklight
 * Stable industrial tripod stand with all three feet meeting floor (y=660),
 * contact shadows, halogen lamp head, snaking rubber cable, and interactive lighting toggles.
 */
export function worklight(): string {
  let s = '';

  /* Splayed tripod legs meeting floor (y=660) with solid contact shadows */
  s += L('M1146 660L1166 520M1186 660L1166 520M1166 656V520', 2.6, INK) +
       L('M1146 660L1166 520M1186 660L1166 520M1166 656V520', 1.3, '#8a8490') +
       C(1146, 659, 2.5, '#2a2a30') +
       C(1186, 659, 2.5, '#2a2a30') +
       C(1166, 655, 2, '#2a2a30') +
       E(1146, 661, 9, 2.4, '#000', 0).replace('/>', ' opacity=".45"/>') +
       E(1186, 661, 9, 2.4, '#000', 0).replace('/>', ' opacity=".45"/>') +
       E(1166, 657, 7, 2, '#000', 0).replace('/>', ' opacity=".4"/>');

  /* Mast, swivel knuckle, and cast halogen lamp head */
  s += L('M1166 520V482', 3, INK) +
       P([[1138, 488], [1194, 488], [1204, 454], [1128, 454]], '#3a3640', 2) +
       R(1136, 484, 58, 6, '#ffe3ae', 1);

  /* Light beam and warm radiant glow when switched ON */
  s += '<g id="wlOn" class="tgl" style="opacity:0">' +
       glow(1166, 470, 340, 'gWork', 0.95) +
       P([[1138, 490], [1194, 490], [1320, 700], [1010, 700]], 'url(#gBeam)', 0) +
       '</g>';

  return obj('worklight', 'The work light', 'Switch it on', s, [1124, 442, 88, 224], {
    nolift: true,
    cls: 'wlobj',
    cx: 1166
  });
}

/**
 * 4. Contact Board
 * Solid jobsite bulletin board mounted to timber framing,
 * with verified destinations for GitHub, Email, LinkedIn, and Résumé.
 */
export function contactBoard(): string {
  let s = '';
  const x = 1236;
  const y = 136;
  const w = 262;
  const h = 388;

  /* Suspension brackets from roof plate */
  s += L('M' + (x + 24) + ' 96V' + y + 'M' + (x + w - 24) + ' 96V' + y, 2.2, INK) +
       L('M' + (x + 24) + ' 96V' + y + 'M' + (x + w - 24) + ' 96V' + y, 0.9, '#8a8490');

  /* Plywood backer and framed cork/drywall face */
  s += R(x, y, w, h, '#a98458', 2.4) +
       R(x, y, w, h, 'url(#pWood)') +
       R(x + 8, y + 8, w - 16, h - 16, '#2b2f2d', 1.2) +
       R(x + 8, y + 8, w - 16, h - 16, 'url(#pDrywall)');

  /* Header typography */
  s += TC(x + w / 2, y + 28, "THERE'S STILL WORK TO DO", 13.5, '#f3e8d4', 'eng', 'letter-spacing=".7"') +
       L('M' + (x + 24) + ' ' + (y + 36) + 'H' + (x + w - 24), 0.8, '#f3e8d4', 0.4) +
       TC(x + w / 2, y + 49, "Let's build the rest of this place together.", 9.5, '#f2b35e', 'ital') +
       TC(x + w / 2, y + 61, 'Got an idea or want to talk? Say hello below.', 7.5, '#c9bba3', 'ital');

  /* Pinned availability note */
  const av =
    R(x + 18, y + 70, w - 36, 42, '#efe4cf', 1.2) +
    C(x + w / 2, y + 72, 2.5, '#9e2b2b', 0.8) +
    T(x + 28, y + 85, 'CURRENTLY ACCEPTING SIDE QUESTS', 7.5, '#6f2639', 'eng', 'letter-spacing=".5"') +
    T(x + 28, y + 99, 'Open to internship opportunities & collaborations.', 8.5, '#2a1a14', 'ital');
  s += av;

  /* Contact cards */
  PORTFOLIO_DATA.LINKS.forEach(function (l, i) {
    const ry = y + 120 + i * 46;
    const real = !!l.url;
    const txt = real ? l.show || l.url : l.ph || '';
    const card =
      R(x + 18, ry, w - 36, 38, real ? '#efe4cf' : 'none', 1.2, real ? INK : '#e8dcca').replace(
        real ? 'zzz' : 'stroke-width="1.2"',
        real ? 'zzz' : 'stroke-width="1.2" stroke-dasharray="3 3"'
      ) +
      T(x + 28, ry + 15, esc(l.label).toUpperCase(), 7.5, real ? '#6f2639' : '#e8dcca', 'eng', 'letter-spacing="1.2"') +
      T(x + 28, ry + 29, esc(txt), 10.5, real ? '#2a1a14' : '#c9bba3', 'ital', '') +
      (real ? L('M' + (x + w - 42) + ' ' + (ry + 19) + 'h12m-4 -4l4 4l-4 4', 1.3, '#6f2639') : '') +
      C(x + 24, ry + 2, 2.4, real ? '#a1342f' : '#8a6a3a', 0.8);

    s += obj(
      'link:' + l.id,
      l.label + (real ? '' : ' (placeholder)'),
      real ? 'Open destination' : 'Placeholder (unverified)',
      card,
      [x + 16, ry - 4, w - 32, 44],
      { cls: 'linkobj' }
    );
  });
  return s;
}

/**
 * 5. Unfinished Opening
 * Raw stud doorway looking directly onto the moonlit night sky and stars
 */
export function unfinishedDoor(): string {
  let s = '';
  s += R(1520, 196, 76, 464, '#0d0a12', 0);
  s += '<clipPath id="cpUD"><rect x="1532" y="226" width="52" height="434"/></clipPath><g clip-path="url(#cpUD)">' +
       R(1532, 226, 52, 434, 'url(#gSkyS)') +
       [0, 1, 2, 3, 4, 5, 6, 7, 8]
         .map(function (k) {
           return C(1536 + ((k * 37) % 44), 236 + ((k * 61) % 190), 1, '#e8dcca').replace(
             '/>',
             ' class="tw" style="animation-delay:' + -k * 0.5 + 's"/>'
           );
         })
         .join('') +
       C(1560, 270, 10, '#e6d9c3') +
       '</g>';

  /* Framing timber posts & lintel */
  s += timber(1518, 222, 16, 438, 1) +
       timber(1582, 222, 16, 438, 1) +
       timber(1514, 210, 88, 16, 0) +
       beamLine(1534, 660, 1582, 610, 5) +
       L('M1534 460H1582', 2, '#a98458', 0);
  s += T(1524, 194, '? ROOM', 8, '#e8dcca', 'mono', 'opacity=".7"');

  return obj('doorway', 'An unfinished doorway', 'Look through it', s, [1508, 196, 100, 466], {
    nolift: true,
    cx: 1550
  });
}

/**
 * 6. Crow
 * Single crow perched comfortably on the horizontal collar tie beam
 */
export function crow(): string {
  const s =
    '<g id="crow" class="tgl">' +
    P([[0, 0], [-9, -6], [-17, -4], [-14, 4], [-4, 6], [10, 5], [18, 10], [12, 2], [8, -2]], '#05030a', 1) +
    C(6, -6, 3.6, '#05030a', 0) +
    L('M9 -6l5 1.4l-5 1', 1, '#c9a463') +
    C(7, -7, 0.9, '#e8dcca') +
    L('M-2 6V14M3 6V14', 1.2, '#05030a') +
    '</g>';
  return obj('crow', 'A crow, on the beam', 'Say hello', TR(840, 92, s), [812, 62, 56, 52], {
    nolift: true,
    cls: 'crowobj',
    cx: 840
  });
}

/**
 * Complete Floor 4 (Under Construction) Scene Assembly
 */
export function buildScene4(): string {
  resetSeed(104);
  let s = '';
  let i: number;

  /* Deep open night sky */
  s += R(-600, -900, 2700, 1900, 'url(#gSkyS)');

  /* Twinkling stars scattered in the sky */
  for (i = 0; i < 150; i++) {
    s += C(rr(-300, 1900), rr(-500, 520), rr(0.5, 1.4), '#e8dcca').replace(
      '/>',
      ' class="tw" style="animation-delay:' + f(-rr(0, 5)) + 's" opacity=".65"/>'
    );
  }

  /* Moon and cool ambient glow */
  s += glow(920, 140, 220, 'gMoon') +
       C(920, 140, 42, '#e6d9c3') +
       L('M898 140q6 -6 12 0M910 166q5 -4 9 1', 1, '#a79b88', 0.4);

  /* Distant night hill silhouettes */
  s += hillPath(590, 75, '#180f24', 50) + hillPath(640, 48, '#221530', 45);
  s += [[110, 550], [260, 580], [1380, 575], [1520, 550]]
    .map(function (p) {
      return R(p[0], p[1], 3, 2.6, '#f2b35e').replace('/>', ' opacity=".8"/>');
    })
    .join('');

  /* Clearly defined wooden subfloor: plywood decking, fasteners, and joists */
  s += R(-600, FY, 2700, 700, '#6d5a46') +
       R(-600, FY, 2700, 700, 'url(#pBoards)') +
       R(-600, FY, 2700, 8, '#a98458', 1.4) +
       R(-600, FY, 2700, 700, 'url(#gFloorDark)');
  for (i = 0; i < 34; i++) {
    s += R(-200 + i * 74, FY + 16, 16, 34, '#8a6a3a', 1.2).replace('/>', ' opacity=".0"/>');
  }
  s += L('M-600 ' + (FY + 60) + 'H2100', 1, '#000', 0.3);

  /* Contact shadow foundations */
  s += cs(770, 260, 0.45) +
       cs(1000, 140, 0.45) +
       cs(330, 330, 0.4) +
       cs(1166, 70, 0.45) +
       pool(1166, 340, 44, 0.55, 'gWork');

  /* Exposed timber framing: posts, plates, pitched roof rafters */
  [150, 560, 980, 1400].forEach(function (px) {
    s += timber(px, 100, 16, 560, 1);
  });
  s += timber(110, 96, 1500, 16, 0) +
       timber(110, 300, 440, 10, 0) +
       timber(1370, 300, 60, 10, 0);

  /* Roof rafters and knee braces */
  s += beamLine(150, 100, 420, -70, 7) +
       beamLine(560, 100, 700, -20, 6) +
       beamLine(980, 100, 1180, -40, 6) +
       beamLine(1400, 100, 1560, -30, 6) +
       beamLine(150, 100, 560, 60, 5).replace('#a98458', '#8a6a3a');
  s += beamLine(150, 660, 310, 300, 5) + beamLine(560, 660, 430, 300, 5);

  /* Horizontal collar tie beam supporting the crow */
  s += timber(780, 104, 180, 10, 0);

  /* Stud wall and drywall on the left */
  s += studWall(170, 540, 112, 660, 52).replace(/<\/?g>/g, '');
  s += drywallArt();

  /* Leaning jobsite ladder */
  s += ladderArt();

  /* Power cable snaking along the subfloor */
  s += L('M1000 666C1040 690 1100 676 1130 696C1160 712 1200 692 1240 704', 2.4, '#2a2a30') +
       L('M1000 666C1040 690 1100 676 1130 696C1160 712 1200 692 1240 704', 0.8, '#f2b35e', 0.35);

  /* Scene objects */
  s += blueprintTable();
  s += toolboxArt();
  s += unfinishedDoor();

  /* Dust motes revealed when light is on */
  s += '<g id="wlMotes" class="tgl" style="opacity:0">' +
       motes(1080, 330, 240, 250, 6, '#ffe9b8') +
       '</g>';

  /* Night darkness overlay, recedes smoothly when worklight is toggled on */
  s += '<rect id="dk4" class="tgl" x="-600" y="-900" width="2700" height="1900" fill="#05030a" opacity=".46" style="opacity:.46" pointer-events="none"/>';

  /* Handwritten chalk drawings revealed on the floorboards when worklight is on */
  s += '<g id="chalk" class="tgl" style="opacity:0" pointer-events="none">' +
       T(560, 700, esc(PORTFOLIO_DATA.CHALK[2] || 'Measure twice'), 15, '#e8dcca', 'ital', 'opacity=".75" transform="rotate(-3 560 700)"') +
       T(760, 712, esc(PORTFOLIO_DATA.CHALK[1] || 'Bring tea'), 15, '#e8dcca', 'ital', 'opacity=".75" transform="rotate(2 760 712)"') +
       T(1040, 716, esc(PORTFOLIO_DATA.CHALK[0] || 'Say hello'), 22, '#f2b35e', 'ital', 'transform="rotate(-2 1040 716)"') +
       L('M1190 706q30 -8 46 -34m-4 -2l4 2l-2 6', 1.8, '#f2b35e') +
       '</g>';

  s += worklight();
  s += contactBoard();
  s += crow();
  s += floorDoorArt(62, 'doorD', 'Downstairs — Bedroom', 'Open the door', 'down', { raw: true });

  return s;
}
