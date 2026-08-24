# Brandthis Frontend

React + TypeScript port of the single-file `index.html` prototype (Vite dev server, no
runtime dependencies beyond React).

```bash
npm install
npm run dev
```

`npm run build` produces a production bundle in `dist/`; `npm run typecheck` runs `tsc`
in strict mode without emitting.

## Structure

```
src/
  main.tsx                  entry point; mounts <App /> and imports global.css
  App.tsx                   view router + always-on chrome (chat, modals, toast)
  styles/global.css         the prototype's stylesheet, carried over verbatim
  types/index.ts            shared domain + routing types
  data/constants.ts         seed brands, profiles, uploads, questionnaire copy
  lib/brand.ts              domain/name parsing helpers
  context/AppContext.tsx    everything that was a top-level `let` in the original
  hooks/                    useButtonLift, useOutsideClick
  components/
    icons/                  every inline SVG from the original, as components
    landing/                landing page, hero, brand scanner, video mock
    marketing/              How to use / Teams / Pricing
    onboarding/             the six-step brand setup flow
    modals/                 feedback, sign in, credits, image picker
    app/                    header, sidebar, dropdowns, and the four pages
    app/workspace/          single-brand workspace and its sections
```

### How the original maps onto React

The prototype drove everything through `document.getElementById(...)` against markup for
all views at once, hidden with `style.display`. Here, exactly one view renders at a time
and the ~50 global functions became either component-local state or methods on
`AppContext`:

| Original | Now |
| --- | --- |
| `showView` / `showMarketingView` / `showPage` | `view` and `page` in `AppContext` |
| `brands`, `profiles`, `generationCredits`, `uploadedBrandImages` | `AppContext` state |
| `openModal` / `closeModal` / `closeAllOverlays` | `openModalId` in `AppContext` |
| `runLoadingSequence`, `runExtractSteps`, `togglePlay` | `useEffect` timers in their own components |
| `renderBrands`, `renderBrandDNA`, `renderQuestionnaire` | ordinary JSX |
| `showBrandToast` | `showToast` in `AppContext` + `<Toast />` |

CSS class names, ids, and structure are unchanged, so the rendered markup still matches
the original selectors. Inline `style="..."` attributes became style objects; the toast's
inline styles moved into a `.brand-toast` rule at the bottom of `global.css`.

## Things to know

- **Demo images are missing.** Paths like `../site/public/frames/frame_0001.jpg` point at
  a sibling project that is not part of this repo, so those tiles render as neutral grey
  blocks via `AssetImage`. Drop real files into `public/` and update `DEMO_IMAGES` in
  `src/data/constants.ts` to wire them up.
- **`IdentityCard` is not mounted.** Its markup existed in the original page but was
  unreachable — opening the Brand section replaced the whole section with the DNA board
  before the card could render. It is ported and functional; mount it in
  `BrandWorkspace` above `<BrandDnaSection />` if you want it back.
- **The chat bubble overlaps the AI rail's send button.** Both are anchored bottom-right
  and the bubble sits at `z-index: 400`. This is inherited from the original CSS, not
  introduced by the port.
- **Navigation is state-based, not URL-based.** Views do not have their own routes. If you
  want deep links and back-button support, swapping `view`/`page` in `AppContext` for a
  router is a contained change.
- **Two dead fragments were dropped**: an unclosed `<button>` in the sidebar that rendered
  nothing, and `#brand-workspace-tabs`, a tab bar the stylesheet set to `display: none`
  because the sidebar took over that navigation.
