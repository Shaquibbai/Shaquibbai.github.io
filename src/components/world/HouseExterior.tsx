import React, { useMemo } from 'react';
import {
  R, P, L, C, E, T, TC, G, arch, glow,
  f, rnd, rr, pick, resetSeed, INK, BOOKC
} from '../../utils/svgHelpers';
import { PORTFOLIO_DATA, FLOORS } from '../../data/portfolioData';

function hillPath(y0: number, amp: number, col: string, step: number): string {
  const pts: [number, number][] = [];
  const ph = rnd() * 6;
  for (let x = -400; x <= 2400; x += step) {
    pts.push([x, y0 - amp * (0.5 + 0.5 * Math.sin(x / 230 + ph)) - amp * 0.4 * Math.sin(x / 90 + ph * 2)]);
  }
  const d = 'M-400 900L' + pts.map(function (p) { return f(p[0]) + ' ' + f(p[1]); }).join('L') + 'L2400 900Z';
  return '<path d="' + d + '" fill="' + col + '"/>';
}

function tree(x: number, y: number, len: number, ang: number, w: number, depth: number, out: string[]) {
  const x2 = x + Math.sin(ang) * len;
  const y2 = y - Math.cos(ang) * len;
  out.push('<path d="M' + f(x) + ' ' + f(y) + 'L' + f(x2) + ' ' + f(y2) + '" stroke="#0a070d" stroke-width="' + f(w) + '" stroke-linecap="round"/>');
  if (depth <= 0) {
    if (rnd() < 0.5) {
      out.push(E(x2, y2, 5.5, 2.4, '#3f6f64', 0).replace('/>', ' transform="rotate(' + f(rr(-40, 40)) + ' ' + f(x2) + ' ' + f(y2) + ')" opacity=".75"/>'));
    }
    return;
  }
  tree(x2, y2, len * rr(0.7, 0.8), ang - rr(0.28, 0.55), w * 0.7, depth - 1, out);
  tree(x2, y2, len * rr(0.68, 0.8), ang + rr(0.28, 0.55), w * 0.7, depth - 1, out);
  if (rnd() < 0.35) tree(x2, y2, len * 0.55, ang + rr(-0.1, 0.1), w * 0.6, depth - 2, out);
}

function pathArt(): string {
  const d = 'M826 790C820 826 740 846 690 900L1060 900C1000 856 920 826 874 790Z';
  return '<path d="' + d + '" fill="#6f6676"/><path d="' + d + '" fill="url(#pCob)"/><path d="' + d + '" fill="url(#gShadeX)"/><path d="M826 790C820 826 740 846 690 900L760 900C790 860 830 836 840 790Z" fill="#05030a" opacity=".25"/>';
}

