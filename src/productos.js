const mySelect = document.getElementById('mySelect'); // Elemento select original
const mySelect2 = document.getElementById('mySelect2');
const btnSavedis = $('#btnSavedis');
const alertSave = $('#alert');
const mySelect3 = $('#garantia');
const codigo = $('#codigo');
const modelo = $('#modelo');
const marca = $('#marca');
const stock = $('#stock');
const descuento = $('#descuento');
const preciocompra = $('#preciocompra');
const precioventa = $('#precioventa');
const descripcion = $('#descripcion');


window.electronAPI.distriPull().then((data) => {
    data.sort((a, b) => b.id_dis - a.id_dis);
    data.forEach(element => {
        mySelect.innerHTML += `<option value="${element.nombre}">${element.nombre}</option>`;
    });

    mySelect.addEventListener('change', (event) => {
        const selectedDistributor = event.target.value;
        // Buscar el distribuidor seleccionado en los datos
        const selectedData = data.find(element => element.nombre === selectedDistributor);
        if (selectedData) {
            // Limpiar opciones anteriores en mySelect2
            mySelect2.innerHTML = "";
            console.log(selectedData);
            // Agregar opciones de los artículos abastecidos por el distribuidor seleccionado
            if (selectedData.celulares === 1) {
                mySelect2.innerHTML += `<option value="celulares">Celulares</option>`;
            }
            if (selectedData.fundas === 1) {
                mySelect2.innerHTML += `<option value="fundas">Fundas</option>`;
            }
            if (selectedData.bocinas === 1) {
                mySelect2.innerHTML += `<option value="bocinas">Bocinas</option>`;
            }
            if (selectedData.audifonos === 1) {
                mySelect2.innerHTML += `<option value="audifonos">Audifonos</option>`;
            }
            if (selectedData.micas === 1) {
                mySelect2.innerHTML += `<option value="micas">Micas</option>`;
            }
            if (selectedData.cargadores === 1) {
                mySelect2.innerHTML += `<option value="cargadores">Cargadores</option>`;
            }
            if (selectedData.otros === 1) {
                mySelect2.innerHTML += `<option value="otros">Otros</option>`;
            }
        } else {
            // Si no se selecciona ningún distribuidor, limpiar los campos y mostrar un mensaje
            mySelect2.innerHTML = `<option value="" disabled selected>Seleccione...</option>`;
        }
    });
    
}).catch((error) => {
    console.error(error);
});


///GUARDAR PRODUCTOS!!!
let proInput = {};

function ocultarAlert() {
    alertSave.style.display = 'none';
}

function mostrarAlert() {
    alertSave.style.display = 'block';
}

function limpiarFormulario() {
    mySelect.value = '';
    mySelect2.value = '';
    mySelect3.value = '';
    codigo.value = '';
    modelo.value = '';
    marca.value = '';
    stock.value = '';
    //descuento.value = '';
    preciocompra.value = '';
    precioventa.value = '';
    descripcion.value = '';
}

async function productos() {

    // Validación de campos vacíos
    for (const prop in proInput) {
        if (proInput.hasOwnProperty(prop) && proInput[prop] === '') {
            if (!proInput.update) {
                mostrarAlert()

                await new Promise(resolve => setTimeout(resolve, 4000));
                ocultarAlert;
            }else{
                $('#alertUpdateProduct').style.display = 'block';

                await new Promise(resolve => setTimeout(resolve, 4000));
                $('#alertUpdateProduct').style.display = 'none';
            }
            return; // Detiene la ejecución de la función si hay campos vacíos
        }
    }
    // Verificar si el código ya ha sido utilizado
    const codigoExistente = await verificarCodigoExistente(proInput.codigo);

    if (codigoExistente) {
        if (!proInput.update) {
            const codigoAlert = document.getElementById('codigoAlert');
            codigoAlert.style.display = 'block';
            await new Promise(resolve => setTimeout(resolve, 4000));
            codigoAlert.style.display = 'none';
            return;
        } 
        if (!(proInput.id_product == codigoExistente.id_product)) {
            const codigoAlertStock = document.getElementById('codigoAlertStock');
            codigoAlertStock.style.display = 'block';
            await new Promise(resolve => setTimeout(resolve, 4000));
            codigoAlertStock.style.display = 'none';
            return;
        }
    }
    if (proInput.descripcion === '') {
        if (!proInput.update) {
            mostrarAlert()

            await new Promise(resolve => setTimeout(resolve, 4000));
            ocultarAlert;
        }else{
            $('#alertUpdateProduct').style.display = 'block';
            await new Promise(resolve => setTimeout(resolve, 4000));
            $('#alertUpdateProduct').style.display = 'none';
        }
        // Mostrar un mensaje de error o realizar alguna acción para indicar que el campo está vacío
        console.log('El campo de descripción está vacío');
        return;
    }
    if (proInput) {
        if (!proInput.update) {
            await window.electronAPI.productSave(proInput);
            limpiarFormulario();
            //location.reload();

        } else{
            await window.electronAPI.productUptade(proInput);
            limpiarFormularioUptade();
        }
        return true;
    }
}

