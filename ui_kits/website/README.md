# Dysobay Storefront UI Kit

Click-through recreation of the Dysobay e-commerce site, built from the client's brand kit, About page, manifesto and Instagram bio (see the root `README.md`). Routing is hash-based (`#collections`, `#product?id=amara-cape`, …) — use the "Prototype nav" strip in the bottom-right corner to jump between screens, or click through the nav and product cards naturally.

Screens: Home, Manifesto, About, Collections, Product detail, Cart, Checkout confirmation, Lookbook, Size Guide, FAQ, Journal, Search, Wishlist, Contact.

Serve it from the **repo root** (`python3 -m http.server 8000` → `/ui_kits/website/`) so `../../styles.css` and `../../site/media/` resolve.

Fake data lives in `data.js` — realistic AED pricing, Dubai/Milan-appropriate product names, and photography paths pointing at `site/media/` (the label's own campaign shots and brand-kit mockups). Every image is still an `<image-slot>`, so any of them can be replaced by dropping a file onto it; `src` is only the starting photo.

For the production-intent build of the same site — real page transitions (Barba.js), scroll and photo reveals (GSAP), no React — see [`site/`](../../site/).