function buildWorld(): string {
  let s = R(-400, -1600, 2800, 2400, 'url(#gSky)');
  let i: number;
  let x: number;
  let y: number;

  for (i = 0; i < 300; i++) {
    x = rr(-400, 2400);
    y = rr(-1500, 470);
    s += '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="' + f(rr(0.5, 1.6)) + '" fill="#e8dcca" opacity="' + (rr(0.15, 0.8) * (1 - Math.max(0, y) / 600)).toFixed(2) + '"/>';
  }

  s += glow(1500, 190, 170, 'gMoon') + C(1500, 190, 44, '#e6d9c3');
  s += L('M1472 190q6 -6 12 0M1484 216q5 -4 9 1', 1, '#a79b88', 0.4);

  for (i = 0; i < 7; i++) {
    y = 380 + i * 34 + rr(-6, 6);
    s += L('M-400 ' + y + 'C100 ' + (y - 10) + ' 700 ' + (y + 10) + ' 1300 ' + (y - 4) + 'S2100 ' + (y + 8) + ' 2400 ' + y, 1.5 + i * 0.5, '#e0956a', (0.025 + i * 0.014).toFixed(3));
  }

  s += hillPath(640, 70, '#1b1228', 60) + '<rect x="-400" y="600" width="2800" height="120" fill="url(#gFog)"/>';
  s += [[120, 590], [300, 608], [1780, 606], [1950, 590]].map(function (p) {
    return R(p[0], p[1], 3, 2.6, '#f2b35e').replace('/>', ' opacity=".8"/>');
  }).join('');

  s += hillPath(700, 48, '#241833', 50) + '<rect x="-400" y="650" width="2800" height="150" fill="url(#gFog)"/>';
  s += hillPath(752, 34, '#2c1d3d', 40);

  /* far bare trees */
  const tp: string[] = [];
  [[180, 765, 26], [1900, 770, 30], [2050, 764, 22], [60, 770, 20]].forEach(function (t) {
    tree(t[0], t[1], t[2], 0, 2.2, 4, tp);
  });
  s += '<g opacity=".7">' + tp.join('') + '</g>';

  s += '<rect x="-400" y="780" width="2800" height="900" fill="url(#gLawn)"/>';
  s += L('M-400 790H2400', 1.4, '#4a3a58', 0.7);

  for (i = 0; i < 130; i++) {
    x = rr(-400, 2400);
    y = rr(796, 890);
    s += L('M' + f(x) + ' ' + f(y) + 'l' + f(rr(-2, 2)) + ' ' + f(-rr(3, 8)), 1, '#4d6a5e', (rr(0.25, 0.55)).toFixed(2));
  }

  s += pathArt();

  /* left tree */
  const tl: string[] = [];
  tree(404, 792, 86, 0.1, 9, 6, tl);
  s += '<g id="tree">' + tl.join('') + '</g>';

  return s;
}

interface FwinOpts {
  lit?: boolean | string;
  arch?: boolean;
  item?: string;
  shut?: boolean;
}

