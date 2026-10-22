import { PORTFOLIO_DATA } from '../data/portfolioData';
import { tx, esc, isPh } from './svgHelpers';
import { SheetOptions } from '../components/overlays/SheetModal';

function head(k: string, t: string, lead?: string): string {
  return (k ? '<p class="k">' + esc(k) + '</p>' : '') + '<h2 id="shT">' + tx(t) + '</h2>' + (lead ? '<p class="lead">' + tx(lead) + '</p>' : '');
}

function ul(a: string[]): string {
  return '<ul>' + a.map((x) => '<li>' + tx(x) + '</li>').join('') + '</ul>';
}

export function getSheetLetter(): SheetOptions {
  const L2 = PORTFOLIO_DATA.LETTER;
  return {
    kind: 'letter',
    cover: '',
    html:
      head('', L2.title) +
      L2.paras.map((p) => '<p>' + tx(p) + '</p>').join('') +
      '<p class="lead" style="margin-top:18px">' + tx(L2.sign) + '</p>' +
      '<div class="links"><button type="button" class="btn" data-act="go2">Take me upstairs</button><button type="button" class="btn ghost" data-act="plain">View Résumé</button></div>'
  };
}

export function getSheetPlate(): SheetOptions {
  const S = PORTFOLIO_DATA.SITE;
  return {
    kind: 'plate',
    html:
      head('', S.name) +
      '<p class="lead">' + tx(S.degree) + '</p><p>' + tx(S.school) + '</p>' +
      '<p style="font-style:italic;margin-top:14px;color:#4a2e1d">' + esc(S.plaque[0]) + ' ' + esc(S.plaque[1]) + '</p>' +
      '<p>' + tx(S.intro) + '</p>'
  };
}

export function getSheetBoard(): SheetOptions {
  return {
    kind: 'note',
    html:
      head('The noticeboard', 'What’s pinned up') +
      PORTFOLIO_DATA.BOARD.map((b) => '<h3>' + tx(b.t) + '</h3><p>' + tx(b.d) + '</p>').join('')
  };
}

export function getSheetStudy(): SheetOptions {
  return {
    kind: 'drawer',
    html:
      head('The desk drawer', 'Study, as it stands') +
      PORTFOLIO_DATA.STUDY.map((b) => '<h3>' + tx(b.t) + '</h3><p>' + tx(b.d) + '</p>').join('')
  };
}

export function getSheetBackpack(): SheetOptions {
  return {
    kind: 'box',
    cover: 'BACKPACK',
    html:
      head('Inventory', 'What’s in the backpack') +
      '<div>' +
      PORTFOLIO_DATA.BACKPACK.map(
        (b) => '<div class="field"><b>' + esc(b.i) + '</b><span>' + tx(b.n) + '</span></div>'
      ).join('') +
      '</div>'
  };
}

export function getSheetNotebook(): SheetOptions {
  return {
    kind: 'notebook',
    html:
      head('Notebook', 'Things I’m working out') +
      PORTFOLIO_DATA.NOTEBOOK.map((n) => '<p>' + tx(n) + '</p>').join('')
  };
}

export function getSheetScreen(): SheetOptions {
  const S = PORTFOLIO_DATA.SITE;
  return {
    kind: 'screen',
    html:
      '<p class="k">terminal</p><h2 id="shT">$ whoami</h2><p>name: ' +
      tx(S.name) +
      '<br>studying: ' +
      tx(S.degree) +
      '<br>at: ' +
      tx(S.school) +
      '<br>building: Khelbi-Naki and other things<br>path: undecided</p><h3>$ cat about.txt</h3><p>' +
      tx(S.intro) +
      '</p><h3>$ ls floors/</h3><p>1 ground · 2 workshop · 3 bedroom · 4 under_construction/</p>'
  };
}

