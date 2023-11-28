function updateRow(userId) {
  const modal = new bootstrap.Modal(document.getElementById('backdrop1'));
  const confirmButton = document.getElementById('btnSavedis1');
  confirmButton.dataset.userId = userId;

  // Obtener los datos del usuario por su ID antes de abrir la ventana modal
  window.electronAPI.getUserData(userId)
    .then((user) => {
      // Llenar los campos del formulario con los datos del usuario
      document.getElementById('nombre1').value = user.Nombrecompleto;
      document.getElementById('telefonos').value = user.Telefono;
      
      // Abrir la ventana modal después de obtener los datos del usuario
      modal.show();
    })
    .catch((error) => {
      console.error(error);
    });

  confirmButton.addEventListener('click', function () {
    // Resto del código para la actualización...
  });
}
