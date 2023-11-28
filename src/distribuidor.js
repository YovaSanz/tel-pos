const btnSavedis = $('#btnSavedis');// Obtener referencia a botón por id
const alertSave = $('#alert');
const name = $('#name');
const direc = $('#direc');
const telefono = $('#telefono');
const codigo = $('#codigo');
const empresanombre = $('#empresanombre');
const empresadirec = $('#empresadirec');
const empresatele = $('#empresatele');
const celulares =$('#celulares');
const fundas =$('#fundas');
const bocinas=$('#bocinas');
const audifonos =$('#audifonos');
const micas =$('#micas');
const cargadores=$('#cargadores');
const otros =$('#otros');

const mySelect = $('#tabladis');
const paginationContainer = $('#pagination');


window.electronAPI.distriPull().then((data) => {
  data.sort((a, b) => b.id_dis - a.id_dis); //des a asc

  
  const itemsPerPage = 6; // Número de elementos por página

  function generateTable(pageData) { //funcion para la tabla y buscar
    let html = '';

    pageData.forEach((table) => {
      html += `<tr>` +
        `<td>${table.nombre}</td>` +
        `<td>${table.direccion}</td>` +
        `<td>${table.telefono}</td>` +
        `<td>${table.nombreem}</td>` +
        `<td>
         <button type="button" id="xds" class="btn icon" onclick ="updateRow(${table.id_dis})" data-toggle="tooltip" title="Actualizar">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#154360" class="bi bi-pencil-square" viewBox="0 0 16 16">
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
          </svg>
         </button>
         </td>` + 
        `<td>
         <button type="button" class="btn icon"  onclick = "deleteRow(${table.id_dis})" data-toggle="tooltip" title="Eliminar">  
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#154360" class="bi bi-trash2-fill" viewBox="0 0 16 16">
          <path d="M2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z"/>
          </svg>
         </button>
         </td>` +
      `</tr>`;

    });

    mySelect.innerHTML = `<table class="table table-hover mb-0 id="xd">
      <thead>
        <tr>
          <th>NOMBRE COMPLETO</th>
          <th>DIRECCIÓN</th>
          <th>TELÉFONO</th>
          <th>EMPRESA</th>
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
      table.nombre.toLowerCase().includes(searchTerm) ||
      table.nombreem.toLowerCase().includes(searchTerm)
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






//GUARDAR DISSS

let disInput = {};

function ocultarAlert(){
    alertSave.style.display = 'none';
}

function mostrarAlert(){
    alertSave.style.display = 'block';
}

function limpiarFormulario() {
  name.value = ''; 
  direc.value = '';
  telefono.value = '';
  codigo.value = '';
  empresanombre.value = '';
  empresadirec.value = '';
  empresatele.value = '';
  }

  

async function distribuidor() {
  disInput.nombre = name.value;
  disInput.direccion = direc.value;
  disInput.telefono = telefono.value;
  disInput.codigo = codigo.value;
  disInput.nombreem = empresanombre.value;
  disInput.direcem = empresadirec.value;
  disInput.teleem = empresatele.value;
  disInput.celulares = celulares.checked;
  disInput.fundas = fundas.checked;
  disInput.bocinas = bocinas.checked;
  disInput.audifonos = audifonos.checked;
  disInput.micas = micas.checked;
  disInput.cargadores = cargadores.checked;
  disInput.otros = otros.checked;

  // Validación de campos vacíos
  for (const prop in disInput) {
        if (disInput.hasOwnProperty(prop) && disInput[prop] === '') {
        mostrarAlert()
        setTimeout(ocultarAlert,90000);
        return; // Detiene la ejecución de la función si hay campos vacíos
        }
  }
  if (disInput.celulares || disInput.fundas || disInput.bocinas || disInput.audifonos || disInput.micas || disInput.cargadores || disInput.otros) {
        await window.electronAPI.distriSave(disInput);
        limpiarFormulario();
        location.reload();
       // console.log(reparaciones);
  }else {
    mostrarAlert();
  }

}



btnSavedis.addEventListener('click', (event) => {
  celulares.removeEventListener('change', distribuidor);
  fundas.removeEventListener('change', distribuidor);
  bocinas.removeEventListener('change', distribuidor);
  audifonos.removeEventListener('change', distribuidor);
  micas.removeEventListener('change', distribuidor);
  cargadores.removeEventListener('change', distribuidor);
  otros.removeEventListener('change', distribuidor);
  distribuidor();
});


name.addEventListener('keypress', (event) =>{
    if (event.keyCode === 13) {
        distribuidor();
    } 
})
direc.addEventListener('keypress', (event) =>{
    if (event.keyCode === 13) {
        distribuidor();
    } 
})
telefono.addEventListener('keypress', (event) =>{
    if (event.keyCode === 13) {
        distribuidor();
    } 
})
codigo.addEventListener('keypress', (event) =>{
    if (event.keyCode === 13) {
        distribuidor();
    } 
})
empresanombre.addEventListener('keypress', (event) =>{
    if (event.keyCode === 13) {
        distribuidor();
    } 
})
empresadirec.addEventListener('keypress', (event) =>{
    if (event.keyCode === 13) {
        distribuidor();
    } 
})
empresatele.addEventListener('keypress', (event) =>{
    if (event.keyCode === 13) {
        distribuidor();
    } 
})

