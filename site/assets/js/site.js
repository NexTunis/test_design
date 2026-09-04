/* Dysobay storefront runtime.
 *
 *   1. Render the catalogue into each page's [data-render] hooks.
 *   2. Animate — GSAP + ScrollTrigger. Motion is SECTION-level and ARRIVAL-only:
 *      a section plays one composed entrance when you reach it, then holds
 *      still. NOTHING on this site is scroll-linked — no pin, no scrub, no
 *      parallax, no velocity skew — so the scroll never fights the finger and
 *      never stalls waiting for a section to finish. What varies is which
 *      entrance a section gets: see CHOREO.
 *   3. Navigate — Barba.js swaps the page container so the chrome never blinks.
 *
 * Everything degrades: with GSAP missing (or prefers-reduced-motion) nothing is
 * ever hidden, and with Barba missing (or on a file:// open, where its fetch
 * cannot work) links just navigate the browser's normal way.
 */
(function () {
  'use strict';

  const D = window.DYSOBAY;
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ANIM = !!(gsap && ScrollTrigger) && !reduceMotion;
  const CAN_BARBA = !!window.barba && window.location.protocol !== 'file:';

  if (ANIM) {
    gsap.registerPlugin(ScrollTrigger);
    document.documentElement.classList.add('js-anim');
  }

  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.prototype.slice.call((r || document).querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const param = (n) => new URLSearchParams(window.location.search).get(n) || '';
  const productById = (id) => D.PRODUCTS.find((p) => p.id === id);
  const isPhone = () => window.matchMedia('(max-width: 860px)').matches;

  /* ═══════════════════════════  store  ═══════════════════════════ */

  const store = {
    read(k) { try { return JSON.parse(localStorage.getItem('dysobay:' + k)) || []; } catch (e) { return []; } },
    write(k, v) { try { localStorage.setItem('dysobay:' + k, JSON.stringify(v)); } catch (e) {} syncCounts(); },
    has(k, id) { return this.read(k).indexOf(id) !== -1; },
    toggle(k, id) {
      const l = this.read(k); const i = l.indexOf(id);
      if (i === -1) l.push(id); else l.splice(i, 1);
      this.write(k, l); return i === -1;
    },
    remove(k, id) { this.write(k, this.read(k).filter((x) => x !== id)); },
    items(k) { return this.read(k).map(productById).filter(Boolean); },
  };

  if (localStorage.getItem('dysobay:seeded') !== '2') {
    try {
      localStorage.setItem('dysobay:seeded', '2');
      localStorage.setItem('dysobay:bag', JSON.stringify(['amara-cape', 'plume-gown']));
      localStorage.setItem('dysobay:wishlist', JSON.stringify(['zellige-dress', 'torn-tuxedo', 'coil-knit', 'brush-dress']));
    } catch (e) {}
  }

  function syncCounts() {
    const counts = { '[data-bag-count]': store.read('bag').length, '[data-wishlist-count]': store.read('wishlist').length };
    Object.keys(counts).forEach((sel) => {
      const v = counts[sel];
      $$(sel).forEach((n) => {
        /* Badges carry the bare number and disappear at zero; the footer links
           keep the parenthetical form so "Bag (2)" still reads as a sentence. */
        const badge = n.classList.contains('navicon__badge');
        n.textContent = v ? (badge ? String(v) : ' (' + v + ')') : '';
        n.classList.toggle('is-on', v > 0);
        const host = n.closest('[aria-label]');
        if (host && badge) host.setAttribute('aria-label', host.getAttribute('title') + (v ? ' — ' + v + ' item' + (v === 1 ? '' : 's') : ' — empty'));
      });
    });
  }

  let toastTimer;
  function toast(msg) {
    let n = $('.toast');
    if (!n) { n = document.createElement('div'); n.className = 'toast'; n.setAttribute('role', 'status'); document.body.appendChild(n); }
    n.textContent = msg;
    clearTimeout(toastTimer);
    if (ANIM) {
      gsap.killTweensOf(n);
      gsap.fromTo(n, { yPercent: 140, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.5, ease: 'elastic.out(1,0.7)' });
      toastTimer = setTimeout(() => gsap.to(n, { yPercent: 140, opacity: 0, duration: 0.3, ease: 'power2.in' }), 2400);
    } else {
      n.style.transform = 'translate(-50%,0)';
      toastTimer = setTimeout(() => { n.style.transform = 'translate(-50%,140%)'; }, 2400);
    }
  }

  /* ═══════════════════════════  templates  ═══════════════════════ */

  /* A phone was downloading and decoding full-size photography: 114 of 120
     images on the collections page were over twice their display size, 70
     megapixels in all, which is what made scrolling stutter. Every <img> the
     renderers emit now offers a 520px WebP alongside the original. */
  const SM = (src) => D.MEDIA + 'sm/' + src.split('/').pop().replace(/\.(jpg|png)$/i, '.webp');
  const SIZES = {
    card: '(max-width: 560px) 46vw, (max-width: 1100px) 30vw, 22vw',
    wide: '(max-width: 860px) 92vw, 46vw',
    full: '100vw',
  };
  function imgAttrs(src, alt, kind, lazy) {
    return `src="${src}" srcset="${SM(src)} 520w, ${src} 1400w" sizes="${SIZES[kind] || SIZES.card}"` +
           ` alt="${esc(alt || '')}"${lazy === false ? '' : ' loading="lazy"'} decoding="async"` +
           ` onload="this.closest('.media,.card__media')?.classList.add('is-loaded')"`;
  }
  /* The frame carries the photograph's average colour, so at 30 KB/s you see
     the composition's tone the moment layout happens instead of a box the same
     colour as the page — which reads as missing content, not as loading. */
  const tone = (src) => ` style="--tone:${D.toneOf(src)}"`;

  function cardHTML(p, i) {
    const c = D.collectionOf(p.collection);
    /* The alt frame only ever shows on hover, so a touch device should never
       pay for it — that is half the image requests on the collections page. */
    const second = p.images[1] && !isPhone() ? `<img class="card__alt" ${imgAttrs(p.images[1], '', 'card')} aria-hidden="true">` : '';
    const flag = p.tag ? `<span class="tag tag--clay card__flag">${esc(p.tag)}</span>` : '';
    const sold = p.status === 'sold' ? '<span class="card__sold">Sold — retired</span>' : '';
    /* A button may not live inside an <a>, so the quick-view control is a
       sibling of the link and the whole thing is wrapped in a plain div. */
    return `<div class="card" data-stagger${i != null ? ` style="--i:${i}"` : ''}>
      <a class="card__link" href="product.html?id=${encodeURIComponent(p.id)}">
        <span class="card__media" data-reveal-media${tone(p.images[0])}>
          <span class="card__inner">
            <img ${imgAttrs(p.images[0], p.name, 'card')}>
            ${second}
          </span>
          ${flag}${sold}
          <span class="card__cta">View piece</span>
        </span>
        <span class="card__meta">
          <span>
            <span class="card__name">${esc(p.name)}</span>
            <span class="card__sub">${esc(p.category)} · ${esc(c.season)} · ${esc(p.size)}</span>
          </span>
          <span class="card__price">${D.AED(p.price)}</span>
        </span>
      </a>
      <button type="button" class="card__qv" data-quickview="${p.id}">Quick view</button>
    </div>`;
  }

  const mediaHTML = (src, alt, ratio, cls) =>
    `<figure class="media media--${ratio || '3x4'}${cls ? ' ' + cls : ''}" data-reveal-media${tone(src)}>
      <span class="media__inner"><img ${imgAttrs(src, alt, 'wide')}></span>
    </figure>`;

  /* ═══════════════════════════  renderers  ═══════════════════════ */

  const renderers = {
    'product-grid'(node) {
      const limit = parseInt(node.dataset.limit, 10);
      let list = D.PRODUCTS.slice();
      const cat = node.dataset.filterCategory;
      const col = node.dataset.filterCollection;
      const avail = node.dataset.filterAvailability;
      const max = parseInt(node.dataset.filterMaxPrice, 10);
      if (cat && cat !== 'All') list = list.filter((p) => p.category === cat);
      if (col && col !== 'all') list = list.filter((p) => p.collection === col);
      if (avail === 'available') list = list.filter((p) => p.status !== 'sold');
      if (avail === 'last') list = list.filter((p) => p.status === 'last-piece');
      if (max) list = list.filter((p) => p.price <= max);

      const order = D.PRODUCTS.map((p) => p.id);
      const SORTS = {
        featured: (a, b) => order.indexOf(a.id) - order.indexOf(b.id),
        'price-asc': (a, b) => a.price - b.price,
        'price-desc': (a, b) => b.price - a.price,
        'name-asc': (a, b) => a.name.localeCompare(b.name),
        season: (a, b) => D.collectionOf(a.collection).season.localeCompare(D.collectionOf(b.collection).season),
      };
      list.sort(SORTS[node.dataset.sort] || SORTS.featured);
      if (limit) list = list.slice(0, limit);
      node.innerHTML = list.length
        ? list.map(cardHTML).join('')
        : '<p class="lede empty">Nothing left in this cut. Every piece leaves for good — the lookbook keeps the record.</p>';
      const count = $('[data-piece-count]');
      if (count) count.textContent = list.length;
    },

    /* Just the categories. Season, availability and price live behind the
       Refine disclosure so the default view stays a single clean row. */
    filters(node) {
      const target = $('[data-render="product-grid"]');
      node.innerHTML = D.CATEGORIES.map((c, i) =>
        `<button type="button" class="filter${i === 0 ? ' is-active' : ''}" data-category="${esc(c)}">${esc(c)}</button>`).join('');
      node.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter');
        if (!btn || !target) return;
        $$('.filter', node).forEach((b) => b.classList.toggle('is-active', b === btn));
        target.dataset.filterCategory = btn.dataset.category;
        renderers['product-grid'](target);
        animateIn(target);
      });
    },

    lookbook(node) {
      node.innerHTML = D.LOOKBOOK.map((s, i) => `<figure class="media media--3x4 look" data-reveal-media data-look="${s.collection}" style="--i:${i % 6};--tone:${D.toneOf(s.src)}">
          <span class="media__inner"><img ${imgAttrs(s.src, s.caption, 'card')}></span>
          <figcaption class="look__cap">${esc(s.caption)}</figcaption>
        </figure>`).join('');
    },

    'lookbook-filters'(node) {
      const grid = $('[data-render="lookbook"]');
      node.innerHTML =
        `<button type="button" class="filter is-active" data-look-filter="all">Everything</button>` +
        D.COLLECTIONS.map((c) => `<button type="button" class="filter" data-look-filter="${c.id}">${esc(c.name)}</button>`).join('');
      node.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter');
        if (!btn || !grid) return;
        $$('.filter', node).forEach((b) => b.classList.toggle('is-active', b === btn));
        const want = btn.dataset.lookFilter;
        $$('.look', grid).forEach((f) => {
          const show = want === 'all' || f.dataset.look === want;
          f.hidden = !show;
        });
        if (ANIM) {
          gsap.fromTo($$('.look:not([hidden])', grid), { opacity: 0, scale: 0.94, y: 40 },
            { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: { amount: 0.4, from: 'random' } });
          ScrollTrigger.refresh();
        }
      });
    },

    journal(node) {
      const limit = parseInt(node.dataset.limit, 10) || D.JOURNAL.length;
      node.innerHTML = D.JOURNAL.slice(0, limit).map((j) => `<article class="card">
          <a class="card__link" href="article.html?id=${encodeURIComponent(j.id)}">
            <span class="card__media card__media--wide" data-reveal-media${tone(j.image)}>
              <span class="card__inner"><img ${imgAttrs(j.image, j.title, 'card')}></span>
              <span class="card__cta">Read</span>
            </span>
            <span class="card__sub" style="display:block;margin-top:var(--space-4)">${esc(j.date)} · ${esc(j.read)} read</span>
            <span class="h3" style="display:block;margin-top:var(--space-2)">${esc(j.title)}</span>
            <span class="small" style="display:block;margin-top:var(--space-2);line-height:var(--leading-relaxed)">${esc(j.excerpt)}</span>
          </a>
        </article>`).join('');
    },

    /* ── manifesto: the name is the index ─────────────────────────── */
    manifesto(node) {
      node.innerHTML = `
        <aside class="lettersidx">
          <p class="lettersidx__label">D.Y.S.O.B.A.Y</p>
          <div class="lettersidx__set">
            ${D.MANIFESTO.map((l, i) => `<button type="button" class="letterbtn" data-goto-clause="${i}" aria-label="Clause ${esc(l.letter)} — ${esc(l.title)}">
                <span class="letterbtn__ch">${esc(l.letter)}</span><span class="letterbtn__n">${esc(l.n)}</span>
              </button>`).join('')}
          </div>
          <p class="lettersidx__note">Each letter is its own position in the alphabet.</p>
        </aside>
        <div class="clauses">
          ${D.MANIFESTO.map((l, i) => `<article class="clause" id="clause-${i}" data-clause="${i}">
              <p class="clause__n"><span class="clause__ch">${esc(l.letter)}</span><span class="clause__num">${esc(l.n)}</span></p>
              <div>
                <h2 class="h2">${esc(l.title)}</h2>
                <p class="lede" style="margin-top:var(--space-3)">${esc(l.body)}</p>
              </div>
              <span class="clause__rule"></span>
            </article>`).join('')}
        </div>`;

      const clauses = $$('.clause', node);
      const letters = $$('.letterbtn', node);
      letters.forEach((b, i) => b.addEventListener('click', () => {
        clauses[i].scrollIntoView({ behavior: ANIM ? 'smooth' : 'auto', block: 'center' });
      }));

      if (!ANIM) return;
      clauses.forEach((cl) => {
        gsap.fromTo($('.clause__rule', cl), { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'expo.out',
          scrollTrigger: { trigger: cl, start: 'top 78%', once: true } });
      });

      /* Whichever clause is crossing the middle of the screen is the current
         one, so exactly one letter is lit at all times. An IntersectionObserver
         over a 10%-tall band does this off the main thread; the old version
         measured all seven clauses on every scroll frame, which is a forced
         layout per frame for a class toggle. */
      let current = -1;
      const setCurrent = (i) => {
        if (i === current || i < 0) return;
        current = i;
        clauses.forEach((cl, n) => cl.classList.toggle('is-on', n === i));
        letters.forEach((b, n) => {
          b.classList.toggle('is-on', n === i);
          b.classList.toggle('is-read', n < i);
        });
      };
      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach((en) => { if (en.isIntersecting) setCurrent(clauses.indexOf(en.target)); });
        }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
        clauses.forEach((cl) => io.observe(cl));
      }
      setCurrent(0);
    },

    press(node) {
      node.innerHTML = D.PRESS.map((q) => `<figure class="press" data-block>
          <blockquote class="press__quote">“${esc(q.quote)}”</blockquote>
          <figcaption class="press__src">${esc(q.source)} · ${esc(q.year)}</figcaption>
        </figure>`).join('');
    },

    stockists(node) {
      node.innerHTML = D.STOCKISTS.map((s) => `<div class="stockist${s.primary ? ' stockist--primary' : ''}" data-block>
          <p class="stockist__city">${esc(s.city)}</p>
          <p class="h4">${esc(s.place)}</p>
          <p class="small" style="margin-top:var(--space-2)">${esc(s.detail)}</p>
        </div>`).join('');
    },

    gallery(node) {
      const shots = [
        ['ctx-workshop-01.jpg', 'The Tunis cutting floor'],
        ['ctx-sketches.jpg', 'First drawings for Structured Chaos'],
        ['ctx-workshop-02.jpg', 'Finishing, by hand'],
        ['ctx-venue-01.jpg', 'The Milan venue, before'],
        ['ctx-interior.jpg', 'Front of house'],
        ['ctx-exhibition.jpg', 'Exhibition, Lisbon'],
      ];
      node.innerHTML = shots.map(([f, cap]) => `<figure class="media media--4x3 look" data-reveal-media style="--tone:${D.toneOf(D.MEDIA + f)}">
          <span class="media__inner"><img ${imgAttrs(D.MEDIA + f, cap, 'card')}></span>
          <figcaption class="look__cap">${esc(cap)}</figcaption>
        </figure>`).join('');
    },

    /* Each season as a row you can act on: how many pieces it produced, how
       many are left, and a way into both the lookbook and the shop. */
    timeline(node) {
      node.innerHTML = D.COLLECTIONS.map((c) => {
        const pieces = D.PRODUCTS.filter((p) => p.collection === c.id);
        const left = pieces.filter((p) => p.status !== 'sold').length;
        const shot = (D.LOOKBOOK.find((l) => l.collection === c.id) || {}).src || pieces[0].images[0];
        return `<article class="season-row" data-block>
          <a class="media media--3x4 season-row__shot" href="lookbook.html" style="--tone:${D.toneOf(shot)}">
            <span class="media__inner"><img ${imgAttrs(shot, c.name, 'card')}></span>
          </a>
          <div class="season-row__body">
            <p class="season__tag">${esc(c.season)} · ${esc(c.place)}</p>
            <h3 class="h3">${esc(c.name)}</h3>
            <p class="lede" style="margin-top:var(--space-2)">${esc(c.note)}</p>
            <p class="season-row__count">${pieces.length} piece${pieces.length === 1 ? '' : 's'} made · ${left} still available</p>
            <p class="season-row__acts">
              <a class="link-underline" href="collections.html">Shop the season</a>
              <a class="link-underline" href="lookbook.html">See the looks</a>
            </p>
          </div>
        </article>`;
      }).join('');
    },

    socials(node) {
      node.innerHTML = D.SOCIALS.map((s) => `<a class="sociallink" href="${s.href}"${s.href.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : ''}>
          <span class="sociallink__net">${esc(s.net)}</span>
          <span class="sociallink__handle">${esc(s.handle)} — ${esc(s.note)}</span>
          <span class="sociallink__go">→</span>
        </a>`).join('');
    },

    /* ── journal article ──────────────────────────────────────────── */
    article(node) {
      const id = param('id');
      const j = D.JOURNAL.find((a) => a.id === id) || D.JOURNAL[0];
      const body = D.ARTICLE_BODIES[j.id] || [];
      document.title = j.title + ' — Dysobay';
      const others = D.JOURNAL.filter((a) => a.id !== j.id);
      const next = others[(D.JOURNAL.indexOf(j)) % others.length];

      node.innerHTML = `
        <p class="article__meta"><span>${esc(j.date)}</span><span>${esc(j.read)} read</span><span>Journal</span></p>
        <h1 class="display" data-split style="margin-top:var(--space-4)">${esc(j.title)}</h1>
        <p class="lede" style="margin-top:var(--space-5);max-width:60ch">${esc(j.excerpt)}</p>
        <figure class="media media--16x9" data-reveal-media style="margin-top:var(--space-7)">
          <span class="media__inner"><img ${imgAttrs(j.image, j.title, 'full', false)}></span>
        </figure>
        <div class="article" style="margin-top:var(--space-8)">
          ${body.map(([kind, text]) =>
            kind === 'h' ? `<h2>${esc(text)}</h2>` :
            kind === 'q' ? `<blockquote>${esc(text)}</blockquote>` :
                           `<p>${esc(text)}</p>`).join('')}
        </div>
        <div class="article" style="margin-top:var(--space-9)">
          <div class="nextread">
            <div>
              <p class="card__sub">Next</p>
              <p class="h3" style="margin-top:var(--space-2)">${esc(next.title)}</p>
            </div>
            <a class="btn" data-magnetic href="article.html?id=${encodeURIComponent(next.id)}">Read</a>
          </div>
        </div>`;
    },

    /* ── auto-moving product slider ───────────────────────────────── */
    slider(node) {
      const list = D.PRODUCTS.filter((p) => p.status !== 'sold');
      const one = list.map((p) => `<a class="slider__item media media--3x4" href="product.html?id=${encodeURIComponent(p.id)}" aria-label="${esc(p.name)}"${tone(p.images[0])}>
          <span class="media__inner"><img ${imgAttrs(p.images[0], p.name, 'card')}></span>
          <span class="rail__cap">${esc(p.name)} · ${D.AED(p.price)}</span>
        </a>`).join('');
      node.innerHTML = `<div class="slider__track">${one}${one}</div>`;
      /* Phones get a plain swipeable row: an infinite tween runs every frame
         forever, which is exactly the kind of thing that makes a phone stutter. */
      if (!ANIM || isPhone()) { node.classList.add('slider--swipe'); return; }

      const track = $('.slider__track', node);
      const half = track.scrollWidth / 2;
      const tw = gsap.to(track, { x: -half, duration: half / 42, ease: 'none', repeat: -1 });
      /* Slows rather than stops, so the row never looks frozen or broken. */
      node.addEventListener('mouseenter', () => gsap.to(tw, { timeScale: 0.18, duration: 0.5 }));
      node.addEventListener('mouseleave', () => gsap.to(tw, { timeScale: 1, duration: 0.5 }));
      node.addEventListener('focusin', () => gsap.to(tw, { timeScale: 0, duration: 0.3 }));
      node.addEventListener('focusout', () => gsap.to(tw, { timeScale: 1, duration: 0.4 }));
    },

    stats(node) {
      node.innerHTML = D.STATS.map((s) => `<div class="stat" data-reveal>
          <span class="stat__num" data-count-to="${s.value}">0</span>
          <span class="stat__label">${esc(s.label)}</span>
        </div>`).join('');
    },

    services(node) {
      node.innerHTML = D.SERVICES.map((s, i) => `<div class="service" data-stagger style="--i:${i % 3}">
          <p class="service__meta">${esc(s.meta)}</p>
          <h3 class="h4">${esc(s.title)}</h3>
          <p class="small" style="margin-top:var(--space-2);line-height:var(--leading-relaxed)">${esc(s.body)}</p>
        </div>`).join('');
    },

    faq(node) {
      node.innerHTML = D.FAQS.map((f, i) => `<div class="acc">
          <button type="button" class="acc__head" aria-expanded="false" aria-controls="faq-panel-${i}">
            <span>${esc(f.q)}</span><span class="acc__sign" aria-hidden="true">+</span>
          </button>
          <div class="acc__panel" id="faq-panel-${i}"><div>${esc(f.a)}</div></div>
        </div>`).join('');
      wireAccordion(node);
    },

    sizes(node) {
      const head = ['FR', 'US', 'UK', 'IT', 'Bust cm', 'Waist cm', 'Hip cm'];
      node.innerHTML = '<thead><tr>' + head.map((h) => `<th scope="col">${h}</th>`).join('') + '</tr></thead><tbody>' +
        D.SIZES.map((r) => '<tr>' + r.map((c) => `<td>${esc(c)}</td>`).join('') + '</tr>').join('') + '</tbody>';
    },

    collections(node) {
      node.innerHTML = D.COLLECTIONS.map((c, i) => `<div class="season" data-stagger style="--i:${i % 4}">
          <p class="season__tag">${esc(c.season)}</p>
          <h3 class="h3">${esc(c.name)}</h3>
          <p class="card__sub">${esc(c.place)}</p>
          <p class="small" style="margin-top:var(--space-3);line-height:var(--leading-relaxed)">${esc(c.note)}</p>
        </div>`).join('');
    },

    /* ── product detail ─────────────────────────────────────────── */
    pdp(node) {
      const p = productById(param('id')) || D.PRODUCTS[0];
      const c = D.collectionOf(p.collection);
      document.title = p.name + ' — Dysobay';
      const inWish = store.has('wishlist', p.id);
      const statusText = { 'in-stock': 'Available — one piece', 'last-piece': 'Last piece', sold: 'Sold — design retired' }[p.status];

      node.innerHTML = `
        <div class="pdp__gallery">
          ${p.images.map((src, i) => `<figure class="media media--3x4 pdp__shot" data-reveal-media data-shot="${i}"${tone(src)}>
              <span class="media__inner"><img ${imgAttrs(src, p.name + (i ? ' — detail ' + i : ' — full look'), 'wide', i ? true : false)}></span>
            </figure>`).join('')}
        </div>

        <div class="pdp__panel">
          <div class="pdp__sticky stack">
            <p class="eyebrow">${esc(p.category)} · ${esc(c.name)} ${esc(c.season)}${p.walked ? ' · ' + esc(p.walked) : ''}</p>
            <h1 class="h1" data-split>${esc(p.name)}</h1>
            <p class="pdp__price">${D.AED(p.price)}</p>
            <p><span class="tag tag--clay">One piece only</span> <span class="tag">${esc(p.size)}</span> <span class="tag tag--denim">No. ${esc(p.piece)}</span></p>
            <p class="status status--${p.status}">${esc(statusText)}</p>
            <p class="lede" style="max-width:46ch">${esc(p.note)}</p>

            <div class="pdp__actions">
              <button type="button" class="btn btn--lg btn--block" data-add-bag="${p.id}"${p.status === 'sold' ? ' disabled' : ''}>${p.status === 'sold' ? 'Sold out' : 'Add to bag — ' + D.AED(p.price)}</button>
              <button type="button" class="pdp__wish${inWish ? ' is-on' : ''}" data-toggle-wishlist="${p.id}">${inWish ? 'Saved to wishlist' : 'Add to wishlist'}</button>
            </div>

            <ul class="pdp__assure">
              <li>Worldwide express shipping included</li>
              <li>One alteration by the atelier that made it</li>
              <li>Numbered authenticity card</li>
            </ul>

            <div class="pdp__spec">
              ${[['Material', p.material], ['Lining', p.lining], ['Size', p.size + ' — cut once, no other size exists'],
                 ['Atelier', p.atelier], ['Hours of work', p.hours + ' h'], ['Piece number', p.piece],
                 ['Collection', c.name + ' · ' + c.season], ['Shown at', p.walked ? c.place + ' — ' + p.walked : 'Not shown — studio release']]
                .map(([k, v]) => `<div class="pdp__specrow"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}
            </div>

            <div class="pdp__acc">
              ${[
                ['The making', `Drawn, cut and finished once. ${esc(p.hours)} hours of work at ${esc(p.atelier)}, in ${esc(p.material.toLowerCase())}. Nothing about this piece is graded to a size run — the pattern exists in ${esc(p.size)} and nowhere else, and it is destroyed once the piece ships.`],
                ['Sizing & fit', `Cut to ${esc(p.size)}. Use the size guide to convert it, and write to us before ordering if you are between sizes — one alteration by the atelier that made the piece is included, and we would rather adjust it than take it back.`],
                ['Shipping & duties', 'Express shipping from Dubai is included worldwide, dispatched within 3–5 working days of your order. Duties and taxes are calculated and settled at checkout, so nothing arrives with a bill attached.'],
                ['Care', 'Specific to this piece: professional clean only, cool iron on the reverse, store on a broad hanger away from direct light. Never tumble-dry. We repair anything we made, for as long as we exist — materials at cost, labour free.'],
                ['Authenticity & provenance', `Ships with a numbered card carrying the piece number (${esc(p.piece)}), the atelier, the hours worked and the name of the person who finished it. The card is registered against your order, not against the design — because the design is not repeated.`],
                ['Returns', 'All sales are final. Every piece is the only one, so a return does not go back into stock — it goes into a cupboard. Ask us anything before you order; a person answers.'],
              ].map(([q, a], i) => `<div class="acc">
                  <button type="button" class="acc__head" aria-expanded="false" aria-controls="pdp-acc-${i}"><span>${q}</span><span class="acc__sign" aria-hidden="true">+</span></button>
                  <div class="acc__panel" id="pdp-acc-${i}"><div>${a}</div></div>
                </div>`).join('')}
            </div>

            <p class="small pdp__links">
              <a class="link-underline" href="sizeguide.html">Size guide</a> ·
              <a class="link-underline" href="faq.html">FAQ</a> ·
              <a class="link-underline" href="contact.html">Book an appointment</a>
            </p>
          </div>
        </div>`;

      wireAccordion(node);

      /* A buy bar that arrives once the real button has scrolled away. */
      if (ANIM && p.status !== 'sold') {
        let bar = $('.buybar');
        if (!bar) { bar = document.createElement('div'); bar.className = 'buybar'; document.body.appendChild(bar); }
        bar.innerHTML = `<span class="buybar__meta"><span class="buybar__name">${esc(p.name)}</span>
            <span class="buybar__price">${D.AED(p.price)} · ${esc(p.size)}</span></span>
          <button type="button" class="btn" data-add-bag="${p.id}">Add to bag</button>`;
        const anchor = $('.pdp__actions', node);
        ScrollTrigger.create({
          trigger: anchor, start: 'bottom top+=8',
          onToggle: (self) => {
            bar.classList.toggle('is-on', self.isActive);
            gsap.to(bar, { yPercent: self.isActive ? 0 : 110, duration: 0.4, ease: 'expo.out' });
          },
        });
      }

      const rel = $('[data-render="related"]');
      if (rel) {
        const same = D.PRODUCTS.filter((x) => x.id !== p.id && x.collection === p.collection);
        const rest = D.PRODUCTS.filter((x) => x.id !== p.id && x.collection !== p.collection);
        rel.innerHTML = same.concat(rest).slice(0, 4).map(cardHTML).join('');
      }
      const relTitle = $('[data-related-collection]');
      if (relTitle) relTitle.textContent = c.name;
    },

    related() { /* filled by pdp, which knows what to exclude */ },

    bag(node) {
      const items = store.items('bag');
      if (!items.length) {
        node.innerHTML = `<div class="empty stack">
          <p class="h2">Your bag is empty.</p>
          <p class="lede">Thirty-one pieces exist. Each of them once.</p>
          <p><a class="btn btn--lg" href="collections.html">See what is still available</a></p>
        </div>`;
        return;
      }
      const sub = items.reduce((s, p) => s + p.price, 0);
      const duties = Math.round(sub * 0.05);

      node.innerHTML = `
        <div class="bagwrap">
          <div class="bagwrap__lines">
            <p class="eyebrow">${items.length} piece${items.length === 1 ? '' : 's'} · each the only one</p>
            ${items.map((p) => `<article class="bagline">
                <a class="media media--3x4" href="product.html?id=${encodeURIComponent(p.id)}" style="--tone:${D.toneOf(p.images[0])}">
                  <span class="media__inner"><img ${imgAttrs(p.images[0], p.name, 'card')}></span>
                </a>
                <div class="bagline__body">
                  <a class="h3" href="product.html?id=${encodeURIComponent(p.id)}">${esc(p.name)}</a>
                  <p class="card__sub">${esc(D.collectionOf(p.collection).name)} · ${esc(D.collectionOf(p.collection).season)}</p>
                  <dl class="bagline__spec">
                    <div><dt>Size</dt><dd>${esc(p.size)}</dd></div>
                    <div><dt>Piece</dt><dd>No. ${esc(p.piece)}</dd></div>
                    <div><dt>Atelier</dt><dd>${esc(p.atelier)}</dd></div>
                    <div><dt>Work</dt><dd>${esc(p.hours)} hours</dd></div>
                  </dl>
                  <div class="bagline__acts">
                    <button type="button" class="link-underline" data-remove-bag="${p.id}">Remove</button>
                    <button type="button" class="link-underline" data-toggle-wishlist="${p.id}">Move to wishlist</button>
                  </div>
                </div>
                <p class="bagline__price">${D.AED(p.price)}</p>
              </article>`).join('')}
            <p class="small bagwrap__note">Nothing here is reserved. Every piece is the only one, and the bag does not hold it.</p>
          </div>

          <aside class="bagsum">
            <h2 class="h4">Summary</h2>
            <div class="sumrow"><span>${items.length} piece${items.length === 1 ? '' : 's'}</span><span>${D.AED(sub)}</span></div>
            <div class="sumrow"><span>Express shipping</span><span>Included</span></div>
            <div class="sumrow"><span>Duties &amp; taxes (est.)</span><span>${D.AED(duties)}</span></div>
            <div class="sumrow sumrow--total"><span>Total</span><span>${D.AED(sub + duties)}</span></div>
            <a class="btn btn--lg btn--block" href="checkout.html">Checkout</a>
            <a class="btn btn--ghost btn--block" href="collections.html">Keep looking</a>
            <ul class="pdp__assure">
              <li>One alteration by the atelier that made it</li>
              <li>Numbered authenticity card</li>
              <li>Lifetime repair, labour free</li>
            </ul>
          </aside>
        </div>`;

      const also = $('[data-render="also"]');
      if (also) {
        const ids = items.map((p) => p.id);
        also.innerHTML = D.PRODUCTS.filter((p) => !ids.includes(p.id) && p.status !== 'sold').slice(0, 4).map(cardHTML).join('');
      }
    },

    wishlist(node) {
      const items = store.items('wishlist');
      if (!items.length) {
        node.innerHTML = `<div class="empty stack"><p class="lede">Nothing saved yet.</p><p><a class="btn" href="collections.html">Browse the collection</a></p></div>`;
        return;
      }
      node.innerHTML = items.map((p, i) => `<div data-stagger style="--i:${i % 3}">
          ${cardHTML(p)}
          <div style="display:flex;gap:var(--space-2);margin-top:var(--space-3)">
            <button type="button" class="btn btn--ghost btn--block" data-add-bag="${p.id}"${p.status === 'sold' ? ' disabled' : ''}>${p.status === 'sold' ? 'Sold' : 'Add to bag'}</button>
            <button type="button" class="btn btn--ghost" data-toggle-wishlist="${p.id}" aria-label="Remove ${esc(p.name)} from wishlist">×</button>
          </div>
        </div>`).join('');
    },

    search(node) {
      const input = $('[data-search-input]');
      const out = $('[data-search-results]');
      const summary = $('[data-search-summary]');
      function run(q) {
        const t = q.trim().toLowerCase();
        const list = t ? D.PRODUCTS.filter((p) => [p.name, p.category, p.material, p.atelier, p.note, D.collectionOf(p.collection).name]
          .join(' ').toLowerCase().includes(t)) : D.PRODUCTS;
        out.innerHTML = list.length ? list.map(cardHTML).join('')
          : '<p class="lede empty">No piece matches that. Try a category, a season, or a material — wool, silk, denim.</p>';
        summary.textContent = t ? `${list.length} result${list.length === 1 ? '' : 's'} for “${q.trim()}”` : `${list.length} pieces, each one once.`;
        animateIn(out);
      }
      if (input) {
        const q0 = param('q'); if (q0) input.value = q0;
        input.addEventListener('input', () => run(input.value));
        $$('[data-search-suggest]').forEach((b) => b.addEventListener('click', () => { input.value = b.dataset.searchSuggest; run(input.value); }));
        run(input.value);
      }
    },

    /* Pinned horizontal rail — the aggressive centrepiece on Home. */
    rail(node) {
      const src = node.dataset.railSource;
      const list = src === 'lookbook' ? D.LOOKBOOK.slice(0, 10) : D.PRODUCTS.slice(0, 10).map((p) => ({ src: p.images[0], caption: p.name, href: 'product.html?id=' + p.id }));
      node.innerHTML = list.map((s) => {
        const inner = `<span class="media__inner"><img ${imgAttrs(s.src, s.caption, 'card')}></span><span class="rail__cap">${esc(s.caption)}</span>`;
        return s.href
          ? `<a class="media media--3x4 rail__item" href="${s.href}">${inner}</a>`
          : `<figure class="media media--3x4 rail__item">${inner}</figure>`;
      }).join('');
    },
  };

  function wireAccordion(root) {
    root.addEventListener('click', (e) => {
      const head = e.target.closest('.acc__head');
      if (!head) return;
      const panel = head.nextElementSibling;
      const open = head.getAttribute('aria-expanded') === 'true';
      head.setAttribute('aria-expanded', String(!open));
      head.querySelector('.acc__sign').textContent = open ? '+' : '−';
      const to = open ? 0 : panel.scrollHeight;
      if (ANIM) gsap.to(panel, { height: to, duration: 0.45, ease: 'expo.out', onComplete: () => ScrollTrigger.refresh() });
      else panel.style.height = to ? 'auto' : 0;
    });
  }

  /* ═══════════════════════════  animation  ═══════════════════════ */

  function splitChars(el) {
    if (el.dataset.splitDone) return;
    const words = el.textContent.trim().split(/\s+/);
    el.textContent = '';
    words.forEach((w, wi) => {
      const word = document.createElement('span');
      word.className = 'word';
      for (const ch of w) {
        const m = document.createElement('span'); m.className = 'ch__mask';
        const c = document.createElement('span'); c.className = 'ch'; c.textContent = ch;
        m.appendChild(c); word.appendChild(m);
      }
      el.appendChild(word);
      if (wi < words.length - 1) el.appendChild(document.createTextNode(' '));
    });
    el.dataset.splitDone = '1';
  }

  /* ── section choreographies ──────────────────────────────────────────
     Six entrances. A section plays exactly one of them, once, when it comes
     into view; after that its contents are ordinary static DOM. Nothing here
     is tied to scroll position, which is the whole point — the page moves at
     the speed of the finger and the animation runs on its own clock beside it.

     `copy` / `blocks` are the offsets text and whole components start from,
     `frames` is how framed photography unmasks, `from` is the stagger origin.
     Which section gets which is decided by what is inside it (choreoFor). */
  const CHOREO = {
    rise:    { copy: { y: 46 },  blocks: { y: 66 },              frames: 'up',   dur: 1.10, amount: 0.55 },
    cascade: { copy: { y: 34 },  blocks: { y: 54, scale: 0.96 }, frames: 'up',   dur: 1.20, amount: 0.80, from: 'start' },
    center:  { copy: { y: 26 },  blocks: { y: 20, scale: 0.90 }, frames: 'iris', dur: 1.00, amount: 0.50, from: 'center' },
    sweep:   { copy: { x: -40 }, blocks: { x: -70 },             frames: 'left', dur: 1.05, amount: 0.65, from: 'start' },
    unveil:  { copy: { y: 30 },  blocks: { y: 28 },              frames: 'left', dur: 1.35, amount: 0.70 },
    lift:    { copy: { y: 58 },  blocks: { y: 96 },              frames: 'zoom', dur: 1.40, amount: 0.85, from: 'edges' },
  };
  const FRAME_FROM = {
    up:   { clipPath: 'inset(0% 0% 100% 0%)' },
    left: { clipPath: 'inset(0% 100% 0% 0%)' },
    iris: { clipPath: 'inset(15% 15% 15% 15%)' },
    zoom: { clipPath: 'inset(0% 0% 100% 0%)' },
  };
  const ROTATION = ['rise', 'unveil', 'cascade', 'lift', 'center', 'sweep'];
  let choreoSeq = 0, lastChoreo = '';

  function choreoFor(sec) {
    if (sec.dataset.motion && CHOREO[sec.dataset.motion]) return sec.dataset.motion;
    let key = '';
    /* Content decides first: a horizontal row should arrive along its own axis,
       a wall of photographs should unmask, a line of numbers should land from
       the middle outwards. */
    if (sec.classList.contains('rail')) key = 'sweep';
    else if ($('.stat', sec)) key = 'center';
    else if ($('.clause, .manifesto-row, .acc, .table, .bagline, .coline, .stockist', sec)) key = 'sweep';
    else if ($$('.card, .look', sec).length >= 4) key = 'cascade';
    else if ($$('figure.media, [data-reveal-media], a.media', sec).length >= 2) key = 'unveil';
    else {
      /* Otherwise rotate — skipping whatever the section above just used, so
         two neighbours never arrive identically and read as one generic move. */
      do { key = ROTATION[choreoSeq++ % ROTATION.length]; } while (key === lastChoreo);
    }
    lastChoreo = key;
    sec.dataset.motion = key;
    return key;
  }

  /* Phones get the same choreography at roughly a third of the travel and half
     the duration: a 1.3s entrance cannot keep up with a thumb flick, and what
     you see instead is a blank band where a section should be. */
  const shrink = (o, fast) => {
    if (!fast) return Object.assign({}, o);
    const r = {};
    /* Scale is dropped on phones, not merely reduced: scaling a card that
       contains a photograph re-rasterises it every frame, and on a mid-range
       phone that is the difference between a clean scroll and a fifth of the
       frames running long. Translation is free by comparison. */
    Object.keys(o).forEach((k) => { if (k !== 'scale') r[k] = o[k] * 0.4; });
    return r;
  };
  const settled = (o, fast) => {
    const r = {};
    Object.keys(o).forEach((k) => {
      if (k === 'scale') { if (!fast) r[k] = 1; } else r[k] = 0;
    });
    return r;
  };

  /* One trigger per section. Everything inside arrives together, once, and
     then sits still — no per-element parallax and no velocity skew, which is
     what made cards wobble independently of each other while scrolling. */
  function revealSection(sec, immediate) {
    if (sec.dataset.revealed) return;
    sec.dataset.revealed = '1';

    $$('[data-split]', sec).forEach(splitChars);
    const chars = $$('[data-split] .ch', sec);
    /* Blocks move as whole units: a card is one thing, not a photo plus a price. */
    /* [data-reveal] / [data-stagger] MUST be in this list: the stylesheet hides
       them at opacity 0, so anything the reveal misses stays invisible for
       good — that is what took out the contact form and the wishlist. */
    const blocks = $$('.card, .stat, .service, .season, .press, .stockist, .manifesto-row, .bagline, .coline, .clause, .sociallink, [data-block], [data-reveal], [data-stagger]', sec);
    const inBlock = (el) => blocks.some((b) => b !== el && b.contains(el));
    /* Only the slider is excluded — it is already in motion. Frames nested
       inside a block still unmask: the block animates y, the frame animates
       clip-path, so they are not competing for anything. */
    const frames = $$('[data-reveal-media], figure.media, a.media', sec)
      .filter((el) => !el.closest('.slider'));
    const copy = $$('[data-rise], .eyebrow, .display, .h1, .h2, .h3, .h4, .lede, .brush, .btn, .link-underline, .filters, .refine, .table, .acc', sec)
      .filter((el) => !inBlock(el) && !el.closest('[data-split]'));

    const C = CHOREO[choreoFor(sec)];
    const fast = isPhone();
    const from = C.from || 'start';
    const dur = fast ? 0.48 : C.dur;
    const amount = (n, cap) => Math.min(fast ? 0.22 : Math.min(C.amount, cap), n * (fast ? 0.04 : 0.08));

    /* start: 'top 88%' — a section begins arriving as its top crosses the last
       eighth of the viewport, so it is already settled by the time you read it.
       Phones start later and finish sooner because they scroll faster. */
    const tl = gsap.timeline(
      immediate ? {} : { scrollTrigger: { trigger: sec, start: fast ? 'top 97%' : 'top 88%', once: true } }
    );

    if (chars.length) tl.fromTo(chars, { yPercent: fast ? 60 : 116, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: fast ? 0.5 : dur, ease: 'expo.out',
        stagger: { amount: fast ? 0.2 : 0.45 } }, 0);
    if (copy.length) tl.fromTo(copy, Object.assign({ opacity: 0 }, shrink(C.copy, fast)),
      Object.assign({ opacity: 1, duration: dur * 0.92, ease: 'expo.out',
        stagger: { amount: amount(copy.length, 0.5), from } }, settled(C.copy, fast)), 0.04);
    if (blocks.length) tl.fromTo(blocks, Object.assign({ opacity: 0 }, shrink(C.blocks, fast)),
      Object.assign({ opacity: 1, duration: dur * 1.04, ease: 'expo.out',
        stagger: { amount: amount(blocks.length, C.amount), from } }, settled(C.blocks, fast)), fast ? 0.02 : 0.1);

    const inners = [];
    if (frames.length) {
      /* The stylesheet clips every frame to zero height as its base state. The
         phone path fades rather than unmasking, so it MUST clear that clip
         itself — animating opacity alone left every photograph on every phone
         invisible, which is not a slow connection, it is a blank site. */
      if (fast) {
        tl.fromTo(frames, { opacity: 0, clipPath: 'inset(0% 0% 0% 0%)' },
          { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.4, ease: 'power2.out',
            stagger: { amount: 0.18, from } }, 0.02);
      } else {
        tl.fromTo(frames, FRAME_FROM[C.frames],
          { clipPath: 'inset(0% 0% 0% 0%)', duration: dur * 1.1, ease: 'expo.out',
            stagger: { amount: amount(frames.length, 0.6), from } }, 0.12);
        /* Two of the six push the photograph itself: the frame opens while the
           image inside settles back from an overscale. .media is overflow:hidden,
           so this reads as the crop tightening, not as an element moving. */
        if (C.frames === 'zoom' || C.frames === 'iris') {
          frames.forEach((f) => { const m = $('img, video', f); if (m) inners.push(m); });
          if (inners.length) tl.fromTo(inners, { scale: 1.14 },
            { scale: 1, duration: dur * 1.25, ease: 'expo.out',
              stagger: { amount: amount(inners.length, 0.6), from } }, 0.12);
        }
      }
    }

    /* Marks the section as arrived so the stylesheet holds its contents visible
       without depending on the inline styles the tween left behind — one class
       per section, and nothing is ever stuck invisible if a tween is cut short.
       Those inline styles are deliberately NOT cleared: stripping them costs an
       extra style recalculation and layout for every element in the section
       (measured: index went from 93 layouts to 164 over the same scroll), and
       buys nothing, because GSAP has already dropped back to a 2D transform and
       released the compositor layer by the time it completes. */
    tl.eventCallback('onComplete', () => { sec.classList.add('is-revealed'); });

    return tl;
  }

  function animateIn(root) {
    if (!ANIM) return;
    const R = root || document;

    /* A re-render (filter, sort, search) plays straight away — the section it
       lives in has already been revealed, so there is nothing to wait for. */
    if (R !== document && !R.matches('section, .rail')) {
      const sec = R.closest('section, .rail');
      if (sec && sec.dataset.revealed) {
        delete R.dataset.revealed;
        revealSection(R, true);
        initMagnetic(R);
        return;
      }
    }

    $$('section, .rail', R).forEach((sec) => {
      if (sec.classList.contains('hero') || sec.classList.contains('marquee')) return;
      revealSection(sec);
    });
    if (R.matches && R.matches('section, .rail')) revealSection(R);

    /* Curtain: a band wipes open across the viewport as it arrives. */
    $$('[data-curtain]', R).forEach((el) => {
      if (el.dataset.curtained) return;
      el.dataset.curtained = '1';
      if (isPhone()) { gsap.set(el, { clipPath: 'none' }); return; }
      gsap.fromTo(el, { clipPath: 'inset(0% 50% 0% 50%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 86%', once: true } });
    });

    /* Counters roll up when their band arrives. */
    $$('[data-count-to]', R).forEach((el) => {
      if (el.dataset.counted) return;
      el.dataset.counted = '1';
      const to = parseFloat(el.dataset.countTo);
      const obj = { v: 0 };
      gsap.to(obj, { v: to, duration: 1.8, ease: 'expo.out',
        onUpdate: () => { el.textContent = Math.round(obj.v); },
        scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
    });

    initMagnetic(R);
  }

  /* Buttons lean toward the cursor. */
  function initMagnetic(root) {
    if (!ANIM || isPhone()) return;
    $$('[data-magnetic]', root).forEach((el) => {
      if (el.dataset.magnetised) return;
      el.dataset.magnetised = '1';
      const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * 0.32);
        yTo((e.clientY - (r.top + r.height / 2)) * 0.5);
      });
      el.addEventListener('mouseleave', () => { xTo(0); yTo(0); });
    });
  }

  /* Horizontal rail. It used to be pinned and scrubbed: the page froze while
     the row slid past, which is the single most intrusive thing a site can do
     to a scroll. It is now an ordinary overflow-x row at every width — a swipe
     on a phone, a drag or a trackpad flick on a desktop — and the only motion
     it has is the same arrival stagger as everything else, running left to
     right along its own axis. */
  function initRails(root) {
    $$('[data-hscroll]', root).forEach((section) => {
      if (section.dataset.railed) return;
      section.dataset.railed = '1';
      section.classList.add('rail--swipe');
      const track = $('[data-hscroll-track]', section);
      if (!track) return;
      if (gsap) gsap.set(track, { clearProps: 'transform' });

      /* Pointer drag, on top of the native scroll — a mouse has no swipe. */
      let down = false, startX = 0, startLeft = 0, moved = 0;
      track.addEventListener('pointerdown', (e) => {
        if (e.pointerType === 'touch' || e.button !== 0) return;
        down = true; moved = 0; startX = e.clientX; startLeft = track.scrollLeft;
        track.classList.add('is-dragging');
      });
      track.addEventListener('pointermove', (e) => {
        if (!down) return;
        const dx = e.clientX - startX;
        moved = Math.max(moved, Math.abs(dx));
        track.scrollLeft = startLeft - dx;
      });
      const release = () => { down = false; track.classList.remove('is-dragging'); };
      track.addEventListener('pointerup', release);
      track.addEventListener('pointercancel', release);
      track.addEventListener('pointerleave', release);
      /* A drag that travelled must not also open the card it finished on. */
      track.addEventListener('click', (e) => {
        if (moved > 6) { e.preventDefault(); e.stopPropagation(); moved = 0; }
      }, true);
    });
  }

  /* Hero: the film settles out of an overscale and the type climbs in, once,
     on load. It used to be pinned and scrubbed — the page held still for a
     screen and a half while the crop tightened, which is exactly the scroll
     hijack this site no longer does. */
  /* Safari lists no support for VP9 and some browsers refuse autoplay outright
     (low-power mode, data saver). Either way the hero must not freeze on a
     poster frame — fall back to the animated GIF, which always moves. */
  function guardHeroFilm(container) {
    $$('video[data-film]', container).forEach((video) => {
      const swap = () => {
        if (video.dataset.swapped) return;
        video.dataset.swapped = '1';
        const gif = video.dataset.gif;
        if (!gif) return;
        const img = document.createElement('img');
        img.src = gif;
        img.alt = video.getAttribute('aria-label') || '';
        video.replaceWith(img);
      };
      video.addEventListener('error', swap);
      /* Decoding video off-screen is pure cost on a phone. */
      if ('IntersectionObserver' in window) {
        new IntersectionObserver((entries) => entries.forEach((en) => {
          if (!video.isConnected) return;
          if (en.isIntersecting) video.play().catch(() => {});
          else video.pause();
        }), { threshold: 0.05 }).observe(video);
      }
      const attempt = video.play();
      if (attempt && attempt.catch) attempt.catch(() => { if (video.readyState < 2) swap(); });
      /* Only a video that never decoded a frame counts as broken. A paused one
         is usually just a phone saving power, and swapping it for a 1.8 MB GIF
         made the hero look worse than leaving it alone. */
      setTimeout(() => { if (video.isConnected && video.readyState < 2) swap(); }, 3000);
    });
  }

  function heroAnimation(container) {
    const hero = $('.hero', container);
    if (!hero || !ANIM) return;
    const media = $('.hero__media', hero);
    const film = $('.hero__film', hero);

    /* The intro runs on the media element INSIDE .hero__film, never on
       .hero__film itself — .hero__film carries the layout, and animating both
       used to leave the crop locked at 1.5x when a refresh landed mid-flight. */
    const inner = $('video, img', film) || film;
    const tl = gsap.timeline();
    tl.fromTo(inner, { scale: 1.35, filter: 'blur(16px)' },
      { scale: 1, filter: 'blur(0px)', duration: 2, ease: 'expo.out' }, 0);
    tl.fromTo($$('.hero__body > *', hero), { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.3, ease: 'expo.out', stagger: 0.1 }, 0.2);
    tl.fromTo($('.hero__scroll', hero), { opacity: 0 }, { opacity: 1, duration: 0.8 }, 1.4);
    tl.eventCallback('onComplete', () => {
      if (media) gsap.set(media, { clearProps: 'clipPath' });
      gsap.set(inner, { clearProps: 'filter,willChange' });
    });
  }

  /* Marquee: speed and direction follow the scroll. */
  let marqueeTweens = [];
  function marqueeAnimation(container) {
    $$('.marquee', container).forEach((node) => {
      const track = $('.marquee__track', node);
      if (!track) return;
      if (!track.dataset.built) {
        const run = document.createElement('div');
        run.className = 'marquee__run';
        while (track.firstChild) run.appendChild(track.firstChild);
        track.appendChild(run);
        const copies = Math.max(2, Math.ceil((window.innerWidth * 2) / Math.max(run.offsetWidth, 1)));
        for (let i = 0; i < copies; i++) track.appendChild(run.cloneNode(true));
        track.dataset.built = '1';
      }
      if (!ANIM) return;
      const run = $('.marquee__run', track);
      const dist = run.offsetWidth;
      gsap.killTweensOf(track);
      gsap.set(track, { x: 0 });
      const tw = gsap.to(track, { x: -dist, duration: dist / 90, ease: 'none', repeat: -1 });
      marqueeTweens.push(tw);
    });
  }

  /* ── scroll-driven global effects ──────────────────────────────── */

  const nav = $('.nav');
  const progress = (() => {
    let bar = $('.scrollbar');
    if (!bar) { bar = document.createElement('div'); bar.className = 'scrollbar'; bar.innerHTML = '<span></span>'; document.body.appendChild(bar); }
    return bar.firstElementChild;
  })();

  let lastScroll = 0;
  let progressSetter = null;
  let ticking = false;
  /* Measured once per page and per resize, never per scroll event. Reading
     offsetHeight and scrollHeight inside the scroll handler forces a layout on
     every single frame you scroll, which is a cost the eye reads as stutter
     long before any animation is to blame. */
  let heroHeight = 0, scrollMax = 1;
  function measure() {
    const hero = $('.hero');
    heroHeight = hero ? hero.offsetHeight : 0;
    scrollMax = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  }

  function paintScroll() {
    ticking = false;
    const y = window.scrollY;

    if (nav) {
      const overHero = heroHeight > 0 && y < heroHeight * 0.55;
      nav.classList.toggle('is-over-hero', overHero);
      nav.classList.toggle('is-hidden', !overHero && y > 240 && y > lastScroll);
    }
    lastScroll = y;

    const pct = Math.min(1, y / scrollMax);
    if (progressSetter) progressSetter(pct); else progress.style.transform = 'scaleX(' + pct + ')';
  }

  /* One paint per frame at most, whatever the scroll event rate. */
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(paintScroll);
  }

  function setActiveNav() {
    const here = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    $$('.nav__link').forEach((a) => {
      const t = a.getAttribute('href').split('?')[0].toLowerCase();
      a.classList.toggle('is-active', t === here || (a.dataset.alsoActiveOn || '').split(' ').includes(here));
    });
  }

  function wireMobileNav() {
    const toggle = $('.nav__toggle'), links = $('.nav__links');
    if (!toggle || !links || toggle.dataset.wired) return;
    toggle.dataset.wired = '1';
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Close' : 'Menu';
      if (ANIM && open) gsap.fromTo($$('.nav__link', links), { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: 'expo.out', stagger: 0.05 });
    });
    links.addEventListener('click', (e) => {
      if (e.target.closest('a')) { links.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); toggle.textContent = 'Menu'; }
    });
  }

  /* ── delegated interaction ─────────────────────────────────────── */

  document.addEventListener('click', (e) => {
    const add = e.target.closest('[data-add-bag]');
    if (add) {
      const id = add.dataset.addBag, p = productById(id);
      if (!store.has('bag', id)) store.toggle('bag', id);
      if (ANIM) gsap.fromTo(add, { scale: 0.94 }, { scale: 1, duration: 0.5, ease: 'elastic.out(1,0.5)' });
      /* shop.js opens the mini bag on this same click, which is the feedback —
         a toast at the foot of a long product page is feedback nobody sees. */
      if (!window.DysobayShop) toast(p ? p.name + ' added to bag' : 'Added to bag');
      return;
    }
    const rm = e.target.closest('[data-remove-bag]');
    if (rm) {
      const row = rm.closest('.bagline');
      const finish = () => { store.remove('bag', rm.dataset.removeBag); const h = $('[data-render="bag"]'); if (h) { renderers.bag(h); animateIn(h); } toast('Removed from bag'); };
      if (ANIM && row) gsap.to(row, { x: 60, opacity: 0, duration: 0.32, ease: 'power2.in', onComplete: finish });
      else finish();
      return;
    }
    const wish = e.target.closest('[data-toggle-wishlist]');
    if (wish) {
      const id = wish.dataset.toggleWishlist;
      const added = store.toggle('wishlist', id);
      if (wish.textContent.trim() !== '×') wish.textContent = added ? 'Saved to wishlist' : 'Add to wishlist';
      wish.classList.toggle('is-on', added);
      const h = $('[data-render="wishlist"]');
      if (h) { renderers.wishlist(h); animateIn(h); }
      toast(added ? 'Saved to wishlist' : 'Removed from wishlist');
    }
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('[data-back-to-top]')) return;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  document.addEventListener('submit', (e) => {
    const form = e.target.closest('[data-demo-form]');
    if (!form) return;
    e.preventDefault();
    toast(form.dataset.demoForm);
    form.reset();
  });

  /* ═══════════════════════════  mount  ══════════════════════════ */

  function mount(container) {
    const root = container || document;

    Object.keys(renderers).forEach((k) => $$(`[data-render="${k}"]`, root).forEach((n) => renderers[k](n)));

    syncCounts();
    setActiveNav();
    wireMobileNav();
    if (window.DysobayShop) window.DysobayShop.mount(root);
    marqueeAnimation(root);
    /* Outside animateIn: a rail must be scrollable even when motion is off,
       and animateIn returns early in that case. */
    initRails(root);
    guardHeroFilm(root);
    heroAnimation(root);
    animateIn(root);

    if (ANIM) {
      progressSetter = gsap.quickSetter(progress, 'scaleX');
    }
    measure();
    paintScroll();

    if (ANIM) {
      /* Images finishing late move every trigger below them, so re-measure
         when they land rather than trusting the first-paint geometry. */
      const settle = () => { measure(); ScrollTrigger.refresh(); };
      const imgs = $$('img', root).filter((i) => !i.complete);
      let pending = imgs.length;
      if (!pending) settle();
      imgs.forEach((img) => {
        const done = () => { if (--pending <= 0) settle(); };
        img.addEventListener('load', done, { once: true });
        img.addEventListener('error', done, { once: true });
      });
      setTimeout(settle, 1400);
    }
  }

  function unmount() {
    if (!ANIM) return;
    /* revert:true so pin-spacers and inline pin styles do not survive the swap */
    ScrollTrigger.getAll().forEach((t) => t.kill(true));
    marqueeTweens.forEach((t) => t.kill());
    marqueeTweens = [];
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => { measure(); if (ANIM) ScrollTrigger.refresh(); }, { passive: true });

  /* ═══════════════════════════  barba  ══════════════════════════ */

  function initBarba() {
    window.barba.init({
      debug: false,
      prevent: ({ el }) => el.hasAttribute('data-barba-prevent') || /\.(pdf|jpg|png|gif|mp4|webm|zip)$/i.test(el.getAttribute('href') || ''),
      transitions: [{
        name: 'wipe',
        leave({ current }) {
          current.container.classList.add('barba-leaving');
          unmount();
          if (!ANIM) return;
          /* A phone gets a short cross-fade instead of a full-screen ink wipe:
             painting an opaque layer over the whole viewport twice per
             navigation is expensive, and it reads as a stall on a small screen. */
          if (isPhone()) return gsap.to(current.container, { opacity: 0, y: -24, duration: 0.24, ease: 'power2.in' });
          return gsap.timeline()
            .to(current.container, { y: -60, opacity: 0, duration: 0.4, ease: 'power3.in' })
            .fromTo('.pagewipe', { scaleY: 0, transformOrigin: 'bottom' }, { scaleY: 1, duration: 0.42, ease: 'expo.inOut' }, 0.05);
        },
        beforeEnter({ next }) {
          window.scrollTo(0, 0);
          document.title = next.container.dataset.title || document.title;
        },
        enter({ next }) {
          if (!ANIM) return;
          if (isPhone()) {
            gsap.set('.pagewipe', { scaleY: 0 });
            return gsap.fromTo(next.container, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.36, ease: 'power2.out' });
          }
          return gsap.timeline()
            .to('.pagewipe', { scaleY: 0, transformOrigin: 'top', duration: 0.5, ease: 'expo.inOut' })
            .fromTo(next.container, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out' }, 0.1);
        },
        after({ next }) { mount(next.container); },
      }],
    });
    window.barba.hooks.afterLeave(() => { if (nav) nav.classList.remove('is-hidden'); });
  }

  /* Reveal-on-demand for content injected outside the page container (search
     overlay, quick view). Without this the stylesheet's clip-path base state
     hides every photo in there for good. */
  function showNow(root) {
    if (!ANIM || !root) return;
    gsap.set($$('[data-reveal-media], [data-reveal], [data-stagger]', root), { clipPath: 'none', opacity: 1, y: 0 });
  }

  window.DYSOBAY_UI = {
    store, toast, cardHTML, animateIn, showNow, esc, ANIM, gsap, $, $$,
    renderGrid: (node) => renderers['product-grid'](node),
    productById,
  };

  function boot() {
    if (!$('.pagewipe')) {
      const w = document.createElement('div');
      w.className = 'pagewipe';
      w.setAttribute('aria-hidden', 'true');
      document.body.appendChild(w);
    }
    mount(document);
    if (CAN_BARBA) initBarba();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
