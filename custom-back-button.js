function insertBackButton() {
  const apiDiv = document.getElementById('api');

  if (apiDiv && !document.getElementById('back')) {
    const backBtn = document.createElement('button');
    backBtn.id = 'back';
    backBtn.type = 'button';
    backBtn.onclick = goBack;

    // Insert your SVG icon
    backBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg"
           xmlns:xlink="http://www.w3.org/1999/xlink"
           fill="#000000"
           height="24px"
           width="24px"
           viewBox="0 0 59.414 59.414"
           xml:space="preserve">
        <polygon points="45.268,1.414 43.854,0 14.146,29.707 43.854,59.414 45.268,58 16.975,29.707"/>
      </svg>
    `;

    // Style the button
    Object.assign(backBtn.style, {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '10px',
      marginBottom: '10px',
      alignSelf: 'flex-start',
      display: 'flex',
      alignItems: 'center',
    });

    // Optionally style the SVG
    const svg = backBtn.querySelector('svg');
    if (svg) {
      svg.style.height = '24px';
      svg.style.width = '24px';
    }

    apiDiv.insertBefore(backBtn, apiDiv.firstChild);
    console.log('version 0.1');

    clearInterval(waitForBackBtnInsert);
  }
}
