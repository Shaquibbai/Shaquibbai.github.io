import { R, P, L, f, rr } from './svgHelpers';

export function puffDust(g: SVGGraphicsElement): DOMRect | null {
  let bb: DOMRect;
  try {
    bb = g.getBBox();
  } catch {
    return null;
  }
  const holder = g.querySelector('.pdust');
  if (!holder) return bb;

  let s = '';
  for (let i = 0; i < 6; i++) {
    const x = bb.x + rr(0.15, 0.85) * bb.width;
    const y = bb.y + bb.height * rr(0.8, 1);
    s += '<circle class="dust" cx="' + f(x) + '" cy="' + f(y) + '" r="' + f(rr(1.4, 3.2)) +
         '" fill="#e2d6bf" style="--dx:' + f(rr(-16, 16)) + 'px;--dy:' + f(-rr(8, 22)) +
         'px;animation-delay:' + f(i * 0.04) + 's"/>';
  }
  holder.insertAdjacentHTML('beforeend', s);
  setTimeout(() => {
    holder.querySelectorAll('.dust').forEach((n) => n.remove());
  }, 1300);
  return bb;
}

export function wipeCover(g: SVGGraphicsElement, bb: DOMRect): void {
  const holder = g.querySelector('.pdust');
  if (!holder) return;

  const cx = bb.x + bb.width / 2;
  const cy = bb.y + bb.height * 0.45;
  const markup =
    '<g class="wp" transform="translate(' + f(cx) + ' ' + f(cy) + ')">' +
    '<g class="wipe"><g transform="scale(1.5)">' +
    P([[-16, -8], [16, -10], [20, 8], [-14, 10]], '#d8d0be', 1.2) +
    L('M-8 -4l10 2M-6 3l14 -1', 0.8, '#6b4a40', 0.5) +
    R(10, -40, 18, 36, '#4d1a2a', 1.4).replace('/>', ' transform="rotate(20 19 -22)"/>') +
    '</g></g></g>';

  holder.insertAdjacentHTML('beforeend', markup);
  setTimeout(() => {
    holder.querySelectorAll('.wp').forEach((n) => n.remove());
  }, 900);
}