function fwin(x: number, y: number, w: number, h: number, o: FwinOpts = {}): string {
  const lit = o.lit;
  let s = '';
  const fill = lit === 't' ? 'url(#gGT)' : lit === 'b' ? 'url(#gGB)' : lit ? 'url(#gGA)' : 'url(#gGN)';
  const path = o.arch ? arch(x, y, w, h) : 'M' + x + ' ' + y + 'H' + (x + w) + 'V' + (y + h) + 'H' + x + 'Z';
  const sur = o.arch ? arch(x - 5, y - 5, w + 10, h + 5) : 'M' + (x - 5) + ' ' + (y - 5) + 'H' + (x + w + 5) + 'V' + (y + h + 5) + 'H' + (x - 5) + 'Z';

  s += '<path d="' + sur + '" fill="#b9ad9b" stroke="' + INK + '" stroke-width="1.4"/>';
  s += '<path d="' + path + '" fill="' + fill + '" stroke="' + INK + '" stroke-width="1.8"/>';

  if (lit) {
    const it = o.item;
    if (it === 'books') {
      for (let i = 0; i < 6; i++) {
        s += R(x + 3 + i * (w - 6) / 6, y + h - 14 - rr(0, 6), (w - 6) / 6 - 0.6, 16, pick(BOOKC), 0.5);
      }
    }
    if (it === 'lamp') {
      s += C(x + w / 2, y + h * 0.35, 3.4, '#ffe9c0') + L('M' + (x + w / 2) + ' ' + y + 'V' + (y + h * 0.3), 0.8, INK);
    }
    if (it === 'bunting') {
      s += L('M' + x + ' ' + (y + 7) + 'Q' + (x + w / 2) + ' ' + (y + 16) + ' ' + (x + w) + ' ' + (y + 7), 0.7, INK) +
           [0, 1, 2, 3].map(function (k) {
             return P([[x + 4 + k * (w - 8) / 4, y + 9 + Math.sin((k + 0.5) / 4 * 3.14) * 4],
                       [x + 4 + k * (w - 8) / 4 + 6, y + 9 + Math.sin((k + 0.5) / 4 * 3.14) * 4],
                       [x + 7 + k * (w - 8) / 4, y + 17 + Math.sin((k + 0.5) / 4 * 3.14) * 4]],
                      ['#6f2639', '#e8dcca', '#7fb3a6', '#f2b35e'][k], 0.4);
           }).join('');
    }
    if (it === 'gear') {
      s += '<circle cx="' + (x + w / 2) + '" cy="' + (y + h * 0.5) + '" r="' + (w * 0.28) + '" fill="none" stroke="#0b090d" stroke-width="2.2" stroke-dasharray="3 2"/>';
    }
    if (it === 'plant') {
      s += L('M' + (x + w / 2) + ' ' + (y + h) + 'C' + (x + w * 0.2) + ' ' + (y + h * 0.6) + ' ' + (x + w * 0.2) + ' ' + (y + h * 0.5) + ' ' + (x + w * 0.1) + ' ' + (y + h * 0.45), 1.6, INK) +
           L('M' + (x + w / 2) + ' ' + (y + h) + 'C' + (x + w * 0.8) + ' ' + (y + h * 0.55) + ' ' + (x + w * 0.85) + ' ' + (y + h * 0.45) + ' ' + (x + w * 0.92) + ' ' + (y + h * 0.4), 1.6, INK);
    }
    if (it === 'curtain') {
      s += P([[x, y], [x + w * 0.4, y], [x + w * 0.08, y + h]], '#6f2639', 0.8) +
           P([[x + w, y], [x + w * 0.62, y], [x + w * 0.92, y + h]], '#6f2639', 0.8);
    }
  } else {
    s += P([[x + w * 0.1, y + h * 0.08], [x + w * 0.38, y + h * 0.08], [x + w * 0.06, y + h * 0.55]], '#cfd8f0', 0).replace('/>', ' opacity=".12"/>');
  }

  s += L('M' + (x + w / 2) + ' ' + (o.arch ? y + w / 2 : y) + 'V' + (y + h) + 'M' + x + ' ' + (y + h * 0.42) + 'H' + (x + w), 1.3, INK);
  s += R(x - 7, y + h + 4, w + 14, 5, '#cfc3ab', 1.1);

  if (o.shut) {
    s += P([[x - w * 0.48 - 5, y - 4], [x - 5, y - 4], [x - 5, y + h + 4], [x - w * 0.48 - 5, y + h + 4]], '#6f2639', 1.2) +
         P([[x + w + 5, y - 4], [x + w * 0.48 + w + 5, y - 4], [x + w * 0.48 + w + 5, y + h + 4], [x + w + 5, y + h + 4]], '#6f2639', 1.2) +
         L('M' + (x - w * 0.24 - 5) + ' ' + y + 'V' + (y + h) + 'M' + (x + w * 1.24 + 5) + ' ' + y + 'V' + (y + h), 0.7, INK, 0.5);
  }

  const g = glow(x + w / 2, y + h / 2, Math.max(w, h) * 1.5, lit === 't' ? 'gLampT' : lit === 'b' ? 'gTVglow' : 'gLamp', lit ? 0.32 : 0);
  return lit ? G('rotate(' + f(rr(-1, 1)) + ' ' + f(x + w / 2) + ' ' + f(y + h / 2) + ')', s) + g
             : G('rotate(' + f(rr(-1, 1)) + ' ' + f(x + w / 2) + ' ' + f(y + h / 2) + ')', s);
}

function timber(x: number, y: number, w: number, h: number, vert: number | boolean): string {
  return R(x, y, w, h, '#a98458', 1.5) +
         R(x, y, w, h, 'url(#pWood)') +
         (vert ? L('M' + f(x + w * 0.3) + ' ' + y + 'V' + (y + h), 0.6, '#000', 0.25) : '') +
         (vert ? '' : L('M' + x + ' ' + f(y + h * 0.3) + 'H' + (x + w), 0.6, '#fff', 0.15));
}

