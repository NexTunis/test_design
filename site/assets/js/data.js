/* Catalogue data for the Dysobay storefront prototype.
 *
 * Photography is the label's own campaign and brand-kit imagery, curated out
 * of `dysobay/` + `uploads/` into `site/media/`. Every piece carries a
 * distinct hero shot — nothing repeats as a lead image, which is the point of
 * a one-of-one label. Prices are AED (Dubai market).
 */
window.DYSOBAY = (function () {
  const M = 'media/';
  const img = (...names) => names.map((n) => M + n);

  /* Collections double as the season filter and the lookbook chapters. */
  const COLLECTIONS = [
    { id: 'disobedience', name: 'Color Disobedience', season: 'SS25', place: 'Milan Fashion Week', note: 'Fearless colour, expressive print, bold silhouette — the collection that put the label on the Milan schedule for a second time.' },
    { id: 'debut', name: 'First Refusal', season: 'FW24', place: 'Milan Fashion Week debut', note: 'The debut. Tailoring cut sharp enough to argue with, shown once and retired.' },
    { id: 'structured-chaos', name: 'Structured Chaos', season: 'FW26', place: 'Milan Fashion Week, third showing', note: 'Order and disorder in the same garment: engineered panels, hand-painted marks, nothing symmetrical twice.' },
    { id: 'atelier', name: 'Atelier Series', season: 'Continuous', place: 'Dubai studio', note: 'Made between shows, in ones. No lookbook, no schedule — the pieces appear when the ateliers finish them.' },
  ];

  const CATEGORIES = ['All', 'Outerwear', 'Tailoring', 'Dresses', 'Shirts', 'Knitwear', 'Trousers', 'Accessories'];

  const P = (o) => o;
  const PRODUCTS = [
    P({ id: 'amara-cape', name: 'Amara Cape', price: 2450, size: 'FR 38', tag: 'New Drop', status: 'in-stock', category: 'Outerwear', collection: 'disobedience', piece: '025 / 1', walked: 'Look 09',
      images: img('look-verdure-01.jpg', 'look-verdure-02.jpg', 'kit-collar-detail.jpg'),
      note: 'A printed cape cut in one continuous panel, finished by hand at the shoulder seam so the print never breaks across the back.',
      material: 'Printed silk twill, 19 momme', lining: 'Bemberg cupro', atelier: 'Atelier Nour, Dubai', hours: 34 }),

    P({ id: 'nuits-blazer', name: 'Nuits Blazer', price: 3100, size: 'FR 40', status: 'in-stock', category: 'Tailoring', collection: 'debut', piece: '004 / 1', walked: 'Look 04',
      images: img('look-noir-02.jpg', 'look-noir-01.jpg', 'kit-collar-label.jpg'),
      note: 'Sharp-shouldered and floor-skimming, built over a boned inner structure so it holds its line without a gram of padding.',
      material: 'Wool-mohair suiting, 320 g', lining: 'Silk habotai', atelier: 'Atelier Nour, Dubai', hours: 52 }),

    P({ id: 'zellige-dress', name: 'Zellige Dress', price: 4200, size: 'FR 36', tag: 'Last Piece', status: 'last-piece', category: 'Dresses', collection: 'disobedience', piece: '019 / 1', walked: 'Look 14',
      images: img('look-eventail-01.jpg', 'look-eventail-02.jpg', 'kit-buttons.jpg'),
      note: 'A tiled silhouette assembled from hand-cut panels — the pattern never repeats across the body, and never will again.',
      material: 'Jacquard cotton-silk', lining: 'Unlined, bound seams', atelier: 'Atelier Rania, Tunis', hours: 71 }),

    P({ id: 'warda-coat', name: 'Warda Coat', price: 5600, size: 'FR 42', status: 'in-stock', category: 'Outerwear', collection: 'structured-chaos', piece: '002 / 1', walked: 'Look 02',
      images: img('look-chrome-01.jpg', 'look-chrome-02.jpg', 'kit-woven-label.jpg'),
      note: 'Coated technical shell with a raw-cut hem. Heavy in the hand, weightless on the shoulder.',
      material: 'Coated nylon, bonded', lining: 'Ripstop', atelier: 'Atelier Nour, Dubai', hours: 46 }),

    P({ id: 'samt-trousers', name: 'Samt Trousers', price: 1950, size: 'FR 38', status: 'in-stock', category: 'Trousers', collection: 'atelier', piece: '041 / 1',
      images: img('look-graffiti-01.jpg', 'look-graffiti-02.jpg', 'kit-hangtag.jpg'),
      note: 'Wide, high-waisted, cut long enough to break over the boot. The painted mark is applied by hand, once, and will not be repeated.',
      material: 'Cotton drill, garment-washed', lining: 'None', atelier: 'Dysobay studio, Dubai', hours: 22 }),

    P({ id: 'lumiere-slip', name: 'Lumière Slip Dress', price: 2800, size: 'FR 36', status: 'sold', category: 'Dresses', collection: 'debut', piece: '011 / 1', walked: 'Look 11',
      images: img('look-motion-01.jpg', 'look-motion-02.jpg', 'kit-collar-detail.jpg'),
      note: 'Sold in Milan the week it walked. The design is retired — this page stays up as a record, not a waitlist.',
      material: 'Silk charmeuse', lining: 'Self', atelier: 'Atelier Rania, Tunis', hours: 28 }),

    P({ id: 'basma-shirt', name: 'Basma Shirt', price: 1400, size: 'FR 40', status: 'in-stock', category: 'Shirts', collection: 'atelier', piece: '048 / 1',
      images: img('kit-shirt-hangtag.jpg', 'kit-collar-label.jpg', 'kit-shirt-tag.jpg'),
      note: 'Poplin, single-needle collar, woven D✕ label at the placket. Shown here with the hangtag it ships on.',
      material: 'Compact cotton poplin, 120s', lining: 'None', atelier: 'Dysobay studio, Dubai', hours: 14 }),

    P({ id: 'rihla-trench', name: 'Rihla Trench', price: 4950, size: 'FR 40', tag: 'New Drop', status: 'in-stock', category: 'Outerwear', collection: 'structured-chaos', piece: '001 / 1', walked: 'Look 01',
      images: img('look-denim-01.jpg', 'look-denim-02.jpg', 'look-denim-03.jpg'),
      note: 'Denim reworked as tailoring — panelled, belted, cut to be worn open. One size, one owner.',
      material: 'Japanese selvedge denim, 13 oz', lining: 'Half-lined, cupro', atelier: 'Atelier Nour, Dubai', hours: 58 }),

    P({ id: 'plume-gown', name: 'Plume Gown', price: 8900, size: 'FR 36', tag: 'Archive', status: 'in-stock', category: 'Dresses', collection: 'disobedience', piece: '021 / 1', walked: 'Look 21',
      images: img('ed-vogue-plume.jpg', 'ed-verdant-plume.jpg', 'kit-swatches.jpg'),
      note: 'Chiffon layered over a hand-dyed under-gown, finished with a feather collar set one quill at a time.',
      material: 'Silk chiffon, ostrich plume', lining: 'Silk organza', atelier: 'Atelier Rania, Tunis', hours: 118 }),

    P({ id: 'cobalt-corset', name: 'Cobalt Corset', price: 3400, size: 'FR 38', status: 'in-stock', category: 'Tailoring', collection: 'disobedience', piece: '017 / 1', walked: 'Look 17',
      images: img('ed-cobalt-back.jpg', 'ed-leaf-cobalt.jpg', 'kit-card-blue.jpg'),
      note: 'Twelve engineered panels, boned in spiral steel, closing on a hand-stitched back seam that is deliberately visible.',
      material: 'Cotton coutil, silk overlay', lining: 'Coutil', atelier: 'Atelier Nour, Dubai', hours: 63 }),

    P({ id: 'citrus-leap', name: 'Citrus Leap Set', price: 3800, size: 'FR 38', status: 'in-stock', category: 'Tailoring', collection: 'disobedience', piece: '013 / 1', walked: 'Look 13',
      images: img('ed-leap-citrus.jpg', 'ed-spectrum-crop.jpg', 'kit-brush-x.jpg'),
      note: 'A two-piece cut for movement — the jacket is drafted from the shoulder blade out, so it opens rather than strains.',
      material: 'Bonded jersey, matte', lining: 'None', atelier: 'Dysobay studio, Dubai', hours: 37 }),

    P({ id: 'ultramarine-coat', name: 'Ultramarine Coat', price: 6400, size: 'FR 40', tag: 'Last Piece', status: 'last-piece', category: 'Outerwear', collection: 'structured-chaos', piece: '006 / 1', walked: 'Look 06',
      images: img('ed-ultramarine-drape.jpg', 'ed-powder-coat.jpg', 'kit-woven-wordmark.jpg'),
      note: 'Floor-length, single-seamed at the back, weighted at the hem so it moves a half-beat behind the wearer.',
      material: 'Double-face wool, 480 g', lining: 'Self-faced', atelier: 'Atelier Nour, Dubai', hours: 74 }),

    P({ id: 'chrome-column', name: 'Chrome Column', price: 5200, size: 'FR 36', status: 'in-stock', category: 'Dresses', collection: 'structured-chaos', piece: '008 / 1', walked: 'Look 08',
      images: img('ed-bazaar-chrome.jpg', 'ed-liquid-chrome.jpg', 'kit-fingerprint.jpg'),
      note: 'Metallised jersey moulded on the stand — the seams follow the body, not a block.',
      material: 'Metallised jersey', lining: 'Power mesh', atelier: 'Atelier Rania, Tunis', hours: 49 }),

    P({ id: 'indigo-plume-jacket', name: 'Indigo Plume Jacket', price: 4600, size: 'FR 38', status: 'in-stock', category: 'Outerwear', collection: 'disobedience', piece: '023 / 1', walked: 'Look 23',
      images: img('ed-indigo-plume.jpg', 'ed-flare-mask.jpg', 'kit-tissue.jpg'),
      note: 'Cropped, structured, collared in dyed marabou. The feathers are set on a detachable band — the jacket reads two ways.',
      material: 'Duchesse satin, marabou', lining: 'Silk twill', atelier: 'Atelier Rania, Tunis', hours: 66 }),

    P({ id: 'coil-knit', name: 'Coil Knit', price: 2200, size: 'FR 38', status: 'in-stock', category: 'Knitwear', collection: 'atelier', piece: '052 / 1',
      images: img('ed-coil-back.jpg', 'ed-ink-coil.jpg', 'kit-woven-label.jpg'),
      note: 'Hand-framed in a single continuous coil, so there is no side seam and no two rows the same tension.',
      material: 'Merino-silk, 3-ply', lining: 'None', atelier: 'Atelier Rania, Tunis', hours: 41 }),

    P({ id: 'lagoon-relief', name: 'Lagoon Relief Coat', price: 7200, size: 'FR 40', tag: 'Archive', status: 'sold', category: 'Outerwear', collection: 'structured-chaos', piece: '012 / 1', walked: 'Look 12',
      images: img('ed-lagoon-relief.jpg', 'ed-thread-map.jpg', 'kit-brush-d.jpg'),
      note: 'Sold from the runway. Relief-printed panels, each pressed once, and a hem that was cut in the room ten minutes before the show.',
      material: 'Relief-printed canvas', lining: 'Cotton drill', atelier: 'Atelier Nour, Dubai', hours: 89 }),

    P({ id: 'fringe-shift', name: 'Fringe Shift', price: 3300, size: 'FR 36', status: 'in-stock', category: 'Dresses', collection: 'disobedience', piece: '027 / 1', walked: 'Look 27',
      images: img('ed-fringe-print.jpg', 'ed-painted-gown.jpg', 'kit-swatches.jpg'),
      note: 'A printed shift cut on the bias and finished with a hand-cut fringe that lengthens toward the back.',
      material: 'Printed viscose crepe', lining: 'None', atelier: 'Dysobay studio, Dubai', hours: 31 }),

    P({ id: 'veil-shirt', name: 'Veil Shirt', price: 1850, size: 'FR 38', status: 'in-stock', category: 'Shirts', collection: 'atelier', piece: '057 / 1',
      images: img('ed-veil-cobalt.jpg', 'ed-scored-portrait.jpg', 'kit-collar-label.jpg'),
      note: 'Two layers of organza over a solid yoke. From the front it is a shirt; from the side it is not.',
      material: 'Silk organza, cotton yoke', lining: 'None', atelier: 'Atelier Rania, Tunis', hours: 26 }),

    P({ id: 'contour-trouser', name: 'Contour Trouser', price: 2100, size: 'FR 40', status: 'in-stock', category: 'Trousers', collection: 'atelier', piece: '060 / 1',
      images: img('ed-contour-figure.jpg', 'ed-atelier-drape.jpg', 'kit-hangtag.jpg'),
      note: 'Drawn on the body in chalk, then drafted from the drawing. The side seam follows the line of the leg, not the grain.',
      material: 'Wool crepe, 260 g', lining: 'Knee-lined', atelier: 'Atelier Nour, Dubai', hours: 29 }),

    P({ id: 'brush-dress', name: 'Brush Dress', price: 4700, size: 'FR 36', tag: 'New Drop', status: 'in-stock', category: 'Dresses', collection: 'structured-chaos', piece: '015 / 1', walked: 'Look 15',
      images: img('ed-brush-motion.jpg', 'ed-ink-coil.jpg', 'kit-brush-x.jpg'),
      note: 'Painted flat, then cut — so the brushstroke lands where it lands and the seams have to accept it.',
      material: 'Hand-painted silk faille', lining: 'Silk habotai', atelier: 'Atelier Rania, Tunis', hours: 68 }),

    P({ id: 'powder-blazer', name: 'Powder Blazer', price: 3600, size: 'FR 42', status: 'in-stock', category: 'Tailoring', collection: 'structured-chaos', piece: '019 / 1', walked: 'Look 19',
      images: img('ed-powder-coat.jpg', 'ed-collage-block.jpg', 'kit-collar-detail.jpg'),
      note: 'Powder-coated hardware, unstructured shoulder, one welt pocket that is deliberately off-axis.',
      material: 'Cotton gabardine', lining: 'Half-lined', atelier: 'Atelier Nour, Dubai', hours: 44 }),

    P({ id: 'collage-jacket', name: 'Collage Jacket', price: 5100, size: 'FR 38', status: 'in-stock', category: 'Outerwear', collection: 'disobedience', piece: '029 / 1', walked: 'Look 29',
      images: img('ed-collage-block.jpg', 'ed-collage-eye.jpg', 'kit-card-orange.jpg'),
      note: 'Assembled from twelve offcuts of earlier collections. Every panel came from a piece that already sold.',
      material: 'Mixed deadstock', lining: 'Pieced cupro', atelier: 'Dysobay studio, Dubai', hours: 55 }),

    P({ id: 'torn-tuxedo', name: 'Torn Tuxedo', price: 6800, size: 'FR 40', tag: 'Last Piece', status: 'last-piece', category: 'Tailoring', collection: 'debut', piece: '007 / 1', walked: 'Look 07',
      images: img('ed-torn-suit.jpg', 'ed-nothing-to-see.jpg', 'kit-woven-wordmark.jpg'),
      note: 'A traditional tuxedo, deconstructed at the lapel and re-joined by hand. The tear is the finish, not a flaw.',
      material: 'Wool barathea, silk lapel', lining: 'Silk twill', atelier: 'Atelier Nour, Dubai', hours: 96 }),

    P({ id: 'coral-knit', name: 'Coral Tangle Knit', price: 2600, size: 'FR 38', status: 'in-stock', category: 'Knitwear', collection: 'atelier', piece: '063 / 1',
      images: img('ed-coral-tangle.jpg', 'ed-thread-map.jpg', 'kit-swatches.jpg'),
      note: 'Crochet worked outward from a single centre point until the yarn ran out. That is where the hem is.',
      material: 'Hand-crochet cotton yarn', lining: 'None', atelier: 'Atelier Rania, Tunis', hours: 84 }),

    P({ id: 'wellDressed-coat', name: 'Well Dressed Coat', price: 4300, size: 'FR 42', status: 'in-stock', category: 'Outerwear', collection: 'atelier', piece: '066 / 1',
      images: img('ed-well-dressed.jpg', 'ed-torn-suit.jpg', 'kit-brush-d.jpg'),
      note: 'A city coat with a slogan sewn into the facing where only the wearer will read it.',
      material: 'Wool herringbone, 400 g', lining: 'Printed cupro', atelier: 'Atelier Nour, Dubai', hours: 51 }),

    P({ id: 'scored-shirt', name: 'Scored Shirt', price: 1650, size: 'FR 40', status: 'in-stock', category: 'Shirts', collection: 'atelier', piece: '069 / 1',
      images: img('ed-scored-portrait.jpg', 'ed-contour-figure.jpg', 'kit-shirt-tag.jpg'),
      note: 'Scored across the yoke and re-bound in contrast thread, so the repair reads as the design.',
      material: 'Cotton poplin, scored', lining: 'None', atelier: 'Dysobay studio, Dubai', hours: 18 }),

    P({ id: 'nine-to-five', name: 'Nine-to-Five Skirt', price: 1750, size: 'FR 38', status: 'in-stock', category: 'Trousers', collection: 'atelier', piece: '072 / 1',
      images: img('editorial-9to5.jpg', 'ed-well-dressed.jpg', 'kit-fingerprint.jpg'),
      note: 'Named for the thing the label was built to leave. Wrapped, buckled, cut to be walked in fast.',
      material: 'Cotton canvas, 320 g', lining: 'None', atelier: 'Dysobay studio, Dubai', hours: 21 }),

    P({ id: 'x-hangtag-scarf', name: 'D✕ Silk Scarf', price: 890, size: '90 × 90 cm', status: 'in-stock', category: 'Accessories', collection: 'atelier', piece: '077 / 1',
      images: img('kit-brush-x.jpg', 'kit-woven-wordmark.jpg', 'kit-barcode.jpg'),
      note: 'The painted ✕, screen-printed once onto silk and hand-rolled at the edge. The registration is off by a millimetre and stays that way.',
      material: 'Silk twill, hand-rolled', lining: 'None', atelier: 'Dysobay studio, Dubai', hours: 9 }),
  ];

  /* ── Lookbook: chapters, not a flat wall of images ─────────────── */
  const LOOKBOOK = [
    { src: M + 'look-denim-02.jpg', caption: 'Structured Chaos — look 01', collection: 'structured-chaos' },
    { src: M + 'look-noir-01.jpg', caption: 'First Refusal — look 04', collection: 'debut' },
    { src: M + 'ed-cobalt-back.jpg', caption: 'Color Disobedience — look 17', collection: 'disobedience' },
    { src: M + 'ed-vogue-plume.jpg', caption: 'Color Disobedience — look 21', collection: 'disobedience' },
    { src: M + 'look-chrome-01.jpg', caption: 'Structured Chaos — look 02', collection: 'structured-chaos' },
    { src: M + 'ed-leap-citrus.jpg', caption: 'Color Disobedience — look 13', collection: 'disobedience' },
    { src: M + 'ed-ultramarine-drape.jpg', caption: 'Structured Chaos — look 06', collection: 'structured-chaos' },
    { src: M + 'look-verdure-01.jpg', caption: 'Color Disobedience — look 09', collection: 'disobedience' },
    { src: M + 'ed-bazaar-chrome.jpg', caption: 'Structured Chaos — look 08', collection: 'structured-chaos' },
    { src: M + 'look-motion-01.jpg', caption: 'First Refusal — look 11', collection: 'debut' },
    { src: M + 'ed-indigo-plume.jpg', caption: 'Color Disobedience — look 23', collection: 'disobedience' },
    { src: M + 'ed-lagoon-relief.jpg', caption: 'Structured Chaos — look 12', collection: 'structured-chaos' },
    { src: M + 'look-eventail-01.jpg', caption: 'Color Disobedience — look 14', collection: 'disobedience' },
    { src: M + 'ed-torn-suit.jpg', caption: 'First Refusal — look 07', collection: 'debut' },
    { src: M + 'ed-brush-motion.jpg', caption: 'Structured Chaos — look 15', collection: 'structured-chaos' },
    { src: M + 'ed-fringe-print.jpg', caption: 'Color Disobedience — look 27', collection: 'disobedience' },
    { src: M + 'ed-veil-cobalt.jpg', caption: 'Atelier Series — 057', collection: 'atelier' },
    { src: M + 'look-graffiti-02.jpg', caption: 'Atelier Series — 041', collection: 'atelier' },
    { src: M + 'ed-powder-coat.jpg', caption: 'Structured Chaos — look 19', collection: 'structured-chaos' },
    { src: M + 'ed-collage-block.jpg', caption: 'Color Disobedience — look 29', collection: 'disobedience' },
    { src: M + 'ed-coil-back.jpg', caption: 'Atelier Series — 052', collection: 'atelier' },
    { src: M + 'ed-liquid-chrome.jpg', caption: 'Structured Chaos — look 08b', collection: 'structured-chaos' },
    { src: M + 'ed-verdant-plume.jpg', caption: 'Color Disobedience — look 21b', collection: 'disobedience' },
    { src: M + 'look-denim-03.jpg', caption: 'Structured Chaos — look 01b', collection: 'structured-chaos' },
    { src: M + 'ed-scored-portrait.jpg', caption: 'Atelier Series — 069', collection: 'atelier' },
    { src: M + 'ed-atelier-drape.jpg', caption: 'Atelier Series — studio', collection: 'atelier' },
    { src: M + 'ed-coral-tangle.jpg', caption: 'Atelier Series — 063', collection: 'atelier' },
    { src: M + 'ed-flare-mask.jpg', caption: 'Color Disobedience — look 23b', collection: 'disobedience' },
    { src: M + 'ed-painted-gown.jpg', caption: 'Structured Chaos — look 15b', collection: 'structured-chaos' },
    { src: M + 'look-noir-02.jpg', caption: 'First Refusal — look 04b', collection: 'debut' },
    { src: M + 'ed-nothing-to-see.jpg', caption: 'First Refusal — backstage', collection: 'debut' },
    { src: M + 'ed-well-dressed.jpg', caption: 'Atelier Series — 066', collection: 'atelier' },
  ];

  const JOURNAL = [
    { id: 'milan-fw26', title: 'Dysobay at Milan Fashion Week', date: 'Sep 2026', read: '6 min', image: M + 'hero-catwalk-poster.jpg',
      excerpt: 'A third showing on the Milan schedule, and the same rule as the first: every look walks once, then it belongs to whoever bought it.' },
    { id: 'color-disobedience', title: 'Notes on Color Disobedience', date: 'Feb 2025', read: '8 min', image: M + 'ed-vogue-plume.jpg',
      excerpt: 'The SS25 collection paired fearless colour combinations with the one-piece rule — a look at why the two ideas cannot be separated.' },
    { id: 'atelier', title: 'Inside the ateliers', date: 'Nov 2024', read: '5 min', image: M + 'ed-atelier-drape.jpg',
      excerpt: 'Every Dysobay piece is built by hand in small tailoring workshops. A look at the people who bring each design to life, one piece at a time.' },
    { id: 'no-restocks', title: 'Why we refuse restocks', date: 'Aug 2026', read: '4 min', image: M + 'kit-barcode.jpg',
      excerpt: 'The maths of never repeating a design, and the three times we were offered enough money to break the rule.' },
    { id: 'deadstock', title: 'Twelve offcuts, one jacket', date: 'Jun 2026', read: '7 min', image: M + 'ed-collage-block.jpg',
      excerpt: 'The Collage Jacket is made entirely from panels of garments that already sold. Here is where each one came from.' },
    { id: 'barcode', title: 'What 4.25.19.15.2.1.25 means', date: 'Apr 2026', read: '3 min', image: M + 'kit-fingerprint.jpg',
      excerpt: 'A barcode is what mass production puts on a garment. Ours points at seven arguments against making one.' },
    { id: 'hand-painted', title: 'Painting flat, then cutting', date: 'Mar 2026', read: '6 min', image: M + 'ed-brush-motion.jpg',
      excerpt: 'Most printed clothing is cut first and printed to fit. We do it the other way round, and the seams have to accept the result.' },
    { id: 'sizing', title: 'On making one size',  date: 'Jan 2026', read: '5 min', image: M + 'kit-swatches.jpg',
      excerpt: 'A single-size garment sounds like a limitation. In an atelier it is the opposite — here is what it buys you.' },
    { id: 'leaving', title: 'Leaving the nine-to-five', date: 'Oct 2024', read: '9 min', image: M + 'editorial-9to5.jpg',
      excerpt: 'Haifa on the decision that started the label, and the two years between quitting and the first Milan show.' },
  ];

  const FAQS = [
    { q: 'Why is every piece one of one?', a: 'We design once and produce once, on purpose. If you own a Dysobay piece, no one else does — that is the whole idea, not a marketing line.' },
    { q: 'Can a sold piece be remade?', a: 'No. Once a piece sells, the design is retired. We will tell you plainly when something is gone for good, and the product page stays up as a record rather than a waitlist.' },
    { q: 'Do you ship outside the UAE?', a: 'Yes — we ship worldwide from Dubai. Express shipping is included on every order; duties and taxes are calculated at checkout for your country so nothing arrives with a bill attached.' },
    { q: 'What sizes do you carry?', a: 'Each piece is made to a single size, listed on its product page in FR sizing. See the size guide to convert it, and write to us if you are between sizes — one free alteration is included with every piece.' },
    { q: 'What is your return policy?', a: 'Because every piece is unique, all sales are final. We would rather answer a fit question before you order than retire a piece to a return shelf, so ask us anything.' },
    { q: 'What does 4.25.19.15.2.1.25 mean?', a: 'It is the manifesto read back as a barcode — one number per idea. A barcode is what mass production puts on a garment; ours points at seven arguments against it.' },
    { q: 'How long does a piece take to make?', a: 'Between 9 and 118 hours depending on the piece — the number is printed on every product page. Nothing is cut before it is drawn, and nothing is finished by machine that should be finished by hand.' },
    { q: 'Can I commission something?', a: 'Yes. Made-to-measure commissions start from a conversation, run 8 to 14 weeks, and produce exactly one garment. Write to us with what you have in mind.' },
    { q: 'Do you offer alterations?', a: 'One alteration is included with every piece, done by the atelier that made it. Ship it back within 60 days and we cover the return.' },
    { q: 'How do I care for a piece?', a: 'Care instructions are specific to each garment and printed on its own page. As a rule: dry-clean the tailoring, hand-wash the knits cold, and never tumble-dry anything we make.' },
    { q: 'Is the piece authenticated?', a: 'Every piece ships with a numbered authenticity card carrying the piece number, the atelier, the hours it took, and the name of the person who finished it.' },
    { q: 'Where are the pieces made?', a: 'In small tailoring ateliers in Dubai and Tunis, named on each product page. We work with the same workshops season after season.' },
  ];

  /* ── Services surfaced on the product page ─────────────────────── */
  const SERVICES = [
    { title: 'Worldwide express shipping', body: 'Included on every order, sent from Dubai within 3–5 working days. Duties and taxes settled at checkout — nothing arrives with a bill attached.', meta: 'Included' },
    { title: 'One alteration, on us', body: 'Sleeve, hem or waist adjusted by the atelier that made the piece. Send it back within 60 days and we cover the shipping both ways.', meta: '60 days' },
    { title: 'Numbered authenticity card', body: 'Piece number, atelier, hours worked and the name of the person who finished it. Registered against your order, not against the design.', meta: 'Every piece' },
    { title: 'Private appointment', body: 'See the piece in the Dubai studio before you decide, or over video with the atelier if you are elsewhere. Book any weekday.', meta: 'By request' },
    { title: 'Made to measure', body: 'Commission something that does not exist yet. 8–14 weeks, one conversation to start, exactly one garment at the end.', meta: 'From 8 weeks' },
    { title: 'Lifetime repair', body: 'We repair anything we made, for as long as we exist. Materials at cost, labour free — a piece that cannot be replaced should not be disposable.', meta: 'Forever' },
  ];

  const MANIFESTO = [
    { n: '4', title: 'Four Foundations of Rebellion', body: 'Reject mass production. Embrace singular creation. Celebrate imperfection. Choose authenticity over approval.' },
    { n: '25', title: 'Against Fifteen Minutes of Fame', body: 'Warhol promised everyone fifteen minutes. We promise you a lifetime of authenticity. Fame fades. We craft for the lifetime.' },
    { n: '19', title: 'Nineteen Out of Twenty', body: 'Almost complete, but beautifully unfinished. Perfection is overrated. We celebrate the authentic incomplete.' },
    { n: '15', title: 'Return to Why', body: 'Why do you dress? Why do you choose? Why do you stand apart? Your clothes should answer.' },
    { n: '2', title: 'The Binary Choice', body: 'Mass or singular. Follow or lead. Safe or fearless. Choose defiance.' },
    { n: '1', title: 'The Singular Truth', body: 'Only one piece exists. Only one you exists. Only one design per creation. Never repeated. Never replicated.' },
    { n: '25y', title: 'The Choice Symbol', body: 'Visually, Y splits into two paths. We are the path less chosen.' },
  ];

  /* Counters for the stats band — value, suffix, label. */
  const STATS = [
    { value: 3, label: 'Milan Fashion Week showings', suffix: '' },
    { value: 28, label: 'Pieces in the current archive', suffix: '' },
    { value: 1, label: 'Of every design ever made', suffix: '' },
    { value: 0, label: 'Restocks, since the first show', suffix: '' },
  ];

  const SIZES = [
    ['FR 36', 'US 4', 'UK 8', 'IT 40', '82', '64', '90'],
    ['FR 38', 'US 6', 'UK 10', 'IT 42', '86', '68', '94'],
    ['FR 40', 'US 8', 'UK 12', 'IT 44', '90', '72', '98'],
    ['FR 42', 'US 10', 'UK 14', 'IT 46', '94', '76', '102'],
    ['FR 44', 'US 12', 'UK 16', 'IT 48', '99', '81', '107'],
  ];

  const AED = (n) => 'AED ' + n.toLocaleString('en-US');
  const collectionOf = (id) => COLLECTIONS.find((c) => c.id === id) || COLLECTIONS[0];

  return { PRODUCTS, LOOKBOOK, JOURNAL, FAQS, CATEGORIES, COLLECTIONS, MANIFESTO, SERVICES, STATS, SIZES, AED, collectionOf, MEDIA: M };
})();
