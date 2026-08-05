/* ==========================================================================
   Sayan Ghosh — Pharmacovigilance Portfolio
   Vanilla JS: nav behaviour, scroll reveals, typing animation, back-to-top
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- Footer year ---------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- Sticky navbar background on scroll ---------------- */
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  const onScroll = () => {
    const scrolled = window.scrollY > 40;
    navbar.classList.toggle('scrolled', scrolled);
    backToTop.classList.toggle('visible', window.scrollY > 480);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------- Mobile nav toggle ---------------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close mobile menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------------- Back to top ---------------- */
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------------- Scroll reveal (IntersectionObserver) ---------------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach((el, i) => {
    // small stagger for elements that share a row/grid
    el.style.transitionDelay = `${Math.min(i % 4, 4) * 60}ms`;
    revealObserver.observe(el);
  });

  /* ---------------- Active nav link on scroll ---------------- */
  const sections = document.querySelectorAll('main section[id]');
  const navAnchors = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.4, rootMargin: '-80px 0px -50% 0px' });

  sections.forEach(sec => sectionObserver.observe(sec));

  /* ---------------- Typing animation in hero ---------------- */
  const typedEl = document.getElementById('typedTitle');
  const phrases = [
    'Aspiring Pharmacovigilance Associate',
    'ICSR Case Processing · MedDRA Coding',
    'Drug Safety & Clinical Research'
  ];

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (typedEl) {
    if (prefersReducedMotion) {
      typedEl.textContent = phrases[0];
    } else {
      let phraseIndex = 0;
      let charIndex = 0;
      let deleting = false;

      const type = () => {
        const current = phrases[phraseIndex];

        if (!deleting) {
          charIndex++;
          typedEl.textContent = current.slice(0, charIndex);
          if (charIndex === current.length) {
            deleting = true;
            setTimeout(type, 1800); // pause at full phrase
            return;
          }
        } else {
          charIndex--;
          typedEl.textContent = current.slice(0, charIndex);
          if (charIndex === 0) {
            deleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
          }
        }

        const speed = deleting ? 35 : 55;
        setTimeout(type, speed);
      };

      type();
    }
  }

  /* ---------------- LinkedIn placeholder guard ----------------
     Resume text only said "LinkedIn" with no URL attached.
     Update these two hrefs with the real profile link before publishing. */
  const linkedinTargets = [
    document.getElementById('linkedinLink'),
    document.getElementById('linkedinLinkFooter'),
    document.getElementById('linkedinLinkHero')
  ];
  const LINKEDIN_URL = 'https://www.linkedin.com/in/sayan-ghosh-59ab76276'; // real profile URL

  linkedinTargets.forEach(el => {
    if (!el) return;
    if (LINKEDIN_URL) {
      el.setAttribute('href', LINKEDIN_URL);
    } else {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        console.info('Add your LinkedIn profile URL in script.js (LINKEDIN_URL) to activate this link.');
      });
    }
  });

});
