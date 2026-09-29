/* MASTER FOOD — site behaviour. No dependencies. */
(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lang = () => (root.lang === 'en' ? 'en' : 'ar');
  const t = (o) => (typeof o === 'string' ? o : o[lang()]);
  const cssVar = (n) => getComputedStyle(root).getPropertyValue(n).trim();
  const EMAIL = 'masterfood@ftinco.com';

  /* ------------------------------------------------------------------
     Content. Everything here comes from the official master-food.co
     site. Where the site gives no detail, we say so instead of guessing.
     ------------------------------------------------------------------ */
  const ON_REQUEST = {
    ar: 'لم تُنشر تفاصيل فنية إضافية لهذا المنتج. تواصل مع فريقنا للحصول على المواصفات.',
    en: 'No further technical details are published for this product. Contact our team for specifications.'
  };
  const PRODUCTS = [
    {
      id: 'corn-starch', icon: 'p-starch', code: 'MF · CS', tint: '#f3f1ea', fill: '#ffffff',
      name: { ar: 'نشاء الذرة', en: 'Corn Starch' }, latin: 'CORN STARCH', ang: -90,
      desc: { ar: 'مسحوق أبيض طبيعي، عديم الرائحة، ذو طعم متعادل، يُستخلص من حبوب الذرة.', en: 'A natural white powder, odorless, with a neutral taste, obtained from corn kernels.' },
      props: [
        [{ ar: 'المصدر', en: 'Source' }, { ar: 'حبوب الذرة', en: 'Corn kernels' }],
        [{ ar: 'الشكل', en: 'Form' }, { ar: 'مسحوق أبيض', en: 'White powder' }],
        [{ ar: 'الرائحة', en: 'Odor' }, { ar: 'عديم الرائحة', en: 'Odorless' }],
        [{ ar: 'الطعم', en: 'Taste' }, { ar: 'متعادل', en: 'Neutral' }]
      ],
      uses: { ar: ['العديد من الصناعات الغذائية'], en: ['Many food industries'] }
    },
    {
      id: 'glucose-syrup', icon: 'p-glucose', code: 'MF · GS', tint: '#fbf0cf', fill: '#e9b02c',
      name: { ar: 'شراب الجلوكوز', en: 'Glucose Syrup' }, latin: 'GLUCOSE SYRUP', ang: -18,
      desc: { ar: 'شراب سائل مركّز ومنقّى من السكر الطبيعي، يُحصل عليه من نشاء الذرة بالتحلل المائي الحمضي أو الإنزيمي.', en: 'A concentrated, purified liquid syrup of natural sugar, obtained from corn starch by acidic or enzymatic hydrolysis.' },
      props: [
        [{ ar: 'المصدر', en: 'Source' }, { ar: 'نشاء الذرة', en: 'Corn starch' }],
        [{ ar: 'طريقة الإنتاج', en: 'Process' }, { ar: 'التحلل المائي الحمضي أو الإنزيمي', en: 'Acidic or enzymatic hydrolysis' }],
        [{ ar: 'الحلاوة', en: 'Sweetness' }, { ar: 'متوسطة، تُبرز النكهات الفاكهية', en: 'Medium, enhances fruity flavors' }],
        [{ ar: 'اللزوجة', en: 'Viscosity' }, { ar: 'متوسطة', en: 'Medium' }]
      ],
      uses: { ar: ['الحلوى', 'المخبوزات', 'المارشميلو', 'السموذي', 'المربى', 'الحلويات الصلبة'], en: ['Candy', 'Bakery', 'Marshmallows', 'Smoothies', 'Jams', 'Hard desserts'] }
    },
    {
      id: 'corn-germ', icon: 'p-germ', code: 'MF · CG', tint: '#f6e7b8', fill: '#dcae45',
      name: { ar: 'جنين الذرة', en: 'Corn Germ' }, latin: 'CORN GERM', ang: 54,
      desc: { ar: 'يُفصل من حبة الذرة كمنتج مستقل ضمن منتجات مصنع ماستر فود.', en: 'Separated from the corn kernel as one of Master Food’s products.' },
      props: [[{ ar: 'المصدر', en: 'Source' }, { ar: 'حبة الذرة', en: 'Corn kernel' }]],
      uses: null
    },
    {
      id: 'gluten-feed', icon: 'p-feed', code: 'MF · GF16', tint: '#efe1c4', fill: '#c99a4a',
      name: { ar: 'جلوتوفيد 16%', en: 'Glutofed 16%' }, latin: 'GLUTEN FEED 16%', ang: 126,
      desc: { ar: 'منتج طبيعي يُحصل عليه أثناء إنتاج النشاء من الذرة، ويُستخدم في أعلاف الماشية كمصدر للطاقة والبروتين.', en: 'A natural product obtained during starch production from corn, used in livestock feed as a source of energy and protein.' },
      props: [
        [{ ar: 'المصدر', en: 'Source' }, { ar: 'إنتاج النشاء من الذرة', en: 'Starch production from corn' }],
        [{ ar: 'القيمة', en: 'Value' }, { ar: 'مصدر للطاقة والبروتين', en: 'Source of energy and protein' }]
      ],
      uses: { ar: ['أعلاف الماشية'], en: ['Livestock feed'] }
    },
    {
      id: 'gluten-meal', icon: 'p-meal', code: 'MF · GM60', tint: '#f8e2a8', fill: '#e0a526',
      name: { ar: 'جلوتين ميل 60%', en: 'Gluten Meal 60%' }, latin: 'GLUTEN MEAL 60%', ang: 198,
      desc: { ar: 'أحد منتجات الذرة في مصنع ماستر فود.', en: 'One of Master Food’s corn products.' },
      props: [[{ ar: 'المصدر', en: 'Source' }, { ar: 'الذرة', en: 'Corn' }]],
      uses: null
    }
  ];
  const P = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));

  const ICON = {
    corn: '<path d="M12 3c3.5 0 5.5 2.4 5.5 5.6 0 3.9-2.6 7.6-5 9.3a.9.9 0 0 1-1 0c-2.4-1.7-5-5.4-5-9.3C6.5 5.4 8.5 3 12 3Z"/><path d="M12 12c1.2 0 1.8 1.4 1.6 3"/>',
    receive: '<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.6"/><circle cx="17" cy="17.5" r="1.6"/>',
    inspect: '<circle cx="10.5" cy="10.5" r="6"/><path d="m15 15 5 5M8 10.5h5"/>',
    process: '<circle cx="12" cy="12" r="3"/><path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1m0-12.8-2.1 2.1m-8.6 8.6-2.1 2.1"/>',
    separate: '<path d="M12 3v7M12 10 5 17m7-7 7 7M12 10v11"/><circle cx="5" cy="19" r="1.5"/><circle cx="19" cy="19" r="1.5"/>',
    qc: '<path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6Z"/><path d="m9 12 2 2 4-4"/>',
    store: '<path d="M6 8a3 3 0 0 1 6 0v12H6zM12 12h7v8h-7"/><path d="M14 15h3"/>',
    deliver: '<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.6"/><circle cx="17" cy="17.5" r="1.6"/><path d="M6 11h5m-2-2 2 2-2 2"/>'
  };

  const PROCESS = [
    { k: 'corn', n: 'Corn', t: { ar: 'الذرة', en: 'Corn' }, d: { ar: 'المادة الخام الأساسية للمصنع: الذرة الصفراء.', en: 'The factory’s core raw material: yellow corn.' } },
    { k: 'receive', n: 'Receiving', t: { ar: 'الاستلام', en: 'Receiving' }, d: { ar: 'استلام المواد الخام والتأكد من مطابقتها لمواصفات الشركة.', en: 'Raw materials are received and checked against company specifications.' } },
    { k: 'inspect', n: 'Inspection', t: { ar: 'الفحص', en: 'Inspection' }, d: { ar: 'تفحص إدارة الجودة المواد الخام قبل دخولها مراحل التصنيع.', en: 'Quality management inspects raw materials before they enter manufacturing.' } },
    { k: 'process', n: 'Processing', t: { ar: 'المعالجة', en: 'Processing' }, d: { ar: 'تصنيع النشاء والجلوكوز من الذرة الصفراء، مع متابعة المنتج أثناء التصنيع للتأكد من سلامة ودقة خطوات التصنيع.', en: 'Starch and glucose are made from yellow corn, with the product followed during manufacturing to ensure each step is safe and accurate.' } },
    { k: 'separate', n: 'Separation', t: { ar: 'الفصل', en: 'Separation' }, d: { ar: 'تتحول الذرة إلى عدة منتجات: نشاء الذرة، وشراب الجلوكوز من النشاء، إلى جانب جنين الذرة وجلوتوفيد 16% وجلوتين ميل 60%.', en: 'Corn becomes several products: corn starch, glucose syrup from the starch, plus corn germ, Glutofed 16% and Gluten Meal 60%.' } },
    { k: 'qc', n: 'Quality Control', t: { ar: 'مراقبة الجودة', en: 'Quality control' }, d: { ar: 'فحص المنتج النهائي من خلال التحاليل الفيزيائية والكيميائية والميكروبيولوجية.', en: 'The final product is tested through physical, chemical and microbiological analyses.' } },
    { k: 'store', n: 'Storage', t: { ar: 'التخزين', en: 'Storage' }, d: { ar: 'مراقبة درجات الحرارة والرطوبة في المخازن.', en: 'Temperature and humidity are monitored in the warehouses.' } },
    { k: 'deliver', n: 'Delivery', t: { ar: 'التوصيل', en: 'Delivery' }, d: { ar: 'متابعة ملاءمة وسائل النقل حتى يصل المنتج إلى العميل.', en: 'Transport vehicles are checked for suitability until the product reaches the client.' } }
  ];

  const QUALITY = [
    { code: 'QC-01 · RAW', n: 'Raw Material', t: { ar: 'المواد الخام', en: 'Raw material' },
      h: { ar: 'فحص المواد الخام', en: 'Raw material inspection' },
      d: { ar: 'تبدأ الجودة قبل التصنيع: استلام المواد الخام والتحقق من مطابقتها لمواصفات الشركة.', en: 'Quality starts before manufacturing: raw materials are received and verified against company specifications.' },
      c: { ar: ['استلام المواد الخام', 'التحقق من المطابقة لمواصفات الشركة'], en: ['Receiving raw materials', 'Verifying compliance with company specifications'] } },
    { code: 'QC-02 · IN-PROCESS', n: 'In-process Control', t: { ar: 'أثناء التصنيع', en: 'In-process control' },
      h: { ar: 'متابعة المنتج أثناء التصنيع', en: 'Following the product in production' },
      d: { ar: 'متابعة المنتج أثناء مراحل التصنيع للتأكد من سلامة ودقة خطوات التصنيع.', en: 'The product is followed through manufacturing to make sure every step is safe and accurate.' },
      c: { ar: ['رقابة دورية في جميع مراحل التشغيل', 'اكتشاف أي انحرافات مبكرًا', 'اتخاذ الإجراءات اللازمة لحماية صحة المستهلك وجودة المنتج'], en: ['Periodic monitoring across all stages of operation', 'Early detection of any deviation', 'Taking the necessary measures to protect consumer health and product quality'] } },
    { code: 'QC-03 · LAB', n: 'Laboratory Testing', t: { ar: 'الفحص المخبري', en: 'Laboratory testing' },
      h: { ar: 'فحص المنتج النهائي', en: 'Final product testing' },
      d: { ar: 'يخضع المنتج النهائي للتحاليل في المختبر وفق المعايير الدولية.', en: 'The final product is analysed in the laboratory in line with international standards.' },
      c: { ar: ['التحاليل الفيزيائية', 'التحاليل الكيميائية', 'التحاليل الميكروبيولوجية'], en: ['Physical analyses', 'Chemical analyses', 'Microbiological analyses'] } },
    { code: 'QC-04 · STORAGE', n: 'Storage Monitoring', t: { ar: 'مراقبة التخزين', en: 'Storage monitoring' },
      h: { ar: 'مراقبة ظروف المخازن', en: 'Warehouse conditions' },
      d: { ar: 'تمتد الرقابة إلى المخازن، حيث تتم مراقبة درجات الحرارة والرطوبة.', en: 'Monitoring continues in the warehouses, where temperature and humidity are tracked.' },
      c: { ar: ['مراقبة درجة الحرارة', 'مراقبة الرطوبة'], en: ['Temperature monitoring', 'Humidity monitoring'] } },
    { code: 'QC-05 · TRANSPORT', n: 'Transport Check', t: { ar: 'فحص النقل', en: 'Transport check' },
      h: { ar: 'ملاءمة وسائل النقل', en: 'Transport suitability' },
      d: { ar: 'آخر نقطة رقابة قبل العميل: متابعة ملاءمة وسائل النقل.', en: 'The last checkpoint before the client: transport vehicles are checked for suitability.' },
      c: { ar: ['متابعة ملاءمة وسائل النقل'], en: ['Checking the suitability of transport vehicles'] } }
  ];

  /* ------------------------------------------------------------------ Language */
  function setLang(l, save = true) {
    root.lang = l; root.dir = l === 'ar' ? 'rtl' : 'ltr';
    $$('[data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === l)));
    if (save) { try { localStorage.setItem('mf-lang', l); } catch (e) { /* storage unavailable */ } }
    renderAll();
  }
  $$('[data-lang]').forEach((b) => b.addEventListener('click', () => setLang(b.dataset.lang)));

  /* ------------------------------------------------------------------ Header */
  const hdr = $('#hdr'), nav = $('#nav'), burger = $('#burger');
  burger.addEventListener('click', () => {
    const open = burger.getAttribute('aria-expanded') !== 'true';
    burger.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  $$('#nav a').forEach((a) => a.addEventListener('click', () => { burger.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); }));

  /* ------------------------------------------------------------------ Process line */
  let step = 0, procTimer = null;
  function renderProcess() {
    const track = $('#pline .pline__track');
    $$('.pnode', track).forEach((n) => n.remove());
    PROCESS.forEach((s, i) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'pnode'; b.setAttribute('role', 'tab');
      b.innerHTML = `<span class="pnode__dot"><svg viewBox="0 0 24 24" aria-hidden="true">${ICON[s.k]}</svg></span><span class="pnode__n">${String(i).padStart(2, '0')}</span><span class="pnode__t">${t(s.t)}</span>`;
      b.addEventListener('click', () => { stopAuto(); goStep(i); });
      track.appendChild(b);
    });
    goStep(step, true);
  }
  function goStep(i, silent) {
    step = (i + PROCESS.length) % PROCESS.length;
    const s = PROCESS[step];
    $('#pline').style.setProperty('--step', step);
    $$('.pnode').forEach((n, k) => {
      n.classList.toggle('is-on', k === step); n.classList.toggle('is-past', k < step);
      n.setAttribute('aria-selected', String(k === step));
    });
    const panel = $('#ppanel');
    panel.innerHTML = `<div class="ppanel__n">${String(step).padStart(2, '0')}</div>
      <div><span class="src">${s.n.toUpperCase()}</span><h3>${t(s.t)}</h3><p>${t(s.d)}</p></div>
      <div class="ppanel__ctrl">
        <button class="icon-btn dir" type="button" data-d="-1" aria-label="${lang() === 'ar' ? 'المرحلة السابقة' : 'Previous stage'}"><svg viewBox="0 0 24 24"><path d="M15 6 9 12l6 6"/></svg></button>
        <button class="icon-btn dir" type="button" data-d="1" aria-label="${lang() === 'ar' ? 'المرحلة التالية' : 'Next stage'}"><svg viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></svg></button>
      </div>`;
    $$('[data-d]', panel).forEach((b) => b.addEventListener('click', () => { stopAuto(); goStep(step + +b.dataset.d); }));
  }
  function stopAuto() { clearInterval(procTimer); procTimer = null; }
  if (!RM && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting && !procTimer && step === 0) {
          procTimer = setInterval(() => { if (step >= PROCESS.length - 1) stopAuto(); else goStep(step + 1); }, 1600);
          io.disconnect();
        }
      });
    }, { threshold: .5 });
    io.observe($('#pline'));
  }

  /* ------------------------------------------------------------------ Product map */
  let activeProduct = 'corn-starch';
  function renderMap() {
    const map = $('#pmap'), svg = $('.pmap__lines', map);
    $$('.pnode2', map).forEach((n) => n.remove());
    $$('line', svg).forEach((n) => n.remove());
    PRODUCTS.forEach((p) => {
      const a = (p.ang * Math.PI) / 180, x = 50 + 40 * Math.cos(a), y = 50 + 40 * Math.sin(a);
      const ln = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      ln.setAttribute('x1', 50); ln.setAttribute('y1', 50); ln.setAttribute('x2', x); ln.setAttribute('y2', y);
      ln.setAttribute('vector-effect', 'non-scaling-stroke'); ln.dataset.id = p.id;
      svg.appendChild(ln);
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'pnode2'; b.dataset.id = p.id;
      b.style.left = x + '%'; b.style.top = y + '%';
      b.innerHTML = `<span class="pnode2__disc"><svg viewBox="0 0 64 64" aria-hidden="true"><use href="#${p.icon}"/></svg></span><span class="pnode2__name">${t(p.name)}</span><span class="pnode2__en">${p.latin}</span>`;
      b.addEventListener('mouseenter', () => selectProduct(p.id, true));
      b.addEventListener('focus', () => selectProduct(p.id, true));
      b.addEventListener('click', () => openProduct(p.id));
      map.appendChild(b);
    });
    selectProduct(activeProduct, false);
  }
  function selectProduct(id, fly) {
    const changed = id !== activeProduct;
    activeProduct = id;
    const p = P[id];
    $$('#pmap .pnode2').forEach((n) => n.classList.toggle('is-on', n.dataset.id === id));
    $$('#pmap line').forEach((n) => n.classList.toggle('is-on', n.dataset.id === id));
    const uses = p.uses ? t(p.uses) : null;
    $('#pinfo').innerHTML = `<span class="pinfo__k">${p.latin} · ${p.code}</span>
      <h3>${t(p.name)}</h3><p>${t(p.desc)}</p>
      ${uses ? `<ul class="chips">${uses.map((u) => `<li class="chip chip--corn">${u}</li>`).join('')}</ul>` : `<p class="note" style="margin-top:0">${t(ON_REQUEST)}</p>`}
      <button class="btn" type="button" data-product="${p.id}">${lang() === 'ar' ? 'افتح صفحة المنتج' : 'Open product page'}<svg class="arr" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M19 12H5m6-6-6 6 6 6"/></svg></button>`;
    if (fly && changed && !RM) flyParticle(p);
  }
  // A single kernel particle travels from the core to the hovered product
  function flyParticle(p) {
    const map = $('#pmap');
    const a = (p.ang * Math.PI) / 180;
    const dot = document.createElement('span'); dot.className = 'particle';
    map.appendChild(dot);
    const anim = dot.animate([
      { left: '50%', top: '50%', transform: 'scale(.6)', opacity: 0 },
      { opacity: 1, offset: .15 },
      { left: 50 + 34 * Math.cos(a) + '%', top: 50 + 34 * Math.sin(a) + '%', transform: 'scale(1)', opacity: 0 }
    ], { duration: 650, easing: 'cubic-bezier(.2,.7,.2,1)' });
    anim.onfinish = () => dot.remove();
  }

  /* ------------------------------------------------------------------ Co-products */
  const coD = $('#coDiagram');
  $$('.corow').forEach((row) => {
    const on = () => {
      coD.classList.add('focus');
      $$('[data-part]', coD).forEach((p) => p.classList.toggle('is-on', p.dataset.part === row.dataset.co));
      $$('.corow').forEach((r) => r.classList.toggle('is-on', r === row));
    };
    const off = () => { coD.classList.remove('focus'); $$('.corow').forEach((r) => r.classList.remove('is-on')); };
    row.addEventListener('mouseenter', on); row.addEventListener('focusin', on);
    row.addEventListener('mouseleave', off); row.addEventListener('focusout', off);
  });

  /* ------------------------------------------------------------------ Quality lab */
  let qi = 0;
  const LABS = [
    // kernels under the lens
    () => [[-40, -30, -18], [30, -38, 22], [-6, 24, 6], [44, 34, -30], [-50, 44, 30]].map(([x, y, r]) =>
      `<use href="#kernel" x="-15" y="-20" width="30" height="40" transform="translate(${x} ${y}) rotate(${r})"/>`).join(''),
    // flow through a pipe with a gauge
    () => `<rect x="-90" y="-14" width="180" height="28" rx="14" fill="none" stroke="#cfe0d6"/><path d="M-80 0h160" stroke="#e2a414" stroke-width="6" stroke-dasharray="10 8" stroke-linecap="round"><animate attributeName="stroke-dashoffset" from="36" to="0" dur="1s" repeatCount="indefinite"/></path><circle cx="0" cy="-54" r="24" fill="none" stroke="#cfe0d6"/><path d="M0 -54l12 -12" stroke="#e2a414" stroke-width="2" stroke-linecap="round"/><path d="M0 -14v-16" stroke="#cfe0d6"/>`,
    // three sample tubes: physical / chemical / microbiological
    () => [-50, 0, 50].map((x, i) => `<g transform="translate(${x} 0)"><rect x="-12" y="-60" width="24" height="110" rx="12" fill="none" stroke="#cfe0d6"/><rect x="-9" y="${-10 + i * 12}" width="18" height="${56 - i * 12}" rx="9" fill="${['#f4f1e6', '#e2a414', '#9fcfb8'][i]}" opacity=".85"/><text y="70" text-anchor="middle" fill="#9fb5a9" font-size="9" font-family="IBM Plex Mono" letter-spacing=".08em">${['PHY', 'CHEM', 'MICRO'][i]}</text></g>`).join(''),
    // temperature + humidity
    () => `<g transform="translate(-36 0)"><rect x="-9" y="-62" width="18" height="96" rx="9" fill="none" stroke="#cfe0d6"/><circle cy="44" r="16" fill="none" stroke="#cfe0d6"/><circle cy="44" r="11" fill="#e2a414"/><rect x="-4" y="-20" width="8" height="62" rx="4" fill="#e2a414"/><text y="80" text-anchor="middle" fill="#9fb5a9" font-size="9" font-family="IBM Plex Mono">TEMP</text></g><g transform="translate(40 0)"><path d="M0 -50S-28 -12 -28 10a28 28 0 0 0 56 0C28 -12 0 -50 0 -50Z" fill="none" stroke="#cfe0d6"/><path d="M-22 14a22 22 0 0 0 44 0" fill="#9fcfb8" opacity=".6"/><text y="80" text-anchor="middle" fill="#9fb5a9" font-size="9" font-family="IBM Plex Mono">RH</text></g>`,
    // transport vehicle
    () => `<g fill="none" stroke="#cfe0d6" stroke-width="1.5"><rect x="-80" y="-36" width="104" height="60" rx="4"/><path d="M24 -16h30l22 22v18H24"/><circle cx="-50" cy="30" r="12"/><circle cx="50" cy="30" r="12"/></g><path d="M-68 -6h80" stroke="#e2a414" stroke-width="2" stroke-dasharray="4 5"/><circle cx="-50" cy="30" r="4" fill="#e2a414"/><circle cx="50" cy="30" r="4" fill="#e2a414"/>`
  ];
  function renderQuality() {
    const steps = $('#qtl .qtl__steps');
    $$('.qstep', steps).forEach((n) => n.remove());
    QUALITY.forEach((q, i) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'qstep'; b.setAttribute('role', 'tab');
      b.innerHTML = `<i></i><span>${q.n.toUpperCase()}</span><b>${t(q.t)}</b>`;
      b.addEventListener('click', () => goQuality(i));
      steps.appendChild(b);
    });
    goQuality(qi);
  }
  function goQuality(i) {
    qi = i;
    const q = QUALITY[i];
    $('#qtl').style.setProperty('--qi', i);
    $$('.qstep').forEach((b, k) => b.setAttribute('aria-selected', String(k === i)));
    $('#labCode').textContent = q.code;
    $('#labSvg').innerHTML = `
      <defs><clipPath id="lens"><circle r="100"/></clipPath></defs>
      <circle r="100" fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.35)"/>
      <circle r="108" fill="none" stroke="rgba(255,255,255,.12)" stroke-dasharray="2 6"/>
      <g stroke="rgba(255,255,255,.3)">${Array.from({ length: 24 }, (_, k) => { const a = k * Math.PI / 12, r1 = k % 6 ? 104 : 98; return `<line x1="${Math.cos(a) * r1}" y1="${Math.sin(a) * r1}" x2="${Math.cos(a) * 108}" y2="${Math.sin(a) * 108}"/>`; }).join('')}</g>
      <g clip-path="url(#lens)">${LABS[i]()}<g class="lab-scan"><rect x="-100" y="-2" width="200" height="4" fill="#e2a414" opacity=".5"/><rect x="-100" y="-30" width="200" height="28" fill="url(#scanG)" opacity=".25"/></g></g>
      <defs><linearGradient id="scanG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e2a414" stop-opacity="0"/><stop offset="1" stop-color="#e2a414"/></linearGradient></defs>`;
    $('#labBody').innerHTML = `<span class="lab__label">${q.code}</span><h3>${t(q.h)}</h3><p>${t(q.d)}</p>
      <ul class="checks">${t(q.c).map((c) => `<li>${c}</li>`).join('')}</ul>
      <span class="src">${lang() === 'ar' ? 'المصدر: إدارة الجودة — الموقع الرسمي' : 'Source: Quality management — official site'}</span>`;
  }

  /* ------------------------------------------------------------------ Lineup jars */
  function renderJars() {
    $('#jars').innerHTML = PRODUCTS.map((p, i) => `
      <button class="jar rv in" type="button" data-product="${p.id}">
        <svg viewBox="0 0 120 170" aria-hidden="true">
          <rect x="30" y="8" width="60" height="16" rx="3" style="fill:var(--green)"/>
          <path d="M26 30h68v118a14 14 0 0 1-14 14H40a14 14 0 0 1-14-14Z" style="fill:var(--white);stroke:var(--steel-200)" stroke-width="1.5"/>
          <path d="M28 ${p.id === 'glucose-syrup' ? 70 : 84}h64v64a12 12 0 0 1-12 12H40a12 12 0 0 1-12-12Z" fill="${p.fill}" opacity="${p.id === 'corn-starch' ? 1 : .9}" ${p.id === 'corn-starch' ? 'style="stroke:var(--steel-200)"' : ''}/>
          <rect x="36" y="44" width="48" height="30" rx="3" style="fill:var(--paper);stroke:var(--steel-200)"/>
          <text x="60" y="57" text-anchor="middle" font-size="7" font-family="IBM Plex Mono" letter-spacing=".08em" style="fill:var(--ink)">${p.code}</text>
          <text x="60" y="67" text-anchor="middle" font-size="5.5" font-family="IBM Plex Mono" style="fill:var(--steel)">MASTER FOOD</text>
          <path d="M34 36v100" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".5"/>
        </svg>
        <b>${t(p.name)}</b><small>${String(i + 1).padStart(2, '0')} · ${p.latin}</small>
      </button>`).join('');
  }

  /* ------------------------------------------------------------------ Forms */
  function fillProductOptions() {
    $('#c-products').innerHTML = PRODUCTS.map((p) => `<input type="checkbox" id="cp-${p.id}" name="products" value="${p.name.en}"><label for="cp-${p.id}">${t(p.name)}</label>`).join('');
    const sel = $('#m-product'), cur = sel.value;
    sel.innerHTML = `<option value="">${lang() === 'ar' ? 'اختر منتجًا' : 'Choose a product'}</option>` + PRODUCTS.map((p) => `<option value="${p.id}">${t(p.name)}</option>`).join('');
    sel.value = cur;
  }
  function validate(form) {
    let ok = true;
    $$('[required]', form).forEach((el) => {
      const f = el.closest('.field');
      const bad = !el.value.trim() || (el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value));
      f.classList.toggle('is-err', bad);
      $('.err', f)?.remove();
      if (bad) {
        ok = false;
        const m = document.createElement('span'); m.className = 'err';
        m.textContent = el.type === 'email' && el.value ? (lang() === 'ar' ? 'أدخل بريدًا إلكترونيًا صحيحًا.' : 'Enter a valid email address.') : (lang() === 'ar' ? 'هذا الحقل مطلوب.' : 'This field is required.');
        f.appendChild(m);
      }
    });
    return ok;
  }
  // No backend on a static site: prepare an email to the official address.
  function handleForm(form, status, fields) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validate(form)) { $('.is-err [required]', form)?.focus(); return; }
      const d = new FormData(form);
      const body = fields(d);
      const href = `mailto:${EMAIL}?subject=${encodeURIComponent('Master Food — ' + (lang() === 'ar' ? 'طلب استفسار' : 'Inquiry'))}&body=${encodeURIComponent(body)}`;
      status.innerHTML = lang() === 'ar'
        ? `تم تجهيز طلبك. <a href="${href}">افتح البريد لإرساله إلى ${EMAIL}</a>`
        : `Your request is ready. <a href="${href}">Open your email to send it to ${EMAIL}</a>`;
    });
  }
  handleForm($('#contactForm'), $('#c-status'), (d) => [
    `Name: ${d.get('name')}`, `Company: ${d.get('company') || '-'}`, `Email: ${d.get('email')}`, `Phone: ${d.get('phone') || '-'}`,
    `Products: ${d.getAll('products').join(', ') || '-'}`, '', d.get('message')].join('\n'));
  handleForm($('#modalForm'), $('#m-status'), (d) => [
    `Name: ${d.get('name')}`, `Email: ${d.get('email')}`, `Product: ${P[d.get('product')]?.name.en || '-'}`, '', d.get('message')].join('\n'));

  /* ------------------------------------------------------------------ Modal */
  let lastFocus = null;
  function openModal(id, product) {
    const m = document.getElementById(id); if (!m) return;
    lastFocus = document.activeElement;
    m.hidden = false; document.body.classList.add('lock');
    if (product) $('#m-product').value = product;
    setTimeout(() => $('input, select, textarea', m)?.focus(), 50);
  }
  function closeModal(m) {
    m.hidden = true;
    if ($('#pdx').hidden) document.body.classList.remove('lock');
    lastFocus?.focus?.();
  }
  document.addEventListener('click', (e) => {
    const o = e.target.closest('[data-open]'); if (o) { openModal(o.dataset.open, o.dataset.productPick); return; }
    const c = e.target.closest('[data-close]'); if (c) { closeModal(c.closest('.modal')); return; }
    const p = e.target.closest('[data-product]'); if (p) { openProduct(p.dataset.product); return; }
    const cp = e.target.closest('[data-copy]');
    if (cp) {
      const done = () => { const o2 = cp.textContent; cp.textContent = lang() === 'ar' ? 'تم النسخ' : 'COPIED'; setTimeout(() => (cp.textContent = o2), 1400); };
      navigator.clipboard?.writeText(cp.dataset.copy).then(done, () => {
        const r = document.createRange(); r.selectNodeContents(cp.previousElementSibling.querySelector('a, .v')); getSelection().removeAllRanges(); getSelection().addRange(r);
      });
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const m = $$('.modal').find((x) => !x.hidden);
    if (m) closeModal(m); else if (!$('#pdx').hidden) closeProduct();
  });

  /* ------------------------------------------------------------------ Product experience */
  let pdxReturn = null;
  function openProduct(id, fromHash) {
    if (!P[id]) return;
    if (!fromHash && location.hash !== '#' + id) { pdxReturn = document.activeElement; history.pushState(null, '', '#' + id); }
    renderProduct(id);
  }
  function renderProduct(id) {
    const p = P[id], i = PRODUCTS.indexOf(p);
    const prev = PRODUCTS[(i + PRODUCTS.length - 1) % PRODUCTS.length], next = PRODUCTS[(i + 1) % PRODUCTS.length];
    const ar = lang() === 'ar';
    const pdx = $('#pdx');
    pdx.dataset.id = id;
    pdx.setAttribute('aria-label', t(p.name));
    pdx.innerHTML = `
      <div class="pdx__top"><div class="wrap">
        <nav aria-label="Breadcrumb" style="min-width:0"><ol class="crumbs">
          <li><a href="#home" data-pdx-close>${ar ? 'الرئيسية' : 'Home'}</a></li>
          <li><a href="#products" data-pdx-close>${ar ? 'منتجاتنا' : 'Products'}</a></li>
          <li aria-current="page">${t(p.name)}</li>
        </ol></nav>
        <button class="icon-btn" type="button" data-pdx-close aria-label="${ar ? 'إغلاق' : 'Close'}"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
      </div></div>
      <div class="wrap">
        <div class="pdx__hero">
          <div class="pdx__visual" style="background:radial-gradient(circle at 50% 45%, ${p.tint}, var(--white) 70%)">
            <span class="lab__label">${p.code}</span>
            <svg viewBox="0 0 64 64" aria-hidden="true"><use href="#${p.icon}"/></svg>
          </div>
          <div>
            <span class="pdx__en">${p.latin}</span>
            <h1>${t(p.name)}</h1>
            <p class="pdx__desc">${t(p.desc)}</p>
            <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:32px">
              <button class="btn btn--lg" type="button" data-open="inquiry" data-product-pick="${p.id}">${ar ? 'استفسر عن هذا المنتج' : 'Ask about this product'}</button>
              <button class="btn btn--lg btn--ghost" type="button" data-pdx-close>${ar ? 'العودة للمنتجات' : 'Back to products'}</button>
            </div>
          </div>
        </div>
        <section class="pdx__sec"><h2>${ar ? 'المعلومات المتوفرة' : 'Available information'}</h2>
          <dl class="facts" style="margin:0">${p.props.map(([k, v]) => `<div class="fact"><dt>${t(k)}</dt><dd>${t(v)}</dd></div>`).join('')}</dl>
        </section>
        <section class="pdx__sec"><h2>${ar ? 'الاستخدامات' : 'Uses'}</h2>
          <div>${p.uses ? `<ul class="chips">${t(p.uses).map((u) => `<li class="chip chip--corn">${u}</li>`).join('')}</ul>` : `<p style="color:var(--ink-2)">${t(ON_REQUEST)}</p>`}</div>
        </section>
        <section class="pdx__sec"><h2>${ar ? 'الجودة' : 'Quality'}</h2>
          <div><p style="color:var(--ink-2);max-width:62ch">${ar ? 'تتابع إدارة الجودة المنتج من فحص المواد الخام، مرورًا بمراحل التصنيع، حتى فحص المنتج النهائي بالتحاليل الفيزيائية والكيميائية والميكروبيولوجية، ثم مراقبة التخزين وملاءمة وسائل النقل.' : 'Quality management follows the product from raw material inspection, through manufacturing, to final product testing with physical, chemical and microbiological analyses, then storage monitoring and transport suitability.'}</p>
          <p style="margin-top:16px"><a class="link-arrow" href="#quality" data-pdx-close>${ar ? 'رحلة الجودة ←' : 'The quality journey →'}</a></p></div>
        </section>
        <nav class="pdx__nav" aria-label="${ar ? 'منتجات أخرى' : 'Other products'}">
          <button type="button" data-product="${prev.id}"><small>${ar ? 'المنتج السابق' : 'Previous'}</small><b>${t(prev.name)}</b></button>
          <button type="button" data-product="${next.id}" style="text-align:end"><small>${ar ? 'المنتج التالي' : 'Next'}</small><b>${t(next.name)}</b></button>
        </nav>
      </div>`;
    const wasHidden = pdx.hidden;
    pdx.hidden = false; pdx.scrollTop = 0;
    document.body.classList.add('lock');
    $$('[data-pdx-close]', pdx).forEach((b) => b.addEventListener('click', (e) => {
      const href = b.getAttribute('href');
      e.preventDefault(); closeProduct();
      if (href) document.querySelector(href)?.scrollIntoView({ behavior: RM ? 'auto' : 'smooth' });
    }));
    if (wasHidden) $('[data-pdx-close].icon-btn', pdx).focus();
  }
  function closeProduct() {
    const pdx = $('#pdx'); if (pdx.hidden) return;
    pdx.hidden = true; document.body.classList.remove('lock');
    if (P[location.hash.slice(1)]) history.replaceState(null, '', location.pathname + location.search);
    pdxReturn?.focus?.(); pdxReturn = null;
  }
  function syncHash() {
    const id = location.hash.slice(1);
    if (P[id]) openProduct(id, true); else closeProduct();
  }
  window.addEventListener('hashchange', syncHash);
  window.addEventListener('popstate', syncHash);

  /* ------------------------------------------------------------------ Canvases */
  // Raw material: a macro field of yellow corn kernels, drawn once.
  function kernelPath(ctx, s) {
    ctx.beginPath();
    ctx.moveTo(0, -s);
    ctx.bezierCurveTo(s * .9, -s, s * .95, -s * .1, s * .7, s * .45);
    ctx.bezierCurveTo(s * .45, s * .9, s * .15, s * 1.05, 0, s * 1.05);
    ctx.bezierCurveTo(-s * .15, s * 1.05, -s * .45, s * .9, -s * .7, s * .45);
    ctx.bezierCurveTo(-s * .95, -s * .1, -s * .9, -s, 0, -s);
    ctx.closePath();
  }
  function drawGrains() {
    const c = $('#grainCanvas'); if (!c) return;
    const r = c.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2);
    c.width = r.width * dpr; c.height = r.height * dpr;
    const ctx = c.getContext('2d'); ctx.scale(dpr, dpr);
    let seed = 7; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const s = Math.max(14, r.width / 16);
    const cols = Math.ceil(r.width / (s * 1.3)) + 2, rows = Math.ceil(r.height / (s * 1.5)) + 2;
    for (let y = -1; y < rows; y++) {
      for (let x = -1; x < cols; x++) {
        const px = x * s * 1.3 + (y % 2) * s * .65 + (rnd() - .5) * s * .5;
        const py = y * s * 1.5 + (rnd() - .5) * s * .5;
        ctx.save(); ctx.translate(px, py); ctx.rotate((rnd() - .5) * 2.6);
        const k = s * (.62 + rnd() * .12);
        const g = ctx.createLinearGradient(-k, -k, k, k);
        const h = 40 + rnd() * 8;
        g.addColorStop(0, `hsl(${h} 90% 68%)`); g.addColorStop(.6, `hsl(${h - 2} 85% 50%)`); g.addColorStop(1, `hsl(${h - 6} 80% 36%)`);
        ctx.shadowColor = 'rgba(80,50,0,.35)'; ctx.shadowBlur = k * .5; ctx.shadowOffsetY = k * .15;
        kernelPath(ctx, k); ctx.fillStyle = g; ctx.fill();
        ctx.shadowColor = 'transparent';
        ctx.beginPath(); ctx.ellipse(-k * .3, -k * .45, k * .22, k * .32, -.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fill();
        ctx.beginPath(); ctx.ellipse(0, k * .45, k * .22, k * .36, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,236,170,.45)'; ctx.fill();
        ctx.restore();
      }
    }
  }

  // Starch: particles shaped like a kernel settle into a mound of white powder.
  const starch = { pts: [], w: 0, h: 0, ctx: null, p: RM ? 1 : 0, last: -1 };
  function setupStarch() {
    const c = $('#starchCanvas'); if (!c) return;
    const r = c.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2);
    c.width = r.width * dpr; c.height = r.height * dpr;
    starch.ctx = c.getContext('2d'); starch.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    starch.w = r.width; starch.h = r.height;
    const N = r.width < 400 ? 650 : 1300, w = r.width, h = r.height;
    const ks = w * .2; const cx = w / 2, cy = h * .4;
    const probe = document.createElement('canvas').getContext('2d');
    probe.translate(cx, cy); kernelPath(probe, ks);
    let seed = 3; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    starch.pts = [];
    while (starch.pts.length < N) {
      const x = cx + (rnd() - .5) * ks * 2, y = cy + (rnd() - .5) * ks * 2.2;
      if (!probe.isPointInPath(x, y)) continue;
      // mound: gaussian-ish spread, higher in the middle
      const u = (rnd() + rnd() + rnd()) / 3 - .5;
      const mx = cx + u * w * .9;
      const peak = h * .3 * Math.max(0, 1 - Math.abs(u) * 2.1);
      const my = h * .86 - rnd() * peak;
      starch.pts.push({ x, y, mx, my, d: rnd(), r: .7 + rnd() * 1.3 });
    }
    starch.last = -1; drawStarch();
  }
  function drawStarch() {
    const { ctx, w, h, pts } = starch; if (!ctx) return;
    const p = starch.p; if (Math.abs(p - starch.last) < .002) return; starch.last = p;
    ctx.clearRect(0, 0, w, h);
    const col = cssVar('--particle') || '#c9c6bb', gold = '#e2a414';
    for (const q of pts) {
      const lp = clamp((p - q.d * .35) / .65); const e = lp * lp * (3 - 2 * lp);
      const x = q.x + (q.mx - q.x) * e + Math.sin(q.d * 40 + e * 6) * 10 * e * (1 - e);
      const y = q.y + (q.my - q.y) * e;
      ctx.globalAlpha = .55 + .45 * (1 - q.d * .5);
      ctx.fillStyle = e < .25 ? gold : col;
      ctx.beginPath(); ctx.arc(x, y, q.r * (1 - e * .25), 0, 6.283); ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.strokeStyle = cssVar('--steel-200'); ctx.beginPath(); ctx.moveTo(w * .04, h * .87); ctx.lineTo(w * .96, h * .87); ctx.stroke();
  }

  /* ------------------------------------------------------------------ Scroll engine */
  const scene = $('#home'), heroCtas = $('#heroCtas'), vessel = $('#vessel'), valuesScene = $('#valuesScene');
  const railLinks = $$('#rail a');
  const railTargets = railLinks.map((a) => $(a.getAttribute('href')));
  const vals = $$('.val'), vArc = $('#vArc'), vNum = $('#vNum');
  let ticking = false;
  function onScroll() {
    const y = scrollY, vh = innerHeight;
    hdr.classList.toggle('is-solid', y > 40);

    // journey progress
    const docH = document.documentElement.scrollHeight - vh;
    root.style.setProperty('--rail', clamp(y / docH).toFixed(4));
    let cur = 0;
    railTargets.forEach((el, i) => { if (el && el.getBoundingClientRect().top <= vh * .45) cur = i; });
    railLinks.forEach((a, i) => { a.classList.toggle('is-on', i === cur); a.classList.toggle('is-done', i < cur); });
    $$('#nav a').forEach((a) => a.setAttribute('aria-current', String(a.getAttribute('href') === railLinks[cur].getAttribute('href'))));

    if (!RM) {
      // hero kernel opening
      const sr = scene.getBoundingClientRect();
      const p = clamp(-sr.top / (sr.height - vh));
      scene.style.setProperty('--p', p.toFixed(4));
      scene.style.setProperty('--e', clamp((p - .18) / .55).toFixed(4));
      heroCtas.toggleAttribute('inert', p > .25);

      // starch transformation
      const sc = $('#starch').getBoundingClientRect();
      starch.p = clamp((vh * .3 - sc.top) / (vh * .7));
      drawStarch();

      // glucose level
      const vr = vessel.getBoundingClientRect();
      vessel.style.setProperty('--fill', (.25 + .55 * clamp((vh - vr.top) / (vh + vr.height * .3))).toFixed(3));

      // values circle
      const vs = valuesScene.getBoundingClientRect();
      const span = Math.max(vs.height - vh, vh * .6);
      const vp = clamp((vh * .35 - vs.top) / span);
      const n = Math.min(7, Math.floor(vp * 8));
      vals.forEach((v, i) => v.classList.toggle('is-on', i < n));
      vArc.style.strokeDashoffset = (263.9 * (1 - n / 7)).toFixed(1);
      vNum.textContent = n;
    }
    ticking = false;
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });

  if (RM) { vals.forEach((v) => v.classList.add('is-on')); vArc.style.strokeDashoffset = 0; vNum.textContent = 7; }

  /* ------------------------------------------------------------------ Reveal + silos */
  if ('IntersectionObserver' in window) {
    const rio = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); rio.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
    $$('.rv').forEach((el) => rio.observe(el));
    const sio = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { $$('.silo-fill', e.target).forEach((f, i) => f.style.setProperty('--sf', ['.78', '.62'][i])); sio.disconnect(); }
    }), { threshold: .4 });
    sio.observe($('#silos'));
  } else {
    $$('.rv').forEach((el) => el.classList.add('in'));
  }

  /* ------------------------------------------------------------------ Boot */
  function renderAll() {
    renderProcess(); renderMap(); renderQuality(); renderJars(); fillProductOptions();
    const id = $('#pdx').dataset.id;
    if (!$('#pdx').hidden && id) renderProduct(id);
  }
  $('#yr').textContent = new Date().getFullYear();
  setLang(lang(), false);
  drawGrains(); setupStarch(); onScroll(); syncHash();
  let rz; addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => { drawGrains(); setupStarch(); onScroll(); }, 150); });
  matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', () => { starch.last = -1; drawStarch(); });
})();
