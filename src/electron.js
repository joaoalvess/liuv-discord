const electron = require("electron");
const { screen } = require("electron");
const config = require("./config");
const app = electron.app;
const globalShortcut = electron.globalShortcut;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    width: width,
    height: height,
  });
  mainWindow.loadURL(config.url);
  mainWindow.on("closed", () => (mainWindow = null));
}

function toggleDevTools() {
  mainWindow.webContents.toggleDevTools();
}

function createShortcut() {
  globalShortcut.register("CmdOrCtrl+J", toggleDevTools);
}

app.whenReady().then(createWindow).then(createShortcut);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
    createShortcut();
  }
});
