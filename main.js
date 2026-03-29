/* ═══════════════════════════════════════════════════
   JEPHTHAH COMPREHENSIVE SECONDARY SCHOOL
   main.js — Application Logic
   ═══════════════════════════════════════════════════ */

'use strict';

// ── PAGE NAVIGATION (SPA) ───────────────────────────
const PAGES = ['home', 'about', 'academics', 'admissions', 'contact'];

function navigate(pageId) {
  const homeEl = document.getElementById('home');
  const heroBanner = document.getElementById('home-hero');

  PAGES.forEach(id => {
    if (id === 'home') {
      const show = pageId === 'home';
      if (homeEl) homeEl.style.display = show ? '' : 'none';
      if (heroBanner) heroBanner.style.display = show ? '' : 'none';
    } else {
      const el = document.getElementById(id);
      if (!el) return;
      if (id === pageId) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    }
  });

  // Update active nav link
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    const pg = a.getAttribute('data-page');
    if (pg) a.classList.toggle('active', pg === pageId);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialise on load
navigate('home');

// ── NAV SCROLL EFFECT ───────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── MOBILE NAV ──────────────────────────────────────
function toggleMobileNav() {
  const mobileNav = document.getElementById('mobileNav');
  if (!mobileNav) return;
  mobileNav.classList.toggle('open');

  // Animate hamburger bars
  const btn = document.querySelector('.nav-hamburger');
  if (btn) btn.classList.toggle('open');
}

// ── MODAL ───────────────────────────────────────────
const modalEl = document.getElementById('applyModal');

function openModal() {
  if (!modalEl) return;
  modalEl.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => modalEl.classList.add('visible'));
  });
}

function closeModal() {
  if (!modalEl) return;
  modalEl.classList.remove('visible');
  document.body.style.overflow = '';
  setTimeout(() => { modalEl.style.display = 'none'; }, 350);
}

if (modalEl) {
  modalEl.addEventListener('click', e => { if (e.target === modalEl) closeModal(); });
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ── SCROLL REVEAL ───────────────────────────────────
function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('visible'));
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const siblings = entry.target.closest('.results-grid, .pillars, .stats-band-grid, .testimonials-grid, .acad-grid, .staff-grid, .pillars-page');
        let delay = 0;
        if (siblings) {
          const children = Array.from(siblings.children);
          const idx = children.indexOf(entry.target);
          delay = idx * 80;
        }
        setTimeout(() => entry.target.classList.add('visible'), delay);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => obs.observe(el));
}

// ── CONTACT FORM ────────────────────────────────────
function handleContact(e) {
  e.preventDefault();
  const btn = e.target.querySelector('[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = 'Sending…';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = '✓ Message Sent!';
    btn.style.background = '#10B981';
    e.target.reset();
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.disabled = false;
    }, 3500);
  }, 1200);
}

// ── APPLICATION FORM ────────────────────────────────
function handleApply(e) {
  e.preventDefault();
  const btn = e.target.querySelector('[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = 'Submitting…';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = '✓ Application Received!';
    btn.style.background = '#10B981';
    e.target.reset();
    setTimeout(() => {
      closeModal();
      btn.textContent = originalText;
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  }, 1400);
}

// ── COUNTER ANIMATION ───────────────────────────────
function animateCounter(el, target, suffix = '', duration = 1800) {
  const start = performance.now();
  const isDecimal = target % 1 !== 0;

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = eased * target;
    el.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target + suffix;
  }

  requestAnimationFrame(update);
}

function initCounters() {
  const statEls = document.querySelectorAll('[data-count]');
  if (!('IntersectionObserver' in window)) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const raw = el.getAttribute('data-count');
        const suffix = el.getAttribute('data-suffix') || '';
        const target = parseFloat(raw);
        animateCounter(el, target, suffix);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statEls.forEach(el => obs.observe(el));
}

// ── HERO VIDEO — AUTOPLAY + PLAY/PAUSE TOGGLE ───────
function initHeroVideo() {
  const video = document.getElementById('heroVideo');
  const btn   = document.getElementById('videoPlayBtn');
  if (!video) return;

  // Ensure autoplay settings
  video.muted      = true;
  video.playsInline = true;
  video.loop       = true;

  // SVG icons for play / pause states
  const playSVG  = `<svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M8 5v14l11-7z"/></svg>`;
  const pauseSVG = `<svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;

  function syncBtn() {
    if (!btn) return;
    if (video.paused) {
      btn.innerHTML = playSVG;
      btn.classList.remove('playing');
    } else {
      btn.innerHTML = pauseSVG;
      btn.classList.add('playing');
    }
  }

  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise
      .then(() => syncBtn())
      .catch(() => {
        // Autoplay blocked — show play button in paused state
        syncBtn();
      });
  }

  video.addEventListener('play',  syncBtn);
  video.addEventListener('pause', syncBtn);
}

// Exposed globally so the inline onclick in HTML can call it
function toggleHeroVideo() {
  const video = document.getElementById('heroVideo');
  if (!video) return;
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// ── HERO ENTRANCE ANIMATION ─────────────────────────
function initHeroEntrance() {
  const heroLeft  = document.querySelector('.hero-left');
  const heroRight = document.querySelector('.hero-right');
  const heroBadge = document.querySelector('.hero-acsi-badge');
  const heroChip  = document.querySelector('.hero-award-chip');

  if (heroLeft) {
    heroLeft.style.opacity  = '0';
    heroLeft.style.transform = 'translateY(24px)';
    setTimeout(() => {
      heroLeft.style.transition = 'opacity .7s ease, transform .7s ease';
      heroLeft.style.opacity    = '1';
      heroLeft.style.transform  = 'translateY(0)';
    }, 80);
  }

  if (heroRight) {
    heroRight.style.opacity  = '0';
    heroRight.style.transform = 'translateY(24px)';
    setTimeout(() => {
      heroRight.style.transition = 'opacity .7s ease, transform .7s ease';
      heroRight.style.opacity    = '1';
      heroRight.style.transform  = 'translateY(0)';
    }, 220);
  }
}

// ── INIT ────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initCounters();
  initHeroVideo();
  initHeroEntrance();
});