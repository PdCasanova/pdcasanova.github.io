function goBack() {
  if (document.referrer && document.referrer !== location.href) {
    window.history.back();
  } else {
    window.location.href = "_CLOSE_THIS_THING"; //To fire the outsystems event where we close the webview
  }
}

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
    console.log('Version 0.2 - using MutationObserver');
  }
}

// Use MutationObserver to detect when #api is added to the DOM
const observer = new MutationObserver((mutations, obs) => {
  if (document.getElementById('api')) {
    insertBackIcon();
    obs.disconnect(); // Stop observing once it's done
  }
});

// Start observing the document body for added child nodes
observer.observe(document.body, {
  childList: true,
  subtree: true
});
