/* ============================================================================
   VOLLEYBALL MANAGEMENT SYSTEM — CORE STYLESHEET
   ============================================================================
   Design direction: a courtside scoreboard, not a generic SaaS dashboard.
   Palette pulls from indoor-court hardwood + line markings + the volleyball
   itself: deep court-navy, chalk white, and a hot volleyball-yellow accent
   used sparingly for the things that matter (live scores, primary actions).

   Typography: Barlow Condensed for numerals/headings (the tall, athletic
   look of a scoreboard/jersey number) paired with Inter for body text
   (neutral, highly legible for dense tabular data).
   ============================================================================ */

@import url("https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap");

:root {
  /* ---- Design tokens (light theme) ---- */
  --vms-court-navy: #0b2545;
  --vms-court-navy-light: #13315c;
  --vms-line-white: #f7f9fc;
  --vms-volley-yellow: #ffb627;
  --vms-volley-yellow-dark: #e69c0f;
  --vms-court-teal: #1b998b;
  --vms-danger: #e0554a;
  --vms-success: #2e9e5b;
  --vms-warning: #ffb627;

  --vms-bg: #eef1f6;
  --vms-surface: #ffffff;
  --vms-surface-alt: #f5f7fb;
  --vms-border: #e1e6ee;
  --vms-text: #1a2333;
  --vms-text-muted: #64708a;

  --vms-font-display: "Barlow Condensed", sans-serif;
  --vms-font-body: "Inter", sans-serif;

  --vms-radius: 0.65rem;
  --vms-radius-lg: 1rem;
  --vms-shadow: 0 2px 10px rgba(11, 37, 69, 0.06);
  --vms-shadow-lg: 0 12px 32px rgba(11, 37, 69, 0.12);

  --vms-sidebar-width: 264px;
  --vms-navbar-height: 72px;

  /* Map onto Bootstrap variables so Bootstrap components inherit the theme */
  --bs-primary: var(--vms-court-navy);
  --bs-primary-rgb: 11, 37, 69;
  --bs-body-font-family: var(--vms-font-body);
  --bs-body-bg: var(--vms-bg);
  --bs-body-color: var(--vms-text);
}

[data-bs-theme="dark"] {
  --vms-bg: #0c1424;
  --vms-surface: #131d31;
  --vms-surface-alt: #17223a;
  --vms-border: #263352;
  --vms-text: #eef1f6;
  --vms-text-muted: #97a3c2;
  --vms-shadow: 0 2px 10px rgba(0, 0, 0, 0.35);
  --vms-shadow-lg: 0 16px 40px rgba(0, 0, 0, 0.5);

  --bs-body-bg: var(--vms-bg);
  --bs-body-color: var(--vms-text);
}

* { box-sizing: border-box; }

body {
  font-family: var(--vms-font-body);
  background-color: var(--vms-bg);
  color: var(--vms-text);
  min-height: 100vh;
}

h1, h2, h3, h4, h5, h6, .display-font {
  font-family: var(--vms-font-display);
  font-weight: 700;
  letter-spacing: 0.01em;
}

a { text-decoration: none; }

/* ============================================================================
   APP SHELL LAYOUT
   ============================================================================ */

.app-shell {
  display: flex;
  min-height: 100vh;
}

