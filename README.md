# Dysobay

Brand system + storefront for **Dysobay**, the Dubai one-of-one fashion label.
Three things live here:

| Path | What it is |
|---|---|
| [`site/`](site/) | **The storefront.** Static multi-page site — GSAP scroll/photo reveals, Barba.js page transitions, real photography. This is what GitHub Pages serves. |
| [`ui_kits/website/`](ui_kits/website/) | React click-through prototype of the same screens, wired to the design-system components. |
| `components/` · `tokens/` · `guidelines/` · `assets/` | The design system itself — see below. |

## Run it locally

```bash
python3 -m http.server 8000        # from THIS directory, not from site/
# storefront   → http://localhost:8000/site/
# React kit    → http://localhost:8000/ui_kits/website/
```

Serve from the repo root: `site/assets/css/site.css` imports the shared
`tokens/` so there is one source of truth for colour, type and spacing.
Opening `site/index.html` straight off disk works too — Barba stands down on
`file://` (it needs `fetch`) and links fall back to ordinary navigation.

## Deploy (GitHub Pages, free tier)

Settings → Pages → **Source: Deploy from a branch** → `main` / `/ (root)`.
The root `index.html` forwards to the storefront, and `.nojekyll` is what keeps
`_ds_bundle.js` from being swallowed — Jekyll drops every path starting with
`_`, which would 404 the whole React kit. A workflow in
`.github/workflows/pages.yml` covers the "Source: GitHub Actions" setting
instead, if you prefer that one.

## Storefront stack

- **GSAP + ScrollTrigger.** Motion is **section-level**: a section arrives once,
  as one composed move — copy rises, blocks rise, frames unmask — and then holds
  still. Nothing drifts, skews or parallaxes per element while you scroll, which
  is what made cards wobble independently of each other. The only scroll-linked
  things on the page are the pinned hero and the pinned horizontal rail, both of
  which are deliberate full-section moments.
- **Barba.js** — swaps only the page container, so the nav, footer and bag
  count never blink between routes.
- No build step, no framework, no bundler. Every dependency is a CDN `<script>`.
- Degrades all the way down: no JS → plain HTML; reduced-motion → nothing
  animates and nothing stays hidden; `file://` → normal page loads. The hero
  film falls back to the animated GIF if autoplay is refused or the video will
  not decode.

## Pages

`index` · `collections` · `product` · `lookbook` · `manifesto` · `journal` ·
`article` · `about` · `contact` · `cart` · `checkout` · `confirmation` ·
`sizeguide` · `faq` · `wishlist`

There is no search *page* — search is an overlay, opened from the nav icon or
by pressing <kbd>/</kbd> anywhere, with a blurred backdrop and live results.

Notable behaviour:

- **Manifesto** — the barcode *is* the index. One bar per clause; it tracks how
  far you have read and each bar jumps to its clause.
- **Collections** — an auto-moving slider of what is still available (hover to
  slow it), a single row of category chips, and sort plus a Refine disclosure
  holding season, availability and price.
- **Journal** — nine full essays at `article.html?id=…`, not teaser cards.
- **Checkout** — four steps with a live fake card interface; the number is
  Luhn-checked. Nothing is charged and nothing leaves the page.

---

# Dysobay Design System

Dysobay is a Dubai-based, one-of-one fashion label founded by Haifa Ghodhbane. Every design is produced as a single piece — never repeated, never restocked. The brand has shown at Milan Fashion Week three times (debut Sept 2024; "Color Disobedience" SS25; most recent showing). The client's existing store, [website-2-a765da.webflow.io](https://website-2-a765da.webflow.io/), no longer matches this positioning — she wants a full rebuild with a big opening visual and a distinctive voice, inspired by [aavluxurytravel.com](https://www.aavluxurytravel.com/), [falconia-shop.vercel.app](https://falconia-shop.vercel.app/en), [juliaallert.com](https://juliaallert.com/), [nu.com.tr/en-gcc](https://www.nu.com.tr/en-gcc), [schiaparelli.com](https://schiaparelli.com/en), [zandrarhodes.com](https://zandrarhodes.com/news/), [viviennewestwood.com](https://www.viviennewestwood.com/westwood-world/), and [moschino.com](https://www.moschino.com/en-eme) for editorial, full-bleed hero treatment.

Sources used to build this system: the client's own brand kit (logo mark, hangtag/collar-label mockups, manifesto poster, infographic — in `assets/`), her old site's About and Manifesto copy, and her Instagram bio (`@dysobay_`). No design tokens, Figma file, or codebase were provided for Dysobay itself — this system is built from scratch from that material. `NexTunis/test_design` was attached as a codebase but contained no design source to read from.

