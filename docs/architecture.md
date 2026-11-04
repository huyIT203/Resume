# Project architecture

This portfolio uses page-oriented modules with reusable features. Clean Architecture's dependency direction guides the structure; domain and repository layers are introduced only when real business logic or multiple data sources require them.

```text
src/
  app/                      # Composition, providers, routing, layout, global styles
  pages/
    home/                   # Home orchestration and local entrance sequence
      content/              # Home translations
      ui/                   # AboutTitle, HangingPhotos, HomeGreeting + their CSS
    intro/                  # Intro page and its CSS
    placeholder/            # Existing routes awaiting new designs
    projects/content/       # Project records retained for route metadata
  features/change-language/ # Locale state, persistence, and language switch UI
  shared/
    config/                 # Public site identity and links
    i18n/                   # Locale type and common interface copy
    lib/                    # Framework-independent helpers
    ui/                     # Reusable Animate UI, Magic UI, Aceternity modules
  main.tsx                  # Browser entry point
```

## Dependency rules

- Imports point downward: `app → pages → features → shared`. Layers may skip levels.
- Pages and features can import their own files, but cannot import a sibling page/feature. Compose siblings in `app` or another higher layer.
- `shared` cannot import app, page, or feature code.
- Use relative imports inside a module and `@/` imports across modules. Avoid a global barrel that exports the entire UI library.
- `npm run lint` resolves local imports through TypeScript and rejects upward imports, sibling coupling, unresolved local imports, and import cycles. It checks static imports, re-exports, type imports, and literal dynamic imports.

## Ownership

- Keep a component and its `.module.css` together. Page-specific components stay under their page until they have a real second consumer.
- `HomePage` owns the entrance sequence: title and greeting finish, then photos drop in. Rendering details remain inside each UI module.
- `LocaleProvider` owns the locale, browser persistence, and document language. Site metadata is composed by `app/router/RouteMetadata`.
- Page copy belongs to `pages/<page>/content`. Shared copy includes only shared controls. Static project records are content, not repositories or use cases.
- Global CSS contains resets and document defaults. Fonts and tokens have separate files; layout and feature styles use CSS Modules.
- `public/fonts` and `public/images` retain stable URLs. Include the license alongside downloaded fonts.
- Upstream UI implementations remain under `shared/ui/<library>` with their source attribution. Import package primitives directly where no local customization is needed.

## Adding functionality

1. Add a page in `pages/<name>` and register its route in `app/router/AppRoutes.tsx`.
2. Start page-only UI and state within that page. Extract a feature when it represents reusable user behavior.
3. Add shared primitives only when they are independent of portfolio-specific content.
4. If API-backed business rules appear, put the rules and types in the owning module. Keep HTTP/browser details outside those rules, and introduce an interface when a real interchangeable dependency exists.

## Development checks

```bash
npm run format        # Format source, scripts, docs, and root configuration
npm run format:check  # Verify formatting without writing
npm run analyze       # TypeScript + unused declarations
npm run lint          # Dependency rules + local imports + cycles
npm run check         # Run the three checks above
npm run build         # Production build
```

Formatting uses Prettier with two spaces, single quotes, no semicolons, and LF endings. `.editorconfig` supplies matching editor defaults.
