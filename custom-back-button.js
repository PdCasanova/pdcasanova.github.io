function goBack() {
		  if (document.referrer && document.referrer !== location.href) {
		    window.history.back();
		  } else {
		    window.location.href = "_CLOSE_THIS_THING";
		  }
		}
		
		function insertBackIcon() {
		  const apiContainer = document.getElementById('api');
		
		  // Only proceed if the container exists and no back icon yet
		  if (apiContainer && !document.getElementById('backIcon')) {
		    const backIcon = document.createElement('div');
		    backIcon.id = 'backIcon';
		    backIcon.onclick = goBack;
		
		    // SVG markup for the back arrow
		    const svg = `
		      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#333" height="20px" width="20px" version="1.1" id="Capa_1" viewBox="0 0 59.414 59.414" xml:space="preserve">
		        <polygon points="45.268,1.414 43.854,0 14.146,29.707 43.854,59.414 45.268,58 16.975,29.707"/>
		      </svg>
		    `;

		    backIcon.innerHTML = svg; // Insert the SVG as the content
		    backIcon.style.width = "100%";
		    backIcon.style.textAlign = "start";
		
		
		    // Insert at the beginning of #api container
		    apiContainer.insertBefore(backIcon, apiContainer.firstChild);
		
		    console.log('Version 0.1');
		
		    clearInterval(waitForApiContainer);
		  }
		}
		
		// Check every 300ms until #api container is available
		const waitForApiContainer = setInterval(insertBackIcon, 300);
