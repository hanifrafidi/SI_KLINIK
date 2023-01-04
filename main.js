const path = require("path");
const { app, BrowserWindow } = require("electron");
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
const isDev = require("electron-is-dev");
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    autoHideMenuBar: true
  });
  win.loadURL(
    isDev ? "https://localhost:5100" : `file://${path.join(__dirname, "./dist/index.html")}`
  );
  if (isDev) {
    win.webContents.openDevTools({ mode: "detach" });
  }
}
app.whenReady().then(createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
