const $ = selector => document.querySelector(selector)

const btnSavedis = $('#btnSavedis');// Obtener referencia a botón por id
const alertSave = $('#alert');
const name = $ ('#name');
const direc = $ ('#direc');
const telefono = $ ('#telefono');
const codigo = $ ('#codigo');
const empresanombre = $ ('#empresanombre');
const empresadirec = $ ('#empresadirec');
const empresatele = $ ('#empresatele');
const checkbox = $ ('#checkbox');


let disInput = {};

function ocultarAlert(){
    alertSave.style.display = 'none';
}

function mostrarAlert(){
    alertSave.style.display = 'block';
}

async function distribuidor() {
    disInput.nombre = name.value;
    disInput.direccion = direc.value;
    disInput.telefono = telefono.value;
    disInput.codigo = codigo.value;
    disInput.nombreem = empresanombre.value;
    disInput.direcem = empresadirec.value;
    disInput.teleem = empresatele.value;
    disInput.articulosabas = checkbox.value;
    

const nombre = await window.electronAPI.distriSave(disInput); //busca el usuario en la BD
    //const user = userInput;
    if (nombre) {
        ocultarAlert();
        window.electronAPI.distribuidor(nombre);
    } else {
        mostrarAlert();
    }
}

btnSavedis.addEventListener('click', (event) => {
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
checkbox.addEventListener('keypress', (event) =>{
    if (event.keyCode === 13) {
        distribuidor();
    } 
})




