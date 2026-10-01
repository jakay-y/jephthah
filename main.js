/* ═══════════════════════════════════════════════════
   NAEBI DYNAMIC CONCEPTS LTD — main.js
   Loader, header, drawer, reveals, counters, FAQ,
   newsletter and office clocks. See DESIGN.md.
   ═══════════════════════════════════════════════════ */

'use strict';

const root = document.documentElement;
root.classList.add('js');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── LOADER (Brief 01) ───────────────────────────────
// Progress follows real asset loading, capped at 2.5s, skipped on repeat visits.
(function loader() {
  const el = document.getElementById('loader');
  if (!el) return;
  const bar = el.querySelector('.loader-line span');
  let seen = false;
  try { seen = sessionStorage.getItem('naebi-loaded') === '1'; } catch (e) { /* storage blocked */ }

  const finish = () => {
    if (el.classList.contains('is-done')) return;
    try { sessionStorage.setItem('naebi-loaded', '1'); } catch (e) { /* ignore */ }
    el.classList.add('is-done');
    root.classList.add('is-ready');
    setTimeout(() => el.classList.add('is-gone'), reduceMotion ? 150 : 450);
  };

  if (seen || reduceMotion) {
    el.classList.add('is-done', 'is-gone');
    root.classList.add('is-ready');
    return;
  }

  const tasks = [
    document.fonts ? document.fonts.ready : Promise.resolve(),
    new Promise(res => (document.readyState === 'complete' ? res() : window.addEventListener('load', res, { once: true }))),
  ];
  let done = 0;
  const minTime = new Promise(res => setTimeout(res, 1200));
  tasks.forEach(p => p.then(() => {
    done += 1;
    bar.style.setProperty('--p', done / tasks.length);
  }));
  Promise.all([...tasks, minTime]).then(finish);
  setTimeout(finish, 2500);
})();

// ── HEADER (Brief 02) ───────────────────────────────
const header = document.getElementById('siteHeader');
const onScroll = () => header.classList.toggle('is-solid', window.scrollY > 80);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Highlight the nav link for the section in view
const navLinks = [...document.querySelectorAll('.main-nav a')];
const navTargets = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
if ('IntersectionObserver' in window) {
  const navObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      navLinks.forEach(a => a.setAttribute('aria-current', String(a.getAttribute('href') === '#' + e.target.id)));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  navTargets.forEach(t => navObs.observe(t));
}

// ── MOBILE DRAWER ───────────────────────────────────
(function drawer() {
  const toggle = document.getElementById('menuToggle');
  const panel = document.getElementById('drawer');
  const close = document.getElementById('drawerClose');
  if (!toggle || !panel) return;

  const open = () => {
    panel.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    close.focus();
  };
  const shut = (returnFocus = true) => {
    panel.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (returnFocus) toggle.focus();
  };

  toggle.addEventListener('click', open);
  close.addEventListener('click', () => shut());
  panel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => shut(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) shut(); });
  window.matchMedia('(min-width: 961px)').addEventListener('change', e => { if (e.matches && !panel.hidden) shut(false); });
})();

// ── REVEALS (fade+rise for text, fade+scale for media) ──
(function reveals() {
  const items = document.querySelectorAll('.reveal, .reveal-media');
  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-in'));
    return;
  }
  // Stagger siblings that share a parent
  const groups = new Map();
  items.forEach(el => {
    const g = groups.get(el.parentElement) || [];
    g.push(el);
    groups.set(el.parentElement, g);
  });
  groups.forEach(list => list.forEach((el, i) => el.style.setProperty('--d', `${Math.min(i, 5) * 80}ms`)));

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      obs.unobserve(e.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
  items.forEach(el => obs.observe(el));
})();

