/* =========================================================
   Rotmain Asphalt GmbH & Co. KG — Demo Site Scripts
   Vanilla JS, no dependencies
   ========================================================= */

(function () {
  'use strict';

  /* --- Sticky header scroll class --- */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --- Mobile nav toggle --- */
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Navigation schließen' : 'Navigation öffnen');
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !siteNav.contains(e.target)) {
        siteNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        siteNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* --- Active nav link --- */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-list a').forEach((a) => {
    const href = a.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
    }
  });

  /* --- FAQ accordion --- */
  document.querySelectorAll('.faq-question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      // Close all others
      document.querySelectorAll('.faq-question').forEach((other) => {
        other.setAttribute('aria-expanded', 'false');
        const ans = other.nextElementSibling;
        if (ans) ans.style.maxHeight = '0';
      });
      // Toggle current
      if (!expanded) {
        btn.setAttribute('aria-expanded', 'true');
        const answer = btn.nextElementSibling;
        if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* --- Contact / Quick Inquiry Form --- */
  function setupForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Gather values
      const name = form.querySelector('[name="name"]')?.value.trim() || '';
      const company = form.querySelector('[name="company"]')?.value.trim() || '';
      const email = form.querySelector('[name="email"]')?.value.trim() || '';
      const phone = form.querySelector('[name="phone"]')?.value.trim() || '';
      const topic = form.querySelector('[name="topic"]')?.value || '';
      const message = form.querySelector('[name="message"]')?.value.trim() || '';

      // Demo: show success toast (no backend)
      showToast('Vielen Dank! Ihre Anfrage wurde übermittelt. Wir melden uns zeitnah.');
      form.reset();
    });
  }
  setupForm('quick-inquiry');
  setupForm('contact-form');

  /* --- Toast --- */
  function showToast(msg) {
    let toast = document.getElementById('site-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'site-toast';
      toast.className = 'toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      toast.innerHTML = `
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        <span></span>`;
      document.body.appendChild(toast);
    }
    toast.querySelector('span').textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 5000);
  }

  /* --- File upload demo area --- */
  document.querySelectorAll('.upload-area').forEach((area) => {
    const input = area.querySelector('input[type="file"]');
    area.addEventListener('click', () => input && input.click());
    area.addEventListener('dragover', (e) => {
      e.preventDefault();
      area.style.borderColor = 'var(--clr-accent)';
    });
    area.addEventListener('dragleave', () => {
      area.style.borderColor = '';
    });
    area.addEventListener('drop', (e) => {
      e.preventDefault();
      area.style.borderColor = '';
      const files = e.dataTransfer?.files;
      if (files && files.length > 0) {
        area.querySelector('p').textContent = `${files.length} Datei(en) ausgewählt: ${files[0].name}`;
      }
    });
    if (input) {
      input.addEventListener('change', () => {
        if (input.files.length > 0) {
          area.querySelector('p').textContent = `${input.files.length} Datei(en) ausgewählt: ${input.files[0].name}`;
        }
      });
    }
  });

  /* --- Smooth scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 68;
        const top = target.getBoundingClientRect().top + window.scrollY - offset - 12;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

})();
