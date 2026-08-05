[//]: # ( ---------------------------------------------------------------------- )
[//]: # (+ Authors: 	Ran# <ran.hash@proton.me> )
[//]: # (+ Created: 	2026/07/21 16:57:59.658784 )
[//]: # (+ Revised: 	2026/08/05 10:01:38.839202 )
[//]: # ( ---------------------------------------------------------------------- )

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Enlarged the light/dark logo lockup frames on the About page
  (`public/about/index.html`) from 88px to 140px.

### Fixed

- `public/icons/breren-logo-spin.svg`: the three ramparts now rotate as
  true circles instead of the static logo's hand-drawn irregular
  contour. A non-circular ring changes silhouette as it turns, so
  spinning the organic shape read as a jittery wobble; circles are
  rotationally invariant, so the spin is now smooth.

- Moved everything actually served at breren.com (`index.html`,
  `about/`, `licenses/`, `vitralis/`, `common.css`/`common.js`,
  `icons/`, `links.toml`, `translations.toml`, `CNAME`, `.nojekyll`)
  under a new `public/` folder, leaving only repo-meta files (this
  changelog, `README.md`, `docs/`, the license text, ...) at the top
  level. GitHub Pages' classic branch-deploy source can only publish
  from `/` or `/docs`, not an arbitrary folder name, so
  `.github/workflows/deploy-pages.yml` now publishes `public/` on every
  push to `main` instead — the Pages source setting was switched from
  "deploy from a branch" to "GitHub Actions" to match. Public URLs
  (breren.com/about, breren.com/licenses/pbl, breren.com/vitralis)
  are unchanged.

### Added

- `about/index.html` — the mark card shows the static mark at rest on
  both a fixed light and a fixed dark ground side by side, each larger
  (148px) and forced to that ground's colors regardless of the page's
  own theme toggle or the OS preference. Click either to replay the
  draw-in reveal; double-click to spin it once — `breren-logo-spin.svg`'s
  four independently-timed pieces (16s/8s/4s/8s) are forced to complete
  an integer number of their own revolutions in the same 16s window (LCM
  of their periods), so the whole composite mark lands back at its exact
  starting rotation and settles on the plain static mark instead of
  looping forever or stopping mid-turn. Each lockup renders into its own
  shadow root so the two copies' CSS classes and `@keyframes` (identical
  between the two, since they're fetches of the same source files) can't
  collide and steal each other's in-flight animation. Captions
  translated across all 25 supported languages.
- `about/index.html` — the full *bher-*/*brigā* naming story integrated
  directly into the "The name" card (etymology pairs for each root, the
  BRE-/-REN combination, and an aside on why an existing Celtic name
  like Lugus or Briga wasn't used) and an oral-to-digital contrast added
  to the philosophy card, translated across all 25 supported languages.
  Replaces the external link to `docs/naming.md` on GitHub.
- `about/index.html` — a "Palette" card between the mark and philosophy
  sections, with light/dark swatch pairs for the mark's own outer/
  middle/inner rampart and hut tones (the established values already
  in `icons/breren-logo.svg`, not the site's Gruvbox interface theme —
  a separate, fixed brand identity), translated across all 25
  supported languages.
- `about/index.html` — dedicated "About Breren" page at
  `breren.com/about`: the *bher-*/*brigā* naming story, a card on the
  castro mark's *brigā* symbolism, and a short philosophy statement,
  translated across all 25 supported languages. Linked from a
  plain-text "About Breren" line in the home page's footer.
- `common.css`, `common.js` — palette, page shell, and the language
  picker/theme toggle toolbar factored out of `index.html` so `about/`
  can share the same look and behavior instead of duplicating it.
- `licenses/index.html` — redirects `breren.com/licenses` to
  `breren.com/licenses/pbl` (meta-refresh + JS, with a plain link
  fallback), so the bare `/licenses` path resolves instead of 404ing.
- A footer with a link to the PayBack License (PBL) 2.0, shown at the
  bottom of the page.
- `licenses/pbl/index.html` — full-viewport iframe wrapper so
  `breren.com/licenses/pbl` shows the license version-history page
  (`ran-n.github.io/doc`) while keeping the `breren.com` URL and
  opening in the same tab, without needing a reverse proxy; hands off
  the visitor's current `breren-lang`/`breren-theme` to the iframe on
  load, matching the Vitralis tile's pattern.
- Vitralis tile — persistent screen overlay for drawing annotations over
  a live desktop; linked to `breren.com/vitralis`, with translations
  across all 25 supported languages.
- `vitralis/index.html` — full-viewport iframe wrapper so
  `breren.com/vitralis` loads the Vitralis site while keeping the
  `breren.com` URL, without needing a reverse proxy; it also
  `postMessage`s the visitor's current `breren-lang`/`breren-theme` to
  the iframe once it loads, so Vitralis opens matching breren's
  language and light/dark mode.
- `icons/breren.ico` — multi-resolution favicon, wired up as an
  `alternate icon` alongside the existing SVG icon for browsers that
  don't support SVG favicons.
- `icons/breren-keepassxc.ico`, `icons/breren-keepassxc.png` — KeePassXC
  entry icon variants of the mark.
- `icons/breren-square.svg`, `icons/breren-square-simple.svg` — square
  crop variants of the mark for use where a square aspect is required.

- `icons/breren-logo-spin.svg` — standalone spinning variant of the
  breren mark for use as a loading indicator: the three ramparts
  rotate in place (alternating direction, doubling speed inward), the
  outer huts orbit the fixed center hut, plus a soft drop shadow,
  light-catching gradients, and a scale/fade entrance.

- Tile icons can now be an image path (svg/png/jpg/webp/gif) instead of
  only an emoji glyph; the renderer swaps in an `<img>` when `icon`
  looks like an image file.

- Optional per-language tile/category translations, keyed by a new
  `id` field on categories/items and stored in `translations.toml`
  (`name_<code>` / `description_<code>`), falling back to the plain
  `name`/`description` in `links.toml` when a language isn't provided.
  Keeps `links.toml` itself free of translation clutter.
- Filled in the example tile's translations for all 25 supported
  languages.

- Light/dark theme toggle (Gruvbox palette), persisted per visitor.
- Localization expanded to 25 languages: the most-spoken languages
  worldwide plus Galego (fallback default) and Esperanto. Replaced the
  button row with a flag + name dropdown; browser-language detection;
  automatic RTL layout for Arabic/Urdu/Persian.
- `index.html` + `links.toml` — a static, GitHub Pages-published link
  dashboard (Heimdall-style tiles). Editing `links.toml` alone updates the
  page; `.nojekyll` added so GitHub Pages serves it as-is.

- Repository scaffold: LICENSE, CHANGELOG, CONTRIBUTING, README, CONTRIBUTORS.
- `docs/naming.md` — name etymology and philosophy.
- `docs/brand-facts.md` — established facts (domain/subdomain scheme,
  package namespace).

### Changed

- Tiles pointing to a same-origin URL (e.g. the Vitralis tile, served
  from `breren.com/vitralis`) now open in the same tab instead of a
  new one; only cross-origin tiles still open in a new tab.
- The header mark now redraws its animation on click (inlined as SVG
  instead of an `<img>` so the animation can be restarted); it ignores
  further clicks until the redraw finishes.
- Tyche's tile now uses its actual app logo (`icons/tyche.svg`) instead
  of a placeholder dice emoji.
- Trimmed `docs/brand-facts.md` and `README.md` to keep the repo
  self-contained and product-agnostic: dropped implementation-level
  details and other-project references, keeping only facts about Breren
  itself.

### Fixed

- `icons/breren-logo-spin.svg` — reduced the drop-shadow's blur radius
  (`stdDeviation` 4 → 1.5) and filter region; at the mark's spinning
  size the wide, soft shadow read as smudging on the strokes, most
  visible on the dark-ground gradient variant where its already-narrow
  tonal range gave the blur little contrast to work against.
- `index.html`, `about/index.html` — the `color-scheme` meta tag alone
  didn't stop the white flash on navigation/reload, since it only
  helps once the browser has actually painted with an opinion about
  the page's theme; the real fix is an inline `<script>`+`<style>`
  pair at the very top of `<head>`, ahead of the external stylesheet,
  that reads `breren-theme`/`prefers-color-scheme` and paints the
  right background synchronously from the HTML itself — no network
  round-trip to `common.css` required before first paint.
- Language picker flags now render as inline SVGs instead of Unicode
  regional-indicator emoji, which several platforms/fonts (notably
  Windows) fail to compose into flag glyphs.

### Removed

- The page footer ("Edit links.toml to change these tiles — no other
  file needs to change") — dropped its markup, styling, and all 25
  per-language strings.
