/**
 * ============================================================================
 * SIDEBAR NAVIGATION COMPONENT
 * ============================================================================
 * Renders the left sidebar navigation, showing only the links the current
 * user's role has permission to see. Highlights the active page link.
 *
 * NOTE: Phase 1 only wires up Dashboard + placeholders for modules that
 * will be built in later phases (Players, Teams, Coaches, Leagues, etc).
 * Those links are present in the structure now so the shell/navigation
 * is complete, but point to "#" until their pages are built.
 * ============================================================================
 */

import { hasPermission } from "../config/roles.js";

/**
 * Nav structure: each item can declare a `permission` required to see it.
 * Items without a `permission` are visible to any authenticated user.
 */
const NAV_SECTIONS = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", icon: "bi-speedometer2", href: "dashboard.html", page: "dashboard" },
    ],
  },
  {
    label: "People",
    items: [
      { label: "Players", icon: "bi-person-badge", href: "#", page: "players", permission: "players.read" },
      { label: "Teams", icon: "bi-people-fill", href: "#", page: "teams", permission: "teams.read" },
      { label: "Coaches", icon: "bi-clipboard2-pulse", href: "#", page: "coaches", permission: "coaches.read" },
      { label: "Referees", icon: "bi-flag-fill", href: "#", page: "referees", permission: "referees.read" },
    ],
  },
  {
    label: "Competitions",
    items: [
      { label: "Leagues", icon: "bi-trophy", href: "#", page: "leagues", permission: "leagues.read" },
      { label: "Tournaments", icon: "bi-award", href: "#", page: "tournaments", permission: "tournaments.read" },
      { label: "Matches", icon: "bi-calendar-event", href: "#", page: "matches", permission: "matches.read" },
      { label: "Venues", icon: "bi-geo-alt-fill", href: "#", page: "venues", permission: "venues.read" },
    ],
  },
  {
    label: "Insights",
    items: [
      { label: "Statistics", icon: "bi-bar-chart-line-fill", href: "#", page: "statistics", permission: "statistics.read" },
      { label: "Reports", icon: "bi-file-earmark-text-fill", href: "#", page: "reports", permission: "reports.read" },
    ],
  },
  {
    label: "Administration",
    items: [
      { label: "Users & Roles", icon: "bi-shield-lock-fill", href: "#", page: "users", permission: "users.read" },
      { label: "Settings", icon: "bi-gear-fill", href: "#", page: "settings", permission: "settings.read" },
    ],
  },
];

/**
 * Render the sidebar into the given container element.
 * @param {HTMLElement} container
 * @param {Object} params
 * @param {string} params.role - current user's role
 * @param {string} params.activePage - page key to highlight, e.g. "dashboard"
 */
export function renderSidebar(container, { role, activePage }) {
  const sectionsHtml = NAV_SECTIONS.map((section) => {
    const visibleItems = section.items.filter(
      (item) => !item.permission || hasPermission(role, item.permission)
    );
    if (visibleItems.length === 0) return "";

    const itemsHtml = visibleItems
      .map((item) => {
        const isActive = item.page === activePage;
        const isDisabled = item.href === "#";
        return `
          <li class="nav-item">
            <a
              class="nav-link ${isActive ? "active" : ""} ${isDisabled ? "disabled" : ""}"
              href="${item.href}"
              ${isDisabled ? 'title="Coming in a later phase" tabindex="-1" aria-disabled="true"' : ""}
            >
              <i class="bi ${item.icon}"></i>
              <span>${item.label}</span>
            </a>
          </li>
        `;
      })
      .join("");

    return `
      <div class="sidebar-section">
        <p class="sidebar-section-title">${section.label}</p>
        <ul class="nav flex-column">${itemsHtml}</ul>
      </div>
    `;
  }).join("");

  container.innerHTML = `
    <div class="sidebar-brand">
      <i class="bi bi-hexagon-fill"></i>
      <span>VMS</span>
    </div>
    <nav class="sidebar-nav">${sectionsHtml}</nav>
  `;
}
