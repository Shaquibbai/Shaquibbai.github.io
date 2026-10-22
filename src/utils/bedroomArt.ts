import {
  R, RX, P, L, C, E, TC, G, rot, glow,
  f, resetSeed, INK
} from './svgHelpers';
import { buildShell, pool, cs, FY, CY } from './roomShell';
import { obj } from './objHelper';
import { winGlass } from './scenePieces';
import { floorDoorArt } from './doorArt';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export function posterArt(i: number, x: number, y: number, w: number, h: number): string {
  let s = '';
  const col = ['#6f2639', '#1f2a44', '#3f6f64'][i];
  let k: number;

  s += R(x, y, w, h, col, 1.6) +
       R(x + 6, y + 6, w - 12, h - 12, 'none', 0.8, '#e8dcca').replace('/>', ' opacity=".5"/>');

  if (i === 0) {
    /* a low sun over three hills */
    s += C(x + w / 2, y + h * 0.42, 22, '#f2b35e', 1.2) +
         P(
           [
             [x + 6, y + h - 6],
             [x + 6, y + h * 0.66],
             [x + w * 0.35, y + h * 0.52],
             [x + w * 0.6, y + h * 0.7],
             [x + w - 6, y + h * 0.58],
             [x + w - 6, y + h - 6]
           ],
           '#1d1527',
           1.2
         ) +
         L('M' + (x + 14) + ' ' + (y + h * 0.8) + 'H' + (x + w - 14), 0.8, '#e8dcca', 0.4);
  } else if (i === 1) {
    /* a grid and one wrong square */
    for (k = 0; k < 5; k++) {
      s += L('M' + (x + 12) + ' ' + (y + 16 + k * 19) + 'H' + (x + w - 12), 0.8, '#e8dcca', 0.35) +
           L('M' + (x + 14 + k * 17) + ' ' + (y + 12) + 'V' + (y + h - 12), 0.8, '#e8dcca', 0.35);
    }
    s += R(x + 14 + 17 * 2 + 1, y + 16 + 19 * 2 + 1, 15, 17, '#f2b35e', 0.8) +
         TC(x + w / 2, y + h - 12, 'GRID', 7, '#e8dcca', 'eng', 'letter-spacing="1.6"');
  } else {
    /* a constellation with one star out of place */
    const pts = [
      [0.25, 0.25],
      [0.45, 0.4],
      [0.62, 0.3],
      [0.75, 0.52],
      [0.5, 0.62],
      [0.3, 0.7]
    ];
    s += pts
      .map(function (p, j) {
        return j
          ? L(
              'M' +
                f(x + pts[j - 1][0] * w) +
                ' ' +
                f(y + pts[j - 1][1] * h) +
                'L' +
                f(x + p[0] * w) +
                ' ' +
                f(y + p[1] * h),
              0.7,
              '#e8dcca',
              0.5
            )
          : '';
      })
      .join('') +
      pts
        .map(function (p) {
          return C(x + p[0] * w, y + p[1] * h, 2.2, '#e8dcca');
        })
        .join('') +
      C(x + w * 0.82, y + h * 0.18, 1.8, '#f2b35e');
  }

  s += C(x + w / 2, y + 3, 2.2, '#a1342f', 0.6) + C(x + 3, y + h - 3, 0, 'none');
  return s;
}

export function bk(x: number, base: number, w: number, h: number, col: string, tilt?: number): string {
  const s =
    R(x, base - h, w, h, col, 1.3) +
    L('M' + (x + 3) + ' ' + (base - h + 9) + 'H' + (x + w - 3), 0.7, '#e8dcca', 0.55) +
    L('M' + (x + 3) + ' ' + (base - 9) + 'H' + (x + w - 3), 0.7, '#e8dcca', 0.4) +
    R(x, base - h, 3, h, '#000', 0).replace('/>', ' opacity=".18"/>');
  return tilt ? rot(tilt, x + w / 2, base, s) : s;
}

