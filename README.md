# Resume — Phạm Quang Huy

Production: https://pham-quang-huy-portfolio.vercel.app

Repository: https://github.com/huyIT203/Resume

React 19.3 + Vite + TypeScript + React Router. Vietnamese/English, light/dark/system themes. No backend or environment secrets are needed.

## Development

```powershell
npm ci
npm run dev
npm run build
npm run preview
```

When the restricted Windows execution environment blocks esbuild child-process pipes with `spawn EPERM`, use `npm run build:portable`. This still uses Vite/Rollup, TypeScript and Tailwind, and minifies with Terser in process. The standard `npm run build` remains the Vercel command.

## Pages

- `/`: overview and selected projects.
- `/projects`: company projects, platform filter and personal work.
- `/projects/mebione`, `/projects/dss`, `/projects/mebipha`: independent project pages, verified contributions, technology and store links.
- `/about`: profile, education and professional experience.
- `/skills`: toolkit.
- `/contact`: email, copy-email control, GitHub, LinkedIn and CV.
- Unknown routes show a designed 404 page.

Navigation uses real URLs rather than section anchors. Vercel rewrites preserve direct opening and refresh on nested URLs. Browser history and an accessible main-content focus are handled on route changes.

## Animate UI

- Official React Router Page Transition with `effect="stack"`. Back links use its `nav-back` type. Browsers without View Transitions navigate immediately. Browser Back in the upstream React Router implementation may not animate; it remains functional.
- Official Theme Toggler and its animated button/icon. The selection is saved as `portfolio-theme`; an early script applies it before the app mounts.
- Official Button, Collapsible, Context Menu and Dropdown Menu primitives. Project menus open by right-click or a visible ellipsis button.
- Animated Lucide icons copied from the Animate UI registry. No static Lucide components or Unicode pictograms are used for controls.
- Official navigation Highlight and Fade entrances. Animate UI's provider and reduced-motion configuration govern the primitives. Optional Magic UI BlurFade remains available.
- Outfit, the font used by Animate UI, is self-hosted; Be Vietnam Pro supplies fallback Vietnamese glyphs. Font OFL notices are included under `public/fonts`.

Registry configuration: `components.json`. Project-local skill: `.agents/skills/animate-ui`. Project-local MCP: `.codex/config.toml`. Detailed component origins: `COMPONENT-SOURCES.md`. Retain `THIRD-PARTY-LICENSES.txt` and font notices when distributing source.

## Content

`src/content.ts` contains bilingual copy, project details, technology and store links. `src/pages/PortfolioPages.tsx` renders the pages. `src/App.tsx` owns navigation and the application frame; `src/styles.css` owns the responsive layout and themes.

Employer/title: Mebisoft, Fresher Mobile Developer, November 2025–present. Personal contributions were checked against Git history and confirmed by Huy. Mebione is published as **Mebieco**; DSS-CRM as **DSS**. Both have Google Play and App Store links. Mebipha remains described as development work. No company source, internal screenshots or customer data is included. Illustrations are feature maps, not application screenshots.

The latest English CV is served as `public/PhamQuangHuy_CV.pdf`. Contact uses mailto and clipboard; it does not pretend to send a server form.

## Verification

TypeScript and the portable Vite build pass. Semantic DOM checks pass for route navigation, project filtering, detail pages, collapse/expand, both menu entry points, theme persistence, language, browser Back and 404 handling. The DOM harness uses platform shims and does not check animation appearance or responsive geometry.

Visual browser QA was interrupted because the computer-use safety layer could not determine Chrome's current URL confidently. Animation frames, real font rendering and mobile geometry still require a visual review. No alternate browser-control mechanism was used to bypass that stop.

## Deployment

The linked Vercel project is `huyit203s-projects/pham-quang-huy-portfolio`. Confirm the target with `vercel project inspect --non-interactive` before running `vercel deploy --prod`. Credentials and `.vercel` state must remain outside source archives.


Primary font updated at the owner’s request to **Playfair Display** (400–900), self-hosted from the official Google Fonts repository. Vietnamese coverage is confirmed in upstream METADATA.pb. Font source: https://github.com/google/fonts/tree/main/ofl/playfairdisplay . License: `public/fonts/PlayfairDisplay-OFL.txt`. Outfit remains as an unused optional asset.


Current primary font: **Merriweather Sans**, self-hosted from the official Google Fonts repository, with Vietnamese coverage confirmed in upstream metadata. Source: https://github.com/google/fonts/tree/main/ofl/merriweathersans . License: `public/fonts/MerriweatherSans-OFL.txt`. This supersedes the Playfair Display trial.
