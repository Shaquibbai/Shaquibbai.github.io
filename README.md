# Shaquib Wasif — Interactive Game-UI Portfolio Website

An interactive, responsive personal portfolio website for **Shaquib Wasif**, Computer Science & Engineering student at the **Islamic University of Technology (IUT)**.

Disguised as a retro-modern RPG game character menu and programmer terminal interface, this portfolio allows visitors to explore character stats, academic achievements, quest logs (projects), interests, and save points (contact channels).

---

## 🎮 Features

- **RPG Character Interface**: Character profile sheet, level stats, quest log, and save points.
- **Intro Boot Sequence**: Skippable game boot terminal (`INITIALIZING SHAQUIB_WASIF.EXE`).
- **Interactive Quest Log**: Project cards for `farmOS` (Completed) and `Deadline Dash` (In Progress) with expanded modal views and asset previews.
- **Character Inventory**: Equipment-style breakdown of skills, languages, databases, tools, and AI workflows.
- **Achievement & Research Log**: Academic history (SSC, HSC, B.Sc.) and honest "Undiscovered Quest" research tracker.
- **Save Point & Final Character Reveal**: Social links alongside a dedicated placeholder slot for Shaquib's real photograph.
- **Theme & Accessibility**: Light / Dark mode toggle (stored in `localStorage`), scanline CRT overlay toggle, full keyboard navigation, and `prefers-reduced-motion` support.

---

## 🛠️ Technology Stack

- **Framework**: React 18 + Vite
- **Icons**: Lucide React
- **Styling**: Modern CSS with CSS Custom Properties & responsive utility components
- **Hosting / Deployment Target**: GitHub Pages (`https://shaquibbai.github.io/`)

---

## 📁 Repository Structure

```text
d:\portfolio\
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Actions deployment workflow
├── assets/                        # User-provided project images (Preserved)
│   ├── Deadline_Dash/
│   │   └── Deadline_Dash.png
│   └── farmOS/
│       └── farmOS.jfif
├── src/
│   ├── components/                # Reusable UI components (Intro, Nav, Modals, etc.)
│   ├── sections/                  # Main portfolio sections (Profile, Stats, Quests, etc.)
│   ├── data/
│   │   └── portfolioData.js       # Centralized source-of-truth data layer
│   ├── styles/                    # Global styles, CSS variables, and components
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
├── package.json
├── README.md
└── AI_USAGE.md
```

---

## 🚀 Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Start Development Server**:
   ```bash
   npm run dev
   ```
3. **Build for Production**:
   ```bash
   npm run build
   ```
4. **Preview Production Build**:
   ```bash
   npm run preview
   ```

---

## ⚙️ Updating Portfolio Information

All portfolio data is centralized in [`src/data/portfolioData.js`](file:///d:/portfolio/src/data/portfolioData.js).

### 1. How to Add a New Project (Quest)
Open [`src/data/portfolioData.js`](file:///d:/portfolio/src/data/portfolioData.js) and add a new object to the `quests` array:
```javascript
{
  id: 'quest-03',
  code: 'QUEST 03',
  title: 'Project Title',
  type: 'PROJECT TYPE',
  status: 'COMPLETED', // or 'IN PROGRESS'
  tech: ['Java', 'Spring Boot'],
  techDisplay: 'JAVA / SPRING BOOT',
  image: projectImgAsset,
  githubUrl: 'https://github.com/...',
  summary: 'Short description.',
  details: ['Feature 1', 'Feature 2']
}
```

### 2. How to Update Level, Semester, or Academic Data
Modify `siteConfig.profile` or `siteConfig.academics` in [`src/data/portfolioData.js`](file:///d:/portfolio/src/data/portfolioData.js).

### 3. How to Add Research Entries
Update `siteConfig.research` in [`src/data/portfolioData.js`](file:///d:/portfolio/src/data/portfolioData.js) with paper titles, status, and PDF/link fields.

### 4. How to Replace the Final Character Photograph
Place your real photograph image file (e.g., `shaquib_photo.jpg`) into `assets/`, import it in `portfolioData.js`, and set `siteConfig.profile.realPhotoUrl = shaquibPhotoImg`.

---

## 🚀 GitHub Pages Deployment

The GitHub repository `Shaquibbai.github.io` automatically deploys the built Vite site via the included `.github/workflows/deploy.yml` workflow whenever commits are pushed to the `main` branch.

Live Site URL: [https://shaquibbai.github.io/](https://shaquibbai.github.io/)