export function bookshelf3(): string {
  let s = '';
  const x0 = 196;
  const x1 = 410;
  const top = 170;

  s += R(x0 - 6, top, x1 - x0 + 12, FY - top, '#2a170f', 2) +
       R(x0, top + 8, x1 - x0, FY - top - 8, '#130b09', 0) +
       R(x0, top + 8, x1 - x0, FY - top - 8, 'url(#pPlank)').replace('/>', ' opacity=".3"/>');

  s += R(x0 - 12, top - 12, x1 - x0 + 24, 16, '#4a2e1d', 2) +
       R(x0 - 12, top - 12, x1 - x0 + 24, 16, 'url(#pWood)');

  [300, 430, 560].forEach(function (by) {
    s += R(x0 - 4, by, x1 - x0 + 8, 10, '#4a2e1d', 1.6) +
         R(x0 - 4, by, x1 - x0 + 8, 10, 'url(#pWood)') +
         L('M' + (x0 + 14) + ' ' + (by - 1) + 'h' + (x1 - x0 - 28), 1.4, '#e8dcca', 0.12);
  });

  /* fillers: a shelf that has been lived in */
  s += bk(232, 300, 14, 70, '#2d3a55') +
       bk(247, 300, 18, 84, '#8a6a3a') +
       bk(292, 300, 12, 66, '#a1a0a8', 10) +
       R(330, 276, 26, 24, '#7a3b2e', 1.4) +
       L(
         'M343 276C336 262 340 250 332 244M343 276C350 258 354 252 360 246M343 276C343 262 346 248 343 238',
         1.6,
         '#3f6f64'
       ) +
       E(332, 244, 6, 3, '#7fb3a6', 0.6) +
       E(360, 246, 6, 3, '#7fb3a6', 0.6) +
       E(343, 238, 5, 3, '#7fb3a6', 0.6);

  s += R(208, 418, 84, 12, '#c9bba3', 1.3) +
       R(212, 406, 78, 12, '#3f6f64', 1.3) +
       R(206, 394, 86, 12, '#8a3b4a', 1.3) +
       L('M214 424h60M218 412h50', 0.6, '#e8dcca', 0.5);

  /* Straw Hat grounded on the horizontal stack of books */
  const strawHat =
    E(248, 393, 28, 5, '#000', 0).replace('/>', ' opacity=".35"/>') +
    E(248, 391, 26, 6, '#dfb76c', 1.3) +
    P([[232, 389], [234, 372], [262, 372], [264, 389]], '#e8c47b', 1.2) +
    E(248, 372, 14, 3.5, '#dfb76c', 0.8) +
    L('M232 386Q248 383 264 386', 3.2, '#b83232') +
    L('M236 377h24M234 382h28', 0.5, '#c99e46', 0.6);
  s += obj('strawhat', 'A straw hat, left on the shelf', 'Take a closer look', strawHat, [220, 368, 56, 28]);

  /* Miniature sword resting securely on a wooden rack */
  const sword =
    L('M350 430V418M374 430V418', 2, '#181216') +
    L('M346 430h8M370 430h8', 2.4, '#251b22') +
    L('M340 417Q362 413 388 415', 2.8, '#1e1c26') +
    C(352, 416, 2.6, '#c9a463', 0.9) +
    L('M338 418L350 416', 2.4, '#6f2639') +
    L('M340 418l2 -2m2 2l2 -2', 0.7, '#c9a463', 0.8);
  s += obj('sword', 'A miniature sword on a rack', 'Inspect it', sword, [336, 412, 56, 22]);

  s += bk(346, 430, 16, 80, '#a1a0a8') +
       L('M376 430v-12', 2, INK) +
       C(376, 408, 16, '#2d3a55', 1.4) +
       L('M362 408h28M376 392v32', 0.7, '#e8dcca', 0.5) +
       R(364, 430, 24, 3, '#8a6a3a', 1);

  s += R(262, 500, 126, 60, '#8a6a3a', 1.6) +
       R(262, 500, 126, 60, 'url(#pHatch)').replace('/>', ' opacity=".25"/>') +
       R(258, 494, 134, 10, '#a98458', 1.5) +
       TC(325, 534, 'ODDS · ENDS', 8, '#2a1a14', 'eng', 'letter-spacing="1.2"');

  s += R(x0, 570, x1 - x0, 90, '#3a2418', 1.8) +
       R(x0, 570, x1 - x0, 90, 'url(#pWood)') +
       L('M303 570V660', 1.2, INK) +
       C(296, 622, 2.6, '#c9a463', 1) +
       C(310, 622, 2.6, '#c9a463', 1);

  /* the six real books */
  const pos = [
    [208, 300, 22, 78],
    [266, 300, 24, 74],
    [296, 430, 24, 84],
    [322, 430, 22, 92],
    [208, 560, 24, 100],
    [234, 560, 22, 90]
  ];

  PORTFOLIO_DATA.BOOKS.forEach(function (b, i) {
    const p = pos[i % pos.length];
    const art = bk(p[0], p[1], p[2], p[3], b.c);
    s += obj(
      'book:' + i,
      'A book: ' + b.t,
      'Pull it off the shelf',
      '<g class="bkp" id="bk' + i + '">' + art + '</g>',
      [p[0] - 2, p[1] - p[3] - 4, p[2] + 4, p[3] + 6],
      { nolift: true, cls: 'bookobj' }
    );
  });

  return s;
}

