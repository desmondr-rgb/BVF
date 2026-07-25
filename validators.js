/**
 * ============================================================================
 * ROLES & PERMISSIONS
 * ============================================================================
 * Central definition of every role in the system and what each role is
 * allowed to do. Both the UI (to show/hide nav items and buttons) and the
 * route guards (protected-route.js) read from this file, and the same
 * role names are mirrored in /firebase/firestore.rules on the server side.
 *
 * IMPORTANT: Client-side role checks are for UX only (hiding buttons,
 * redirecting pages). The real security boundary is enforced by Firestore
 * Security Rules, since anyone can edit client-side JavaScript.
 * ============================================================================
 */

// Every role recognised by the system.
export const ROLES = Object.freeze({
  SUPER_ADMIN: "super_admin",
  FEDERATION_ADMIN: "federation_admin",
  LEAGUE_ADMIN: "league_admin",
  TOURNAMENT_ORGANIZER: "tournament_organizer",
  CLUB_ADMIN: "club_admin",
  TEAM_MANAGER: "team_manager",
  COACH: "coach",
  ASSISTANT_COACH: "assistant_coach",
  REFEREE: "referee",
  STATISTICIAN: "statistician",
  PLAYER: "player",
  VIEWER: "viewer",
});

// Human-readable labels for the UI (badges, dropdowns, profile pages).
export const ROLE_LABELS = Object.freeze({
  [ROLES.SUPER_ADMIN]: "Super Administrator",
  [ROLES.FEDERATION_ADMIN]: "Federation Administrator",
  [ROLES.LEAGUE_ADMIN]: "League Administrator",
  [ROLES.TOURNAMENT_ORGANIZER]: "Tournament Organizer",
  [ROLES.CLUB_ADMIN]: "Club Administrator",
  [ROLES.TEAM_MANAGER]: "Team Manager",
  [ROLES.COACH]: "Coach",
  [ROLES.ASSISTANT_COACH]: "Assistant Coach",
  [ROLES.REFEREE]: "Referee",
  [ROLES.STATISTICIAN]: "Statistician",
  [ROLES.PLAYER]: "Player",
  [ROLES.VIEWER]: "Viewer",
});

// Coarse-grained permission flags used to gate UI features. Each role maps
// to a set of capability strings. Feature modules check
// `hasPermission(userRole, "players.write")` rather than hard-coding role
// names, so new roles/permissions can be added in one place.
export const ROLE_PERMISSIONS = Object.freeze({
  [ROLES.SUPER_ADMIN]: ["*"], // full access to everything
  [ROLES.FEDERATION_ADMIN]: [
    "dashboard.view",
    "players.read", "players.write",
    "teams.read", "teams.write",
    "coaches.read", "coaches.write",
    "leagues.read", "leagues.write",
    "tournaments.read", "tournaments.write",
    "matches.read", "matches.write",
    "referees.read", "referees.write",
    "venues.read", "venues.write",
    "reports.read", "reports.generate",
    "users.read", "users.write",
    "settings.read", "settings.write",
  ],
  [ROLES.LEAGUE_ADMIN]: [
    "dashboard.view",
    "leagues.read", "leagues.write",
    "teams.read", "teams.write",
    "matches.read", "matches.write",
    "standings.read", "standings.write",
    "venues.read", "referees.read",
    "reports.read", "reports.generate",
  ],
  [ROLES.TOURNAMENT_ORGANIZER]: [
    "dashboard.view",
    "tournaments.read", "tournaments.write",
    "teams.read", "matches.read", "matches.write",
    "venues.read", "referees.read",
    "reports.read", "reports.generate",
  ],
  [ROLES.CLUB_ADMIN]: [
    "dashboard.view",
    "players.read", "players.write",
    "teams.read", "teams.write",
    "coaches.read", "coaches.write",
    "training.read", "training.write",
    "reports.read",
  ],
  [ROLES.TEAM_MANAGER]: [
    "dashboard.view",
    "players.read", "players.write",
    "teams.read", "teams.write",
    "matches.read",
    "training.read",
    "reports.read",
  ],
  [ROLES.COACH]: [
    "dashboard.view",
    "players.read",
    "teams.read",
    "training.read", "training.write",
    "matches.read", "matches.write",
    "statistics.read",
  ],
  [ROLES.ASSISTANT_COACH]: [
    "dashboard.view",
    "players.read",
    "teams.read",
    "training.read",
    "matches.read",
    "statistics.read",
  ],
  [ROLES.REFEREE]: [
    "dashboard.view",
    "matches.read", "matches.write",
    "referees.read",
  ],
  [ROLES.STATISTICIAN]: [
    "dashboard.view",
    "matches.read",
    "statistics.read", "statistics.write",
    "reports.read", "reports.generate",
  ],
  [ROLES.PLAYER]: [
    "dashboard.view",
    "players.read.own",
    "teams.read",
    "matches.read",
    "statistics.read",
    "training.read",
  ],
  [ROLES.VIEWER]: [
    "dashboard.view",
    "players.read",
    "teams.read",
    "matches.read",
    "leagues.read",
    "tournaments.read",
    "statistics.read",
  ],
});

/**
 * Check whether a given role has a given permission.
 * @param {string} role - one of ROLES
 * @param {string} permission - e.g. "players.write"
 * @returns {boolean}
 */
export function hasPermission(role, permission) {
  if (!role) return false;
  const perms = ROLE_PERMISSIONS[role];
  if (!perms) return false;
  return perms.includes("*") || perms.includes(permission);
}

/**
 * Convenience helper: is this role any kind of "admin"?
 * Useful for showing admin-only navigation sections.
 */
export function isAdminRole(role) {
  return [
    ROLES.SUPER_ADMIN,
    ROLES.FEDERATION_ADMIN,
    ROLES.LEAGUE_ADMIN,
    ROLES.CLUB_ADMIN,
  ].includes(role);
}
