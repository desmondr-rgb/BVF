/**
 * ============================================================================
 * LOGIN PAGE LOGIC
 * ============================================================================
 */

import { loginUser, resetPassword, translateAuthError } from "../services/auth-service.js";
import { redirectIfAuthenticated } from "../components/protected-route.js";
import { attachFormValidation, isValidEmail } from "../utils/validators.js";
import { setButtonLoading, clearButtonLoading } from "../utils/loading.js";
import { notifyError, notifySuccess, notifyInfo } from "../utils/notifications.js";

// If already signed in, skip straight to the dashboard.
redirectIfAuthenticated("dashboard.html");

const form = document.getElementById("loginForm");
const submitBtn = document.getElementById("loginSubmitBtn");

attachFormValidation(form, async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  setButtonLoading(submitBtn, "Signing in...");
  try {
    await loginUser(email, password);
    notifySuccess("Signed in successfully. Redirecting...");
    setTimeout(() => (window.location.href = "dashboard.html"), 500);
  } catch (err) {
    console.error("[Login] Failed:", err);
    notifyError(translateAuthError(err));
  } finally {
    clearButtonLoading(submitBtn);
  }
});

// Show/hide password
document.getElementById("togglePassword").addEventListener("click", () => {
  const input = document.getElementById("password");
  const icon = document.querySelector("#togglePassword i");
  const isHidden = input.type === "password";
  input.type = isHidden ? "text" : "password";
  icon.classList.toggle("bi-eye");
  icon.classList.toggle("bi-eye-slash");
});

// Forgot password
document.getElementById("forgotPasswordBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  if (!isValidEmail(email)) {
    notifyError("Enter your email address above first, then click 'Forgot password?'.");
    document.getElementById("email").focus();
    return;
  }
  try {
    await resetPassword(email);
    notifyInfo(`Password reset email sent to ${email}.`);
  } catch (err) {
    console.error("[Login] Password reset failed:", err);
    notifyError(translateAuthError(err));
  }
});