function beamLine(x1: number, y1: number, x2: number, y2: number, w: number): string {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const a = Math.atan2(dy, dx) * 180 / Math.PI;
  return G('translate(' + f(x1) + ' ' + f(y1) + ') rotate(' + f(a) + ')',
    R(0, -w / 2, len, w, '#a98458', 1.3) + R(0, -w / 2, len, w, 'url(#pWood)')
  );
}

function unfinishedTop(): string {
  let s = '';
  s += R(654, 244, 452, 140, '#0f0a16').replace('/>', ' opacity=".62"/>');
  s += glow(830, 330, 150, 'gLamp', 0.34);
  s += R(644, 240, 472, 150, '#6c8fe0', 0).replace('/>', ' opacity=".07"/>');

  /* drywall */
  s += P([[654, 382], [654, 304], [694, 304], [694, 286], [748, 286], [748, 318], [768, 318], [768, 382]], '#d8d0be', 1.6) +
       P([[654, 382], [654, 304], [694, 304], [694, 286], [748, 286], [748, 318], [768, 318], [768, 382]], 'url(#pDrywall)');
  s += L('M690 304V382M726 286V382', 0.8, '#000', 0.2) + L('M654 340H768', 0.8, '#000', 0.18);
  s += P([[654, 382], [654, 304], [768, 382]], '#000', 0).replace('/>', ' opacity=".1"/>');
  s += T(662, 366, 'MEASURE TWICE', 5.6, '#6b4a40', 'mono', 'opacity=".8"');

  /* tarp */
  s += P([[894, 244], [1008, 244], [1004, 300], [986, 330], [996, 352], [968, 372], [944, 334], [918, 356], [902, 300]], '#3b4a5c', 1.4) +
       L('M920 248Q926 300 934 334M950 248Q956 306 962 350M980 248Q976 300 986 326', 1, '#8fb0cc', 0.35) +
       L('M896 250Q950 262 1006 250', 0.8, '#000', 0.3);

  /* joists */
  for (let i = 0; i < 8; i++) s += R(656 + i * 58, 392, 22, 13, '#8a6a3a', 1.2);

  /* posts and plates */
  [650, 764, 884, 1000, 1104].forEach(function (px) { s += timber(px, 242, 10, 142, 1); });
  s += timber(644, 382, 472, 10, 0) + timber(644, 236, 472, 10, 0);

  /* braces */
  s += beamLine(660, 380, 764, 300, 6) + beamLine(1010, 380, 1100, 300, 6) + beamLine(894, 244, 1000, 300, 5);
  s += beamLine(774, 250, 880, 340, 4.6).replace('#a98458', '#8a6a3a');

  /* roof frame */
  s += P([[622, 246], [880, 166], [1138, 246]], 'none', 0);
  s += P([[900, 174], [1138, 246], [948, 246], [930, 232], [942, 218], [918, 206], [934, 194], [908, 184]], '#6f2639', 2) +
       P([[900, 174], [1138, 246], [948, 246], [930, 232], [942, 218], [918, 206], [934, 194], [908, 184]], 'url(#pSlate)') +
       P([[900, 174], [1138, 246], [948, 246], [930, 232], [942, 218], [918, 206], [934, 194], [908, 184]], 'url(#gShadeX)');

  [650, 706, 762, 818, 862].forEach(function (px) { s += beamLine(px, 246, 880, 168, 5.2); });
  s += beamLine(622, 246, 880, 166, 7) + beamLine(880, 166, 1138, 246, 7);
  s += L('M692 232L840 192M706 220L850 182M738 232L830 206', 1.3, '#a98458', 0.75);

  /* loose slates */
  s += P([[1040, 236], [1086, 236], [1090, 228], [1044, 224]], '#6f2639', 1.2) +
       P([[1044, 224], [1090, 228], [1092, 220], [1048, 216]], '#8a3b4a', 1.2);

  /* flag */
  s += L('M880 166V128', 2.4, INK) + P([[880, 130], [906, 138], [880, 146]], '#f2b35e', 1.2);

  /* stovepipe and smoke */
  s += R(1052, 196, 9, 188, '#5f5a68', 1.4) + R(1048, 190, 17, 8, '#3a3640', 1.2);
  s += '<g opacity=".8"><path class="smoke" d="M1056 186C1046 168 1068 160 1056 140C1048 126 1068 118 1060 98" fill="none" stroke="#a79b88" stroke-width="7" stroke-linecap="round" opacity=".5"/><path class="smoke b" d="M1060 180C1070 164 1050 154 1062 136" fill="none" stroke="#a79b88" stroke-width="5" stroke-linecap="round" opacity=".35"/></g>';

  /* work light */
  s += L('M830 246V282', 1, INK) + C(830, 288, 6, '#fff0c8', 1.2) + glow(830, 288, 64, 'gWork', 0.7);

  return s;
}