async function verificarCodigoExistente(codigo) {
    const productosExistentes = await window.electronAPI.productoSearch({codigo: codigo});
    return productosExistentes;
}

async function validarCodigoExistentes() {
    const codigoInput = document.getElementById('codigo');
    const codigoAlert = document.getElementById('codigoAlert');
    codigoAlert.style.display = 'none';
    // Verificar si el código ya existe
    const codigoExistente = await verificarCodigoExistente(codigoInput.value);
    if (codigoExistente) {
        codigoAlert.style.display = 'block';
        await new Promise(resolve => setTimeout(resolve, 2000));
        codigoAlert.style.display = 'none', 1900;
    }
}

async function validarCodigoExistenteUpdate() {
    const codigoInput = document.getElementById('codigoUpdate');
    const codigoAlert = document.getElementById('codigoAlertStock');
    codigoAlert.style.display = 'none';
    // Verificar si el código ya existe
    const codigoExistente = await verificarCodigoExistente(codigoInput.value);
    if (codigoExistente) {
        codigoAlert.style.display = 'block';
        await new Promise(resolve => setTimeout(resolve, 2000));
        codigoAlert.style.display = 'none';
    }
}

btnSavedis.addEventListener('click', async (event) => {
    proInput.distribuidor = mySelect.value;
    proInput.articulos = mySelect2.value;
    proInput.garantia = mySelect3.value;
    proInput.codigo = codigo.value;
    proInput.modelo = modelo.value;
    proInput.marca = marca.value;
    proInput.stock = stock.value;
    proInput.descuento = 0;
    proInput.preciocompra = preciocompra.value;
    proInput.precioventa = precioventa.value;
    proInput.descripcion = descripcion.value;

    proInput.update = false;

    if (await productos()) {

        productos();
        $('#alertConfirmarSaveProduct').classList.remove('d-none');
 
        setTimeout(()=>{
            $('#alertConfirmarSaveProduct').classList.add('d-none');
        },3000);
    }
    
});





const tablapro = $('#tablapro');

const paginationContainer = $('#pagination');


tbProductos();

