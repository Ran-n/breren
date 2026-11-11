[//]: # ( ---------------------------------------------------------------------- )
[//]: # (+ Authors: 	Ran# <ran.hash@proton.me> )
[//]: # (+ Created: 	2026/11/11 11:25:52.068407 )
[//]: # (+ Revised: 	2026/11/11 11:57:36.867232 )
[//]: # ( ---------------------------------------------------------------------- )

# TODO

The backlog. Each item is self-contained: reading it alone is enough to
implement it fully, without asking anything. Work top to bottom unless an item
says otherwise.

Next item number: 2

## Index

1. [Tell avalio lite visitors how to get a licence key](#1-tell-avalio-lite-visitors-how-to-get-a-licence-key)

## Adding an item

- Write for someone who has never seen the conversation: what happens today,
  what should happen instead, and why each non-obvious decision was made.
- Be concrete: real file paths, names, sizes, colours, keys. No open "maybe";
  if the implementer must choose, say how to choose and how to check.
- Use the template below. Implementation is a numbered list of steps in the
  order to do them; Done when is a checklist.
- Number it with "Next item number" above, then increase that number.
- File order is priority: the first item is the next one to do.
- Numbers ascend in file order. Deleting leaves a gap; when adding at the top
  or moving an item breaks the order, renumber every item in file order (from
  the lowest number in use) and update every reference to them.
- Keep the Index in file order: one `<n>. [title](#anchor)` line per item;
  update it whenever an item is added, retitled, moved or deleted.
- Screenshots go in `docs/todo/<n>-<slug>.png`, linked from the item.
- Split anything bigger than one sitting into items that ship alone.

## Implementing an item

1. Read the whole item and every file it names; check `git status` first.
2. If the code has drifted from the item, adapt and note it; if the item
   contradicts a newer decision, ask before building.
3. Do the Implementation steps in order.
4. Write the listed tests, plus any others the change needs.
5. Lint, format, update file headers and run the full test suite until clean.
6. For visible changes, run the app and check it in the states the item names.
7. Update the listed docs; write the changelog line when committing.
8. Tick every Done when line, with evidence.
9. Delete the item, its Index line and its screenshots; add follow-up work as
   new items.

## Template

```markdown
## <n>. <short imperative title>

**Why:** what happens today and what is wrong with it.
**Goal:** the result, as the user will see it.

### Behaviour
- One bullet per case, edge cases included.

### Out of scope
- What this item deliberately doesn't change.

### Implementation
1. `<path>`: what changes and why.

### Tests
- `<test file>`: each case and what it proves.

### Docs
- `<doc file>`: what to change. Changelog: "<line>".

### Done when
- [ ] Checkable result.
```

---

## 1. Tell avalio lite visitors how to get a licence key

**Why:** avalio lite won't run without a licence key (`BRN-XXXX-XXXX-XXXX-XXXX`,
checked against Clavren at `clavren.breren.com`). The download page at
`breren.com/avalio-lite/` ([public/avalio-lite/index.html](public/avalio-lite/index.html))
tells visitors they need one, but not how to get one. Its notes box (under
the download buttons) reads, in English, just "Needs a licence key (BRN-…).",
with no contact address (the support email was removed on purpose). A visitor
downloads the app, gets stopped at the "Enter your licence key" screen, and
has no way forward. The key-getting route was deliberately left off, because
it hadn't been decided yet. It will **not** be "write to support", so don't
put an email address back.

**Blocked until** the owner decides how keys are obtained (for example a
purchase or sign-up page, or keys handed out by a school). Before building,
ask with AskUserQuestion which route it is, and for the exact URL or wording,
unless the decision is already written in the avalio-lite repo's README
("Do I need a licence?" answer) or in the Clavren project. Use the same
wording as the app's README so the two don't disagree.

**Goal:** on the download page, the notes box tells the visitor in one
sentence how to get a key, with a link if there is a page for it, in the
visitor's language. No support email address goes on the page.

### Behaviour
- In every one of the 25 page languages, the notes box says a key is needed
  and how to get one.
- If the route is a web page, it's a real `<a>` link (opens in the same tab
  for a breren.com-family URL, `target="_blank" rel="noopener"` for any other
  site, matching the page's source links). Its link text is translated, and
  the URL is not.
- A phone-width (390 px) layout doesn't scroll sideways; a long URL wraps
  (`.notes a` already has `overflow-wrap: anywhere`).
- Right-to-left languages (ar, ur, fa) still read correctly, with the link
  inside the sentence.

### Out of scope
- How keys are actually sold, issued or checked (that's the Clavren and
  avalio-lite projects).
- The rest of the page (download buttons, screenshots, SmartScreen note).

### Implementation
1. `public/avalio-lite/index.html`, markup: in `<div class="notes">`, put
   the "get a key" sentence in its own `<p>` right after the existing
   `<p id="licence-text"></p>`. If there is a link, use `<p><span
   id="key-text"></span> <a id="key-link" href="<URL>"></a></p>`. A separate
   paragraph avoids word-order problems when splitting a sentence around a
   link.
2. Same file, `STRINGS`: add the new key or keys (for example `keyText`,
   `keyLink`) to **all 25 locales** (gl, en, eo, es, fr, pt, de, it, ru, zh,
   ja, ko, ar, hi, bn, ur, fa, tr, vi, id, th, sw, te, ta, pa). Write real
   translations, not English copies: `t()` silently falls back to Galician
   for a missing key, so a gap wouldn't show as an error. Keep the existing
   `licence` string ("Needs a licence key (BRN-…).") unless the new sentence
   repeats it. In that case merge the two in every locale.
3. Same file, `applyTexts()`: add `'key-text': 'keyText'` (and
   `'key-link': 'keyLink'`) to the `ids` map, so a language switch updates
   them too.
4. Optional, only if the route is short enough to fit: append it to the
   avalio lite tile `description` in `public/links.toml` and to every
   `description_<code>` under `[avalio-lite]` in `public/translations.toml`
   (24 codes, since `en` uses the plain `description`). Skip this if it would
   make the tile noticeably taller than its neighbours on the portal.

### Tests
The repo has no automated suite. Check it in a real browser with Playwright:
serve `public/` (`python -m http.server -d public`), then load
`/avalio-lite/` with `localStorage` `breren-lang` and `breren-theme` preset.
- Every locale: a script reads `STRINGS` from the page and asserts that every
  locale has every key `en` has, so none falls back silently.
- `en` light and `gl` dark at 1100 px: screenshot. The new sentence and link
  appear in the notes box, and the link has the right `href`.
- `ar` at 390 px: screenshot. The text is right-to-left,
  `document.documentElement.scrollWidth <= innerWidth` holds, and the link
  wraps without overflowing.
- Language switch: change the language with the picker, and the new sentence
  changes too (proves the `applyTexts()` mapping).
- Console: no errors or warnings, apart from the GitHub API fallback warning
  when offline.
- If step 4 was done: the portal `/` at 1100 px, en and one other language,
  shows the tile text, and the TOML still parses (`python -c "import
  tomllib; tomllib.load(open('public/translations.toml','rb'))"`).

### Docs
- `CHANGELOG.md`, `[Unreleased]` → `### Changed`: "breren.com/avalio-lite/
  download page now says how to get an avalio lite licence key, in every
  supported language." Run `metadata -m CHANGELOG.md`.

### Done when
- [ ] The key-getting route is confirmed by the owner, or matches the
      avalio-lite README, and the page carries no support email address.
- [ ] All 25 locales have the new string(s); the key-check script passes.
- [ ] en/light, gl/dark and ar/390 px screenshots show the sentence, the link
      and no sideways scroll.
- [ ] Switching languages updates the sentence.
- [ ] CHANGELOG line added; this item and its Index line deleted.