export function getSheetContact(): SheetOptions {
  const avail = PORTFOLIO_DATA.AVAILABILITY
    ? '<div style="margin-bottom:16px;padding:12px 14px;background:#efe4cf;border-left:3px solid #6f2639;color:#2a1a14"><b style="display:block;margin-bottom:4px">' +
      esc(PORTFOLIO_DATA.AVAILABILITY.t) +
      '</b><span style="font-size:13px;opacity:0.9">' +
      esc(PORTFOLIO_DATA.AVAILABILITY.n) +
      '</span></div>'
    : '';

  const list =
    '<div class="cl">' +
    PORTFOLIO_DATA.LINKS.map((l) => {
      return l.url
        ? '<a href="' + esc(l.url) + '" target="_blank" rel="noopener noreferrer"><b>' + esc(l.label) + '</b><i>' + esc(l.show || l.url) + '</i><em>' + esc(l.note || '') + ' ↗</em></a>'
        : '<span class="off"><b>' + esc(l.label) + '</b><i>' + tx(l.ph || '[Unverified placeholder]') + '</i><em>' + esc(l.note || '') + '</em></span>';
    }).join('') +
    '</div>';

  return {
    kind: 'note',
    html: head('Contact', "There's still work to do.") + avail + '<p class="lead">' + tx(PORTFOLIO_DATA.COLLAB) + '</p>' + list
  };
}

export function getSheetNote(k: string, t: string, text: string): SheetOptions {
  return {
    kind: 'note',
    html: head(k, t) + '<p>' + tx(text) + '</p>'
  };
}

export function getSheetSkill(id: string): SheetOptions | null {
  const sk = PORTFOLIO_DATA.SKILLS.find((q) => q.id === id);
  if (!sk) return null;

  const projs = sk.proj
    .map((pid) => {
      const p = PORTFOLIO_DATA.PROJECTS.find((q) => q.id === pid);
      return p ? '<button type="button" class="btn ghost" data-proj="' + pid + '">Open ' + esc(p.name) + '</button>' : '';
    })
    .join('');

  const statusBadge =
    sk.level === 'learning'
      ? '<span style="display:inline-block;padding:2px 8px;font-size:11px;font-family:var(--mono);color:var(--lamp);background:rgba(242,179,94,.12);border:1px solid rgba(242,179,94,.3);border-radius:3px;text-transform:uppercase;letter-spacing:.08em;margin-bottom:12px">Currently Learning</span>'
      : '<span style="display:inline-block;padding:2px 8px;font-size:11px;font-family:var(--mono);color:var(--bone);background:rgba(232,220,202,.08);border:1px solid rgba(232,220,202,.2);border-radius:3px;text-transform:uppercase;letter-spacing:.08em;margin-bottom:12px">Project Experience</span>';

  return {
    kind: 'drawer',
    html:
      head('Workshop Skill Plaque', sk.name) +
      statusBadge +
      '<h3>Practical Experience</h3><p>' + tx(sk.exp) + '</p>' +
      '<h3>Where It Appears</h3>' + ul(sk.ex) +
      (projs ? '<div class="links">' + projs + '</div>' : '')
  };
}

export function getSheetBug(id: string): SheetOptions | null {
  const b = PORTFOLIO_DATA.BUGS.find((q) => q.id === id);
  if (!b) return null;
  const blank = isPh(b.name);

  return {
    kind: 'report',
    stamp: blank ? 'Unfiled' : 'Resolved',
    html:
      head(b.tag + ' · bug report', b.name) +
      '<div class="field"><b>Where</b><span>' + tx(b.where) + '</span></div>' +
      '<div class="field"><b>Symptom</b><span>' + tx(b.sym) + '</span></div>' +
      '<div class="field"><b>Steps to reproduce</b><span>' + tx(b.steps) + '</span></div>' +
      '<div class="field"><b>Root cause</b><span>' + tx(b.cause) + '</span></div>' +
      '<div class="field"><b>Fix</b><span>' + tx(b.fix) + '</span></div>' +
      '<div class="field"><b>What it taught me</b><span>' + tx(b.lesson) + '</span></div>' +
      (blank
        ? '<p style="font-size:13px;color:#6b4a40;margin-top:14px">This is a blank form. No bug has been claimed here. Fill in a real story in <code>DATA.BUGS</code> and the jar will start telling it.</p>'
        : '')
  };
}

