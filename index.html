/**
 * ============================================================================
 * LOADING INDICATORS
 * ============================================================================
 * Small helpers for showing loading state: a full-page overlay spinner for
 * page/auth transitions, and a button-level spinner for form submissions.
 * ============================================================================
 */

const OVERLAY_ID = "vms-loading-overlay";

/** Show the full-page loading overlay. */
export function showPageLoader() {
  let overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.classList.remove("d-none");
    return;
  }
  overlay = document.createElement("div");
  overlay.id = OVERLAY_ID;
  overlay.className = "vms-loading-overlay";
  overlay.innerHTML = `
    <div class="vms-loading-spinner">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-2 mb-0 text-muted small">Loading...</p>
    </div>
  `;
  document.body.appendChild(overlay);
}

/** Hide the full-page loading overlay. */
export function hidePageLoader() {
  document.getElementById(OVERLAY_ID)?.classList.add("d-none");
}

/**
 * Put a button into a "loading" state: disables it, shows a spinner, and
 * remembers the original label so it can be restored.
 * @param {HTMLButtonElement} button
 * @param {string} [loadingText="Please wait..."]
 */
export function setButtonLoading(button, loadingText = "Please wait...") {
  if (!button) return;
  button.dataset.originalText = button.innerHTML;
  button.disabled = true;
  button.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>${loadingText}`;
}

/** Restore a button from its loading state. */
export function clearButtonLoading(button) {
  if (!button) return;
  button.disabled = false;
  if (button.dataset.originalText) {
    button.innerHTML = button.dataset.originalText;
    delete button.dataset.originalText;
  }
}