## Positioning
"Luxury got greedy. Fashion got boring. We opted out. One piece. Sane prices. Zero repeats. Dysobay. Dress accordingly." — Instagram bio. The manifesto ("Not Mass Approved — because the masses never approve of authenticity") argues against mass production, planned obsolescence and trend-chasing; the About page centers Haifa's own story of leaving corporate work to build something singular, made with small tailoring ateliers.

## Content fundamentals
- **Voice**: direct, declarative, second person ("Why do you dress? Your clothes should answer."). Short sentences, no hedging.
- **Casing**: sentence case in body copy; the manifesto poster uses full caps for emphasis lines only.
- **Numbers as symbols**: the manifesto assigns a number to each idea (4 foundations, 25 = Warhol's 15-minutes riff inverted, 19/20, 2 = binary choice, 1 = singular truth) and reads them back as a "barcode" — `4.25.19.15.2.1.25` — a private coordinate system, not a real product barcode.
- **No emoji.** No filler adjectives ("luxurious", "premium") — claims are concrete (Milan Fashion Week dates, "one design, one piece").
- **AED pricing** for the Dubai market; product names are French/Arabic-inflected single words (Amara, Nuits, Zellige) rather than descriptive names.

## Visual foundations
- **Palette**: the client's raw kit is a saturated orange + cobalt blue + black graffiti-brush mark on white. For the rebuild we kept the same two hues but desaturated them into a quiet, editorial register (`--clay`, `--denim`) so the site reads as quiet luxury day-to-day, with the bold brand kit reserved for the Manifesto page and packaging/tag moments — see `guidelines/colors-*.html`.
- **Type**: Ibarra Real Nova (display serif, editorial) for headlines and product names; Public Sans (body/UI). Gochi Hand stands in for the brand's hand-brushed marks — used sparingly, one accent per screen, never for body copy. **Font substitution flag**: no font files were supplied, so all three are close Google Fonts matches. If Haifa has the actual brush typeface or a licensed serif, send the files and we'll swap them in `tokens/typography.css`.
- **Imagery**: full-bleed, single hero image or video on entry (per her request); editorial fashion photography, not lifestyle/stock. She provided ~180 reference images to Claude; most were saturated fashion-editorial moodboard photography (magazine covers, professional campaign shots) rather than her own product photography — those are copyrighted third-party editorial work, so they are **not included** in this system. What we did copy in are her own brand-kit assets: the logo mark, hangtag/collar-label mockups, the manifesto poster and infographic (`assets/`). Product photography throughout the UI kit uses drag-and-drop placeholders — drop Haifa's real garment photos in when ready.
- **Motifs**: a barcode standing for mass production, crossed out by a hand-painted "X" — the brand's core visual argument (individuality vs. the mass market). Used as a rare accent (Manifesto page, hangtags), never as a repeating background pattern.
- **Corners & borders**: sharp, mostly 0–4px radius; hairline 1px borders in `--line`; no drop shadows on cards, a soft `--shadow-md` only on floating UI (search overlay, toasts).
- **Motion**: fast, restrained — 150–280ms ease-out fades and slides. No bounce, no parallax gimmicks.
- **Hover/press**: ink buttons darken slightly; outlined buttons invert (fill ink, text goes paper); no color-shift gimmicks.

## Iconography
No icon font or SVG icon set was provided. The system uses plain type (×, →, +) for the few affordances that need them (remove-from-bag, expand) rather than a drawn icon set — keeps with the brand's typographic, hand-marked identity. If Haifa wants a proper UI icon set, Lucide (stroke-based, matches the brush-mark line weight) is the recommended CDN substitute — flagged here, not yet added.

## Contents
- `tokens/` — colors, typography, spacing (imported by `styles.css`)
- `guidelines/` — color/type/spacing specimens + brand-mark reference cards
- `assets/` — client-provided logo mark, barcode, manifesto poster/infographic, packaging mockups
### Components
- `components/core/` — **Button**, **Input**, **Tag**
- `components/navigation/` — **NavBar**, **Footer**
- `components/commerce/` — **ProductCard**, **PriceTag**
- `components/feedback/` — **StatusBadge**
- `ui_kits/website/` — the full storefront: Home, Manifesto, About, Collections, Product, Cart, Checkout confirmation, Lookbook, Size Guide, FAQ, Journal, Search, Wishlist, Contact — all with realistic AED fake data
- `SKILL.md` — portable skill file for Claude Code

## Caveats — please help us iterate
- **Fonts are Google Fonts substitutes**, not Haifa's real brush typeface. Send font files if she has them licensed.
- **No real product photography** is in the system — every image is a placeholder. The moodboard photos she sent are third-party editorial work we couldn't reuse.
- **Hero video**: the homepage hero is built for a full-bleed video but currently shows a placeholder — send the actual campaign video/reel.
- We picked a "hybrid" tone (quiet layouts, rebellious moments) and a muted palette per your answers — flag if any page swings too far either way.