.app-sidebar {
  width: var(--vms-sidebar-width);
  flex-shrink: 0;
  background: linear-gradient(180deg, var(--vms-court-navy) 0%, #081a33 100%);
  color: var(--vms-line-white);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  overflow-y: auto;
  z-index: 1040;
  transition: transform 0.25s ease;
  background-image:
    linear-gradient(180deg, var(--vms-court-navy) 0%, #081a33 100%),
    repeating-linear-gradient(135deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 14px);
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 1.4rem 1.5rem;
  font-family: var(--vms-font-display);
  font-size: 1.6rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  color: #fff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.sidebar-brand i { color: var(--vms-volley-yellow); font-size: 1.4rem; }

.sidebar-nav { padding: 0.75rem 0 2rem; }
.sidebar-section { margin-bottom: 0.5rem; }
.sidebar-section-title {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.09em;
  color: rgba(255, 255, 255, 0.4);
  padding: 0.9rem 1.5rem 0.35rem;
  margin: 0;
  font-weight: 600;
}

.sidebar-nav .nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 1.5rem;
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.92rem;
  font-weight: 500;
  border-left: 3px solid transparent;
  transition: background 0.15s ease, color 0.15s ease;
}
.sidebar-nav .nav-link i { font-size: 1.05rem; width: 1.3rem; text-align: center; }
.sidebar-nav .nav-link:hover:not(.disabled) {
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
}
.sidebar-nav .nav-link.active {
  background: rgba(255, 182, 39, 0.12);
  color: var(--vms-volley-yellow);
  border-left-color: var(--vms-volley-yellow);
  font-weight: 600;
}
.sidebar-nav .nav-link.disabled {
  color: rgba(255, 255, 255, 0.28);
  cursor: not-allowed;
}

.sidebar-backdrop {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1035;
}

.app-main {
  flex: 1;
  margin-left: var(--vms-sidebar-width);
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.app-navbar {
  height: var(--vms-navbar-height);
  background: var(--vms-surface);
  border-bottom: 1px solid var(--vms-border);
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0 1.5rem;
  position: sticky;
  top: 0;
  z-index: 1030;
}

.navbar-titles { flex: 1; min-width: 0; }
.navbar-page-title {
  font-size: 1.35rem;
  margin: 0;
  line-height: 1.1;
}
.breadcrumb { font-size: 0.78rem; }

.navbar-search {
  position: relative;
  width: 280px;
}
.navbar-search i {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--vms-text-muted);
}
.navbar-search input {
  padding-left: 2.2rem;
  background: var(--vms-surface-alt);
  border-color: var(--vms-border);
}

.navbar-actions { display: flex; align-items: center; gap: 0.5rem; }

.btn-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--vms-surface-alt);
  border: 1px solid var(--vms-border);
  color: var(--vms-text);
}
.btn-icon:hover { background: var(--vms-border); }

.notif-dot {
  position: absolute;
  top: 8px;
  right: 9px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--vms-danger);
  border: 2px solid var(--vms-surface);
}
.notif-dropdown { width: 300px; }

.user-menu-btn {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.35rem 0.6rem 0.35rem 0.35rem;
  border: 1px solid var(--vms-border);
  border-radius: 999px;
  background: var(--vms-surface-alt);
}
.avatar-circle {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--vms-court-navy);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.8rem;
  flex-shrink: 0;
}
.user-menu-name { font-size: 0.82rem; font-weight: 600; line-height: 1.2; }
.user-menu-role { font-size: 0.7rem; color: var(--vms-text-muted); line-height: 1.2; }

.app-content { padding: 1.5rem; flex: 1; }

.vms-loading-overlay {
  position: fixed;
  inset: 0;
  background: var(--vms-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}
.vms-loading-spinner { text-align: center; }

/* ============================================================================
   CARDS / STAT CARDS
   ============================================================================ */

.vms-card {
  background: var(--vms-surface);
  border: 1px solid var(--vms-border);
  border-radius: var(--vms-radius-lg);
  box-shadow: var(--vms-shadow);
}

.stat-card {
  background: var(--vms-surface);
  border: 1px solid var(--vms-border);
  border-radius: var(--vms-radius-lg);
  padding: 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: var(--vms-shadow);
  height: 100%;
}
.stat-card-icon {
  width: 52px;
  height: 52px;
  border-radius: var(--vms-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  flex-shrink: 0;
  color: #fff;
}
.stat-card-value {
  font-family: var(--vms-font-display);
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
}
.stat-card-label {
  font-size: 0.78rem;
  color: var(--vms-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-weight: 600;
}

.section-card {
  background: var(--vms-surface);
  border: 1px solid var(--vms-border);
  border-radius: var(--vms-radius-lg);
  box-shadow: var(--vms-shadow);
  padding: 1.25rem 1.5rem;
}
.section-card-title {
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Activity feed */
.activity-item {
  display: flex;
  gap: 0.75rem;
  padding: 0.65rem 0;
  border-bottom: 1px solid var(--vms-border);
}
.activity-item:last-child { border-bottom: none; }
.activity-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--vms-volley-yellow);
  margin-top: 0.4rem;
  flex-shrink: 0;
}

/* ============================================================================
   RESPONSIVE
   ============================================================================ */

@media (max-width: 991.98px) {
  .app-sidebar { transform: translateX(-100%); }
  .app-sidebar.show { transform: translateX(0); }
  .sidebar-backdrop.show { display: block; }
  .app-main { margin-left: 0; }
  .navbar-search { display: none !important; }
}

@media (max-width: 575.98px) {
  .app-content { padding: 1rem; }
  .navbar-page-title { font-size: 1.1rem; }
}
