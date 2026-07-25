/**
 * ============================================================================
 * FIREBASE CONFIGURATION
 * ============================================================================
 * Volleyball Management System (VMS)
 *
 * Replace the values below with the credentials from your own Firebase
 * project (Project Settings > General > Your apps > SDK setup and config).
 *
 * This file initializes:
 *  - Firebase App
 *  - Firebase Authentication
 *  - Cloud Firestore
 *  - Firebase Storage
 *
 * Loaded as an ES module. All other modules import the initialized
 * instances (auth, db, storage) from here so there is only ever one
 * Firebase app instance in the whole application.
 * ============================================================================
 */

// Firebase v10 modular SDK, loaded from the official CDN (works on GitHub Pages,
// no build step / bundler required).
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  enableIndexedDbPersistence,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

/**
 * TODO: Replace with your Firebase project configuration.
 * Never commit real production keys to a public repository if your
 * Firestore/Storage rules are not locked down — Firebase web API keys are
 * not secret by design, but always pair them with strict security rules
 * (see /firebase/firestore.rules and /firebase/storage.rules).
 */
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase App (single instance for the whole SPA)
export const app = initializeApp(firebaseConfig);

// Initialize Auth and persist the session in localStorage so users stay
// logged in across page reloads / browser restarts (until they sign out).
export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence).catch((err) => {
  console.error("[Firebase] Failed to set auth persistence:", err);
});

// Initialize Firestore
export const db = getFirestore(app);

// Enable offline persistence where supported (improves UX on flaky
// connections; silently ignored if the browser/tab doesn't support it).
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === "failed-precondition") {
    // Multiple tabs open, persistence can only be enabled in one tab at a time.
    console.warn("[Firestore] Persistence disabled: multiple tabs open.");
  } else if (err.code === "unimplemented") {
    console.warn("[Firestore] Persistence not supported in this browser.");
  }
});

// Initialize Storage
export const storage = getStorage(app);
