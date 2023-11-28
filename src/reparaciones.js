const inputBusqueda = document.getElementById('clisearch');
const inputBusquedas = document.getElementById('clisearch2');
const nombre = document.getElementById('nombre');
const nombre2 = document.getElementById('nombre2');
const btnSavedis = $('#Saverepa'); // Obtener referencia a botón por id
const alertSave = $('#alert');
const fecha = $('#fecha')
const fecha2 = $('#fecha2')
const hora = $('#hora');
const hora2 = $('#hora2');
const contacto = $('#contacto');
const correo = $('#correo');
const coddesblo = $('#codigoDesbloqueo');
const marcaomodelo = $('#marcaModelo');
const accesorios = $('#accesorios');
const imei = $('#imei');
const recibido = $('#recibidoPor');
const recibidos = $('#recibidoPor2');
const costoestimado = $('#costo');
const falla = $('#fallaDescripcion');
const motivo = $('#motivo')
const estado = $("#estadoEquipo")
const presupuesto = $("#presupuesto")
const mySelect = $('#tablarepa');
const paginationContainer = $('#paginations')
// Llama a la función clientePull() para obtener los datos de los clientes
window.electronAPI.clientePull().then((data) => {
    data.sort((a, b) => b.id_cli - a.id_cli);
    data.forEach(element => {
        const option = document.createElement('option');
        option.value = `${element.nombre} ${element.apellidos}`;
        option.text = `${element.nombre} ${element.apellidos}`;
        inputBusqueda.appendChild(option);
    });
    data.forEach(element => {
        const option = document.createElement('option');
        option.value = `${element.nombre} ${element.apellidos}`;
        option.text = `${element.nombre} ${element.apellidos}`;
        inputBusquedas.appendChild(option);
    });
    inputBusqueda.addEventListener('input', function() {
        const clienteSeleccionado = this.value;
        nombre.value = clienteSeleccionado;
    });
    inputBusquedas.addEventListener('input', function() {
        const clienteSeleccionado = this.value;
        nombre2.value = clienteSeleccionado;
    });
}).catch((error) => {
    console.error(error);
});
// Llama a la funcion de usuario para traer los nombres
window.electronAPI.userPull().then((data) => {
    data.sort((a, b) => b.id_usuario - a.id_usuario);
    data.forEach(element => {
        recibido.innerHTML = recibido.innerHTML + `<option value="${element.Nombrecompleto}">
    ${element.Nombrecompleto}</option>`;
    });
    data.forEach(element => {
        recibidos.innerHTML = recibidos.innerHTML + `<option value="${element.Nombrecompleto}">
    ${element.Nombrecompleto}</option>`;
    });
}).catch((error) => {
    console.error(error);
});
//listar 
window.electronAPI.reparaPull().then((data) => {
    data.sort((a, b) => b.id_repa - a.id_repa); //des a asc
    const itemsPerPage = 6; // Número de elementos por página
    function generateTable(pageData) { //funcion para la tabla y buscar
        let html = '';
        pageData.forEach((table) => {
            html += `<tr>` + `<td>${table.nombre}</td>` + `<td>${table.marcaomodelo}</td>` + `<td>${table.motivo}</td>` + `<td>${table.estado}</td>` + `<td>${table.presupuesto}</td>` + `<td>
         <button type="button" class="btn icon"  onclick = "deleteRow(${table.id_repa})">  
          <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" version="1.1" viewBox="0 0 32 32">
            <circle style="fill:#252a35" cx="16" cy="16" r="14"/>
            <g transform="matrix(0.70710678,0.70710678,-0.70710678,0.70710678,16,-6.627417)">
            <rect style="fill:#ffffff" width="4" height="20" x="-18" y="6" transform="matrix(0,-1,1,0,0,0)"/>
            <rect style="fill:#ffffff" width="4" height="20" x="14" y="6"/>
            </g>
          </svg>
         </button>
         </td>` + `<td>
         <button type="button" id="xds" class="btn icon" onclick ="updateRow(${table.id_repa})">
         <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" version="1.1" viewBox="0 0 32 32">
          <circle style="fill:#252a35" cx="16" cy="16" r="14"/>
          <path style="fill:#ffffff" d="m 16.0179,7.0002286 c 1.8938,0.004 3.8141,0.59437 5.3141,1.7626 1.0545,1.2148 -0.95476,2.5158004 -1.8597,1.3312004 -2.7242,-1.6483004 -6.5662,-1.0680004 -8.6158,1.3964 -1.0905,1.223 -1.7049,2.8549 -1.6977,4.4932 l 1.8003,0 c -0.96,1.440998 -1.9202,2.880998 -2.8803,4.320998 -0.9602,-1.44 -1.9203,-2.88 -2.8805,-4.319998 l 1.8003,0 c -0.0573,-3.912 2.756,-7.6331004 6.5325,-8.6462004 0.811,-0.2221 1.646,-0.3465 2.487,-0.3378 z m 7.9033,4.6808004 c 0.96016,1.4402 1.9203,2.8805 2.8805,4.320697 l -1.8003,0 c 0.051,3.958501 -2.8341,7.721301 -6.6772,8.681001 -2.5933,0.72418 -5.5256,0.19575 -7.657,-1.4611 -1.0874,-1.235 0.94976,-2.5235 1.8631,-1.3282 2.6394,1.6014 6.3356,1.0935 8.419,-1.1937 1.2066,-1.2432 1.901,-2.9653 1.8917,-4.698001 l -1.8003,0 c 0.96016,-1.440197 1.9203,-2.880497 2.8805,-4.320697 z"/>
         </svg>
         </button>
         </td>` + `</tr>`;
        });
        mySelect.innerHTML = `<table class="table table-hover mb-0 id="xd">
      <thead>
        <tr>
          <th>CLIENTE</th>
          <th>MARCA Y/O MODELO</th>
          <th>MOTIVO</th>
          <th>ESTADO</th>
          <th>COSTO ESTIMADO</th>
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
            return (table.nombre.toLowerCase().includes(searchTerm) || table.marcaomodelo.toLowerCase().includes(searchTerm));
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
//guardar
let disInput = {};

function ocultarAlert() {
    alertSave.style.display = 'none';
}

function mostrarAlert() {
    alertSave.style.display = 'block';
}

function limpiarFormulario() {
    nombre.value = '';
    contacto.value = '';
    correo.value = '';
    motivo.value = '';
    marcaomodelo.value = '';
    coddesblo.value = '';
    accesorios.value = '';
    imei.value = '';
    recibido.value = '';
    estado.value = '';
    costoestimado.value = '';
    falla.value = '';
    presupuesto.value = '';
    inputBusqueda.value = '';
}
async function reparaciones() {
    disInput.fecha = fecha.value;
    disInput.hora = hora.value;
    disInput.nombre = nombre.value;
    disInput.contacto = contacto.value;
    disInput.correo = correo.value;
    disInput.motivo = motivo.value;
    disInput.coddesblo = coddesblo.value;
    disInput.marcaomodelo = marcaomodelo.value;
    disInput.accesorio = accesorios.value;
    disInput.imei = imei.value;
    disInput.recibido = recibido.value;
    disInput.costoestimado = costoestimado.value;
    disInput.falla = falla.value;
    disInput.estado = estado.value;
    disInput.presupuesto = presupuesto.value;
    // Validación de campos vacíos
    for (const prop in disInput) {
        if (disInput.hasOwnProperty(prop) && disInput[prop] === '') {
            mostrarAlert()
            setTimeout(ocultarAlert, 10000);
            return; // Detiene la ejecución de la función si hay campos vacíos
        }
    }
    const descripcionValue = falla.value.trim();
    if (descripcionValue === '') {
        mostrarAlert()
        // Mostrar un mensaje de error o realizar alguna acción para indicar que el campo está vacío
        console.log('El campo de descripción está vacío');
        return;
    }
    if (disInput) {
        await window.electronAPI.reparaSave(disInput);
        limpiarFormulario();
        location.reload();
        // console.log(reparaciones);
    }
}
//con esto se obtiene la fecha actual
const fechaActual = new Date();
const year = fechaActual.getFullYear();
const month = String(fechaActual.getMonth() + 1).padStart(2, '0');
const day = String(fechaActual.getDate()).padStart(2, '0');
const fechaFormateada = `${year}-${month}-${day}`;
const fechaUp = document.getElementById('fecha');
fechaUp.value = fechaFormateada;
// Función para formatear un número agregando un cero inicial si es necesario
function formatearNumero(numero) {
    return numero < 10 ? `0${numero}` : numero;
}
// Actualizar la hora actual en el campo de entrada de hora
function actualizarHora() {
    const horaActual = new Date();
    const horaFormateada = `${formatearNumero(horaActual.getHours())}:${formatearNumero(
    horaActual.getMinutes()
  )}`;
    hora.value = horaFormateada;
}
// Actualizar la hora inicial
actualizarHora();
// Actualizar la hora cada segundo
setInterval(actualizarHora, 1000);
// Deshabilitar la edición de los campos de entrada de hora y fecha
fecha.readOnly = true;
hora.readOnly = true;
fecha2.readOnly = true;
hora2.readOnly = true;
//funcion del boton
btnSavedis.addEventListener('click', (event) => {
    reparaciones();
});
//los campos input funcion
fecha.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
        reparaciones();
    }
})
hora.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
        reparaciones();
    }
})
nombre.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
        reparaciones();
    }
})
contacto.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
        reparaciones();
    }
})
correo.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
        reparaciones();
    }
})
coddesblo.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
        reparaciones();
    }
})
marcaomodelo.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
        reparaciones();
    }
})
accesorios.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
        reparaciones();
    }
})
imei.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
        reparaciones();
    }
})
recibido.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
        reparaciones();
    }
})
costoestimado.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
        reparaciones();
    }
})
falla.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
        reparaciones();
    }
})
motivo.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
        reparaciones();
    }
})
estado.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
        reparaciones();
    }
})
presupuesto.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
        reparaciones();
    }
})