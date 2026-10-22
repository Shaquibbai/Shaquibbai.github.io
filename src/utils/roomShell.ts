import { R, L, rnd, f } from './svgHelpers';

export const SW = 1500;
export const FY = 660;
export const CY = 76;

export interface ShellOpts {
  wall: string;
  pat?: string;
  pat2?: string;
  dado?: string | false;
  floor?: string;
  crown?: string;
  skirt?: string;
  fpat?: string;
  above?: string;
}

export function buildShell(o: ShellOpts): string {
  let s = '';
  s += R(-600, -700, 2700, CY + 700, o.above || '#0e0a13');
  s += R(-600, CY, 2700, FY - CY, o.wall);
  if (o.pat) s += R(-600, CY, 2700, FY - CY, 'url(#' + o.pat + ')');
  if (o.pat2) s += R(-600, CY, 2700, FY - CY, 'url(#' + o.pat2 + ')');
  s += R(-600, CY, 2700, FY - CY, 'url(#gShadeY)');
  s += R(-600, CY, 2700, 254, 'url(#gCeilDark)');

  /* ceiling beams */
  for (let bx = -300; bx < 1900; bx += 290) {
    s += R(bx, CY, 26, 30, '#0f0a0c', 0).replace('/>', ' opacity=".55"/>') +
         R(bx, CY + 28, 26, 3, '#e8dcca', 0).replace('/>', ' opacity=".05"/>');
  }

  /* crown moulding */
  s += R(-600, CY - 16, 2700, 20, o.crown || '#1a100d') +
       L('M-600 ' + (CY + 5) + 'H2100', 1.2, '#e8dcca', 0.22);

  /* dado rail and wainscot */
  if (o.dado !== false) {
    s += R(-600, FY - 126, 2700, 126, o.dado || 'rgba(0,0,0,.22)') +
         R(-600, FY - 130, 2700, 6, 'rgba(232,220,202,.14)') +
         L('M-600 ' + (FY - 124) + 'H2100', 1, '#000', 0.35);
  }

  /* skirting */
  s += R(-600, FY - 24, 2700, 24, o.skirt || '#150d0a') +
       L('M-600 ' + (FY - 24) + 'H2100', 1, '#e8dcca', 0.22);

  /* floor */
  s += R(-600, FY, 2700, 700, o.floor || '#2a1b17');
  s += R(-600, FY, 2700, 700, 'url(#' + (o.fpat || 'pBoards') + ')');
  s += R(-600, FY, 2700, 5, '#e8dcca').replace('/>', ' opacity=".16"/>');
  s += L('M-600 ' + (FY + 52) + 'H2100', 1, '#000', 0.35) +
       L('M-600 ' + (FY + 112) + 'H2100', 1, '#000', 0.3);
  s += R(-600, FY, 2700, 700, 'url(#gFloorDark)');

  return s;
}

export function pool(x: number, rx: number, ry: number, op: number | string, id?: string): string {
  return '<ellipse cx="' + x + '" cy="' + (FY + 24) + '" rx="' + rx + '" ry="' + ry + '" fill="url(#' + (id || 'gLamp') + ')" opacity="' + op + '" pointer-events="none"/>';
}

export function cs(x: number, w: number, op?: number | string): string {
  return '<ellipse cx="' + x + '" cy="' + (FY + 3) + '" rx="' + (w / 2) + '" ry="' + Math.max(4, w / 18) + '" fill="#05030a" opacity="' + (op || 0.42) + '" pointer-events="none"/>';
}

export function motes(x: number, y: number, w: number, h: number, n: number, col?: string): string {
  let s = '';
  for (let i = 0; i < n; i++) {
    s += '<circle class="mote" cx="' + f(x + rnd() * w) + '" cy="' + f(y + rnd() * h) + '" r="' + f(0.8 + rnd() * 1.1) + '" fill="' + (col || '#f4dcae') + '" opacity="0" style="--mx:' + f((rnd() - 0.5) * 34) + 'px;--my:' + f(-14 - rnd() * 40) + 'px;animation-duration:' + f(15 + rnd() * 10) + 's;animation-delay:-' + f(rnd() * 18) + 's"/>';
  }
  return '<g pointer-events="none">' + s + '</g>';
}