function scaffold(): string {
  let s = '';
  const ys = [790, 720, 654, 588, 522, 456, 390, 324, 258];
  [1122, 1250].forEach(function (x) {
    s += R(x - 3, 214, 6, 578, '#7a7480', 1.3) + R(x - 3, 214, 6, 578, 'url(#pHatchX)') + R(x - 10, 786, 20, 6, '#4a4652', 1.2);
  });
  ys.forEach(function (y) { s += R(1118, y - 2, 136, 4, '#8a8490', 1); });
  for (let i = 0; i < ys.length - 1; i++) {
    if (i % 2 === 0) s += L('M1122 ' + ys[i] + 'L1250 ' + ys[i + 1], 2, '#8a8490', 0.9) + L('M1122 ' + ys[i] + 'L1250 ' + ys[i + 1], 0.6, '#000', 0.4);
  }
  [390, 522].forEach(function (y) {
    s += R(1112, y, 150, 8, '#a98458', 1.3) + R(1112, y, 150, 8, 'url(#pWood)') + L('M1140 ' + y + 'V' + (y + 8) + 'M1190 ' + y + 'V' + (y + 8) + 'M1226 ' + y + 'V' + (y + 8), 0.7, '#000', 0.4);
  });
  s += L('M1122 360H1250', 1.4, '#8a8490') + L('M1122 480H1250', 1.4, '#8a8490');

  /* draped sheet, planks, bucket */
  s += P([[1122, 392], [1250, 392], [1248, 440], [1232, 424], [1208, 452], [1186, 420], [1160, 446], [1138, 420], [1124, 436]], '#3b4a5c', 1.4) +
       L('M1148 394V430M1190 394V428M1228 394V430', 0.8, '#8fb0cc', 0.3);
  s += R(1132, 372, 50, 6, '#a98458', 1.2) + R(1136, 366, 44, 6, '#8a6a3a', 1.2) + R(1140, 360, 38, 6, '#a98458', 1.2);
  s += P([[1216, 384], [1236, 384], [1233, 364], [1219, 364]], '#6b6e78', 1.3) +
       L('M1219 364Q1226 354 1233 364', 1, INK) + E(1226, 364, 7, 2, '#2a2a30', 0);

  /* hoist jib, rope, bucket */
  s += L('M1250 214H1318', 3.2, INK) + L('M1250 214H1318', 1.4, '#a98458') + L('M1250 236L1318 214', 1.6, INK) + C(1318, 218, 4, '#8a8490', 1.2);
  s += '<g class="sway" style="transform-origin:1318px 222px">' + L('M1318 222V300', 1, INK) + P([[1304, 300], [1332, 300], [1328, 326], [1308, 326]], '#7a3b2e', 1.4) + L('M1306 300H1330', 1.4, '#c9a463') + '</g>';

  /* work lamp on top rail */
  s += L('M1250 214V190', 2, INK) + P([[1240, 184], [1260, 184], [1264, 196], [1236, 196]], '#ffe3ae', 1.3) + glow(1250, 198, 88, 'gWork', 0.55);

  /* hazard sign */
  s += R(1126, 548, 118, 30, '#e8dcca', 1.6) + R(1126, 548, 118, 5, '#f2b35e', 0) + R(1126, 573, 118, 5, '#f2b35e', 0) +
       TC(1185, 562, 'PARDON THE DUST', 7.4, '#2a1a14', 'eng', 'letter-spacing=".8"') +
       TC(1185, 572, 'Hard hats optional', 5.4, '#6b4a40', 'ital');

  /* ladder */
  s += L('M1282 790L1246 524M1298 790L1262 524', 3, INK) + L('M1282 790L1246 524M1298 790L1262 524', 1.5, '#a98458');
  for (let i = 0; i < 10; i++) {
    const t = (i + 0.7) / 10.5;
    s += L('M' + f(1282 - 36 * t) + ' ' + f(790 - 266 * t) + 'L' + f(1298 - 36 * t) + ' ' + f(790 - 266 * t), 2.2, '#8a6a3a');
  }

  return s;
}