export function curtainsArt(): string {
  let s = '';
  const x = 450;
  const y = 196;
  const w = 140;
  const h = 270;

  s += R(x - 4, y - 4, w + 8, h + 10, '#1a100d', 2) + winGlass(x + 8, y + 8, w - 16, h - 24, { arch: true });
  s += R(x - 18, y - 14, w + 36, 8, '#c9a463', 1.6) +
       C(x - 18, y - 10, 4, '#c9a463', 1.2) +
       C(x + w + 18, y - 10, 4, '#c9a463', 1.2);

  s += '<g id="curL" class="tgl" style="transform-box:fill-box;transform-origin:0 50%;transform:scaleX(.34)">' +
       P([[x - 6, y - 6], [x + w / 2 + 4, y - 6], [x + w / 2 - 4, y + h], [x - 10, y + h + 6]], '#6f2639', 1.6) +
       [1, 2, 3].map(function (k) {
         return L('M' + (x - 6 + k * 20) + ' ' + (y - 4) + 'Q' + (x - 8 + k * 20) + ' ' + (y + h * 0.5) + ' ' + (x - 8 + k * 20) + ' ' + (y + h), 1, INK, 0.4);
       }).join('') +
       '</g>';

  s += '<g id="curR" class="tgl" style="transform-box:fill-box;transform-origin:100% 50%;transform:scaleX(.34)">' +
       P([[x + w - 4, y - 6], [x + w / 2 - 4, y - 6], [x + w / 2 + 4, y + h], [x + w + 10, y + h + 6]], '#6f2639', 1.6) +
       [1, 2, 3].map(function (k) {
         return L('M' + (x + w - k * 20) + ' ' + (y - 4) + 'Q' + (x + w + 2 - k * 20) + ' ' + (y + h * 0.5) + ' ' + (x + w + 2 - k * 20) + ' ' + (y + h), 1, INK, 0.4);
       }).join('') +
       '</g>';

  s += R(x - 14, y + h + 6, w + 28, 8, '#8a6a3a', 1.4);
  return obj('window', 'The window', 'Draw the curtains', s, [x - 20, y - 16, w + 40, h + 36], { nolift: true });
}

