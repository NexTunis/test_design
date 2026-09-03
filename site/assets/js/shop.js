/* Dysobay storefront — shop behaviour layered on top of site.js.
 *
 *   · lightbox gallery      (product shots + lookbook, keyboard-navigable)
 *   · quick view            (buy without leaving the grid)
 *   · sort + refine bar     (price, season, availability)
 *   · search overlay        ("/" anywhere, or the nav Search link)
 *   · checkout              (four animated steps, fake card interface)
 *
 * site.js owns the store, the toast and the reveal system and hands them over
 * on window.DYSOBAY_UI; this file never re-implements them.
 */
(function () {
  'use strict';

  const D = window.DYSOBAY;
  const UI = window.DYSOBAY_UI;
  if (!D || !UI) return;

  const { store, toast, cardHTML, animateIn, esc, ANIM, gsap, $, $$, productById } = UI;

  /* ═══════════════════════════  lightbox  ═══════════════════════ */

  const lightbox = (() => {
    let root, imgEl, capEl, list = [], index = 0, open = false;

    function build() {
      root = document.createElement('div');
      root.className = 'lb';
      root.setAttribute('role', 'dialog');
      root.setAttribute('aria-modal', 'true');
      root.setAttribute('aria-label', 'Gallery');
      root.innerHTML = `
        <button class="lb__close" type="button" aria-label="Close gallery">Close ✕</button>
        <button class="lb__nav lb__nav--prev" type="button" aria-label="Previous image">←</button>
        <button class="lb__nav lb__nav--next" type="button" aria-label="Next image">→</button>
        <figure class="lb__stage"><img class="lb__img" alt=""><figcaption class="lb__cap"></figcaption></figure>
        <p class="lb__count"></p>`;
      document.body.appendChild(root);
      imgEl = $('.lb__img', root);
      capEl = $('.lb__cap', root);
      $('.lb__close', root).addEventListener('click', close);
      $('.lb__nav--prev', root).addEventListener('click', () => step(-1));
      $('.lb__nav--next', root).addEventListener('click', () => step(1));
      root.addEventListener('click', (e) => { if (e.target === root) close(); });
    }

    function show(dir) {
      const item = list[index];
      imgEl.src = item.src;
      imgEl.alt = item.caption || '';
      capEl.textContent = item.caption || '';
      $('.lb__count', root).textContent = index + 1 + ' / ' + list.length;
      if (!ANIM) return;
      gsap.fromTo(imgEl, { x: 70 * (dir || 1), opacity: 0, scale: 1.04 },
        { x: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'expo.out' });
    }

    function step(dir) { index = (index + dir + list.length) % list.length; show(dir); }

    function openAt(items, i) {
      if (!root) build();
      list = items; index = i; open = true;
      root.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      show(1);
      if (ANIM) {
        gsap.fromTo(root, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
        gsap.fromTo($('.lb__stage', root), { scale: 0.9, clipPath: 'inset(12% 12% 12% 12%)' },
          { scale: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: 'expo.out' });
      }
      $('.lb__close', root).focus();
    }

    function close() {
      if (!open) return;
      open = false;
      document.body.style.overflow = '';
      const done = () => root.classList.remove('is-open');
      if (ANIM) gsap.to(root, { opacity: 0, duration: 0.25, ease: 'power2.in', onComplete: done });
      else done();
    }

    document.addEventListener('keydown', (e) => {
      if (!open) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    });

    return { openAt, close, isOpen: () => open };
  })();

  /* ═══════════════════════════  quick view  ════════════════════ */

  const quickview = (() => {
    let root, open = false;

    function build() {
      root = document.createElement('div');
      root.className = 'qv';
      root.setAttribute('role', 'dialog');
      root.setAttribute('aria-modal', 'true');
      root.innerHTML = '<div class="qv__panel"></div>';
      document.body.appendChild(root);
      root.addEventListener('click', (e) => { if (e.target === root || e.target.closest('[data-qv-close]')) close(); });
    }

    function show(id) {
      const p = productById(id);
      if (!p) return;
      if (!root) build();
      const c = D.collectionOf(p.collection);
      const inWish = store.has('wishlist', p.id);
      $('.qv__panel', root).innerHTML = `
        <button class="qv__close" type="button" data-qv-close aria-label="Close quick view">✕</button>
        <div class="qv__media">
          ${p.images.slice(0, 2).map((s, i) => `<figure class="media media--3x4"><span class="media__inner"><img src="${s}" alt="${esc(p.name)}"></span></figure>`).join('')}
        </div>
        <div class="qv__body stack">
          <p class="eyebrow">${esc(p.category)} · ${esc(c.name)} ${esc(c.season)}</p>
          <h2 class="h2">${esc(p.name)}</h2>
          <p class="h3">${D.AED(p.price)}</p>
          <p><span class="tag tag--clay">One piece only</span> <span class="tag">${esc(p.size)}</span> <span class="tag tag--denim">No. ${esc(p.piece)}</span></p>
          <p class="lede">${esc(p.note)}</p>
          <dl class="qv__spec">
            <div><dt>Material</dt><dd>${esc(p.material)}</dd></div>
            <div><dt>Atelier</dt><dd>${esc(p.atelier)}</dd></div>
            <div><dt>Hours of work</dt><dd>${esc(p.hours)} h</dd></div>
          </dl>
          <div style="display:flex;gap:var(--space-3);flex-wrap:wrap">
            <button type="button" class="btn btn--lg" data-add-bag="${p.id}"${p.status === 'sold' ? ' disabled' : ''}>${p.status === 'sold' ? 'Sold out' : 'Add to bag'}</button>
            <button type="button" class="btn btn--ghost btn--lg" data-toggle-wishlist="${p.id}">${inWish ? 'Saved' : 'Wishlist'}</button>
            <a class="btn btn--ghost btn--lg" href="product.html?id=${encodeURIComponent(p.id)}">Full piece</a>
          </div>
        </div>`;
      root.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      open = true;
      if (ANIM) {
        gsap.fromTo(root, { opacity: 0 }, { opacity: 1, duration: 0.28 });
        gsap.fromTo($('.qv__panel', root), { y: 70, scale: 0.97, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: 0.7, ease: 'expo.out' });
        gsap.fromTo($$('.qv__body > *', root), { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out', stagger: 0.06, delay: 0.12 });
      }
    }

    function close() {
      if (!open) return;
      open = false;
      document.body.style.overflow = '';
      const done = () => root.classList.remove('is-open');
      if (ANIM) gsap.to(root, { opacity: 0, duration: 0.22, onComplete: done });
      else done();
    }

    document.addEventListener('keydown', (e) => { if (open && e.key === 'Escape') close(); });
    return { show, close, isOpen: () => open };
  })();

  /* ═══════════════════════════  search overlay  ════════════════ */

  const searchOverlay = (() => {
    let root, input, results, summary, open = false;

    function build() {
      root = document.createElement('div');
      root.className = 'so';
      root.setAttribute('role', 'dialog');
      root.setAttribute('aria-modal', 'true');
      root.setAttribute('aria-label', 'Search');
      root.innerHTML = `
        <div class="so__panel">
          <div class="so__shell">
            <div class="so__bar">
              <input class="so__input" type="search" placeholder="Search pieces, seasons, materials…" aria-label="Search the collection">
              <button class="so__close" type="button" aria-label="Close search">Esc</button>
            </div>
            <div class="so__suggest">
              ${['Outerwear', 'Tailoring', 'Silk', 'Color Disobedience', 'Last piece'].map((s) => `<button type="button" class="filter" data-so-suggest="${esc(s)}">${esc(s)}</button>`).join('')}
            </div>
            <p class="so__summary small"></p>
            <div class="so__results grid grid--4"></div>
          </div>
        </div>`;
      document.body.appendChild(root);
      input = $('.so__input', root);
      results = $('.so__results', root);
      summary = $('.so__summary', root);
      $('.so__close', root).addEventListener('click', close);
      root.addEventListener('click', (e) => { if (e.target === root) close(); });
      input.addEventListener('input', () => run(input.value));
      $$('[data-so-suggest]', root).forEach((b) => b.addEventListener('click', () => { input.value = b.dataset.soSuggest; run(input.value); input.focus(); }));
    }

    function run(q) {
      const t = q.trim().toLowerCase();
      const list = t
        ? D.PRODUCTS.filter((p) => [p.name, p.category, p.material, p.atelier, p.note, p.status, D.collectionOf(p.collection).name]
            .join(' ').toLowerCase().includes(t))
        : D.PRODUCTS.slice(0, 8);
      results.innerHTML = list.length
        ? list.slice(0, 12).map(cardHTML).join('')
        : '<p class="lede empty">Nothing matches. Try a season, a category, or a material.</p>';
      summary.textContent = t
        ? `${list.length} result${list.length === 1 ? '' : 's'} for “${q.trim()}”`
        : 'Start typing, or pick a shortcut above.';
      if (ANIM) gsap.fromTo($$('.card', results), { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out', stagger: 0.04 });
    }

    function show() {
      if (!root) build();
      root.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      open = true;
      run(input.value);
      if (ANIM) {
        gsap.fromTo(root, { opacity: 0, backdropFilter: 'blur(0px)' }, { opacity: 1, backdropFilter: 'blur(18px)', duration: 0.45, ease: 'power2.out' });
        gsap.fromTo($('.so__bar', root), { y: -40, opacity: 0, scaleX: 0.92 },
          { y: 0, opacity: 1, scaleX: 1, duration: 0.7, ease: 'expo.out' });
        gsap.fromTo([$('.so__suggest', root), $('.so__summary', root)], { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out', stagger: 0.06, delay: 0.12 });
      }
      setTimeout(() => input.focus(), 60);
    }

    function close() {
      if (!open) return;
      open = false;
      document.body.style.overflow = '';
      const done = () => root.classList.remove('is-open');
      if (ANIM) gsap.to(root, { opacity: 0, duration: 0.22, onComplete: done });
      else done();
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && open) { close(); return; }
      /* "/" opens search from anywhere that is not already a text field. */
      if (e.key === '/' && !open && !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) {
        e.preventDefault(); show();
      }
    });

    return { show, close, isOpen: () => open };
  })();

  /* ═══════════════════════════  refine bar  ════════════════════ */

  function mountRefine(node) {
    const grid = $('[data-render="product-grid"]');
    if (!grid || node.dataset.wired) return;
    node.dataset.wired = '1';
    const ceiling = Math.ceil(Math.max.apply(null, D.PRODUCTS.map((p) => p.price)) / 100) * 100;

    node.innerHTML = `
      <label class="refine__field">
        <span class="field__label">Season</span>
        <select class="input refine__select" data-collection-select>
          <option value="all">All seasons</option>
          ${D.COLLECTIONS.map((c) => `<option value="${c.id}">${esc(c.name)} — ${esc(c.season)}</option>`).join('')}
        </select>
      </label>
      <label class="refine__field">
        <span class="field__label">Availability</span>
        <select class="input refine__select" data-avail-select>
          <option value="all">Everything</option>
          <option value="available">Still available</option>
          <option value="last">Last piece only</option>
        </select>
      </label>
      <label class="refine__field refine__field--range">
        <span class="field__label">Up to <strong data-price-out>${D.AED(ceiling)}</strong></span>
        <input class="refine__range" type="range" min="800" max="${ceiling}" step="100" value="${ceiling}" data-price-range aria-label="Maximum price">
      </label>`;

    const rerender = () => {
      UI.renderGrid(grid);
      animateIn(grid);
    };
    $('[data-collection-select]', node).addEventListener('change', (e) => { grid.dataset.filterCollection = e.target.value; rerender(); });
    $('[data-avail-select]', node).addEventListener('change', (e) => { grid.dataset.filterAvailability = e.target.value; rerender(); });
    const range = $('[data-price-range]', node), out = $('[data-price-out]', node);
    let raf;
    range.addEventListener('input', () => {
      out.textContent = D.AED(parseInt(range.value, 10));
      grid.dataset.filterMaxPrice = range.value;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(rerender);
    });
  }

  /* Sort + the Refine disclosure. Two controls visible, the rest on request. */
  function mountToolbar(node) {
    const grid = $('[data-render="product-grid"]');
    if (!grid || node.dataset.wired) return;
    node.dataset.wired = '1';
    node.innerHTML = `
      <div class="toolbar__left"><p class="small"><strong data-piece-count>${D.PRODUCTS.length}</strong> pieces, each one once</p></div>
      <div class="toolbar__right">
        <label class="refine__field" style="min-width:auto">
          <span class="field__label">Sort</span>
          <select class="input refine__select" data-sort-select>
            <option value="featured">Featured</option>
            <option value="price-asc">Price — low to high</option>
            <option value="price-desc">Price — high to low</option>
            <option value="name-asc">Name — A to Z</option>
            <option value="season">Season</option>
          </select>
        </label>
        <button type="button" class="refine__toggle" aria-expanded="false" aria-controls="refine-panel" data-refine-toggle>Refine</button>
      </div>`;

    $('[data-sort-select]', node).addEventListener('change', (e) => {
      grid.dataset.sort = e.target.value;
      UI.renderGrid(grid);
      animateIn(grid);
    });

    const toggle = $('[data-refine-toggle]', node);
    const panel = $('#refine-panel');
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      panel.classList.toggle('is-open', !open);
      if (ANIM) gsap.fromTo(panel, { height: open ? panel.scrollHeight : 0 }, { height: open ? 0 : 'auto', duration: 0.45, ease: 'expo.out' });
    });
  }

  /* ═══════════════════════════  checkout  ══════════════════════ */

  const CARD_BRANDS = [
    { re: /^4/, name: 'Visa' },
    { re: /^5[1-5]/, name: 'Mastercard' },
    { re: /^3[47]/, name: 'American Express' },
    { re: /^6(?:011|5)/, name: 'Discover' },
  ];

  function luhn(num) {
    const s = num.replace(/\D/g, '');
    if (s.length < 12) return false;
    let sum = 0, alt = false;
    for (let i = s.length - 1; i >= 0; i--) {
      let d = +s[i];
      if (alt) { d *= 2; if (d > 9) d -= 9; }
      sum += d; alt = !alt;
    }
    return sum % 10 === 0;
  }

  function mountCheckout(node) {
    if (node.dataset.wired) return;
    node.dataset.wired = '1';

    const items = store.items('bag');
    const sub = items.reduce((s, p) => s + p.price, 0);
    const shipping = 0;
    const duties = Math.round(sub * 0.05);
    const total = sub + shipping + duties;

    if (!items.length) {
      node.innerHTML = `<div class="empty stack">
        <p class="lede">There is nothing to check out.</p>
        <p><a class="btn" href="collections.html">See what is still available</a></p></div>`;
      return;
    }

    node.innerHTML = `
      <ol class="steps" aria-label="Checkout progress">
        ${['Bag', 'Details', 'Delivery', 'Payment'].map((s, i) => `<li class="step${i === 0 ? ' is-active' : ''}" data-step-dot="${i}"><span class="step__n">${i + 1}</span><span class="step__l">${s}</span></li>`).join('')}
      </ol>

      <div class="checkout">
        <div class="checkout__main">
          <section class="pane is-active" data-pane="0">
            <h2 class="h2" data-split>Your bag</h2>
            <div class="checkout__lines">
              ${items.map((p) => `<div class="coline">
                  <figure class="media media--3x4"><span class="media__inner"><img src="${p.images[0]}" alt="${esc(p.name)}"></span></figure>
                  <div>
                    <p class="h4">${esc(p.name)}</p>
                    <p class="small">Size ${esc(p.size)} · No. ${esc(p.piece)}</p>
                    <p class="small">${esc(p.atelier)} · ${esc(p.hours)} h of work</p>
                  </div>
                  <p>${D.AED(p.price)}</p>
                </div>`).join('')}
            </div>
            <div class="checkout__nav"><button type="button" class="btn btn--lg" data-magnetic data-step-next>Continue to details</button></div>
          </section>

          <section class="pane" data-pane="1" hidden>
            <h2 class="h2">Your details</h2>
            <div class="formgrid">
              <label class="field"><span class="field__label">First name</span><input class="input" autocomplete="given-name" value="Haifa"></label>
              <label class="field"><span class="field__label">Last name</span><input class="input" autocomplete="family-name" value="Ghodhbane"></label>
              <label class="field field--wide"><span class="field__label">Email</span><input class="input" type="email" autocomplete="email" value="you@example.com"></label>
              <label class="field field--wide"><span class="field__label">Phone</span><input class="input" type="tel" autocomplete="tel" value="+971 50 000 0000"></label>
            </div>
            <div class="checkout__nav">
              <button type="button" class="btn btn--ghost btn--lg" data-step-prev>Back</button>
              <button type="button" class="btn btn--lg" data-magnetic data-step-next>Continue to delivery</button>
            </div>
          </section>

          <section class="pane" data-pane="2" hidden>
            <h2 class="h2">Delivery</h2>
            <div class="formgrid">
              <label class="field field--wide"><span class="field__label">Address</span><input class="input" autocomplete="street-address" value="Al Quoz 1, Street 8"></label>
              <label class="field"><span class="field__label">City</span><input class="input" autocomplete="address-level2" value="Dubai"></label>
              <label class="field"><span class="field__label">Country</span><input class="input" autocomplete="country-name" value="United Arab Emirates"></label>
            </div>
            <div class="ship">
              ${[['Express — included', '3–5 working days, tracked from the Dubai atelier', 'Included', true],
                 ['Named-day delivery', 'Choose the day; we hold the piece until then', 'AED 120', false],
                 ['Studio collection', 'Collect in person, with the atelier present', 'Free', false]]
                .map(([t, s, p, on], i) => `<label class="ship__opt${on ? ' is-on' : ''}">
                    <input type="radio" name="ship" ${on ? 'checked' : ''}>
                    <span><strong>${t}</strong><span class="small">${s}</span></span>
                    <span class="ship__price">${p}</span>
                  </label>`).join('')}
            </div>
            <div class="checkout__nav">
              <button type="button" class="btn btn--ghost btn--lg" data-step-prev>Back</button>
              <button type="button" class="btn btn--lg" data-magnetic data-step-next>Continue to payment</button>
            </div>
          </section>

          <section class="pane" data-pane="3" hidden>
            <h2 class="h2">Payment</h2>
            <p class="small" style="margin-bottom:var(--space-5)">This is a prototype. Nothing is charged and nothing is transmitted — type any numbers you like.</p>

            <div class="paycard" data-paycard>
              <div class="paycard__brand" data-card-brand>Card</div>
              <div class="paycard__num" data-card-num>•••• •••• •••• ••••</div>
              <div class="paycard__row">
                <span><small>Holder</small><b data-card-name>Your name</b></span>
                <span><small>Expires</small><b data-card-exp>••/••</b></span>
              </div>
            </div>

            <div class="formgrid" style="margin-top:var(--space-6)">
              <label class="field field--wide"><span class="field__label">Card number</span>
                <input class="input" inputmode="numeric" autocomplete="cc-number" placeholder="4242 4242 4242 4242" data-cc-number></label>
              <label class="field field--wide"><span class="field__label">Name on card</span>
                <input class="input" autocomplete="cc-name" placeholder="As printed on the card" data-cc-name></label>
              <label class="field"><span class="field__label">Expiry</span>
                <input class="input" inputmode="numeric" autocomplete="cc-exp" placeholder="MM/YY" maxlength="5" data-cc-exp></label>
              <label class="field"><span class="field__label">Security code</span>
                <input class="input" inputmode="numeric" autocomplete="cc-csc" placeholder="123" maxlength="4" data-cc-cvc></label>
            </div>
            <p class="small pay__error" data-pay-error hidden>Check the card number — that one does not pass a Luhn check.</p>
            <div class="checkout__nav">
              <button type="button" class="btn btn--ghost btn--lg" data-step-prev>Back</button>
              <button type="button" class="btn btn--lg btn--accent" data-magnetic data-pay-submit>Pay ${D.AED(total)}</button>
            </div>
          </section>
        </div>

        <aside class="checkout__summary" data-reveal>
          <h2 class="h4">Order summary</h2>
          <div class="sumrow"><span>${items.length} piece${items.length === 1 ? '' : 's'}</span><span>${D.AED(sub)}</span></div>
          <div class="sumrow"><span>Express shipping</span><span>Included</span></div>
          <div class="sumrow"><span>Duties &amp; taxes</span><span>${D.AED(duties)}</span></div>
          <div class="sumrow sumrow--total"><span>Total</span><span>${D.AED(total)}</span></div>
          <ul class="pdp__assure">
            <li>One alteration by the atelier that made it</li>
            <li>Numbered authenticity card</li>
            <li>Lifetime repair, labour free</li>
          </ul>
        </aside>
      </div>`;

    /* ── step machine ── */
    let step = 0;
    const panes = $$('.pane', node);
    const dots = $$('[data-step-dot]', node);

    function go(next) {
      if (next === step || next < 0 || next >= panes.length) return;
      const dir = next > step ? 1 : -1;
      const from = panes[step], to = panes[next];
      step = next;
      dots.forEach((d, i) => d.classList.toggle('is-active', i <= step));

      const reveal = () => {
        from.hidden = true; from.classList.remove('is-active');
        to.hidden = false; to.classList.add('is-active');
        if (!ANIM) return;
        gsap.fromTo(to, { x: 60 * dir, opacity: 0 }, { x: 0, opacity: 1, duration: 0.55, ease: 'expo.out' });
        gsap.fromTo($$(':scope > *', to), { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'expo.out', stagger: 0.06, delay: 0.08 });
      };
      if (ANIM) gsap.to(from, { x: -60 * dir, opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: reveal });
      else reveal();
      node.scrollIntoView({ behavior: ANIM ? 'smooth' : 'auto', block: 'start' });
    }

    node.addEventListener('click', (e) => {
      if (e.target.closest('[data-step-next]')) go(step + 1);
      if (e.target.closest('[data-step-prev]')) go(step - 1);
      const dot = e.target.closest('[data-step-dot]');
      if (dot) go(parseInt(dot.dataset.stepDot, 10));
    });

    /* ── live card ── */
    const num = $('[data-cc-number]', node), nameI = $('[data-cc-name]', node), expI = $('[data-cc-exp]', node);
    const brandOut = $('[data-card-brand]', node), numOut = $('[data-card-num]', node),
          nameOut = $('[data-card-name]', node), expOut = $('[data-card-exp]', node);

    num.addEventListener('input', () => {
      const digits = num.value.replace(/\D/g, '').slice(0, 19);
      num.value = digits.replace(/(.{4})/g, '$1 ').trim();
      numOut.textContent = (num.value + ' •••• •••• •••• ••••').slice(0, 19);
      const brand = CARD_BRANDS.find((b) => b.re.test(digits));
      brandOut.textContent = brand ? brand.name : 'Card';
      $('[data-paycard]', node).classList.toggle('is-known', !!brand);
    });
    nameI.addEventListener('input', () => { nameOut.textContent = nameI.value.trim() || 'Your name'; });
    expI.addEventListener('input', () => {
      let v = expI.value.replace(/\D/g, '').slice(0, 4);
      if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2);
      expI.value = v;
      expOut.textContent = v || '••/••';
    });

    $('[data-pay-submit]', node).addEventListener('click', () => {
      const err = $('[data-pay-error]', node);
      if (!luhn(num.value)) {
        err.hidden = false;
        if (ANIM) gsap.fromTo($('[data-paycard]', node), { x: -10 }, { x: 0, duration: 0.5, ease: 'elastic.out(1,0.3)' });
        num.focus();
        return;
      }
      err.hidden = true;
      const btn = $('[data-pay-submit]', node);
      btn.disabled = true;
      btn.textContent = 'Authorising…';
      setTimeout(() => {
        try { localStorage.setItem('dysobay:lastOrder', JSON.stringify({ total, count: items.length, ids: items.map((p) => p.id) })); } catch (e) {}
        store.write('bag', []);
        window.location.href = 'confirmation.html';
      }, 1100);
    });
  }

  /* ═══════════════════════════  confirmation  ══════════════════ */

  function mountConfirmation(node) {
    let order = null;
    try { order = JSON.parse(localStorage.getItem('dysobay:lastOrder')); } catch (e) {}
    if (!order) {
      node.innerHTML = `<p class="lede">No recent order on this device.</p>
        <p style="margin-top:var(--space-5)"><a class="btn" href="collections.html">Browse the collection</a></p>`;
      return;
    }
    const pieces = order.ids.map(productById).filter(Boolean);
    node.innerHTML = `
      <p class="small">Order #DYS-${String(40182 + order.count).padStart(5, '0')} · ${D.AED(order.total)} · ${order.count} piece${order.count === 1 ? '' : 's'}</p>
      <div class="grid grid--3" style="margin-top:var(--space-7)">
        ${pieces.map((p, i) => `<article data-stagger style="--i:${i}">
            <figure class="media media--3x4" data-reveal-media><span class="media__inner" data-parallax><img src="${p.images[0]}" alt="${esc(p.name)}"></span></figure>
            <p class="h4" style="margin-top:var(--space-4)">${esc(p.name)}</p>
            <p class="card__sub">No. ${esc(p.piece)} · ${esc(p.atelier)}</p>
          </article>`).join('')}
      </div>`;
  }

  /* ═══════════════════════════  wiring  ════════════════════════ */

  /* Delegated once, at the document — survives every container swap. */
  document.addEventListener('click', (e) => {
    const shot = e.target.closest('[data-shot]');
    if (shot) {
      const gallery = $$('[data-shot]', shot.closest('.pdp__gallery') || document);
      lightbox.openAt(gallery.map((f) => ({ src: $('img', f).src, caption: $('img', f).alt })), gallery.indexOf(shot));
      return;
    }
    const look = e.target.closest('.look');
    if (look) {
      const all = $$('.look:not([hidden])');
      lightbox.openAt(all.map((f) => ({ src: $('img', f).src, caption: $('img', f).alt })), all.indexOf(look));
      return;
    }
    const qv = e.target.closest('[data-quickview]');
    if (qv) { e.preventDefault(); quickview.show(qv.dataset.quickview); return; }
    if (e.target.closest('[data-open-search]')) { e.preventDefault(); searchOverlay.show(); }
  });

  window.DysobayShop = {
    mount(root) {
      $$('[data-render="toolbar"]', root).forEach(mountToolbar);
      $$('[data-render="refine"]', root).forEach(mountRefine);
      $$('[data-render="checkout"]', root).forEach(mountCheckout);
      $$('[data-render="confirmation"]', root).forEach(mountConfirmation);
    },
    lightbox, quickview, searchOverlay,
  };
})();
