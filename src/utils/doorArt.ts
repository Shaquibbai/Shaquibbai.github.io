import { R, RX, L, C, esc, f } from './svgHelpers';
import { FY } from './roomShell';

export interface FloorDoorOpts {
  raw?: boolean;
}

export function floorDoorArt(
  x: number,
  key: string,
  label: string,
  verb: string,
  dir: 'up' | 'down',
  o: FloorDoorOpts = {}
): string {
  const W = 88;
  const H = 264;
  const y0 = FY - H;
  const up = dir === 'up';
  const raw = !!o.raw;
  const hl = !up;
  const cx = x + W / 2;
  const T = 11;
  const frame = raw ? '#6b5638' : '#3a2216';
  const frameHi = raw ? '#b89868' : '#8a5a38';
  const leaf = raw ? '#7d6544' : '#4d2a22';
  const pan = raw ? '#5e4a30' : '#3a1f19';
  const edge = raw ? '#e0c98f' : '#d9a063';
  let s = '';

  /* shadow the architrave throws on the wall, and the contact shadow on the floor */
  s += R(x - T + 4, y0 - 12, W + 2 * T + 4, H + 12, '#000', 0).replace('/>', ' opacity=".22"/>');
  s += '<ellipse cx="' + cx + '" cy="' + (FY + 3) + '" rx="' + (W / 2 + 22) + '" ry="5" fill="#000" opacity=".4" pointer-events="none"/>';

  /* architrave: side jambs and a head, then the dark opening and the warm room beyond */
  s += R(x - T, y0 - 12, W + 2 * T, H + 12, frame, 1.6);
  s += R(x, y0, W, H, '#0a0609', 0);
  s += '<g class="beyond" style="opacity:0">' + R(x, y0, W, H, 'url(#gBeyond)', 0) + R(x, FY - 16, W, 16, '#f2c27a', 0).replace('/>', ' opacity=".35"/>') + '</g>';
  s += '<g class="leak" style="opacity:0">' + L('M' + (x + 1) + ' ' + (y0 + 1) + 'H' + (x + W - 1) + 'M' + (hl ? x + W - 1 : x + 1) + ' ' + y0 + 'V' + (FY - 1), 2.6, '#ffd9a0', 0.85) + '</g>';

  /* the leaf: stiles and rails, six raised panels (a tall middle pair), a repaired board */
  let lf = R(x, y0, W, H - 3, leaf, 1.4) + R(x, y0, W, H - 3, 'url(#pWood)', 0).replace('/>', ' opacity=".55"/>');
  const pw = (W - 30) / 2;
  const avail = H - 3 - 16 - 16 - 24;
  const rows = [Math.round(avail * 0.26), Math.round(avail * 0.48), Math.round(avail * 0.26)];
  let py = y0 + 16;
  let px: number;
  let ph: number;

  for (let j = 0; j < 3; j++) {
    ph = rows[j];
    for (let i = 0; i < 2; i++) {
      px = x + 10 + i * (pw + 10);
      lf += R(px, py, pw, ph, pan, 1) +
            R(px + 4, py + 4, pw - 8, ph - 8, 'none', 0.7, '#000').replace('/>', ' opacity=".35"/>') +
            L('M' + (px + 1) + ' ' + (py + ph - 1) + 'V' + (py + 1) + 'H' + (px + pw - 1), 1.3, edge, 0.42) +
            L('M' + (px + pw) + ' ' + (py + 2) + 'V' + (py + ph) + 'H' + (px + 2), 1.1, '#000', 0.45);
    }
    py += ph + 12;
  }

  const rx = x + 10 + (hl ? 0 : pw + 10);
  const ry = y0 + 16 + rows[0] + rows[1] + 24;
  lf += R(rx, ry, pw, rows[2], raw ? '#8f7650' : '#6a4630', 0.8).replace('/>', ' opacity=".55"/>') +
        C(rx + 4, ry + 4, 1.2, '#1a0f0b', 0) +
        C(rx + pw - 4, ry + rows[2] - 4, 1.2, '#1a0f0b', 0) +
        L('M' + (rx + 3) + ' ' + (ry + rows[2] * 0.55) + 'h' + (pw - 6), 0.6, '#000', 0.3);

  /* hinges on the wall side, lock-set on the free side */
  const hx = hl ? x - 3 : x + W - 3;
  const kx = hl ? x + W - 14 : x + 8;
  const hy = [y0 + 30, y0 + H * 0.5 - 8, FY - 52];
  for (let i = 0; i < 3; i++) {
    lf += R(hx, hy[i], 6, 16, '#b0894a', 0.8) + L('M' + (hx + 1.5) + ' ' + (hy[i] + 1) + 'v14', 0.6, '#f2d79a', 0.5);
  }
  lf += RX(kx, FY - 132, 7, 28, 2, '#8c6a35', 0.8) +
        C(kx + 3.5, FY - 121, 4.4, '#d9b26a', 0.9) +
        C(kx + 2.4, FY - 122.3, 1.3, '#fff2c9', 0).replace('/>', ' opacity=".7"/>') +
        C(kx + 3.5, FY - 142, 2, '#2a1a14', 0);

  s += '<g class="dleaf" style="transform-box:fill-box;transform-origin:' + (hl ? '0' : '100%') + ' 50%;--sk:' + (hl ? -3 : 3) + 'deg">' + lf + '</g>';

  /* trim in front of the leaf */
  s += L('M' + (x - T + 1) + ' ' + (y0 - 11) + 'H' + (x + W + T - 1), 1.1, frameHi, 0.7) +
       L('M' + (x - T + 1) + ' ' + (y0 - 10) + 'V' + (FY - 4), 1, frameHi, 0.35) +
       L('M' + (x - 0.5) + ' ' + y0 + 'V' + (FY - 3), 0.8, '#000', 0.5);
  s += R(x - T - 5, y0 - 26, W + 2 * T + 10, 10, frame, 1.4) +
       R(x - T - 9, y0 - 32, W + 2 * T + 18, 7, frame, 1.4) +
       L('M' + (x - T - 8) + ' ' + (y0 - 31) + 'H' + (x + W + T + 8), 1, frameHi, 0.6) +
       L('M' + (x - T - 4) + ' ' + (y0 - 25) + 'H' + (x + W + T + 4), 0.8, frameHi, 0.4);
  s += R(x - T - 2, FY - 5, W + 2 * T + 4, 7, '#231410', 1.2) +
       L('M' + (x - T - 1) + ' ' + (FY - 4) + 'H' + (x + W + T + 1), 0.8, frameHi, 0.3);

  /* brass chevron plate */
  s += RX(cx - 13, y0 - 47, 26, 12, 2, '#a98450', 1) +
       L(up ? 'M' + (cx - 5) + ' ' + (y0 - 39) + 'L' + cx + ' ' + (y0 - 45) + 'L' + (cx + 5) + ' ' + (y0 - 39)
            : 'M' + (cx - 5) + ' ' + (y0 - 45) + 'L' + cx + ' ' + (y0 - 39) + 'L' + (cx + 5) + ' ' + (y0 - 45),
         1.6, '#2a1a14');

  const hitBox = [x - T - 10, y0 - 50, W + 2 * T + 20, H + 54];
  return '<g class="obj doorobj nolift" data-key="' + key + '" data-label="' + esc(label) + '" data-verb="' + esc(verb) + '" data-cx="' + f(cx) + '" tabindex="0" role="button" aria-label="' + esc(label + '. ' + verb) + '">' +
    '<g class="lift">' + s + '</g>' +
    '<rect class="hit" x="' + f(hitBox[0]) + '" y="' + f(hitBox[1]) + '" width="' + f(hitBox[2]) + '" height="' + f(hitBox[3]) + '"/>' +
    '<rect class="ring" x="' + f(hitBox[0] - 4) + '" y="' + f(hitBox[1] - 4) + '" width="' + f(hitBox[2] + 8) + '" height="' + f(hitBox[3] + 8) + '" rx="6"/></g>';
}