export function bedArt(): string {
  let s = '';
  /* rug */
  s += E(800, 700, 320, 26, '#4d1a2a', 1.2) +
       E(800, 700, 290, 20, 'none', 0).replace(
         'fill="none"',
         'fill="none" stroke="#e8dcca" stroke-width=".8" stroke-dasharray="4 5" opacity=".35"'
       );

  /* frame */
  s += R(610, 372, 22, 288, '#3a2418', 2) +
       R(610, 372, 22, 288, 'url(#pWood)') +
       R(610, 372, 22, 288, 'url(#gShadeX)');
  s += R(960, 480, 18, 180, '#3a2418', 2) +
       R(960, 480, 18, 180, 'url(#pWood)');
  s += R(632, 598, 328, 14, '#3a2418', 1.6);

  /* under the bed: the dark, and something that lives in it */
  s += R(632, 612, 328, 48, '#05030a', 0);
  s += '<g class="tw">' + C(792, 634, 2.4, '#f2b35e') + C(806, 634, 2.4, '#f2b35e') + '</g>';
  s += P([[640, 660], [672, 640], [700, 660]], '#2a1a14', 1).replace('/>', ' opacity=".8"/>');

  /* mattress, blanket, pillows */
  s += R(632, 546, 328, 56, '#e8dcca', 1.8) +
       R(632, 546, 328, 10, '#fff', 0).replace('/>', ' opacity=".25"/>');

  /* character resting on pillow, daydreaming under blanket */
  s += '<g id="charBed">' +
       /* head resting on pillow */
       C(686, 520, 11, '#e0c59e', 1.2) +
       /* messy dark hair */
       P([[674, 518], [678, 507], [696, 507], [699, 517], [696, 525], [688, 513], [678, 523]], '#1d1626') +
       /* resting eyelid line */
       L('M682 522q4 2 8 0', 1, '#3a2418') +
       /* shoulder tucked under quilt */
       P([[676, 532], [716, 536], [714, 558], [668, 552]], '#3b2f48', 1.2) +
       '</g>';

  s += P([[704, 524], [960, 524], [960, 604], [704, 604]], '#6f2639', 1.8) +
       P([[704, 524], [960, 524], [960, 604], [704, 604]], 'url(#pStripe)') +
       R(704, 560, 256, 10, '#4d1a2a', 0).replace('/>', ' opacity=".6"/>') +
       L('M716 580H950M716 590H950', 0.7, '#e8dcca', 0.25) +
       L('M704 524Q716 540 706 564Q714 584 704 604', 1.4, INK, 0.5);

  s += E(664, 540, 36, 16, '#efe4cf', 1.6) +
       E(682, 526, 32, 14, '#efe4cf', 1.6) +
       L('M646 536q18 -6 36 0', 0.7, INK, 0.35);

  s += R(630, 598, 332, 8, '#2a170f', 0).replace('/>', ' opacity=".0"/>');
  s += R(618, 654, 12, 6, '#1a100d', 1.2) +
       R(954, 654, 12, 6, '#1a100d', 1.2);

  return obj('underbed', 'Under the bed', 'Look closer', s, [632, 606, 328, 54], { nolift: true, cls: 'ub' });
}

