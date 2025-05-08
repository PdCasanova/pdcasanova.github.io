/**
 * Handles navigation for custom back button logic.
 * Navigates back if there's a valid referrer, otherwise triggers a fallback event.
 */
function goBack() {
  if (document.referrer && document.referrer !== location.href) {
    window.history.back();
  } else {
    // Trigger fallback event (e.g., Outsystems)
    window.location.href = "_CLOSE_THIS_THING";
  }
}

/**
 * Injects a show/hide password toggle button with an inline SVG icon next to the password input.
 */
function insertPasswordToggle() {
  const passwordInput = document.getElementById("password");

  if (passwordInput && !document.getElementById("togglePassword")) {
    // Create wrapper to position the toggle icon inside input field
    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";

    // Move input inside wrapper
    passwordInput.parentNode.insertBefore(wrapper, passwordInput);
    wrapper.appendChild(passwordInput);

    // Create toggle button
    const toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.id = "togglePassword";
    toggleBtn.setAttribute("aria-label", "Toggle password visibility");
    Object.assign(toggleBtn.style, {
      background: "none",
      border: "none",
      cursor: "pointer",
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      padding: "0"
    });

    // Inject SVG icon (replace with full path as needed)
    toggleBtn.innerHTML = `
      <svg id="eyeIcon" xmlns="http://www.w3.org/2000/svg" fill="#000" width="20" height="20" viewBox="0 0 442.04 442.04">
        <path d="M221.02,341.304c..."/> <!-- replace with full SVG paths -->
      </svg>
    `;

    wrapper.appendChild(toggleBtn);

    // Toggle input type and update SVG color
    toggleBtn.addEventListener("click", () => {
      const isHidden = passwordInput.type === "password";
      passwordInput.type = isHidden ? "text" : "password";

      const eyeIcon = toggleBtn.querySelector("#eyeIcon");
      if (eyeIcon) {
        eyeIcon.style.fill = isHidden ? "#0078D4" : "#000";
      }
    });
  }
}

/**
 * Injects the custom back icon into the B2C `#api` container, and triggers password toggle setup.
 */
function insertBackIcon() {
  const apiContainer = document.getElementById("api");

  // Only proceed if container exists and icon isn't already inserted
  if (apiContainer && !document.getElementById("backIcon")) {
    // Create back button
    const backIcon = document.createElement("div");
    backIcon.id = "backIcon";
    backIcon.onclick = goBack;

    // Inline SVG for back arrow
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="#333" height="20px" width="20px" viewBox="0 0 59.414 59.414">
        <polygon points="45.268,1.414 43.854,0 14.146,29.707 43.854,59.414 45.268,58 16.975,29.707"/>
      </svg>
    `;

    backIcon.innerHTML = svg;
    backIcon.style.width = "100%";
    backIcon.style.textAlign = "start";

    // Insert at the top of the container
    apiContainer.insertBefore(backIcon, apiContainer.firstChild);

    // Inject the password toggle
    insertPasswordToggle();

    // Cleanup: stop polling, disconnect observer
    if (waitForApiContainer) clearInterval(waitForApiContainer);
    if (observerInstance) {
      observerInstance.disconnect();
      console.log('🔌 Observer disconnected');
    }
  }
}

/**
 * Fallback polling in case DOM is delayed.
 * Will stop once `insertBackIcon()` succeeds.
 */
let waitForApiContainer = setInterval(insertBackIcon, 300);

/**
 * MutationObserver alternative to polling: watches for DOM changes to trigger injection.
 */
let observerInstance = null;

document.addEventListener('DOMContentLoaded', () => {
  const tryAttachObserver = () => {
    const container = document.getElementById('container');

    if (container) {
      observerInstance = new MutationObserver(() => {
        insertBackIcon();
      });

      observerInstance.observe(container, {
        childList: true,
        subtree: true
      });

      console.log('👁️ MutationObserver attached - version 0.1');
    } else {
      setTimeout(tryAttachObserver, 200);
    }
  };

  tryAttachObserver();
});
