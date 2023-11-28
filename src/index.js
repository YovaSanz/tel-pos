const $ = selector => document.querySelector(selector)

const btnLogin = $('#btnLogin');// Obtener referencia a botón por id
const alertLogin = $('#alert');
const inputUser = $('#inputUser');
const inputPass = $('#inputPass');

let userInput = {};

function ocultarAlert(){
    alertLogin.style.display = 'none';
}

function mostrarAlert(){
    alertLogin.style.display = 'block';
}

async function login() {
    userInput.user = inputUser.value;
    userInput.password = inputPass.value;
    
    const user = await window.electronAPI.userSearch(userInput); //busca el usuario en la BD
    //const user = userInput;
    if (user) {
        ocultarAlert();
        window.electronAPI.login(user);
    } else {
        mostrarAlert();
    }
}

btnLogin.addEventListener('click', (event) => {
    login();
    
});

inputUser.addEventListener('keypress', (event) =>{
    if (event.keyCode === 13) {
        login();
    } 
})

inputPass.addEventListener('keypress', (event) =>{
    if (event.keyCode === 13) {
        login();
    }
})

