import React from 'react';

export const SvgDefs: React.FC = () => {
  return (
    <defs>
      <linearGradient id="gSky" gradientUnits="userSpaceOnUse" x1="0" y1="-1500" x2="0" y2="800">
        <stop offset="0" stopColor="#05030a" />
        <stop offset=".58" stopColor="#110c19" />
        <stop offset=".8" stopColor="#211530" />
        <stop offset=".89" stopColor="#3d1f3a" />
        <stop offset=".945" stopColor="#733240" />
        <stop offset=".985" stopColor="#bd6c4a" />
      </linearGradient>

      <radialGradient id="gMoon">
        <stop offset="0" stopColor="#e8dcca" stopOpacity=".35" />
        <stop offset="1" stopColor="#e8dcca" stopOpacity="0" />
      </radialGradient>

      <radialGradient id="gLamp">
        <stop offset="0" stopColor="#ffdca8" stopOpacity=".85" />
        <stop offset=".35" stopColor="#f2b35e" stopOpacity=".38" />
        <stop offset="1" stopColor="#f2b35e" stopOpacity="0" />
      </radialGradient>

      <radialGradient id="gLampT">
        <stop offset="0" stopColor="#bff0df" stopOpacity=".75" />
        <stop offset=".4" stopColor="#6fb3a2" stopOpacity=".3" />
        <stop offset="1" stopColor="#6fb3a2" stopOpacity="0" />
      </radialGradient>

      <radialGradient id="gTVglow">
        <stop offset="0" stopColor="#9cc6ff" stopOpacity=".6" />
        <stop offset=".45" stopColor="#6c8fe0" stopOpacity=".22" />
        <stop offset="1" stopColor="#6c8fe0" stopOpacity="0" />
      </radialGradient>

      <radialGradient id="gMoonL">
        <stop offset="0" stopColor="#cfd8f0" stopOpacity=".35" />
        <stop offset="1" stopColor="#cfd8f0" stopOpacity="0" />
      </radialGradient>

      <linearGradient id="gGA" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffe3ae" />
        <stop offset=".55" stopColor="#f2b35e" />
        <stop offset="1" stopColor="#b8692c" />
      </linearGradient>

      <linearGradient id="gGT" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#d6f2e8" />
        <stop offset=".55" stopColor="#7fb3a6" />
        <stop offset="1" stopColor="#3d6f64" />
      </linearGradient>

      <linearGradient id="gGN" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#34456e" />
        <stop offset="1" stopColor="#121a30" />
      </linearGradient>

      <linearGradient id="gGB" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#8fb4ff" />
        <stop offset="1" stopColor="#3a58a8" />
      </linearGradient>

      <linearGradient id="gShadeX" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#05030a" stopOpacity=".55" />
        <stop offset=".6" stopColor="#05030a" stopOpacity=".1" />
        <stop offset="1" stopColor="#f2b35e" stopOpacity=".1" />
      </linearGradient>

      <linearGradient id="gShadeY" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#05030a" stopOpacity=".5" />
        <stop offset=".35" stopColor="#05030a" stopOpacity="0" />
        <stop offset=".85" stopColor="#05030a" stopOpacity="0" />
        <stop offset="1" stopColor="#05030a" stopOpacity=".35" />
      </linearGradient>

      <linearGradient id="gFog" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#4a3050" stopOpacity="0" />
        <stop offset="1" stopColor="#5a3a55" stopOpacity=".5" />
      </linearGradient>

      <linearGradient id="gLawn" gradientUnits="userSpaceOnUse" x1="0" y1="780" x2="0" y2="1000">
        <stop offset="0" stopColor="#2a2236" />
        <stop offset="1" stopColor="#120d19" />
      </linearGradient>

      <linearGradient id="gBeam" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffdca8" stopOpacity=".5" />
        <stop offset="1" stopColor="#ffdca8" stopOpacity="0" />
      </linearGradient>

      <linearGradient id="gFloorDark" gradientUnits="userSpaceOnUse" x1="0" y1="660" x2="0" y2="860">
        <stop offset="0" stopColor="#05030a" stopOpacity="0" />
        <stop offset="1" stopColor="#05030a" stopOpacity=".78" />
      </linearGradient>

      <linearGradient id="gCeilDark" gradientUnits="userSpaceOnUse" x1="0" y1="76" x2="0" y2="330">
        <stop offset="0" stopColor="#05030a" stopOpacity=".7" />
        <stop offset="1" stopColor="#05030a" stopOpacity="0" />
      </linearGradient>

      <linearGradient id="gSkyS" gradientUnits="userSpaceOnUse" x1="0" y1="-300" x2="0" y2="700">
        <stop offset="0" stopColor="#05030a" />
        <stop offset=".6" stopColor="#140d20" />
        <stop offset="1" stopColor="#3a1f3a" />
      </linearGradient>

      <linearGradient id="gBeyond" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#2a1a16" />
        <stop offset=".5" stopColor="#6e4528" />
        <stop offset="1" stopColor="#e0a35a" />
      </linearGradient>

      <radialGradient id="gWork">
        <stop offset="0" stopColor="#fff0c8" stopOpacity=".9" />
        <stop offset=".3" stopColor="#ffd48a" stopOpacity=".45" />
        <stop offset="1" stopColor="#ffd48a" stopOpacity="0" />
      </radialGradient>

      <pattern id="pSlate" width="22" height="13" patternUnits="userSpaceOnUse">
        <path d="M0 12.5H22M11 .5V12.5" stroke="#000" strokeOpacity=".38" strokeWidth="1" fill="none" />
        <path d="M0 12.5Q5.5 5 11 12.5Q16.5 5 22 12.5" stroke="#e8dcca" strokeOpacity=".09" strokeWidth=".8" fill="none" />
      </pattern>

      <pattern id="pShingle" width="12" height="9" patternUnits="userSpaceOnUse">
        <path d="M0 8.5Q3 4 6 8.5Q9 4 12 8.5" stroke="#000" strokeOpacity=".4" strokeWidth="1" fill="none" />
      </pattern>

      <pattern id="pPlaster" width="40" height="40" patternUnits="userSpaceOnUse">
        <g fill="#000" fillOpacity=".14">
          <circle cx="5" cy="9" r=".8" />
          <circle cx="19" cy="4" r=".6" />
          <circle cx="31" cy="14" r=".9" />
          <circle cx="12" cy="26" r=".7" />
          <circle cx="28" cy="33" r=".8" />
          <circle cx="36" cy="26" r=".5" />
          <circle cx="4" cy="37" r=".6" />
          <circle cx="22" cy="19" r=".5" />
        </g>
      </pattern>

      <pattern id="pStone" width="48" height="22" patternUnits="userSpaceOnUse">
        <path d="M0 .5H48M0 11.5H48M16 .5V11.5M40 11.5V22" stroke="#000" strokeOpacity=".34" strokeWidth="1" fill="none" />
      </pattern>

      <pattern id="pBoards" width="90" height="16" patternUnits="userSpaceOnUse">
        <path d="M0 15.5H90" stroke="#000" strokeOpacity=".42" strokeWidth="1" />
        <path d="M31 0V15.5M72 0V15.5" stroke="#000" strokeOpacity=".22" strokeWidth=".8" />
        <path d="M0 3H90" stroke="#fff" strokeOpacity=".03" strokeWidth="2" />
      </pattern>

      <pattern id="pWood" width="60" height="9" patternUnits="userSpaceOnUse">
        <path d="M0 8.5H60" stroke="#000" strokeOpacity=".3" strokeWidth=".8" />
        <path d="M6 3Q20 1 34 3T60 3" stroke="#000" strokeOpacity=".16" strokeWidth=".7" fill="none" />
      </pattern>

      <pattern id="pStripe" width="14" height="14" patternUnits="userSpaceOnUse">
        <rect width="5" height="14" fill="#fff" fillOpacity=".04" />
      </pattern>

      <pattern id="pDamask" width="22" height="26" patternUnits="userSpaceOnUse">
        <path d="M11 3L17 13L11 23L5 13Z" fill="none" stroke="#e8dcca" strokeOpacity=".12" strokeWidth=".9" />
        <circle cx="11" cy="13" r="1.4" fill="#e8dcca" fillOpacity=".1" />
        <circle cx="0" cy="0" r="1" fill="#e8dcca" fillOpacity=".08" />
        <circle cx="22" cy="26" r="1" fill="#e8dcca" fillOpacity=".08" />
      </pattern>

      <pattern id="pHatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(40)">
        <path d="M0 0V6" stroke="#000" strokeOpacity=".45" strokeWidth=".9" />
      </pattern>

      <pattern id="pHatchX" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(-42)">
        <path d="M0 0V7" stroke="#e8dcca" strokeOpacity=".12" strokeWidth=".8" />
      </pattern>

      <pattern id="pCob" width="20" height="10" patternUnits="userSpaceOnUse">
        <path d="M0 .5H20M10 .5V10" stroke="#000" strokeOpacity=".3" strokeWidth="1" fill="none" />
      </pattern>

      <pattern id="pGrid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M20 0H0V20" stroke="#bcd0e4" strokeOpacity=".16" strokeWidth=".7" fill="none" />
      </pattern>

      <pattern id="pBrick" width="36" height="14" patternUnits="userSpaceOnUse">
        <path d="M0 .5H36M0 7.5H36M18 .5V7.5M0 7.5V14M36 7.5V14" stroke="#000" strokeOpacity=".28" strokeWidth="1" fill="none" />
      </pattern>

      <pattern id="pCork" width="12" height="12" patternUnits="userSpaceOnUse">
        <g fill="#000" fillOpacity=".18">
          <circle cx="2" cy="3" r="1" />
          <circle cx="8" cy="2" r=".7" />
          <circle cx="6" cy="8" r="1.1" />
          <circle cx="11" cy="10" r=".7" />
          <circle cx="1" cy="10" r=".6" />
        </g>
      </pattern>

      <pattern id="pPlank" width="22" height="500" patternUnits="userSpaceOnUse">
        <path d="M.5 0V500" stroke="#000" strokeOpacity=".35" strokeWidth="1" />
      </pattern>

      <pattern id="pDrywall" width="30" height="30" patternUnits="userSpaceOnUse">
        <g fill="#fff" fillOpacity=".05">
          <circle cx="5" cy="6" r="1.4" />
          <circle cx="20" cy="14" r="1" />
          <circle cx="12" cy="25" r="1.2" />
        </g>
      </pattern>
    </defs>
  );
};
