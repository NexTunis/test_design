/* Catalogue data for the Dysobay storefront prototype.
 *
 * Photography is the label's own campaign and brand-kit imagery, curated out
 * of `dysobay/` + `uploads/` into `site/media/`. Every piece carries a
 * distinct hero shot — nothing repeats as a lead image, which is the point of
 * a one-of-one label. Prices are AED (Dubai market).
 */
window.DYSOBAY = (function () {
  const M = 'media/';

  /* Average colour per photograph. A frame paints its picture's own tone the
     instant layout happens, so a slow connection shows the composition rather
     than a blank box the colour of the page. */
  const TONE = {"ctx-exhibition.jpg":"#697a9b","ctx-interior.jpg":"#83644c","ctx-sketches.jpg":"#c3c0b7","ctx-venue-01.jpg":"#667779","ctx-venue-02.jpg":"#6b758e","ctx-venue-03.jpg":"#868b83","ctx-workshop-01.jpg":"#795d53","ctx-workshop-02.jpg":"#71645d","ctx-workshop-03.jpg":"#5e5042","ed-atelier-drape.jpg":"#baa8a2","ed-bazaar-chrome.jpg":"#8d6469","ed-brush-motion.jpg":"#b5b7b6","ed-cobalt-back.jpg":"#4f2e65","ed-coil-back.jpg":"#804522","ed-collage-block.jpg":"#643886","ed-collage-eye.jpg":"#b07d68","ed-contour-figure.jpg":"#cbb2a2","ed-coral-tangle.jpg":"#847074","ed-flare-mask.jpg":"#833c28","ed-fringe-print.jpg":"#bb9b93","ed-indigo-plume.jpg":"#7d2e21","ed-ink-coil.jpg":"#c1bec1","ed-lagoon-relief.jpg":"#8f92a4","ed-leaf-cobalt.jpg":"#28323f","ed-leap-citrus.jpg":"#324482","ed-liquid-chrome.jpg":"#a37655","ed-nothing-to-see.jpg":"#a17a60","ed-painted-gown.jpg":"#cec0bf","ed-powder-coat.jpg":"#bac5c3","ed-scored-portrait.jpg":"#a3a29c","ed-spectrum-crop.jpg":"#85615f","ed-spray-mark.jpg":"#eec8b0","ed-thread-map.jpg":"#caaead","ed-torn-suit.jpg":"#c15f73","ed-ultramarine-drape.jpg":"#ab4e6a","ed-veil-cobalt.jpg":"#b2b4c6","ed-verdant-plume.jpg":"#a08c84","ed-vogue-plume.jpg":"#a04f2c","ed-well-dressed.jpg":"#867f72","editorial-9to5.jpg":"#9a9086","hero-catwalk-poster.jpg":"#9fa09c","hero-runway-poster.jpg":"#6f6857","hero-runway-wide-poster.jpg":"#241b14","kit-barcode-alt.jpg":"#fdfdfd","kit-barcode.jpg":"#cfcfd0","kit-box-01.jpg":"#bd9d98","kit-box-02.jpg":"#c6c1cf","kit-box-03.jpg":"#d7c6c3","kit-box-open.jpg":"#c6988c","kit-brush-d.jpg":"#ed8a6e","kit-brush-x.jpg":"#9faee0","kit-buttons.jpg":"#c6c3c6","kit-card-blue.jpg":"#5766e0","kit-card-orange.jpg":"#ce836f","kit-collar-detail.jpg":"#e1dedb","kit-collar-label.jpg":"#e2dfde","kit-envelope.jpg":"#858286","kit-fingerprint.jpg":"#d5c9f8","kit-hangtag.jpg":"#d0c8d3","kit-invoice.jpg":"#0b0c14","kit-logo-nma.jpg":"#2e2130","kit-shirt-hangtag.jpg":"#e2e0de","kit-shirt-tag.jpg":"#e1dfdd","kit-swatches.jpg":"#a7acc2","kit-thankyou.jpg":"#211f58","kit-tissue.jpg":"#a3a4b4","kit-tote-blue.jpg":"#c2bfd1","kit-tote-stripe.jpg":"#d5c5c4","kit-tote.jpg":"#d1b7bb","kit-wordmark-vertical.jpg":"#eda084","kit-woven-dx.jpg":"#e2d4cf","kit-woven-label.jpg":"#e2d4cf","kit-woven-wordmark.jpg":"#d0c8ca","kit-x-blue.jpg":"#a4abdc","kit-x-mark.jpg":"#a194b7","look-chrome-01.jpg":"#1f3a87","look-chrome-02.jpg":"#e0dfde","look-denim-01.jpg":"#e3e3e5","look-denim-02.jpg":"#df7d36","look-denim-03.jpg":"#e4e3e4","look-eventail-01.jpg":"#bc774e","look-eventail-02.jpg":"#d8c1c2","look-graffiti-01.jpg":"#bcbaba","look-graffiti-02.jpg":"#d2d5dd","look-motion-01.jpg":"#2344a2","look-motion-02.jpg":"#f1f0f0","look-noir-01.jpg":"#233f8a","look-noir-02.jpg":"#aba9a9","look-verdure-01.jpg":"#c98355","look-verdure-02.jpg":"#d7d7d4","portrait-haifa.jpg":"#c8c5bc","poster-infographic.jpg":"#191315","poster-manifesto.jpg":"#180d0a"};
  const toneOf = (src) => TONE[src.split('/').pop()] || '#e6e0d6';
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

    P({ id: 'rayures-tote', name: 'Rayures Tote', price: 1250, size: '38 × 34 cm', tag: 'New Drop', status: 'in-stock', category: 'Accessories', collection: 'atelier', piece: '081 / 1',
      images: img('kit-tote-stripe.jpg', 'kit-tote-blue.jpg', 'kit-x-blue.jpg'),
      note: 'Woven in the house stripe and finished with the painted ✕ — applied once, by hand, so the registration is a millimetre out and stays that way.',
      material: 'Woven cotton canvas, leather handles', lining: 'Unlined', atelier: 'Dysobay studio, Dubai', hours: 11 }),

    P({ id: 'dx-cardholder', name: 'D✕ Card Holder', price: 640, size: '10 × 7 cm', status: 'in-stock', category: 'Accessories', collection: 'atelier', piece: '084 / 1',
      images: img('kit-card-orange.jpg', 'kit-card-blue.jpg', 'kit-woven-dx.jpg'),
      note: 'Four card slots, one painted mark, no logo stamp. The colour is whichever of the two the studio had open that week.',
      material: 'Vegetable-tanned calf', lining: 'Suede', atelier: 'Dysobay studio, Dubai', hours: 6 }),

    P({ id: 'barcode-scarf', name: 'Barcode Scarf', price: 780, size: '140 × 24 cm', status: 'last-piece', tag: 'Last Piece', category: 'Accessories', collection: 'atelier', piece: '087 / 1',
      images: img('kit-barcode-alt.jpg', 'kit-barcode.jpg', 'kit-wordmark-vertical.jpg'),
      note: 'The barcode that is not a barcode, printed the full length of a narrow silk stole and hand-rolled at both ends.',
      material: 'Silk twill, hand-rolled', lining: 'None', atelier: 'Atelier Rania, Tunis', hours: 13 }),
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
    { src: M + 'ctx-workshop-01.jpg', caption: 'Atelier Series — the Tunis workshop', collection: 'atelier' },
    { src: M + 'ctx-workshop-02.jpg', caption: 'Atelier Series — cutting floor', collection: 'atelier' },
    { src: M + 'ctx-sketches.jpg', caption: 'Structured Chaos — first drawings', collection: 'structured-chaos' },
    { src: M + 'ctx-venue-01.jpg', caption: 'First Refusal — the venue, Milan', collection: 'debut' },
    { src: M + 'ctx-interior.jpg', caption: 'First Refusal — front of house', collection: 'debut' },
    { src: M + 'ed-spray-mark.jpg', caption: 'Color Disobedience — print study', collection: 'disobedience' },
    { src: M + 'kit-tote-stripe.jpg', caption: 'Atelier Series — 081', collection: 'atelier' },
    { src: M + 'ctx-exhibition.jpg', caption: 'Atelier Series — exhibition, Lisbon', collection: 'atelier' },
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
    { id: 'leaving', title: 'Leaving the nine-to-five', date: 'Oct 2024', read: '9 min', image: M + 'portrait-haifa.jpg',
      excerpt: 'Haifa on the decision that started the label, and the two years between quitting and the first Milan show.' },
    { id: 'venue', title: 'Choosing a room, not a runway', date: 'Jul 2026', read: '5 min', image: M + 'ctx-venue-01.jpg',
      excerpt: 'Three shows, three rooms that were not built for fashion. What a disused space does to twelve garments that only exist once.' },
    { id: 'drawing', title: 'The drawing has to be right', date: 'May 2026', read: '6 min', image: M + 'ctx-sketches.jpg',
      excerpt: 'With no second sample, the sketch stops being a suggestion. A look at what changes when you cannot iterate.' },
    { id: 'pricing', title: 'What a one-of-one costs', date: 'Dec 2025', read: '7 min', image: M + 'kit-invoice.jpg',
      excerpt: 'Every price on this site is hours multiplied by a rate, plus materials. Here is the whole calculation, with nothing removed.' },
  ];


  /* Full article bodies — the journal is a real read, not three teaser cards. */
  const ARTICLE_BODIES = {
    'milan-fw26': [
      ['p', 'The third time you show in Milan, nobody asks whether you meant it any more. They ask what you are going to do differently. The honest answer, for us, was nothing: the rule that made the first show worth watching is the rule that made this one worth watching, and it does not get easier to keep.'],
      ['p', 'Twelve looks walked. Twelve garments existed. When the last model came off the runway there was no second set in a van outside, no size run waiting in a warehouse in Prato, no reorder window for the buyers who came backstage. What walked is what there was.'],
      ['q', 'A show is not a catalogue. It is the only time these twelve things will ever be in the same room.'],
      ['h', 'What that costs'],
      ['p', 'It costs the thing every young label is told it cannot afford to lose: leverage. A buyer who loves look 07 cannot place an order for thirty of them, so the conversation ends with a piece rather than a contract. We have had that conversation eleven times now, and eleven times we have said no, and each time it has been the correct answer for slightly different reasons.'],
      ['p', 'The first reason is arithmetic. Producing thirty of look 07 means finding a factory that will cut thirty, which means grading the pattern, which means the garment that walked stops being the garment you receive. The second reason is the one that actually matters: the person who bought look 07 bought the fact that nobody else has it. Selling twenty-nine more would be taking that back.'],
      ['h', 'The ateliers'],
      ['p', 'Two workshops made this collection — one in Al Quoz, one outside Tunis — and between them eleven people. The hours are printed on every product page because they are the real price of the thing: a coat that took seventy-four hours is not expensive, it is accurately costed.'],
      ['p', 'That number is also the honest ceiling on how much we can make. There is no version of Dysobay that grows by making the same coat faster. It grows, if it grows, by making a different coat next time.'],
    ],
    'color-disobedience': [
      ['p', 'Colour is the fastest way to be told you have gone too far. It is also, in a room full of black tailoring, the fastest way to be seen. Spring/Summer 25 leaned entirely on the second fact and simply accepted the first.'],
      ['p', 'The palette came from the brand kit rather than a trend forecast: a saturated orange and a cobalt blue that had been sitting on hangtags and packaging since before there was a collection. Putting them on a garment was less a decision than an admission.'],
      ['q', 'Fearless colour and one-of-one production are the same argument made twice.'],
      ['h', 'Why the two ideas cannot be separated'],
      ['p', 'A colour combination that half the room dislikes is commercially irrational at scale and completely rational at a scale of one. You are not trying to find a thousand people who will wear acid green against fuchsia. You are trying to find the one who has been waiting for it.'],
      ['p', 'That is the whole economic case for one-of-one production, and colour is where it shows most plainly. Every mass-market palette is a compromise between the people who would love it and the people who would merely tolerate it. Remove the second group and the compromise disappears.'],
      ['h', 'The pieces'],
      ['p', 'Nine of the twenty-nine looks from that season are still in the archive. The Amara Cape prints across one continuous panel so the pattern never breaks at the shoulder. The Zellige Dress is assembled from hand-cut tiles that do not repeat anywhere on the body — a thing you can only do once, because the second one would not match the first.'],
    ],
    atelier: [
      ['p', 'The word atelier does a lot of unearned work in fashion copy. In our case it means two rented rooms, eleven people, four industrial machines, and a kettle that has outlived three of the machines.'],
      ['p', 'Nour runs the Dubai workshop. She trained on bridalwear, which is the only part of the industry that still routinely makes one of something, and it shows in how she thinks about structure: everything is built from the inside, and the outside is the last thing that happens.'],
      ['q', 'If the inside is right, the outside has nowhere else to go.'],
      ['h', 'Rania, and the hours'],
      ['p', 'Rania\u2019s workshop outside Tunis does the hand-work — the crochet, the feather-setting, the pieces where the number of hours stops being a cost line and becomes the actual product. The Coral Tangle Knit took eighty-four hours and was worked outward from a single centre point until the yarn ran out. That is where the hem is. There was no pattern.'],
      ['p', 'We print the hours on every product page for a reason that has nothing to do with marketing. A garment that took eighty-four hours cannot be discounted in a sale without insulting the person who made it, so publishing the number removes the option.'],
      ['h', 'What one-of-one does to a workshop'],
      ['p', 'It removes the worst part of the job. Nobody in either room has cut the same panel four hundred times. The trade-off is that nothing gets easier through repetition, and the first version is the only version, so the drawing has to be right before the scissors come out.'],
    ],
    'no-restocks': [
      ['p', 'Three times we have been offered enough money to break the rule. The number went up each time. The answer did not.'],
      ['h', 'The arithmetic'],
      ['p', 'A restock is the single highest-margin thing a fashion label can do. The pattern exists, the fabric is sourced, the workshop knows the make, the photography is shot, the demand is proven. Every fixed cost has already been paid by the first run. Refusing it is refusing the only free money in the industry.'],
      ['p', 'We refuse it because the first buyer paid for something specific, and it was not just cloth. It was the fact that the design stops with them. Reissuing the piece would be quietly repossessing the thing they actually bought.'],
      ['q', 'The second one is not a second one. It is a different object, and it makes the first one into a first edition — which is not what anybody was sold.'],
      ['h', 'What we do instead'],
      ['p', 'When a piece sells, the pattern goes in an envelope with the piece number on it and the page stays up as a record rather than a waitlist. If enough people write in about a retired design, that tells us something about the next one, not about the last one.'],
      ['p', 'It is a slower business. It is also the only version of this business that means anything.'],
    ],
    deadstock: [
      ['p', 'The Collage Jacket is made entirely of panels cut from garments that already sold. Twelve of them. Every offcut in it is the leftover from a piece that has an owner.'],
      ['h', 'Where each panel came from'],
      ['p', 'The right front is barathea from the Torn Tuxedo. The left sleeve is the coated shell from the Warda Coat, which is why it reads matte where everything else reads dry. The back yoke is denim from the Rihla Trench. The under-collar is the last of the silk faille that the Brush Dress was painted on, which means it carries about four centimetres of a brushstroke that finishes somewhere else entirely.'],
      ['q', 'It is the only garment we make that could not have been designed before the others existed.'],
      ['h', 'Why not just buy fabric'],
      ['p', 'Because the interesting constraint is not sustainability, although the jacket is that too. It is that the panels are fixed. You cannot order another metre. The pattern has to be drawn around what is physically on the table, which produces seams in places no pattern-cutter would choose and a garment that could not be repeated even if we wanted to.'],
      ['p', 'Every collection since has kept its offcuts in a labelled box. There will be another one.'],
    ],
    barcode: [
      ['p', 'A barcode is what mass production puts on a garment. It is the point at which a thing stops being a thing and becomes a row in an inventory system. Ours reads 4.25.19.15.2.1.25, and it is not scannable, because there is nothing to scan.'],
      ['h', 'Seven numbers'],
      ['p', 'Four foundations of rebellion. Twenty-five, against Warhol\u2019s fifteen minutes. Nineteen out of twenty — almost complete, deliberately unfinished. Fifteen, the return to why. Two, the binary choice. One, the singular truth. And twenty-five again, as Y: the letter that splits into two paths.'],
      ['q', 'Seven arguments against making a barcode, arranged as one.'],
      ['h', 'Why put it on the hangtag'],
      ['p', 'Because the hangtag is exactly where the real barcode would go, and a joke that lands in the correct place is worth more than a joke that lands anywhere else. It is printed, crossed through by hand in blue, and it is the only mark on the garment that is not a size or a fibre content.'],
      ['p', 'On the manifesto page the barcode is the index: one bar per clause, tracking how far you have read. It is the most functional the motif has ever been.'],
    ],
    'hand-painted': [
      ['p', 'Most printed clothing is cut first and printed to fit. The print is drawn to the pattern, so the motif lands where the designer decided it should land, on every single unit, forever.'],
      ['p', 'We do it the other way round. The cloth is painted flat, as a painting, and then the pattern is laid over it and cut. Wherever the brushstroke falls is where the brushstroke is.'],
      ['q', 'The seams have to accept the result. That is the whole method.'],
      ['h', 'What goes wrong'],
      ['p', 'A great deal. A stroke that reads beautifully on the flat can vanish into a side seam or land squarely on a bust dart. Twice we have re-cut a whole garment because the composition died the moment it went onto a body, and re-cutting means the painting is gone — you cannot paint the same one again.'],
      ['h', 'What it buys'],
      ['p', 'A garment where the decoration is genuinely unrepeatable rather than nominally limited. The Brush Dress has a stroke that runs off the hem and does not resolve. On a second one it would resolve somewhere else, which is another way of saying there cannot be a second one.'],
    ],
    sizing: [
      ['p', 'Every Dysobay piece is cut to one size. Not a size range with one size in stock — one size, drafted once, and the pattern is retired with the garment.'],
      ['p', 'Stated plainly it sounds like a limitation, and to a shopper it often is. In an atelier it is the opposite.'],
      ['h', 'What grading takes away'],
      ['p', 'Grading a pattern across five sizes means every proportion becomes a rule rather than a decision. A lapel that is exactly right at FR 38 has to survive being scaled to FR 46, so it becomes a lapel that is acceptable at both and perfect at neither. Every graded garment is a compromise with four other bodies.'],
      ['q', 'One size is not fewer options. It is the only way the proportion stays exactly where it was drawn.'],
      ['h', 'What we do about fit'],
      ['p', 'One alteration is included with every piece, done by the atelier that made it, and we would far rather answer a fit question before you order than take a garment back afterwards. A returned one-of-one does not go back into stock. It goes into a cupboard.'],
      ['p', 'Write before you buy. Somebody who has actually held the piece will answer.'],
    ],
    leaving: [
      ['p', 'The gap between quitting and the first Milan show was two years and one month. Most of it was not designing.'],
      ['h', 'The decision'],
      ['p', 'Haifa spent nineteen years in corporate roles that she was demonstrably good at and had stopped being able to explain to herself. There was no single moment. There was a long accumulation of Sunday evenings, and then a Monday where the accumulation was heavier than the salary.'],
      ['q', 'You are way too creative for a nine to five. Somebody wrote that on a placard. It took two years to agree with it.'],
      ['h', 'The two years'],
      ['p', 'Six months of pattern-cutting classes. A year of finding workshops that would take an order of one and not treat it as an insult — most would not, and the two that did are the two we still work with. Four months of making things that were not good enough and one month of making three that were.'],
      ['p', 'The label existed as a rule before it existed as a garment: one design, one piece, never repeated. Everything since has been an argument for keeping that rule when it would be easier not to.'],
      ['h', 'What it is now'],
      ['p', 'Three Milan showings, thirty-one pieces in the archive, eleven people making them, and zero restocks. The last number is the only one that took discipline.'],
    ],
    venue: [
      ['p', 'None of the three shows happened in a room built for fashion. The debut was in a disused printworks, Color Disobedience in a car park below an office block, and the third in a warehouse that still had the previous tenant\u2019s racking bolted to the ceiling.'],
      ['p', 'That is partly budget and mostly deliberate. A purpose-built runway flatters everything equally, which is a problem when the point of the collection is that no two pieces are alike.'],
      ['q', 'A room with something wrong with it makes you look at the clothes rather than the production.'],
      ['h', 'What the room does'],
      ['p', 'Concrete eats sound, so the audience hears the garment: the weight of the Ultramarine Coat hitting the floor on the turn, the Chrome Column moving against itself. In a carpeted venue with a sound system you hear none of that.'],
      ['p', 'Bad light is harder. Two of the three rooms had no usable daylight, which is why the Color Disobedience palette went as saturated as it did — the colours had to survive being lit badly on purpose.'],
      ['h', 'Twelve garments in a big empty space'],
      ['p', 'The risk of a raw venue is that a small collection looks thin in it. The answer was to stop trying to fill the room: the third show used a nine-metre walk in a forty-metre space and let the emptiness do the work. One garment at a time, a long way from anything else.'],
    ],
    drawing: [
      ['p', 'In a normal development cycle the drawing is a proposal. You sample it, the sample is wrong, you correct it, and the third one goes into production. The drawing is allowed to be approximate because the process will find the error.'],
      ['p', 'We do not get that. There is one length of the cloth, and cutting it is irreversible. The drawing has to be right before the scissors come out.'],
      ['q', 'You cannot iterate on a thing there is only one of. So you iterate on paper until the paper is the garment.'],
      ['h', 'What changes'],
      ['p', 'Drawings get much slower and much more specific. A sketch that would take twenty minutes in a normal studio takes two days here, because it has to carry the seam plan, the grain direction, the exact drop of the hem and where the pattern falls on the body. By the end it is less a sketch than a set of instructions.'],
      ['p', 'Toiles do the rest. We make them in cheap calico, sometimes four or five, and those are the iterations — the garment gets to be wrong repeatedly in a fabric nobody will ever see.'],
      ['h', 'When it still goes wrong'],
      ['p', 'Twice. The first time we lost a hand-painted silk faille and the painting could not be repeated. The second time the error was in the drawing and we caught it in calico, which is the system working. The first one is the reason the system exists.'],
    ],
    pricing: [
      ['p', 'Every price on this site is hours multiplied by a rate, plus materials, plus a margin that keeps the studio open. There is no brand premium in the number because there is no brand to charge for yet.'],
      ['h', 'The calculation'],
      ['p', 'Take the Warda Coat at AED 5,600. Forty-six hours of skilled labour at the rate our Dubai atelier charges is the largest single line. Coated nylon and bonded interlining, cut for one garment rather than bought by the roll, is the second. Then the hangtag, the box, the authenticity card, the shipping we include, and the alteration we have promised.'],
      ['p', 'What is left funds the next thing: pattern development, toiles, the two or three drawings that never become garments.'],
      ['q', 'A coat that took forty-six hours is not expensive. It is accurately costed.'],
      ['h', 'Why the hours are printed'],
      ['p', 'Publishing the hours on every product page removes an option we would otherwise be tempted by. You cannot discount a garment by forty per cent in a seasonal sale when the page says how long somebody spent making it — the number makes the insult explicit.'],
      ['p', 'It also answers the question everyone actually has. AED 890 for a scarf sounds like a lot until you read that it is nine hours, and then it sounds like nine hours.'],
    ],
  };

  const SOCIALS = [
    { net: 'Instagram', handle: '@dysobay_', href: 'https://www.instagram.com/dysobay_/', note: 'Campaigns, backstage, the pieces as they finish' },
    { net: 'TikTok', handle: '@dysobay', href: 'https://www.tiktok.com/@dysobay', note: 'The ateliers, in motion' },
    { net: 'Pinterest', handle: 'Dysobay', href: 'https://www.pinterest.com/', note: 'What the collections are built from' },
    { net: 'LinkedIn', handle: 'Haifa Ghodhbane', href: 'https://www.linkedin.com/', note: 'The business of refusing to scale' },
    { net: 'YouTube', handle: 'Dysobay', href: 'https://www.youtube.com/', note: 'Full runway films from Milan' },
    { net: 'Email', handle: 'hello@dysobay.com', href: 'mailto:hello@dysobay.com', note: 'A person answers, usually within two days' },
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

  /* Press and stockists — the two things a buyer looks for and a lookbook
     never answers. */
  const PRESS = [
    { quote: 'The only label in Milan this season whose scarcity is a fact rather than a marketing position.', source: 'Vogue Arabia', year: '2026' },
    { quote: 'Ghodhbane makes one of everything and dares you to find that inconvenient.', source: 'Harper’s Bazaar Arabia', year: '2025' },
    { quote: 'Structured Chaos was the best-argued collection on a schedule full of restatements.', source: 'Business of Fashion', year: '2026' },
    { quote: 'A production model that should not work, run by somebody who has clearly done the arithmetic.', source: 'The National', year: '2025' },
    { quote: 'Colour used as a refusal rather than a trend.', source: 'i-D', year: '2025' },
    { quote: 'The hangtag is a joke about barcodes. The clothes are not joking at all.', source: 'Gulf News', year: '2024' },
  ];

  const STOCKISTS = [
    { city: 'Dubai', place: 'The studio, Al Quoz 1', detail: 'By appointment, weekdays. Every piece in the archive is here.', primary: true },
    { city: 'Milan', place: 'Via Tortona showroom', detail: 'Fashion Week only — September and February.' },
    { city: 'Paris', place: 'Le Marais, by request', detail: 'A rotating selection of four to six pieces.' },
    { city: 'Tunis', place: 'Atelier Rania', detail: 'Made-to-measure consultations, not retail.' },
    { city: 'Worldwide', place: 'dysobay.com', detail: 'Express shipping included, duties settled at checkout.' },
  ];

  const SERVICES = [
    { title: 'Worldwide express shipping', body: 'Included on every order, sent from Dubai within 3–5 working days. Duties and taxes settled at checkout — nothing arrives with a bill attached.', meta: 'Included' },
    { title: 'One alteration, on us', body: 'Sleeve, hem or waist adjusted by the atelier that made the piece. Send it back within 60 days and we cover the shipping both ways.', meta: '60 days' },
    { title: 'Numbered authenticity card', body: 'Piece number, atelier, hours worked and the name of the person who finished it. Registered against your order, not against the design.', meta: 'Every piece' },
    { title: 'Private appointment', body: 'See the piece in the Dubai studio before you decide, or over video with the atelier if you are elsewhere. Book any weekday.', meta: 'By request' },
    { title: 'Made to measure', body: 'Commission something that does not exist yet. 8–14 weeks, one conversation to start, exactly one garment at the end.', meta: 'From 8 weeks' },
    { title: 'Lifetime repair', body: 'We repair anything we made, for as long as we exist. Materials at cost, labour free — a piece that cannot be replaced should not be disposable.', meta: 'Forever' },
  ];

  /* Seven clauses, one per letter of DYSOBAY. The number beside each letter is
     that letter's position in the alphabet — D is the fourth, Y the
     twenty-fifth — which is where 4.25.19.15.2.1.25 comes from. */
  const MANIFESTO = [
    { letter: 'D', n: '4', title: 'Four Foundations of Rebellion',
      body: 'Reject mass production. Embrace singular creation. Celebrate imperfection. Choose authenticity over approval. Four rules, and the fourth one is the hardest — approval is the currency everything else in this industry is priced in.' },
    { letter: 'Y', n: '25', title: 'Against Fifteen Minutes of Fame',
      body: 'Warhol promised everyone fifteen minutes. We are not interested in fifteen minutes. A garment made once, for one person, is a bet on the twenty-five years after the attention has moved on.' },
    { letter: 'S', n: '19', title: 'Nineteen Out of Twenty',
      body: 'Almost complete, deliberately unfinished. The raw hem, the visible back seam, the brushstroke that runs off the edge and does not resolve — the twentieth part is left out on purpose, because a finished thing asks nothing of the person wearing it.' },
    { letter: 'O', n: '15', title: 'Return to Why',
      body: 'Why do you dress? Why do you choose? Why do you stand apart? Most clothing answers a different question — what is available, what is expected, what is on sale. Yours should answer the first one.' },
    { letter: 'B', n: '2', title: 'The Binary Choice',
      body: 'Mass or singular. Follow or lead. Safe or fearless. There is no third option and no gradual version: a garment is either made once or it is not, and every other decision follows from that one.' },
    { letter: 'A', n: '1', title: 'The Singular Truth',
      body: 'Only one piece exists. Only one you exists. One design per creation, never repeated, never replicated. When the piece sells, the pattern goes in an envelope and the design is closed.' },
    { letter: 'Y', n: '25', title: 'The Choice Symbol',
      body: 'The letter arrives twice, and the second time it is a fork. Y splits into two paths: the one everyone is on, and the other one. We are on the other one. That is the whole label, drawn as a single character.' },
  ];

  /* Counters for the stats band — value, suffix, label. */
  const STATS = [
    { value: 3, label: 'Milan Fashion Week showings', suffix: '' },
    { value: 31, label: 'Pieces in the current archive', suffix: '' },
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

  return { toneOf, PRODUCTS, LOOKBOOK, JOURNAL, ARTICLE_BODIES, SOCIALS, PRESS, STOCKISTS, FAQS, CATEGORIES, COLLECTIONS, MANIFESTO, SERVICES, STATS, SIZES, AED, collectionOf, MEDIA: M };
})();