export function tvArt(): string {
  let s = '';
  s += R(1090, 566, 240, 94, '#2a170f', 2) +
       R(1090, 566, 240, 94, 'url(#pWood)') +
       R(1100, 578, 150, 68, '#0b090d', 1.4) +
       R(1262, 578, 56, 68, '#3a2418', 1.2) +
       C(1290, 612, 2.6, '#c9a463', 1);

  /* console on the shelf, still warm */
  s += R(1108, 618, 100, 22, '#2b2f3a', 1.5) +
       R(1114, 624, 52, 4, '#a1a0a8', 0.8) +
       '<g class="pulse">' + C(1196, 629, 2.2, '#7fb3a6') + '</g>' +
       L('M1210 630q22 4 28 -22', 1.2, INK);

  /* the set */
  s += '<g id="tvSet">' +
       L('M1210 444L1168 388M1214 444L1262 378', 1.8, INK) +
       C(1168, 388, 2, INK) +
       C(1262, 378, 2, INK);

  s += RX(1112, 440, 202, 130, 12, '#3a2c25', 2) +
       R(1112, 440, 202, 130, 'url(#pWood)').replace('<rect', '<rect rx="12"').replace('/>', ' opacity=".5"/>');

  s += RX(1126, 452, 150, 104, 16, '#05060a', 1.6);
  s += '<g id="tvScr">' +
       RX(1130, 456, 142, 96, 14, '#0e1626', 0) +
       '<g class="flick">' +
       RX(1130, 456, 142, 96, 14, '#6c8fe0', 0).replace('/>', ' opacity=".2"/>') +
       '</g>' +
       L('M1136 470h130M1136 482h130M1136 494h130M1136 506h130M1136 518h130M1136 530h130', 0.6, '#fff', 0.07) +
       TC(1201, 508, 'CH 1', 12, '#bcd0ff', 'mono', 'opacity=".75" letter-spacing="2"') +
       '</g>';

  s += R(1288, 454, 16, 100, '#241c18', 1) +
       C(1296, 470, 5, '#8a8490', 1.2) +
       C(1296, 490, 5, '#8a8490', 1.2) +
       L('M1291 512h10M1291 518h10M1291 524h10M1291 530h10', 0.9, INK, 0.7);
  s += '</g>';

  return obj('tv', 'The television', 'Turn it on and change channels', s, [1090, 370, 244, 292], { nolift: true, cx: 1210 });
}

export function pinsArt(): string {
  let s = '';
  const defs: [number, number, number, number, number, string][] = [
    [1112, 134, 78, 62, -3, '#efe4cf'],
    [1226, 118, 70, 58, 2.5, '#d8c06e'],
    [1292, 196, 70, 54, -2, '#bfd6cf']
  ];

  /* red string, because of course */
  s += L('M1151 138L1262 124L1328 200', 1, '#a1342f', 0.85) +
       L('M1151 138Q1180 200 1215 224', 0.8, '#a1342f', 0.5);

  PORTFOLIO_DATA.PINS.forEach(function (_p, i) {
    const d = defs[i % defs.length];
    const cx = d[0] + d[2] / 2;
    const cy = d[1] + d[3] / 2;
    const a = G(
      'rotate(' + d[4] + ' ' + cx + ' ' + cy + ')',
      R(d[0], d[1], d[2], d[3], d[5], 1) +
        L(
          'M' +
            (d[0] + 8) +
            ' ' +
            (d[1] + 20) +
            'h' +
            (d[2] - 20) +
            'M' +
            (d[0] + 8) +
            ' ' +
            (d[1] + 30) +
            'h' +
            (d[2] - 30) +
            'M' +
            (d[0] + 8) +
            ' ' +
            (d[1] + 40) +
            'h' +
            (d[2] - 24),
          0.8,
          '#2a1a14',
          0.5
        ) +
        TC(cx, d[1] + 13, 'NOTE ' + (i + 1), 6.4, '#6f2639', 'eng', '') +
        C(cx, d[1] + 4, 3, '#a1342f', 0.7)
    );
    s += obj('pin:' + i, 'Pinned note ' + (i + 1), 'Read it', a, [d[0] - 4, d[1] - 6, d[2] + 8, d[3] + 12], {
      cls: 'pinobj'
    });
  });

  return s;
}

