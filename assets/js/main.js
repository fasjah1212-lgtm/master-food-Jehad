/* MASTER FOOD — small, dependency-free site script. */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isAr = () => root.lang !== 'en';
  const t = (o) => (typeof o === 'string' ? o : o[isAr() ? 'ar' : 'en']);
  const px = (id, w) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

  /* Product content — taken from the official master-food.co pages. */
  const PRODUCTS = {
    'corn-starch': {
      img: 'assets/img/corn-starch.webp', name: { ar: 'نشاء الذرة', en: 'Corn Starch' },
      desc: { ar: 'مسحوق أبيض طبيعي، عديم الرائحة، ذو طعم متعادل، يُستخلص من حبوب الذرة.', en: 'A natural white powder, odorless, with a neutral taste, obtained from corn kernels.' },
      uses: { ar: ['العديد من الصناعات الغذائية'], en: ['Many food industries'] },
      facts: [[{ ar: 'المصدر', en: 'Source' }, { ar: 'حبوب الذرة', en: 'Corn kernels' }], [{ ar: 'الشكل', en: 'Form' }, { ar: 'مسحوق أبيض', en: 'White powder' }], [{ ar: 'الرائحة', en: 'Odor' }, { ar: 'عديم الرائحة', en: 'Odorless' }], [{ ar: 'الطعم', en: 'Taste' }, { ar: 'متعادل', en: 'Neutral' }]]
    },
    'glucose-syrup': {
      img: 'assets/img/glucose-syrup.webp', name: { ar: 'شراب الجلوكوز', en: 'Glucose Syrup' },
      desc: { ar: 'شراب سائل مركّز ومنقّى من السكر الطبيعي، يُحصل عليه من نشاء الذرة بالتحلل المائي الحمضي أو الإنزيمي.', en: 'A concentrated, purified liquid syrup of natural sugar, obtained from corn starch by acidic or enzymatic hydrolysis.' },
      uses: { ar: ['الحلوى', 'المخبوزات', 'المارشميلو', 'السموذي', 'المربى', 'الحلويات الصلبة'], en: ['Candy', 'Bakery', 'Marshmallows', 'Smoothies', 'Jams', 'Hard desserts'] },
      facts: [[{ ar: 'المصدر', en: 'Source' }, { ar: 'نشاء الذرة', en: 'Corn starch' }], [{ ar: 'الحلاوة', en: 'Sweetness' }, { ar: 'متوسطة، تُبرز النكهات الفاكهية', en: 'Medium, enhances fruity flavors' }], [{ ar: 'اللزوجة', en: 'Viscosity' }, { ar: 'متوسطة', en: 'Medium' }]]
    },
    'corn-germ': {
      img: 'assets/img/corn-germ.webp', name: { ar: 'جنين الذرة', en: 'Corn Germ' },
      desc: { ar: 'منتج طبيعي يُحصل عليه خلال مرحلة إنتاج النشا من الذرة.', en: 'A natural product obtained during starch production from corn.' },
      uses: { ar: ['إنتاج زيت الذرة الخام', 'صناعة الأعلاف'], en: ['Crude corn oil production', 'Feed manufacturing'] },
      specTitle: { ar: 'المواصفات', en: 'Specifications' },
      facts: [[{ ar: 'الرطوبة', en: 'Moisture' }, { ar: '6% كحد أقصى', en: '6% max' }], [{ ar: 'البروتين', en: 'Protein' }, { ar: '10% كحد أقصى', en: '10% max' }], [{ ar: 'الدهون', en: 'Fat' }, { ar: '43% كحد أدنى', en: '43% min' }], [{ ar: 'النشا', en: 'Starch' }, { ar: '20% كحد أقصى', en: '20% max' }]]
    },
    'gluten-feed': {
      img: 'assets/img/gluten-feed.webp', name: { ar: 'جلوتوفيد 16%', en: 'Glutofed 16%' },
      desc: { ar: 'منتج طبيعي يُحصل عليه أثناء إنتاج النشاء من الذرة، ويُستخدم في أعلاف الماشية كمصدر للطاقة والبروتين.', en: 'A natural product obtained during starch production from corn, used in livestock feed as a source of energy and protein.' },
      uses: { ar: ['أعلاف الماشية'], en: ['Livestock feed'] },
      facts: [[{ ar: 'المصدر', en: 'Source' }, { ar: 'إنتاج النشاء من الذرة', en: 'Starch production from corn' }], [{ ar: 'القيمة', en: 'Value' }, { ar: 'مصدر للطاقة والبروتين', en: 'Energy and protein' }]]
    },
    'gluten-meal': {
      img: 'assets/img/gluten-meal.webp', name: { ar: 'جلوتين ميل 60%', en: 'Gluten Meal 60%' },
      desc: { ar: 'منتج طبيعي يُحصل عليه خلال مرحلة إنتاج النشا من الذرة. يتميز بنسبة عالية من البروتين لا تقل عن 60%، ويُستخدم كمصدر رئيسي للبروتين في صناعة أعلاف الدواجن والأبقار والإبل.', en: 'A natural product obtained during starch production from corn. Its high protein content of at least 60% makes it a main protein source in poultry, cattle and camel feed.' },
      uses: { ar: ['أعلاف الدواجن', 'أعلاف الأبقار', 'أعلاف الإبل'], en: ['Poultry feed', 'Cattle feed', 'Camel feed'] },
      specTitle: { ar: 'المواصفات', en: 'Specifications' },
      facts: [[{ ar: 'الرطوبة', en: 'Moisture' }, { ar: '12% كحد أقصى', en: '12% max' }], [{ ar: 'البروتين', en: 'Protein' }, { ar: '60% كحد أدنى', en: '60% min' }], [{ ar: 'الدهون', en: 'Fat' }, { ar: '6% كحد أقصى', en: '6% max' }], [{ ar: 'النشا', en: 'Starch' }, { ar: '20% كحد أقصى', en: '20% max' }], [{ ar: 'الرماد', en: 'Ash' }, { ar: '2% كحد أقصى', en: '2% max' }]]
    }
  };

  /* ---------- Language ---------- */
  $('#lang').addEventListener('click', () => {
    const en = isAr();
    root.lang = en ? 'en' : 'ar'; root.dir = en ? 'ltr' : 'rtl';
    try { localStorage.setItem('mf-lang', root.lang); } catch (e) { /* storage unavailable */ }
    const id = $('#pd').dataset.id; if (!$('#pd').hidden && id) renderProduct(id);
  });

  /* ---------- Header ---------- */
  const hdr = $('#hdr'), burger = $('#burger');
  const onScroll = () => hdr.classList.toggle('is-solid', scrollY > 30);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  burger.addEventListener('click', () => {
    const open = !hdr.classList.contains('is-open');
    hdr.classList.toggle('is-open', open); burger.setAttribute('aria-expanded', String(open));
  });
  $$('#nav a').forEach((a) => a.addEventListener('click', () => { hdr.classList.remove('is-open'); burger.setAttribute('aria-expanded', 'false'); }));

  /* ---------- About: learn more ---------- */
  $('#moreBtn').addEventListener('click', (e) => {
    const box = $('#moreText'), open = box.hidden;
    box.hidden = !open; e.currentTarget.setAttribute('aria-expanded', String(open));
  });

  /* ---------- Image fallback: keep layout clean if a photo fails ---------- */
  const markBroken = (img) => img.parentElement.classList.add('noimg');
  $$('img').forEach((img) => {
    if (img.complete && img.naturalWidth === 0 && img.src.startsWith('http')) markBroken(img);
    img.addEventListener('error', () => markBroken(img));
  });

  /* ---------- Product dialog ---------- */
  const pd = $('#pd');
  let returnFocus = null;
  function renderProduct(id) {
    const p = PRODUCTS[id], ar = isAr();
    const img = $('#pd-img');
    img.parentElement.classList.remove('noimg');
    img.src = typeof p.img === 'number' ? px(p.img, 1200) : p.img; img.alt = t(p.name);
    $('#pd-body').innerHTML = `
      <span class="eyebrow">${ar ? 'منتجاتنا' : 'Our products'}</span>
      <h2 id="pd-title">${t(p.name)}</h2>
      <p>${t(p.desc)}</p>
      <h4>${ar ? 'الاستخدامات' : 'Uses'}</h4>
      <div class="pill-row">${t(p.uses).map((u) => `<span class="pill">${u}</span>`).join('')}</div>
      <h4>${p.specTitle ? t(p.specTitle) : (ar ? 'معلومات المنتج' : 'Product information')}</h4>
      <dl class="pd__facts">${p.facts.map(([k, v]) => `<div><dt>${t(k)}</dt><dd>${t(v)}</dd></div>`).join('')}</dl>
      <div><a class="btn" href="#contact" data-inquire="${t(p.name)}">${ar ? 'استفسر عن المنتج' : 'Ask about this product'}</a></div>`;
    pd.dataset.id = id;
  }
  function openProduct(id, push) {
    if (!PRODUCTS[id]) return;
    if (pd.hidden) returnFocus = document.activeElement;
    renderProduct(id);
    pd.hidden = false; document.body.classList.add('lock');
    if (push && location.hash !== '#' + id) history.pushState(null, '', '#' + id);
    $('.pd__x', pd).focus();
  }
  function closeProduct() {
    if (pd.hidden) return;
    pd.hidden = true; document.body.classList.remove('lock');
    if (PRODUCTS[location.hash.slice(1)]) history.replaceState(null, '', location.pathname + location.search);
    returnFocus?.focus?.();
  }
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-product]'); if (b) { openProduct(b.dataset.product, true); return; }
    if (e.target.closest('[data-close]')) { closeProduct(); return; }
    if (e.target.closest('[data-inquire]')) closeProduct();
  });
  addEventListener('keydown', (e) => { if (e.key === 'Escape') closeProduct(); });
  const syncHash = () => { const id = location.hash.slice(1); if (PRODUCTS[id]) openProduct(id, false); else closeProduct(); };
  addEventListener('hashchange', syncHash); addEventListener('popstate', syncHash);

  /* ---------- Reveal on scroll + light counter ---------- */
  if ('IntersectionObserver' in window && !RM) {
    const io = new IntersectionObserver((es) => es.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add('in'); io.unobserve(en.target);
      const c = $('[data-count]', en.target);
      if (c) {
        const end = +c.dataset.count, t0 = performance.now();
        const step = (now) => { const k = Math.min(1, (now - t0) / 1200); c.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); };
        requestAnimationFrame(step);
      }
    }), { rootMargin: '0px 0px -10% 0px' });
    $$('.rv').forEach((el) => io.observe(el));
  } else {
    $$('.rv').forEach((el) => el.classList.add('in'));
  }

  /* ---------- Products: cards orbiting the corn (drag / swipe; keyboard arrows for accessibility) ---------- */
  (function orbitShowcase() {
    const box = $('#orbit'); if (!box) return;
    const cards = $$('.ocard', box), N = cards.length, TAU = Math.PI * 2;
    const live = $('#orbit-live');
    let rot = 0, target = 0, raf = 0;


    let mobile = false, gap1 = 250, gap2 = 215;
    function measure() {
      const w = box.clientWidth; mobile = w < 700;
      gap1 = mobile ? Math.min(w / 2 - 34, 165) : Math.min(w * 0.23, 255);
      gap2 = mobile ? 60 : Math.min(w * 0.2, 220);
    }
    const mod = (n) => ((n % N) + N) % N;
    function render() {
      const active = mod(Math.round(rot));
      cards.forEach((c, i) => {
        // signed distance from the centre slot, wrapped to [-N/2, N/2)
        const k = mod(i - rot + N / 2) - N / 2, a = Math.abs(k);
        const x = Math.sign(k) * (a <= 1 ? a * gap1 : gap1 + (a - 1) * gap2);
        const scale = mobile ? 1 : 1 - 0.1 * Math.min(a, 2.5);
        const fade = mobile ? Math.max(0, 1 - Math.max(0, a - 1) * 1.6) : Math.max(0, 1 - Math.pow(a / 2.6, 3));
        c.style.transform = `translateX(-50%) translateX(${x.toFixed(1)}px) scale(${scale.toFixed(3)})`;
        c.style.opacity = fade.toFixed(3);
        c.style.zIndex = 100 - Math.round(a * 10);
        c.style.pointerEvents = fade < 0.15 ? 'none' : '';
        const on = i === active;
        c.classList.toggle('is-active', on);
        c.setAttribute('aria-hidden', String(!on));
        $$('button', c).forEach((b) => (b.tabIndex = on ? 0 : -1));
      });
    }
    function announce() { const a = cards[mod(target)]; live.textContent = a.querySelector('h3').textContent; }
    function animate() {
      cancelAnimationFrame(raf);
      const step = () => {
        const diff = target - rot;
        if (Math.abs(diff) < 0.002 || RM) { rot = target; render(); return; }
        rot += diff * 0.14; render(); raf = requestAnimationFrame(step);
      };
      step();
    }
    function goTo(i) {
      const cur = mod(Math.round(target));
      let delta = i - cur;
      if (delta > N / 2) delta -= N; if (delta < -N / 2) delta += N;
      target = Math.round(target) + delta; animate(); announce();
    }
    const move = (dir) => { target = Math.round(target) + dir; animate(); announce(); };

    // Drag / swipe
    let down = false, dragging = false, x0 = 0, rot0 = 0, pid = null;
    box.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      down = true; dragging = false; x0 = e.clientX; rot0 = rot; pid = e.pointerId;
      cancelAnimationFrame(raf);
    });
    box.addEventListener('pointermove', (e) => {
      if (!down) return;
      const dx = e.clientX - x0;
      if (!dragging && Math.abs(dx) > 6) { dragging = true; box.classList.add('is-dragging'); try { box.setPointerCapture(pid); } catch (err) { /* ignore */ } }
      if (dragging) { rot = rot0 - dx / gap1; render(); }
    });
    const end = (e) => {
      if (!down) return; down = false;
      if (!dragging) { rot = rot0; return; }
      box.classList.remove('is-dragging');
      const dx = e.clientX - x0;
      let t2 = Math.round(rot);
      if (t2 === Math.round(rot0) && Math.abs(dx) > 40) t2 = Math.round(rot0) - Math.sign(dx);
      target = t2; animate(); announce();
      box.dataset.justDragged = '1'; setTimeout(() => delete box.dataset.justDragged, 50);
    };
    box.addEventListener('pointerup', end); box.addEventListener('pointercancel', end);
    // Tap a side card to bring it to the front
    cards.forEach((c, i) => c.addEventListener('click', (e) => {
      if (box.dataset.justDragged) { e.stopPropagation(); e.preventDefault(); return; }
      if (!c.classList.contains('is-active')) { e.stopPropagation(); e.preventDefault(); goTo(i); }
    }, true));
    box.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); move(isAr() ? 1 : -1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); move(isAr() ? -1 : 1); }
    });
    addEventListener('resize', () => { measure(); render(); });

    measure(); rot = target = 1; render();
  })();

  $('#yr').textContent = new Date().getFullYear();
  syncHash();
})();
