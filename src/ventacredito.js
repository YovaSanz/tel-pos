//const $ = selector => document.querySelector(selector);

/*====================================================*/
/*=============== Elementos por id ===================*/
/*====================================================*/
const txtCodigoBarra = $('#codigoBarra');
//const btnCodigoBarra = $('#btnCodigoBarra');

const btnSearchProduct = $('#btnSearchProduct');
const searchInputProduct = $('#searchInputProduct');
const tbSearchProducts = $('#tbSearchProducts');

const btnAceptarInfoCel = $('#btnAceptarInfoCel');

const tbProductos = $('#tbProductos');

const pagocon = $('#pagocon');
const cambio = $('#cambio');
const txtTotal = $('#total');
const btnGenerarVenta = $('#btnGenerarVenta');
const btnCancelarVenta = $('#btnCancelarVenta');

const inputCredito = $('#inputCredito');
const inputIntereses = $('#inputIntereses');
const btnBuscarCliente = $('#btnBuscarCliente');
//const btnBuscarClienteP = $('#btnBuscarCliente');
const searchInputClient = $('#searchInputClient');
const tbClientes = $('#tbClientes');
const tbClientesP = $('#tbClientesP');

const inputApartar = $('#inputApartar');

const mensualidad = $('#inputMensualidad');
const pagoMeses = $('#pagoMeses');
const meses = $('#meses');
const totalCredito = $('#totalCredito');

//Modal de la informacion del celular
let modalPrimary = new bootstrap.Modal(document.getElementById('primary'));
let modalVentaGenerada = new bootstrap.Modal(document.getElementById('ventaGenerada'));

let buscarCliente = new bootstrap.Modal(document.getElementById('buscarCliente'));

/*====================================================*/
/*=============== Variables Globales =================*/
/*====================================================*/
const opcionesMeses = [...mensualidad.getElementsByTagName("option")];
let total = 0;
let credito = false;
let apartado = true;
let isCredito = false;
let isPhoneV = false;
let products = [];
let productSearch = [];
let phoneCliente = [];
function objProduct(id, codigo, cantidad, stock, preciocompra, precio, descripcion, cliente, imei) {
    this.id = id;
    this.codigo = codigo;
    this.cantidad = cantidad;
    this.stock = stock;
    this.preciocompra = preciocompra;
    this.precio = precio;
    this.descripcion = descripcion;
    this.cliente = cliente;
    this.imei = imei;
    this.descuento = 0;
}
let cliente = {};
const itemsPerPage = 5; 
const paginationContainer = $('#paginationTbC');
const paginationContainerCP = $('#paginationTbCP');
const paginationContainerP = $('#paginationTbP');

/*====================================================*/
/*================= Fecha Actual =====================*/
/*====================================================*/
const fechaActual= new Date();
const year = fechaActual.getFullYear();
const month = String(fechaActual.getMonth() + 1).padStart(2, '0');
const day = String(fechaActual.getDate()).padStart(2, '0');
const fechaFormateada= `${year}-${month}-${day}`;
$('#fecha').value = fechaFormateada;

/*====================================================*/
/*====================================================*/
/*====================================================*/
async function searchProduct(){
    
    const searchCodigo = {'codigo' : txtCodigoBarra.value};

    const product = await window.electronAPI.productoSearch(searchCodigo);

    if (products.length > 0 && product && (product.articulos != 'celulares' && product.articulos != 'celulare')){

        let exist = products.filter(p =>{ if (p.codigo === product.codigo ) return true})

        if (exist.length>0) {
            products.filter(p =>{
                if (p.codigo == product.codigo ) {
                    if (p.cantidad < p.stock) {
                        p.cantidad = p.cantidad + 1;
                        const fila = document.getElementById(`${p.codigo}`);
                        fila.getElementsByTagName("td")[5].innerText = `$ ${new Intl.NumberFormat('es-MX').format(p.cantidad * p.precio)}`;
                        fila.getElementsByTagName("input")[0].value = p.cantidad;
                        
                        
                        calculoTotal();
                    }else{
                        console.log('Ya no hay STOCK');
                    }
                }
            });
        } else{
            addProduct(product);
        }
        txtCodigoBarra.value  = '';

    } else if(product){
        addProduct(product);
    } else if (!product) {
        console.log(product);

        $('#alertNoExiste').classList.remove('d-none');
        txtCodigoBarra.value  = '';
        setTimeout(()=>{$('#alertNoExiste').classList.add("d-none");}, 1500);
    }
}

