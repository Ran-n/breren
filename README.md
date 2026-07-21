[//]: # ( ---------------------------------------------------------------------- )
[//]: # (+ Authors: 	Ran# <ran.hash@proton.me> )
[//]: # (+ Created: 	2026/07/21 16:57:59.586825 )
[//]: # (+ Revised: 	2026/07/21 17:16:21.481688 )
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
- **Language** — Galego (default), English, Esperanto; the switcher
  remembers your choice too. UI copy lives in `index.html`'s `STRINGS`
  object — add a language by adding an entry there and to
  `SUPPORTED_LANGS`/`LANG_LABELS`. Tile content in `links.toml` itself is
  not translated.

## Docs

- [docs/naming.md](docs/naming.md) — the name's etymology and philosophy
  (Proto-Indo-European *bher-*, Proto-Celtic *brigā*)
- [docs/brand-facts.md](docs/brand-facts.md) — established facts: domain
  scheme, email infrastructure, package namespace, products

## License

[PayBack License (PBL)](LICENSE)
