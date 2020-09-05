const electron = require("electron");

function createWindow() {
  const win = new electron.BrowserWindow({
    width: 896,
    height: 674,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile("./src/index.html");
}

electron.app.whenReady().then(createWindow);