async function searchProductTable(searchCodigo){

    searchCodigo = {'codigo' : searchCodigo};
    const product = await window.electronAPI.productoSearch(searchCodigo);

    if (products.length > 0 && product){

        let exist = products.filter(p =>{ if (p.codigo === product.codigo ) return true})

        if (exist.length>0  && (product.articulos != 'celulares' && product.articulos != 'celulare')) {
            products.filter(p =>{
                if (p.codigo == product.codigo ) {
                    if (p.cantidad < p.stock) {
                        p.cantidad = p.cantidad + 1;
                        const fila = document.getElementById(`${p.codigo}`);
                        fila.getElementsByTagName("td")[5].innerText = `$ ${new Intl.NumberFormat('es-MX').format(p.cantidad * p.precio)}`;
                        fila.getElementsByTagName("input")[0].value = p.cantidad;
                        
                        calculoTotal();
                    }else{
                        $('#alertNoHayStock').classList.remove('d-none');
                        setTimeout(()=>{$('#alertNoHayStock').classList.add("d-none");}, 1500);

                        console.log('Ya no hay STOCK');
                    }
                }
            });
        } else{
            addProduct(product);
        }
        txtCodigoBarra.value  = '';

    } else if(product){
        addProduct(product);
    } else if (!product) {
        console.log(product);

        $('#alertNoExiste').classList.remove('d-none');
        txtCodigoBarra.value  = '';
        setTimeout(()=>{$('#alertNoExiste').classList.add("d-none");}, 1500);
    }
}

function addProduct(product) {
    if((product && product.stock > 0) &&  (product.articulos == 'celulares' || product.articulos == 'celular')){
        isPhoneV = true;
        $('#imeiPhoneInfo').value = null;
        btnLimpiarInfo();

        $('#codigoInfoCelCompra').innerText = product.codigo;
        $('#stockInfoCelCompra').innerText = product.stock;
        $('#precioInfoCelCompra').innerText = product.precioventa;
        $('#marcaInfoCelCompra').innerText = product.marca;
        $('#modeloInfoCelCompra').innerText = product.modelo;
        $('#descripcionInfoCelCompra').innerText = product.descripcion;
        $('#marcaInfoCelCompra').innerText = product.marca;

        modalPrimary.show();

        txtCodigoBarra.value  = '';

    }else if ((product && product.stock > 0) && (product.articulos != 'celulares' || product.articulos != 'celular')) {
        product.cantidad = 1;
        const des = `${product.marca} - ${product.modelo}`

        products.push( new objProduct(product.id_product, product.codigo, product.cantidad, product.stock, product.preciocompra, product.precioventa, des));

        /*let optionCantidadP = '<option value="1">1</option>';

        for (let s = 2; s <= product.stock; s++) {
            optionCantidadP = optionCantidadP + `<option value="${s}">${s}</option>`
        }*/

        const table = document.getElementById('tableProductos');
        let tr = table.insertRow(-1);
        tr.id = product.codigo;
        tr.innerHTML = `
            <td class='py-1 px-2 text-center'>${product.codigo}</td>
            <td class='py-1 px-2 text-center'>${product.articulos}</td>
            <td class='py-1'><span>${product.marca}</span> <span>${product.modelo}</span><br /><span>${product.descripcion}</span></td>
            <td class='py-1 px-2 text-center'>$ ${new Intl.NumberFormat('es-MX').format(product.precioventa)}</td>
            <td class='py-1 px-2 mx-1 my-0 text-center'>
                <div class="input-group">
                    <span class="btn icon btn-secondary px-0" onclick="quantityMinus('${product.codigo}')"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><line x1="5" y1="12" x2="19" y2="12"></line></svg></i></span>
                    <input type="number" class="form-control p-2 text-center" min="1" max="${product.stock}" value = 1 readonly>
                    <span class="btn icon btn-secondary px-0" onclick="quantityPlus('${product.codigo}')"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></span>
                </div>
                
            </td>
            <td class='py-1 px-2 text-center'>$ ${new Intl.NumberFormat('es-MX').format(product.precioventa)}</td>
            <td class='py-1 px-1 text-center'><button class="btn icon" id='detail-button' onclick = "btnEliminar('${product.codigo}')">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z"></path></svg>
            </button></td>`;



        calculoTotal();

        
        inputCredito.disabled = false;
        inputApartar.disabled = false;
        txtCodigoBarra.value  = '';
    }
}

