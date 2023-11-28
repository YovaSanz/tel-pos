
const mySelect1 = $('#tabla');


window.electronAPI.clientePull().then((data) => {


  const itemsPerPage = 6;

  function generateTable(data) {
  //La variable "data" es un array que tiene todos los datos de los distribuidores
  data.forEach(table => {
    mySelect1.innerHTML = mySelect1.innerHTML + `<td value="${table.id_cli}">${table.id_cli}</td>` +
    `<td value="${table.id_dis}">${table.nombre} ${table.apellidos} </td>`
    +
    `<td value="${table.id_dis}">${table.direccion}</td>`
    +
    `<td value="${table.id_dis}">${table.tel}</td>` 
    +
    `<td class="px-0 mx-0">
      <button type="button" class="btn icon mx-4" onclick ="updateRow(${table.id_dis})">
      <svg fill="none" height="27" viewBox="0 0 26 27" width="26" xmlns="http://www.w3.org/2000/svg"><path d="M20.5 10.9589V22.4112C20.5 23.905 19.3 25.1 17.8 25.1H4.2C2.7 25.1 1.5 23.905 1.5 22.4112V3.78878C1.5 2.295 2.7 1.09998 4.2 1.09998H17.8C19.3 1.09998 20.5 2.295 20.5 3.78878V4.98379V6.07923" stroke="#4F4F4F" stroke-miterlimit="10" stroke-width="2"/><path d="M4.7 8.07092H16.7" stroke="#4F4F4F" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/><path d="M4.7 13.0502H13" stroke="#4F4F4F" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/><path d="M4.7 18.129H8.5" stroke="#4F4F4F" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/><path d="M21.7 4.58547L10.9 16.4361L10.1 19.7224L13.3 18.627L24.1 6.77634C24.5 6.27842 24.5 5.58132 24.1 5.18298L23.3 4.48588C22.9 4.08754 22.1 4.18713 21.7 4.58547Z" stroke="#4F4F4F" stroke-miterlimit="10" stroke-width="2"/><path d="M20.5 5.97968L22.9 8.17054" stroke="#4F4F4F" stroke-miterlimit="10" stroke-width="2"/><path d="M10.9 16.5356L13.3 18.6269" stroke="#4F4F4F" stroke-miterlimit="10" stroke-width="2"/>
      </svg>
      </button>
      <button type="button" class="btn icon ml-4"  onclick = "deleteRow(${table.id_dis})">
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;">
      <path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z"></path>
      </svg>
      </button>
    </td>`
    ; 
    // en esta linea se insertan los elementos
  });

  }

  generateTable(data) 
}).catch((error) => {
  console.error(error);
});