function tbProductos() {
    window.electronAPI.productoPull().then((data) => {
      data.sort((a, b) => b.id_dis - a.id_dis); //des a asc
    
      const itemsPerPage = 6; // Número de elementos por página
    
      function generateTable(pageData) { //funcion para la tabla y buscar
        let html = '';
    
        pageData.forEach((table) => {
          html += `<tr id="${table.id_product}">` +
            `<td class="text-center">${table.codigo}</td>` +
            `<td class="px-1 text-center">${table.articulos}</td>` +
            `<td><span>${table.marca}</span> <span>${table.modelo}</span> <span>${table.descripcion}</span></td>` +
            `<td class="px-1 text-center"><button class="btn btn-outline-primary" onclick ="updateStock('${table.id_product}')">${table.stock}</button></td>` +
            `<td class="text-center">$ ${table.precioventa}</td>` +
            `<td>${table.distribuidor}</td>` +
            `<td class="px-0">
             <button type="button" class="btn icon" onclick ="updateRow('${table.id_product}')" data-toggle="tooltip" title="Actualizar">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#154360" class="bi bi-pencil-square" viewBox="0 0 16 16">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
              </svg>
             </button>
             </td>` +
            `<td class="px-0">
             <button type="button" class="btn icon"  onclick = "deleteRow('${table.id_product}')" data-toggle="tooltip" title="Eliminar">  
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#154360" class="bi bi-trash2-fill" viewBox="0 0 16 16">
              <path d="M2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z"/>
              </svg>
             </button>
             </td>` +
          `</tr>`;
    
        });
    
        tablapro.innerHTML = `<table class="table table-hover mb-0 id="xd">
          <thead>
            <tr>
              <th class="text-center">CODIGO</th>
              <th class="px-1 text-center">ARTICULOS</th>
              <th>DESCRIPCIÓN</th>
              <th class="px-1 text-center">STOCK</th>
              <th class="mx-5 px-5">PRECIO</th>
              <th>DISTRIBUIDOR</th>
              <th></th>
              <th class="p-0"></th>
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
          table.codigo.toLowerCase().includes(searchTerm) ||
          table.articulos.toLowerCase().includes(searchTerm) ||
          table.distribuidor.toLowerCase().includes(searchTerm) ||
          table.marca.toLowerCase().includes(searchTerm)
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
}




const stockUpdate = new bootstrap.Modal(document.getElementById('stockUpdate'));
const btnAceptarUpdateStock = $('#btnAceptarUpdateStock');


function updateStock (proId) {
    const product = document.getElementById(proId).getElementsByTagName('td');

    $('#h5CodigoStock').innerText = product[0].innerText;
    $('#h5MarcaStock').innerText = product[2].getElementsByTagName('span')[0].innerText;
    $('#h5ModeloStock').innerText = product[2].getElementsByTagName('span')[1].innerText;
    $('#h5DescStock').innerText = product[2].getElementsByTagName('span')[2].innerText;
    $('#h5ArticuloStock').innerText = product[1].innerText;
    $('#inputUpdateStock').value = product[3].getElementsByTagName('button')[0].innerText;
    $('#h5StockMinimo').innerText = 0;

    stockUpdate.show();
    btnAceptarUpdateStock.addEventListener('click',()=>{
        const inputProduct = {
            id_product: proId,
            stock: $('#inputUpdateStock').value,
        }

        if (window.electronAPI.productStock(inputProduct)) {
            product[3].getElementsByTagName('button')[0].innerText = inputProduct.stock;

            stockUpdate.hide();

            $('#alertConfirmarSave').classList.remove('d-none');
            setTimeout(()=>{
                $('#alertConfirmarSave').classList.add('d-none');
            },3000);
        }
    })
    $('#inputUpdateStock').addEventListener('keypress',(event)=>{
        if (event.keyCode === 13) {
            const inputProduct = {
                id_product: proId,
                stock: $('#inputUpdateStock').value,
            }
    
            if (window.electronAPI.productStock(inputProduct)) {
                product[3].getElementsByTagName('button')[0].innerText = inputProduct.stock;
    
                stockUpdate.hide();
    
                $('#alertConfirmarSave').classList.remove('d-none');
                setTimeout(()=>{
                    $('#alertConfirmarSave').classList.add('d-none');
                },3000);
            }
        }
    })
}




const codigoUpdate = $('#codigoUpdate');
const inputStockUpdate = $('#inputStockUpdate');
const modeloUpdate = $('#modeloUpdate');
const marcaUpdate = $('#marcaUpdate');
const descuentoUpdate = $('#descuentoUpdate');
const preciocompraUpdate = $('#preciocompraUpdate');
const precioventaUpdate = $('#precioventaUpdate');
const descripcionUpdate = $('#descripcionUpdate');



const selectDisUpdate = $('#selectDisUpdate');
const selectArtiUpdate = $('#selectArtiUpdate');
const garantiaUpdate = $('#garantiaUpdate');



let inputProUpdate = {};
// Función para actualizar el registro
async function updateRow(proId){
    const ventanaUpdateP = new bootstrap.Modal(document.getElementById('ventanaUpdateP'));
    const productRow = document.getElementById(proId).getElementsByTagName('td');

    document.getElementById('codigoAlertStock').style.display = 'none';

    const product = await window.electronAPI.productoSearch({codigo: productRow[0].innerText})

    await window.electronAPI.distriPull().then((data) => {
        data.sort((a, b) => b.id_dis - a.id_dis);
        data.forEach(element => {
            selectDisUpdate.innerHTML += `<option value="${element.nombre}">${element.nombre}</option>`;
        });
        selectDisUpdate.addEventListener('change', (event) => {
            const selectedDistributor = event.target.value;
            selectDisU(selectedDistributor);
        });

        function selectDisU(selectedDistributor) {
            // Buscar el distribuidor seleccionado en los datos
            const selectedData = data.find(element => element.nombre === selectedDistributor);
            if (selectedData) {
                // Limpiar opciones anteriores en mySelect2
                selectArtiUpdate.innerHTML = "";
                // Agregar opciones de los artículos abastecidos por el distribuidor seleccionado
                if (selectedData.celulares === 1) {
                    selectArtiUpdate.innerHTML += `<option value="celulares">Celulares</option>`;
                }
                if (selectedData.fundas === 1) {
                    selectArtiUpdate.innerHTML += `<option value="fundas">Fundas</option>`;
                }
                if (selectedData.bocinas === 1) {
                    selectArtiUpdate.innerHTML += `<option value="bocinas">Bocinas</option>`;
                }
                if (selectedData.audifonos === 1) {
                    selectArtiUpdate.innerHTML += `<option value="audifonos">Audifonos</option>`;
                }
                if (selectedData.micas === 1) {
                    selectArtiUpdate.innerHTML += `<option value="micas">Micas</option>`;
                }
                if (selectedData.cargadores === 1) {
                    selectArtiUpdate.innerHTML += `<option value="cargadores">Cargadores</option>`;
                }
                if (selectedData.otros === 1) {
                    selectArtiUpdate.innerHTML += `<option value="otros">Otros</option>`;
                }
            } else {
                // Si no se selecciona ningún distribuidor, limpiar los campos y mostrar un mensaje
                selectArtiUpdate.innerHTML = `<option value="" disabled selected>Seleccione...</option>`;
            }
        }

        selectDisU(product.distribuidor);
        
        selectDisUpdate.value = product.distribuidor;
        selectArtiUpdate.value = product.articulos;
    }).catch((error) => {
        console.error(error);
    });

    console.log(product);

    codigoUpdate.value = product.codigo;
    inputStockUpdate.value = product.stock;
    modeloUpdate.value = product.modelo;
    marcaUpdate.value = product.marca;
    descuentoUpdate.value = product.descuento;
    preciocompraUpdate.value = product.preciocompra;
    precioventaUpdate.value = product.precioventa;
    descripcionUpdate.value = product.descripcion;
    garantiaUpdate.value = product.garantia;



    ventanaUpdateP.show();
    $('#btnCloseVentanaUpdateP').addEventListener('click',function (){
        ventanaUpdateP.hide();
    })
 
    $('#btnSaveVentanaUpdateP').addEventListener('click', async function () {

        proInput.id_product = proId;

        proInput.distribuidor = selectDisUpdate.value;
        proInput.articulos = selectArtiUpdate.value;
        proInput.garantia = garantiaUpdate.value;

        proInput.codigo = codigoUpdate.value;
        proInput.modelo = modeloUpdate.value;
        proInput.marca = marcaUpdate.value;
        proInput.stock = inputStockUpdate.value;
        proInput.descuento = 0;
        proInput.preciocompra = preciocompraUpdate.value;
        proInput.precioventa = precioventaUpdate.value;
        proInput.descripcion = descripcionUpdate.value;

        proInput.update = true;

        if (await productos()) {
            
            tbProductos();
/*
            productRow[0].innerText = proInput.codigo;
            productRow[1].innerText = proInput.articulos;
            productRow[2].getElementsByTagName('span')[0].innerText = proInput.marca;
            productRow[2].getElementsByTagName('span')[1].innerText = proInput.modelo;
            productRow[2].getElementsByTagName('span')[2].innerText = proInput.descripcion;
            productRow[3].getElementsByTagName('button')[0].innerText = proInput.stock;
            productRow[4].innerText = proInput.precioventa;
            productRow[5].innerText = proInput.distribuidor;
*/

            ventanaUpdateP.hide();

            $('#alertConfirmarSave').classList.remove('d-none');
            setTimeout(()=>{
                $('#alertConfirmarSave').classList.add('d-none');
            },3000);
        }
    })
}

function limpiarFormularioUptade() {
    codigoUpdate.value = '';
    inputStockUpdate.value = '';
    modeloUpdate.value = '';
    marcaUpdate.value = '';
    descuentoUpdate.value = '';
    preciocompraUpdate.value = '';
    precioventaUpdate.value = '';
    descripcionUpdate.value = '';
}





//funcion de eliminacion de producto
function deleteRow(proId) {
    console.log('proId :>> ', proId);

    const modal = new bootstrap.Modal(document.getElementById('confirmationDelateP'));
    const confirmButtonDeleteP = document.getElementById('confirmButtonDeleteP');
    //confirmButtonDeleteP.dataset.proId = disId;
    // Abrir la ventana modal
    modal.show();

    confirmButtonDeleteP.addEventListener('click', function () {
        // Obtener el userId del atributo data
        window.electronAPI.productDelete(proId)
            .then((result) => {
                if (result) {
                    productos();
                } else {
                    // Ocurrió un error durante la eliminación
                    console.error('Error al eliminar el registro');
                }
            })
            .catch((error) => {
                console.error(error);
            });

        // Cerrar la ventana modal
        modal.hide();

    })
} 

