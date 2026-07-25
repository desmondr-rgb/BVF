/**
 * ============================================================================
 * FORM VALIDATORS
 * ============================================================================
 * Reusable validation functions + a helper that wires Bootstrap 5's
 * validation styling to a <form> element. Feature forms (players, teams,
 * etc., added in later phases) share these instead of duplicating regexes.
 * ============================================================================
 */

export const isRequired = (value) => value !== null && value !== undefined && String(value).trim() !== "";

export const isValidEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());

export const isValidPhone = (value) =>
  /^[+]?[0-9\s\-()]{7,20}$/.test(String(value).trim());

export const isMinLength = (value, min) => String(value ?? "").length >= min;

export const isMaxLength = (value, max) => String(value ?? "").length <= max;

export const isNumberInRange = (value, min, max) => {
  const n = Number(value);
  return !Number.isNaN(n) && n >= min && n <= max;
};

export const isValidDate = (value) => !Number.isNaN(new Date(value).getTime());

export const passwordsMatch = (password, confirm) => password === confirm;

/**
 * Enable Bootstrap's built-in validation styling on a form: prevents
 * submission and adds the `.was-validated` class if any field fails its
 * HTML5 constraint validation (required, pattern, type=email, etc).
 *
 * @param {HTMLFormElement} form
 * @param {(form: HTMLFormElement) => void} onValid - called when the form passes validation
 */
export function attachFormValidation(form, onValid) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      // Focus the first invalid field for accessibility / usability.
      const firstInvalid = form.querySelector(":invalid");
      firstInvalid?.focus();
      return;
    }

    form.classList.add("was-validated");
    onValid(form);
  });
}

/**
 * Show a custom validation message on a specific field (useful for
 * cross-field checks like "passwords do not match" that HTML5 constraint
 * validation can't express on its own).
 * @param {HTMLInputElement} field
 * @param {string} message - empty string clears the error
 */
export function setFieldError(field, message) {
  field.setCustomValidity(message);
  const feedback = field.parentElement?.querySelector(".invalid-feedback");
  if (feedback && message) feedback.textContent = message;
}
