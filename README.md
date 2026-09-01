# SmileLab — Dentist Template

A playful-clinical dental site. One reusable static template: every client-specific value lives in `assets/js/data.js`, nothing else changes per client.

Built from two references: the blue SmileLab concept (playful, oversized tooth, lime badge) and a luxury clinic site (large portrait, serif accent), then revised against a written design review.

---

## Run it

```bash
cd dentist
npx --yes http-server -p 8080   # or python -m http.server 8080
# http://localhost:8080
```

Don't open it over `file://` — `data.js` is loaded as a script and the images are relative.

---

## For a new client — mostly just `assets/js/data.js`

| Field | What to change |
|---|---|
| `name`, `tagline`, `city` | Clinic name |
| `phone`, `phoneRaw`, `whatsapp` | `whatsapp` = country code + number, no `+` and no spaces (`923001234567`) |
| `emergency` | After-hours number + the note under it |
| `address`, `mapQuery` | `mapQuery` is what gets searched on Google Maps |
| `socials`, `googleReviewsUrl` | **Point `googleReviewsUrl` at the clinic's real Google listing** |
| `hero.line1/2/3` | Three lines. `line3` renders in italic serif |
| `photos` | See below |
| `whyUs` | Four trust factors |
| `services` | `n`, title, text and `slug` if that service has its own page. **`price` is kept in the data but is not shown** — the site deliberately quotes nothing before a check-up. To show prices again, restore the `svc__p` block in `app.js` |
| `results` | Before/after — see below |
| `clinic.facts` / `.credentials` | Authority numbers and qualifications |
| `faq` | The FAQ accordion — this is most of the page's SEO |
| `stats`, `process`, `reviews`, `hours` | Straight content |

Also update `<title>`, `<meta name="description">` and `<link rel="canonical">` in `index.html` — those aren't driven by JS.

---

## ⚠️ Photos

The **review avatars are still Pexels demo images, hotlinked**. For a real client:

1. Get the client's own photos (or shoot the clinic)
2. Put them in `assets/img/`
3. Point the `photos` object at local paths:

```js
photos: {
  heroResult:   'assets/img/hero-before-after.webp',  // the hero cut-out
  patientWoman: 'assets/img/avatar-1.jpg',
  avatar1:      'assets/img/avatar-2.jpg',
  avatar2:      'assets/img/avatar-3.jpg',
  avatar3:      'assets/img/avatar-4.jpg'
}
```

`heroResult` is the hero image — a **before/after pair in one file, with a transparent background**. It renders with nothing behind it, so a supplied image that still has its own backdrop will look like a pasted rectangle. Same rule as the slider below: this one is a sample, not a patient of this clinic. Swap it.

**Never ship hotlinked stock on a live client site.** It's slow, and the people in those photos are not that clinic's patients.

The dentist section has **no photograph** — it runs as two text columns (bio + numbers on the left, qualifications on the right). A stock photo of some other dentist there is worse than none.

---

## ⚠️ Before / after — read this before delivering

The slider ships with `assets/img/case-1-before.webp` / `case-1-after.webp` — a **sample pair, not a patient of this clinic**, and the caption on the page says so. It is there to show the slider working, nothing more.

Swap it before any site goes live. Presenting a stock or generated face as one patient's real "before and after" is fabricated clinical evidence — that gets a dentist in trouble with the PMDC, not just with visitors.

