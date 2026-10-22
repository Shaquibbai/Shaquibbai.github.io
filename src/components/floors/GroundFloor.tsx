import React, { useMemo } from 'react';
import {
  R, P, L, C, E, TC, rot, arch, glow,
  f, rr, resetSeed, INK, esc
} from '../../utils/svgHelpers';
import { buildShell, pool, cs, motes, FY, CY } from '../../utils/roomShell';
import { obj } from '../../utils/objHelper';
import { winGlass, lampPend, sconce } from '../../utils/scenePieces';
import { floorDoorArt } from '../../utils/doorArt';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export function buildScene1(): string {
  resetSeed(42);
  let s = buildShell({
    wall: '#3b1927',
    pat: 'pDamask',
    pat2: 'pStripe',
    dado: '#2b1019',
    floor: '#2b1c18',
    crown: '#1a0d12'
  });

  const S = PORTFOLIO_DATA.SITE;

  /* ambient pools of light */
  s += glow(780, 210, 380, 'gLamp', '.2') +
       glow(1110, 420, 300, 'gLamp', '.16') +
       glow(130, 520, 230, 'gLampT', '.2');
  s += pool(780, 380, 44, 0.5) +
       pool(1090, 250, 34, 0.5) +
       pool(132, 150, 26, 0.45) +
       pool(590, 170, 30, 0.4, 'gMoonL');
  s += motes(640, 260, 300, 320, 7) +
       cs(1063, 270, 0.5) +
       cs(1245, 72, 0.5) +
       cs(1461, 64, 0.4) +
       cs(292, 34, 0.4) +
       cs(138, 110, 0.4);

  /* ---- the front door (interior side) ---- */
  s += '<clipPath id="cpD"><path d="' + arch(84, 372, 104, 288) + '"/></clipPath>';
  let door = '';
  door += '<path d="' + arch(78, 366, 116, 294) + '" fill="#120c17" stroke="' + INK + '" stroke-width="3"/>';
  door += '<g clip-path="url(#cpD)">' + R(80, 360, 112, 300, 'url(#gSkyS)');
  for (let i = 0; i < 16; i++) {
    door += C(rr(88, 184), rr(380, 520), rr(0.5, 1.1), '#e8dcca').replace('/>', ' class="tw" style="animation-delay:' + f(-rr(0, 4)) + 's" opacity=".7"/>');
  }
  door += glow(160, 430, 50, 'gMoon') +
          C(160, 430, 12, '#e6d9c3') +
          R(80, 590, 112, 70, '#1b1228') +
          P([[80, 600], [130, 586], [192, 606], [192, 660], [80, 660]], '#241833') +
          L('M96 640q6 -12 10 0M150 636q4 -10 8 0', 1, '#4d6a5e', 0.7) +
          '</g>';
  door += '<g class="spill tgl" style="opacity:0"><path d="M84 660L188 660L330 686L-40 686Z" fill="#9bb6e8" opacity=".18"/></g>';
  door += '<g class="leaf"><path d="' + arch(84, 372, 104, 288) + '" fill="#6f2639" stroke="' + INK + '" stroke-width="2.4"/>' +
          R(84, 372, 104, 288, 'url(#pWood)').replace('/>', ' opacity=".5"/>') +
          L('M136 440V660M84 520H188', 1.2, INK, 0.6) +
          R(96, 456, 32, 52, '#4d1a2a', 1.2) +
          R(144, 456, 32, 52, '#4d1a2a', 1.2) +
          R(96, 540, 32, 86, '#4d1a2a', 1.2) +
          R(144, 540, 32, 86, '#4d1a2a', 1.2) +
          '<path d="' + arch(104, 388, 64, 60) + '" fill="url(#gGA)" stroke="' + INK + '" stroke-width="1.6" opacity=".85"/>' +
          C(172, 540, 5, '#c9a463', 1.4) +
          R(168, 548, 8, 12, '#c9a463', 1) +
          '</g>';
  s += obj('door', 'The front door', 'Open or close it', door, [78, 366, 116, 294], { cls: 'd1' });

  /* welcome mat */
  const mat = R(70, FY - 6, 136, 8, '#1d2f2b', 1.4) +
    R(74, FY - 4, 128, 4, '#2f4a43', 0) +
    TC(138, FY + 0.5, esc(S.mat).toUpperCase(), 3.6, '#e8dcca', 'eng', 'letter-spacing=".5"') +
    '<g class="key tgl" style="opacity:0"><path d="M176 ' + (FY + 6) + 'h14M190 ' + (FY + 6) + 'v4M184 ' + (FY + 6) + 'v3" stroke="#c9a463" stroke-width="1.6" fill="none"/><circle cx="172" cy="' + (FY + 6) + '" r="3.6" fill="none" stroke="#c9a463" stroke-width="1.6"/></g>';
  s += obj('mat', 'The welcome mat', 'Lift the corner', mat, [66, FY - 14, 144, 24], { cls: 'matobj nolift' });

  /* the letter */
  const letter = P([[112, FY - 24], [152, FY - 24], [152, FY - 4], [112, FY - 4]], '#efe4cf', 1.2) +
    L('M112 ' + (FY - 24) + 'L132 ' + (FY - 12) + 'L152 ' + (FY - 24), 1, INK, 0.6) +
    C(132, FY - 12, 3.4, '#6f2639', 0.8) +
    glow(132, FY - 14, 46, 'gLamp', 0.5);
  s += obj('letter', 'A letter on the mat', 'Read it', letter, [104, FY - 42, 56, 42], { cls: 'letterobj' });
  s += '<g class="pulse once" pointer-events="none">' +
       TC(132, FY - 52, 'START HERE', 8.4, '#f2b35e', 'mono', 'letter-spacing="1.4"') +
       L('M132 ' + (FY - 46) + 'v8m-4 -4l4 4l4 -4', 1.4, '#f2b35e') +
       '</g>';

  /* coat hooks and umbrella in stoneware crock */
  s += R(214, 330, 64, 8, '#3a2418', 1.2) +
       [226, 246, 266].map(function (x) { return L('M' + x + ' 338v8', 2, '#c9a463'); }).join('');
  s += P([[232, 346], [262, 346], [268, 420], [228, 420]], '#2d3a55', 1.3) + L('M236 346q-4 -12 4 -14', 1.4, INK);
  /* classic walking umbrella: cane curved handle, rolled canopy, brass ferrule */
  s += L('M290 536V524q0 -14 12 -14t12 14v6', 3.4, '#5c361e') +
       R(288, 532, 4, 3, '#c9a463', 0.8) +
       L('M290 536L292 612', 3, '#3a2a1d') +
       P([[286, 608], [296, 608], [293, 546], [288, 546]], '#2d3a55', 1.3) +
       L('M287 572h8', 1.4, '#c9a463');
  /* stoneware umbrella stand crock grounded on floor */
  s += E(292, 660, 16, 3, '#000', 0).replace('/>', ' opacity=".4"/>') +
       P([[278, 594], [306, 594], [304, 660], [280, 660]], '#a37b58', 1.5) +
       L('M280 616h24', 2.2, '#6f2639', 0.8) +
       E(292, 594, 14, 4, '#8a624a', 1.4) +
       E(292, 594, 11, 2.8, '#1c120c', 0);

  /* ---- the nameplate ---- */
  s += L('M330 214V250M430 214V250', 1, INK, 0.6);
  const plate = R(300, 246, 166, 70, '#c9a463', 2) +
    R(306, 252, 154, 58, 'none', 0.8, '#2a1a14') +
    R(300, 246, 166, 70, 'url(#gShadeX)') +
    TC(383, 274, esc(S.name).toUpperCase(), 15, '#2a1a14', 'eng', 'letter-spacing="1.8"') +
    L('M326 282H440', 0.7, '#2a1a14', 0.6) +
    TC(383, 297, esc(S.short) + ' · computer science', 8, '#2a1a14', 'ital') +
    TC(383, 306, 'visitors welcome', 6, '#6b4a22', 'ital') +
    [[306, 252], [454, 252], [306, 304], [454, 304]].map(function (p) {
      return C(p[0], p[1], 2, '#6b4a22', 0.6);
    }).join('');
  s += obj('plate', 'The nameplate', 'Read it', plate, [300, 246, 166, 70]);
  s += sconce(284, 420) + sconce(488, 420);

  /* ---- window with the moon ---- */
  s += R(520, 170, 148, 290, '#1a100d', 2) + winGlass(530, 180, 128, 270, { arch: true });
  s += P([[522, 172], [544, 172], [536, 420], [522, 440]], '#6f2639', 1.4) +
       P([[666, 172], [646, 172], [654, 420], [668, 440]], '#6f2639', 1.4);
  s += P([[530, 452], [658, 452], [760, 672], [430, 672]], '#cfd8f0', 0).replace('/>', ' opacity=".05"/>');
  s += R(526, 462, 136, 10, '#8a6a3a', 1.3) +
       R(556, 436, 22, 26, '#8a4a3a', 1) +
       L('M567 436C558 420 566 408 560 398M567 436C576 420 574 412 582 402', 1.6, '#3f6f64') +
       E(560, 398, 6, 3, '#7fb3a6', 0.7) +
       E(582, 402, 6, 3, '#7fb3a6', 0.7);

  /* ---- noticeboard ---- */
  const nb = R(700, 150, 214, 180, '#4a2e1d', 2.2) +
    R(706, 156, 202, 168, '#a67b4a') +
    R(706, 156, 202, 168, 'url(#pCork)') +
    P([[716, 168], [774, 164], [778, 214], [720, 218]], '#efe4cf', 1).replace('/>', ' transform="rotate(-2 746 190)"/>') +
    TC(746, 184, 'STUDYING', 6.6, '#2a1a14', 'eng', 'transform="rotate(-2 746 190)" letter-spacing=".6"') +
    TC(746, 196, 'CSE · IUT', 8, '#6f2639', 'ital', 'transform="rotate(-2 746 190)"') +
    P([[790, 170], [846, 172], [844, 222], [792, 220]], '#d8c06e', 1).replace('/>', ' transform="rotate(2.5 818 196)"/>') +
    TC(818, 186, 'LEARNING', 6.6, '#2a1a14', 'eng', 'transform="rotate(2.5 818 196)"') +
    L('M800 196h36M800 204h28', 0.8, '#2a1a14', 0.5, 'transform="rotate(2.5 818 196)"') +
    P([[722, 236], [780, 238], [778, 300], [724, 298]], '#bfd6cf', 1).replace('/>', ' transform="rotate(1.5 750 268)"/>') +
    TC(750, 252, 'BUILDING', 6.6, '#2a1a14', 'eng', 'transform="rotate(1.5 750 268)"') +
    L('M730 262h40M730 270h30M730 278h36', 0.8, '#2a1a14', 0.5, 'transform="rotate(1.5 750 268)"') +
    P([[794, 240], [890, 238], [892, 310], [796, 312]], '#e8dcca', 1).replace('/>', ' transform="rotate(-1.5 842 274)"/>') +
    TC(842, 256, 'WONDERING', 6.6, '#2a1a14', 'eng', 'transform="rotate(-1.5 842 274)"') +
    TC(842, 274, 'which path?', 11, '#6f2639', 'ital', 'transform="rotate(-1.5 842 274)"') +
    [[746, 170], [818, 174], [750, 240], [842, 242]].map(function (p) {
      return C(p[0], p[1], 2.6, '#a1342f', 0.7);
    }).join('');
  s += obj('board', 'The noticeboard', 'Read what is pinned', nb, [700, 150, 214, 180]);

  /* ---- the calendar ---- */
  const cal = '<g id="calArt">' +
    L('M944 142V170', 1, INK) +
    R(914, 168, 78, 112, '#efe4cf', 1.6) +
    R(914, 168, 78, 24, '#6f2639', 1.6) +
    TC(953, 185, 'THIS TERM', 7.4, '#efe4cf', 'eng', 'id="calM" letter-spacing=".6"') +
    [0, 1, 2, 3, 4].map(function (k) { return L('M922 ' + (204 + k * 14) + 'h62', 0.6, '#2a1a14', 0.3); }).join('') +
    '<text id="calN" x="953" y="226" font-size="9.5" fill="#2a1a14" class="ital" text-anchor="middle"></text>' +
    '</g>';
  s += obj('cal', 'The calendar', 'Turn the page', cal, [910, 164, 86, 120], { cls: 'calobj' });

  /* ---- wall clock ---- */
  s += '<g id="clk1" transform="translate(1066 214)">' +
    C(0, 0, 40, '#c9bba3', 2.4) +
    C(0, 0, 34, '#efe4cf', 1.2) +
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(function (k) {
      const a = k * Math.PI / 6;
      return L('M' + f(Math.sin(a) * 29) + ' ' + f(-Math.cos(a) * 29) + 'L' + f(Math.sin(a) * (k % 3 ? 32 : 26)) + ' ' + f(-Math.cos(a) * (k % 3 ? 32 : 26)), k % 3 ? 0.8 : 1.6, INK);
    }).join('') +
    '<g class="hH">' + L('M0 0V-18', 2.6, INK) + '</g>' +
    '<g class="hM">' + L('M0 0V-26', 1.8, INK) + '</g>' +
    '<g class="hS">' + L('M0 4V-28', 0.8, '#6f2639') + '</g>' +
    C(0, 0, 2.4, '#6f2639') +
    '</g>';

  /* ---- the desk ---- */
  s += glow(1060, 420, 210, 'gLamp', 0.22);
  const dk = R(930, 562, 266, 10, '#5a3a2a', 1.8) +
    R(930, 562, 266, 10, 'url(#pWood)') +
    R(946, 572, 10, 88, '#3d2518', 1.4) +
    R(1170, 572, 10, 88, '#3d2518', 1.4) +
    R(956, 572, 214, 6, '#2d1a10', 0) +
    R(956, 576, 214, 70, '#4a2e20', 1.4) +
    R(956, 576, 214, 70, 'url(#pWood)');
  s += dk + L('M1062 576V646', 1, INK, 0.7);

  /* chair, pushed in, slightly askew */
  s += rot(-3, 1060, 640,
    R(1010, 596, 100, 10, '#7a3b2e', 1.4) +
    R(1020, 606, 6, 52, '#3d2518', 1.2) +
    R(1096, 606, 6, 52, '#3d2518', 1.2) +
    R(1008, 540, 8, 60, '#3d2518', 1.2)
  );

  /* monitor */
  const mon = '<g id="monArt">' +
    R(1090, 438, 124, 92, '#25252c', 2.2) +
    '<rect id="monScr" x="1097" y="445" width="110" height="78" fill="#0f1a18"/>' +
    '<g id="monOn" class="tgl" style="opacity:0">' +
    R(1097, 445, 110, 78, '#0f1a18') +
    L('M1104 456h50M1104 466h74M1104 476h38M1104 486h62', 1.4, '#7fb3a6', 0.9) +
    '<text x="1104" y="508" font-size="8" fill="#ffd78a" class="mono">$ whoami_</text>' +
    glow(1152, 484, 100, 'gLampT', 0.6) +
    '</g>' +
    '<g id="monOff" class="tgl">' +
    L('M1112 500h20', 1.6, '#7fb3a6', 0.5).replace('stroke-linecap="round"', 'stroke-linecap="round" class="flick"') +
    '</g>' +
    R(1140, 530, 24, 24, '#25252c', 1.6) +
    R(1122, 552, 60, 8, '#3a3a44', 1.6) +
    '</g>';
  s += obj('monitor', 'The computer', 'Switch it on', mon, [1086, 434, 132, 130]);

  /* notebooks resting directly on desk (y=562) with varied natural collection */
  const nbk =
    E(985, 562, 42, 2.5, '#000', 0).replace('/>', ' opacity=".35"/>') +
    R(946, 550, 78, 12, '#1e2638', 1.4) +
    L('M952 556h18', 0.8, '#c9a463', 0.7) +
    R(1018, 551, 5, 10, '#efe4cf', 0.6) +
    R(950, 540, 72, 10, '#6f2639', 1.4) +
    L('M956 545h14', 0.8, '#c9a463', 0.8) +
    R(1016, 541, 5, 8, '#efe4cf', 0.6) +
    R(948, 531, 66, 9, '#2d4a3e', 1.4) +
    L('M954 535h30', 0.7, '#8ab3a0', 0.6) +
    R(954, 523, 58, 8, '#8a6232', 1.3) +
    L('M982 523C980 528 976 538 978 546C979 552 977 558 974 563', 1.4, '#c9a463', 0.9) +
    P([[1002, 521], [1014, 515], [1020, 523], [1008, 529]], '#efe4cf', 1);
  s += obj('notes', 'The notebooks', 'Flip one open', nbk, [944, 516, 82, 48]);

  /* articulated desk lamp grounded on desk (y=562), angled over blotter without overlapping monitor */
  s += E(1044, 562, 12, 3, '#000', 0).replace('/>', ' opacity=".35"/>') +
       E(1044, 560, 11, 2.5, '#252e2c', 1.4) +
       R(1040, 554, 8, 5, '#354440', 1.1) +
       C(1044, 553, 2.6, '#c9a463', 0.9) +
       L('M1042 553L1028 518M1046 553L1032 518', 1.5, '#2e423b') +
       C(1030, 518, 3, '#c9a463', 1) +
       L('M1030 518L1052 498', 1.8, '#2e423b') +
       C(1052, 498, 2.5, '#c9a463', 0.9) +
       P([[1048, 496], [1056, 501], [1064, 513], [1042, 513]], '#283c35', 1.4) +
       E(1053, 513, 11, 2.5, '#f5efe0', 1) +
       glow(1053, 518, 50, 'gLamp', 0.6);
  s += R(1190, 546, 16, 16, '#e8dcca', 1.3) +
       L('M1206 551q8 0 8 6t-8 5', 1.4, INK) +
       L('M1194 541q2 -5 0 -8M1200 541q2 -5 0 -8', 1, '#a79b88', 0.6, 'class="smoke"');

  /* desk drawer */
  const dr = R(962, 584, 196, 52, '#070409', 0) +
    '<g id="drawerSlide" class="tgl" style="transform:none;transform-box:fill-box;transform-origin:50% 0">' +
    R(962, 584, 196, 52, '#5a3a2a', 1.5) +
    R(962, 584, 196, 52, 'url(#pWood)') +
    R(1032, 604, 52, 8, '#c9a463', 1.2) +
    '</g>';
  s += obj('drawer', 'The desk drawer', 'Pull it open', dr, [958, 580, 204, 60], { nolift: true, cls: 'drobj' });

  /* ---- backpack ---- */
  const bp = '<g id="bpArt">' +
    P([[1224, 660], [1214, 586], [1228, 552], [1260, 552], [1276, 586], [1272, 660]], '#3f6f64', 2) +
    P([[1224, 660], [1214, 586], [1228, 552], [1260, 552], [1276, 586], [1272, 660]], 'url(#pHatchX)') +
    '<g class="flap tgl" style="transform-box:fill-box;transform-origin:50% 0">' +
    P([[1218, 596], [1230, 556], [1258, 556], [1272, 596], [1246, 612]], '#2d5047', 1.6) +
    R(1238, 600, 16, 12, '#c9a463', 1.2) +
    '</g>' +
    R(1226, 624, 44, 28, '#2d5047', 1.4) +
    L('M1234 624V652M1262 624V652', 0.8, INK, 0.5) +
    L('M1230 552q14 -22 28 0', 2.4, INK) +
    L('M1220 600q-14 10 -8 40', 2, INK) +
    '<g class="bpOpen tgl" style="opacity:0">' +
    R(1236, 544, 10, 22, '#e8dcca', 0.9) +
    R(1248, 540, 10, 26, '#6f2639', 0.9) +
    L('M1226 548l8 -14', 2, INK) +
    '</g></g>';
  s += obj('pack', 'The backpack', 'Look inside', bp, [1208, 540, 76, 124]);

  /* ---- the door upstairs, and the skirting-board micro-study beside it ---- */
  s += floorDoorArt(1316, 'doorU', 'Upstairs — Workshop', 'Open the door', 'up');

  const mouseStudy = '<g id="cupArt">' +
    /* crooked arched hole in skirting board */
    '<path d="' + arch(1436, 590, 52, 70) + '" fill="#0d0812" stroke="' + INK + '" stroke-width="2"/>' +
    /* micro-study interior */
    '<g class="cin tgl" style="opacity:0">' +
    glow(1462, 632, 44, 'gLamp', 0.7) +
    /* tiny floorboards */
    L('M1438 658h48', 0.8, '#4a3224', 0.6) +
    /* tiny bookshelf with matchstick shelf */
    R(1444, 616, 26, 3, '#3a2216') +
    R(1446, 608, 4, 8, '#6f2639') +
    R(1451, 609, 3, 7, '#3f6f64') +
    R(1455, 607, 5, 9, '#2d3a55') +
    R(1461, 610, 4, 6, '#8a6a3a') +
    /* spool desk */
    R(1462, 642, 14, 18, '#6b462b', 1.1) +
    E(1469, 642, 7, 2, '#8a5c3a') +
    E(1469, 660, 7, 2, '#4a2c18') +
    /* tiny matchbox on spool */
    R(1463, 639, 7, 3, '#d4bc8b', 0.8) +
    /* tiny matchstick candle flickering */
    L('M1472 639v-4', 1, '#efe4cf') +
    C(1472, 633, 1.4, '#ffd78a') +
    glow(1472, 633, 14, 'gLamp', 0.8) +
    /* tiny rolled scroll */
    E(1466, 640, 2, 1, '#fff5dd') +
    '</g>' +
    /* light spill on main floor when ajar */
    '<polygon points="1440,660 1484,660 1512,684 1412,684" fill="#ffd78a" opacity="0.12" pointer-events="none"/>' +
    /* crooked little wooden door on hinges */
    '<g class="cdoor tgl" style="transform-box:fill-box;transform-origin:0 50%">' +
    '<path d="' + arch(1436, 592, 50, 68) + '" fill="#4a2e1d" stroke="' + INK + '" stroke-width="1.6"/>' +
    R(1436, 592, 50, 68, 'url(#pWood)').replace('/>', ' opacity=".45"/>') +
    L('M1452 596V660M1468 604V660', 1, '#2a170e') +
    /* iron strap hinges */
    L('M1436 612h14M1436 644h14', 1.8, '#181216') +
    C(1440, 612, 1, '#c9a463') + C(1440, 644, 1, '#c9a463') +
    /* tiny brass pin handle */
    C(1478, 632, 2.2, '#c9a463', 0.8) +
    L('M1478 632v4', 1.2, '#c9a463') +
    '</g></g>';
  s += obj('mousehole', 'Skirting-board micro-study', 'Take a closer look', mouseStudy, [1432, 588, 58, 74], { nolift: true, cls: 'cupobj' });

  /* floor details */
  s += R(300, FY - 3, 180, 3, '#6f2639', 0).replace('/>', ' opacity=".25"/>');
  s += P([[430, 672], [790, 672], [860, 700], [360, 700]], '#6f2639', 0).replace('/>', ' opacity=".18"/>');
  s += lampPend(807, CY, 138, 220);

  return s;
}

export const GroundFloor: React.FC<{
  viewBox: string;
  isActive: boolean;
  isBelow: boolean;
}> = ({ viewBox, isActive, isBelow }) => {
  const markup = useMemo(() => buildScene1(), []);

  return (
    <svg
      id="sc1"
      className={`scene ${isActive ? 'on' : ''} ${isBelow ? 'below' : ''}`}
      data-floor="1"
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      role="group"
      aria-label="Ground floor"
      tabIndex={-1}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
};