// ── STAT COUNTERS (Brief 07) ────────────────────────
// Each tile counts once, when half of it is in view.
(function counters() {
  const stats = document.querySelectorAll('.stat');
  const ease = t => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)); // ease-out-expo

  const run = stat => {
    const num = stat.querySelector('.stat-num');
    const target = Number(num.dataset.target) || 0;
    const suffix = num.dataset.suffix || '';
    const ring = stat.querySelector('.ring-fill');
    if (ring) {
      const c = 2 * Math.PI * 54;
      ring.style.strokeDashoffset = String(c * (1 - Number(ring.dataset.ring) / 100));
    }
    if (reduceMotion) { num.textContent = target.toLocaleString() + suffix; return; }
    const start = performance.now();
    const dur = 1400;
    const tick = now => {
      const t = Math.min((now - start) / dur, 1);
      num.textContent = Math.round(target * ease(t)).toLocaleString() + suffix;
      if (t < 1) requestAnimationFrame(tick);
    };
    num.textContent = '0' + suffix;
    requestAnimationFrame(tick);
  };

  if (!('IntersectionObserver' in window)) { stats.forEach(run); return; }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting || e.target.dataset.fired) return;
      e.target.dataset.fired = '1';
      run(e.target);
      obs.unobserve(e.target);
    });
  }, { threshold: 0.5 });
  stats.forEach(s => obs.observe(s));
})();

// ── PARALLAX (Operations photo, desktop only) ───────
(function parallax() {
  const el = document.querySelector('[data-parallax]');
  if (!el || reduceMotion) return;
  const mq = window.matchMedia('(min-width: 961px)');
  let ticking = false;
  const update = () => {
    ticking = false;
    if (!mq.matches) { el.style.transform = ''; return; }
    const r = el.parentElement.getBoundingClientRect();
    const progress = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
    el.style.transform = `translateY(${(progress * 8).toFixed(2)}%)`;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  mq.addEventListener('change', update);
  update();
})();

// ── FAQ ACCORDION (Brief 09) ────────────────────────
// Only one answer open at a time.
(function accordion() {
  const buttons = document.querySelectorAll('.acc-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const willOpen = btn.getAttribute('aria-expanded') !== 'true';
      buttons.forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        b.closest('.acc-item').classList.remove('is-open');
      });
      if (willOpen) {
        btn.setAttribute('aria-expanded', 'true');
        btn.closest('.acc-item').classList.add('is-open');
      }
    });
  });
})();

// ── NEWSLETTER (Brief 10) ───────────────────────────
// Front-end validation only. Connect the form to a mailing service before launch.
(function newsletter() {
  const form = document.getElementById('nlForm');
  if (!form) return;
  const input = form.querySelector('input');
  const error = document.getElementById('nlError');
  const button = form.querySelector('button');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
    input.setAttribute('aria-invalid', String(!valid));
    error.hidden = valid;
    if (!valid) { input.focus(); return; }
    form.classList.add('is-success');
    button.textContent = 'Subscribed';
    button.disabled = true;
    input.disabled = true;
  });
  input.addEventListener('input', () => {
    if (input.getAttribute('aria-invalid') === 'true') {
      input.setAttribute('aria-invalid', 'false');
      error.hidden = true;
    }
  });
})();

// ── FOOTER: office local time + year (Brief 11) ─────
(function clocks() {
  const els = document.querySelectorAll('.local-time');
  const render = () => els.forEach(el => {
    try {
      const t = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: el.dataset.tz }).format(new Date());
      el.textContent = `Local time ${t} WAT`;
    } catch (e) { el.textContent = ''; }
  });
  render();
  setInterval(render, 30000);
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();

// Mobile footer: collapse columns into an accordion
(function footerAccordion() {
  const cols = document.querySelectorAll('.footer-col');
  const mq = window.matchMedia('(max-width: 640px)');
  const sync = () => cols.forEach(c => { c.open = !mq.matches; });
  sync();
  mq.addEventListener('change', sync);
  // Desktop: keep columns open (summary is a heading, not a toggle)
  cols.forEach(c => c.querySelector('summary').addEventListener('click', e => { if (!mq.matches) e.preventDefault(); }));
})();
