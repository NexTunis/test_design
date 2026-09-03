// Photography lives in ../../site/media/ — the label's own campaign shots and
// brand-kit mockups, curated out of the raw `dysobay/` drop. One copy, shared
// by this UI kit and the static storefront in site/.
window.MEDIA='../../site/media/';
window.PRODUCTS=[
{id:'amara-cape',name:'Amara Cape',price:'AED 2,450',size:'FR 38',tag:'New Drop',status:'in-stock',category:'Outerwear',images:['look-verdure-01.jpg','look-verdure-02.jpg','kit-collar-detail.jpg']},
{id:'nuits-blazer',name:'Nuits Blazer',price:'AED 3,100',size:'FR 40',status:'in-stock',category:'Tailoring',images:['look-noir-02.jpg','look-noir-01.jpg','kit-collar-label.jpg']},
{id:'zellige-dress',name:'Zellige Dress',price:'AED 4,200',size:'FR 36',tag:'Last Piece',status:'last-piece',category:'Dresses',images:['look-eventail-01.jpg','look-eventail-02.jpg','kit-buttons.jpg']},
{id:'warda-coat',name:'Warda Coat',price:'AED 5,600',size:'FR 42',status:'in-stock',category:'Outerwear',images:['look-chrome-01.jpg','look-chrome-02.jpg','kit-woven-label.jpg']},
{id:'samt-trousers',name:'Samt Trousers',price:'AED 1,950',size:'FR 38',status:'in-stock',category:'Tailoring',images:['look-graffiti-01.jpg','look-graffiti-02.jpg','kit-hangtag.jpg']},
{id:'lumiere-slip',name:'Lumière Slip Dress',price:'AED 2,800',size:'FR 36',status:'sold',category:'Dresses',images:['look-motion-01.jpg','look-motion-02.jpg','kit-collar-detail.jpg']},
{id:'basma-shirt',name:'Basma Shirt',price:'AED 1,400',size:'FR 40',status:'in-stock',category:'Shirts',images:['kit-shirt-hangtag.jpg','kit-collar-label.jpg','kit-shirt-tag.jpg']},
{id:'rihla-trench',name:'Rihla Trench',price:'AED 4,950',size:'FR 40',tag:'New Drop',status:'in-stock',category:'Outerwear',images:['look-denim-01.jpg','look-denim-02.jpg','look-denim-03.jpg']}
];
window.PRICE_AED=p=>Number(String(p.price).replace(/[^0-9]/g,''));
window.FORMAT_AED=n=>'AED '+n.toLocaleString('en-US');
window.LOOKBOOK=[
{src:'look-denim-02.jpg',caption:'Milan Fashion Week, look 01'},
{src:'look-noir-01.jpg',caption:'Milan Fashion Week, look 04'},
{src:'look-chrome-01.jpg',caption:'Color Disobedience, look 06'},
{src:'look-verdure-01.jpg',caption:'Color Disobedience, look 09'},
{src:'look-motion-01.jpg',caption:'Studio, look 12'},
{src:'look-eventail-01.jpg',caption:'Color Disobedience, look 14'},
{src:'look-graffiti-02.jpg',caption:'Studio, look 17'},
{src:'look-denim-03.jpg',caption:'Milan Fashion Week, look 02'},
{src:'look-chrome-02.jpg',caption:'Color Disobedience, look 07'}
];
window.JOURNAL=[
{id:'milan-fw26',title:'Dysobay at Milan Fashion Week',date:'Sep 2026',image:'hero-catwalk-poster.jpg',excerpt:'A third showing on the Milan schedule, and the same rule as the first: every look walks once, then it belongs to whoever bought it.'},
{id:'color-disobedience',title:'Notes on Color Disobedience',date:'Feb 2025',image:'look-verdure-01.jpg',excerpt:'The SS25 collection paired fearless color combinations with the brand’s one-piece rule — a look at why the two ideas can’t be separated.'},
{id:'atelier-tunis',title:'Inside the ateliers',date:'Nov 2024',image:'kit-collar-detail.jpg',excerpt:'Every Dysobay piece is built by hand in small tailoring workshops. A look at the people who bring each design to life, one piece at a time.'}
];
window.FAQS=[
{q:'Why is every piece one of one?',a:'We design once and produce once, on purpose. If you own a Dysobay piece, no one else does — that’s the whole idea, not a marketing line.'},
{q:'Can a sold-out piece be remade?',a:'No. Once a piece sells, the design is retired. We’ll tell you plainly when something is gone for good.'},
{q:'Do you ship outside the UAE?',a:'Yes — we ship worldwide from Dubai. Duties and taxes are calculated at checkout for your country.'},
{q:'What sizes do you carry?',a:'Each piece is made to a single size, listed on its product page in FR sizing. See our Size Guide to convert to your usual size.'},
{q:'What is your return policy?',a:'Because every piece is unique, all sales are final. See our Refund Policy for exceptions.'}
];
