import { esc, f } from './svgHelpers';

export interface ObjOpts {
  nolift?: boolean;
  cls?: string;
  cx?: number;
}

export function obj(
  key: string,
  label: string,
  verb: string,
  art: string,
  hit: [number, number, number, number],
  o: ObjOpts = {}
): string {
  const cx = o.cx != null ? o.cx : hit[0] + hit[2] / 2;
  return (
    '<g class="obj' + (o.cls ? ' ' + o.cls : '') + (o.nolift ? ' nolift' : '') +
    '" data-key="' + key +
    '" data-label="' + esc(label) +
    '" data-verb="' + esc(verb) +
    '" data-cx="' + f(cx) +
    '" tabindex="0" role="button" aria-label="' + esc(label + '. ' + verb) + '">' +
    '<g class="lift">' + art + '</g>' +
    '<rect class="hit" x="' + f(hit[0]) + '" y="' + f(hit[1]) + '" width="' + f(hit[2]) + '" height="' + f(hit[3]) + '"/>' +
    '<rect class="ring" x="' + f(hit[0] - 4) + '" y="' + f(hit[1] - 4) + '" width="' + f(hit[2] + 8) + '" height="' + f(hit[3] + 8) + '" rx="6"/></g>'
  );
}
