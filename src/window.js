const path = require("path");
const electron = require("electron");
const { BrowserWindow } = electron; // https://www.electronjs.org/docs/api/browser-window

exports.createBrowserWindow = () => {
  // https://www.electronjs.org/docs/api/browser-window#class-browserwindow
  return new BrowserWindow({
    width: 1024,
    height: 768,
    icon: path.join(__dirname, "assets/icons/png/64x64.png"),
    //titleBarStyle: 'hidden',
    //frame: false,
    backgroundColor: "#fff",
    webPreferences: {
      nodeIntegration: true, // required for print function
      enableRemoteModule: true, // required for print function
      webviewTag: true, // https://www.electronjs.org/docs/api/webview-tag
    },
  });
};
