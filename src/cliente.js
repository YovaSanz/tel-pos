
const mySelect = $('#tabla');
const paginationContainer = $('#pagination');

const btnNewClient = $('#btnNewClient');
const btnSaveCLie = $('#btnSaveCLie');
const btnCloseSaveClient = $('#btnCloseSaveClient');

const btnSaveEditClie = $('#btnSaveEditClie');
const btnCloseEditClient = $('#btnCloseEditClient');


const modalSaveClie = new bootstrap.Modal(document.getElementById('saveClie'));
const modal = new bootstrap.Modal(document.getElementById('editClient'));

const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModales'));

tbClientes();
function tbClientes() {
  window.electronAPI.clientePull().then((data) => {
  
  
    const itemsPerPage = 9;
  
    function generateTable(data) {
  
      let html = '';
    //La variable "data" es un array que tiene todos los datos de los distribuidores
      data.forEach(table => {
        html = html +  `<tr id="${table.id_cli}">` +
        `<td value="${table.id_cli}">${table.id_cli}</td>` +
        `<td value="${table.id_cli}"><span>${table.nombre}</span> <span>${table.apellidos}</span></td>`
        +
        `<td value="${table.id_cli}">${table.direccion}</td>`
        +
        `<td value="${table.id_cli}">${table.tel}</td>` 
        +
        `<td class="px-0 mx-0">
          <button type="button" class="btn icon mx-4" onclick ="updateRow('${table.id_cli}')">
          <svg fill="none" height="27" viewBox="0 0 26 27" width="26" xmlns="http://www.w3.org/2000/svg"><path d="M20.5 10.9589V22.4112C20.5 23.905 19.3 25.1 17.8 25.1H4.2C2.7 25.1 1.5 23.905 1.5 22.4112V3.78878C1.5 2.295 2.7 1.09998 4.2 1.09998H17.8C19.3 1.09998 20.5 2.295 20.5 3.78878V4.98379V6.07923" stroke="#4F4F4F" stroke-miterlimit="10" stroke-width="2"/><path d="M4.7 8.07092H16.7" stroke="#4F4F4F" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/><path d="M4.7 13.0502H13" stroke="#4F4F4F" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/><path d="M4.7 18.129H8.5" stroke="#4F4F4F" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/><path d="M21.7 4.58547L10.9 16.4361L10.1 19.7224L13.3 18.627L24.1 6.77634C24.5 6.27842 24.5 5.58132 24.1 5.18298L23.3 4.48588C22.9 4.08754 22.1 4.18713 21.7 4.58547Z" stroke="#4F4F4F" stroke-miterlimit="10" stroke-width="2"/><path d="M20.5 5.97968L22.9 8.17054" stroke="#4F4F4F" stroke-miterlimit="10" stroke-width="2"/><path d="M10.9 16.5356L13.3 18.6269" stroke="#4F4F4F" stroke-miterlimit="10" stroke-width="2"/>
          </svg>
          </button>
        </td>`+
        `<td class="pl-0 ml-0">
          <button type="button" class="btn icon ml-4"  onclick = "deleteRow('${table.id_cli}')">
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;">
          <path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z"></path>
          </svg>
          </button>
        </td>`+
        `<tr>`; 
        // en esta linea se insertan los elementos
      });
  
  
      mySelect.innerHTML = `<table class="table table-hover mb-0 id=">
        <thead class="pt-0 mt-0">
          <tr>
            <th>ID</th>
            <th>Nombre completo</th>
            <th>Dirección</th>
            <th>Teléfono</th>
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
          table.apellidos.toLowerCase().includes(searchTerm)
        );
      });
  
      generateTable(filteredData.slice(0, itemsPerPage));
      generatePagination();
    }
  
    // Agregar evento input al campo de búsqueda
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', performSearch);
  
  
    performSearch(data) 
  
  
  }).catch((error) => {
    console.error(error);
  });
}


async function saveClie() {
  let cliInput = {};

  cliInput.nombre = $('#nombreInfoCliCompra').value;
  cliInput.apellidos = $('#apellidosInfoCliCompra').value;
  cliInput.direccion = $('#direccionInfoCliCompra').valu;
  cliInput.tel = $('#telefonoInfoCliCompra').value;

     for (const prop in cliInput) {
        if (cliInput.hasOwnProperty(prop) && cliInput[prop] === '') {
        $('#alertNewCliente').classList.remove('d-none');
        setTimeout(()=>{
          $('#alertNewCliente').classList.add('d-none');
        },3000);
        return; // Detiene la ejecución de la función si hay campos vacíos
        }
    }

    if (cliInput.nombre || cliInput.apellidos || cliInput.direccion || cliInput.tel) {
      await window.electronAPI.clienteSave(cliInput).then((result) => {
        if (result) {

          tbClientes();
          modalSaveClie.hide()
          
          $('#alertConfirmarSaveCliente').classList.remove('d-none');
          setTimeout(()=>{
            $('#alertConfirmarSaveCliente').classList.add('d-none');
          },3000);
          limpiarFormularioEdit();
        }
      }).catch((err) => {
        alert('Error al Actualizar el Cliente: \n', err)
      });
      //location.reload();
     // console.log(reparaciones);
    }else {
      $('#alertNewCliente').classList.remove('d-none');
      setTimeout(()=>{
        $('#alertNewCliente').classList.add('d-none');
      },3000);
    }

}

btnNewClient.addEventListener('click',()=>{
  modalSaveClie.show();
})

function limpiarFormularioSave() {
  $('#nombreInfoCliCompra').value = '';
  $('#apellidosInfoCliCompra').value = '';
  $('#telefonoInfoCliCompra').value = '';
  $('#direccionInfoCliCompra').value = '';
}

btnSaveCLie.addEventListener('click',()=>{
  saveClie()
})

btnCloseSaveClient.addEventListener('click',()=>{
  modalSaveClie.hide();
  limpiarFormularioSave();
})

/*==============*/
function limpiarFormularioEdit() {
  $('#idEditCliCompra').value = '';
  $('#nombreEditCliCompra').value = '';
  $('#apellidosEditCliCompra').value = '';
  $('#direccionEditCliCompra').value = '';
  $('#telefonoEditCliCompra').value = '';
}

function updateRow(id_cli) {
  const cliente = document.getElementById(id_cli).getElementsByTagName('td');

  $('#idEditCliCompra').value = cliente[0].innerText;
  $('#nombreEditCliCompra').value = cliente[1].getElementsByTagName('span')[0].innerText;
  $('#apellidosEditCliCompra').value = cliente[1].getElementsByTagName('span')[1].innerText;
  $('#direccionEditCliCompra').value = cliente[2].innerText;
  $('#telefonoEditCliCompra').value = cliente[3].innerText;

  modal.show();
}

btnCloseEditClient.addEventListener('click',()=>{
  limpiarFormularioEdit();
  modal.hide();
})

async function saveEditClie() {
  let cliInput = {};
  cliInput.id_cli = $('#idEditCliCompra').value;
  cliInput.nombre = $('#nombreEditCliCompra').value;
  cliInput.apellidos = $('#apellidosEditCliCompra').value;
  cliInput.direccion = $('#direccionEditCliCompra').value;
  cliInput.tel = $('#telefonoEditCliCompra').value;
  
  
  // Validación de campos vacíos
   for (const prop in cliInput) {
     if (cliInput.hasOwnProperty(prop) && cliInput[prop] === '') {
        $('#alertEditCliente').classList.remove('d-none');
        setTimeout(()=>{
          $('#alertEditCliente').classList.add('d-none');
        },3000);
        return; // Detiene la ejecución de la función si hay campos vacíos
        }
    }
    
    if (cliInput.nombre || cliInput.apellidos || cliInput.direccion || cliInput.tel) {
      await window.electronAPI.clienteUpdate(cliInput).then((result) => {
        if (result) {
          const cliente = document.getElementById(cliInput.id_cli).getElementsByTagName('td');

          /*
          cliente[1].getElementsByTagName('span')[0].innerText = $('#nombreEditCliCompra').value;
          cliente[1].getElementsByTagName('span')[1].innerText = $('#apellidosEditCliCompra').value;
          cliente[2].innerText = $('#direccionEditCliCompra').value;
          cliente[3].innerText = $('#telefonoEditCliCompra').value;
          */

          tbClientes();

          $('#alertConfirmarEditCliente').classList.remove('d-none');

          setTimeout(()=>{
            $('#alertConfirmarEditCliente').classList.add('d-none');
          },3000);
          limpiarFormularioEdit();
          modal.hide();
        }
      }).catch((err) => {
        alert('Error al Actualizar el Cliente: \n', err)
      });
      //location.reload();
     // console.log(reparaciones);
    }else {
      $('#alertEditCliente').classList.remove('d-none');
      setTimeout(()=>{
        $('#alertEditCliente').classList.add('d-none');
      },3000);
    }
}

btnSaveEditClie.addEventListener('click',()=>{
  saveEditClie();
})


/*==============*/
function deleteRow(id_cli) {
  const confirmButton = document.getElementById('confirmButton');
  confirmButton.dataset.disId = id_cli;
  
  // Abrir la ventana modal
  confirmationModal.show();
  
  window.electronAPI.clienteDelete(id_cli);
  
  
  confirmButton.addEventListener('click', function () {
    // Obtener el userId del atributo data
    window.electronAPI.clienteDelete(id_cli)
    
    // Recargar la página principal
      tbClientes();
      confirmationModal.hide();

  });

} 