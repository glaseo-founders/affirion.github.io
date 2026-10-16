// Ambient motion: twinkling stars + rare shooting stars in the hero, slow dust drifting over the page.
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dpr = Math.min(devicePixelRatio || 1, 2);
  const rand = (a, b) => a + Math.random() * (b - a);

  const starsCv = document.getElementById('stars'), dustCv = document.getElementById('dust');
  const sc = starsCv.getContext('2d'), dc = dustCv.getContext('2d');
  let stars = [], dust = [], meteor = null, nextMeteor = performance.now() + rand(2500, 5000);
  let SW, SH, DW, DH, lastScroll = scrollY, scrollV = 0;

  function fit(cv, ctx, w, h) { cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
  function resize() {
    SW = starsCv.clientWidth; SH = starsCv.clientHeight; fit(starsCv, sc, SW, SH);
    DW = innerWidth; DH = innerHeight; fit(dustCv, dc, DW, DH);
    stars = Array.from({ length: Math.round(SW * SH / 4200) }, () => ({
      x: rand(0, SW), y: rand(0, SH), r: Math.random() < .08 ? rand(1, 1.6) : rand(.3, .9),
      a: rand(.25, .9), s: rand(.6, 2.2), p: rand(0, 7), warm: Math.random() < .15,
    }));
    dust = Array.from({ length: Math.round(DW * DH / 22000) }, () => ({
      x: rand(0, DW), y: rand(0, DH), r: rand(.5, 1.9), a: rand(.05, .28), vx: rand(-.06, .1), vy: rand(-.16, -.04), p: rand(0, 7), z: rand(.4, 1),
    }));
  }

  function drawStars(t) {
    sc.clearRect(0, 0, SW, SH);
    for (const s of stars) {
      sc.globalAlpha = s.a * (reduce ? 1 : .55 + .45 * Math.sin(t * .001 * s.s + s.p));
      sc.fillStyle = s.warm ? '#ffe2c4' : '#dfe8ff';
      sc.beginPath(); sc.arc(s.x, s.y, s.r, 0, 6.283); sc.fill();
    }
    if (reduce) return;
    if (!meteor && t > nextMeteor) {
      meteor = { x: rand(SW * .1, SW * .7), y: rand(0, SH * .3), vx: rand(5, 8), vy: rand(1.6, 3), life: 0 };
    }
    if (meteor) {
      const m = meteor, k = Math.sin(Math.min(m.life / 60, 1) * Math.PI);
      const g = sc.createLinearGradient(m.x, m.y, m.x - m.vx * 14, m.y - m.vy * 14);
      g.addColorStop(0, `rgba(255,255,255,${.85 * k})`); g.addColorStop(1, 'rgba(255,255,255,0)');
      sc.globalAlpha = 1; sc.strokeStyle = g; sc.lineWidth = 1.3;
      sc.beginPath(); sc.moveTo(m.x, m.y); sc.lineTo(m.x - m.vx * 14, m.y - m.vy * 14); sc.stroke();
      m.x += m.vx; m.y += m.vy; m.life++;
      if (m.life > 60) { meteor = null; nextMeteor = t + rand(5000, 11000); }
    }
  }

  function drawDust(t) {
    dc.clearRect(0, 0, DW, DH);
    scrollV += ((scrollY - lastScroll) - scrollV) * .1; lastScroll = scrollY;
    for (const d of dust) {
      d.x += d.vx + Math.sin(t * .0004 + d.p) * .08;
      d.y += d.vy - scrollV * .12 * d.z; // nearer motes react to scrolling more
      if (d.y < -5) d.y = DH + 5; else if (d.y > DH + 5) d.y = -5;
      if (d.x < -5) d.x = DW + 5; else if (d.x > DW + 5) d.x = -5;
      dc.globalAlpha = d.a * (.6 + .4 * Math.sin(t * .0015 + d.p));
      dc.fillStyle = '#f3e6d2';
      dc.beginPath(); dc.arc(d.x, d.y, d.r * d.z, 0, 6.283); dc.fill();
    }
  }

  let heroVisible = true;
  new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; }).observe(starsCv);
  addEventListener('resize', resize);
  resize();

  if (reduce) { drawStars(0); dustCv.remove(); return; }
  (function frame(t) {
    if (heroVisible) drawStars(t);
    drawDust(t);
    requestAnimationFrame(frame);
  })(performance.now());
})();
