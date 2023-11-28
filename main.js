const { app, BrowserWindow, ipcMain} = require('electron');
const { setMainMenu } = require('./menu.js');
const path = require('path');
require('./src/Services/connection'); //Start the connection to the database
require('./src/Services/consult');

let usuario;
let caja = {
  caja: [],
  entrada: [],
  salida: [],
};

app.disableHardwareAcceleration(); // Disables hardware acceleration, eliminating a error

require('electron-reload')(__dirname); //reloads the app when a change is made

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow;

// Ventana del Login
const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 720,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    icon:  path.join(__dirname + './icon-system.png'),
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, './src/index.html'));
  
  setMainMenu(mainWindow);

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


// Ventana del home
const homeWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 720,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    icon:  path.join(__dirname + './icon-system.png'),
  });
  // and load the index.html of the app.

  mainWindow.loadFile(path.join(__dirname, './src/ventacontado.html'));

  setMainMenu(mainWindow);

  mainWindow.maximize()
  

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

ipcMain.handle('login', (event, obj) => {  
  mainWindow.close();
  homeWindow();
  mainWindow.show();
  
  usuario = obj;
  
});

ipcMain.handle('sign-out', (event, obj)=>{
  mainWindow.close();
  usuario = null;
  caja.caja = [],
  caja.entrada = [],
  caja.salida = [],
  createWindow();
  //mainWindow.show();
})


ipcMain.handle('user',  (event, obj) => {
  return usuario;
});


/*========================================== */
/*========================================== */
ipcMain.handle('caja-save',  (event, obj) => {
  
  if (obj) {
    usuario.caja = obj;
  } else if(!usuario.caja){
    usuario.caja = 0.00;
  }
  
  return usuario.caja;
});

ipcMain.handle('entrada-save',  (event, obj) => {
  if (obj) {
    caja.entrada.push(obj);
  }
  
  if (caja.entrada) {
    return caja.entrada;
  } else {
    return [0];
  }
});

ipcMain.handle('salida-save',  (event, obj) => {
  if (obj) {
    caja.salida.push(obj);
  }


  if (caja.salida) {
    return caja.salida;
  } else {
    return [0];
  }
});


let detalle_venta;

/*========================================== */
/*========================================== */
/*========================================== */


ipcMain.handle('print', (event, content) => {
  console.log('Detalle Venta >>>', detalle_venta , 'Content>>>', content);
  detalle_venta = content;
  
  const options = {
    //silent: false,
    silent: true,
    printBackground: true,
    color: false,
    margins: {
      marginType: 'printableArea',
    },
    landscape: false,
    scaleFactor: 0.9,
    copies: 1,
  }

  const printWindow = new BrowserWindow({show: false, webPreferences: { offscreen: true, preload: path.join(__dirname, './src/tickets/ticket.js') } });
  //const printWindow = new BrowserWindow({width: 300, height: 800,minWidth: 300, minHeight: 800, show: true, webPreferences: { offscreen: false, preload: path.join(__dirname, './src/tickets/ticket.js') } });

  printWindow.loadURL(path.join(__dirname, './src/tickets/venta.html')); // Carga el archivo HTML con el <div> que deseas imprimir
  //printWindow.webContents.openDevTools();

  printWindow.webContents.on('dom-ready', () => {

    // Crea una vista previa de impresión con el contenido del <div>
    printWindow.webContents.on('did-finish-load', () => {
      printWindow.webContents.print(options, (success, failureReason) => {
        if (!success) console.log(failureReason);
    
        console.log('Print Initiated');
        printWindow.close();

      }); // Imprime el contenido del <div>
    });
  });
  return true;

});


ipcMain.handle('info-venta',  (event, obj) => {
  console.log('Detalle Venta 0>>>', detalle_venta[0]);
  console.log('Detalle Venta 1>>>', detalle_venta[1][0][0].fecha);
  return detalle_venta;
});