async function isPhoneModal(productoCel, clienteCel) {
    const productP = await window.electronAPI.productoSearch(productoCel);
    let product = {
        ...productP,
        cantidad : 1,
        imei : productoCel.imei
    };

    cliente = {...clienteCel};
    phoneCliente.push(cliente);

    const des = `${product.modelo} - ${product.marca}`

    products.push( new objProduct(product.id_product, product.codigo, product.cantidad, product.stock, product.preciocompra, product.precioventa, des, clienteCel, product.imei));


    //let optionCantidadP = '<option value="1">1</option>';

    //for (let s = 2; s <= product.stock; s++) {
    //    optionCantidadP = optionCantidadP + `<option value="${s}">${s}</option>`
    //}

    const table = document.getElementById('tableProductos');
    let tr = table.insertRow(-1);
    tr.id = product.codigo;
    tr.innerHTML = `
        <td class='py-1 px-2 text-center'>${product.codigo}</td>
        <td class='py-1 px-2 text-center'>${product.articulos}</td>
        <td class='py-1'><span>${product.marca}</span> <span>${product.modelo}</span><br><span>${product.descripcion}</span><br /><span><b>Cliente:</b> ${clienteCel.nombre} ${clienteCel.apellidos}</span><br><span><b>IMEI:</b> ${product.imei}</span></td>
        <td class='py-1 px-2 text-center'>$ ${new Intl.NumberFormat('es-MX').format(product.precioventa)}</td>
        <td class='py-1 px-2 mx-1 my-0 text-center'>
            <span> ${product.cantidad} </span>
        </td>
        <td class='py-1 px-2 text-center'>$ ${new Intl.NumberFormat('es-MX').format(product.precioventa)}</td>
        <td class='py-1 px-1 text-center'><button class="btn icon" id='detail-button' onclick = "btnEliminar('${product.codigo}')">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z"></path></svg>
        </button></td>`;

    calculoTotal();

    
    inputCredito.disabled = false;
    inputApartar.disabled = false;
    txtCodigoBarra.value = '';

}

/*====================================================*/
/*====================================================*/
/*====================================================*/

function btnLimpiarInfo() {
    $('#nombreInfoCliCompra').readOnly = false;
    $('#apellidosInfoCliCompra').readOnly = false;
    $('#telefonoInfoCliCompra').readOnly = false;
    $('#direccionInfoCliCompra').readOnly = false;


    $('#idInfoCliCompra').value = null;
    $('#nombreInfoCliCompra').value = null;
    $('#apellidosInfoCliCompra').value = null;
    $('#telefonoInfoCliCompra').value = null;
    $('#direccionInfoCliCompra').value = null;
    

    $('#imeiPhoneInfo').classList.remove('is-invalid');
    $('#idInfoCliCompra').classList.remove('is-invalid');
    $('#nombreInfoCliCompra').classList.remove('is-invalid');
    $('#apellidosInfoCliCompra').classList.remove('is-invalid');
    $('#telefonoInfoCliCompra').classList.remove('is-invalid');
    $('#direccionInfoCliCompra').classList.remove('is-invalid');

    $('#idInfoCliCompraDisplay').classList.add('d-none');

    $('#switchSaveInfoCliCompra').checked = true;
    $('#switchSaveInfoCliCompra').disabled = false;

}

function btnEliminar(id) {
    productEliminado = document.getElementById(id);
    //txtTotal.value = txtTotal.value - productEliminado.getElementsByTagName("td")[4].innerText;
    productEliminado.remove();
    products = products.filter(p => p.codigo != id);

    calculoTotal();
}

/*function btnCantidadProduct(codigo) {
    const productCantidad = document.getElementById(codigo);
    const cantidadP = productCantidad.getElementsByTagName('select')[0].value
    
    products.map((p)=>{
        if (p.codigo == codigo) {
            p.cantidad = parseInt(cantidadP);
            productCantidad.getElementsByTagName("td")[5].innerText = `$ ${new Intl.NumberFormat('es-MX').format(p.cantidad * p.precio)}`;
        }
    });

    calculoTotal();
}*/

function quantityPlus(codigo){
    const productCantidad = document.getElementById(codigo);

    if (parseInt(productCantidad.getElementsByTagName('input')[0].value) < parseInt(productCantidad.getElementsByTagName('input')[0].max)) {
        console.log('object');
        const cantidad = ++ productCantidad.getElementsByTagName('input')[0].value;

        products.map((p)=>{
            if (p.codigo == codigo) {
                p.cantidad = parseInt(cantidad);
                productCantidad.getElementsByTagName("td")[5].innerText = `$ ${new Intl.NumberFormat('es-MX').format(p.cantidad * p.precio)}`;
            }
        });
        
        calculoTotal();
    }
}

