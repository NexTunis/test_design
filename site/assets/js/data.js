/* Fake-but-plausible catalogue data for the Dysobay storefront prototype.
   Photography is the label's own campaign and brand-kit imagery, copied
   out of `dysobay/` into `site/media/`. Prices are AED (Dubai market). */
window.DYSOBAY = (function () {
  const M = 'media/';

  const PRODUCTS = [
    {
      id: 'amara-cape',
      name: 'Amara Cape',
      price: 2450,
      size: 'FR 38',
      tag: 'New Drop',
      status: 'in-stock',
      category: 'Outerwear',
      season: 'Color Disobedience — SS25',
      images: [M + 'look-verdure-01.jpg', M + 'look-verdure-02.jpg', M + 'kit-collar-detail.jpg'],
      note: 'A printed cape cut in one continuous panel, finished by hand at the shoulder seam. Photographed on the SS25 set in Milan.',
    },
    {
      id: 'nuits-blazer',
      name: 'Nuits Blazer',
      price: 3100,
      size: 'FR 40',
      status: 'in-stock',
      category: 'Tailoring',
      season: 'Milan Fashion Week — debut',
      images: [M + 'look-noir-02.jpg', M + 'look-noir-01.jpg', M + 'kit-collar-label.jpg'],
      note: 'Sharp-shouldered and floor-skimming, built over a boned inner structure so it holds its line without padding.',
    },
    {
      id: 'zellige-dress',
      name: 'Zellige Dress',
      price: 4200,
      size: 'FR 36',
      tag: 'Last Piece',
      status: 'last-piece',
      category: 'Dresses',
      season: 'Color Disobedience — SS25',
      images: [M + 'look-eventail-01.jpg', M + 'look-eventail-02.jpg', M + 'kit-buttons.jpg'],
      note: 'A tiled silhouette assembled from hand-cut panels — the pattern never repeats across the body, and never will again.',
    },
    {
      id: 'warda-coat',
      name: 'Warda Coat',
      price: 5600,
      size: 'FR 42',
      status: 'in-stock',
      category: 'Outerwear',
      season: 'Milan Fashion Week — third showing',
      images: [M + 'look-chrome-01.jpg', M + 'look-chrome-02.jpg', M + 'kit-woven-label.jpg'],
      note: 'Coated technical shell with a raw-cut hem. Heavy in the hand, weightless on the shoulder.',
    },
    {
      id: 'samt-trousers',
      name: 'Samt Trousers',
      price: 1950,
      size: 'FR 38',
      status: 'in-stock',
      category: 'Tailoring',
      season: 'Studio',
      images: [M + 'look-graffiti-01.jpg', M + 'look-graffiti-02.jpg', M + 'kit-hangtag.jpg'],
      note: 'Wide, high-waisted, cut long enough to break over the boot. Painted mark applied by hand, once.',
    },
    {
      id: 'lumiere-slip',
      name: 'Lumière Slip Dress',
      price: 2800,
      size: 'FR 36',
      status: 'sold',
      category: 'Dresses',
      season: 'Milan Fashion Week — debut',
      images: [M + 'look-motion-01.jpg', M + 'look-motion-02.jpg', M + 'kit-collar-detail.jpg'],
      note: 'Sold in Milan the week it walked. The design is retired — this page stays up as a record, not a waitlist.',
    },
    {
      id: 'basma-shirt',
      name: 'Basma Shirt',
      price: 1400,
      size: 'FR 40',
      status: 'in-stock',
      category: 'Shirts',
      season: 'Studio',
      images: [M + 'kit-shirt-hangtag.jpg', M + 'kit-collar-label.jpg', M + 'kit-shirt-tag.jpg'],
      note: 'Poplin, single-needle collar, woven D✕ label at the placket. Shown here with the hangtag it ships on.',
    },
    {
      id: 'rihla-trench',
      name: 'Rihla Trench',
      price: 4950,
      size: 'FR 40',
      tag: 'New Drop',
      status: 'in-stock',
      category: 'Outerwear',
      season: 'Milan Fashion Week — third showing',
      images: [M + 'look-denim-01.jpg', M + 'look-denim-02.jpg', M + 'look-denim-03.jpg'],
      note: 'Denim reworked as tailoring — panelled, belted, and cut to be worn open. One size, one owner.',
    },
  ];

  const LOOKBOOK = [
    { src: M + 'look-denim-02.jpg', caption: 'Milan Fashion Week, look 01' },
    { src: M + 'look-noir-01.jpg', caption: 'Milan Fashion Week, look 04' },
    { src: M + 'look-chrome-01.jpg', caption: 'Color Disobedience, look 06' },
    { src: M + 'look-verdure-01.jpg', caption: 'Color Disobedience, look 09' },
    { src: M + 'look-motion-01.jpg', caption: 'Studio, look 12' },
    { src: M + 'look-eventail-01.jpg', caption: 'Color Disobedience, look 14' },
    { src: M + 'look-graffiti-02.jpg', caption: 'Studio, look 17' },
    { src: M + 'look-denim-03.jpg', caption: 'Milan Fashion Week, look 02' },
    { src: M + 'look-noir-02.jpg', caption: 'Milan Fashion Week, look 05' },
    { src: M + 'look-chrome-02.jpg', caption: 'Color Disobedience, look 07' },
    { src: M + 'look-verdure-02.jpg', caption: 'Color Disobedience, look 10' },
    { src: M + 'look-motion-02.jpg', caption: 'Studio, look 13' },
    { src: M + 'look-eventail-02.jpg', caption: 'Color Disobedience, look 15' },
    { src: M + 'look-graffiti-01.jpg', caption: 'Studio, look 18' },
  ];

  const JOURNAL = [
    {
      id: 'milan-fw26',
      title: 'Dysobay at Milan Fashion Week',
      date: 'Sep 2026',
      image: M + 'hero-runway.gif',
      excerpt:
        'A third showing on the Milan schedule, and the same rule as the first: every look walks once, then it belongs to whoever bought it.',
    },
    {
      id: 'color-disobedience',
      title: 'Notes on Color Disobedience',
      date: 'Feb 2025',
      image: M + 'look-verdure-01.jpg',
      excerpt:
        'The SS25 collection paired fearless colour combinations with the brand’s one-piece rule — a look at why the two ideas can’t be separated.',
    },
    {
      id: 'atelier',
      title: 'Inside the ateliers',
      date: 'Nov 2024',
      image: M + 'kit-collar-detail.jpg',
      excerpt:
        'Every Dysobay piece is built by hand in small tailoring workshops. A look at the people who bring each design to life, one piece at a time.',
    },
  ];

  const FAQS = [
    {
      q: 'Why is every piece one of one?',
      a: 'We design once and produce once, on purpose. If you own a Dysobay piece, no one else does — that’s the whole idea, not a marketing line.',
    },
    {
      q: 'Can a sold piece be remade?',
      a: 'No. Once a piece sells, the design is retired. We’ll tell you plainly when something is gone for good.',
    },
    {
      q: 'Do you ship outside the UAE?',
      a: 'Yes — we ship worldwide from Dubai. Duties and taxes are calculated at checkout for your country.',
    },
    {
      q: 'What sizes do you carry?',
      a: 'Each piece is made to a single size, listed on its product page in FR sizing. See the size guide to convert it to your usual size.',
    },
    {
      q: 'What is your return policy?',
      a: 'Because every piece is unique, all sales are final. Write to us before you order if you are unsure of the fit — we would rather answer questions than retire a piece to a return shelf.',
    },
    {
      q: 'What does 4.25.19.15.2.1.25 mean?',
      a: 'It is the manifesto read back as a barcode — one number per idea. A barcode is what mass production puts on a garment; ours points at seven arguments against it.',
    },
  ];

  const CATEGORIES = ['All', 'Outerwear', 'Tailoring', 'Dresses', 'Shirts'];

  const MANIFESTO = [
    { n: '4', title: 'Four Foundations of Rebellion', body: 'Reject mass production. Embrace singular creation. Celebrate imperfection. Choose authenticity over approval.' },
    { n: '25', title: 'Against Fifteen Minutes of Fame', body: 'Warhol promised everyone fifteen minutes. We promise you a lifetime of authenticity. Fame fades. We craft for the lifetime.' },
    { n: '19', title: 'Nineteen Out of Twenty', body: 'Almost complete, but beautifully unfinished. Perfection is overrated. We celebrate the authentic incomplete.' },
    { n: '15', title: 'Return to Why', body: 'Why do you dress? Why do you choose? Why do you stand apart? Your clothes should answer.' },
    { n: '2', title: 'The Binary Choice', body: 'Mass or singular. Follow or lead. Safe or fearless. Choose defiance.' },
    { n: '1', title: 'The Singular Truth', body: 'Only one piece exists. Only one you exists. Only one design per creation. Never repeated. Never replicated.' },
    { n: '25y', title: 'The Choice Symbol', body: 'Visually, Y splits into two paths. We are the path less chosen.' },
  ];

  const SIZES = [
    ['FR 36', 'US 4', 'UK 8', 'IT 40', '82', '64', '90'],
    ['FR 38', 'US 6', 'UK 10', 'IT 42', '86', '68', '94'],
    ['FR 40', 'US 8', 'UK 12', 'IT 44', '90', '72', '98'],
    ['FR 42', 'US 10', 'UK 14', 'IT 46', '94', '76', '102'],
  ];

  const AED = (n) => 'AED ' + n.toLocaleString('en-US');

  return { PRODUCTS, LOOKBOOK, JOURNAL, FAQS, CATEGORIES, MANIFESTO, SIZES, AED, MEDIA: M };
})();
