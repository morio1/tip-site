// app.js — modal + nav behavior, plus API-driven content.
// If /api is unreachable (e.g. the file opened directly, no server running),
// every render function fails silently and the static HTML already in the
// page — the same exact content — is left in place. Nothing breaks either way.

const API = '/api';
let currentModalMode = 'join';

// ============================================================
// Modal
// ============================================================

const MODAL_CONTENT = {
  sponsor: {
    title: "Sponsor a Project",
    desc: "Support a specific TIP project with funding. We'll send you a tailored impact proposal within 72 hours.",
  },
  invite: {
    title: "Invite TIP to Your Project",
    desc: "Have a project that needs community youth muscle? Invite TIP to collaborate.",
  },
  join: {
    title: "Join The Incubator Platform",
    desc: "Become an Ordinary Member of TIP and help drive change in Langata Sub-County.",
  },
  partner: {
    title: "Become a Partner Organisation",
    desc: "Establish a formal partnership MOU with TIP for co-designed community programs.",
  },
};

function openModal(mode) {
  currentModalMode = MODAL_CONTENT[mode] ? mode : 'join';
  const data = MODAL_CONTENT[currentModalMode];
  const titleEl = document.getElementById("modal-title");
  const descEl = document.getElementById("modal-desc");
  if (titleEl) titleEl.textContent = data.title;
  if (descEl) descEl.textContent = data.desc;
  const overlay = document.getElementById("modal-overlay");
  if (overlay) overlay.classList.add("open");
}

function closeModal() {
  document.getElementById("modal-overlay")?.classList.remove("open");
}

document.addEventListener("click", (e) => {
  const trigger = e.target.closest("[data-modal]");
  if (trigger) {
    e.preventDefault();
    openModal(trigger.getAttribute("data-modal"));
    return;
  }
  const scrollTrigger = e.target.closest("[data-scroll]");
  if (scrollTrigger) {
    e.preventDefault();
    const id = scrollTrigger.getAttribute("data-scroll");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }
});

document.getElementById("modal-close")?.addEventListener("click", closeModal);
document.getElementById("modal-overlay")?.addEventListener("click", (e) => {
  if (e.target.id === "modal-overlay") closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

document.getElementById("modal-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const payload = {
    mode: currentModalMode,
    full_name: form.full_name?.value?.trim(),
    email: form.email?.value?.trim(),
    organisation: form.organisation?.value?.trim() || null,
    message: form.message?.value?.trim() || null,
  };
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalLabel = submitBtn ? submitBtn.textContent : null;
  try {
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }
    const res = await fetch(API + '/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Submission failed');
    form.reset();
    if (submitBtn) submitBtn.textContent = 'Sent — thank you!';
    setTimeout(closeModal, 900);
  } catch (err) {
    // API not available (e.g. static-only hosting) — don't block the user.
    console.warn('Lead submission failed, closing anyway:', err);
    form.reset();
    closeModal();
  } finally {
    if (submitBtn) setTimeout(() => { submitBtn.disabled = false; submitBtn.textContent = originalLabel; }, 1200);
  }
});

// ============================================================
// Constitution — articles accordion
// ============================================================

document.addEventListener('click', (e) => {
  const head = e.target.closest('.article-head');
  if (head) head.closest('.article-row')?.classList.toggle('open');
});

// ============================================================
// Dynamic content — fetched from the CRUD API, replaces static markup
// ============================================================

const STATUS_TAG_CLASS = {
  'Active': 'tag-forest-light',
  'Fundraising': 'tag-ochre',
  'Seeking Partners': 'tag-mist',
};