function bayWin(): string {
  let s = '';
  s += P([[772, 556], [772, 636], [790, 646], [830, 646], [848, 636], [848, 556]], '#cbbfa8', 1.8);
  s += P([[774, 560], [790, 556], [790, 640], [774, 632]], 'url(#gGA)', 1.5) + P([[774, 560], [790, 556], [790, 640], [774, 632]], '#05030a', 0).replace('/>', ' opacity=".28"/>');
  s += P([[830, 556], [846, 560], [846, 632], [830, 640]], 'url(#gGA)', 1.5) + P([[830, 556], [846, 560], [846, 632], [830, 640]], '#05030a', 0).replace('/>', ' opacity=".28"/>');
  s += R(790, 556, 40, 84, 'url(#gGA)', 1.8) + L('M810 556V640M790 590H830', 1.3, INK);
  s += glow(810, 598, 70, 'gLamp', 0.4);
  for (let i = 0; i < 5; i++) s += R(795 + i * 7.5, 622 - rr(0, 4), 6.6, 16, pick(BOOKC), 0.5);
  s += P([[762, 556], [858, 556], [842, 538], [778, 538]], '#7fb3a6', 1.8) + P([[762, 556], [858, 556], [842, 538], [778, 538]], 'url(#pShingle)');
  s += P([[778, 646], [842, 646], [834, 660], [786, 660]], '#7a7480', 1.5);
  return s;
}

