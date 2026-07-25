/**
 * ============================================================================
 * REGISTER PAGE LOGIC
 * ============================================================================
 */

import { registerUser, translateAuthError } from "../services/auth-service.js";
import { redirectIfAuthenticated } from "../components/protected-route.js";
import { attachFormValidation, passwordsMatch, setFieldError } from "../utils/validators.js";
import { setButtonLoading, clearButtonLoading } from "../utils/loading.js";
import { notifyError, notifySuccess } from "../utils/notifications.js";

redirectIfAuthenticated("dashboard.html");

const form = document.getElementById("registerForm");
const submitBtn = document.getElementById("registerSubmitBtn");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirmPassword");

/** Live cross-field check so the "passwords don't match" state updates as the user types. */
function validatePasswordMatch() {
  if (confirmInput.value && !passwordsMatch(passwordInput.value, confirmInput.value)) {
    setFieldError(confirmInput, "Passwords do not match.");
  } else {
    setFieldError(confirmInput, "");
  }
}
passwordInput.addEventListener("input", validatePasswordMatch);
confirmInput.addEventListener("input", validatePasswordMatch);

attachFormValidation(form, async () => {
  validatePasswordMatch();
  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return;
  }

  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = passwordInput.value;

  setButtonLoading(submitBtn, "Creating account...");
  try {
    await registerUser({ email, password, fullName });
    notifySuccess("Account created! Redirecting to your dashboard...");
    setTimeout(() => (window.location.href = "dashboard.html"), 600);
  } catch (err) {
    console.error("[Register] Failed:", err);
    notifyError(translateAuthError(err));
  } finally {
    clearButtonLoading(submitBtn);
  }
});