function esc(str) {
  return String(str ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

async function fetchJSON(path) {
  const res = await fetch(API + path);
  if (!res.ok) throw new Error('Failed to fetch ' + path);
  return res.json();
}

async function renderProjects() {
  const el = document.getElementById('projects-grid');
  if (!el) return;
  const projects = await fetchJSON('/projects');
  if (!projects.length) return; // keep static fallback if DB is empty
  el.innerHTML = projects.map((p) => `
    <article class="project-card">
      <div class="project-photo"><img src="${esc(p.image_url)}" alt="${esc(p.image_alt)}"></div>
      <div class="project-content">
        <div class="project-tags-row">
          <span class="tag tag-ochre">${esc(p.tag)}</span>
          <span class="tag ${STATUS_TAG_CLASS[p.status] || 'tag-mist'}">${esc(p.status)}</span>
        </div>
        <h3 class="project-title">${esc(p.title)}</h3>
        <p class="project-desc">${esc(p.description)}</p>
        <div class="project-meta-row">
          <div>
            <p class="project-goal">Goal: KES ${Number(p.goal_kes).toLocaleString()}</p>
            <div class="progress-track"><div class="progress-fill" style="width:${p.raised_pct}%"></div></div>
            <p class="project-pct">${p.raised_pct}% funded</p>
          </div>
          <button class="btn-fund" data-modal="sponsor">Fund This</button>
        </div>
      </div>
    </article>
  `).join('');
}

async function renderPartners() {
  const el = document.getElementById('partners-tiles');
  if (!el) return;
  const partners = await fetchJSON('/partners');
  if (!partners.length) return;
  el.innerHTML = partners.map((p, i) => {
    const rem = partners.length % 3 === 0 ? 3 : partners.length % 3;
    const rightBorder = (i + 1) % 3 !== 0 ? 'border-right:1px solid var(--color-rule);' : '';
    const bottomBorder = i < partners.length - rem ? 'border-bottom:1px solid var(--color-rule);' : '';
    return `
      <div class="partner-tile" style="${rightBorder}${bottomBorder}">
        <p class="partner-type">${esc(p.type)}</p><p class="partner-name">${esc(p.name)}</p>
      </div>`;
  }).join('');
}

async function renderGallery() {
  const el = document.getElementById('gallery-grid');
  if (!el) return;
  const images = await fetchJSON('/gallery');
  if (!images.length) return;
  el.innerHTML = images.map((g) => `
    <div class="gallery-cell${g.is_tall ? ' tall' : ''}"><img src="${esc(g.image_url)}" alt="${esc(g.image_alt)}"></div>
  `).join('');
}

async function renderTiers() {
  const el = document.getElementById('tiers');
  if (!el) return;
  const tiers = await fetchJSON('/membership-tiers');
  if (!tiers.length) return;
  el.innerHTML = tiers.map((t, i) => `
    <div class="tier${t.highlight ? ' highlight' : ''}">
      <div class="tier-body">
        <p class="tier-period">${String(i + 1).padStart(2, '0')} — ${esc(t.period)}</p>
        <h3 class="tier-name">${esc(t.tier)}</h3>
        <p class="tier-fee">${esc(t.fee)}</p>
        <ul class="tier-perks">${t.perks.map((perk) => `<li>${esc(perk)}</li>`).join('')}</ul>
      </div>
      <button class="btn-tier ${t.highlight ? 'ochre' : 'forest'}" data-modal="${esc(t.modal_mode)}">${esc(t.cta)}</button>
    </div>
  `).join('');
}

async function renderStats() {
  const heroEl = document.getElementById('hero-stats');
  if (!heroEl && !document.getElementById('impact-stats')) return;
  const all = await fetchJSON('/stats');
  const impactEl = document.getElementById('impact-stats');
  const heroStats = all.filter((s) => s.scope === 'hero');
  const impactStats = all.filter((s) => s.scope === 'impact');

  if (heroEl && heroStats.length) {
    heroEl.innerHTML = heroStats.map((s) => `
      <div><p class="hero-stat-num">${esc(s.value)}</p><p class="hero-stat-label">${esc(s.label)}</p></div>
    `).join('');
  }
  if (impactEl && impactStats.length) {
    impactEl.innerHTML = impactStats.map((s) => `
      <div class="impact-stat"><p class="impact-stat-value">${esc(s.value)}</p><p class="impact-stat-label">${esc(s.label)}</p></div>
    `).join('');
  }
}

// Kick off all dynamic renders — each is independent and fails silently.
[renderProjects, renderPartners, renderGallery, renderTiers, renderStats].forEach((fn) => {
  fn().catch((err) => console.warn(err.message));
});
