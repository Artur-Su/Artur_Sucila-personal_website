/**
 * Artur Sucila — Mobile-First Interactive Systems Controller (ES Module)
 * - Controls WebGL 3D mode switcher & reactor core tap pulse
 * - Interactive Architecture Terminal inspector (4 live system blueprints)
 * - Native <dialog> Command Palette
 * - Mobile Thumb-Zone OS Dock active section sync
 * - Live Oslo, Norway telemetry clock & one-tap email copy
 */

const SYSTEM_BLUEPRINTS = {
  central: {
    cmd: '$ sysctl inspect central-intelligence --mode=mcp-bridge',
    items: [
      {
        title: 'Cognitive Architecture',
        desc: 'Canonical second-brain repository storing Artur identity profile, venture pricing rules, and operational SOPs.',
      },
      {
        title: 'MCP Agent Layer',
        desc: 'Model Context Protocol bridges connecting live business context directly to autonomous AI workflows.',
      },
      {
        title: 'Decision Engine',
        desc: 'Eliminates repetitive guesswork by grounding customer, technical, and strategic output in verified schemas.',
      },
      {
        title: 'Stack & Runtime',
        desc: 'Git-backed Markdown/JSON schemas · Automated GitHub Actions sync · Multi-agent routing.',
      },
    ],
  },
  nutravit: {
    cmd: '$ sysctl inspect nutravit.no --pipeline=ecommerce-ai',
    items: [
      {
        title: 'Storefront & Compliance',
        desc: 'Norwegian health supplement e-commerce built on WooCommerce with strict Mattilsynet regulatory compliance.',
      },
      {
        title: 'n8n Order & Fulfillment Automation',
        desc: 'Automated PostNord shipping label generation, tracking dispatch, and inventory synchronization.',
      },
      {
        title: 'AI Customer Support Pipeline',
        desc: 'Context-aware support workflows using structured communication logic deltas and responsive HTML templates.',
      },
      {
        title: 'Market & Status',
        desc: 'Production · Norway (nutravit.no) · Automated 24/7 order processing.',
      },
    ],
  },
  pcin: {
    cmd: '$ sysctl inspect pcin.no --module=custom-erp',
    items: [
      {
        title: 'Hardware Diagnostics & Repair',
        desc: 'Component-level hardware diagnostics, OS & driver optimization, and data recovery workflows.',
      },
      {
        title: 'Custom Dispatch & Operations ERP',
        desc: 'Relational ticket, procurement, and repair-dispatch architecture with automated customer status updates.',
      },
      {
        title: 'Commercial Model',
        desc: 'Predictable fixed-price tiers for standard diagnostics paired with hourly specialist IT consultancy.',
      },
      {
        title: 'Self-Hosted Infrastructure',
        desc: 'Ubuntu Server · Docker containers · Caddy reverse proxy with automated TLS.',
      },
    ],
  },
  vareautomater: {
    cmd: '$ sysctl inspect vareautomater.no --fleet=telemetry',
    items: [
      {
        title: 'Automated Retail Fleet',
        desc: 'Multi-location smart vending machine network operating across Norwegian route regions.',
      },
      {
        title: 'Cloud Fleet & Embedded Screen Platform',
        desc: 'Go cloud backend, React 19 management portal, and Android embedded vending screen interfaces.',
      },
      {
        title: 'Route & Maintenance Logistics',
        desc: 'Machine ID location tracking, preventative maintenance schedules, and telemetry-driven restocking.',
      },
      {
        title: 'On-Screen Merchandising',
        desc: 'High-conversion Norwegian product copy and nutrition summaries tailored for gym & venue screens.',
      },
    ],
  },
};

const initWebGLControls = () => {
  const modeBtns = document.querySelectorAll('[data-webgl-mode]');
  const reactorWrap = document.getElementById('reactor-core-trigger');

  modeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-webgl-mode');
      modeBtns.forEach((b) => b.classList.toggle('active', b === btn));
      if (typeof window.setWebGLMode === 'function') {
        window.setWebGLMode(mode);
      }
    });
  });

  if (reactorWrap) {
    reactorWrap.addEventListener('click', () => {
      const modes = ['mesh', 'vortex', 'matrix'];
      const activeBtn = document.querySelector('[data-webgl-mode].active');
      const current = activeBtn ? activeBtn.getAttribute('data-webgl-mode') : 'mesh';
      const next = modes[(modes.indexOf(current) + 1) % modes.length];
      const nextBtn = document.querySelector(`[data-webgl-mode="${next}"]`);
      if (nextBtn) nextBtn.click();
    });
  }
};

