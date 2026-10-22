// Deterministic PRNG and drawing helpers from prototype
let seed = 21;
export function resetSeed(s = 21) {
  seed = s;
}

export function rnd(): number {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
}

export function rr(a: number, b: number): number {
  return a + rnd() * (b - a);
}

export function pick<T>(a: T[]): T {
  return a[Math.floor(rnd() * a.length)];
}

export function f(n: number): number {
  return Math.round(n * 10) / 10;
}

export function clamp(v: number, a: number, b: number): number {
  return Math.max(a, Math.min(b, v));
}

export function esc(s: string): string {
  return String(s).replace(/[&<>"]/g, function (c) {
    return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' } as Record<string, string>)[c] || c;
  });
}

export function tx(s: string): string {
  return esc(s).replace(/\[([^\]]+)\]/g, '<span class="ph" title="Placeholder. Replace this in DATA.">[$1]</span>');
}

export function plainTx(s: string): string {
  return esc(s).replace(/\[([^\]]+)\]/g, '<span class="ph">[$1]</span>');
}

export function isPh(s: string): boolean {
  return /\[[^\]]+\]/.test(s || '');
}

export const INK = '#0b090d';
export const BOOKC = ['#6f2639', '#4d1a2a', '#7fb3a6', '#3f6f64', '#8a6a3a', '#2d3a55', '#c9bba3', '#5a3a2e', '#a1a0a8', '#8a3b4a'];

export function R(x: number, y: number, w: number, h: number, fill: string, sw?: number, st?: string): string {
  return '<rect x="' + f(x) + '" y="' + f(y) + '" width="' + f(w) + '" height="' + f(h) + '" fill="' + fill + '"' + (sw ? ' stroke="' + (st || INK) + '" stroke-width="' + sw + '" stroke-linejoin="round"' : '') + '/>';
}

export function RX(x: number, y: number, w: number, h: number, rx: number, fill: string, sw?: number, st?: string): string {
  return '<rect x="' + f(x) + '" y="' + f(y) + '" width="' + f(w) + '" height="' + f(h) + '" rx="' + rx + '" fill="' + fill + '"' + (sw ? ' stroke="' + (st || INK) + '" stroke-width="' + sw + '" stroke-linejoin="round"' : '') + '/>';
}

export function P(pts: [number, number][], fill: string, sw?: number, st?: string): string {
  return '<path d="M' + pts.map(function (p) { return f(p[0]) + ' ' + f(p[1]); }).join('L') + 'Z" fill="' + fill + '"' + (sw ? ' stroke="' + (st || INK) + '" stroke-width="' + sw + '" stroke-linejoin="round"' : '') + '/>';
}

export function L(d: string, sw?: number, col?: string, op?: number | string, extra?: string): string {
  return '<path d="' + d + '" fill="none" stroke="' + (col || INK) + '" stroke-width="' + (sw || 1.2) + '" stroke-linecap="round" stroke-linejoin="round"' + (op ? ' opacity="' + op + '"' : '') + (extra ? ' ' + extra : '') + '/>';
}

export function C(x: number, y: number, r: number, fill: string, sw?: number, st?: string): string {
  return '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="' + f(r) + '" fill="' + fill + '"' + (sw ? ' stroke="' + (st || INK) + '" stroke-width="' + sw + '"' : '') + '/>';
}

export function E(x: number, y: number, rx: number, ry: number, fill: string, sw?: number): string {
  return '<ellipse cx="' + f(x) + '" cy="' + f(y) + '" rx="' + f(rx) + '" ry="' + f(ry) + '" fill="' + fill + '"' + (sw ? ' stroke="' + INK + '" stroke-width="' + sw + '"' : '') + '/>';
}

export function T(x: number, y: number, s: string, size: number, fill: string, cls?: string, extra?: string): string {
  return '<text x="' + x + '" y="' + y + '" font-size="' + size + '" fill="' + fill + '" class="' + (cls || 'eng') + '" ' + (extra || '') + '>' + s + '</text>';
}

export function TC(x: number, y: number, s: string, size: number, fill: string, cls?: string, extra?: string): string {
  return T(x, y, s, size, fill, cls, 'text-anchor="middle" ' + (extra || ''));
}

export function G(tr: string, inner: string, extra?: string): string {
  return '<g transform="' + tr + '"' + (extra ? ' ' + extra : '') + '>' + inner + '</g>';
}

export function TR(x: number, y: number, inner: string, extra?: string): string {
  return G('translate(' + f(x) + ' ' + f(y) + ')', inner, extra);
}

export function rot(a: number, cx: number, cy: number, inner: string): string {
  return G('rotate(' + f(a) + ' ' + f(cx) + ' ' + f(cy) + ')', inner);
}

export function arch(x: number, y: number, w: number, h: number): string {
  return 'M' + f(x) + ' ' + f(y + h) + 'V' + f(y + w / 2) + 'A' + f(w / 2) + ' ' + f(w / 2) + ' 0 0 1 ' + f(x + w) + ' ' + f(y + w / 2) + 'V' + f(y + h) + 'Z';
}

export function glow(x: number, y: number, r: number, id: string, op?: number | string): string {
  return '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="' + f(r) + '" fill="url(#' + id + ')"' + (op ? ' opacity="' + op + '"' : '') + ' pointer-events="none"/>';
}
