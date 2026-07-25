/* ============================================================================
   AUTH PAGES (LOGIN / REGISTER)
   ============================================================================
   Split layout: a court-navy brand panel with the scoreboard motif on one
   side, a clean form on the other. Collapses to a single column on mobile.
   ============================================================================ */

.auth-shell {
  min-height: 100vh;
  display: flex;
}

.auth-brand-panel {
  flex: 1;
  background:
    radial-gradient(circle at 15% 15%, rgba(255, 182, 39, 0.18), transparent 40%),
    linear-gradient(160deg, var(--vms-court-navy) 0%, #081a33 100%);
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 3rem;
  position: relative;
  overflow: hidden;
}

.auth-brand-panel::before {
  /* faint court line motif */
  content: "";
  position: absolute;
  inset: 10%;
  border: 2px solid rgba(255, 255, 255, 0.06);
  border-radius: 50%;
}

.auth-brand-logo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--vms-font-display);
  font-size: 1.7rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  z-index: 1;
}
.auth-brand-logo i { color: var(--vms-volley-yellow); }

.auth-brand-copy { z-index: 1; max-width: 420px; }
.auth-brand-copy h2 {
  font-size: 2.4rem;
  line-height: 1.1;
  margin-bottom: 0.75rem;
}
.auth-brand-copy p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
}

.auth-brand-footer {
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.45);
  z-index: 1;
}

.auth-form-panel {
  flex: 1;
  max-width: 520px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: var(--vms-surface);
}

.auth-form-wrap { width: 100%; max-width: 380px; }
.auth-form-wrap h1 { font-size: 1.7rem; margin-bottom: 0.25rem; }
.auth-form-wrap .subtitle { color: var(--vms-text-muted); margin-bottom: 1.75rem; font-size: 0.92rem; }

.auth-form-wrap .form-label { font-weight: 600; font-size: 0.85rem; }
.auth-form-wrap .btn-primary {
  background: var(--vms-court-navy);
  border-color: var(--vms-court-navy);
  font-weight: 600;
  padding: 0.65rem;
}
.auth-form-wrap .btn-primary:hover { background: var(--vms-court-navy-light); }

.role-badge-note {
  background: var(--vms-surface-alt);
  border: 1px dashed var(--vms-border);
  border-radius: var(--vms-radius);
  padding: 0.7rem 0.9rem;
  font-size: 0.8rem;
  color: var(--vms-text-muted);
}

@media (max-width: 991.98px) {
  .auth-brand-panel { display: none; }
  .auth-form-panel { max-width: none; }
}
