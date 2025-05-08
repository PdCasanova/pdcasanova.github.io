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
      backBtn.innerHTML = '←';

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
      console.log('version 0.1');

      clearInterval(waitForBackBtnInsert);
    }
  }

  const waitForBackBtnInsert = setInterval(insertBackButton, 300);
</script>
