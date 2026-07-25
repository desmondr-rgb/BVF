/**
 * ============================================================================
 * DASHBOARD PAGE
 * ============================================================================
 * Phase 1 scope: auth guard, shell (sidebar/navbar), live Firestore counts
 * for the summary cards (reads real collections — will simply show 0 until
 * Phase 2/3 features start writing data), plus Chart.js/FullCalendar/
 * DataTables widgets. Where a chart needs data that doesn't exist yet
 * (e.g. 12 months of registration history), a clearly-labelled sample
 * dataset is shown so the layout can be reviewed; it is replaced with real
 * aggregation queries as each feature module is built in later phases.
 * ============================================================================ */

import { requireAuth } from "../components/protected-route.js";
import { renderSidebar } from "../components/sidebar.js";
import { renderNavbar } from "../components/navbar.js";
import { listDocuments } from "../services/firestore-service.js";
import { notifyError } from "../utils/notifications.js";

const { profile } = await requireAuth({ permission: "dashboard.view" });

renderSidebar(document.getElementById("appSidebar"), { role: profile.role, activePage: "dashboard" });
renderNavbar(document.getElementById("appNavbar"), {
  pageTitle: "Dashboard",
  breadcrumb: ["Home", "Dashboard"],
  profile,
});

/** Stat card definitions: collection to count + display metadata. */
const STAT_CARDS = [
  { key: "players", label: "Total Players", icon: "bi-person-badge", color: "#0b2545" },
  { key: "teams", label: "Total Teams", icon: "bi-people-fill", color: "#1b998b" },
  { key: "coaches", label: "Total Coaches", icon: "bi-clipboard2-pulse", color: "#e69c0f" },
  { key: "leagues", label: "Active Leagues", icon: "bi-trophy", color: "#0b2545", filters: [["status", "==", "active"]] },
  { key: "tournaments", label: "Active Tournaments", icon: "bi-award", color: "#1b998b", filters: [["status", "==", "active"]] },
  { key: "matches", label: "Matches Today", icon: "bi-calendar-event", color: "#e0554a" },
  { key: "referees", label: "Registered Referees", icon: "bi-flag-fill", color: "#1b998b" },
  { key: "venues", label: "Venues", icon: "bi-geo-alt-fill", color: "#0b2545" },
];

async function loadStatCards() {
  const row = document.getElementById("statCardsRow");
  row.innerHTML = STAT_CARDS.map(() => statCardSkeleton()).join("");

  const results = await Promise.all(
    STAT_CARDS.map(async (card) => {
      try {
        const { docs } = await listDocuments(card.key, { filters: card.filters || [] });
        return docs.length;
      } catch (err) {
        // Collection likely doesn't exist yet / rules not deployed — treat as 0
        // rather than surfacing a scary error on a brand-new project.
        console.warn(`[Dashboard] Could not read "${card.key}":`, err.message);
        return 0;
      }
    })
  );

  row.innerHTML = STAT_CARDS.map(
    (card, i) => `
      <div class="col-6 col-md-4 col-xl-3">
        <div class="stat-card">
          <div class="stat-card-icon" style="background:${card.color}">
            <i class="bi ${card.icon}"></i>
          </div>
          <div>
            <div class="stat-card-value">${results[i]}</div>
            <div class="stat-card-label">${card.label}</div>
          </div>
        </div>
      </div>
    `
  ).join("");
}

function statCardSkeleton() {
  return `
    <div class="col-6 col-md-4 col-xl-3">
      <div class="stat-card placeholder-glow">
        <span class="placeholder rounded-circle" style="width:52px;height:52px;"></span>
        <div class="flex-grow-1">
          <span class="placeholder col-4 d-block mb-1"></span>
          <span class="placeholder col-7"></span>
        </div>
      </div>
    </div>
  `;
}