function quantityMinus(codigo){
    const productCantidad = document.getElementById(codigo);
    if (parseInt(productCantidad.getElementsByTagName('input')[0].value) > parseInt(productCantidad.getElementsByTagName('input')[0].min)) {
                
        const cantidad = -- productCantidad.getElementsByTagName('input')[0].value;

        products.map((p)=>{
            if (p.codigo == codigo) {
                p.cantidad = parseInt(cantidad);
                productCantidad.getElementsByTagName("td")[5].innerText = `$ ${new Intl.NumberFormat('es-MX').format(p.cantidad * p.precio)}`;
            }
        });
        
        calculoTotal();
    }
}

function quantityInput(codigo) {
    
}

function creditoTotal() {
    if (credito){
        const mes = mensualidad.value;
        opcionesMeses.map( (opcion , indice) => {
            if (opcion.value == mes) {
                if(total && credito){
                    const interes = total * (inputIntereses.value / 100);
                    total = total + interes;
                    const pMeses = total / opcion.value;
                    pagoMeses.innerText = new Intl.NumberFormat('es-MX').format(pMeses.toFixed(2));
                    $('#abono').value = new Intl.NumberFormat('es-MX').format(pMeses.toFixed(2));
                    $('#totalCredito').innerText = new Intl.NumberFormat('es-MX').format((pMeses * opcion.value).toFixed(2));
                    txtTotal.value = new Intl.NumberFormat('es-MX').format(total.toFixed(2));
                }
                meses.innerHTML = opcionesMeses[indice].innerText.replace(/\s+/g, '').toLowerCase();
            }
        })
    }
}

function calculoTotal() {
    total = 0;
    products.forEach((p)=>{
        total = total + (p.precio * p.cantidad);
    });
    console.log('/*==============*/');
    console.log('Total >>', total);

    if(total > 0 && !credito){
        txtTotal.value = new Intl.NumberFormat('es-MX').format(total.toFixed(2));
        pagocon.readOnly = false;
        pagoC();
        $('#abono').value = '';
    }else if (credito) {
        creditoTotal();
        pagoC();
    }
    else{
        txtTotal.value = '';
        pagocon.readOnly = true;
        pagoC()
    }

    if (total > 0 && $('#idCliente').value) {
        btnGenerarVenta.classList.remove('disabled');
    } else{
        btnGenerarVenta.classList.add('disabled');
    }
}

function pagoC() {
    const abono = parseFloat($('#abono').value.replace(/,/g, ""));
    if (pagocon.value.length > 0 && (pagocon.value >= abono)) {
        cambio.value =  new Intl.NumberFormat('es-MX').format(((pagocon.value - abono).toFixed(2)));
    } else {
        cambio.value = null;
    }
}

/*====================================================*/
/*====================================================*/
/*====================================================*/

function generateTableProduct(pageData) { //funcion para la tabla y buscar
    let html = '';

    pageData.forEach((product) => {
      html +=  `
      <tr name="${product.codigo}">
          <td class='py-2 px-1'>${product.codigo}</td>
          <td class='py-1 px-2'>${product.articulos}</td>
          <td class='py-1'>${product.marca}, ${product.modelo}, ${product.descripcion}</td>
          <td class='py-1 px-2 text-center'>$ ${new Intl.NumberFormat('es-MX').format(product.precioventa)}</td>
          <td class='py-1 px-2 text-center'>${product.stock}</td>
          <td class='py-2 px-3 text-center'>
              <button type="button" class="btn icon btn-sm btn-secondary" id='detail-button' onclick = "btnSeleccionarProduct('${product.codigo}')" data-dismiss="modal">
                  <i data-feather="plus-circle"></i> Seleccionar
              </button>
          </td>
      </tr>`;
    });
    tbSearchProducts.innerHTML = `<table class="table table-hover mb-0 id="xd">
      <thead>
        <tr>
            <th data-sortable class='py-3 px-1'>Codigo</th>
            <th data-sortable class='py-3'>Articulo</th>
            <th data-sortable class='py-3'>Descripcion</th>
            <th data-sortable class='py-3 text-center'>Precio</th>
            <th data-sortable class='py-3 px-2 text-center'>Stock</th>
            <th data-sortable class='py-3 px-3 text-center'>Accion</th>
        </tr>
      </thead>
      <tbody>${html}</tbody>
    </table>`;

}

