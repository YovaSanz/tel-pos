function generateTable(pageData) {
  let html = '';
  pageData.forEach((table) => {
    let nivel_usuarios;
    switch (table.nivel_usuario) {
      case 1:
        nivel_usuarios = 'Administrador';
        break;
      case 2:
        nivel_usuarios = 'Normal';
        break;
    }

    html += `<tr>` +
      `<td>${table.Nombrecompleto}</td>` +
      `<td>${table.Telefono}</td>` +
      `<td>${table.user}</td>` +
      `<td>${nivel_usuarios}</td>` +
      `<td><button class="btn btn-danger btn-delete" data-id="${table.id_usuario}">Eliminar</button></td>` + // Agregar botón de eliminación
      `</tr>`;
  });

  tableContainer.innerHTML = `<table class="table">
    <thead>
      <tr>
        <th>Nombre Completo</th>
        <th>Teléfono</th>
        <th>Usuario</th>
        <th>Nivel de Usuarios</th>
        <th>Acciones</th> // Agregar encabezado de acciones
      </tr>
    </thead>
    <tbody>${html}</tbody>
  </table>`;

  // Agregar evento click al botón de eliminación
  const deleteButtons = tableContainer.querySelectorAll('.btn-delete');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const userId = button.getAttribute('data-id');
      const confirmed = confirm('¿Estás seguro de eliminar este registro?');
    if (confirmed) {
      const index = data.findIndex((item) => item.id_usuario === userId);
      if (index !== -1) {
        data.splice(index, 1); // Eliminar el registro del array data
        // Aquí puedes realizar cualquier otra acción necesaria, como actualizar la tabla y la paginación
        generateTable(data.slice(0, itemsPerPage));
        generatePagination();
      }
    }
    });
  });
}