When the clinic gives you real case photos (with the patient's written consent, which they need anyway), overwrite those two files or repoint them:

```js
results: {
  real: true,
  beforeImg: 'assets/img/case-1-before.webp',
  afterImg:  'assets/img/case-1-after.webp',
  caption:   'Composite veneers, upper six. Treated over two visits.',
  ...
}
```

The wipe runs **vertically** — before on top, after below, drag the handle up and down. The two files are the top and bottom halves of one stacked photograph, which is why they line up exactly. Both images must be the **same crop, framing and angle** or the wipe looks wrong. The box is `2 / 1` (`.ba` in `style.css`) to match one half; change the ratio if yours differ.

If `real` is false or either path is missing, the slider removes itself rather than showing a placeholder.

**Scroll — don't undo this.** A vertical wipe travels in the same direction a finger scrolls, and the two can't be told apart mid-gesture. So:

- `.ba` is `touch-action: pan-y`, never `none` — the page stays scrollable over the slider
- on touch, only `.ba__knob` starts a drag (`app.js` section 6 checks `knob.contains(e.target)`); it is the one element with `touch-action: none`
- mouse and pen still grab anywhere on the box

Setting `touch-action: none` on `.ba` makes the page impossible to scroll past on a phone. That bug has been fixed once already.

---

## Service pages

`services/dental-implants.html` is a working sample: sub-hero, breadcrumbs, the procedure explained, what the quote covers, a step-by-step, its own FAQ, `MedicalProcedure` schema, and a CTA.

It's what lets the site rank for **"dental implants Lahore"** rather than only the clinic name.

To add another, copy that file, change the copy, and set the matching `slug` in `data.js`:

```js
{ n: "03", title: "Braces & Aligners", ..., slug: "services/braces.html" }
```

A service with `slug: null` stays as a row on the homepage with no link.

Each new page needs its own `<title>`, `<meta description>` and `<link rel="canonical">`. It reuses `../assets/css/style.css` and has a small inline binder instead of the full `app.js`.

---

## Responsive

Verified at 320 / 390 / 768 / 900 / 901 / 1024 / 1180 / 1440 — **`scrollWidth === viewport` at every one**, no horizontal overflow anywhere, and the `h1` height scales smoothly across all of them (no surprise extra line). `body { overflow-x: hidden }` is a seatbelt, not the fix; don't let it hide a real overflow.

| Breakpoint | What changes |
|---|---|
| ≤ 940px | Nav collapses into the **burger** (`.burger` + `app.js` §11) |
| ≤ 900px | Hero stacks — copy above, cut-out below and centred |
| ≤ 900px | `.results`, `.doc`, `.book` go single column |
| ≤ 860px | Services drop to number + body; `.proc` to 2 columns |
| ≤ 720px | Sticky **call bar** appears; footer goes single column |
| ≤ 700px | Hero stops reserving `80svh` and sizes to its content |
| ≤ 620px | Nav "Contact" button hidden (call bar covers it); CTA button full width; slider knob and tags shrink |
| ≤ 520px | `.proc` and the form rows go single column |
| ≤ 420px | Tighter card padding, smaller logo, wrapping hours |
| landscape, ≤ 560px tall | Hero drops its min-height so it isn't taller than the screen |

Notes worth keeping:

- **`--r-xl` / `--r-lg` / `--r-md` are `clamp()`s.** A fixed 44px corner is most of a 360px card's width and reads as a blob.
- **`.hero` sets `min-height` twice** — `vh` then `svh`. `svh` ignores the mobile toolbar so the hero doesn't jump as the address bar collapses; the `vh` line is the fallback for browsers without it.
- **The burger menu is a flex item on its own row**, not an overlay — opening it pushes the hero body down. No fixed positioning, no scroll lock, nothing to get stuck.
- **The mobile nav exists on the service sub-page too**, wired in that page's inline binder. Copy that block into any new sub-page or its menu will be unopenable below 940px.
- **Grids use `minmax(min(260px, 100%), 1fr)`.** Plain `minmax(260px, 1fr)` overflows a 320px screen.
- **The `<p>` inside `.svc` is not a grid item** — it lives in `.svc__body`. Place the wrapper, not the paragraph.

---

## Design tokens

| | |
|---|---|
| Lime | `#D9F25E` |
| Sky (hero card) | `#4E9BD6` |
| Ink | `#0A2337` |
| Page gradient | green-yellow → blue, `--grad` |
| Display + body | Outfit (700/800) |
| Accent italic | Bodoni Moda |

All in `:root` in `assets/css/style.css`. Deliberately a single-look design — no dark mode.

---

## The hero

A single **cut-out** — the before/after pair with a transparent background — sitting straight on the blue gradient. No card, no plate, no shadow box: the only lift is a `drop-shadow()` filter, which follows the alpha silhouette rather than drawing a rectangle.

Because it is a cut-out, the file **must** keep its alpha. `.hero__photo img` uses `height: auto` and no `object-fit`, so whatever ratio you supply is what renders — don't hand it an image with a baked-in background.

There is **no caption** under the hero image — the `<figcaption>` and `hero.photoCaption` were both removed. The image is centred vertically in the hero (`align-self: center`).

**The bottom is faded, not shadowed.** The cut-out ends on a hard horizontal crop across the shirts. A `drop-shadow()` traces that straight edge and paints a visible bar under it, so `.hero__photo img` uses a `mask-image` gradient instead and the figures dissolve into the blue. If you swap in a subject that doesn't reach the bottom of its frame, drop the mask.

Trim any empty transparent band off all four sides before shipping: with the image centred, dead space inside the file reads as the figure sitting off-centre.

There is no 3D object and no Three.js. The earlier version had a procedural molar here; it was removed.

---

## Image formats

All three images are **WebP** (~75–190KB each). The hero one carries an **alpha channel**; the two slider halves are opaque photographs. WebP alpha is supported by every browser since Safari 14 / Firefox 65.

Regenerating from a transparent PNG:

```bash
ffmpeg -i in.png -c:v libwebp -pix_fmt yuva420p -q:v 80 -compression_level 6 out.webp
```

`-pix_fmt yuva420p` is the part that keeps transparency. Without it the background comes back as **black**.

---

## Structure

```
dentist/
├── index.html
├── services/
│   └── dental-implants.html   sample service page
├── assets/
│   ├── css/style.css
│   ├── img/
│   │   ├── hero-before-after.webp ⬅ hero, transparent cut-out ] sample images —
│   │   ├── case-1-before.webp     ⬅ slider, top half          ] SWAP before
│   │   └── case-1-after.webp      ⬅ slider, bottom half       ] delivery
│   └── js/
│       ├── data.js            ⬅ the file you edit per client
│       └── app.js
└── README.md
```

## What's on the page

- Hero: a full-bleed before/after cut-out on the blue, no card behind it
- "Why patients choose us" — four trust factors
- Services as an editorial list with **no prices** — the note explains the quote comes in writing after the check-up
- Vertical before/after slider on close-up case photographs
- Dentist profile — no stock portrait, just hard numbers and full credentials
- Four-step process starting with one WhatsApp message
- Reviews + a link out to the real Google listing
- Seven-question FAQ accordion
- Two repeated CTA bands
- Four-field booking form → straight to WhatsApp, **no backend**
- Emergency after-hours line
- Map that only takes scroll after you click it
- Sticky WhatsApp button + mobile call bar
- Fully responsive, respects `prefers-reduced-motion`

## Deploy

Static — free on Cloudflare Pages, Netlify or Vercel. Only cost is the domain (~Rs 3,500/year).