export function getSheetProject(id: string): SheetOptions | null {
  const p = PORTFOLIO_DATA.PROJECTS.find((q) => q.id === id);
  if (!p) return null;

  const stMap = {
    live: ['live', 'Finished · live'],
    wip: ['wip', 'In progress'],
    idea: ['idea', 'Idea · experiment']
  } as const;
  const st = stMap[p.status] || ['idea', 'Idea'];

  const shots = p.shots && p.shots.length
    ? p.shots.map((u) => '<div class="shot"><img src="' + esc(u) + '" alt="Screenshot of ' + esc(p.name) + '"></div>').join('')
    : '';

  const links = p.links && p.links.length
    ? p.links.map((l, i) => '<a class="btn' + (i ? ' ghost' : '') + '" href="' + esc(l.url) + '" target="_blank" rel="noopener noreferrer">' + esc(l.label) + ' <span aria-hidden="true">↗</span></a>').join('')
    : '';

  const html =
    head('Project inventory', p.name) +
    '<p><span class="status ' + st[0] + '">' + st[1] + '</span></p>' +
    '<p class="lead">' + tx(p.blurb) + '</p>' +
    shots +
    '<div class="cols"><div><h3>Role</h3><p>' + tx(p.role) + '</p><h3>Contribution & Highlights</h3>' + ul(p.contrib) + '</div>' +
    '<div><h3>Technologies</h3><ul class="chips">' + p.tech.map((t) => '<li>' + tx(t) + '</li>').join('') + '</ul></div></div>' +
    (links ? '<div class="links">' + links + '</div>' : '');

  const kind = p.type;
  const cover = kind === 'binder' || kind === 'box' ? p.name : kind === 'folder' ? '' : null;

  return {
    kind,
    cover,
    html
  };
}

export function getSheetBook(i: number): SheetOptions | null {
  const b = PORTFOLIO_DATA.BOOKS[i];
  if (!b) return null;
  return {
    kind: 'note',
    html: head('From the bookshelf', b.t) + '<p class="lead">' + tx(b.a) + '</p><p>' + tx(b.n) + '</p>'
  };
}

export function getSheetPoster(i: number): SheetOptions | null {
  const p = PORTFOLIO_DATA.POSTERS[i];
  if (!p) return null;
  return {
    kind: 'note',
    html: head('Behind the poster', p.front) + '<p>' + tx(p.back) + '</p>'
  };
}

export function getSheetBedDrawer(): SheetOptions {
  return {
    kind: 'drawer',
    html: head('Bedside drawer', 'Inside') + '<p>' + tx(PORTFOLIO_DATA.DRAWER.n) + '</p>'
  };
}

export function getSheetController(): SheetOptions {
  return {
    kind: 'note',
    html: head('Pick-up', PORTFOLIO_DATA.CONTROLLER.t) + '<p>' + tx(PORTFOLIO_DATA.CONTROLLER.n) + '</p>'
  };
}

export function getSheetUnderbed(): SheetOptions {
  return {
    kind: 'note',
    html: head('Under the bed', PORTFOLIO_DATA.UNDERBED.t) + '<p>' + tx(PORTFOLIO_DATA.UNDERBED.n) + '</p>'
  };
}

export function getSheetPin(i: number): SheetOptions | null {
  const pn = PORTFOLIO_DATA.PINS[i];
  if (!pn) return null;
  return {
    kind: 'note',
    html: head('Pinned note', pn.t) + '<p>' + tx(pn.n) + '</p>'
  };
}

export function getSheetBlueprint(): SheetOptions {
  return {
    kind: 'blueprint',
    html:
      head('Blueprint · revision unknown', 'What I’d like to build next') +
      PORTFOLIO_DATA.AMBITIONS.map(
        (a, i) => '<h3>' + String(i + 1).padStart(2, '0') + ' · ' + tx(a.t) + '</h3><p>' + tx(a.d) + '</p>'
      ).join('') +
      '<p style="margin-top:16px;font-size:14px;opacity:.85">Plans change. That is what the pencil is for.</p>' +
      '<div class="links"><button type="button" class="btn" data-act="contact">Build something together</button></div>'
  };
}

export function getSheetTools(): SheetOptions {
  return {
    kind: 'box',
    cover: 'TOOLBOX',
    html:
      head('The toolbox', 'On the bench right now') +
      PORTFOLIO_DATA.TOOLS.map(
        (t) => '<div class="field"><b>' + tx(t.t) + '</b><span>' + tx(t.d) + '</span></div>'
      ).join('')
  };
}
