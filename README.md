[//]: # ( ---------------------------------------------------------------------- )
[//]: # (+ Authors: 	Ran# <ran.hash@proton.me> )
[//]: # (+ Created: 	2026/07/21 16:57:59.586825 )
[//]: # (+ Revised: 	2026/07/21 17:38:29.358702 )
[//]: # ( ---------------------------------------------------------------------- )

# Breren

**"A foundation that carries what matters forward."**

Breren builds digital tools around the preservation, creation, and
extension of human capability through software.

## Link dashboard

This repo is published via GitHub Pages as a small link dashboard (in the
style of Heimdall/Homer). Edit [links.toml](links.toml) to add, remove,
or reorder tiles — `index.html` reads it at load time, so no other file
needs to change.

- **Theme** — light/dark toggle in the top-right corner (Gruvbox
  palette); follows the system preference until you override it, then
  remembers your choice.
- **Language** — a flag + name dropdown covering the most-spoken
  languages worldwide, plus Galego (first/fallback default) and
  Esperanto. Detects the browser's language on first visit, falling back
  to Galego; the switcher remembers an explicit choice afterwards. RTL
  languages (Arabic, Urdu, Persian) flip the page direction
  automatically. UI copy lives in `index.html`'s `LANGUAGES`/`STRINGS`
  objects — add a language by adding an entry to both. Tile content in
  `links.toml` itself is not translated.

## Docs

- [docs/naming.md](docs/naming.md) — the name's etymology and philosophy
  (Proto-Indo-European *bher-*, Proto-Celtic *brigā*)
- [docs/brand-facts.md](docs/brand-facts.md) — established facts: domain
  scheme, email infrastructure, package namespace, products

## License

[PayBack License (PBL)](LICENSE)
