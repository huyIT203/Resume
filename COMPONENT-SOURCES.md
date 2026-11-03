# Component sources

Downloaded from the official public registries on 2026-11-02.

- Animate UI animated icons: `src/components/animate-ui/icons/arrow-right.tsx`, `download.tsx`, `mail.tsx`, `terminal.tsx`, `external-link.tsx`, `menu.tsx`.
  - Sources: `https://animate-ui.com/r/icons-lucide-{name}.json`.
  - Original project: https://github.com/imskyleen/animate-ui (MIT + Commons Clause; see the complete upstream notice).
  - Icon drawing originates from Lucide: https://lucide.dev/license (ISC).
  - Runtime: `@animate-ui/react/icons` and `motion/react`.
- Animate UI button runtime: `@animate-ui/react/primitives/buttons/button`.
  - Documentation: https://animate-ui.com/docs/primitives/animate-ui/button.
- Magic UI Blur Fade: `src/components/magicui/blur-fade.tsx`.
  - Source: https://magicui.design/r/blur-fade.json.
  - Original project: https://github.com/magicuidesign/magicui (MIT).
  - Retained as an optional Magic UI component; new page reveals use Animate UI Fade.

These source files are local application components, not remote scripts. Keep the notices in `THIRD-PARTY-LICENSES.txt` when redistributing the portfolio source.

## Routed layout update

- Official React Router Page Transition: `https://animate-ui.com/r/components-page-transition-react-router.json`, installed in `src/components/animate-ui/components/page-transition.tsx`. Used with `effect="stack"`; back links use the official `nav-back` transition type. Requires React 19.3+ (installed 19.3.1).
- Official Theme Toggler button: `https://animate-ui.com/r/buttons-theme-toggler.json`. Only its `cn` utility import was adapted. The wrapper persists light/dark/system selection and composes the official `effects/theme-toggler` primitive.
- Collapsible, Context Menu and Dropdown Menu use `@animate-ui/react/primitives/radix-ui/*`, with local visual classes in `interactive.tsx`. Project actions work through both right-click and a visible menu button.
- Navigation Highlight and page Fade use official `@animate-ui/react/primitives/effects/*` exports and the shared Animate UI provider/reduced-motion configuration.
- Additional animated Lucide icons are copied from the same official `icons-lucide-{name}.json` registry: ArrowLeft, X, House, User, Layers, Folder, ChevronDown, Ellipsis, Sun, Moon, SunMoon, Copy, Check, Smartphone, GraduationCap, Globe and Search. No static Lucide React components or Unicode pictograms are used for the application controls.
- Animate UI's own font is Outfit: verified from `https://github.com/imskyleen/animate-ui/blob/main/apps/v2/app/layout.tsx`. Outfit is self-hosted from the Google Fonts project; Be Vietnam Pro supplies fallback Vietnamese glyphs. Both OFL notices are in `public/fonts/`.

The semantic DOM checks use a virtual DOM with platform shims; they do not verify animation appearance, font rendering or responsive geometry. Browser interaction was unavailable during this update, so those visual checks remain outstanding.


Primary font updated at the owner’s request to **Playfair Display** (400–900), self-hosted from the official Google Fonts repository. Vietnamese coverage is confirmed in upstream METADATA.pb. Font source: https://github.com/google/fonts/tree/main/ofl/playfairdisplay . License: `public/fonts/PlayfairDisplay-OFL.txt`. Outfit remains as an unused optional asset.


Current primary font: **Merriweather Sans**, self-hosted from the official Google Fonts repository, with Vietnamese coverage confirmed in upstream metadata. Source: https://github.com/google/fonts/tree/main/ofl/merriweathersans . License: `public/fonts/MerriweatherSans-OFL.txt`. This supersedes the Playfair Display trial.