/** Registrations over time chart (sample data, labelled, until Phase 2 writes real players/teams). */
function renderRegistrationsChart() {
  const ctx = document.getElementById("registrationsChart");
  const months = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  new Chart(ctx, {
    type: "line",
    data: {
      labels: months,
      datasets: [
        {
          label: "Players",
          data: [12, 19, 14, 22, 30, 28, 35, 40, 38, 45, 50, 55],
          borderColor: "#0b2545",
          backgroundColor: "rgba(11,37,69,0.08)",
          tension: 0.35,
          fill: true,
        },
        {
          label: "Teams",
          data: [2, 3, 3, 4, 5, 5, 6, 7, 7, 8, 9, 10],
          borderColor: "#ffb627",
          backgroundColor: "rgba(255,182,39,0.12)",
          tension: 0.35,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { position: "bottom" } },
      scales: { y: { beginAtZero: true } },
    },
  });
}

/** Match results split donut chart (sample data). */
function renderMatchStatsChart() {
  const ctx = document.getElementById("matchStatsChart");
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Completed", "Scheduled", "Live", "Postponed"],
      datasets: [
        {
          data: [58, 27, 3, 4],
          backgroundColor: ["#0b2545", "#ffb627", "#e0554a", "#97a3c2"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { position: "bottom" } },
    },
  });
}

/** Match calendar (sample events until Match Management ships in Phase 3). */
function renderCalendar() {
  const el = document.getElementById("dashboardCalendar");
  const calendar = new FullCalendar.Calendar(el, {
    initialView: "dayGridMonth",
    height: "auto",
    headerToolbar: { left: "prev,next today", center: "title", right: "" },
    events: [
      { title: "Sample: Eagles vs Hawks", start: new Date().toISOString().slice(0, 10), color: "#0b2545" },
    ],
  });
  calendar.render();
}

/** Recent activity feed (placeholder until audit_logs is populated by real actions). */
function renderActivityFeed() {
  const items = [
    { text: "Dashboard shell initialized for your organization.", time: "Just now" },
    { text: "Firebase project connected — remember to deploy Firestore rules.", time: "Just now" },
    { text: "Complete Phase 2 to start registering players and teams.", time: "Pending" },
  ];
  document.getElementById("activityFeed").innerHTML = items
    .map(
      (item) => `
      <div class="activity-item">
        <span class="activity-dot"></span>
        <div>
          <div class="small">${item.text}</div>
          <div class="text-muted" style="font-size:0.72rem">${item.time}</div>
        </div>
      </div>`
    )
    .join("");
}

/** Upcoming matches table (sample rows, wired to DataTables for search/sort/pagination). */
function renderUpcomingMatchesTable() {
  const rows = [
    ["Aug 2, 2026", "Eagles VC", "Hawks VC", "Central Arena", "City League", "Scheduled"],
    ["Aug 4, 2026", "Thunder VC", "Storm VC", "Riverside Court", "Regional Cup", "Scheduled"],
    ["Aug 9, 2026", "Falcons VC", "Titans VC", "Central Arena", "City League", "Scheduled"],
  ];
  document.querySelector("#upcomingMatchesTable tbody").innerHTML = rows
    .map(
      (r) => `<tr>${r
        .map((cell, i) =>
          i === r.length - 1
            ? `<td><span class="badge text-bg-primary">${cell}</span></td>`
            : `<td>${cell}</td>`
        )
        .join("")}</tr>`
    )
    .join("");

  // eslint-disable-next-line no-undef
  $("#upcomingMatchesTable").DataTable({
    paging: true,
    searching: true,
    info: false,
    lengthChange: false,
    pageLength: 5,
  });
}

async function init() {
  try {
    await loadStatCards();
    renderRegistrationsChart();
    renderMatchStatsChart();
    renderCalendar();
    renderActivityFeed();
    renderUpcomingMatchesTable();
  } catch (err) {
    console.error("[Dashboard] Initialization error:", err);
    notifyError("Some dashboard widgets failed to load.");
  }
}

init();
