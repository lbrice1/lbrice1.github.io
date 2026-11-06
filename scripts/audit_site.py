#!/usr/bin/env python3
"""Check a built site (_site) for files and text that should not be published.

Usage: python3 scripts/audit_site.py PATH_TO_BUILT_SITE

Fails (exit 1) when a file falls outside the allowlist or a page contains a forbidden string.
Run it on every build before pushing.
"""
import re
import subprocess
import sys
from pathlib import Path

ALLOW = [
    r"^index\.html$", r"^404\.html$", r"^feed\.xml$", r"^sitemap\.xml$", r"^robots\.txt$", r"^redirects\.json$",
    r"^(about|research|publications|software|teaching|talks|book|contact|news|terms)/index\.html$",
    r"^about\.html$",
    r"^portfolio/(portfolio-[0-2]/)?index\.html$",      # redirect stubs to /software/
    r"^publication/[^/]+(/index\.html|\.html)?$",
    r"^talks/[^/]+(/index\.html|\.html)?$",
    r"^teaching/[^/]+(/index\.html|\.html)?$",
    r"^news/\d{4}/\d{2}/[^/]+/index\.html$",
    r"^assets/css/site\.css$", r"^assets/favicon\.svg$",
    r"^assets/js/(site|listing|pub-graph)\.js$", r"^assets/js/vendor/(d3\.v7\.9\.0\.min\.js|LICENSE-d3\.txt)$",
    r"^assets/fonts/[a-z0-9-]+\.woff2$", r"^assets/fonts/LICENSE-[A-Za-z0-9]+\.txt$",
    r"^images/(portrait\.jpg|9781003455905\.jpg|book-cover-hires\.jpg|abstract\.png|swcomp\.png)$",
]
FORBIDDEN = [
    "Predictive Intelligence", "Under review", "under review", "UCREA", "paper1.pdf",
    "Mukhopahyay", "google-analytics", "googletagmanager", "PlantBench", "plantbench", "Purdue",
    "lbriceno@", "mailto:",
]


REQUIRED = ["index.html", "publications/index.html", "assets/css/site.css", "sitemap.xml"]


def main(root: Path) -> int:
    bad = 0
    for r in REQUIRED:  # an empty or partial build must not pass
        if not (root / r).is_file():
            print(f"MISSING      {r}")
            bad += 1
    for f in sorted(p for p in root.rglob("*") if p.is_file()):
        rel = f.relative_to(root).as_posix()
        if not any(re.match(a, rel) for a in ALLOW):
            print(f"NOT ALLOWED  {rel}")
            bad += 1
        if f.suffix in {".html", ".xml", ".json", ".txt", ".js", ".css"} and "vendor" not in rel:
            text = f.read_text(encoding="utf8", errors="replace")
            for s in FORBIDDEN:
                if s in text:
                    print(f"FORBIDDEN    {rel}: {s!r}")
                    bad += 1
    # Static files are copied from the working tree, which may hold git-ignored files that
    # GitHub Pages will never see. Every copied asset must be tracked.
    tracked = set(subprocess.run(["git", "ls-files"], capture_output=True, text=True,
                                 cwd=Path(__file__).resolve().parents[1]).stdout.split())
    for f in sorted(p for p in root.rglob("*") if p.is_file()):
        rel = f.relative_to(root).as_posix()
        if rel.startswith(("assets/", "images/")) and rel not in tracked:
            print(f"UNTRACKED    {rel}")
            bad += 1
    print(f"{bad} problem(s)")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main(Path(sys.argv[1])))
