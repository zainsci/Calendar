const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("electronAPI", {
  closeWindow: () => ipcRenderer.send("close-window", { closeWindow: true }),
  minimizeWindow: () =>
    ipcRenderer.send("minimize-window", { minimizeWindow: true }),
})
