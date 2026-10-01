# DESIGN.md — Naebi Dynamic Concepts Ltd

The design system for the naebidynamic.com rebuild. It follows the **Naebi Flightpath Brief** (cinematic photography like Joby Aviation, a soft gradient stage and pill buttons like Hyer, stat callouts and an accordion FAQ like Let'sFly), but every colour comes from Naebi's own logo.

> **One rule above all:** the logo is used exactly as supplied (`assets/naebi-logo.png`). Never recolour, crop, stretch, outline, shadow or rebuild it. When the logo is hard to see, change the background behind it. Never change the logo.

---

## 1. The logo

### 1.1 The file

| | |
|---|---|
| File | `assets/naebi-logo.png`, byte-for-byte the file supplied |
| Size | 280 × 296 px PNG with a transparent background |
| Visible artwork | about 197 × 232 px. The file has transparent padding of about 36 px at the top, 24 px at the bottom and 39 px on each side |
| Mark | the "nD" monogram: a navy `n` inside a D with a green gradient (`#88C040` at the top to about `#184830` at the base) |
| Wordmark | "NAEBI DYNAMIC" (bold "NAEBI") over "CONCEPTS LTD", in navy |

Colours sampled from the file: **navy `#0C336C`** (sampled about `#083068`), plus darker navy tones down to `#001838`; **green `#7CB242`** (sampled about `#88C040`), plus darker greens in the gradient.

### 1.2 Why the background matters

The logo has three colour areas: a **navy wordmark and navy `n`**, a **light-to-dark green D**, and **transparent gaps**. The background therefore has to separate itself from both navy and green. These are the measured contrast ratios:

| Logo colour → on background | Ratio | Logo visible? |
|---|---|---|
| Navy `#0C336C` on White `#FFFFFF` | **12.3 : 1** | Yes, the best option |
| Navy on Paper `#F6F7F5` | **11.5 : 1** | Yes |
| Navy on Mist `#E8EEF6` | **10.6 : 1** | Yes |
| Green `#7CB242` on White | 2.5 : 1 | Yes. A large graphic shape needs less contrast than text, and the navy keeps it anchored |
| Navy on Navy Deep `#0F2A45` | **1.19 : 1** | **No.** The wordmark and `n` disappear |
| Navy on Night `#0B0F14` (dark mode) | 1.4 : 1 | **No** |
| Logo over photography | varies | **No.** Never place the logo directly on a photo |

**This gives three rules:**

1. **The logo only sits on White `#FFFFFF`, Paper `#F6F7F5` or Mist `#E8EEF6`.**
2. **On navy, dark or photo backgrounds, the logo goes on a Logo Plate:** a white rounded rectangle (`--logo-plate`: `#FFFFFF`, 12 px radius, padding of at least 12 px, shadow `--shadow-sm`). The transparent-header-over-hero idea in the brief uses this plate. The plate also stays white in dark mode.
3. **Never use a green background behind the logo.** The green D would merge into it.

### 1.3 Size, clear space and placement

| Use | Rendered height of the whole PNG | Notes |
|---|---|---|
| Header (desktop) | 64 px | The "nD" mark is what people recognise at this size. The small wordmark text is only about 4 px tall here, so put "Naebi Dynamic" as live text next to the logo, or leave it out |
| Header (mobile) | 52 px | |
| Loader, footer, About section | 160–200 px | From about 140 px tall upwards, "CONCEPTS LTD" is readable |
| Favicon | Do not shrink the lockup. Request a separate square icon file from the logo source | |

- **Clear space:** keep a gap equal to the height of the "N" in "NAEBI" (about 7% of the logo height) on every side, measured from the visible artwork. The PNG's own padding already gives most of this.
- **Do not upscale:** the file is 280 px wide, so on 2× (retina) screens it starts to blur above about **140 CSS px wide**. For the large loader and footer sizes, ask for the original SVG or a PNG at least 3× larger. When it arrives, replace the file; do not edit it.
- In code: `<img src="assets/naebi-logo.png" alt="Naebi Dynamic Concepts Ltd" width="280" height="296">` sized with `height:` in CSS, `width:auto`, and `object-fit: contain`. **No `filter`, `mix-blend-mode`, `opacity` below 1, or CSS recolouring.**

### 1.4 Don'ts
Do not recolour (including a "white version"); crop to the D alone; add outlines or glows; put it on green, navy or photo backgrounds without the plate; animate the artwork itself (fading in or scaling the whole logo is fine); rotate it; stretch it; or place it beside another logo at the same size.

---

## 2. Colour

Only two brand hues are used: **navy** and **green**. Everything else is neutral. The hues from the reference sites (Joby's blue, Hyer's black) are replaced by Naebi navy and green.

### 2.1 Light theme tokens (default)

| Token | Hex | Role |
|---|---|---|
| `--navy` | `#0C336C` | Primary brand colour: headings, links, solid header, dark bands |
| `--navy-deep` | `#0F2A45` | Darkest bands: pillars, newsletter, footer |
| `--navy-ink` | `#0A1B2E` | Hero overlay base, loader gradient end |
| `--green` | `#7CB242` | Accent: primary buttons, rules, focus ring, icons on dark |
| `--green-ink` | `#4A7A1C` | Green **text** on light backgrounds (5.1 : 1 on white) |
| `--ink` | `#14181F` | Body text |
| `--muted` | `#5B6470` | Secondary text (6.0 : 1 on white) |
| `--paper` | `#F6F7F5` | Page background |
| `--surface` | `#FFFFFF` | Cards, header once scrolled, logo plate |
| `--mist` | `#E8EEF6` | Soft navy tint: the Hyer-style gradient stage, chips |
| `--line` | `#DCE1E6` | Borders and dividers |
| `--on-navy` | `#EAF0F7` | Text on navy (12.7 : 1 on navy-deep) |
| `--on-navy-muted` | `#AAB9CC` | Secondary text on navy (7.3 : 1) |
| `--danger` | `#B4232A` | Form errors (6.5 : 1) |
| `--warning` | `#8A5A00` | Warnings (5.9 : 1) |

### 2.2 Approved pairings

| Text / element | On | Ratio | Use |
|---|---|---|---|
| `--ink` | `--paper` | 16.6 | Body copy |
| `--navy` | `--surface` | 12.3 | Headings, links |
| `--muted` | `--surface` | 6.0 | Captions, meta |
| `--green-ink` | `--surface` | 5.1 | Eyebrows and small labels on light |
| `--on-navy` | `--navy-deep` | 12.7 | Text in dark bands |
| `--green` | `--navy-deep` | 5.8 | Eyebrows, icons and stat labels on dark |
| `--ink` | `--green` | 7.0 | **Primary button label.** Use dark text on green |
| White | `--navy` | 12.3 | Navy button, solid header text |

**Never use:** white text on green (2.5 : 1, fails); `--green` text on white (2.5 : 1, fails, so use `--green-ink`); navy on navy-deep (1.2 : 1).

### 2.3 Dark theme

Dark mode follows `prefers-color-scheme` and can be forced with `[data-theme]`. The **header stays light in dark mode**, or else the logo uses the Logo Plate, because the navy wordmark disappears on dark backgrounds.

| Token | Dark value |
|---|---|
| `--paper` | `#0B0F14` |
| `--surface` | `#111823` |
| `--ink` | `#E7EAEE` |
| `--muted` | `#9AA7B4` |
| `--line` | `rgba(255,255,255,.12)` |
| `--navy` (as a text/link colour) | `#7FA6E0` (7.2 : 1 on surface) |
| `--green` | `#8FCB55` (9.9 : 1 on paper) |
| `--green-ink` | `#8FCB55` |
| `--mist` | `#16202D` |
| `--logo-plate` | `#FFFFFF`, which never changes |

### 2.4 Gradients
- **Loader and page-transition wipe:** `linear-gradient(160deg, #0C336C 0%, #0F2A45 100%)`. The logo is shown on the Logo Plate on top of it.
- **Hero duotone:** photo + `#0C336C` at 55% with `multiply` blending, then `linear-gradient(180deg, rgba(10,27,46,.2), rgba(10,27,46,.75))` so text is readable at the bottom.
- **Hyer-style "stage":** `radial-gradient(120% 80% at 50% 0%, #FFFFFF 0%, #E8EEF6 55%, #F6F7F5 100%)`, a soft navy-tinted backdrop. This is the best place to show the logo large, with no plate needed.

---

## 3. Typography

Two families only.

| Role | Family | Fallback | Weights |
|---|---|---|---|
| Display (headings, stats, buttons) | **General Sans** (Fontshare, free). If the licence allows, **Helvetica Now Display** | `"Helvetica Neue", Arial, sans-serif` | 500, 600, 700 |
| Text (body, UI, eyebrows) | **Inter** (Google Fonts) | `system-ui, -apple-system, "Segoe UI", sans-serif` | 400, 500, 600 |

Geometric, clean sans fonts match the logo's wordmark. Avoid serif fonts.

| Token | Size (mobile → desktop, `clamp`) | Line height | Weight / tracking | Use |
|---|---|---|---|---|
| `--fs-hero` | 44 → 96 px | 1.02 | 700 / -0.02em | Hero headline, `text-wrap: balance` |
| `--fs-h1` | 36 → 64 px | 1.08 | 700 / -0.015em | Page titles |
| `--fs-h2` | 28 → 44 px | 1.12 | 600 / -0.01em | Section titles |
| `--fs-h3` | 20 → 24 px | 1.25 | 600 | Card titles, FAQ questions |
| `--fs-stat` | 44 → 64 px | 1 | 700, `tabular-nums` | Counters |
| `--fs-lead` | 18 → 20 px | 1.55 | 400 | Introductory paragraph |
| `--fs-body` | 16 → 17 px | 1.6 | 400 | Body copy, max-width 64ch |
| `--fs-small` | 14 px | 1.5 | 400 | Meta, captions |
| `--fs-eyebrow` | 12 px | 1.3 | 600 / 0.14em / UPPERCASE | Section kickers |

Eyebrows use a 22 × 2 px green rule before the text (see the brief's kicker style). The ghost "NAEBI" wordmark in the hero uses the display font at `clamp(120px, 22vw, 360px)`, white at 8–20% opacity, cropped by the viewport. This is *typography*, not the logo, so it may be faded.

---

## 4. Space, shape and depth

- **Spacing scale (4 px base):** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Section padding is `clamp(64px, 10vw, 128px)` top and bottom.
- **Container:** max 1200 px with a gutter of `clamp(16px, 4vw, 32px)`. Text measure max 64ch.
- **Grid:** 12 columns on desktop, 6 on tablet, 4 on mobile. 24 px gap.
- **Breakpoints:** 400, 640, 960, 1200.
- **Corner radius:** `--r-sm` 6 px (chips, inputs), `--r-md` 12 px (cards, logo plate, image frames), `--r-lg` 20 px (Let'sFly-style app-frame containers), `--r-pill` 999 px (all buttons).
- **Shadows (navy-tinted, never pure black):**
  - `--shadow-sm: 0 2px 8px rgba(12,51,108,.08)`
  - `--shadow-md: 0 12px 28px rgba(12,51,108,.14)`
  - `--shadow-lg: 0 24px 60px rgba(12,51,108,.20)`
  - In dark mode, replace these with `rgba(0,0,0,.45)`.

---

## 5. Components

### Header / nav (from Joby and Hyer)
- **Over the hero:** transparent bar. The logo sits on the **Logo Plate** (white, 12 px radius, 8–12 px padding) at 52–64 px. Links are white Inter 15/500 with +0.02em tracking.
- **After scrolling 80 px:** the background becomes `--surface` with `--shadow-sm` (150 ms). The logo plate's shadow fades out because the logo now sits directly on white. Links turn `--navy`.
- **Right side:** "Make Payment" as a **primary pill**.
- **Under 960 px:** hamburger menu. The drawer is full height with a `--surface` (white) background, so the logo needs no plate. The CTA is pinned at the bottom, and the phone, email and opening hours go in the drawer footer.
- Do **not** use a navy solid header, because the logo would need the plate permanently. A white solid header is preferred.

### Buttons (Hyer-style pills)
| Variant | Background | Text | Border | Hover |
|---|---|---|---|---|
| Primary | `--green` | `--ink` (7.0 : 1) | none | Background `#8FCB55`, move up 1 px |
| Secondary | `--navy` | `#FFFFFF` | none | Background `#123F82` |
| Outline (on dark/photo) | transparent | `#FFFFFF` | 1.5 px white at 70% opacity | Background white at 10% |
| Text link | none | `--navy` | underline on hover | Arrow moves 4 px |

Height 48 px (40 px for the small size), horizontal padding 24 px, display font 15/600. Focus: a 2 px `--green` outline with a 3 px offset. In dark bands, the focus ring is `--on-navy`.

### Hero (Joby + Hyer)
A full-bleed photo with the navy duotone, the ghost "NAEBI" text behind the headline, the headline at `--fs-hero` in white, a lead paragraph in `--on-navy-muted`, and primary and outline pills. Do **not** put the logo in the hero; the header plate already shows it. The bottom-left status chip has a `--mist` background, `--navy` text and a pulsing green dot.

### Logo stage (Hyer-style, used for About and the loader end state)
A Hyer-style radial stage gradient with the logo centred at 160–200 px and **no plate**. This is the one place the logo appears large, so use a higher-resolution file once you have it.

### Cards
`--surface` background, 1 px `--line` border, `--r-md` radius, padding 24–32 px, and `--shadow-sm`, which rises to `--shadow-md` with a 4 px lift on hover. On a dark band, cards use `rgba(255,255,255,.04)` with a border of `rgba(255,255,255,.1)` and a 48 × 2 px green top rule.

### Stat tiles (Let'sFly)
On a `--navy` band: numbers in `--fs-stat`, white, tabular figures; labels as eyebrows in `--green`. The counter runs once, at 50% of the tile in view. The compliance-rate tile gets a thin green progress ring.

### Partner strip
Six regulator logos (NAMA, ICAO, NNPC, FAAN, IATA, NCAA), greyscale at 60% opacity, full colour on hover. **This treatment is for partner logos only. It never applies to the Naebi logo.**

### FAQ accordion
Max width 720 px. Questions in `--fs-h3` `--navy`. The chevron rotates 180°. Opening is animated with `grid-template-rows` over 250 ms, and only one item is open at a time. Add `aria-expanded` to every toggle.

### Forms
Inputs 48 px tall, 1 px `--line` border, `--r-sm` radius. On focus, the border turns `--green` and the label floats (180 ms). Errors show `--danger` text with an icon and are linked with `aria-describedby`.

### Footer
Background `--navy-deep`. **The logo sits on the Logo Plate** at about 120 px, top left, in the first column. Four columns (Company, Contact, Offices, Social), which become an accordion on mobile. Office chips show coordinates in tabular Inter and the local time. The legal row uses `--on-navy-muted`.

---

## 6. Motion

There is one system with two entrance types:
- **Text:** fade in and move up 24 px (12 px under 640 px), 500 ms, `cubic-bezier(.2,.7,.2,1)`, staggered 80 ms.
- **Photos and cards:** fade in and scale from 0.98 to 1, 600 ms.
- **Loader:** a navy gradient field, the logo on its plate fading from 0 to 1 opacity and scaling from 0.92 to 1, a 2 px green line drawing beneath it, then the panel wiping upwards. Hard limit 2.5 s, and it is skipped on repeat visits.
- **Page transitions:** a navy wipe up from the bottom, under 600 ms in total.
- **`prefers-reduced-motion`:** every transform becomes a 150 ms opacity fade. No parallax, no counting (show the final values), no wipe.

---

## 7. Imagery and icons
- Use Naebi's own crew, cockpit and hangar photos first, then Pexels. Generate images only for wide shots without people. Save as WebP, under 200 KB for hero images.
- Use a cool, slightly desaturated grade so the navy duotone looks natural.
- Image frames: `--r-md` with a 1 px navy border offset 12 px behind the image (the brief's "dossier frame").
- Icons: 1.5 px line icons (Lucide or Phosphor Light), 24 px. `--navy` on light and `--green` on dark.
- **No emoji anywhere.**

---

## 8. Accessibility checklist
- All text meets **WCAG AA** (4.5 : 1 for body, 3 : 1 for large text and UI). Every pairing in §2.2 passes.
- The focus ring is always visible and never removed.
- The logo `alt` text is "Naebi Dynamic Concepts Ltd". The ghost wordmark uses `aria-hidden="true"`.
- Touch targets are at least 44 × 44 px.
- No horizontal scrolling at 320 px wide.
- Check that the logo is visible at every breakpoint, in both themes, at the top of the page and after scrolling.

---

## 9. Drop-in CSS tokens

```css
:root{
  /* brand (from the logo) */
  --navy:#0C336C; --navy-deep:#0F2A45; --navy-ink:#0A1B2E;
  --green:#7CB242; --green-ink:#4A7A1C;
  /* neutrals */
  --ink:#14181F; --muted:#5B6470; --paper:#F6F7F5; --surface:#FFFFFF;
  --mist:#E8EEF6; --line:#DCE1E6;
  --on-navy:#EAF0F7; --on-navy-muted:#AAB9CC;
  --danger:#B4232A; --warning:#8A5A00;
  --logo-plate:#FFFFFF;
  /* type */
  --font-display:"General Sans","Helvetica Neue",Arial,sans-serif;
  --font-text:"Inter",system-ui,-apple-system,"Segoe UI",sans-serif;
  --fs-hero:clamp(44px,8vw,96px); --fs-h1:clamp(36px,5.5vw,64px);
  --fs-h2:clamp(28px,3.8vw,44px); --fs-h3:clamp(20px,2vw,24px);
  --fs-stat:clamp(44px,5.5vw,64px); --fs-lead:clamp(18px,1.6vw,20px);
  --fs-body:clamp(16px,1.2vw,17px); --fs-small:14px; --fs-eyebrow:12px;
  /* shape & depth */
  --r-sm:6px; --r-md:12px; --r-lg:20px; --r-pill:999px;
  --shadow-sm:0 2px 8px rgba(12,51,108,.08);
  --shadow-md:0 12px 28px rgba(12,51,108,.14);
  --shadow-lg:0 24px 60px rgba(12,51,108,.20);
  --ease:cubic-bezier(.2,.7,.2,1);
}
@media (prefers-color-scheme: dark){
  :root:not([data-theme="light"]){
    --paper:#0B0F14; --surface:#111823; --ink:#E7EAEE; --muted:#9AA7B4;
    --line:rgba(255,255,255,.12); --mist:#16202D;
    --navy:#7FA6E0; --green:#8FCB55; --green-ink:#8FCB55;
    --shadow-sm:0 2px 8px rgba(0,0,0,.45); --shadow-md:0 12px 28px rgba(0,0,0,.45);
    --shadow-lg:0 24px 60px rgba(0,0,0,.5);
    /* --logo-plate stays #FFFFFF */
  }
}
:root[data-theme="dark"]{
  --paper:#0B0F14; --surface:#111823; --ink:#E7EAEE; --muted:#9AA7B4;
  --line:rgba(255,255,255,.12); --mist:#16202D;
  --navy:#7FA6E0; --green:#8FCB55; --green-ink:#8FCB55;
  --shadow-sm:0 2px 8px rgba(0,0,0,.45); --shadow-md:0 12px 28px rgba(0,0,0,.45);
  --shadow-lg:0 24px 60px rgba(0,0,0,.5);
}
body{ background:var(--paper); color:var(--ink); font:400 var(--fs-body)/1.6 var(--font-text); }

/* The logo: displayed as-is, never altered */
.logo{ height:64px; width:auto; object-fit:contain; display:block; }
.logo-plate{ background:var(--logo-plate); border-radius:var(--r-md); padding:10px 12px;
             box-shadow:var(--shadow-sm); display:inline-flex; }
@media (max-width:960px){ .logo{ height:52px; } }
```

---

## 10. Notes for this repository
- `index.html`, `style.css` and `main.js` implement this document. The previous Jephthah school site was replaced; `hero-video.mp4` from that site is no longer used.
- Photos: the slots listed in `assets/images/README.md` show a navy brand gradient until the real files are added.
- Placeholders to replace before launch: stat figures (`data-target` in `index.html`), phone and email in the footer, social links, the Make Payment destination, the FAQ answers' specifics, and a mailing service for the newsletter form (validation only for now).
- Fonts: Inter from Google Fonts and General Sans from `api.fontshare.com`, using `font-display: swap`.
- Still needed from the client: the logo as **SVG or a high-resolution PNG**, and a square favicon.