export function bedsideArt(): string {
  let s = '';
  s += R(1000, 560, 72, 100, '#3a2418', 1.8) +
       R(1000, 560, 72, 100, 'url(#pWood)') +
       R(996, 552, 80, 10, '#4a2e1d', 1.6) +
       R(1000, 560, 72, 6, '#000', 0).replace('/>', ' opacity=".25"/>');

  const dr =
    R(1008, 586, 56, 38, '#070409', 0) +
    '<g id="bdSlide" class="tgl" style="transform-box:fill-box;transform-origin:50% 0">' +
    R(1008, 586, 56, 38, '#4a2e20', 1.4) +
    R(1026, 600, 20, 6, '#c9a463', 1.1) +
    '</g>';

  s += obj('bdrawer', 'The bedside drawer', 'Pull it open', dr, [1006, 584, 60, 42], {
    nolift: true,
    cls: 'drobj'
  });

  s += R(1008, 636, 56, 14, 'none', 0.8, '#e8dcca').replace(
    'stroke-width="0.8"',
    'stroke-width=".8" stroke-dasharray="2 3" opacity=".25"'
  );

  /* The smartphone on the nightstand */
  const phone =
    E(1054, 552, 9, 2.2, '#000', 0).replace('/>', ' opacity=".35"/>') +
    RX(1046, 538, 16, 26, 3, '#1c1b24', 1.2) +
    R(1048, 540, 12, 22, '#1e2838', 0) +
    L('M1050 546h8M1050 550h5M1050 554h7', 0.6, '#7fb3a6', 0.8);
  s += obj('phone', 'The smartphone', 'Pick it up', phone, [1042, 534, 24, 32]);

  return s;
}

export function lampArt(): string {
  let s = '';
  s += R(1010, 540, 12, 12, '#8a6a3a', 1.2) +
       L('M1016 540V510', 2, INK) +
       P([[1000, 512], [1006, 486], [1028, 486], [1034, 512]], '#e8c98a', 1.5) +
       P([[1000, 512], [1006, 486], [1028, 486], [1034, 512]], 'url(#gShadeX)');

  const g = '<g id="lampGlow" class="tgl">' + glow(1016, 506, 200, 'gLamp', 0.7) + '</g>';
  return g + obj('lamp', 'The bedside lamp', 'Switch it off or on', s, [994, 478, 48, 76], { cls: 'lampobj' });
}

export function alarmArt(): string {
  const s =
    R(1044, 528, 30, 24, '#3f6f64', 1.5) +
    R(1048, 532, 22, 12, '#0f1a18', 1) +
    '<text id="alarmT" x="1059" y="541" font-size="7" fill="#f2b35e" text-anchor="middle" class="mono">--:--</text>' +
    L('M1047 528l-4 -6M1071 528l4 -6', 1.6, INK) +
    C(1043, 522, 3, '#c9a463', 1) +
    C(1075, 522, 3, '#c9a463', 1) +
    L('M1049 552v4M1069 552v4', 1.4, INK);
  return obj('alarm', 'The alarm clock', 'Hit snooze', s, [1040, 516, 40, 42], { cls: 'alarmobj' });
}

export function controllerArt(): string {
  const s =
    '<g id="ctl" class="tgl">' +
    RX(842, 512, 56, 24, 9, '#2b2f3a', 1.5) +
    R(852, 520, 12, 4, '#a1a0a8', 0.6) +
    R(856, 516, 4, 12, '#a1a0a8', 0.6) +
    C(884, 518, 2.4, '#f2b35e', 0.6) +
    C(890, 524, 2.4, '#7fb3a6', 0.6) +
    C(878, 524, 2.4, '#6f2639', 0.6) +
    C(884, 530, 2.4, '#8fb4ff', 0.6) +
    L('M842 530q-6 8 2 8M898 530q6 8 -2 8', 2.4, '#2b2f3a') +
    '</g>';
  return obj('controller', 'A game controller, left on the bed', 'Pick it up', s, [838, 506, 66, 36], {
    nolift: true,
    cls: 'ctlobj'
  });
}

