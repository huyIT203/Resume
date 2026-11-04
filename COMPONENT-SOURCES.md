# Component sources

Local UI implementations retain their upstream attribution. Keep `THIRD-PARTY-LICENSES.txt` and font licenses when redistributing the source.

- Animate UI Page Transition: `src/shared/ui/animate-ui/page-transition.tsx`.
  - Source: https://animate-ui.com/r/components-page-transition-react-router.json
  - Project: https://github.com/imskyleen/animate-ui
  - App providers configure motion and reduced motion centrally.
- Animate UI Splitting Text is imported directly from `@animate-ui/react/primitives/texts/splitting` by Home's AboutTitle and the Intro page.
  - Documentation: https://animate-ui.com/docs/primitives/animate-ui/splitting-text
- Aceternity Typewriter Effect: `src/shared/ui/aceternity/typewriter-effect.tsx`.
  - Source: https://ui.aceternity.com/registry/typewriter-effect.json
  - Adapted to reserve layout space, support reduced motion, and notify the caller on completion.
- Aceternity Floating Dock: `src/shared/ui/aceternity/floating-dock.tsx`.
  - Source: https://ui.aceternity.com/registry/floating-dock.json
  - Adapted into a vertical dock with pointer-Y magnification, fixed hit areas, transform-based scaling, keyboard focus, and action buttons.
- Animate UI animated Lucide icons: `house`, `terminal`, and `book-open` under `src/shared/ui/animate-ui/icons/`.
  - Sources: `https://animate-ui.com/r/icons-lucide-{name}.json`.
  - Runtime: `@animate-ui/react/icons` and `motion/react`. Lucide drawings retain their upstream attribution in `THIRD-PARTY-LICENSES.txt`.
- Magic UI Highlighter: `src/shared/ui/magicui/highlighter.tsx`.
  - Documentation: https://magicui.design/docs/components/highlighter
  - Uses `rough-notation`; the Home greeting selects its underline action.
- Font declarations live in `src/app/styles/fonts.css` and assets remain under `public/fonts/`.
  - Merriweather Sans, Playfair Display, Outfit, Be Vietnam Pro, PT Serif, and Italianno originate from Google Fonts. Their OFL notices remain alongside the files.
  - Italianno: https://github.com/google/fonts/tree/main/ofl/italianno
  - Gentlemens Script provenance is recorded in `public/fonts/GentlemensScript-SOURCE.txt`.
  - TAN Angleton resolves only from an installed local font, with the existing serif fallback.

Unused legacy navigation, theme controls, project interaction wrappers, animated icons, and Blur Fade were removed during the architecture refactor. The underlying third-party notices remain for attribution history.
