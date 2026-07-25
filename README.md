# Volleyball Management System (VMS) — Phase 1

A static, modular front-end (HTML5/CSS3/ES6+/Bootstrap 5) backed by Firebase
(Authentication, Firestore, Storage), deployable to GitHub Pages.

**Phase 1 delivers:** folder structure, Firebase setup, authentication
(register/login/logout/password reset), role-based route protection, the
app shell (sidebar + top navbar, dark/light mode), and a working dashboard
with stat cards, charts, a calendar, and a data table.

---

## 1. Project structure

```
/
├── index.html                  # Entry point — redirects to login or dashboard
├── firebase.json                # Firebase Hosting/Firestore/Storage config
├── .nojekyll                    # Tells GitHub Pages not to run Jekyll
├── .github/workflows/deploy.yml # Auto-deploy to GitHub Pages on push to main
├── firebase/
│   ├── firestore.rules          # Firestore security rules
│   ├── firestore.indexes.json   # Composite index definitions
│   └── storage.rules            # Storage security rules
├── pages/
│   ├── login.html
│   ├── register.html
│   └── dashboard.html
└── assets/
    ├── css/
    │   ├── main.css              # Design tokens, layout, components
    │   └── auth.css              # Login/register page styling
    ├── images/, icons/           # Static assets
    └── js/
        ├── config/
        │   ├── firebase-config.js  # Firebase SDK initialization
        │   └── roles.js            # Roles + permissions matrix
        ├── services/
        │   ├── auth-service.js     # Register/login/logout/profile
        │   └── firestore-service.js# Generic Firestore CRUD helpers
        ├── components/
        │   ├── sidebar.js          # Role-aware navigation
        │   ├── navbar.js           # Top bar: search, theme, user menu
        │   └── protected-route.js  # Auth/permission guard for pages
        ├── utils/
        │   ├── notifications.js    # Toast success/error/warning/info
        │   ├── loading.js          # Page + button loading indicators
        │   ├── validators.js       # Form validation helpers
        │   └── theme.js            # Dark/light mode toggle
        └── pages/
            ├── login.js
            ├── register.js
            └── dashboard.js
```

## 2. Set up your Firebase project

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. **Authentication** → Sign-in method → enable **Email/Password**.
3. **Firestore Database** → Create database (start in production mode — the
   provided rules lock it down properly, see below).
4. **Storage** → Get started (default bucket is fine).
5. Project settings → General → "Your apps" → add a **Web app** → copy the
   `firebaseConfig` object.
6. Paste those values into `assets/js/config/firebase-config.js`, replacing
   the `YOUR_...` placeholders.

## 3. Deploy security rules

Install the Firebase CLI once: `npm install -g firebase-tools`

```bash
firebase login
firebase use --add        # select your project
firebase deploy --only firestore:rules,storage
```

This deploys `firebase/firestore.rules` and `firebase/storage.rules`. Without
this step, all reads/writes are denied by default and the app will not be
able to read/write any data.

## 4. Run locally

This is a static site with no build step. Any static file server works, e.g.:

```bash
npx serve .
# or
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

> Opening `index.html` directly via `file://` will **not** work — ES module
> imports and Firebase both require a proper HTTP origin.

## 5. Deploy to GitHub Pages

1. Push this repository to GitHub.
2. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The included workflow (`.github/workflows/deploy.yml`) deploys automatically
   on every push to `main`. Or trigger it manually from the **Actions** tab.
4. Your site will be live at `https://<username>.github.io/<repo>/`.

> Firebase Authentication requires the domain to be authorized: in the
> Firebase Console go to **Authentication → Settings → Authorized domains**
> and add your `github.io` domain.

## 6. First login & making yourself a Super Admin

New accounts created through **Register** default to the `viewer` role (see
`assets/js/config/roles.js`). To bootstrap your first administrator:

1. Register a normal account through the app.
2. In the Firebase Console, open **Firestore → users → `<your uid>`**.
3. Manually change the `role` field to `super_admin`.
4. Sign out and back in — the sidebar/permissions will update immediately.

All subsequent role changes can be done by an admin from the (Phase 4)
Users & Roles admin screen.

## 7. Roles included

`super_admin`, `federation_admin`, `league_admin`, `tournament_organizer`,
`club_admin`, `team_manager`, `coach`, `assistant_coach`, `referee`,
`statistician`, `player`, `viewer` — see `assets/js/config/roles.js` for the
full permission matrix each role maps to.

## 8. What's next

This is Phase 1 of 5 (folder structure, Firebase setup, authentication,
dashboard, navigation). Sidebar links for Players, Teams, Coaches, Leagues,
Tournaments, Matches, Venues, Referees, Statistics, Reports, and Admin are
already scaffolded in `sidebar.js` (shown/hidden per role) but point to `#`
until their pages are built in:

- **Phase 2** — Player Management, Team Management, Coach Management
- **Phase 3** — League Management, Tournament Management, Match Management
- **Phase 4** — Reports, Analytics, Notifications
- **Phase 5** — Testing, Optimisation, Deployment hardening

Let me know when you're ready to move on to Phase 2.