function mainFloors(): string {
  let s = '';
  const wp: [number, number][] = [[650, 790], [650, 390], [1110, 390], [1110, 790]];
  s += P(wp, '#cbbfa8', 2) + P(wp, 'url(#pPlaster)') + P(wp, 'url(#gShadeX)') + P(wp, 'url(#gShadeY)');
  for (let i = 0; i < 22; i++) {
    const sx = rr(656, 1104);
    const sy = rr(400, 700);
    s += L('M' + f(sx) + ' ' + f(sy) + 'v' + f(rr(30, 90)), 1, '#2a2030', (rr(0.05, 0.12)).toFixed(2));
  }

  /* floor horizontal bands and beam overhang */
  s += R(644, 531, 472, 22, '#05030a', 0).replace('/>', ' opacity=".34"/>') + R(644, 531, 472, 10, '#05030a', 0).replace('/>', ' opacity=".25"/>');
  s += R(630, 517, 500, 14, '#b9ad9b', 1.7) + R(630, 517, 500, 3, '#fff', 0).replace('/>', ' opacity=".18"/>');
  for (let i = 0; i < 8; i++) s += P([[658 + i * 58, 531], [678 + i * 58, 531], [658 + i * 58, 552]], '#5b3a38', 1.3);
  s += R(644, 656, 472, 9, '#b9ad9b', 1.5) + R(644, 665, 472, 3, '#05030a').replace('/>', ' opacity=".25"/>');
  s += R(644, 752, 472, 38, '#7a7480', 1.6) + R(644, 752, 472, 38, 'url(#pStone)') + R(644, 752, 472, 38, 'url(#gShadeX)');

  /* floor 3 windows */
  s += fwin(696, 418, 44, 74, { arch: true, lit: 'b', shut: true }) +
       fwin(780, 418, 44, 74, { arch: true, lit: true, item: 'curtain' }) +
       fwin(940, 418, 44, 74, { arch: true, lit: true, item: 'curtain', shut: true }) +
       fwin(1020, 418, 44, 74, { arch: true, lit: true, item: 'lamp' });

  /* floor 2 windows */
  s += fwin(696, 552, 48, 70, { lit: true, item: 'gear', shut: true }) +
       fwin(786, 552, 48, 70, { lit: true, item: 'books' }) +
       fwin(930, 552, 48, 70, { lit: 't', item: 'gear' }) +
       fwin(1016, 552, 48, 70, { lit: true, item: 'plant', shut: true });

  /* floor 1 windows */
  s += fwin(690, 684, 44, 60, { lit: true, item: 'lamp' }) +
       fwin(940, 684, 44, 60, { lit: true, item: 'plant' }) +
       fwin(1024, 684, 44, 60, { lit: true, item: 'lamp' });

  s += bayWin();
  s += L('M1102 392V752', 4.4, INK) + L('M1102 392V752', 2, '#7fb3a6');

  /* cornice and dentils */
  s += R(630, 374, 500, 12, '#b9ad9b', 1.7) + R(630, 374, 500, 3, '#fff', 0).replace('/>', ' opacity=".2"/>') + R(640, 386, 480, 9, '#a99d86', 1.3);
  for (let i = 0; i < 40; i++) s += R(646 + i * 12, 387, 6, 6, '#7a7060', 0.8);
  s += L('M640 398H1120', 1, '#f2b35e', 0.35);

  return s;
}

function foreground(): string {
  let s = '';
  s += P([[650, 790], [1130, 790], [1300, 836], [540, 836]], '#05030a', 0).replace('/>', ' opacity=".32"/>');
  [[300, 700], [1050, 1520]].forEach(function (sg) {
    const a = sg[0];
    const b = sg[1];
    s += R(a, 852, b - a, 4, '#0a070d', 0) + R(a, 872, b - a, 4, '#0a070d', 0);
    for (let x = a; x <= b; x += 21) s += P([[x, 890], [x, 858], [x + 5, 851], [x + 10, 858], [x + 10, 890]], '#0a070d', 0);
    s += R(a, 846, b - a, 2, '#e8dcca', 0).replace('/>', ' opacity=".05"/>');
  });

  [[646, 896, 48], [1100, 898, 56], [316, 888, 36], [1520, 894, 44]].forEach(function (b) {
    s += E(b[0], b[1], b[2], b[2] * 0.58, '#0b080f', 0) +
         E(b[0] - b[2] * 0.28, b[1] - b[2] * 0.32, b[2] * 0.5, b[2] * 0.2, '#1f3a34', 0) +
         E(b[0] + b[2] * 0.32, b[1] - b[2] * 0.22, b[2] * 0.32, b[2] * 0.14, '#2a4a42', 0);
  });
  s += '<rect x="-400" y="800" width="2800" height="140" fill="url(#gFog)" opacity=".7"/>';
  return s;
}

