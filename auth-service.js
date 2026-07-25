/**
 * ============================================================================
 * TOP NAVBAR COMPONENT
 * ============================================================================
 * Renders the top bar: sidebar toggle (mobile), breadcrumb, search, dark
 * mode toggle, notifications bell, and the current user's profile menu.
 * ============================================================================
 */

import { logoutUser } from "../services/auth-service.js";
import { ROLE_LABELS } from "../config/roles.js";
import { initThemeToggle } from "../utils/theme.js";
import { notifyError, notifySuccess } from "../utils/notifications.js";

/**
 * @param {HTMLElement} container
 * @param {Object} params
 * @param {string} params.pageTitle - e.g. "Dashboard"
 * @param {Array<string>} [params.breadcrumb] - e.g. ["Home", "Dashboard"]
 * @param {Object} params.profile - Firestore user profile { fullName, role, photoURL }
 */
export function renderNavbar(container, { pageTitle, breadcrumb = [], profile }) {
  const roleLabel = ROLE_LABELS[profile?.role] || "Viewer";
  const initials = getInitials(profile?.fullName);
  const crumbHtml = breadcrumb
    .map((crumb, i) =>
      i === breadcrumb.length - 1
        ? `<li class="breadcrumb-item active" aria-current="page">${crumb}</li>`
        : `<li class="breadcrumb-item">${crumb}</li>`
    )
    .join("");

  container.innerHTML = `
    <button class="btn btn-icon d-lg-none" id="sidebarToggleBtn" aria-label="Toggle navigation">
      <i class="bi bi-list"></i>
    </button>

    <div class="navbar-titles">
      <h1 class="navbar-page-title">${pageTitle}</h1>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb mb-0">${crumbHtml}</ol>
      </nav>
    </div>

    <div class="navbar-search d-none d-md-flex">
      <i class="bi bi-search"></i>
      <input type="search" class="form-control" placeholder="Search players, teams, matches..." aria-label="Search" />
    </div>

    <div class="navbar-actions">
      <button class="btn btn-icon" data-theme-toggle title="Toggle dark mode">
        <i class="bi bi-moon-stars-fill" data-theme-toggle-icon></i>
      </button>

      <div class="dropdown">
        <button class="btn btn-icon position-relative" type="button" data-bs-toggle="dropdown" aria-expanded="false" title="Notifications">
          <i class="bi bi-bell-fill"></i>
          <span class="notif-dot"></span>
        </button>
        <div class="dropdown-menu dropdown-menu-end notif-dropdown">
          <h6 class="dropdown-header">Notifications</h6>
          <div class="text-center text-muted small py-4">
            <i class="bi bi-inbox fs-3 d-block mb-2"></i>
            No new notifications
          </div>
        </div>
      </div>

      <div class="dropdown">
        <button class="btn user-menu-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <span class="avatar-circle">${initials}</span>
          <span class="d-none d-md-flex flex-column align-items-start">
            <span class="user-menu-name">${escapeHtml(profile?.fullName || "User")}</span>
            <span class="user-menu-role">${roleLabel}</span>
          </span>
          <i class="bi bi-chevron-down small"></i>
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li><a class="dropdown-item disabled" href="#"><i class="bi bi-person me-2"></i>My Profile</a></li>
          <li><a class="dropdown-item disabled" href="#"><i class="bi bi-gear me-2"></i>Account Settings</a></li>
          <li><hr class="dropdown-divider" /></li>
          <li><button class="dropdown-item text-danger" id="logoutBtn"><i class="bi bi-box-arrow-right me-2"></i>Sign Out</button></li>
        </ul>
      </div>
    </div>
  `;

  initThemeToggle();

  document.getElementById("sidebarToggleBtn")?.addEventListener("click", () => {
    document.querySelector(".app-sidebar")?.classList.toggle("show");
    document.querySelector(".sidebar-backdrop")?.classList.toggle("show");
  });

  document.getElementById("logoutBtn")?.addEventListener("click", async () => {
    try {
      await logoutUser();
      notifySuccess("You have been signed out.");
      setTimeout(() => (window.location.href = "login.html"), 600);
    } catch (err) {
      console.error("[Navbar] Logout failed:", err);
      notifyError("Failed to sign out. Please try again.");
    }
  });
}

function getInitials(name) {
  if (!name) return "U";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