function generatePaginationP(data) { //funcion q genera la paginacion
    const totalPages = Math.ceil(data.length / itemsPerPage);
    let html = '';
  
    for (let i = 1; i <= totalPages; i++) {
      html += `<li class="page-item">
        <a class="page-link ${i === 1 ? 'bg-dark text-white' : 'bg-light'}" href="#" data-page="${i}">${i}</a>
      </li>`;
    }
  
    paginationContainerP.innerHTML = html;
  
    const pageLinks = paginationContainerP.querySelectorAll('.page-link');
    pageLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageNumber = parseInt(link.getAttribute('data-page'));
        const startIndex = (pageNumber - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageData = data.slice(startIndex, endIndex);
        generateTableProduct(pageData);
  
        
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

function productPull() {
    const buscar = searchInputProduct.value.trim().toLowerCase();
    window.electronAPI.productoPull().then((data) => {

        const filteredData = data.filter((table) => {
          return (
            table.articulos.toLowerCase().includes(buscar) ||
            table.marca.toLowerCase().includes(buscar)
          );
        });

        generateTableProduct(filteredData.slice(0, itemsPerPage));
        generatePaginationP(data);

    }).catch((error) => {
        console.error(error);
    });

}

function btnSeleccionarProduct(id){
    searchProductTable(id);
}

/*====================================================*/
/*====================================================*/
/*====================================================*/

function generateTableCliente(pageData) { //funcion para la tabla y buscar
    let html = '';

    pageData.forEach((cliente) => {
      html +=  `
      <tr id="${cliente.id_cli}">
          <td class='py-2 px-1'>${cliente.id_cli}</td>
          <td class='py-2'><span>${cliente.nombre}</span> <span>${cliente.apellidos}</span></td>
          <td class='py-2'>${cliente.direccion}</td>
          <td class='py-2 px-2'>${cliente.tel}</td>
          <td class='py-2 px-3'>
              <button type="button" class="btn icon btn-sm btn-primary" id='detail-button' onclick = "btnSeleccionarCliente(${cliente.id_cli})" data-dismiss="modal">
                  <i data-feather="plus-circle"></i> Seleccionar
              </button>
          </td>
      </tr>`;
    });
    if (isCredito && !isPhoneV) {
        tbClientes.innerHTML = `<table class="table table-hover mb-0 id="xd">
          <thead>
            <tr>
                <th data-sortable class='py-3 px-1'>ID</th>
                <th data-sortable class='py-3'>Nombre completo</th>
                <th data-sortable class='py-3'>Dirección</th>
                <th data-sortable class='py-3 px-2'>Teléfono</th>
                <th data-sortable class='py-3 px-3'>Accion</th>
            </tr>
          </thead>
          <tbody>${html}</tbody>
        </table>`;
    } else if(isPhoneV) {
        tbClientesP.innerHTML = `<table class="table table-hover mb-0 id="xd">
          <thead>
            <tr>
                <th data-sortable class='py-3 px-1'>ID</th>
                <th data-sortable class='py-3'>Nombre completo</th>
                <th data-sortable class='py-3'>Dirección</th>
                <th data-sortable class='py-3 px-2'>Teléfono</th>
                <th data-sortable class='py-3 px-3'>Accion</th>
            </tr>
          </thead>
          <tbody>${html}</tbody>
        </table>`;
    }

}

function generatePaginationC(data) { //funcion q genera la paginacion
    const totalPages = Math.ceil(data.length / itemsPerPage);
    let html = '';
  
    for (let i = 1; i <= totalPages; i++) {
      html += `<li class="page-item">
        <a class="page-link ${i === 1 ? 'bg-dark text-white' : 'bg-light'}" href="#" data-page="${i}">${i}</a>
      </li>`;
    }
  
    let pageLinks;

    if (isCredito && !isPhoneV) {
        paginationContainer.innerHTML = html;
      
        pageLinks = paginationContainer.querySelectorAll('.page-link');
    } else if(isPhoneV) {
        paginationContainerCP.innerHTML = html;
        pageLinks = paginationContainerCP.querySelectorAll('.page-link');
    }
    pageLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageNumber = parseInt(link.getAttribute('data-page'));
        const startIndex = (pageNumber - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageData = data.slice(startIndex, endIndex);
        generateTableCliente(pageData);
  
        
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

function clientePull() {
    const buscar = searchInputClient.value.trim().toLowerCase();
    window.electronAPI.clientePull().then((data) => {

        const filteredData = data.filter((table) => {
          return (
            table.nombre.toLowerCase().includes(buscar) ||
            table.apellidos.toLowerCase().includes(buscar)
          );
        });

        generateTableCliente(filteredData.slice(0, itemsPerPage));
        generatePaginationC(data);

    }).catch((error) => {
        console.error(error);
    });
}

function btnSeleccionarCliente(id) {

    const seleccionarCliente = document.getElementById(id).getElementsByTagName("td");
    
    if (isCredito && !isPhoneV) {
        $('#idCliente').value = seleccionarCliente[0].innerText;
        $('#nombreCliente').value = seleccionarCliente[1].innerText;
        $('#direccionCliente').value = seleccionarCliente[2].innerText;
        $('#telCliente').value = seleccionarCliente[3].innerText;

        calculoTotal();
        buscarCliente.hide();
    } else if(isPhoneV) {
        $('#nombreInfoCliCompra').readOnly = true;
        $('#apellidosInfoCliCompra').readOnly = true;
        $('#telefonoInfoCliCompra').readOnly = true;
        $('#direccionInfoCliCompra').readOnly = true;


        $('#idInfoCliCompra').value = seleccionarCliente[0].innerText;
        $('#nombreInfoCliCompra').value = document.getElementById(id).getElementsByTagName("span")[0].innerText;
        $('#apellidosInfoCliCompra').value = document.getElementById(id).getElementsByTagName("span")[1].innerText;
        $('#telefonoInfoCliCompra').value = seleccionarCliente[3].innerText;
        $('#direccionInfoCliCompra').value = seleccionarCliente[2].innerText;

        $('#idInfoCliCompraDisplay').classList.remove('d-none');
        $('#switchSaveInfoCliCompra').checked = false;
        $('#switchSaveInfoCliCompra').disabled = true;

        $('#imeiPhoneInfo').classList.remove('is-invalid');
        $('#idInfoCliCompra').classList.remove('is-invalid');
        $('#nombreInfoCliCompra').classList.remove('is-invalid');
        $('#apellidosInfoCliCompra').classList.remove('is-invalid');
        $('#telefonoInfoCliCompra').classList.remove('is-invalid');
        $('#direccionInfoCliCompra').classList.remove('is-invalid');
    }

}

function formRegistroCliente() {
    $('#modalBuscarCliente').classList.add('d-none');
    $('#modalAgregarCliente').classList.remove('d-none')
}

function cerrarRegistroCliente() {
    $('#modalAgregarCliente').classList.add('d-none')
    $('#modalBuscarCliente').classList.remove('d-none');
}

async function registroCliente() {
    let userInput = {};
    userInput.nombre = $('#nombreClienteN').value;
    userInput.apellidos = $('#apellidosClienteN').value;
    userInput.direccion = $('#direccionClienteN').value;
    userInput.tel = $('#telClienteN').value;

 
 // Validación de campos vacíos
    for (const prop in userInput) {
        if (userInput.hasOwnProperty(prop) && userInput[prop] === '') {
        $('#alertRegistroC').style.display = 'block';
        setTimeout(()=>{$('#alertRegistroC').style.display = 'none'}, 10000);
        return; // Detiene la ejecución de la función si hay campos vacíos
        }
    }

    if (userInput) {
        await window.electronAPI.clienteSave(userInput);
        $('#nombreClienteN').value = '';
        $('#apellidosClienteN').value = '';
        $('#direccionClienteN').value = '';
        $('#telClienteN').value = '';
        clientePull();
        cerrarRegistroCliente();
    }
}

/*=====================================================*/
function formRegistroCliente1() {
    $('#modalBuscarCliente1').classList.add('d-none');
    $('#modalAgregarCliente1').classList.remove('d-none')
}

function cerrarRegistroCliente1() {
    $('#modalAgregarCliente1').classList.add('d-none')
    $('#modalBuscarCliente1').classList.remove('d-none');
}

async function registroCliente1() {
    let userInput = {};
    userInput.nombre = $('#nombreClienteN1').value;
    userInput.apellidos = $('#apellidosClienteN1').value;
    userInput.direccion = $('#direccionClienteN1').value;
    userInput.tel = $('#telClienteN1').value;

 
 // Validación de campos vacíos
    for (const prop in userInput) {
        if (userInput.hasOwnProperty(prop) && userInput[prop] === '') {
        $('#alertRegistroC1').style.display = 'block';
        setTimeout(()=>{$('#alertRegistroC1').style.display = 'none'}, 10000);
        return; // Detiene la ejecución de la función si hay campos vacíos
        }
    }

    if (userInput) {
        
        await window.electronAPI.clienteSave(userInput).then((cliente) => {
            cliente = cliente[0];
            $('#idCliente').value = cliente.id_cli;
            $('#nombreCliente').value = `${cliente.nombre} ${cliente.apellidos}`;
            $('#direccionCliente').value = cliente.direccion;
            $('#telCliente').value = cliente.tel;

                    
            $('#nombreClienteN1').value = '';
            $('#apellidosClienteN1').value = '';
            $('#direccionClienteN1').value = '';
            $('#telClienteN1').value = '';

            cerrarRegistroCliente1();
            calculoTotal();
            buscarCliente.hide();
        }).catch((err) => {
            alert('Error al guardar el cliente');
        });

    }
}

/*====================================================*/
/*====================================================*/

function checkApartadoCredito(input) {

    switch (input.id) {
        case 'inputApartar':
            if (inputApartar.checked) {
                inputCredito.checked = false;
                apartado = true;
                credito = false;

                $('#abono').readOnly = false;


                $('#formCredito').classList.add('d-none');
            } else{
                inputCredito.checked = true;
                credito = true;
                apartado = false;

                $('#abono').readOnly = true;

                $('#formCredito').classList.remove('d-none');
                mensualidad.value = opcionesMeses[0].value;
            }
            break;
        case 'inputCredito':
            if (inputCredito.checked) {
                inputApartar.checked = false;
                credito = true;
                apartado = false;

                $('#abono').readOnly = true;


                $('#formCredito').classList.remove('d-none');
                mensualidad.value = opcionesMeses[0].value;
            } else {
                inputApartar.checked = true;
                apartado = true;
                credito = false;

                $('#abono').readOnly = false;

                $('#formCredito').classList.add('d-none');
            }
            break;
    }

    calculoTotal();
}

/*====================================================*/
/*====================================================*/
/*====================================================*/

/*btnCodigoBarra.addEventListener('click', () => {
    searchProduct();
});*/

txtCodigoBarra.addEventListener('keypress', (event) =>{
    if (event.keyCode === 13) {
        searchProduct();
    }
});

btnSearchProduct.addEventListener('click', productPull);

searchInputProduct.addEventListener('input', productPull);

btnAceptarInfoCel.addEventListener('click',async ()=>{
    let clienteCel = {};

    let validacionFormInfo = true;
    const imeiPhoneInfo = $('#imeiPhoneInfo');
    const idInfoCliCompra = $('#idInfoCliCompra');

    const nombreInfoCliCompra = $('#nombreInfoCliCompra');
    const apellidosInfoCliCompra = $('#apellidosInfoCliCompra');
    const telefonoInfoCliCompra = $('#telefonoInfoCliCompra');
    const direccionInfoCliCompra = $('#direccionInfoCliCompra');



    if (imeiPhoneInfo.value == '' || imeiPhoneInfo.value == ' ') {
        imeiPhoneInfo.classList.add('is-invalid');
        validacionFormInfo = false;
    }else{
        imeiPhoneInfo.classList.remove('is-invalid');
    }
    if(nombreInfoCliCompra.value == '' || nombreInfoCliCompra.value == ' '){
        nombreInfoCliCompra.classList.add('is-invalid');
        validacionFormInfo = false;
    }else{
        nombreInfoCliCompra.classList.remove('is-invalid');
    }
    if(apellidosInfoCliCompra.value == '' || apellidosInfoCliCompra.value == ' '){
        apellidosInfoCliCompra.classList.add('is-invalid');
        validacionFormInfo = false;
    }else{
        apellidosInfoCliCompra.classList.remove('is-invalid');
    } 
    if(telefonoInfoCliCompra.value == '' || telefonoInfoCliCompra.value == ' '){
        telefonoInfoCliCompra.classList.add('is-invalid');
        validacionFormInfo = false;
    }else{
        telefonoInfoCliCompra.classList.remove('is-invalid');
    }
    if(direccionInfoCliCompra.value == '' || direccionInfoCliCompra.value == ' '){
        direccionInfoCliCompra.classList.add('is-invalid');
        validacionFormInfo = false;
    }else{
        direccionInfoCliCompra.classList.remove('is-invalid');
    }


    clienteCel.id_cli = idInfoCliCompra.value;
    clienteCel.nombre = nombreInfoCliCompra.value;
    clienteCel.apellidos = apellidosInfoCliCompra.value;
    clienteCel.tel = telefonoInfoCliCompra.value;
    clienteCel.direccion = direccionInfoCliCompra.value;

    const productoCel = {
        codigo : $('#codigoInfoCelCompra').innerText,
        imei : imeiPhoneInfo.value,
    };


    if (validacionFormInfo && clienteCel.id_cli == '' && $('#switchSaveInfoCliCompra').checked) {
        clienteCel = await window.electronAPI.clienteSave(clienteCel);

        isPhoneModal(productoCel, clienteCel);
        modalPrimary.hide();
    }

    if (validacionFormInfo && clienteCel.id_cli != '' && !$('#switchSaveInfoCliCompra').checked ) {

        isPhoneModal(productoCel, clienteCel);
        modalPrimary.hide();
    }

})

btnBuscarCliente.addEventListener('click',()=>{
    buscarCliente.show();
    isPhoneV = false;
    isCredito = true;
    clientePull();
})

btnBuscarClienteP.addEventListener('click',()=>{
    isPhoneV = true;
    isCredito = false;
    clientePull();
})

searchInputClient.addEventListener('input', clientePull);

mensualidad.addEventListener('input', ()=>{
    calculoTotal();
});

inputIntereses.addEventListener('input', ()=>{
    calculoTotal();
})

pagocon.addEventListener('input',()=>{
    pagoC();
});

btnCancelarVenta.addEventListener('click',()=>{
    location.replace('./ventacredito.html');
})

btnGenerarVenta.addEventListener('click', async ()=>{
    
    if (credito && !apartado) {
        const infoCredit = {
            'usuario' : datosUsuario,
            'products' : products,
            'total' : total,
            'abono' : $('#abono').value,
            'cliente': {
                id_cli: $('#idCliente').value,
            },
            'meses': $('#inputMensualidad').value,
            'interes': $('#inputIntereses').value,
        };

        console.log(infoCredit);

        
        if (await window.electronAPI.saveCredit(infoCredit)) {

            $('#txtModalVentaGenerada').innerText = 'La venta a Credito'
            $('#txtModalVentaGeneradaAlert').classList.add('alert-success');

            resetPage();
            
        }
        
    } else if(apartado && !credito) {
        const infoApartado = {
            'usuario' : datosUsuario,
            'products' : products,
            'total' : total,
            'abono' : $('#abono').value,
            'cliente': {
                id_cli: $('#idCliente').value,
            },
        };
        console.log(infoApartado);

        if (true) {

            $('#txtModalVentaGenerada').innerText = 'El apartado'
            $('#txtModalVentaGeneradaAlert').classList.add('alert-primary');
            
            resetPage();
        }



    }

});


function resetPage() {
    const table = document.getElementById('tableProductos')

    table.innerHTML = `
    <thead class="sticky-top">
        <tr>
            <th class="px-2">CÓDIGO</th>
            <th>ARTICULO</th>
            <th>DECRIPCION</th>
            <th>PRECIO</th>
            <th class="px-2">CANTIDAD</th>
            <th>TOTAL</th>
            <th class="px-1"></th>
        </tr>
    </thead>
    <tbody id="tbProductos"></tbody>`;

        $('#idCliente').value = null;
        $('#nombreCliente').value = null;
        $('#direccionCliente').value = null;
        $('#telCliente').value = null;



        products = [];
        total = 0;
        calculoTotal();

        txtTotal.value = '';
        pagocon.value= ''
        pagoC();
        pagoMeses.innerText = 0;
        $('#abono').value = '';
        $('#totalCredito').innerText = 0;

        if (inputApartar.checked) {
            inputCredito.checked = false;
            apartado = true;
            credito = false;

            $('#abono').readOnly = false;


            $('#formCredito').classList.add('d-none');
        } else{
            inputCredito.checked = true;
            credito = true;
            apartado = false;

            $('#abono').readOnly = true;

            $('#formCredito').classList.remove('d-none');
            mensualidad.value = opcionesMeses[0].value;
        }


        modalVentaGenerada.show();
        setTimeout(()=>{
            modalVentaGenerada.hide();
        },1100);  
        
}
