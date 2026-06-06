/**
 * HENI & CHAIMA — Wedding Site Premium
 * JavaScript : animations, interactions, livre d'or
 */

(function () {
  'use strict';

  /* ============================================================
     CONFIGURATION
     ============================================================ */
  const WEDDING_DATE = new Date('2026-07-17T21:00:00');
  const GUESTBOOK_KEY = 'heni_chaima_guestbook';
  const PETAL_COUNT = 18;

  /* ============================================================
     DOM REFERENCES
     ============================================================ */
  const loader = document.getElementById('loader');
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const petalsContainer = document.getElementById('petals');
  const calendarGrid = document.getElementById('calendarGrid');
  const countdownEls = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
  };

  const guestbookForm = document.getElementById('guestbookForm');
  const guestbookMessages = document.getElementById('guestbookMessages');
  const musicToggle = document.getElementById('musicToggle');
  const bgMusic = document.getElementById('bgMusic');
  const backToTop = document.getElementById('backToTop');
  const cursor = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursor-dot');


  /* ============================================================
     LOADER
     ============================================================ */
  function initLoader() {
    document.body.classList.add('loading');

    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.remove('loading');
        triggerHeroReveal();
      }, 2200);
    });
  }

  function triggerHeroReveal() {
    document.querySelectorAll('#hero .reveal').forEach((el) => {
      el.classList.add('visible');
    });
  }

  /* ============================================================
     CURSEUR PERSONNALISÉ
     ============================================================ */
  function initCursor() {
    if (window.matchMedia('(max-width: 768px)').matches) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.12;
      cursorY += (mouseY - cursorY) * 0.12;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const hoverTargets = document.querySelectorAll('a, button, input, textarea');
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }

  /* ============================================================
     NAVIGATION
     ============================================================ */
  function initNavbar() {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
      backToTop.classList.toggle('visible', window.scrollY > 500);
    });

    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.classList.toggle('active', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ============================================================
     PÉTALES DE FLEURS
     ============================================================ */
  function createPetalSVG() {
    return `<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="10" cy="10" rx="6" ry="9" fill="rgba(212,188,138,0.5)" transform="rotate(15 10 10)"/>
      <ellipse cx="10" cy="10" rx="5" ry="8" fill="rgba(184,150,90,0.3)" transform="rotate(-20 10 10)"/>
    </svg>`;
  }

  function initPetals() {
    for (let i = 0; i < PETAL_COUNT; i++) {
      const petal = document.createElement('div');
      petal.className = 'petal';
      petal.innerHTML = createPetalSVG();

      const left = Math.random() * 100;
      const duration = 12 + Math.random() * 18;
      const delay = Math.random() * 15;
      const size = 8 + Math.random() * 10;

      petal.style.left = left + '%';
      petal.style.width = size + 'px';
      petal.style.height = size + 'px';
      petal.style.animationDuration = duration + 's';
      petal.style.animationDelay = delay + 's';

      petalsContainer.appendChild(petal);
    }
  }

  /* ============================================================
     CALENDRIER — JUILLET 2026
     ============================================================ */
  function initCalendar() {
    // Juillet 2026 : le 1er est un mercredi (index 2, L=0)
    const firstDayIndex = 2; // Mercredi
    const daysInMonth = 31;
    const highlightDay = 17;

    // Cases vides avant le 1er
    for (let i = 0; i < firstDayIndex; i++) {
      const empty = document.createElement('span');
      empty.className = 'calendar__day calendar__day--empty';
      calendarGrid.appendChild(empty);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const cell = document.createElement('span');
      cell.className = 'calendar__day';
      cell.textContent = day;

      if (day === highlightDay) {
        cell.classList.add('calendar__day--highlight');
      }

      calendarGrid.appendChild(cell);
    }
  }

  /* ============================================================
     COMPTE À REBOURS
     ============================================================ */
  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function updateCountdown() {
    const now = new Date();
    const diff = WEDDING_DATE - now;

    if (diff <= 0) {
      countdownEls.days.textContent = '00';
      countdownEls.hours.textContent = '00';
      countdownEls.minutes.textContent = '00';
      countdownEls.seconds.textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    countdownEls.days.textContent = pad(days);
    countdownEls.hours.textContent = pad(hours);
    countdownEls.minutes.textContent = pad(minutes);
    countdownEls.seconds.textContent = pad(seconds);
  }

  function initCountdown() {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  /* ============================================================
     INTERSECTION OBSERVER — Révélations au scroll
     ============================================================ */
  function initScrollReveal() {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.12,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal, .reveal-zoom, .reveal-fade').forEach((el) => {
      // Ne pas observer les éléments du hero (gérés par le loader)
      if (!el.closest('#hero')) {
        observer.observe(el);
      }
    });
  }

  /* ============================================================
     PARALLAX DOUX — Hero
     ============================================================ */
  function initParallax() {
    const hero = document.getElementById('hero');
    const heroContent = hero.querySelector('.hero__content');
    const heroFloral = hero.querySelector('.hero__floral');

    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.25}px)`;
        heroContent.style.opacity = 1 - scrolled / (window.innerHeight * 0.8);
        if (heroFloral) {
          heroFloral.style.transform = `translateY(${scrolled * 0.15}px)`;
        }
      }
    }, { passive: true });
  }

  /* ============================================================
     LIVRE D'OR — LocalStorage
     ============================================================ */
  function getGuestbookEntries() {
    try {
      return JSON.parse(localStorage.getItem(GUESTBOOK_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveGuestbookEntry(name, message) {
    const entries = getGuestbookEntries();
    entries.unshift({
      id: Date.now(),
      name: name.trim(),
      message: message.trim(),
      date: new Date().toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    });
    localStorage.setItem(GUESTBOOK_KEY, JSON.stringify(entries));
  }

  function renderGuestbook() {
    const entries = getGuestbookEntries();
    guestbookMessages.innerHTML = '';

    if (entries.length === 0) {
      guestbookMessages.innerHTML =
        '<p class="guestbook__empty">Soyez le premier à laisser un message...</p>';
      return;
    }

    entries.forEach((entry) => {
      const card = document.createElement('div');
      card.className = 'guestbook__card';
      card.innerHTML = `
        <p class="guestbook__card-name">${escapeHtml(entry.name)}</p>
        <p class="guestbook__card-message">« ${escapeHtml(entry.message)} »</p>
        <p class="guestbook__card-date">${escapeHtml(entry.date)}</p>
      `;
      guestbookMessages.appendChild(card);
    });
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function initGuestbook() {
    renderGuestbook();

    guestbookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('guestName').value;
      const message = document.getElementById('guestMessage').value;

      if (!name.trim() || !message.trim()) return;

      saveGuestbookEntry(name, message);
      guestbookForm.reset();
      renderGuestbook();

      // Scroll vers les nouveaux messages
      guestbookMessages.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  /* ============================================================
     MUSIQUE DE FOND
     ============================================================ */
  function initMusic() {
    musicToggle.addEventListener('click', () => {
      if (bgMusic.paused) {
        bgMusic.play().then(() => {
          musicToggle.classList.add('playing');
          musicToggle.setAttribute('aria-label', 'Couper la musique');
        }).catch(() => {
          // Lecture bloquée par le navigateur
        });
      } else {
        bgMusic.pause();
        musicToggle.classList.remove('playing');
        musicToggle.setAttribute('aria-label', 'Activer la musique');
      }
    });
  }

  /* ============================================================
     RETOUR EN HAUT
     ============================================================ */
  function initBackToTop() {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============================================================
     NAVIGATION FLUIDE — Offset pour navbar fixe
     ============================================================ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  /* ============================================================
     INITIALISATION
     ============================================================ */
  function init() {
    initLoader();
    initCursor();
    initNavbar();
    initPetals();
    initCalendar();
    initCountdown();
    initScrollReveal();
    initParallax();
    initGuestbook();
    initMusic();
    initBackToTop();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