const initTerminalInspector = () => {
  const tabs = document.querySelectorAll('[data-blueprint]');
  const cmdEl = document.getElementById('term-cmd');
  const gridEl = document.getElementById('term-grid');
  if (!tabs.length || !cmdEl || !gridEl) return;

  const renderBlueprint = (key) => {
    const data = SYSTEM_BLUEPRINTS[key] || SYSTEM_BLUEPRINTS.central;
    cmdEl.textContent = data.cmd;
    gridEl.innerHTML = data.items
      .map(
        (item) => `
        <div class="term-kv">
          <strong>${item.title}</strong>
          <span>${item.desc}</span>
        </div>
      `
      )
      .join('');
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const key = tab.getAttribute('data-blueprint');
      tabs.forEach((t) => t.classList.toggle('active', t === tab));
      renderBlueprint(key);
    });
  });

  renderBlueprint('central');
};

const initNorwayClock = () => {
  const clockElements = document.querySelectorAll('[data-oslo-clock]');
  if (!clockElements.length) return;

  const update = () => {
    try {
      const timeStr = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Oslo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }).format(new Date());
      clockElements.forEach((el) => {
        el.textContent = `${timeStr} CET`;
      });
    } catch {
      clockElements.forEach((el) => {
        el.textContent = 'OSLO · CET';
      });
    }
  };

  update();
  setInterval(update, 1000);
};

const initCopyEmail = () => {
  document.querySelectorAll('[data-copy-email]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const email = btn.getAttribute('data-copy-email');
      if (!email) return;
      const original = btn.textContent;
      try {
        await navigator.clipboard.writeText(email);
        btn.textContent = 'Copied ✓';
      } catch {
        window.location.href = `mailto:${email}`;
      }
      setTimeout(() => {
        btn.textContent = original;
      }, 2000);
    });
  });
};

const initCommandDialog = () => {
  const dialog = document.getElementById('cmd-dialog');
  const openBtns = document.querySelectorAll('[data-open-cmd]');
  const input = document.getElementById('cmd-search');
  const items = document.querySelectorAll('[data-cmd-action]');
  if (!dialog) return;

  const openModal = () => {
    if (!dialog.open) {
      dialog.showModal();
      if (input) {
        input.value = '';
        items.forEach((el) => (el.style.display = 'flex'));
        setTimeout(() => input.focus(), 30);
      }
    }
  };

  openBtns.forEach((btn) => btn.addEventListener('click', openModal));

  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });

  if (input) {
    input.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      items.forEach((item) => {
        const match = (item.textContent || '').toLowerCase().includes(q);
        item.style.display = match ? 'flex' : 'none';
      });
    });
  }

  items.forEach((item) => {
    item.addEventListener('click', async () => {
      const href = item.getAttribute('data-href');
      const copy = item.getAttribute('data-copy');
      const mode = item.getAttribute('data-mode');
      const external = item.getAttribute('data-external') === 'true';

      dialog.close();

      if (mode && typeof window.setWebGLMode === 'function') {
        const modeBtn = document.querySelector(`[data-webgl-mode="${mode}"]`);
        if (modeBtn) modeBtn.click();
        return;
      }

      if (copy) {
        try {
          await navigator.clipboard.writeText(copy);
        } catch {
          window.location.href = `mailto:${copy}`;
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
      if (dialog.open) dialog.close();
      else openModal();
    }
  });
};

const initDockSpy = () => {
  const sections = document.querySelectorAll('main section[id]');
  const dockLinks = document.querySelectorAll('.mobile-os-dock a[href^="#"], .desktop-nav a[href^="#"]');
  if (!sections.length || !dockLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          dockLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-30% 0px -55% 0px' }
  );

  sections.forEach((s) => observer.observe(s));
};

document.addEventListener('DOMContentLoaded', () => {
  initWebGLControls();
  initTerminalInspector();
  initNorwayClock();
  initCopyEmail();
  initCommandDialog();
  initDockSpy();
});
