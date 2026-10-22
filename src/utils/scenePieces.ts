import { R, RX, P, L, C, E, glow, arch, INK, f, rr } from './svgHelpers';

export interface WinGlassOpts {
  arch?: boolean;
}

export function winGlass(x: number, y: number, w: number, h: number, o: WinGlassOpts = {}): string {
  const cp = 'cpw' + Math.round(x) + '_' + Math.round(y);
  let s = '';
  const d = o.arch ? arch(x, y, w, h) : 'M' + x + ' ' + y + 'H' + (x + w) + 'V' + (y + h) + 'H' + x + 'Z';
  s += '<clipPath id="' + cp + '"><path d="' + d + '"/></clipPath>';
  s += '<path d="' + d + '" fill="url(#gSkyS)"/>';
  s += '<g clip-path="url(#' + cp + ')">';
  for (let i = 0; i < 14; i++) {
    s += C(x + rr(4, w - 4), y + rr(4, h * 0.6), rr(0.5, 1.1), '#e8dcca').replace('/>', ' class="tw" style="animation-delay:' + f(-rr(0, 4)) + 's" opacity=".7"/>');
  }
  s += glow(x + w * 0.7, y + h * 0.28, 34, 'gMoon') + C(x + w * 0.7, y + h * 0.28, 9, '#e6d9c3');
  s += R(x, y + h * 0.78, w, h * 0.22, '#1b1228') +
       P([[x, y + h * 0.8], [x + w * 0.3, y + h * 0.7], [x + w * 0.6, y + h * 0.8], [x + w, y + h * 0.72], [x + w, y + h], [x, y + h]], '#241833');
  s += '</g>';
  s += '<path d="' + d + '" fill="none" stroke="' + INK + '" stroke-width="3"/>';
  s += L('M' + f(x + w / 2) + ' ' + (o.arch ? y + w / 2 : y) + 'V' + (y + h) + 'M' + x + ' ' + f(y + h * 0.46) + 'H' + (x + w), 2, INK);
  s += R(x - 9, y + h, w + 18, 7, '#cfc3ab', 1.3) + R(x - 5, y + h + 7, w + 10, 4, '#000', 0).replace('/>', ' opacity=".3"/>');
  return s;
}

export function lampPend(x: number, yTop: number, y: number, r: number, col?: string): string {
  return RX(x - 8, yTop, 16, 5, 2, '#4a3a2a', 1.2) +
         L('M' + x + ' ' + (yTop + 4) + 'V' + y, 1.4, INK) +
         R(x - 3, y - 4, 6, 6, '#c9a463', 1) +
         P([[x - 18, y + 14], [x - 6, y], [x + 6, y], [x + 18, y + 14]], col || '#3d6f64', 1.4) +
         E(x, y + 14, 16, 3, '#f5efe0', 1) +
         C(x, y + 11, 4.2, '#fff0c8', 0) +
         glow(x, y + 14, r, 'gLamp').replace('<circle', '<circle class="lampf"');
}

export function sconce(x: number, y: number): string {
  return RX(x - 5, y - 14, 10, 26, 4, '#8a6a3a', 1.4) +
         RX(x - 4, y - 12, 8, 22, 3, '#c9a463', 0) +
         L('M' + x + ' ' + y + 'q8 4 10 -4t-2 -8', 2.2, '#5a4020') +
         P([[x + 4, y - 8], [x + 12, y - 8], [x + 11, y - 5], [x + 5, y - 5]], '#c9a463', 1.1) +
         P([[x + 2, y - 24], [x + 14, y - 24], [x + 11, y - 8], [x + 5, y - 8]], '#efe4ce', 1.3) +
         C(x + 8, y - 15, 3.4, '#ffe7b0', 0) +
         glow(x + 8, y - 15, 90, 'gLamp', 0.65);
}
