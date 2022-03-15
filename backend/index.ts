import { app, BrowserWindow, ipcMain } from "electron"
import { join } from "path"

let mainWindow: BrowserWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: join(process.cwd(), "backend/preload.ts"),
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

  // IPC Events
  ipcMain.on("close-window", (e, { closeWindow }) => {
    if (closeWindow) mainWindow.close()
  })
  ipcMain.on("minimize-window", (e, { minimizeWindow }) => {
    if (minimizeWindow) mainWindow.minimize()
  })
}

app.on("ready", () => {
  createWindow()
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
