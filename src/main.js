const electron = require("electron");

let win = null;

function createWindow() {
  win = new electron.BrowserWindow({
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });
  win.setMinimumSize(800, 600);

  // win.webContents.openDevTools()

  win.webContents.on("new-window", function (e, url) {
    e.preventDefault();
    require("electron").shell.openExternal(url);
  });

  win.loadFile("./index.html");

  win.on("closed", function () {
    win = null;
  });
}

electron.app.whenReady().then(createWindow);
