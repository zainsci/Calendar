const electron = require("electron");

function createWindow() {
  const win = new electron.BrowserWindow({
    frame: false,
    width: 880,
    height: 645,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile("./src/index.html");
}

electron.app.whenReady().then(createWindow);
