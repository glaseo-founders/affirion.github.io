(() => {
  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];

  const info = {
    overview: { title: 'Из космоса — в реальные решения', text: 'AFFIRION — B2B-платформа спутникового мониторинга территорий, объектов и природных рисков.', points: ['TerraWatch — выявление изменений территорий', 'Fire — тепловые аномалии и пожарная опасность', 'Отраслевые решения: инфраструктура, агро, экология'] },
    platform: { title: 'Платформа AFFIRION', text: 'Единая среда для спутниковой, погодной и геопространственной информации. На сайте показан демонстрационный интерфейс с примером данных.', points: ['Картографические слои и объекты наблюдения', 'История снимков и сравнение дат', 'События, отчёты и аналитические модули'] },
    fire: { title: 'Пожары', img: 'assets/photos/fire.webp', text: 'Тепловые аномалии и метеоусловия для наблюдения за пожарной опасностью.', points: ['Очаги и тепловые аномалии', 'Погодные факторы и история наблюдений', 'Отчёты и уведомления'] },
    flood: { title: 'Паводки', img: 'assets/photos/flood.webp', text: 'Изменения водной поверхности и оценка угроз для объектов и территорий.', points: ['Водная поверхность по датам', 'Наблюдение за выбранными объектами', 'Картографические отчёты'] },
    industrial: { title: 'Инфраструктура', img: 'assets/photos/infra.webp', text: 'Контроль физических активов и изменений вокруг них.', points: ['Объекты и зоны наблюдения', 'Сравнение спутниковых снимков', 'События и отчёты'] },
    agro: { title: 'Агро', img: 'assets/photos/agro.webp', text: 'Геопространственный анализ сельскохозяйственных территорий.', points: ['Индексы вегетации и их динамика', 'Сравнение полей и сезонов', 'История изменений участков'] },
    eco: { title: 'Экология', img: 'assets/photos/eco.webp', text: 'Мониторинг лесов, экосистем и изменений земного покрова.', points: ['Изменение лесного покрова', 'Земной покров по периодам', 'Визуальное сравнение снимков'] },
    gov: { title: 'Госсектор', img: 'assets/photos/gov.webp', text: 'Ситуационная осведомлённость о территориях и природных угрозах.', points: ['Территориальный мониторинг', 'Природные явления и их последствия', 'Отчёты для планирования'] },
    insurance: { title: 'Страхование', img: 'assets/photos/insurance.webp', text: 'Спутниковые данные для оценки природных рисков и документирования событий.', points: ['История состояния территорий', 'Контекст пожаров и паводков', 'Визуальные отчёты'] },
    monitor: { title: 'Мониторинг', text: 'Объекты и территории в едином картографическом пространстве.', points: ['Объекты и границы', 'Данные из нескольких источников', 'Исторические снимки'] },
    detect: { title: 'Выявление', text: 'Сравнение снимков по датам и сигналы о значимых изменениях.', points: ['Сравнение «до и после»', 'Оценка площади изменений', 'События по объектам'] },
    forecast: { title: 'Прогноз', text: 'Спутниковая и метеоинформация для оценки природных угроз.', points: ['Пожарная опасность', 'Паводковая обстановка', 'Источники и ограничения данных'] },
    analytics: { title: 'Аналитика', text: 'Геоданные — в понятные графики, сравнения и отчёты.', points: ['Динамика показателей', 'Работа со слоями', 'Экспорт аналитики'] },
    'p-terrawatch': { title: 'TerraWatch', text: 'Мониторинг территорий: сервис регулярно проверяет ваши участки по спутниковым снимкам и сообщает о существенных изменениях. Первый продукт платформы.', points: ['Территории и объекты на карте', 'Сравнение «до и после», история снимков', 'События об изменениях с площадью и уверенностью', 'Явная отметка, если пригодного снимка нет', 'Уведомления и отчёты'] },
    'p-fire': { title: 'Fire', text: 'Тепловые аномалии рядом с вашими объектами по открытым спутниковым данным. Второй продукт платформы. Не гарантирует обнаружение каждого пожара сразу после возникновения.', points: ['Тепловые аномалии на карте', 'Уведомления об аномалиях рядом с объектами', 'Пожарные факторы', 'История и отчёты'] },
    'p-flood': { title: 'Flood', text: 'Водная поверхность и подтопление территорий по датам. В планах развития платформы.', points: ['Водная поверхность по датам', 'Подтопление выбранных территорий и объектов', 'Картографические отчёты'] },
    'p-agro': { title: 'Agro', text: 'Состояние сельскохозяйственных угодий по спутниковым данным. В планах развития платформы.', points: ['Индексы вегетации и их динамика', 'История полей и сезонов', 'Отчёты'] },
    'p-industrial': { title: 'Industrial', text: 'Изменения вокруг промышленных и линейных объектов. В планах развития платформы.', points: ['Зоны вокруг объектов', 'Изменения и нарушенные земли', 'События и отчёты'] },
    'p-eco': { title: 'Eco', text: 'Лесной и земной покров, водоёмы и экологические изменения. В планах развития платформы.', points: ['Изменение лесного покрова', 'Земной покров по периодам', 'Визуальное сравнение снимков'] },
    decision: { title: 'Решения', text: 'Наблюдения и сведения о рисках — в единую картину для действий.', points: ['События и уведомления', 'Сведения об объектах', 'Картографические отчёты'] },
  };

  const infoModal = $('#infoModal'), demoModal = $('#demoModal');

  function showInfo(key) {
    const d = info[key];
    if (!d) return;
    $('#infoContent').innerHTML =
      (d.img ? `<img class="modal-img" src="${d.img}" alt="">` : '') +
      `<p class="label"><span class="rule"></span>AFFIRION</p><h2 id="infoTitle">${d.title}<i class="dot">.</i></h2><p>${d.text}</p>` +
      `<ul>${d.points.map(p => `<li>${p}</li>`).join('')}</ul>` +
      `<button type="button" class="btn btn-red" data-action="demo">Обсудить задачу <svg><use href="#i-arrow"/></svg></button>`;
    infoModal.showModal();
  }

  document.addEventListener('click', e => {
    const t = e.target.closest('[data-action],[data-info]');
    if (!t) return;
    if (t.dataset.info) return showInfo(t.dataset.info);
    if (t.dataset.action === 'close') return t.closest('dialog').close();
    if (t.dataset.action === 'demo') { infoModal.close(); demoModal.showModal(); }
  });
  [infoModal, demoModal].forEach(d => d.addEventListener('click', e => { if (e.target === d) d.close(); }));

  // Demo dashboard: sidebar is decorative, just move the highlight.
  $$('.dash-nav button').forEach(b => b.addEventListener('click', () => {
    $$('.dash-nav button').forEach(x => x.classList.toggle('active', x === b));
  }));

  // Before/after slider
  $$('.compare').forEach(c => $('input', c).addEventListener('input', e => c.style.setProperty('--pos', e.target.value + '%')));

  // Mobile menu
  const toggle = $('#menuToggle'), menu = $('#mobileNav');
  const setMenu = open => { menu.hidden = !open; toggle.setAttribute('aria-expanded', open); toggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню'); };
  toggle.addEventListener('click', () => setMenu(menu.hidden));
  menu.addEventListener('click', e => { if (e.target.closest('a,button')) setMenu(false); });

  $('#demoForm').addEventListener('submit', async e => {
    e.preventDefault();
    const v = new FormData(e.currentTarget);
    const text = `AFFIRION — запрос на демонстрацию\nИмя: ${v.get('name')}\nКонтакт: ${v.get('contact')}\nЗадача: ${v.get('message')}`;
    const out = $('#formStatus');
    try { await navigator.clipboard.writeText(text); out.textContent = 'Текст заявки скопирован в буфер обмена.'; }
    catch { out.textContent = 'Скопируйте текст вручную:\n' + text; }
  });

  // If three.js never loads (CDN blocked), show the static globe.
  setTimeout(() => { const g = $('#globe'); if (!g.classList.contains('ready')) g.classList.add('fallback'); document.documentElement.classList.remove('intro'); }, 6000);

  // Reveal on scroll; content stays visible without IntersectionObserver.
  if ('IntersectionObserver' in window) {
    const els = $$('.platform-copy, .panel, .dash-side, .cap, .ind, .outro-head, .outro-cta');
    els.forEach(el => el.classList.add('reveal'));
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      el.classList.add('in'); io.unobserve(el);
      $$('[data-count]', el).forEach(countUp);
      setTimeout(() => { el.style.transitionDelay = ''; }, 1400); // stagger only for the entrance, not for hover/tilt
    }), { rootMargin: '0px 0px -40px 0px' });
    els.forEach((el, i) => { el.style.transitionDelay = (i % 7) * 60 + 'ms'; io.observe(el); });
  }

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Number counters: 0 → value with ease-out, Russian decimal comma and true minus.
  function countUp(el) {
    if (reduce) return;
    const to = +el.dataset.count, dec = +(el.dataset.decimals || 0), suffix = el.dataset.suffix || '', start = performance.now();
    const fmt = v => (v < 0 ? '−' : '') + Math.abs(v).toFixed(dec).replace('.', ',') + suffix;
    (function step(now) {
      const p = Math.min((now - start) / 1600, 1);
      el.textContent = fmt(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    })(start);
  }

  // Sticky header once the hero is scrolled past; parallax for the outro horizon.
  const header = $('.header'), hero = $('.hero'), outro = $('.outro');
  let ticking = false;
  addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      header.classList.toggle('stuck', scrollY > hero.offsetHeight - 80);
      if (!reduce) {
        const r = outro.getBoundingClientRect();
        if (r.top < innerHeight && r.bottom > 0) outro.style.setProperty('--py', ((r.top - innerHeight) * -.12).toFixed(1) + 'px');
      }
      ticking = false;
    });
  }, { passive: true });

  if (reduce) return;

  // Cursor spotlight (CSS reads --mx/--my).
  $$('.panel, .cap').forEach(el => el.addEventListener('pointermove', e => {
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', e.clientX - r.left + 'px');
    el.style.setProperty('--my', e.clientY - r.top + 'px');
  }));

  // Subtle 3D tilt on industry cards (mouse only).
  $$('.ind').forEach(el => {
    el.addEventListener('pointermove', e => {
      if (e.pointerType !== 'mouse') return;
      const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      el.classList.add('tilting');
      el.style.setProperty('--ry', (x * 10).toFixed(2) + 'deg');
      el.style.setProperty('--rx', (y * -10).toFixed(2) + 'deg');
    });
    el.addEventListener('pointerleave', () => { el.classList.remove('tilting'); el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); });
  });

  // "Live" telemetry: coordinates drift a little, like a tracked satellite fix.
  const coords = $('#coords'), box = coords.parentElement;
  setInterval(() => {
    const lat = 55.7558 + (Math.random() - .5) * .004, lon = 37.6173 + (Math.random() - .5) * .004;
    coords.innerHTML = `${lat.toFixed(4)}° N<br>${lon.toFixed(4)}° E`;
    box.classList.add('tick'); setTimeout(() => box.classList.remove('tick'), 300);
  }, 1800);
})();
