#!/usr/bin/env python3
"""
Generate _publications markdown files from ref.bib.
"""
import re
import os
from pathlib import Path
from datetime import datetime

ROOT = Path(__file__).resolve().parents[1]
BIB = ROOT / "ref.bib"
OUT_DIR = ROOT / "_publications"

# Basic bibtex entry parser (not full-featured) to extract entries and fields
entry_re = re.compile(r"@(?P<type>\w+)\{(?P<key>[^,]+),\s*(?P<body>.*?)\n\}\s*", re.S)
field_re = re.compile(r"(?P<name>\w+)\s*=\s*\{(?P<value>.*?)\}\s*,?", re.S)


def slugify(s: str) -> str:
    s = s.lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = re.sub(r"-+", "-", s)
    s = s.strip("-")
    return s[:60]


def parse_bib(bibtext: str):
    entries = []
    for m in entry_re.finditer(bibtext):
        etype = m.group('type')
        key = m.group('key').strip()
        body = m.group('body')
        fields = {}
        for fm in field_re.finditer(body):
            name = fm.group('name').lower()
            value = fm.group('value').strip().replace('\n', ' ')
            fields[name] = value
        entries.append({'type': etype, 'key': key, 'fields': fields})
    return entries


def format_authors(a: str) -> str:
    # naive split on ' and '
    parts = [p.strip() for p in re.split(r"\s+and\s+", a) if p.strip()]
    # remove \textbf{} and braces
    parts = [re.sub(r"\\textbf\{([^}]+)\}", r"\1", p) for p in parts]
    parts = [p.replace('{', '').replace('}', '') for p in parts]
    return ', '.join(parts)


def choose_date(fields: dict) -> str:
    year = fields.get('year', '').strip()
    month = fields.get('month', '').strip()
    day = fields.get('day', '').strip()
    if not year:
        year = '1900'
    # try parse month as name or number
    if month:
        try:
            m = int(month)
            month_str = f"{m:02d}"
        except ValueError:
            try:
                m = datetime.strptime(month[:3], '%b').month
                month_str = f"{m:02d}"
            except Exception:
                month_str = '01'
    else:
        month_str = '01'
    day_str = f"{int(day):02d}" if day.isdigit() else '01'
    return f"{year}-{month_str}-{day_str}"


def build_front_matter(entry):
    f = entry['fields']
    title = f.get('title', '').replace('{', '').replace('}', '')
    authors = format_authors(f.get('author', f.get('editor', '')))
    date = choose_date(f)
    venue = f.get('journal') or f.get('booktitle') or f.get('publisher') or f.get('howpublished', '')
    if venue:
        venue = venue.replace('{', '').replace('}', '')
    doi = f.get('doi')
    url = ''
    if doi:
        url = f'https://doi.org/{doi}'
    elif 'url' in f:
        url = f['url']

    slug = slugify(title)
    filename = f"{date}-{slug}.md"

    excerpt = f.get('abstract', '')
    if not excerpt:
        # make a short one-line excerpt from title
        excerpt = title

    citation = f"{authors}\n{venue} {date.split('-')[0]}"
    if 'volume' in f:
        citation += f" {f['volume']}"
    if 'pages' in f and f['pages']:
        citation += f", {f['pages']}"

    fm = {
        'title': title,
        'collection': 'publications',
        'permalink': f"/publication/{date}-{slug}",
        'excerpt': excerpt,
        'date': date,
        'venue': venue,
        'paperurl': url,
        'citation': citation
    }
    return filename, fm


def write_md(filename, fm):
    out_path = OUT_DIR / filename
    if out_path.exists():
        print(f"Skipping existing {out_path}")
        return False
    content_lines = ["---"]
    for k, v in fm.items():
        content_lines.append(f"{k}: '{v}'")
    content_lines.append("---\n")
    content_lines.append("")
    out_path.write_text('\n'.join(content_lines), encoding='utf8')
    print(f"Wrote {out_path}")
    return True


def main():
    txt = BIB.read_text(encoding='utf8')
    entries = parse_bib(txt)
    created = []
    for e in entries:
        filename, fm = build_front_matter(e)
        ok = write_md(filename, fm)
        if ok:
            created.append(filename)
    print('\nCreated files:')
    for c in created:
        print(c)


if __name__ == '__main__':
    OUT_DIR.mkdir(exist_ok=True)
    main()
