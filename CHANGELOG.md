[//]: # ( ---------------------------------------------------------------------- )
[//]: # (+ Authors: 	Ran# <ran.hash@proton.me> )
[//]: # (+ Created: 	2026/07/21 16:57:59.658784 )
[//]: # (+ Revised: 	2026/07/22 12:53:35.646788 )
[//]: # ( ---------------------------------------------------------------------- )

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

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

- The header mark now redraws its animation on click (inlined as SVG
  instead of an `<img>` so the animation can be restarted); it ignores
  further clicks until the redraw finishes.
- Tyche's tile now uses its actual app logo (`icons/tyche.svg`) instead
  of a placeholder dice emoji.
- Trimmed `docs/brand-facts.md` and `README.md` to keep the repo
  self-contained and product-agnostic: dropped implementation-level
  details and other-project references, keeping only facts about Breren
  itself.

### Removed

- The page footer ("Edit links.toml to change these tiles — no other
  file needs to change") — dropped its markup, styling, and all 25
  per-language strings.
