

const mySelect = $('#tabla');

const myboton = $('#hola');

window.electronAPI.distriPull().then((data) => {

  //La variable "data" es un array que tiene todos los datos de los distribuidores
  data.forEach(table => {
    mySelect.innerHTML = mySelect.innerHTML + `<td value="${table.id_dis}">${table.id_dis}</td>` +
    `<td value="${table.id_dis}">${table.nombre}</td>`+
    `<td value="${table.id_dis}">${table.direccion}</td>`
    +
    `<td value="${table.id_dis}">${table.telefono}</td>`
    +
    `<td value="${table.id_dis}">${table.nombreem}</td>` 
    ; 
    // en esta linea se insertan los elementos

   

  });

}).catch((error) => {
  console.error(error);
});


