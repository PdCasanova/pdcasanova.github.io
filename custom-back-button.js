<script>
  function goBack() {
    if (document.referrer && document.referrer !== location.href) {
      window.history.back();
    } else {
      window.location.href = "_CLOSE_THIS_THING";
    }
  }

  function insertBackButton() {
    const apiDiv = document.getElementById('api');

    if (apiDiv && !document.getElementById('back')) {
      const backBtn = document.createElement('button');
      backBtn.id = 'back';
      backBtn.type = 'button';
      backBtn.onclick = goBack;

      // Insert your custom SVG icon
      backBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="rgb(209, 0, 52)" height="24" width="24" viewBox="0 0 59.414 59.414">
          <polygon points="45.268,1.414 43.854,0 14.146,29.707 43.854,59.414 45.268,58 16.975,29.707 "/>
        </svg>
      `;

      // Style it like a minimal back arrow button
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

      const svg = backBtn.querySelector('svg');
      svg.style.height = '24px';
      svg.style.width = '24px';

      // Insert it as the first child of #api
      apiDiv.insertBefore(backBtn, apiDiv.firstChild);

      clearInterval(waitForBackBtnInsert);
    }
  }

  const waitForBackBtnInsert = setInterval(insertBackButton, 300);
</script>
