const btnSavedis = $('#btnSavedis');// Obtener referencia a botón por id
const alertSave = $('#alert');
const fecha =$('#fecha')
const fecha1 =$('#fecha1')
const privilegio = $('#privilegio')
const nombre = $('#nombre');
const telefono = $('#telefono');
const usuario = $('#usuario');
const contraseña = $('#contraseña');


const mySelect = $('#tablausuarios');
const paginationContainer = $('#pagination')
window.electronAPI.userPull().then((data) => {
  data.sort((a, b) => b.id_usuario - a.id_usuario); //des a asc

  
  const itemsPerPage = 6; // Número de elementos por página

  function generateTable(pageData) { //funcion para la tabla y buscar
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
         `<td>
         <button type="button" id="xds" class="btn icon" onclick ="updateRow(${table.id_usuario})">
         <svg fill="none" height="27" viewBox="0 0 26 27" width="26" xmlns="http://www.w3.org/2000/svg"><path d="M20.5 10.9589V22.4112C20.5 23.905 19.3 25.1 17.8 25.1H4.2C2.7 25.1 1.5 23.905 1.5 22.4112V3.78878C1.5 2.295 2.7 1.09998 4.2 1.09998H17.8C19.3 1.09998 20.5 2.295 20.5 3.78878V4.98379V6.07923" stroke="#4F4F4F" stroke-miterlimit="10" stroke-width="2"/><path d="M4.7 8.07092H16.7" stroke="#4F4F4F" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/><path d="M4.7 13.0502H13" stroke="#4F4F4F" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/><path d="M4.7 18.129H8.5" stroke="#4F4F4F" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/><path d="M21.7 4.58547L10.9 16.4361L10.1 19.7224L13.3 18.627L24.1 6.77634C24.5 6.27842 24.5 5.58132 24.1 5.18298L23.3 4.48588C22.9 4.08754 22.1 4.18713 21.7 4.58547Z" stroke="#4F4F4F" stroke-miterlimit="10" stroke-width="2"/><path d="M20.5 5.97968L22.9 8.17054" stroke="#4F4F4F" stroke-miterlimit="10" stroke-width="2"/><path d="M10.9 16.5356L13.3 18.6269" stroke="#4F4F4F" stroke-miterlimit="10" stroke-width="2"/>
         </svg>
         </button>
         </td>` + 
         `<td>
         <button type="button" class="btn icon"  onclick = "deleteRow(${table.id_usuario})">
         <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;">
         <path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z"></path>
         </svg>
         </button>
         </td>` +
      `</tr>`;

    });

    mySelect.innerHTML = `<table class="table table-hover mb-0 id="xd">
      <thead>
        <tr>
          <th>NOMBRE</th>
          <th>TELÉFONO</th>
          <th>USUARIO</th>
          <th>PRIVILEGIOS</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>${html}</tbody>
    </table>`;

  }

  function generatePagination() { //funcion q genera la paginacion
  const totalPages = Math.ceil(data.length / itemsPerPage);
  let html = '';

  for (let i = 1; i <= totalPages; i++) {
    html += `<li class="page-item">
      <a class="page-link ${i === 1 ? 'bg-dark text-white' : 'bg-light'}" href="#" data-page="${i}">${i}</a>
    </li>`;
  }

  paginationContainer.innerHTML = html;

  const pageLinks = paginationContainer.querySelectorAll('.page-link');
  pageLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const pageNumber = parseInt(link.getAttribute('data-page'));
      const startIndex = (pageNumber - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const pageData = data.slice(startIndex, endIndex);
      generateTable(pageData);

      
      pageLinks.forEach((link) => {
        link.classList.remove('bg-dark', 'text-white');
        link.classList.add('bg-light');
      });

      // Asignar clases de color al botón seleccionado
      link.classList.remove('bg-light');
      link.classList.add('bg-dark', 'text-white');
    });
  });
  }


  // Función para realizar la búsqueda y actualizar la tabla
  function performSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const filteredData = data.filter((table) => {
      return (
        table.Nombrecompleto.toLowerCase().includes(searchTerm) ||
        table.user.toLowerCase().includes(searchTerm)
      );
    });

    generateTable(filteredData.slice(0, itemsPerPage));
    generatePagination();
  }

// Agregar evento input al campo de búsqueda
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', performSearch);

// Ejecutar la búsqueda inicial para mostrar todos los datos al cargar la página
   performSearch();


}).catch((error) => {
  console.error(error);
});





//-----GUARDA LOS DATOS DEL USUARIO-----------
let userInput = {};
//con esto se obtiene la fecha actual
const fechaActual= new Date();
const year = fechaActual.getFullYear();
const month = String(fechaActual.getMonth() + 1).padStart(2, '0');
const day = String(fechaActual.getDate()).padStart(2, '0');
const fechaFormateada= `${year}-${month}-${day}`;
const fechaUp = document.getElementById('fecha');
fechaUp.value = fechaFormateada;


// Función para formatear un número agregando un cero inicial si es necesario
function formatearNumero(numero) {
  return numero < 10 ? `0${numero}` : numero;
}

// Deshabilitar la edición de los campos de entrada de hora y fecha
fecha.readOnly = true;
fecha1.readOnly = true;


function ocultarAlert(){
    alertSave.style.display = 'none';
}

function mostrarAlert(){
    alertSave.style.display = 'block';
}

function limpiarFormulario() {
    nombre.value = '';
    telefono.value = '';
    usuario.value = '';
    contraseña.value = '';
  }

async function usuarios() {
    userInput.Nombrecompleto = nombre.value;
    userInput.Telefono = telefono.value;
    userInput.user = usuario.value;
    userInput.password = contraseña.value;
    userInput.fechaderegistro = fecha.value;
    userInput.nivel_usuario = privilegio.value;
    


 
 // Validación de campos vacíos
    for (const prop in userInput) {
        if (userInput.hasOwnProperty(prop) && userInput[prop] === '') {
        mostrarAlert()
        setTimeout(ocultarAlert,90000);
        return; // Detiene la ejecución de la función si hay campos vacíos
        }
    }

    if (userInput) {
        await window.electronAPI.userSave(userInput);
        limpiarFormulario();
        location.reload();
       // console.log(reparaciones);
    }
}


//funcion del boton
btnSavedis.addEventListener('click', (event)=>{
    usuarios();
});

//los campos input funcion


fecha.addEventListener('keypress', (event) =>{
    if (event.keyCode === 13) {
        usuarios();
    } 
})

privilegio.addEventListener('change', (event) =>{
    if (event.keyCode === 13) {
        usuarios();
    } 
})

nombre.addEventListener('keypress', (event) =>{
    if (event.keyCode === 13) {
        usuarios();
    } 
})

telefono.addEventListener('keypress', (event) =>{
    if (event.keyCode === 13) {
        usuarios();
    } 
})


usuario.addEventListener('keypress', (event) =>{
    if (event.keyCode === 13) {
        usuarios();
    } 
})

contraseña.addEventListener('keypress', (event) =>{
    if (event.keyCode === 13) {
        usuarios();
    } 
})
