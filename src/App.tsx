import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SvgDefs } from './components/stage/SvgDefs';
import { HouseExterior } from './components/world/HouseExterior';
import { GroundFloor } from './components/floors/GroundFloor';
import { WorkshopFloor } from './components/floors/WorkshopFloor';
import { BedroomFloor } from './components/floors/BedroomFloor';
import { ConstructionFloor } from './components/floors/ConstructionFloor';
import { HeaderNav } from './components/chrome/HeaderNav';
import { FloorNav } from './components/chrome/FloorNav';
import { FrontOverlay } from './components/chrome/FrontOverlay';
import { CameraControls } from './components/chrome/CameraControls';
import { SheetModal, SheetOptions } from './components/overlays/SheetModal';
import { PlainViewModal } from './components/overlays/PlainViewModal';
import { TvModal } from './components/overlays/TvModal';
import { ThingsDrawer, ThingItem } from './components/overlays/ThingsDrawer';
import { Tooltip } from './components/overlays/Tooltip';
import { StatusHint } from './components/overlays/StatusHint';
import { useCamera } from './hooks/useCamera';
import { PORTFOLIO_DATA } from './data/portfolioData';
import {
  getSheetLetter,
  getSheetPlate,
  getSheetBoard,
  getSheetStudy,
  getSheetBackpack,
  getSheetNotebook,
  getSheetScreen,
  getSheetContact,
  getSheetProject,
  getSheetBlueprint,
  getSheetTools
} from './utils/sheetGenerators';
import { clamp, f, rr } from './utils/svgHelpers';
import { puffDust } from './utils/projectPullPhysics';
import { JAR_X, JAR_BASE } from './utils/workshopArt';

interface BugSim {
  el: SVGElement;
  k: string;
  cx: number;
  x: number;
  y: number;
  vx: number;
  t: number;
  jump: number;
  jt: number;
  hide: number;
}

