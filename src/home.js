const $ = selector => document.querySelector(selector);
const txtName = $('#txtName');
const avatarContent = $('.avatar-content');
let datosUsuario;
let nivelUsuario;
let nombreUsuario;

window.electronAPI.user().then((data) => {
  datosUsuario = data;
  nivelUsuario = data.nivel_usuario;
  nombreUsuario = data.Nombrecompleto;

  txtName.textContent = nombreUsuario;
  avatarContent.textContent = nombreUsuario.charAt(0).toUpperCase();

  
  if (!datosUsuario.caja && datosUsuario.caja !== 0 && window.location.href.includes('ventacontado.html')) {
      modalEntradaCaja.show();
  }

  //-----------------------------------------------------------------------

  console.log("el nivel de usuario es: " + nombreUsuario);
  const usuarios = document.getElementById('privilegio_admin');
  if (nivelUsuario === 1) {
    // Nivel de usuario 1 - muestra todos los elementos
    usuarios.style.display = 'block';
  } else {
    // Nivel de usuario 2 - muestra solo algunos elementos
    usuarios.style.display = 'none';
  }
//_-----------------------------------------------------------------------

}).catch((error) => {
  console.error(error);
});





const btnLogout = $('#btnLogout');// Obtener referencia a botón por id


function signOut() {
    window.electronAPI.signOut();
}
/*window.addEventListener('beforeunload', (event) => {
/    signOut();
});*/

btnLogout.addEventListener('click', (event) => {
    signOut();
});



