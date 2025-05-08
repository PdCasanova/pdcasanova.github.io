function goBack() {
  if (document.referrer && document.referrer !== location.href) {
    window.history.back();
  } else {
    window.location.href = "_CLOSE_THIS_THING";
  }
}

function insertBackButton() {
  const apiContainer = document.getElementById('api');

  // Only proceed if the container exists and no back button yet
  if (apiContainer && !document.getElementById('back')) {
    const backBtn = document.createElement('button');
    backBtn.id = 'back';
    backBtn.type = 'button';
    backBtn.innerText = 'Back';
    backBtn.onclick = goBack;

    // Styling similar to original, adjust if needed
    Object.assign(backBtn.style, {
      padding: '10px',
      width: '95%',
      marginBottom: '20px',
      color: 'rgb(209, 0, 52)',
      fontWeight: 'bold',
      backgroundColor: 'white',
      border: '2px solid rgb(209, 0, 52)',
      borderRadius: '25px',
      cursor: 'pointer',
    });

    // Insert at the beginning of #api container
    apiContainer.insertBefore(backBtn, apiContainer.firstChild);

    console.log('Version 0.1');

    clearInterval(waitForApiContainer);
  }
}

// Check every 300ms until #api container is available
const waitForApiContainer = setInterval(insertBackButton, 300);