export const App: React.FC = () => {
  const [mode, setMode] = useState<'outside' | 'floor'>('outside');
  const [floor, setFloor] = useState<number>(0);
  const [sheet, setSheet] = useState<SheetOptions | null>(null);
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const [sheetClosing, setSheetClosing] = useState<boolean>(false);
  const [plainOpen, setPlainOpen] = useState<boolean>(false);
  const [tvOpen, setTvOpen] = useState<boolean>(false);
  const [tvCh, setTvCh] = useState<number>(0);
  const [thingsOpen, setThingsOpen] = useState<boolean>(false);
  const [hint, setHint] = useState<string>('');
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    label: string;
    verb?: string;
  }>({ visible: false, x: 0, y: 0, label: '', verb: '' });

  const [, setInSceneState] = useState({
    frontDoorOpen: false,
    keyRevealed: false,
    calIndex: 0,
    monOn: false,
    cupCount: 0,
    curtClosed: false,
    lampOn: true,
    wlOn: false
  });

  const {
    dims,
    outsideViewBox,
    camX,
    panTo,
    centreOn,
    setDirectCamX,
    getFloorViewBox
  } = useCamera();

  const isReducedMotion = useRef(
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
  );

  const stageRef = useRef<HTMLDivElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const hintTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const actLockRef = useRef<number>(0);
  const doorBusyRef = useRef<boolean>(false);
  const crowTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasEnteredFloor4Ref = useRef<boolean>(false);
  const bugsRef = useRef<BugSim[]>([]);
  const dragRef = useRef<{
    active: boolean;
    startX: number;
    startCam: number;
    moved: boolean;
  }>({ active: false, startX: 0, startCam: 0, moved: false });

  // Ephemeral status hint
  const say = useCallback((message: string, duration = 3200) => {
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    setHint(message);
    if (message) {
      hintTimerRef.current = setTimeout(() => {
        setHint('');
      }, duration);
    }
  }, []);

  // Sync body dataset
  useEffect(() => {
    document.body.setAttribute('data-mode', mode);
    document.body.setAttribute('data-floor', String(floor));
  }, [mode, floor]);

  // Timers cleanup
  useEffect(() => {
    return () => {
      if (crowTimerRef.current) clearTimeout(crowTimerRef.current);
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    };
  }, []);

  // Browser tab title enforcement: strictly 'shaquibbai' across all views
  useEffect(() => {
    document.title = 'shaquibbai';
  }, []);

  // Hash routing support for direct résumé navigation (#resume / #plain)
  useEffect(() => {
    const handleHash = () => {
      const h = window.location.hash;
      if (h === '#resume' || h === '#plain') {
        setPlainOpen(true);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleClosePlain = useCallback(() => {
    setPlainOpen(false);
    if (window.location.hash === '#resume' || window.location.hash === '#plain') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  // Handle floor change
  const goFloor = useCallback((n: number, how?: 'up' | 'down') => {
    if (n === 0) {
      setMode('outside');
      setFloor(0);
      setThingsOpen(false);
      say('');
      document.title = 'shaquibbai';
      return;
    }

    setMode('floor');
    setFloor(n);
    setThingsOpen(false);
    say('');

    // Cancel in-flight timers
    if (crowTimerRef.current) clearTimeout(crowTimerRef.current);
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    actLockRef.current = 0;

    // Reset animated scene objects so none stay stuck when changing floors
    const bdSlide = document.querySelector<SVGElement>('#bdSlide');
    if (bdSlide) bdSlide.style.transform = '';
    const drawerSlide = document.querySelector<SVGElement>('#drawerSlide');
    if (drawerSlide) drawerSlide.style.transform = '';
    const ctl = document.querySelector<SVGElement>('#ctl');
    if (ctl) ctl.style.transform = '';
    const cdoor = document.querySelector<SVGElement>('#sc1 .cdoor');
    if (cdoor) cdoor.style.transform = '';
    const cin = document.querySelector<SVGElement>('#sc1 .cin');
    if (cin) cin.style.opacity = '0';
    const flap = document.querySelector<SVGElement>('#sc1 .flap');
    if (flap) flap.style.transform = '';
    const bpOpen = document.querySelector<SVGElement>('#sc1 .bpOpen');
    if (bpOpen) bpOpen.style.opacity = '0';

    const d = dims;
    const base = how === 'down' ? d.max : 0;
    const offset = Math.min(70, d.max * 0.5);
    const startX = how === 'down' ? base - offset : how === 'up' ? base + offset : base;

    setDirectCamX(n, startX);
    if (offset > 6 && how) {
      panTo(n, base, 750, isReducedMotion.current);
    }

    document.title = 'shaquibbai';

    // Floor 4 Entrance atmospheric moment (runs once on first visit)
    if (n === 4 && !hasEnteredFloor4Ref.current) {
      hasEnteredFloor4Ref.current = true;
      if (!isReducedMotion.current) {
        setTimeout(() => {
          const wl = document.querySelector<SVGElement>('#wlOn');
          const motesEl = document.querySelector<SVGElement>('#wlMotes');
          if (wl) {
            wl.style.transition = 'opacity .18s ease-out';
            wl.style.opacity = '0.85';
            setTimeout(() => {
              wl.style.opacity = '0.2';
              setTimeout(() => {
                wl.style.opacity = '1';
                if (motesEl) motesEl.style.opacity = '0.6';
              }, 120);
            }, 80);
          }
          say('Mind the mess. We’re getting there.', 3400);
        }, 550);
      } else {
        say('Mind the mess. We’re getting there.', 3400);
      }
    }
  }, [dims, panTo, say, setDirectCamX]);

  // Hinged door navigation
  const takeDoor = useCallback((dir: 'up' | 'down') => {
    const to = dir === 'up' ? floor + 1 : floor - 1;
    if (to < 1 || to > 4 || doorBusyRef.current) return;

    const doorSelector = `#sc${floor} .doorobj[data-key="${dir === 'up' ? 'doorU' : 'doorD'}"]`;
    const el = document.querySelector<HTMLElement>(doorSelector);

    if (isReducedMotion.current || !el) {
      goFloor(to, dir);
      return;
    }

    doorBusyRef.current = true;
    el.classList.add('open');

    setTimeout(() => {
      doorBusyRef.current = false;
      goFloor(to, dir);
    }, 330);

    setTimeout(() => {
      el.classList.remove('open');
    }, 1200);
  }, [floor, goFloor]);

  // Knock on front door
  const knock = useCallback((to = 1) => {
    if (doorBusyRef.current) return;
    doorBusyRef.current = true;

    const doorLeaf = document.querySelector<SVGElement>('#doorLeaf');
    if (!isReducedMotion.current && doorLeaf && to === 1) {
      doorLeaf.style.transition = 'transform .6s var(--ease)';
      doorLeaf.style.transformBox = 'fill-box';
      doorLeaf.style.transformOrigin = '0 50%';
      doorLeaf.style.transform = 'scaleX(.12)';

      setTimeout(() => {
        goFloor(to);
        setTimeout(() => {
          doorLeaf.style.transform = '';
          doorBusyRef.current = false;
        }, 900);
      }, 560);
    } else {
      goFloor(to);
      doorBusyRef.current = false;
    }
  }, [goFloor]);

  // Modals management
  const openSheet = useCallback((options: SheetOptions) => {
    lastFocusRef.current = document.activeElement as HTMLElement | null;
    setSheet(options);
    setSheetOpen(true);
    setSheetClosing(false);
  }, []);

  const closeSheet = useCallback(() => {
    if (!sheetOpen) return;
    setSheetClosing(true);
    const ms = isReducedMotion.current ? 0 : 280;
    setTimeout(() => {
      setSheetOpen(false);
      setSheetClosing(false);
      actLockRef.current = 0;
      if (sheet?.onClose) sheet.onClose();
      setSheet(null);
      if (lastFocusRef.current && document.contains(lastFocusRef.current)) {
        try {
          lastFocusRef.current.focus({ preventScroll: true });
        } catch {
          // Ignore
        }
      }
    }, ms);
  }, [sheet, sheetOpen]);

  // TV Modal open/close
  const openTV = useCallback(() => {
    lastFocusRef.current = document.activeElement as HTMLElement | null;
    setTvOpen(true);
    if (stageRef.current) stageRef.current.setAttribute('aria-hidden', 'true');
  }, []);

  const closeTV = useCallback(() => {
    setTvOpen(false);
    if (stageRef.current) stageRef.current.removeAttribute('aria-hidden');
    if (lastFocusRef.current && document.contains(lastFocusRef.current)) {
      try {
        lastFocusRef.current.focus({ preventScroll: true });
      } catch {
        // Ignore
      }
    }
  }, []);

  const handleTvChannelChange = useCallback((ch: number) => {
    setTvCh(ch);
    const scrText = document.querySelector<SVGTextElement>('#tvScr text');
    if (scrText) {
      scrText.textContent = `CH ${ch + 1}`;
    }
  }, []);

  // Project file extraction physics sequence (Floor 2)
  const pullProject = useCallback((id: string) => {
    actLockRef.current = performance.now() + 650;
    const g = document.querySelector<SVGGraphicsElement>(`#pi-${id}`);
    const sheetProj = getSheetProject(id);
    if (!sheetProj) return;

    if (!g || isReducedMotion.current) {
      openSheet(sheetProj);
      return;
    }

    const p = PORTFOLIO_DATA.PROJECTS.find((q) => q.id === id);
    const pType = p ? p.type : 'folder';

    const tugMap: Record<string, string> = {
      binder: 'translateY(-1px) scale(1.025)',
      folder: 'translateY(-2px) scale(1.02)',
      box: 'translateY(1px) scale(1.03)',
      blueprint: 'translateY(-2px) scale(1.025)',
      floppy: 'translateX(-3px) scale(1.03)',
      drawer: 'translateY(2px) scaleY(1.03)'
    };
    const pullMap: Record<string, string> = {
      binder: 'translateY(-8px) scale(1.2)',
      folder: 'translateY(-8px) scale(1.18)',
      box: 'translateY(3px) scale(1.2)',
      blueprint: 'translateY(-10px) scale(1.22)',
      floppy: 'translate(-8px,-6px) scale(1.25)',
      drawer: 'translateY(9px) scaleY(1.14)'
    };

    const tug = tugMap[pType] || 'scale(1.02)';
    const pull = pullMap[pType] || 'scale(1.15)';

    let bb: DOMRect | SVGRect | null = null;
    try {
      bb = g.getBBox();
    } catch {
      bb = null;
    }

    const dustHolder = g.querySelector('.pdust');
    let shadowEl: SVGElement | null = null;
    if (bb && dustHolder) {
      dustHolder.insertAdjacentHTML(
        'afterbegin',
        `<ellipse class="psh" cx="${f(bb.x + bb.width / 2)}" cy="${f(bb.y + bb.height)}" rx="${f(bb.width * 0.62)}" ry="5" fill="#000" opacity="0" style="transition:opacity .5s"/>`
      );
      shadowEl = dustHolder.querySelector('.psh');
    }

    g.style.transition = 'transform .12s ease-out';
    g.style.transform = tug;

    setTimeout(() => {
      g.style.transition = 'transform .45s cubic-bezier(.22, 1, .36, 1)';
      g.style.transform = pull;
      if (shadowEl) shadowEl.style.opacity = '0.35';
    }, 120);

    setTimeout(() => {
      puffDust(g);
    }, 240);

    setTimeout(() => {
      sheetProj.onClose = () => {
        g.style.transition = 'transform .45s cubic-bezier(.22, 1, .36, 1)';
        g.style.transform = '';
        if (shadowEl) {
          shadowEl.style.opacity = '0';
          setTimeout(() => shadowEl?.remove(), 500);
        }
      };
      openSheet(sheetProj);
    }, 550);
  }, [openSheet]);

  // Jar poke interaction (Floor 2) - purely visual discovery
  const jarPoke = useCallback((id: string) => {
    actLockRef.current = performance.now() + 450;
    const j = document.querySelector<HTMLElement>(`#sc2 [data-key="jar:${id}"]`);
    const bugEl = j?.querySelector<SVGElement>('.bug');

    if (j && !isReducedMotion.current) {
      j.classList.remove('jig');
      void j.getBoundingClientRect();
      j.classList.add('jig');
      j.style.transformBox = 'fill-box';
      j.style.transformOrigin = '50% 100%';
    }

    if (bugEl && bugsRef.current) {
      const b = bugsRef.current.find((q) => q.el === bugEl);
      if (b) {
        b.jump = 1.2;
        b.jt = 0;
      }
    }

    say('A gentle tap against the glass.', 1800);
  }, [say]);

  // Book extraction animation (Floor 3) - unobtrusive inline note
  const pullBook = useCallback((i: number) => {
    const now = performance.now();
    actLockRef.current = now + 500;
    const g = document.querySelector<SVGGraphicsElement>(`#bk${i}`);
    const b = PORTFOLIO_DATA.BOOKS[i];
    if (!b) return;

    if (g && !isReducedMotion.current) {
      g.style.transition = 'transform .35s cubic-bezier(.22, 1, .36, 1)';
      g.style.transformBox = 'fill-box';
      g.style.transformOrigin = '50% 100%';
      g.style.transform = 'translateY(-8px) rotate(-3.5deg)';

      setTimeout(() => {
        g.style.transform = '';
      }, 4000);
    }

    say(`${b.t} (${b.a}) — ${b.n}`, 4400);
  }, [say]);

  // Bedside drawer animation (Floor 3) - unobtrusive inline note
  const bedDrawer = useCallback(() => {
    actLockRef.current = performance.now() + 450;
    const d = document.querySelector<SVGElement>('#bdSlide');
    if (d && !isReducedMotion.current) {
      d.style.transition = 'transform .35s cubic-bezier(.22, 1, .36, 1)';
      d.style.transform = 'translateY(8px) scale(1.02)';
      setTimeout(() => {
        d.style.transform = '';
      }, 4000);
    }
    say(`Inside: ${PORTFOLIO_DATA.DRAWER.n}`, 4200);
  }, [say]);

  // Controller pickup animation (Floor 3) - unobtrusive inline note
  const ctlPick = useCallback(() => {
    const c = document.querySelector<SVGElement>('#ctl');
    if (c && !isReducedMotion.current) {
      c.style.transition = 'transform .32s cubic-bezier(.22, 1, .36, 1)';
      c.style.transform = 'translateY(-12px) rotate(-5deg)';
      setTimeout(() => {
        c.style.transform = '';
      }, 3800);
    }
    say(`${PORTFOLIO_DATA.CONTROLLER.t} — ${PORTFOLIO_DATA.CONTROLLER.n}`, 4200);
  }, [say]);

  // Curtains toggle (Floor 3)
  const curtainToggle = useCallback(() => {
    setInSceneState((prev) => {
      const next = !prev.curtClosed;
      const curL = document.querySelector<SVGElement>('#curL');
      const curR = document.querySelector<SVGElement>('#curR');
      if (curL) curL.style.transform = next ? 'scaleX(1)' : 'scaleX(.34)';
      if (curR) curR.style.transform = next ? 'scaleX(1)' : 'scaleX(.34)';

      if (next) {
        say('Curtains closed. The moon can wait.', 2400);
      } else {
        say(PORTFOLIO_DATA.WINDOW.n, 3600);
      }
      return { ...prev, curtClosed: next };
    });
  }, [say]);

  // Bedside Lamp — Signature Lumos / Nox magical interaction (Floor 3)
  const lampToggle = useCallback(() => {
    setInSceneState((prev) => {
      const next = !prev.lampOn;
      const dk3 = document.querySelector<SVGElement>('#dk3');
      const lampGlow = document.querySelector<SVGElement>('#lampGlow');
      const tvGlow = document.querySelector<SVGElement>('#tvGlow');

      if (dk3) {
        dk3.style.transition = 'opacity .45s var(--ease)';
        dk3.style.opacity = next ? '0' : '0.55';
      }
      if (lampGlow) {
        lampGlow.style.transition = 'opacity .45s var(--ease)';
        lampGlow.style.opacity = next ? '1' : '0';
      }
      if (tvGlow) {
        tvGlow.style.transition = 'opacity .45s var(--ease)';
        tvGlow.style.opacity = next ? '1' : '1.5';
      }

      say(next ? 'Lumos' : 'Nox', 2000);
      return { ...prev, lampOn: next };
    });
  }, [say]);

  // Alarm clock snooze (Floor 3)
  const alarmSnooze = useCallback(() => {
    const e = document.querySelector<HTMLElement>('#sc3 .alarmobj');
    if (e && !isReducedMotion.current) {
      e.classList.remove('jig');
      void e.getBoundingClientRect();
      e.classList.add('jig');
      e.style.transformBox = 'fill-box';
      e.style.transformOrigin = '50% 100%';
    }
    say('Snoozed. Nine more minutes of whatever this is.', 2600);
  }, [say]);

  // Under the bed interaction (Floor 3) - unobtrusive inline note
  const underbed = useCallback(() => {
    say(`Under the bed: ${PORTFOLIO_DATA.UNDERBED.n}`, 4200);
  }, [say]);

  // Toolbox open animation & modal (Floor 4)
  const toolboxOpen = useCallback(() => {
    actLockRef.current = performance.now() + 560;
    const lid = document.querySelector<SVGElement>('#tbLid');
    const tr = document.querySelector<SVGElement>('#tbTray');
    if (lid) lid.style.transform = 'translateY(-9px) scaleY(.28)';
    if (tr) tr.style.opacity = '1';

    setTimeout(() => {
      const sheetObj = getSheetTools();
      sheetObj.onClose = () => {
        if (lid) lid.style.transform = '';
        if (tr) tr.style.opacity = '0';
      };
      openSheet(sheetObj);
    }, 420);
  }, [openSheet]);

  // Work light toggle & scene-wide lighting transformation (Floor 4)
  const workLight = useCallback(() => {
    setInSceneState((prev) => {
      const next = !prev.wlOn;
      const wlOn = document.querySelector<SVGElement>('#wlOn');
      const dk4 = document.querySelector<SVGElement>('#dk4');
      const chalk = document.querySelector<SVGElement>('#chalk');
      const wlMotes = document.querySelector<SVGElement>('#wlMotes');

      if (wlOn) wlOn.style.opacity = next ? '1' : '0';
      if (dk4) dk4.style.opacity = next ? '0' : '0.46';
      if (chalk) chalk.style.opacity = next ? '1' : '0';
      if (wlMotes) wlMotes.style.opacity = next ? '1' : '0';

      if (wlOn && next && !isReducedMotion.current) {
        wlOn.classList.remove('flick1');
        void wlOn.getBoundingClientRect();
        wlOn.classList.add('flick1');
        setTimeout(() => {
          wlOn.classList.remove('flick1');
        }, 950);
      }

      say(
        next
          ? 'Light on. Someone has been writing on the floor.'
          : 'Light off. Dramatic, but less practical.',
        3000
      );
      return { ...prev, wlOn: next };
    });
  }, [say]);

  // Crow interaction & flyaway animation (Floor 4)
  const crowShoo = useCallback(() => {
    const c = document.querySelector<HTMLElement>('#crow');
    if (!c || c.dataset.gone) return;
    c.dataset.gone = '1';
    c.style.transform = 'translate(260px, -120px) rotate(-18deg)';
    c.style.opacity = '0';
    c.style.transition = 'transform 1.1s ease-in, opacity 1.1s';
    say('It was here first. It will be back.', 2800);

    if (crowTimerRef.current) clearTimeout(crowTimerRef.current);
    crowTimerRef.current = setTimeout(() => {
      c.style.transition = 'none';
      c.style.transform = 'translate(-300px, -60px)';
      void c.getBoundingClientRect();
      c.style.transition = 'transform 1.4s var(--ease), opacity 1s';
      c.style.transform = '';
      c.style.opacity = '1';
      delete c.dataset.gone;
    }, 9000);
  }, [say]);

  // Interactive object actions
  const activateObject = useCallback((key: string, _element?: Element) => {
    const now = performance.now();
    if (now < actLockRef.current) return;
    actLockRef.current = now + 140;

    // Workshop items - small visual reactions, no bulky rating modals
    if (key.startsWith('skill:')) {
      const id = key.slice(6);
      const sk = PORTFOLIO_DATA.SKILLS.find((q) => q.id === id);
      if (sk) {
        const el = document.querySelector<SVGElement>(`#sc2 #sk-${id}`);
        if (el && !isReducedMotion.current) {
          el.style.transition = 'transform .22s cubic-bezier(.22, 1, .36, 1)';
          el.style.transformBox = 'fill-box';
          el.style.transformOrigin = '50% 50%';
          el.style.transform = 'scale(1.7) translateY(-3px)';
          setTimeout(() => {
            el.style.transform = '';
          }, 360);
        }
        say(`${sk.name} — ${sk.exp}`, 3400);
      }
      return;
    }

    if (key.startsWith('jar:')) {
      const id = key.slice(4);
      jarPoke(id);
      return;
    }

    if (key.startsWith('proj:')) {
      const id = key.slice(5);
      pullProject(id);
      return;
    }

    // Bedroom items
    if (key.startsWith('book:')) {
      const i = parseInt(key.slice(5), 10);
      pullBook(i);
      return;
    }

    if (key.startsWith('poster:')) {
      const i = parseInt(key.slice(7), 10);
      const p = PORTFOLIO_DATA.POSTERS[i];
      if (p) {
        const pEl = document.querySelector<SVGElement>(`#sc3 [data-key="poster:${i}"] .pstr`);
        if (pEl && !isReducedMotion.current) {
          pEl.style.transition = 'transform .35s ease';
          pEl.style.transform = 'rotate(-3deg) translateY(-4px)';
          setTimeout(() => {
            pEl.style.transform = '';
          }, 3800);
        }
        say(`${p.front} — ${p.back}`, 4000);
      }
      return;
    }

    if (key.startsWith('pin:')) {
      const i = parseInt(key.slice(4), 10);
      const pn = PORTFOLIO_DATA.PINS[i];
      if (pn) {
        say(`${pn.t} — ${pn.n}`, 3800);
      }
      return;
    }

    if (key.startsWith('link:')) {
      const id = key.slice(5);
      if (id === 'resume') {
        setPlainOpen(true);
        return;
      }
      const l = PORTFOLIO_DATA.LINKS.find((q) => q.id === id);
      if (l && l.url) {
        if (l.url.startsWith('mailto:')) {
          window.location.href = l.url;
        } else {
          window.open(l.url, '_blank', 'noopener');
        }
        return;
      }
      say(`${l?.label || 'Link'} isn’t filled in yet. Edit DATA.LINKS and it becomes a real link.`, 3600);
      return;
    }

    switch (key) {
      case 'door': {
        setInSceneState((prev) => {
          const next = !prev.frontDoorOpen;
          const leaf = document.querySelector<SVGElement>('#sc1 .leaf');
          const spill = document.querySelector<SVGElement>('#sc1 .spill');
          if (leaf) {
            leaf.style.transformBox = 'fill-box';
            leaf.style.transformOrigin = '0 50%';
            leaf.style.transition = 'transform .7s var(--ease)';
            leaf.style.transform = next ? 'scaleX(.16) skewY(-3deg)' : '';
          }
          if (spill) spill.style.opacity = next ? '1' : '0';
          say(
            next
              ? 'A cool breeze, and a view of the hill. Closing it is also allowed.'
              : 'Closed. It does that.',
            2600
          );
          return { ...prev, frontDoorOpen: next };
        });
        break;
      }
      case 'mat': {
        setInSceneState((prev) => {
          const next = !prev.keyRevealed;
          const keyEl = document.querySelector<SVGElement>('#sc1 .key');
          if (keyEl) keyEl.style.opacity = next ? '1' : '0';
          say(
            next
              ? 'Under the mat: a spare key. The oldest trick, openly admitted.'
              : 'Put it back. Nobody saw.',
            2800
          );
          return { ...prev, keyRevealed: next };
        });
        break;
      }
      case 'letter': {
        openSheet(getSheetLetter());
        break;
      }
      case 'plate': {
        openSheet(getSheetPlate());
        break;
      }
      case 'board': {
        openSheet(getSheetBoard());
        break;
      }
      case 'cal': {
        setInSceneState((prev) => {
          const c = PORTFOLIO_DATA.CAL;
          const next = (prev.calIndex + 1) % c.length;
          const m = document.querySelector('#calM');
          const n = document.querySelector('#calN');
          if (m) m.textContent = c[next].m.toUpperCase();
          if (n) {
            const raw = c[next].n;
            n.textContent = raw.length > 16 ? raw.slice(0, 15) + '…' : raw;
          }
          const art = document.querySelector<SVGElement>('#calArt');
          if (art) {
            art.style.transition = 'transform .25s';
            art.style.transformBox = 'fill-box';
            art.style.transformOrigin = '50% 0';
            art.style.transform = 'rotateX(60deg)';
            setTimeout(() => {
              art.style.transform = '';
            }, 180);
          }
          say(`${c[next].m}: ${c[next].n}`, 3400);
          return { ...prev, calIndex: next };
        });
        break;
      }
      case 'monitor': {
        setInSceneState((prev) => {
          const next = !prev.monOn;
          const onEl = document.querySelector<SVGElement>('#monOn');
          const offEl = document.querySelector<SVGElement>('#monOff');
          if (onEl) onEl.style.opacity = next ? '1' : '0';
          if (offEl) offEl.style.opacity = next ? '0' : '1';
          if (next) {
            setTimeout(() => {
              openSheet(getSheetScreen());
            }, 420);
          }
          return { ...prev, monOn: next };
        });
        break;
      }
      case 'notes': {
        openSheet(getSheetNotebook());
        break;
      }
      case 'drawer': {
        const slide = document.querySelector<SVGElement>('#drawerSlide');
        if (slide) slide.style.transform = 'translateY(9px) scale(1.025)';
        setTimeout(() => {
          const sheetObj = getSheetStudy();
          sheetObj.onClose = () => {
            if (slide) slide.style.transform = '';
          };
          openSheet(sheetObj);
        }, 300);
        break;
      }
      case 'pack': {
        const flap = document.querySelector<SVGElement>('#sc1 .flap');
        const bo = document.querySelector<SVGElement>('#sc1 .bpOpen');
        if (flap) flap.style.transform = 'translateY(-5px) scaleY(.42)';
        if (bo) bo.style.opacity = '1';
        setTimeout(() => {
          const sheetObj = getSheetBackpack();
          sheetObj.onClose = () => {
            if (flap) flap.style.transform = '';
            if (bo) bo.style.opacity = '0';
          };
          openSheet(sheetObj);
        }, 350);
        break;
      }
      case 'mousehole':
      case 'cupboard': {
        const d = document.querySelector<SVGElement>('#sc1 .cdoor');
        const ci = document.querySelector<SVGElement>('#sc1 .cin');
        if (d && !isReducedMotion.current) {
          d.style.transition = 'transform .35s ease';
          d.style.transform = 'scaleX(.14) skewY(-5deg)';
          if (ci) ci.style.opacity = '1';
          setTimeout(() => {
            d.style.transform = '';
            if (ci) ci.style.opacity = '0';
          }, 3800);
        }
        say('Someone smaller is building something here, too.', 3800);
        break;
      }
      case 'missing': {
        say('A tool-shaped gap. Somebody borrowed it. Probably me.', 3000);
        break;
      }
      case 'window': {
        curtainToggle();
        break;
      }
      case 'lamp': {
        lampToggle();
        break;
      }
      case 'alarm': {
        alarmSnooze();
        break;
      }
      case 'bdrawer': {
        bedDrawer();
        break;
      }
      case 'strawhat': {
        say('A straw hat. The greatest journey starts with a small dinghy and an absurd dream.', 3800);
        break;
      }
      case 'sword': {
        say('A miniature sword. Kept for courage, craftsmanship, and dramatic effect.', 3600);
        break;
      }
      case 'phone': {
        say(PORTFOLIO_DATA.PHONE?.n || 'Just five more minutes. The feed is infinite.', 4200);
        break;
      }
      case 'controller': {
        ctlPick();
        break;
      }
      case 'underbed': {
        underbed();
        break;
      }
      case 'tv': {
        openTV();
        break;
      }
      case 'blueprint': {
        openSheet(getSheetBlueprint());
        break;
      }
      case 'toolbox': {
        toolboxOpen();
        break;
      }
      case 'worklight': {
        workLight();
        break;
      }
      case 'crow': {
        crowShoo();
        break;
      }
      case 'doorway': {
        say(PORTFOLIO_DATA.DOORWAY.d, 4200);
        break;
      }
      case 'doorU': {
        takeDoor('up');
        break;
      }
      case 'doorD': {
        takeDoor('down');
        break;
      }
      default: {
        break;
      }
    }
  }, [
    alarmSnooze,
    bedDrawer,
    crowShoo,
    ctlPick,
    curtainToggle,
    floor,
    jarPoke,
    lampToggle,
    openSheet,
    openTV,
    pullBook,
    pullProject,
    say,
    takeDoor,
    toolboxOpen,
    underbed,
    workLight
  ]);

  // Sheet action button handler (e.g. data-act="go2")
  const handleSheetAction = useCallback((act: string) => {
    closeSheet();
    setTimeout(() => {
      if (act === 'go2') {
        goFloor(2);
      } else if (act === 'plain') {
        setPlainOpen(true);
      } else if (act === 'contact') {
        openSheet(getSheetContact());
      }
    }, isReducedMotion.current ? 0 : 300);
  }, [closeSheet, goFloor, openSheet]);

  // Stage click and pointer handling
  const handleStagePointerOver = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === 'touch' || dragRef.current.moved) return;
    const target = e.target as HTMLElement;
    const el = target.closest<HTMLElement>('.obj, .spot, .fband');
    if (!el) {
      setTooltip((prev) => (prev.visible ? { ...prev, visible: false } : prev));
      return;
    }
    const label = el.dataset.label;
    if (!label) return;
    const verb = el.dataset.verb;
    const rect = el.getBoundingClientRect();
    const xPos = clamp(rect.left + rect.width / 2, 90, window.innerWidth - 90);
    const yPos = Math.max(54, rect.top);
    setTooltip({ visible: true, x: xPos, y: yPos, label, verb });
  }, []);

  const handleStagePointerOut = useCallback((e: React.PointerEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('.obj, .spot, .fband')) {
      setTooltip((prev) => ({ ...prev, visible: false }));
    }
  }, []);

  const handleStageClick = useCallback((e: React.MouseEvent) => {
    if (dragRef.current.moved) {
      dragRef.current.moved = false;
      return;
    }
    setTooltip((prev) => ({ ...prev, visible: false }));

    const target = e.target as HTMLElement;
    const el = target.closest<HTMLElement>('.obj, .spot, .fband');
    if (!el) return;

    if (el.classList.contains('fband')) {
      const go = Number(el.dataset.go);
      knock(go === 1 ? 1 : go);
      return;
    }

    if (el.classList.contains('spot')) {
      knock(1);
      return;
    }

    const key = el.dataset.key;
    if (key) {
      activateObject(key, el);
    }
  }, [activateObject, knock]);

  // Dragging to pan
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (mode !== 'floor' || e.button > 0) return;
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startCam: camX[floor] || 0,
      moved: false
    };
  }, [camX, floor, mode]);

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.startX;
    if (!dragRef.current.moved && Math.abs(dx) > 7) {
      dragRef.current.moved = true;
      setTooltip((prev) => ({ ...prev, visible: false }));
      const activeScene = document.querySelector(`#sc${floor}`);
      if (activeScene) activeScene.classList.add('drag');
    }
    if (dragRef.current.moved) {
      const d = dims;
      const target = dragRef.current.startCam - dx * (d.w / window.innerWidth);
      setDirectCamX(floor, target);
    }
  }, [dims, floor, setDirectCamX]);

  const handlePointerUp = useCallback(() => {
    if (dragRef.current.active) {
      const activeScene = document.querySelector(`#sc${floor}`);
      if (activeScene) activeScene.classList.remove('drag');
      if (dragRef.current.moved) {
        setTimeout(() => {
          dragRef.current.moved = false;
        }, 60);
      }
      dragRef.current.active = false;
    }
  }, [floor]);

  useEffect(() => {
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  // Wheel to pan
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (mode !== 'floor' || sheetOpen || plainOpen || tvOpen) return;
    e.preventDefault();
    const k = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    const target = (camX[floor] || 0) + k * (dims.w / window.innerWidth) * 0.9;
    setDirectCamX(floor, target);
  }, [camX, dims.w, floor, mode, plainOpen, setDirectCamX, sheetOpen, tvOpen]);

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (tvOpen) {
          closeTV();
          return;
        }
        if (sheetOpen) {
          closeSheet();
          return;
        }
        if (plainOpen) {
          setPlainOpen(false);
          return;
        }
        if (thingsOpen) {
          setThingsOpen(false);
          return;
        }
        return;
      }

      if (sheetOpen || plainOpen || tvOpen) return;

      const target = e.target as HTMLElement;
      if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA') return;

      if (mode === 'floor') {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          panTo(floor, (camX[floor] || 0) - dims.w * 0.55, 360, isReducedMotion.current);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          panTo(floor, (camX[floor] || 0) + dims.w * 0.55, 360, isReducedMotion.current);
        } else if (e.key === 't' || e.key === 'T') {
          setThingsOpen((prev) => !prev);
        } else if (e.key === 'ArrowUp' && floor < 4 && !target.closest('#things')) {
          takeDoor('up');
        } else if (e.key === 'ArrowDown' && floor > 1 && !target.closest('#things')) {
          takeDoor('down');
        }
      } else if (e.key === 'Enter' && document.activeElement === document.body) {
        knock(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    camX,
    closeSheet,
    closeTV,
    dims.w,
    floor,
    knock,
    mode,
    panTo,
    plainOpen,
    say,
    sheetOpen,
    takeDoor,
    thingsOpen,
    tvOpen
  ]);

  // Live clocks: Wall clock on Floor 1 and Digital Alarm Clock on Floor 3
  useEffect(() => {
    let clockRaf: number;
    const updateClock = () => {
      const d = new Date();
      if (floor === 1) {
        const s = d.getSeconds();
        const m = d.getMinutes() + s / 60;
        const h = (d.getHours() % 12) + m / 60;

        const hH = document.querySelector<SVGElement>('#clk1 .hH');
        const hM = document.querySelector<SVGElement>('#clk1 .hM');
        const hS = document.querySelector<SVGElement>('#clk1 .hS');

        if (hH) hH.setAttribute('transform', `rotate(${f(h * 30)})`);
        if (hM) hM.setAttribute('transform', `rotate(${f(m * 6)})`);
        if (hS) hS.setAttribute('transform', `rotate(${f(s * 6)})`);
      } else if (floor === 3) {
        const alarmT = document.querySelector<SVGTextElement>('#alarmT');
        if (alarmT) {
          const hh = String(d.getHours()).padStart(2, '0');
          const mm = String(d.getMinutes()).padStart(2, '0');
          alarmT.textContent = `${hh}:${mm}`;
        }
      }
      clockRaf = requestAnimationFrame(updateClock);
    };

    clockRaf = requestAnimationFrame(updateClock);
    return () => cancelAnimationFrame(clockRaf);
  }, [floor]);

  // Ambient bug simulation on Workshop Floor (Floor 2)
  useEffect(() => {
    if (floor !== 2) {
      bugsRef.current = [];
      return;
    }

    const bugElements = Array.from(document.querySelectorAll<SVGElement>('#sc2 .bug'));
    bugsRef.current = bugElements.map((el, i) => {
      const cx = JAR_X[i] || 646;
      return {
        el,
        k: el.dataset.k || 'beetle',
        cx,
        x: rr(-14, 14),
        y: 0,
        vx: rr(-0.5, 0.5) || 0.3,
        t: rr(0, 10),
        jump: 0,
        jt: 0,
        hide: 0
      };
    });

    const jars = Array.from(document.querySelectorAll<HTMLElement>('#sc2 .jar'));
    const cleanups: (() => void)[] = [];

    jars.forEach((j, i) => {
      const onEnter = () => {
        if (bugsRef.current[i]) bugsRef.current[i].hide = 1;
      };
      const onLeave = () => {
        if (bugsRef.current[i]) bugsRef.current[i].hide = 0;
      };
      j.addEventListener('pointerenter', onEnter);
      j.addEventListener('pointerleave', onLeave);
      cleanups.push(() => {
        j.removeEventListener('pointerenter', onEnter);
        j.removeEventListener('pointerleave', onLeave);
      });
    });

    let lastT = performance.now();
    let bugRaf: number;

    const bugLoop = (ts: number) => {
      bugRaf = requestAnimationFrame(bugLoop);
      if (ts - lastT < 33) return;
      const dt = Math.min(0.1, (ts - lastT) / 1000);
      lastT = ts;

      if (!isReducedMotion.current && !sheetOpen && !plainOpen && bugsRef.current.length > 0) {
        bugsRef.current.forEach((b) => {
          b.t += dt;
          let tx0 = 0;
          let ty = 0;
          let rotv = 0;
          let op = 1;

          if (b.jump) {
            b.jt += dt;
            const u = b.jt / 0.7;
            if (u >= 1) {
              b.jump = 0;
              b.jt = 0;
            } else {
              ty = -Math.sin(u * Math.PI) * 46;
              tx0 = Math.sin(u * Math.PI * 2) * 8;
            }
          }

          if (b.hide) {
            b.x += b.cx > 0 ? (22 - b.x) * 0.12 : 0;
            op = 0.25;
          } else if (b.k === 'beetle') {
            b.x += b.vx * dt * 10;
            if (b.x > 18 || b.x < -18) b.vx *= -1;
            rotv = b.vx > 0 ? 0 : 180;
            ty = Math.sin(b.t * 9) * 0.5;
          } else if (b.k === 'moth') {
            b.x = Math.sin(b.t * 0.9) * 18;
            ty = -24 - Math.sin(b.t * 2.3) * 14;
            rotv = Math.sin(b.t * 5) * 8;
          } else if (b.k === 'firefly') {
            b.x = Math.sin(b.t * 0.5) * 16;
            ty = -30 - Math.sin(b.t * 0.8) * 22;
            op = 0.65 + 0.35 * Math.sin(b.t * 3);
          } else {
            b.x += b.vx * dt * 8;
            if (b.x > 16 || b.x < -16) b.vx *= -1;
            ty = 0;
            rotv = b.vx > 0 ? 0 : 180;
          }

          const x = b.cx + b.x + tx0;
          const y = JAR_BASE - 12 + ty;
          b.el.setAttribute('transform', `translate(${f(x)} ${f(y)}) rotate(${f(rotv)})`);
          b.el.style.opacity = op.toFixed(2);
        });
      }
    };

    bugRaf = requestAnimationFrame(bugLoop);

    return () => {
      cancelAnimationFrame(bugRaf);
      cleanups.forEach((fn) => fn());
    };
  }, [floor, plainOpen, sheetOpen]);

  // Extract floor items for the ThingsDrawer
  const getFloorThings = useCallback((): ThingItem[] => {
    const sc = document.querySelector(`#sc${floor}`);
    if (!sc) return [];
    const elements = Array.from(sc.querySelectorAll<HTMLElement>('.obj'));
    return elements
      .map((el) => ({
        id: el.dataset.key || '',
        label: el.dataset.label || '',
        verb: el.dataset.verb || '',
        cx: Number(el.dataset.cx || 0)
      }))
      .sort((a, b) => a.cx - b.cx);
  }, [floor]);

  // Minimap pan calculations
  const miniLeftPct = ((camX[floor] || 0) / 1600) * 100;
  const miniWidthPct = (dims.w / 1600) * 100;
  const showMini = mode === 'floor' && dims.max >= 4;
  const canPanLeft = mode === 'floor' && (camX[floor] || 0) > 2;
  const canPanRight = mode === 'floor' && (camX[floor] || 0) < dims.max - 2;

  const handleMiniClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mode !== 'floor') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const t = (e.clientX - rect.left) / rect.width;
    panTo(floor, t * 1600 - dims.w / 2, 380, isReducedMotion.current);
  };

  return (
    <div
      ref={stageRef}
      id="stage"
      onPointerDown={handlePointerDown}
      onPointerOver={handleStagePointerOver}
      onPointerOut={handleStagePointerOut}
      onClick={handleStageClick}
      onWheel={handleWheel}
    >
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <SvgDefs />
      </svg>

      <HouseExterior viewBox={outsideViewBox} />

      <GroundFloor
        viewBox={getFloorViewBox(1)}
        isActive={mode === 'floor' && floor === 1}
        isBelow={mode === 'floor' && floor > 1}
      />

      <WorkshopFloor
        viewBox={getFloorViewBox(2)}
        isActive={mode === 'floor' && floor === 2}
        isBelow={mode === 'floor' && floor > 2}
      />

      <BedroomFloor
        viewBox={getFloorViewBox(3)}
        isActive={mode === 'floor' && floor === 3}
        isBelow={mode === 'floor' && floor > 3}
      />

      <ConstructionFloor
        viewBox={getFloorViewBox(4)}
        isActive={mode === 'floor' && floor === 4}
        isBelow={mode === 'floor' && floor > 4}
      />

      {/* Atmospheric overlays */}
      <div id="scrim" />
      <div id="grain" />
      <div id="vig" />

      {/* Chrome navigation */}
      <HeaderNav
        onGoOutside={() => goFloor(0)}
        onOpenPlain={() => setPlainOpen(true)}
        onOpenContact={() => openSheet(getSheetContact())}
      />

      <FrontOverlay onKnock={() => knock(1)} />

      <FloorNav
        currentFloor={mode === 'outside' ? 0 : floor}
        onSelectFloor={(targetFloor) => {
          if (targetFloor === floor && mode !== 'outside') return;
          if (targetFloor === 0) goFloor(0);
          else goFloor(targetFloor, targetFloor < floor ? 'down' : 'up');
        }}
      />

      <CameraControls
        mode={mode}
        canPanLeft={canPanLeft}
        canPanRight={canPanRight}
        miniLeftPct={miniLeftPct}
        miniWidthPct={miniWidthPct}
        showMini={showMini}
        onPanLeft={() =>
          panTo(floor, (camX[floor] || 0) - dims.w * 0.55, 360, isReducedMotion.current)
        }
        onPanRight={() =>
          panTo(floor, (camX[floor] || 0) + dims.w * 0.55, 360, isReducedMotion.current)
        }
        onMiniClick={handleMiniClick}
        onOpenThings={() => setThingsOpen((prev) => !prev)}
        onOpenContact={() => openSheet(getSheetContact())}
        onOpenPlain={() => setPlainOpen(true)}
      />

      <StatusHint message={hint} />

      <Tooltip
        visible={tooltip.visible}
        x={tooltip.x}
        y={tooltip.y}
        label={tooltip.label}
        verb={tooltip.verb}
      />

      <ThingsDrawer
        isOpen={thingsOpen}
        floor={floor}
        items={getFloorThings()}
        onClose={() => setThingsOpen(false)}
        onSelectItem={(item) => {
          setThingsOpen(false);
          centreOn(floor, item.cx, 380, isReducedMotion.current);
          setTimeout(() => {
            const el = document.querySelector<HTMLElement>(`#sc${floor} .obj[data-key="${item.id}"]`);
            if (el) {
              try {
                el.focus({ preventScroll: true });
              } catch {
                // Ignore
              }
              activateObject(item.id, el);
            }
          }, isReducedMotion.current ? 0 : 420);
        }}
      />

      <SheetModal
        sheet={sheet}
        isOpen={sheetOpen}
        isClosing={sheetClosing}
        onClose={closeSheet}
        onAction={handleSheetAction}
        onProjectSelect={(projId) => {
          closeSheet();
          setTimeout(() => {
            pullProject(projId);
          }, isReducedMotion.current ? 0 : 320);
        }}
      />

      <TvModal
        isOpen={tvOpen}
        onClose={closeTV}
        channel={tvCh}
        onChannelChange={handleTvChannelChange}
      />

      <PlainViewModal
        isOpen={plainOpen}
        onClose={handleClosePlain}
      />
    </div>
  );
};

export default App;
