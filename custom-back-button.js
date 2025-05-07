function goBack() {
		    if (document.referrer && document.referrer !== location.href) {
		      window.history.back();
		    } else {
		      window.location.href = "_CLOSE_THIS_THING";
		    }
		  }
		
		  function insertBackButton() {
		    const buttonsDiv = document.querySelector('form .entry .buttons');
		
		    // Só adiciona se a div existir e ainda não tiver botão "Back"
		    if (buttonsDiv && !document.getElementById('back')) {
		      const backBtn = document.createElement('button');
		      backBtn.id = 'back';
		      backBtn.type = 'button'; // importante para não submeter o form
		      backBtn.innerText = 'Back';
		      backBtn.onclick = goBack;
		
		      // Estilo igual ao botão "Next", mas invertido
		      Object.assign(backBtn.style, {
		        padding: '10px',
		        width: '95%',
		        marginTop: '10px',
		        color: 'rgb(209, 0, 52)',
		        fontWeight: 'bold',
		        backgroundColor: 'white',
		        border: '2px solid rgb(209, 0, 52)',
		        borderRadius: '25px',
		        cursor: 'pointer',
		      });
		
		      // Adiciona ao fim da div.buttons (após o "Next")
		      buttonsDiv.appendChild(backBtn);
		
		      clearInterval(waitForButtonsDiv);
		    }
		  }
		
		  // Verifica a cada 300ms até encontrar a div.buttons
		  const waitForButtonsDiv = setInterval(insertBackButton, 300);
