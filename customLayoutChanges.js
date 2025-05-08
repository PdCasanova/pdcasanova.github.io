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
    // Create wrapper and apply flex layout
    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.alignItems = "center";
    wrapper.style.position = "relative";
    wrapper.style.width = "100%";

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
      padding: "0",
      marginLeft: "-2em",  // pulls icon inside input border area
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%"
    });

    // Inline SVG (scaled with font size)
    toggleBtn.innerHTML = `
      <svg id="eyeIcon" xmlns="http://www.w3.org/2000/svg" fill="#000000" width="1.2em" height="1.2em" viewBox="0 0 442.04 442.04">
        <g>
          <g>
            <path d="M221.02,341.304c-49.708,0-103.206-19.44-154.71-56.22C27.808,257.59,4.044,230.351,3.051,229.203
              c-4.068-4.697-4.068-11.669,0-16.367c0.993-1.146,24.756-28.387,63.259-55.881c51.505-36.777,105.003-56.219,154.71-56.219
              c49.708,0,103.207,19.441,154.71,56.219c38.502,27.494,62.266,54.734,63.259,55.881c4.068,4.697,4.068,11.669,0,16.367
              c-0.993,1.146-24.756,28.387-63.259,55.881C324.227,321.863,270.729,341.304,221.02,341.304z
              M29.638,221.021c9.61,9.799,27.747,27.03,51.694,44.071c32.83,23.361,83.714,51.212,139.688,51.212
              s106.859-27.851,139.688-51.212c23.944-17.038,42.082-34.271,51.694-44.071c-9.609-9.799-27.747-27.03-51.694-44.071
              c-32.829-23.362-83.714-51.212-139.688-51.212s-106.858,27.85-139.688,51.212C57.388,193.988,39.25,211.219,29.638,221.021z"/>
          </g>
          <g>
            <path d="M221.02,298.521c-42.734,0-77.5-34.767-77.5-77.5c0-42.733,34.766-77.5,77.5-77.5
              c18.794,0,36.924,6.814,51.048,19.188c5.193,4.549,5.715,12.446,1.166,17.639c-4.549,5.193-12.447,5.714-17.639,1.166
              c-9.564-8.379-21.844-12.993-34.576-12.993c-28.949,0-52.5,23.552-52.5,52.5s23.551,52.5,52.5,52.5
              c28.95,0,52.5-23.552,52.5-52.5c0-6.903,5.597-12.5,12.5-12.5s12.5,5.597,12.5,12.5C298.521,263.754,263.754,298.521,221.02,298.521z"/>
          </g>
          <g>
            <path d="M221.02,246.021c-13.785,0-25-11.215-25-25s11.215-25,25-25c13.786,0,25,11.215,25,25S234.806,246.021,221.02,246.021z"/>
          </g>
        </g>
      </svg>
    `;

    wrapper.appendChild(toggleBtn);

    // Toggle input type and icon color
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
