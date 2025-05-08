function goBack() {
  if (document.referrer && document.referrer !== location.href) {
    window.history.back();
  } else {
    window.location.href = "_CLOSE_THIS_THING"; // Outsystems Event
  }
}

let waitForApiContainer;       
let observerInstance = null; 

function insertBackIcon() {
  const apiContainer = document.getElementById('api');

  if (apiContainer && !document.getElementById('backIcon')) {
    const backIcon = document.createElement('div');
    backIcon.id = 'backIcon';
    backIcon.onclick = goBack;

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="#333" height="20px" width="20px" viewBox="0 0 59.414 59.414">
        <polygon points="45.268,1.414 43.854,0 14.146,29.707 43.854,59.414 45.268,58 16.975,29.707"/>
      </svg>
    `;

    backIcon.innerHTML = svg;
    backIcon.style.width = "100%";
    backIcon.style.textAlign = "start";

    apiContainer.insertBefore(backIcon, apiContainer.firstChild);

    // stop timer and disconnect observer
    if (waitForApiContainer) {
      clearInterval(waitForApiContainer);
    }

    if (observerInstance) {
      observerInstance.disconnect();
      console.log('🔌 Observer disconnected');
    }
  }
}

// Fallback : 300ms
waitForApiContainer = setInterval(insertBackIcon, 300);

// MutationObserver invés de setInterval
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

      console.log('version 0.1 - Test');
    } else {
      setTimeout(tryAttachObserver, 200);
    }
  };

  tryAttachObserver();
});
