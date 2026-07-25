/**
 * ============================================================================
 * PROTECTED ROUTE GUARD
 * ============================================================================
 * Since this is a static multi-page app (no SPA router), "protecting" a
 * page means: as soon as the page loads, check the auth state; if the
 * user isn't signed in (or lacks a required permission), redirect them
 * before any sensitive content/data is shown.
 *
 * Usage at the top of any protected page's module:
 *
 *   import { requireAuth } from "../components/protected-route.js";
 *   const { user, profile } = await requireAuth();
 *   // ...render page using `profile.role`, etc.
 *
 * Usage for a permission-gated page:
 *
 *   await requireAuth({ permission: "players.write" });
 * ============================================================================
 */

import { watchAuthState } from "../services/auth-service.js";
import { hasPermission } from "../config/roles.js";
import { showPageLoader, hidePageLoader } from "../utils/loading.js";
import { notifyError } from "../utils/notifications.js";

/**
 * Resolve once with { user, profile } if the current user is authenticated
 * (and, if `permission` is given, authorized). Otherwise redirects to the
 * login page (or a 403 message) and never resolves.
 *
 * @param {Object} [options]
 * @param {string} [options.permission] - required permission string, e.g. "players.write"
 * @param {string} [options.redirectTo="/pages/login.html"]
 */
export function requireAuth(options = {}) {
  const { permission, redirectTo = "login.html" } = options;

  showPageLoader();

  return new Promise((resolve) => {
    const unsubscribe = watchAuthState((state) => {
      unsubscribe();
      hidePageLoader();

      if (!state || !state.user) {
        window.location.href = redirectTo;
        return;
      }

      if (!state.profile) {
        notifyError("Your account profile could not be loaded. Please contact an administrator.");
        window.location.href = redirectTo;
        return;
      }

      if (state.profile.status === "disabled" || state.profile.status === "suspended") {
        notifyError("Your account has been disabled. Contact an administrator.");
        window.location.href = redirectTo;
        return;
      }

      if (permission && !hasPermission(state.profile.role, permission)) {
        notifyError("You do not have permission to access this page.");
        window.location.href = "dashboard.html";
        return;
      }

      resolve(state);
    });
  });
}

/**
 * For pages that should NOT be visible while logged in (login/register):
 * if a session already exists, bounce straight to the dashboard.
 */
export function redirectIfAuthenticated(redirectTo = "dashboard.html") {
  const unsubscribe = watchAuthState((state) => {
    unsubscribe();
    if (state && state.user) {
      window.location.href = redirectTo;
    }
  });
}
