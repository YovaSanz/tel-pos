const txtEntradasDinero = $('#txtEntradasDinero');
const txtDineroInicial = $('#txtDineroInicial');
const txtEntradaEfectivoTotal = $('#txtEntradaEfectivoTotal');

const txtVentas = $('#txtVentas');
const txtEntradas = $('#txtEntradas');
const txtSalidaDinero = $('#txtSalidaDinero');
const txtEnCajaTotal = $('#txtEnCajaTotal');


async function entrada() {

    txtDineroInicial.value = parseFloat(await window.electronAPI.cajaSave()).toFixed(2);
    
    const entradasDinero =  await window.electronAPI.entradaSave();
    txtEntradasDinero.value = entradasDinero.reduce((total, numero) => total + parseFloat(numero), 0).toFixed(2);

    const total = parseFloat(txtEntradasDinero.value + txtDineroInicial.value).toFixed(2)
    txtEntradaEfectivoTotal.innerText = total;
    return total;
}



async function enCaja() {

    txtEntradas.value = await entrada();
    
    const salidaDinero = await window.electronAPI.salidaSave();
    console.log(salidaDinero);
    txtSalidaDinero.value = salidaDinero.reduce((total, numero) => total + parseFloat(numero.cantidad), 0).toFixed(2);

    const total = ((parseFloat(txtEntradas.value) + parseFloat(txtVentas.value)) - parseFloat(txtSalidaDinero.value)).toFixed(2);
    txtEnCajaTotal.innerText = total;

    return total;
}

enCaja();