function doorArt(): string {
  let s = '<g class="spot" id="spDoor" tabindex="0" role="button" data-label="The front door" data-verb="Knock and go in" aria-label="The front door. Knock and go in.">';
  s += '<path d="' + arch(814, 664, 56, 126) + '" fill="#05030a" stroke="' + INK + '" stroke-width="2"/>';
  s += '<g id="doorLight"><path d="' + arch(816, 666, 52, 122) + '" fill="url(#gGA)"/>' + P([[816, 790], [868, 790], [930, 900], [760, 900]], 'url(#gBeam)', 0) + '</g>';
  s += '<g id="doorLeaf"><path d="' + arch(816, 666, 52, 122) + '" fill="#6f2639" stroke="' + INK + '" stroke-width="1.6"/>' +
       L('M842 716V788M818 744H866', 0.8, INK, 0.7) +
       R(822, 752, 16, 28, '#4d1a2a', 0.8) +
       R(846, 752, 16, 28, '#4d1a2a', 0.8) +
       C(858, 750, 1.8, '#c9a463') +
       '<path d="' + arch(822, 672, 40, 36) + '" fill="url(#gGA)" stroke="' + INK + '" stroke-width="1.2" opacity=".9"/>' + '</g>';
  s += '<path class="ring" d="' + arch(810, 660, 64, 130) + '"/><path d="' + arch(804, 654, 76, 138) + '" fill="transparent"/></g>';
  s += R(804, 780, 76, 6, '#8a8490', 1.4) + R(796, 786, 92, 6, '#7a7480', 1.4) + R(790, 792, 104, 5, '#6b6670', 1.3);

  /* porch roof */
  s += P([[782, 654], [902, 654], [890, 632], [794, 632]], '#7fb3a6', 2) +
       P([[782, 654], [902, 654], [890, 632], [794, 632]], 'url(#pShingle)') +
       R(780, 654, 124, 6, '#4d1a2a', 1.5) +
       P([[790, 660], [790, 676], [802, 660]], '#4d1a2a', 1.2) +
       P([[894, 660], [894, 676], [882, 660]], '#4d1a2a', 1.2);

  s += L('M806 700V690', 1.6, INK) + P([[800, 712], [812, 712], [810, 700], [802, 700]], 'url(#gGA)', 1.2) + glow(806, 706, 30, 'gLamp', 0.7);

  const plaque = PORTFOLIO_DATA.SITE.plaque;
  s += R(884, 718, 50, 24, '#c9a463', 1.4) + R(887, 721, 44, 18, 'none', 0.5) +
       T(909, 729, plaque[0].toUpperCase(), 3.6, '#2a1a14', 'eng', 'text-anchor="middle" letter-spacing=".2"') +
       T(909, 736.5, plaque[1], 4, '#2a1a14', 'ital', 'text-anchor="middle"');

  return s;
}

function bandsArt(): string {
  let s = '';
  FLOORS.forEach(function (fl) {
    const x = 644;
    const w = fl.n === 4 ? 612 : 478;
    let y = fl.y0;
    let h = fl.y1 - fl.y0;
    if (fl.n === 4) {
      y = 236;
      h = 156;
    }
    s += '<g class="fband" data-go="' + fl.n + '" data-label="' + fl.name + '" data-verb="' + (fl.n === 1 ? 'Go in' : 'Go to floor ' + fl.n) + '" tabindex="0" role="button" aria-label="' + fl.name + '. ' + fl.k + '. Go to floor ' + fl.n + '.">' +
         '<rect class="hit" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="transparent"/>' +
         '<rect class="rim" x="' + (x + 2) + '" y="' + (y + 2) + '" width="' + (w - 4) + '" height="' + (h - 4) + '" rx="3"/></g>';
  });
  return s;
}

export const HouseExterior: React.FC<{
  viewBox: string;
}> = ({ viewBox }) => {
  const markup = useMemo(() => {
    resetSeed(21);
    let s = buildWorld();
    let house = '<g id="house" transform="translate(0 790) skewX(-1.1) translate(0 -790)">';
    house += unfinishedTop() + mainFloors();
    house += scaffold();
    house += bandsArt();
    house += doorArt();
    house += '</g>';
    s += house;
    s += foreground();
    return s;
  }, []);

  return (
    <svg
      id="art"
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="An illustrated tall crooked house on a hill at night. Three floors are lit and finished. The fourth floor is an unfinished timber frame with scaffolding."
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
};
