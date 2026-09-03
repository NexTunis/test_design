/* Dysobay storefront runtime.
 *
 * Three jobs, in this order of importance:
 *   1. Render the catalogue into each page's [data-render] hooks.
 *   2. Animate — GSAP + ScrollTrigger for scroll reveals and photo reveals.
 *   3. Navigate — Barba.js swaps the page container so nav/footer never blink.
 *
 * Everything degrades: with GSAP missing (or prefers-reduced-motion) nothing
 * is ever hidden, and with Barba missing (or on a file:// open, where its
 * fetch cannot work) links just navigate the browser's normal way.
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

  /* ───────────────────────────  helpers  ─────────────────────────── */

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.prototype.slice.call((root || document).querySelectorAll(sel));

  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function param(name) {
    return new URLSearchParams(window.location.search).get(name) || '';
  }

  function productById(id) {
    return D.PRODUCTS.find((p) => p.id === id);
  }

  /* ───────────────────────────  store  ───────────────────────────── */
  /* A prototype still has to behave like a shop: adding to the bag has to
     survive a page swap, or every "Add to bag" button is a dead control. */

  const store = {
    read(key) {
      try {
        return JSON.parse(localStorage.getItem('dysobay:' + key)) || [];
      } catch (e) {
        return [];
      }
    },
    write(key, val) {
      try {
        localStorage.setItem('dysobay:' + key, JSON.stringify(val));
      } catch (e) {
        /* private mode — the session still works, it just won't persist */
      }
      syncCounts();
    },
    has(key, id) {
      return this.read(key).indexOf(id) !== -1;
    },
    toggle(key, id) {
      const list = this.read(key);
      const i = list.indexOf(id);
      if (i === -1) list.push(id);
      else list.splice(i, 1);
      this.write(key, list);
      return i === -1;
    },
    remove(key, id) {
      this.write(key, this.read(key).filter((x) => x !== id));
    },
    items(key) {
      return this.read(key).map(productById).filter(Boolean);
    },
  };

  /* Seed a first-time visitor so Bag/Wishlist read as a real session. */
  if (localStorage.getItem('dysobay:seeded') !== '1') {
    try {
      localStorage.setItem('dysobay:seeded', '1');
      localStorage.setItem('dysobay:bag', JSON.stringify(['amara-cape', 'nuits-blazer']));
      localStorage.setItem('dysobay:wishlist', JSON.stringify(['zellige-dress', 'warda-coat', 'rihla-trench']));
    } catch (e) {
      /* ignore */
    }
  }

  function syncCounts() {
    const bag = store.read('bag').length;
    $$('[data-bag-count]').forEach((n) => {
      n.textContent = bag ? '(' + bag + ')' : '';
    });
    $$('[data-wishlist-count]').forEach((n) => {
      const w = store.read('wishlist').length;
      n.textContent = w ? '(' + w + ')' : '';
    });
  }

  let toastTimer;
  function toast(message) {
    let node = $('.toast');
    if (!node) {
      node = document.createElement('div');
      node.className = 'toast';
      node.setAttribute('role', 'status');
      document.body.appendChild(node);
    }
    node.textContent = message;
    clearTimeout(toastTimer);
    if (ANIM) {
      gsap.killTweensOf(node);
      gsap.fromTo(node, { yPercent: 120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.35, ease: 'power3.out' });
      toastTimer = setTimeout(() => gsap.to(node, { yPercent: 120, opacity: 0, duration: 0.3 }), 2200);
    } else {
      node.style.transform = 'translate(-50%, 0)';
      toastTimer = setTimeout(() => {
        node.style.transform = 'translate(-50%, 120%)';
      }, 2200);
    }
  }

  /* ───────────────────────────  templates  ───────────────────────── */

  function cardHTML(p) {
    const second = p.images[1] ? `<img src="${p.images[1]}" alt="" loading="lazy" aria-hidden="true">` : '';
    const flag = p.tag ? `<span class="tag tag--clay card__flag">${esc(p.tag)}</span>` : '';
    const sold = p.status === 'sold' ? '<span class="card__sold">Sold — retired</span>' : '';
    return `<a class="card" href="product.html?id=${encodeURIComponent(p.id)}">
      <span class="card__media" data-reveal-media>
        <img src="${p.images[0]}" alt="${esc(p.name)}" loading="lazy">
        ${second}
        ${flag}${sold}
      </span>
      <span class="card__meta">
        <span>
          <span class="card__name">${esc(p.name)}</span>
          <span class="card__sub">${esc(p.category)} · ${esc(p.size)}</span>
        </span>
        <span class="card__price">${D.AED(p.price)}</span>
      </span>
    </a>`;
  }

  function mediaHTML(src, alt, ratio, cls) {
    return `<figure class="media media--${ratio || '3x4'}${cls ? ' ' + cls : ''}" data-reveal-media>
      <img src="${src}" alt="${esc(alt || '')}" loading="lazy">
    </figure>`;
  }

  /* ───────────────────────────  renderers  ───────────────────────── */

  const renderers = {
    'product-grid'(node) {
      const limit = parseInt(node.dataset.limit, 10);
      let list = D.PRODUCTS.slice();
      if (node.dataset.filterCategory && node.dataset.filterCategory !== 'All') {
        list = list.filter((p) => p.category === node.dataset.filterCategory);
      }
      if (limit) list = list.slice(0, limit);
      node.innerHTML = list.length
        ? list.map(cardHTML).join('')
        : '<p class="lede empty">Nothing in this category right now. Every piece leaves for good — check the archive on the lookbook.</p>';
    },

    filters(node) {
      const target = $('[data-render="product-grid"]');
      node.innerHTML = D.CATEGORIES.map(
        (c, i) => `<button type="button" class="filter${i === 0 ? ' is-active' : ''}" data-category="${esc(c)}">${esc(c)}</button>`
      ).join('');
      node.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter');
        if (!btn || !target) return;
        $$('.filter', node).forEach((b) => b.classList.toggle('is-active', b === btn));
        target.dataset.filterCategory = btn.dataset.category;
        renderers['product-grid'](target);
        const count = $('[data-piece-count]');
        if (count) count.textContent = target.querySelectorAll('.card').length;
        animateIn(target);
      });
    },

    lookbook(node) {
      node.innerHTML = D.LOOKBOOK.map((s) => mediaHTML(s.src, s.caption, '3x4')).join('');
    },

    journal(node) {
      node.innerHTML = D.JOURNAL.map(
        (j) => `<article class="card">
          ${mediaHTML(j.image, j.title, '4x3')}
          <p class="card__sub" style="margin-top:var(--space-4)">${esc(j.date)}</p>
          <h3 class="h3" style="margin-top:var(--space-2)">${esc(j.title)}</h3>
          <p class="small" style="margin-top:var(--space-2);line-height:var(--leading-relaxed)">${esc(j.excerpt)}</p>
        </article>`
      ).join('');
    },

    manifesto(node) {
      node.innerHTML = D.MANIFESTO.map(
        (l) => `<div class="manifesto-row" data-reveal>
          <div class="manifesto-num">${esc(l.n)}</div>
          <div>
            <h2 class="h3">${esc(l.title)}</h2>
            <p class="lede" style="margin-top:var(--space-3)">${esc(l.body)}</p>
          </div>
        </div>`
      ).join('');
    },

    faq(node) {
      node.innerHTML = D.FAQS.map(
        (f, i) => `<div class="acc">
          <button type="button" class="acc__head" aria-expanded="false" aria-controls="faq-panel-${i}">
            <span>${esc(f.q)}</span><span class="acc__sign" aria-hidden="true">+</span>
          </button>
          <div class="acc__panel" id="faq-panel-${i}"><div>${esc(f.a)}</div></div>
        </div>`
      ).join('');

      node.addEventListener('click', (e) => {
        const head = e.target.closest('.acc__head');
        if (!head) return;
        const panel = head.nextElementSibling;
        const open = head.getAttribute('aria-expanded') === 'true';
        head.setAttribute('aria-expanded', String(!open));
        head.querySelector('.acc__sign').textContent = open ? '+' : '−';
        const to = open ? 0 : panel.scrollHeight;
        if (ANIM) gsap.to(panel, { height: to, duration: 0.35, ease: 'power2.out' });
        else panel.style.height = to ? 'auto' : 0;
      });
    },

    sizes(node) {
      const head = ['FR', 'US', 'UK', 'IT', 'Bust cm', 'Waist cm', 'Hip cm'];
      node.innerHTML =
        '<thead><tr>' +
        head.map((h) => `<th scope="col">${h}</th>`).join('') +
        '</tr></thead><tbody>' +
        D.SIZES.map((r) => '<tr>' + r.map((c) => `<td>${esc(c)}</td>`).join('') + '</tr>').join('') +
        '</tbody>';
    },

    pdp(node) {
      const p = productById(param('id')) || D.PRODUCTS[0];
      document.title = p.name + ' — Dysobay';
      const inWishlist = store.has('wishlist', p.id);
      node.innerHTML = `<div class="pdp__gallery">
          ${p.images.map((src, i) => mediaHTML(src, p.name + (i ? ' — detail' : ' — full look'), '3x4')).join('')}
        </div>
        <div class="stack">
          <p class="eyebrow">${esc(p.category)} · ${esc(p.season)}</p>
          <h1 class="h1" data-split>${esc(p.name)}</h1>
          <p class="h3">${D.AED(p.price)}</p>
          <p><span class="tag tag--clay">One piece only</span> <span class="tag">${esc(p.size)}</span></p>
          <p class="status status--${p.status}">${p.status === 'in-stock' ? 'Available' : p.status === 'last-piece' ? 'Last piece' : 'Sold — design retired'}</p>
          <p class="lede" style="max-width:46ch">${esc(p.note)}</p>
          <p class="lede" style="max-width:46ch">Cut once, in a single size, by hand in our Dubai atelier. When this piece sells, the design retires with it — no restock, no reissue.</p>
          <div style="display:flex;flex-wrap:wrap;gap:var(--space-3);margin-top:var(--space-6)">
            <button type="button" class="btn btn--lg" data-add-bag="${p.id}"${p.status === 'sold' ? ' disabled' : ''}>${p.status === 'sold' ? 'Sold out' : 'Add to bag'}</button>
            <button type="button" class="btn btn--ghost btn--lg" data-toggle-wishlist="${p.id}">${inWishlist ? 'In wishlist' : 'Add to wishlist'}</button>
          </div>
          <p class="small" style="margin-top:var(--space-6);border-top:1px solid var(--line);padding-top:var(--space-5)">
            <a class="link-underline" href="sizeguide.html">Size guide</a>
            &nbsp;·&nbsp;
            <a class="link-underline" href="faq.html">Shipping &amp; care</a>
          </p>
        </div>`;

      const related = $('[data-render="related"]');
      if (related) {
        related.innerHTML = D.PRODUCTS.filter((x) => x.id !== p.id)
          .slice(0, 4)
          .map(cardHTML)
          .join('');
      }
    },

    related() {
      /* filled by the pdp renderer, which knows which piece to exclude */
    },

    bag(node) {
      const items = store.items('bag');
      if (!items.length) {
        node.innerHTML = `<div class="empty stack">
          <p class="lede">Your bag is empty.</p>
          <p><a class="btn" href="collections.html">See what is still available</a></p>
        </div>`;
        return;
      }
      const total = items.reduce((s, p) => s + p.price, 0);
      node.innerHTML =
        items
          .map(
            (p) => `<div class="bagline" data-reveal>
        <a class="media media--3x4" href="product.html?id=${encodeURIComponent(p.id)}"><img src="${p.images[0]}" alt="${esc(p.name)}"></a>
        <div>
          <a class="h4" href="product.html?id=${encodeURIComponent(p.id)}">${esc(p.name)}</a>
          <p class="small" style="margin-top:var(--space-2)">Size ${esc(p.size)} · One piece only</p>
          <p style="margin-top:var(--space-3)">${D.AED(p.price)}</p>
        </div>
        <button type="button" class="bagline__remove" data-remove-bag="${p.id}" aria-label="Remove ${esc(p.name)} from bag">×</button>
      </div>`
          )
          .join('') +
        `<div class="bagtotal"><span>Subtotal</span><span>${D.AED(total)}</span></div>
         <p class="small" style="margin-bottom:var(--space-5)">Shipping from Dubai is calculated at checkout. Every piece here is the only one — leaving it in the bag does not hold it.</p>
         <a class="btn btn--lg btn--block" href="checkout.html">Checkout</a>`;
    },

    wishlist(node) {
      const items = store.items('wishlist');
      if (!items.length) {
        node.innerHTML = `<div class="empty stack">
          <p class="lede">Nothing saved yet.</p>
          <p><a class="btn" href="collections.html">Browse the collection</a></p>
        </div>`;
        return;
      }
      node.innerHTML = items
        .map(
          (p) => `<div>
            ${cardHTML(p)}
            <div style="display:flex;gap:var(--space-2);margin-top:var(--space-3)">
              <button type="button" class="btn btn--ghost btn--block" data-add-bag="${p.id}"${p.status === 'sold' ? ' disabled' : ''}>${p.status === 'sold' ? 'Sold' : 'Add to bag'}</button>
              <button type="button" class="btn btn--ghost" data-toggle-wishlist="${p.id}" aria-label="Remove ${esc(p.name)} from wishlist">×</button>
            </div>
          </div>`
        )
        .join('');
    },

    search(node) {
      const input = $('[data-search-input]');
      const out = $('[data-search-results]');
      const summary = $('[data-search-summary]');

      function run(q) {
        const term = q.trim().toLowerCase();
        const list = term
          ? D.PRODUCTS.filter(
              (p) =>
                p.name.toLowerCase().includes(term) ||
                p.category.toLowerCase().includes(term) ||
                p.season.toLowerCase().includes(term) ||
                p.note.toLowerCase().includes(term)
            )
          : D.PRODUCTS;
        out.innerHTML = list.length
          ? list.map(cardHTML).join('')
          : '<p class="lede empty">No piece matches that. Try a category — outerwear, tailoring, dresses, shirts.</p>';
        summary.textContent = term
          ? `${list.length} result${list.length === 1 ? '' : 's'} for “${q.trim()}”`
          : `${list.length} pieces, each one once.`;
        animateIn(out);
      }

      if (input) {
        const initial = param('q');
        if (initial) input.value = initial;
        input.addEventListener('input', () => run(input.value));
        run(input.value);
      }
      node.dataset.ready = '1';
    },
  };

  /* ───────────────────────────  animation  ───────────────────────── */

  function splitWords(el) {
    if (el.dataset.split === 'done') return;
    const words = el.textContent.trim().split(/\s+/);
    el.textContent = '';
    words.forEach((w, i) => {
      const outer = document.createElement('span');
      outer.className = 'line';
      const inner = document.createElement('span');
      inner.className = 'line__inner';
      inner.textContent = w;
      outer.appendChild(inner);
      el.appendChild(outer);
      if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
    });
    el.dataset.split = 'done';
  }

  /* Reveal every not-yet-revealed element inside `root`. Called on mount and
     again whenever a renderer replaces a chunk of the DOM (filter, search). */
  function animateIn(root) {
    if (!ANIM) return;

    $$('[data-split]', root).forEach((el) => {
      if (el.dataset.revealed) return;
      el.dataset.revealed = '1';
      splitWords(el);
      const inners = $$('.line__inner', el);
      /* fromTo, and both y and yPercent land at 0: GSAP resolves the CSS
         `translateY(110%)` start into pixels, so tweening yPercent alone
         leaves that pixel offset behind and the words never come up. */
      gsap.fromTo(
        inners,
        { yPercent: 110, y: 0 },
        {
          yPercent: 0,
          y: 0,
          duration: 0.9,
          ease: 'expo.out',
          stagger: 0.05,
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        }
      );
    });

    $$('[data-reveal]', root).forEach((el) => {
      if (el.dataset.revealed) return;
      el.dataset.revealed = '1';
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 86%', once: true },
      });
    });

    /* The photo reveal: the frame unmasks upward while the image inside
       settles back from an over-scale. Gives weight to editorial imagery
       without a parallax gimmick. */
    $$('[data-reveal-media]', root).forEach((el) => {
      if (el.dataset.revealed) return;
      el.dataset.revealed = '1';
      const img = el.firstElementChild;
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
      tl.to(el, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'expo.out' });
      if (img) tl.to(img, { scale: 1, duration: 1.4, ease: 'expo.out' }, 0);
    });
  }

  function heroAnimation(container) {
    const hero = $('.hero', container);
    if (!hero || !ANIM) return;

    const img = $('.hero__media img', hero);
    const body = $('.hero__body', hero);

    gsap.fromTo(img, { scale: 1.16 }, { scale: 1.06, duration: 2.2, ease: 'expo.out' });
    gsap.fromTo(
      $$('.hero__body > *', hero),
      { y: 34, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.09, delay: 0.15 }
    );

    /* Slow drift + fade as the hero scrolls away. */
    gsap.to(img, { yPercent: 12, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to(body, { yPercent: -18, opacity: 0.15, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
  }

  function marqueeAnimation(container) {
    $$('.marquee', container).forEach((node) => {
      const track = $('.marquee__track', node);
      if (!track) return;

      /* Wrap the authored items into one run, then clone the run — tiling a
         measured run is what makes the wrap-around invisible; scrolling a
         doubled innerHTML by -50% lands half a gap off. */
      if (!track.dataset.built) {
        const run = document.createElement('div');
        run.className = 'marquee__run';
        while (track.firstChild) run.appendChild(track.firstChild);
        track.appendChild(run);
        /* Enough clones to overflow even an ultrawide viewport. */
        const copies = Math.max(1, Math.ceil(window.innerWidth / Math.max(run.offsetWidth, 1)));
        for (let i = 0; i < copies; i++) track.appendChild(run.cloneNode(true));
        track.dataset.built = '1';
      }

      if (!ANIM) return;
      const run = $('.marquee__run', track);
      const distance = run.offsetWidth;
      gsap.killTweensOf(track);
      gsap.set(track, { x: 0 });
      gsap.to(track, { x: -distance, duration: distance / 55, ease: 'none', repeat: -1 });
    });
  }

  /* ───────────────────────────  chrome  ─────────────────────────── */

  const nav = $('.nav');
  let lastScroll = 0;

  function onScroll() {
    const y = window.scrollY;
    const hero = $('.hero');
    if (nav) {
      const overHero = !!hero && y < hero.offsetHeight - nav.offsetHeight - 8;
      nav.classList.toggle('is-over-hero', overHero);
      /* Hide on the way down, reveal on the way up — but never over the hero. */
      nav.classList.toggle('is-hidden', !overHero && y > 200 && y > lastScroll);
    }
    lastScroll = y;
  }

  function setActiveNav() {
    const here = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    $$('.nav__link').forEach((a) => {
      const target = a.getAttribute('href').split('?')[0].toLowerCase();
      a.classList.toggle('is-active', target === here || (a.dataset.alsoActiveOn || '').split(' ').includes(here));
    });
  }

  function wireMobileNav() {
    const toggle = $('.nav__toggle');
    const links = $('.nav__links');
    if (!toggle || !links || toggle.dataset.wired) return;
    toggle.dataset.wired = '1';
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Close' : 'Menu';
    });
    links.addEventListener('click', (e) => {
      if (e.target.closest('a')) {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = 'Menu';
      }
    });
  }

  /* Delegated so it survives every container swap and every re-render. */
  document.addEventListener('click', (e) => {
    const add = e.target.closest('[data-add-bag]');
    if (add) {
      const id = add.dataset.addBag;
      const p = productById(id);
      if (!store.has('bag', id)) store.toggle('bag', id);
      toast(p ? p.name + ' added to bag' : 'Added to bag');
      return;
    }

    const rm = e.target.closest('[data-remove-bag]');
    if (rm) {
      store.remove('bag', rm.dataset.removeBag);
      const host = $('[data-render="bag"]');
      if (host) {
        renderers.bag(host);
        animateIn(host);
      }
      toast('Removed from bag');
      return;
    }

    const wish = e.target.closest('[data-toggle-wishlist]');
    if (wish) {
      const id = wish.dataset.toggleWishlist;
      const added = store.toggle('wishlist', id);
      if (wish.textContent.trim() !== '×') wish.textContent = added ? 'In wishlist' : 'Add to wishlist';
      const host = $('[data-render="wishlist"]');
      if (host) {
        renderers.wishlist(host);
        animateIn(host);
      }
      toast(added ? 'Saved to wishlist' : 'Removed from wishlist');
    }
  });

  /* A prototype checkout must not silently do nothing. */
  document.addEventListener('submit', (e) => {
    const form = e.target.closest('[data-demo-form]');
    if (!form) return;
    e.preventDefault();
    toast(form.dataset.demoForm);
    form.reset();
  });

  /* ───────────────────────────  mount  ──────────────────────────── */

  function mount(container) {
    const root = container || document;

    Object.keys(renderers).forEach((key) => {
      $$(`[data-render="${key}"]`, root).forEach((node) => renderers[key](node));
    });

    syncCounts();
    setActiveNav();
    wireMobileNav();
    marqueeAnimation(root);
    heroAnimation(root);
    animateIn(root);
    onScroll();

    /* Images decode after the reveal triggers are built; without this the
       start positions are computed against a zero-height <img>. */
    if (ANIM) {
      const imgs = $$('img', root).filter((i) => !i.complete);
      let pending = imgs.length;
      if (!pending) ScrollTrigger.refresh();
      imgs.forEach((img) => {
        const done = () => {
          if (--pending <= 0) ScrollTrigger.refresh();
        };
        img.addEventListener('load', done, { once: true });
        img.addEventListener('error', done, { once: true });
      });
      /* Backstop: a stalled image must not strand the whole page. */
      setTimeout(() => ScrollTrigger.refresh(), 1200);
    }
  }

  function unmount() {
    if (!ANIM) return;
    ScrollTrigger.getAll().forEach((t) => t.kill());
    gsap.globalTimeline.getChildren().forEach((t) => t.kill());
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => ANIM && ScrollTrigger.refresh(), { passive: true });

  /* ───────────────────────────  barba  ──────────────────────────── */

  function initBarba() {
    window.barba.init({
      debug: false,
      prevent: ({ el }) => el.hasAttribute('data-barba-prevent') || /\.(pdf|jpg|png|gif|zip)$/i.test(el.getAttribute('href') || ''),
      transitions: [
        {
          name: 'veil',
          /* The outgoing page is taken out of flow first — otherwise the two
             containers stack and the document height doubles mid-swap. */
          leave({ current }) {
            current.container.classList.add('barba-leaving');
            unmount();
            if (!ANIM) return;
            return gsap.to(current.container, { opacity: 0, y: -24, duration: 0.32, ease: 'power2.in' });
          },
          beforeEnter({ next }) {
            window.scrollTo(0, 0);
            document.title = next.container.dataset.title || document.title;
          },
          enter({ next }) {
            if (!ANIM) return;
            return gsap.fromTo(next.container, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' });
          },
          after({ next }) {
            mount(next.container);
          },
        },
      ],
    });

    /* A same-page link (already on Collections, clicking Collections) is a
       no-op for Barba, so re-run the chrome state by hand. */
    window.barba.hooks.afterLeave(() => {
      if (nav) nav.classList.remove('is-hidden');
    });
  }

  function boot() {
    mount(document);
    if (CAN_BARBA) initBarba();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
