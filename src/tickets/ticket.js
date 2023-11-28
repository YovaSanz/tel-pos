const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {

    infoVenta: async () => {
        try {
            const resultado = await ipcRenderer.invoke('info-venta');
            return resultado;
        } catch (error) {
            console.error(error);
        }
    },
})

