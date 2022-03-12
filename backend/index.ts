import { app, BrowserWindow } from "electron"

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      // enableRemoteModule: true,
    },
  })
  mainWindow.setMinimumSize(800, 600)

  // win.webContents.openDevTools()

  mainWindow.webContents.on("new-window", function (e, url) {
    e.preventDefault()
    require("electron").shell.openExternal(url)
  })

  mainWindow.loadURL("http://localhost:3000")

  mainWindow.on("closed", function () {
    mainWindow = null
  })
}

app.on("ready", () => {
  createWindow()
  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
