[//]: # ( ---------------------------------------------------------------------- )
[//]: # (+ Authors: 	Ran# <ran.hash@proton.me> )
[//]: # (+ Created: 	2026/07/21 16:57:59.658784 )
[//]: # (+ Revised: 	2026/08/04 20:48:13.450461 )
[//]: # ( ---------------------------------------------------------------------- )

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- `about/index.html` — the mark card now shows the reveal animation on
  both a fixed light and a fixed dark ground side by side (forced
  colors, independent of the page's own theme toggle or the OS
  preference). Click either to replay the draw-in reveal; double-click
  to switch it to the `breren-logo-spin.svg` loading-indicator variant.
  Each lockup renders into its own shadow root so the two copies' CSS
  classes and `@keyframes` (identical between the two, since they're
  fetches of the same source files) can't collide and steal each
  other's in-flight animation. Captions translated across all 25
  supported languages.
- `about/index.html` — the full *bher-*/*brigā* naming story integrated
  directly into the "The name" card (etymology pairs for each root, the
  BRE-/-REN combination, and an aside on why an existing Celtic name
  like Lugus or Briga wasn't used) and an oral-to-digital contrast added
  to the philosophy card, translated across all 25 supported languages.
  Replaces the external link to `docs/naming.md` on GitHub.
- `about/index.html` — a "Palette" card between the mark and philosophy
  sections, with swatches for the Gruvbox background, card, accent, and
  ink colors, translated across all 25 supported languages.
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

- Language picker flags now render as inline SVGs instead of Unicode
  regional-indicator emoji, which several platforms/fonts (notably
  Windows) fail to compose into flag glyphs.

### Removed

- The page footer ("Edit links.toml to change these tiles — no other
  file needs to change") — dropped its markup, styling, and all 25
  per-language strings.
