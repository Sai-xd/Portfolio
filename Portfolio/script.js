// Portfolio Interactions for Gollapalli Jyothi Sai

(function () {
  const navToggle = document.getElementById('navToggle');
  const navList = document.getElementById('primaryNav');
  const yearEl = document.getElementById('year');

  // Footer year
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Mobile nav toggle
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const next = !(navToggle.getAttribute('aria-expanded') === 'true');
      navToggle.setAttribute('aria-expanded', String(next));
      navList.classList.toggle('is-open', next);
    });

    // Close nav on link click (mobile)
    navList.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navList.classList.remove('is-open');
      });
    });
  }

  // Smooth scroll active state
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const navLinks = Array.from(document.querySelectorAll('.nav__link'));

  const setActiveLink = () => {
    const fromTop = window.scrollY + 100;
    let currentId = sections[0] ? sections[0].id : '';
    for (const section of sections) {
      if (section.offsetTop <= fromTop) currentId = section.id;
    }
    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${currentId}`;
      link.classList.toggle('is-active', isActive);
    });
  };
  setActiveLink();
  window.addEventListener('scroll', setActiveLink, { passive: true });

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
  );
  revealEls.forEach((el) => io.observe(el));

  // Animate meters when visible
  const meters = Array.from(document.querySelectorAll('.meter'));
  const animateMeter = (meterEl) => {
    const bar = meterEl.querySelector('.meter__bar');
    const val = meterEl.querySelector('.meter__value');
    const target = Number(val?.dataset.target || '0');
    // Grow bar width
    if (bar) {
      requestAnimationFrame(() => {
        bar.style.width = bar.style.getPropertyValue('--target') || `${target}%`;
      });
    }
    // Count up percentage text
    let current = 0;
    const duration = 800;
    const start = performance.now();
    const step = (t) => {
      const progress = Math.min(1, (t - start) / duration);
      current = Math.floor(progress * target);
      if (val) val.textContent = `${current}%`;
      if (progress < 1) requestAnimationFrame(step);
      else if (val) val.textContent = `${target}%`;
    };
    requestAnimationFrame(step);
  };

  const ioMeters = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateMeter(entry.target);
          ioMeters.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -20% 0px', threshold: 0.2 }
  );
  meters.forEach((m) => ioMeters.observe(m));

  // Contact form -> mailto
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = /** @type {HTMLInputElement} */ (document.getElementById('name')).value.trim();
      const email = /** @type {HTMLInputElement} */ (document.getElementById('email')).value.trim();
      const message = /** @type {HTMLTextAreaElement} */ (document.getElementById('message')).value.trim();

      const subject = encodeURIComponent(`Portfolio contact from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      const mailto = `mailto:gollapallijyothisai2005@gmail.com?subject=${subject}&body=${body}`;
      window.location.href = mailto;
    });
  }
})();


