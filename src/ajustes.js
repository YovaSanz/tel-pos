
window.electronAPI.user().then((data) => {

    $('#imgUserCard').textContent = data.Nombrecompleto.charAt(0).toUpperCase();
    $('#nameUserCard').textContent = data.Nombrecompleto;
    if (data.nivel_usuario == 1) {
        $('#userUserCard').textContent = 'Administrador';
    } else {
        $('#userUserCard').textContent = 'Usuario';
    }

  
  }).catch((error) => {
    console.error(error);
  });