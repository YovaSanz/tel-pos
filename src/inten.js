  const $ = selector => document.querySelector(selector);
  window.electronAPI.distriPull().then((data) => {
  const mySelect = document.getElementById('mySelect'); // Elemento select original
  const mySelect2 = document.getElementById('mySelect2'); // Elemento select donde se mostrará la opción adicional

  data.forEach(element => {
    const option = document.createElement('option');
    option.value = element.nombre;
    option.textContent = element.nombre;
    mySelect.appendChild(option);
  });

  // Evento de cambio en el primer select
  mySelect.addEventListener('change', () => {
    const selectedValue = mySelect.value;
    
    // Encuentra el objeto distribuidor correspondiente a la selección
    //const distribuidor = data.find((dist) => dist.nombre === selectedValue);
    const distribuidor = data.filter((element) => element.celulares === 1);

    // Remueve todas las opciones existentes en el segundo select
    while (mySelect2.firstChild) {
      mySelect2.removeChild(mySelect2.firstChild);
    }

    // Crea una opción "Celulares" si celulares = 1
    if (distribuidor && distribuidor.celulares === 1) {
      const opcionCelulares = document.createElement('option');
      opcionCelulares.value = 'celulares';
      opcionCelulares.textContent = 'Celulares';
      mySelect2.appendChild(opcionCelulares);
    }
  });

}).catch((error) => {
  console.error(error);
});



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



document.getElementById('name3').value = distribuidor.nombre;
document.getElementById('direc3').value = distribuidor.
document.getElementById('telefono3').value = distribuidor.
document.getElementById('codigo3').value = distribuidor.
document.getElementById('empresanombre3').value = distribuidor.
document.getElementById('empresadirec3').value = distribuidor.
document.getElementById('empresatele3').value = distribuidor.
document.getElementById('celulares3').value = distribuidor.
document.getElementById('fundas3').value = distribuidor.
document.getElementById('bocinas3').value = distribuidor.
document.getElementById('audifonos3').value = distribuidor.
document.getElementById('micas3').value = distribuidor.
document.getElementById('cargadores3').value = distribuidor.
document.getElementById('otros3').value = distribuidor.

