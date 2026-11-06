# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy", "matplotlib"]
# ///
"""Generate the abstract SVG artwork: the home banner and the four research-theme motifs.

Usage: uv run scripts/make_art.py

Writes _includes/banner.svg and _includes/motifs/{hybrid,plant,cluster,cell}.svg.
Colors are not set here: the SVGs use CSS classes (art-*) defined in assets/css/site.css,
so the artwork follows the light and dark themes. Output is deterministic (fixed seeds).
"""
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt  # noqa: E402
import numpy as np  # noqa: E402

ROOT = Path(__file__).resolve().parents[1]
INC = ROOT / "_includes"


def path_d(xy, closed=False):
    pts = " ".join(f"{x:.1f} {y:.1f}" for x, y in xy)
    return f"M{pts}{' Z' if closed else ''}"


def smooth_d(xy):
    """Catmull-Rom spline through the points, as cubic Bezier segments."""
    p = np.asarray(xy, float)
    p = np.vstack([p[0], p, p[-1]])
    out = [f"M{p[1][0]:.1f} {p[1][1]:.1f}"]
    for i in range(1, len(p) - 2):
        c1 = p[i] + (p[i + 1] - p[i - 1]) / 6
        c2 = p[i + 1] - (p[i + 2] - p[i]) / 6
        out.append(f"C{c1[0]:.1f} {c1[1]:.1f} {c2[0]:.1f} {c2[1]:.1f} {p[i + 1][0]:.1f} {p[i + 1][1]:.1f}")
    return "".join(out)


def svg(cls, vb, body, extra=""):
    return (f'<svg class="{cls}" viewBox="{vb}" {extra}aria-hidden="true" focusable="false">\n'
            + "\n".join(body) + "\n</svg>\n")


