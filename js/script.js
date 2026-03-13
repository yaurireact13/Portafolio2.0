/* ============================================================
   PORTFOLIO — script.js
   Funcionalidades:
   1. Navbar sticky + active link en scroll
   2. Menú hamburger (mobile)
   3. Typewriter animation
   4. Particle canvas (hero background)
   5. Scroll reveal (animaciones al entrar en viewport)
   6. Skill bars animadas al entrar en viewport
   7. Envío del formulario (demo)
   ============================================================ */

/* ── 1. NAVBAR ─────────────────────────────────────────────── */
const navbar    = document.getElementById('navbar');
const navLinks  = document.querySelectorAll('.nav-link');
const sections  = document.querySelectorAll('section[id]');

const themeToggle = document.getElementById('themeToggle');
const backToTop = document.querySelector('.back-to-top');

// Tema (dark/light) guardado en localStorage
const root = document.documentElement;
const savedTheme = localStorage.getItem('theme');
const defaultTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
const activeTheme = savedTheme || defaultTheme;

function applyTheme(theme) {
  root.dataset.theme = theme;
  if (theme === 'light') {
    themeToggle?.querySelector('i')?.classList.replace('fa-moon', 'fa-sun');
  } else {
    themeToggle?.querySelector('i')?.classList.replace('fa-sun', 'fa-moon');
  }
  localStorage.setItem('theme', theme);
}

applyTheme(activeTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const next = root.dataset.theme === 'light' ? 'dark' : 'light';
    applyTheme(next);
  });
}

window.addEventListener('scroll', () => {
  // Sticky sombra
  navbar.classList.toggle('scrolled', window.scrollY > 40);

  // Mostrar botón 'volver arriba'
  if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 450);

  // Active link según posición
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
});

/* ── 2. HAMBURGER ──────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Cerrar al hacer clic en un link
mobileMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

/* ── 3. TYPEWRITER ─────────────────────────────────────────── */
const typedTarget = document.getElementById('typedText');
const words = ['Web Developer', 'UI Designer', 'React Enthusiast', 'Problem Solver'];
let wordIdx = 0, charIdx = 0, isDeleting = false;

function type() {
  const word = words[wordIdx];

  if (isDeleting) {
    charIdx--;
    typedTarget.textContent = word.slice(0, charIdx);
  } else {
    charIdx++;
    typedTarget.textContent = word.slice(0, charIdx);
  }

  let delay = isDeleting ? 60 : 120;

  if (!isDeleting && charIdx === word.length) {
    // Pausa antes de borrar
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    wordIdx = (wordIdx + 1) % words.length;
    delay = 300;
  }

  setTimeout(type, delay);
}
type();

/* ── 4. PARTICLE CANVAS ────────────────────────────────────── */
(function initCanvas() {
  const canvas = document.getElementById('heroCanvas');
  const ctx    = canvas.getContext('2d');

  let W, H, particles = [];
  const COUNT  = 70;
  const RADIUS = 2;
  const MAX_DIST = 130;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Crear partículas
  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - .5) * .6,
      vy: (Math.random() - .5) * .6,
      r:  Math.random() * RADIUS + 1,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Actualizar y dibujar partículas
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      // Rebotar en bordes
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(249,115,22,0.55)';
      ctx.fill();
    });

    // Dibujar líneas de conexión
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MAX_DIST) {
          const alpha = 1 - dist / MAX_DIST;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(14,165,233,${alpha * 0.4})`; // celeste
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── 5. PARTICLES.JS ───────────────────────────────────────── */
particlesJS('particles-js', {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: '#f97316' },
    shape: { type: 'circle' },
    opacity: { value: 0.5, random: true },
    size: { value: 3, random: true },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#0ea5e9',
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 2,
      direction: 'none',
      random: true,
      straight: false,
      out_mode: 'out',
      bounce: false
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: { enable: true, mode: 'repulse' },
      onclick: { enable: true, mode: 'push' },
      resize: true
    },
    modes: {
      repulse: { distance: 100, duration: 0.4 },
      push: { particles_nb: 4 }
    }
  },
  retina_detect: true
});

/* ── 6. SCROLL REVEAL ──────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Delay escalonado para tarjetas siblings
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, parseInt(delay));
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

/* ── 6. SKILL BARS ─────────────────────────────────────────── */
const skillBars = document.querySelectorAll('.skill-bar');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar  = entry.target;
      const fill = bar.querySelector('.skill-fill');
      const pct  = bar.getAttribute('data-pct');
      // Pequeño delay para que la animación de reveal termine primero
      setTimeout(() => { fill.style.width = pct + '%'; }, 400);
      skillObserver.unobserve(bar);
    }
  });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

/* ── 7. STATS COUNTERS ─────────────────────────────────────── */
const statNumbers = document.querySelectorAll('.stat-number');

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.getAttribute('data-target'));
      animateCounter(entry.target, 0, target, 2000);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

function animateCounter(element, start, end, duration) {
  const startTime = performance.now();
  const animate = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const current = Math.floor(start + (end - start) * progress);
    element.textContent = current + (element.textContent.includes('+') ? '+' : '');
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };
  requestAnimationFrame(animate);
}

statNumbers.forEach(num => statObserver.observe(num));

/* ── 8. FORMULARIO DE CONTACTO ─────────────────────────────── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn  = contactForm.querySelector('button[type="submit"]');
    const span = btn.querySelector('span');
    const icon = btn.querySelector('i');

    // Estado de carga
    span.textContent = 'Sending…';
    icon.className   = 'fas fa-spinner fa-spin';
    btn.disabled     = true;

    // Simular envío (reemplazar con fetch real)
    setTimeout(() => {
      span.textContent  = 'Message Sent!';
      icon.className    = 'fas fa-check';
      btn.style.background = '#22c55e'; // verde

      contactForm.reset();

      // Resetear botón después de 3 s
      setTimeout(() => {
        span.textContent = 'Send Message';
        icon.className   = 'fas fa-paper-plane';
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    }, 1400);
  });
}

/* ── 9. SMOOTH SCROLL (fallback para navegadores sin CSS support) ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}