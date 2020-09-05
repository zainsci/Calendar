const electron = require("electron");

let win = null;

function createWindow() {
  win = new electron.BrowserWindow({
    frame: false,
    width: 880,
    maxWidth: 880,
    height: 645,
    maxHeight: 645,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });

  win.webContents.openDevTools();

  win.loadFile("./src/index.html");

  win.on("closed", function () {
    win = null;
  });
}

electron.app.whenReady().then(createWindow);
