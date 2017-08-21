const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
var path = require('path')

// Path of your website
const url = 'https://www.github.com';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  mainWindow = new BrowserWindow({
    //titleBarStyle: 'hidden',
    width: 1024,
    height: 768,
    icon: path.join(__dirname, 'assets/icons/png/64x64.png')
  });
  mainWindow.loadURL(url);
  //mainWindow.openDevTools();
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
