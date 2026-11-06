# lbrice1.github.io

Source of the personal website of Luis A. Briceno-Mena, published at <https://lbrice1.github.io> by GitHub Pages (legacy build from `master`, `github-pages` gem).

The site uses its own Jekyll layouts and a single stylesheet; there is no gem theme. Fonts (Inter, Source Serif 4) and d3 are self-hosted, so pages make no third-party requests.

## Layout of the repository

| Path | Content |
|---|---|
| `_config.yml` | site settings, author profile links, collections, plugins |
| `_data/navigation.yml` | top navigation |
| `_data/themes.yml` | research themes: card text on the home page, sections on `/research/` |
| `_data/topics.yml` | topic keys, labels, and colors for tags, filters, and the graph view |
| `_pages/` | home, about, research, publications, software, teaching, talks, book, contact, news, privacy |
| `_publications/`, `_talks/`, `_teaching/` | one Markdown file per item |
| `_posts/` | news items (`date_format` sets how the date is shown; `link` points to the item) |
| `_layouts/`, `_includes/` | templates; SVG artwork in `_includes/banner.svg` and `_includes/motifs/` |
| `assets/css/site.css` | all styles, with light and dark tokens |
| `assets/js/` | theme toggle and menu (`site.js`), listing filter (`listing.js`), graph view (`pub-graph.js`) |
| `ref.bib`, `scripts/` | publication sources and maintenance scripts; excluded from the build |

## Adding a publication

1. Add the entry to `ref.bib`.
2. Run `python3 scripts/generate_publications.py`. It writes a file in `_publications/` for each entry that has none and skips existing files.
3. Edit the new file: keep journal articles, books, and chapters only (talks belong in `_talks/`), write `citation` in APA form, and add `topics` from `_data/topics.yml`.

Only published work goes into `ref.bib` or the site. The repository is public, including its history.

## Local preview

The GitHub Pages gem set needs a newer Ruby than macOS ships, so the preview runs in Docker:

```bash
docker run --rm -p 4000:4000 -v "$PWD":/srv -w /srv ruby:3.3 \
  bash -c 'bundle install && bundle exec jekyll serve --host 0.0.0.0'
```

Then open <http://localhost:4000>.

## Checks before pushing

```bash
bundle exec jekyll build             # or the Docker command above with `jekyll build`
python3 scripts/audit_site.py _site  # every file on the allowlist; no forbidden strings
```

`scripts/audit_site.py` fails when the build contains a file outside its allowlist or a forbidden string, such as unpublished titles or a plain email address. Extend the allowlist when a new kind of page is added.
