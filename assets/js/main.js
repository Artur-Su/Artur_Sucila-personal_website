/**
 * Artur Sucila — Personal Website Main Controller (ES Module)
 * Handles navigation scroll state, active section spy, spotlight cards,
 * command palette (⌘K / Ctrl+K), live Norway clock, and email copy feedback.
 */

const initHeaderScroll = () => {
  const header = document.getElementById('site-header');
  if (!header) return;

  const updateScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 24);
  };
  updateScroll();
  window.addEventListener('scroll', updateScroll, { passive: true });
};

const initMobileMenu = () => {
  const toggleBtn = document.getElementById('mobile-toggle');
  const drawer = document.getElementById('mobile-drawer');
  if (!toggleBtn || !drawer) return;

  const closeDrawer = () => {
    drawer.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
  };

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
  });

  drawer.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });
};

const initScrollReveal = () => {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
};

const initSectionSpy = () => {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-35% 0px -55% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
};

const initSpotlightCards = () => {
  const cards = document.querySelectorAll('.surface-card');
  cards.forEach((card) => {
    card.addEventListener(
      'mousemove',
      (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      },
      { passive: true }
    );
  });
};

const initNorwayClock = () => {
  const clockEl = document.getElementById('norway-time');
  if (!clockEl) return;

  const updateClock = () => {
    try {
      const formatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Oslo',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short',
      });
      clockEl.textContent = formatter.format(new Date());
    } catch {
      clockEl.textContent = 'CET / CEST';
    }
  };

  updateClock();
  setInterval(updateClock, 30000);
};

const initCopyEmail = () => {
  const copyBtns = document.querySelectorAll('[data-copy-email]');
  copyBtns.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const email = btn.getAttribute('data-copy-email');
      if (!email) return;
      const originalText = btn.textContent;
      try {
        await navigator.clipboard.writeText(email);
        btn.textContent = 'Copied ✓';
      } catch {
        window.location.href = `mailto:${email}`;
      }
      setTimeout(() => {
        btn.textContent = originalText;
      }, 2000);
    });
  });
};

const initCommandPalette = () => {
  const backdrop = document.getElementById('cmd-backdrop');
  const openBtn = document.getElementById('cmd-open');
  const input = document.getElementById('cmd-input');
  const items = document.querySelectorAll('.cmd-item');
  if (!backdrop || !input) return;

  const openPalette = () => {
    backdrop.classList.add('open');
    backdrop.setAttribute('aria-hidden', 'false');
    input.value = '';
    filterItems('');
    setTimeout(() => input.focus(), 40);
  };

  const closePalette = () => {
    backdrop.classList.remove('open');
    backdrop.setAttribute('aria-hidden', 'true');
  };

  const filterItems = (query) => {
    const q = query.trim().toLowerCase();
    items.forEach((item) => {
      const text = (item.textContent || '').toLowerCase();
      item.style.display = text.includes(q) ? 'flex' : 'none';
    });
  };

  if (openBtn) {
    openBtn.addEventListener('click', openPalette);
  }

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closePalette();
  });

  input.addEventListener('input', (e) => {
    filterItems(e.target.value);
  });

  items.forEach((item) => {
    item.addEventListener('click', async () => {
      const href = item.getAttribute('data-href');
      const copyEmail = item.getAttribute('data-cmd-copy');
      const external = item.getAttribute('data-external') === 'true';

      closePalette();

      if (copyEmail) {
        try {
          await navigator.clipboard.writeText(copyEmail);
        } catch {
          window.location.href = `mailto:${copyEmail}`;
        }
        return;
      }

      if (href) {
        if (external) {
          window.open(href, '_blank', 'noopener,noreferrer');
        } else {
          window.location.href = href;
        }
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (backdrop.classList.contains('open')) {
        closePalette();
      } else {
        openPalette();
      }
    } else if (e.key === 'Escape' && backdrop.classList.contains('open')) {
      closePalette();
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initScrollReveal();
  initSectionSpy();
  initSpotlightCards();
  initNorwayClock();
  initCopyEmail();
  initCommandPalette();
});