# ---------------------------------------------------------------- banner
def banner():
    W, H = 1200, 280
    x = np.linspace(0, W, 400)
    y = np.linspace(0, H, 120)
    X, Y = np.meshgrid(x, y)

    def f(X, Y):
        g = lambda cx, cy, sx, sy, a: a * np.exp(-((X - cx) ** 2 / (2 * sx**2) + (Y - cy) ** 2 / (2 * sy**2)))
        return (g(930, 150, 150, 90, -1.0) + g(1110, 60, 90, 60, 0.55) + g(700, 230, 120, 70, 0.45)
                + g(800, 40, 110, 60, -0.35) + 0.00035 * (X - 900) + 0.0006 * (Y - 140))

    Z = f(X, Y)
    cs = plt.contour(X, Y, Z, levels=np.linspace(Z.min() + 0.03, Z.max() - 0.03, 22))
    body = []
    for level, segs in zip(cs.levels, cs.allsegs):
        for s in segs:
            if len(s) < 8:
                continue
            xm = float(np.mean(s[:, 0]))
            op = np.clip((xm - 380) / 520, 0.0, 1.0)  # fade toward the text on the left
            if op < 0.05:
                continue
            body.append(f'<path class="art-line" stroke-opacity="{0.25 + 0.75 * op:.2f}" d="{path_d(s[::2])}"/>')
    plt.close("all")

    # A descent path from a start on the rim to the minimum: the search.
    gy, gx = np.gradient(Z, y, x)
    p = np.array([1120.0, 232.0])
    traj = [p.copy()]
    for _ in range(400):
        i = int(np.clip(np.searchsorted(y, p[1]), 0, len(y) - 1))
        j = int(np.clip(np.searchsorted(x, p[0]), 0, len(x) - 1))
        step = -np.array([gx[i, j], gy[i, j]])
        n = np.linalg.norm(step)
        if n < 1e-6:
            break
        p = p + 9 * step / n * min(1.0, n * 2500)
        traj.append(p.copy())
        if np.linalg.norm(traj[-1] - traj[-2]) < 0.6:
            break
    traj = np.array(traj)
    body.append(f'<path class="art-line art-line--accent" stroke-dasharray="2 5" d="{path_d(traj)}"/>')
    for k in range(0, len(traj), max(1, len(traj) // 9)):
        body.append(f'<circle class="art-dot art-dot--accent" cx="{traj[k, 0]:.1f}" cy="{traj[k, 1]:.1f}" r="2.6"/>')
    end = traj[-1]
    body.append(f'<circle class="art-ring" cx="{end[0]:.1f}" cy="{end[1]:.1f}" r="9"/>')
    body.append(f'<circle class="art-dot art-dot--accent" cx="{end[0]:.1f}" cy="{end[1]:.1f}" r="4.5"/>')

    # Sparse observations scattered over the landscape.
    rng = np.random.default_rng(7)
    for _ in range(26):
        px, py = rng.uniform(560, 1190), rng.uniform(12, 268)
        op = np.clip((px - 520) / 400, 0.2, 0.9)
        body.append(f'<circle class="art-dot" cx="{px:.1f}" cy="{py:.1f}" r="1.9" fill-opacity="{op:.2f}"/>')

    return svg("banner__art", f"0 0 {W} {H}", body, 'preserveAspectRatio="xMaxYMid slice" ')


# ---------------------------------------------------------------- motifs (160 x 96)
def hybrid():
    rng = np.random.default_rng(3)
    model = lambda t: 52 - 30 * np.sin(t / 30) * np.exp(-t / 240) - 0.05 * t
    t = np.linspace(8, 152, 60)
    body = []
    # Envelope from constraints: continues where there are no data.
    for off in (-12, 12):
        body.append(f'<path class="art-line art-line--soft" stroke-dasharray="2 4" d="{smooth_d(np.c_[t, model(t) + off])}"/>')
    td = np.sort(rng.uniform(10, 92, 16))
    for a, b in zip(td, model(td) + rng.normal(0, 3.2, td.size)):
        body.append(f'<circle class="art-dot" cx="{a:.1f}" cy="{b:.1f}" r="2.4"/>')
    body.append(f'<path class="art-line art-line--accent art-line--bold" d="{smooth_d(np.c_[t, model(t)])}"/>')
    body.append('<path class="art-line art-line--soft" d="M96 10V86"/>')
    return svg("motif", "0 0 160 96", body)


def plant():
    cx, cy = 80, 48
    body = [f'<ellipse class="art-line art-line--soft" stroke-dasharray="3 4" cx="{cx}" cy="{cy}" rx="72" ry="42"/>']
    for k, a0 in enumerate(np.linspace(0, 2 * np.pi, 9)[:-1]):
        th = np.linspace(0, 3.2 * np.pi, 120)
        r = np.exp(-th / 4.2)
        xs = cx + 62 * r * np.cos(a0 + th)
        ys = cy + 34 * r * np.sin(a0 + th)
        cls = "art-line art-line--accent" if k == 2 else "art-line"
        op = "" if k == 2 else ' stroke-opacity="0.55"'
        body.append(f'<path class="{cls}"{op} d="{smooth_d(np.c_[xs, ys][::3])}"/>')
        body.append(f'<circle class="art-dot{" art-dot--accent" if k == 2 else ""}" cx="{xs[0]:.1f}" cy="{ys[0]:.1f}" r="2.2"/>')
    body.append(f'<circle class="art-ring" cx="{cx}" cy="{cy}" r="6"/>')
    body.append(f'<circle class="art-dot art-dot--accent" cx="{cx}" cy="{cy}" r="2.8"/>')
    return svg("motif", "0 0 160 96", body)


def cluster():
    body = []
    cols, rows, s, g = 14, 8, 8, 2.6
    x0 = (160 - (cols * s + (cols - 1) * g)) / 2
    y0 = (96 - (rows * s + (rows - 1) * g)) / 2
    for i in range(rows):
        for j in range(cols):
            wave = 0.5 + 0.5 * np.sin(j * 0.55 - i * 0.7)
            x, y = x0 + j * (s + g), y0 + i * (s + g)
            if wave > 0.86:
                body.append(f'<rect class="art-cell art-cell--accent" x="{x:.1f}" y="{y:.1f}" width="{s}" height="{s}" rx="1.6" fill-opacity="{0.45 + 0.55 * (wave - 0.86) / 0.14:.2f}"/>')
            else:
                body.append(f'<rect class="art-cell" x="{x:.1f}" y="{y:.1f}" width="{s}" height="{s}" rx="1.6" fill-opacity="{0.15 + 0.55 * wave:.2f}"/>')
    return svg("motif", "0 0 160 96", body)


def cell():
    body = []
    gap_y, mx = 48, 80
    for k, y0 in enumerate(np.linspace(14, 82, 9)):
        xs = np.linspace(6, 154, 80)
        # Streamlines pinch toward the gap at the membrane, then spread again.
        pinch = np.exp(-((xs - mx) / 26) ** 2)
        ys = y0 + (gap_y - y0) * pinch * 0.86
        cls = "art-line art-line--accent" if k == 4 else "art-line"
        op = "" if k == 4 else f' stroke-opacity="{0.35 + 0.4 * (1 - abs(k - 4) / 4):.2f}"'
        body.append(f'<path class="{cls}"{op} d="{smooth_d(np.c_[xs, ys][::4])}"/>')
    body.append(f'<path class="art-membrane-line" d="M{mx} 4V{gap_y - 7}M{mx} {gap_y + 7}V92"/>')
    for x in (34, 62, 98, 128):  # particles on the central streamline, crossing the membrane
        body.append(f'<circle class="art-dot art-dot--accent" cx="{x}" cy="{gap_y}" r="2.4"/>')
    return svg("motif", "0 0 160 96", body)


if __name__ == "__main__":
    (INC / "motifs").mkdir(parents=True, exist_ok=True)
    (INC / "banner.svg").write_text(banner())
    for name, fn in [("hybrid", hybrid), ("plant", plant), ("cluster", cluster), ("cell", cell)]:
        (INC / "motifs" / f"{name}.svg").write_text(fn())
    print("wrote banner and 4 motifs")