export function posterObjs(): string {
  let s = '';
  const xs = [640, 756, 872];
  const ys = [128, 138, 126];
  const w = 96;
  const h = 134;

  PORTFOLIO_DATA.POSTERS.forEach(function (p, i) {
    const x = xs[i % 3];
    const y = ys[i % 3];
    const a = G(
      'rotate(' + [-1.5, 1, -0.8][i % 3] + ' ' + (x + w / 2) + ' ' + (y + h / 2) + ')',
      posterArt(i % 3, x, y, w, h) + L('M' + (x + w - 14) + ' ' + (y + h) + 'q10 -2 14 -14', 0, INK)
    );
    s += obj('poster:' + i, 'A poster: ' + p.front, 'Look behind it', '<g class="pstr">' + a + '</g>', [
      x - 4,
      y - 4,
      w + 8,
      h + 8
    ], { cls: 'posterobj' });
  });

  return s;
}

export function buildScene3(): string {
  resetSeed(77);
  let s = buildShell({
    wall: '#2b2140',
    pat: 'pStripe',
    pat2: 'pDamask',
    dado: '#1e1629',
    floor: '#3a2a30',
    crown: '#150e1c',
    skirt: '#120d19'
  });

  s += glow(520, 330, 300, 'gMoonL', 0.35) +
       glow(800, 300, 420, 'gLamp', 0.12);

  s += pool(1030, 160, 26, 0.5) +
       pool(1210, 220, 30, 0.4, 'gTVglow') +
       pool(520, 120, 24, 0.5, 'gMoonL');

  s += cs(303, 230, 0.55) +
       cs(795, 370, 0.5) +
       cs(1036, 84, 0.45) +
       cs(1210, 250, 0.5);

  /* ceiling light, off, and a string of fairy lights that are on */
  s += L('M200 ' + (CY + 6) + 'Q420 ' + (CY + 50) + ' 640 ' + (CY + 8) + 'T1080 ' + (CY + 10) + 'T1340 ' + (CY + 12), 1.2, INK, 0.8);

  for (let i = 0; i < 24; i++) {
    const lx = 200 + i * 50;
    const ly = CY + 6 + Math.sin(i * 0.55) * 14 + (i % 2 ? 5 : 0);
    s += '<circle cx="' + lx + '" cy="' + f(ly + 5) + '" r="2.8" fill="' + ['#f2b35e', '#7fb3a6', '#e8dcca', '#e0956a'][i % 4] + '" class="tw" style="animation-delay:' + f(-i * 0.37) + 's"/>';
  }

  s += bookshelf3();
  s += curtainsArt();
  s += posterObjs();
  s += bedArt();
  s += bedsideArt();
  s += pinsArt();
  s += controllerArt();

  /* things on the floor */
  s += E(1060, 676, 38, 5, '#000', 0).replace('/>', ' opacity=".25"/>') +
       R(1040, 646, 40, 16, '#a1a0a8', 1.2).replace('/>', ' opacity="0"/>');

  s += P([[1356, 650], [1376, 650], [1372, 626], [1360, 626]], '#6b6e78', 1.2).replace('/>', ' opacity="0"/>');

  /* socks, naturally */
  s += P([[500, 662], [522, 656], [530, 664], [508, 670]], '#8a3b4a', 1.2) +
       P([[536, 668], [556, 662], [562, 670], [540, 675]], '#2d3a55', 1.2);

  /* darkness: lamp off dims the room, but not the television or the lamp */
  s += '<rect id="dk3" class="tgl" x="-600" y="-700" width="2700" height="1700" fill="#05030a" opacity="0" style="opacity:0" pointer-events="none"/>';

  s += lampArt() + alarmArt();

  s += '<g id="tvGlow" class="tgl">' + glow(1210, 500, 260, 'gTVglow', 0.5) + '</g>';

  s += tvArt();

  /* doors */
  s += floorDoorArt(62, 'doorD', 'Downstairs — Workshop', 'Open the door', 'down');
  s += floorDoorArt(1392, 'doorU', 'Upstairs — Under Construction', 'Open the door', 'up');

  return s;
}
