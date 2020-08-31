const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 880,
    height: 635,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile("./src/index.html");

  // Open the DevTools.
  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);
