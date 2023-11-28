const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  printToThermal: async (content) => {
    try {
      const resultado = await ipcRenderer.invoke('print', content);
      return resultado;
    } catch (error) {
      console.error(error);
    }
  },

  userSearch: async (usuario) => { //busca el usuario en la bd
    try {
      const resultado = await ipcRenderer.invoke('search-user', usuario);
      return resultado;
    } catch (error) {
      console.error(error);
    }
  },
  user: async () => {
    try {
      const resultado = ipcRenderer.invoke('user');
      return resultado;
    } catch (error) {
      console.error(error);
    }
  },
  userSave: async (usuario) => { // Guarda el usuario en la BD
    try {
      const resultado = await ipcRenderer.invoke('save-user', usuario);
      return resultado; //devuelve el usuario
    } catch (error) {
      console.error(error);
    }
  },

  login: (someArgument) => {
    ipcRenderer.invoke('login', someArgument);
  },
  signOut: (someArgument) => {
    ipcRenderer.invoke('sign-out', someArgument);
  },
  
  /*=================================*/
  cajaSave: (caja) => {
    return ipcRenderer.invoke('caja-save', caja);
  },

  entradaSave: (entrada) => {
    return ipcRenderer.invoke('entrada-save', entrada);
  },

  salidaSave: (salida) => {
    return ipcRenderer.invoke('salida-save', salida);
  },

  /*=================================*/
  //distribuidor 
  distriSave: async (distribuidor) => { // Guarda un diso en la BD
    try {
      const resultado = await ipcRenderer.invoke('save-dis', distribuidor);
      return resultado;//devuelve un mensaje:'El producto se guardo correctamente'
    } catch (error) {
      console.error(error);
    }
  },

  //productos 
  productSave: async (productos) => { // Guarda un diso en la BD
    try {
      const resultado = await ipcRenderer.invoke('save-pro', productos);
      return resultado;//devuelve un mensaje:'El producto se guardo correctamente'
    } catch (error) {
      console.error(error);
    }
  },

  //productos 
  productUptade: async (productos) => { // Guarda un diso en la BD
    try {
      const resultado = await ipcRenderer.invoke('update-pro', productos);
      return resultado;//devuelve un mensaje:'El producto se guardo correctamente'
    } catch (error) {
      console.error(error);
    }
  },

  //Update Stock Porduct 
  productStock: async (productos) => { // Guarda un diso en la BD
    try {
      const resultado = await ipcRenderer.invoke('stock-pro', productos);
      return resultado;
    } catch (error) {
      console.error(error);
    }
  },
  //listado de distribuidores
  distriPull: async () => {
    try {
      const resultado = await ipcRenderer.invoke('pull-dis');
      return resultado;
    } catch (error) {
      console.error(error);
    }
  },

  //guardar clientes

  clienteSave: async (clientes) => { // Guarda un diso en la BD
    try {
      const resultado = await ipcRenderer.invoke('save-cli', clientes);
      return resultado;//devuelve un mensaje:'El producto se guardo correctamente'
    } catch (error) {
      console.error(error);
    }
  },

  clienteUpdate: async (cliente) => { // Guarda un diso en la BD
    try {
      const resultado = await ipcRenderer.invoke('update-cli', cliente);
      return resultado;//devuelve un mensaje:'El producto se guardo correctamente'
    } catch (error) {
      console.error(error);
    }
  },

  clienteDelete: async (clientes) => { // Guarda un diso en la BD
    try {
      const resultado = await ipcRenderer.invoke('delete-cli', clientes);
      return resultado;//devuelve un mensaje:'El producto se guardo correctamente'
    } catch (error) {
      console.error(error);
    }
  },


  //selected de clientes
  clientePull: async () => {
    try {
      const resultado = await ipcRenderer.invoke('pull-cli');
      return resultado;
    } catch (error) {
      console.error(error);
    }
  },

  //mandar a llamar productos
  productoPull: async () => {
    try {
      const resultado = await ipcRenderer.invoke('pull-pro');
      return resultado;
    } catch (error) {
      console.error(error);
    }
  },
  productoSearch: async (product) => {
    try {
      const resultado = await ipcRenderer.invoke('search-product', product);
      return resultado;
    } catch (error) {
      console.error(error);
    }
  },

  productDelete: async (product) => {
    try {
      const resultado = await ipcRenderer.invoke('delete-product', product);
      return resultado;
    } catch (error) {
      console.error(error);
    }
  },

  saleSave: async (infoSale) => {
    try {
      const resultado = await ipcRenderer.invoke('save-sale', infoSale);
      return resultado;
    } catch (error) {
      console.error(error);
    }
  },

  userPull: async () => {
    try {
      const resultado = await ipcRenderer.invoke('pull-user');
      return resultado;
    } catch (error) {
      console.error(error);
    }
  },

  userDelete: async (userId) => {
    try {
      const resultado = await ipcRenderer.invoke('delete-user', userId);
      return resultado;
    } catch (error) {
      console.error(error);
    }
  },

  userUpdate: async (userId, newData) => {
    try {
      const resultado = await ipcRenderer.invoke('update-user', userId, newData);
      return resultado;
    } catch (error) {
      console.error(error);
    }
  },

  getUserData: async (userId) => {
    try {
      const resultado = await ipcRenderer.invoke('get-user-data', userId);
      return resultado;
    } catch (error) {
      console.error(error);
    }
  },

  //REPARACIONES
  reparaSave: async (reparaciones) => { // Guarda un diso en la BD
    try {
      const resultado = await ipcRenderer.invoke('save-repara', reparaciones);
      return resultado;//devuelve un mensaje:'El producto se guardo correctamente'
    } catch (error) {
      console.error(error);
    }
  },
  //listar
  reparaPull: async () => {
    try {
      const resultado = await ipcRenderer.invoke('pull-repa');
      return resultado;
    } catch (error) {
      console.error(error);
    }
  },


  repaDelete: async (repaId) => {
    try {
      const resultado = await ipcRenderer.invoke('delete-repa', repaId);
      return resultado;
    } catch (error) {
      console.error(error);
    }
  },

  repaUpdate: async (repaId, newData) => {
    try {
      const resultado = await ipcRenderer.invoke('update-repa', repaId, newData);
      return resultado;
    } catch (error) {
      console.error(error);
    }
  },

  getRepaData: async (repaId) => {
    try {
      const resultado = await ipcRenderer.invoke('get-repa-data', repaId);
      return resultado;
    } catch (error) {
      console.error(error);
    }
  },

  intSave: async (prueba) => { // Guarda un diso en la BD
    try {
      const resultado = await ipcRenderer.invoke('save-int', prueba);
      return resultado;//devuelve un mensaje:'El producto se guardo correctamente'
    } catch (error) {
      console.error(error);
    }
  },

  //eliminar dis
  disDelete: async (disId) => {
    try {
      const resultado = await ipcRenderer.invoke('delete-dis', disId);
      return resultado;
    } catch (error) {
      console.error(error);
    }
  },

  disUpdate: async (disId, newData) => {
    try {
      const resultado = await ipcRenderer.invoke('update-dis', disId, newData);
      return resultado;
    } catch (error) {
      console.error(error);
    }
  },

  getDisData: async (disId) => {
    try {
      const resultado = await ipcRenderer.invoke('get-dis-data', disId);
      return resultado;
    } catch (error) {
      console.error(error);
    }
  },

  //////====== Credito ======/////////
  getCredits: async () => {
    try {
      const resultado = await ipcRenderer.invoke('get-credits');
      return resultado;
    } catch (error) {
      console.error(error);
    }
  },
  getCredit: async (credit) => {
    try {
      const resultado = await ipcRenderer.invoke('get-credit',credit);
      return resultado;
    } catch (error) {
      console.error(error);
    }
  },

  saveCredit: async (infoCredit) => {
    try {
      const resultado = await ipcRenderer.invoke('save-credit', infoCredit);
      return resultado;
    } catch (error) {
      console.error(error);
    }
  },

  pagoMes: async (idBono) => {
    try {
      const resultado = await ipcRenderer.invoke('pago_mes', idBono);
      return resultado;
    } catch (error) {
      console.error(error);
    }
  },

  //////====== Apartado ======/////////
  getApartado: async () => {
    try {
      const resultado = await ipcRenderer.invoke('get-apartado');
      return resultado;
    } catch (error) {
      console.error(error);
    }
  },

  saveApartado: async (infoCredit) => {
    try {
      const resultado = await ipcRenderer.invoke('save-apartado', infoCredit);
      return resultado;
    } catch (error) {
      console.error(error);
    }
  },




})

