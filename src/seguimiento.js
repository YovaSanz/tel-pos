const tablaCredits = $('#tablaCredits');
const paginationCredits = $('#paginationCredits');


window.electronAPI.getCredits().then((data) => {
    const itemsPerPage = 10;
    
    function generateTable(data) {  

        let html = '';
        //La variable "data" es un array que tiene todos los datos de los distribuidores
        data.forEach(table => {
          const pro = table.detalle_credit.flatMap(p => p.descripcion);

          html += `<tr id="${table.id_credit}">` +
              `<td>${table.cliente.nombre} ${table.cliente.apellidos}</td>`+
              `<td>${pro}</td>`+
              `<td class="text-center">$<span>${table.total}</span></td>`+
              `<td class="text-center">${table.meses} Meses</td>`+
              `<td class="text-center">$${table.pago_al_mes}</td>`+
              `<td><span class="badge ${table.estado.toLowerCase() == 'adeudo' ? 'bg-warning' : 'bg-success'}">${table.estado}</span></td>`+
              `<td class="px-0 mx-0">
                  <button type="button" class="btn icon mx-1" onclick="seguimientoCredito('${table.id_credit}')">
                      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                  </button>
              </td>`+
          `<tr>`;
        });

        tablaCredits.innerHTML = `<table class="table table-hover mb-0 id=">
            <thead class="pt-0 mt-0">
                <tr>
                    <th class="text-center">Cliente</th>
                    <th>Articulos</th>
                    <th class="text-center">Total</th>
                    <th class="text-center px-5 mx-0">Meses</th>
                    <th class="text-center">Pago al mes</th>
                    <th class="text-center">Estado</th>
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
    
      paginationCredits.innerHTML = html;
    
      const pageLinks = paginationCredits.querySelectorAll('.page-link');
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
    function performSearch() {4
      const searchTerm = searchInput.value.trim().toLowerCase();
      const filteredData = data.filter((table) => {
        return (
          table.estado.toLowerCase().includes(searchTerm) 
        );
      });
  
      generateTable(filteredData.slice(0, itemsPerPage));
      generatePagination();
    }
  
    // Agregar evento input al campo de búsqueda
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', performSearch);
  
  
    performSearch(data);
}).catch((err) => {
    
});


const idsPagosMes = [];

function seguimientoCredito(id_credit) {
  
  limpiarFormCredit();
  const today = new Date();
 
  // obtener la fecha de hoy en formato `MM/DD/YYYY`
  const now = today.toLocaleDateString();


  window.electronAPI.getCredit(id_credit).then((credits) => {
    
    const credit = credits[0];
    $('#idCreditTracing').innerText = id_credit;
    
    //info cliente
    $('#nombreCliente').value = `${credit.cliente.nombre} ${credit.cliente.apellidos}`;
    $('#telCliente').value = credit.cliente.tel;
    $('#direccionCliente').value = credit.cliente.direccion;


    $('#mesesCredito').value = ` ${credit.meses} meses`;
    $('#pagoPorMes').value = credit.pago_al_mes;
    
    let pagado = 0;
    credit.bonos_credit.forEach(b=>{
      $('#fechasDePago').innerHTML += `
      <div id="collapseOne" class="collapse pt-1" aria-labelledby="headingOne" data-parent="#cardAccordion">
      <div class="card-body p-1 pl-3">
      ${b.fecha_bono ? '<span class="badge bg-success">pagado</span>': ''}
      ${b.fecha < now ? '<span class="badge bg-warning">retraso</span>': ''}
       <span>${b.fecha}</span>
      </div>
      </div>`
      console.log('b :>> ', b);
      
      pagado += b.fecha_bono ? b.pago : 0;

      const idPagoMes = {
        id_bono_credit : b.id,
        estado : b.fecha_bono ? 'pagado' : 'adeudo'
      }

      idsPagosMes.push(idPagoMes);

    })
    $('#pagado').value = pagado;


    credit.detalle_credit.forEach(p=>{
      $('#tbProductos').innerHTML += `<tr id="${p.codigo}">
        <td class="py-1 px-2 text-center">${p.codigo}</td>
        <td class="py-1 px-2 text-center">${p.articulos}</td>
        <td class="py-1"><span>${p.descripcion}</span><br/><span>${p.descripcion_producto}</span><br><span>${ p.imei ? 'IMEI: '+ p.imei : ''}</span></td>
        <td class="py-1 px-2 text-center">$${p.precioventa}</td>
        <td class="py-1 px-2 mx-1 my-0 text-center">
        <span>${p.cantidad}</span>
        </td>
        <td class="py-1 px-2 text-center">$ ${p.precioventa * p.cantidad}</td>
        <td class="py-1 px-1 text-center"><button class="btn icon" id="detail-button"></button></td>
      </tr>`
    })
      
    $('#totalProductos').innerText = credit.total;
    $('#pagoMes').innerText = credit.pago_al_mes;
    
    $('#seguimientoCredit').classList.add('d-none');
    $('#creditCliente').classList.remove('d-none');
    
  }).catch((err) => {
    console.log('err :>> ', err);
  });
}

$('#btnAtrasCredito').addEventListener('click',()=>{
  $('#creditCliente').classList.add('d-none');
  $('#seguimientoCredit').classList.remove('d-none');

  limpiarFormCredit();
})

function limpiarFormCredit() {
    $('#idCreditTracing').innerText = '';
    
    //info cliente
    $('#nombreCliente').value = '';
    $('#telCliente').value = '';
    $('#direccionCliente').value = '';


    $('#mesesCredito').value = '';
    $('#pagoPorMes').value = '';
    //$('#pagado').value = credit.bono[0].pago

    $('#fechasDePago').innerHTML = '';

    $('#tbProductos').innerHTML = '';
      
    $('#totalProductos').innerText = '';
    $('#pagoMes').innerText = '';
}

function btnAbonar() {
  
    console.log('idsPagosMes :>> ', idsPagosMes.find(i => i.estado == 'adeudo'));
  
    return
    if ( $("inputAbonar").value == $('#pagoPorMes').value) {
  
  
      if (window.electronAPI.pagoMes()) {
        
      }
    } else {
      alert('Inserte la cantidad del pago por mes')
    }
    
  
}
