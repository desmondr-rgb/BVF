/**
 * ============================================================================
 * NOTIFICATIONS (TOASTS)
 * ============================================================================
 * Lightweight wrapper around Bootstrap 5 toasts for showing success, error,
 * warning and info messages. A single toast container is created and
 * reused for the lifetime of the page.
 * ============================================================================
 */

const CONTAINER_ID = "vms-toast-container";
const ICONS = {
  success: "bi-check-circle-fill",
  error: "bi-x-circle-fill",
  warning: "bi-exclamation-triangle-fill",
  info: "bi-info-circle-fill",
};
const BG_CLASSES = {
  success: "text-bg-success",
  error: "text-bg-danger",
  warning: "text-bg-warning",
  info: "text-bg-primary",
};

function getOrCreateContainer() {
  let container = document.getElementById(CONTAINER_ID);
  if (!container) {
    container = document.createElement("div");
    container.id = CONTAINER_ID;
    container.className = "toast-container position-fixed top-0 end-0 p-3";
    container.style.zIndex = "1090";
    document.body.appendChild(container);
  }
  return container;
}

/**
 * Show a toast notification.
 * @param {string} message
 * @param {"success"|"error"|"warning"|"info"} [type="info"]
 * @param {number} [delay=4000] - ms before auto-hide
 */
export function showToast(message, type = "info", delay = 4000) {
  const container = getOrCreateContainer();

  const toastEl = document.createElement("div");
  toastEl.className = `toast align-items-center ${BG_CLASSES[type]} border-0`;
  toastEl.setAttribute("role", "alert");
  toastEl.setAttribute("aria-live", "assertive");
  toastEl.setAttribute("aria-atomic", "true");
  toastEl.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        <i class="bi ${ICONS[type]} me-2"></i>${escapeHtml(message)}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  `;
  container.appendChild(toastEl);

  // Bootstrap's Toast component is loaded globally via the Bootstrap bundle script tag.
  const toast = new bootstrap.Toast(toastEl, { delay });
  toast.show();

  toastEl.addEventListener("hidden.bs.toast", () => toastEl.remove());
}

export const notifySuccess = (msg, delay) => showToast(msg, "success", delay);
export const notifyError = (msg, delay) => showToast(msg, "error", delay);
export const notifyWarning = (msg, delay) => showToast(msg, "warning", delay);
export const notifyInfo = (msg, delay) => showToast(msg, "info", delay);

/** Basic HTML escaping so toast messages can't inject markup. */
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
