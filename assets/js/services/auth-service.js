/**
 * ============================================================================
 * AUTH SERVICE
 * ============================================================================
 * Wraps Firebase Authentication and the corresponding Firestore "users"
 * document (which stores the user's role, profile info, and status).
 *
 * Every other module should go through this service rather than calling
 * the Firebase SDK directly, so auth logic (error handling, profile
 * creation, role lookup) lives in exactly one place.
 * ============================================================================
 */

import { auth, db } from "../config/firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { ROLES } from "../config/roles.js";

/**
 * Human-friendly translations for common Firebase Auth error codes.
 * Firebase's raw error messages are technical; we map them to messages
 * that make sense to an end user filling out a form.
 */
const AUTH_ERROR_MESSAGES = {
  "auth/email-already-in-use": "An account with this email already exists.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/weak-password": "Password should be at least 6 characters.",
  "auth/user-not-found": "No account found with this email.",
  "auth/wrong-password": "Incorrect email or password.",
  "auth/invalid-credential": "Incorrect email or password.",
  "auth/too-many-requests": "Too many attempts. Please try again later.",
  "auth/network-request-failed": "Network error. Check your connection and try again.",
  "auth/user-disabled": "This account has been disabled. Contact an administrator.",
};

/**
 * Translate a Firebase error into a user-friendly message.
 */
export function translateAuthError(error) {
  return AUTH_ERROR_MESSAGES[error?.code] || error?.message || "Something went wrong. Please try again.";
}

/**
 * Register a new user with email/password and create their Firestore
 * user profile document. New self-registered users default to the
 * "viewer" role; an administrator must upgrade their role afterward.
 *
 * @param {Object} params
 * @param {string} params.email
 * @param {string} params.password
 * @param {string} params.fullName
 * @returns {Promise<import("firebase/auth").UserCredential>}
 */
export async function registerUser({ email, password, fullName }) {
  const credential = await createUserWithEmailAndPassword(auth, email, password);

  // Set the Firebase Auth display name too, so it's available immediately
  // in auth.currentUser without waiting for a Firestore read.
  await updateProfile(credential.user, { displayName: fullName });

  // Create the corresponding Firestore profile document. The document ID
  // matches the Firebase Auth UID so the two stay in sync 1:1.
  await setDoc(doc(db, "users", credential.user.uid), {
    uid: credential.user.uid,
    fullName,
    email,
    role: ROLES.VIEWER,
    status: "active",
    photoURL: null,
    phone: null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    lastLoginAt: serverTimestamp(),
  });

  return credential;
}

/**
 * Sign in an existing user with email/password.
 */
export async function loginUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

/**
 * Sign the current user out.
 */
export async function logoutUser() {
  return signOut(auth);
}

/**
 * Send a password reset email.
 */
export async function resetPassword(email) {
  return sendPasswordResetEmail(auth, email);
}

/**
 * Fetch a user's Firestore profile document (contains role, name, etc).
 * @param {string} uid
 */
export async function getUserProfile(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data() : null;
}

/**
 * Subscribe to auth state changes. Calls the callback with:
 *   { user: FirebaseUser, profile: FirestoreUserDoc } when signed in
 *   null when signed out
 *
 * This is the single source of truth every page should use to decide
 * whether to show protected content.
 *
 * @param {(state: {user: object, profile: object} | null) => void} callback
 * @returns {() => void} unsubscribe function
 */
export function watchAuthState(callback) {
  return onAuthStateChanged(auth, async (user) => {
    if (!user) {
      callback(null);
      return;
    }
    try {
      const profile = await getUserProfile(user.uid);
      callback({ user, profile });
    } catch (err) {
      console.error("[AuthService] Failed to load user profile:", err);
      callback({ user, profile: null });
    }
  });
}
