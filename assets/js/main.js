/**
 * Artur Sucila — Mobile-First Interactive Systems Controller (ES Module)
 * - Interactive Architecture Terminal inspector (4 live system blueprints)
 * - Native <dialog> Command Palette (⌘K / Ctrl+K) with search & actions
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

const initTerminalInspector = () => {
  const tabs = document.querySelectorAll('[data-blueprint]');
  const cmdEl = document.getElementById('term-cmd');
  const outputEl = document.getElementById('term-output');
  if (!tabs.length || !cmdEl || !outputEl) return;

  const renderBlueprint = (key) => {
    const data = SYSTEM_BLUEPRINTS[key] || SYSTEM_BLUEPRINTS.central;
    cmdEl.textContent = data.cmd;
    outputEl.innerHTML = data.items
      .map(
        (item, idx) => `
        <div class="bp-item">
          <span class="bp-num">[0${idx + 1}]</span>
          <div class="bp-info">
            <h4 class="bp-title">${item.title}</h4>
            <p class="bp-desc">${item.desc}</p>
          </div>
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
  const copyBtn = document.getElementById('copy-email-btn');
  const copyStatus = document.getElementById('copy-status');

  const handleCopy = async (targetBtn, emailVal) => {
    const email = emailVal || 'artcila@gmail.com';
    try {
      await navigator.clipboard.writeText(email);
      if (copyStatus) copyStatus.textContent = 'Copied ✓';
      targetBtn.classList.add('copied');
    } catch {
      window.location.href = `mailto:${email}`;
    }
    setTimeout(() => {
      if (copyStatus) copyStatus.textContent = 'Copy';
      targetBtn.classList.remove('copied');
    }, 2000);
  };

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      handleCopy(copyBtn, copyBtn.getAttribute('data-copy-email'));
    });
  }

  document.querySelectorAll('[data-copy-email]').forEach((btn) => {
    if (btn !== copyBtn) {
      btn.addEventListener('click', () => {
        handleCopy(btn, btn.getAttribute('data-copy-email'));
      });
    }
  });
};

const initCommandDialog = () => {
  const dialog = document.getElementById('cmd-dialog');
  const openBtns = document.querySelectorAll('[data-open-cmd]');
  const input = document.getElementById('cmd-search');
  const closeBtns = document.querySelectorAll('[data-close-cmd]');
  if (!dialog) return;

  const items = dialog.querySelectorAll('.cmd-item');

  const openModal = () => {
    if (!dialog.open) {
      dialog.showModal();
      if (input) {
        input.value = '';
        items.forEach((el) => (el.style.display = 'flex'));
        setTimeout(() => input.focus(), 40);
      }
    }
  };

  openBtns.forEach((btn) => btn.addEventListener('click', openModal));
  closeBtns.forEach((btn) => btn.addEventListener('click', () => dialog.close()));

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
      const globePing = item.getAttribute('data-globe-ping');
      const external = item.getAttribute('data-external') === 'true';

      dialog.close();

      if (globePing === 'true' && typeof window.triggerGlobePing === 'function') {
        window.triggerGlobePing();
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
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
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
  initTerminalInspector();
  initNorwayClock();
  initCopyEmail();
  initCommandDialog();
  initDockSpy();
});
