// Electron
const { app, Menu } = require("electron");
const { BrowserWindow } = require("electron"); 
const remoteMain = require("@electron/remote/main");
remoteMain.initialize();

const electron = require('electron');
const ipcMain = electron.ipcMain

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.allowRendererProcessReuse = true;

app.on('web-contents-created', function (webContentsCreatedEvent, contents) {
  if (contents.getType() === 'webview') {
    contents.on('new-window', function (newWindowEvent, url) {
      console.log('block');
      //newWindowEvent.preventDefault();
      mainWindow.loadURL(url);
    });
  }
});

app.on("ready", () => {
  // Main window
  const window = require("./src/window");
  mainWindow = window.createBrowserWindow(app);
  remoteMain.enable(mainWindow.webContents);

  // Option 1: Uses Webtag and load a custom html file with external content
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Option 2: Load directly an URL if you don't need interface customization
  //mainWindow.loadURL("https://github.com");
  // Option 3: Uses BrowserView to load an URL
  //const view = require("./src/view");
  //view.createBrowserView(mainWindow);
  // Display Dev Tools
  mainWindow.openDevTools();
  // Menu (for standard keyboard shortcuts)
  const menu = require("./src/menu");
  const template = menu.createTemplate(app.name);
  const builtMenu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(builtMenu);
  
  var promptResponse
  ipcMain.on('prompt', function(eventRet, arg) 
  {
    promptResponse = null
    var promptWindow = new BrowserWindow({
      width: 200,
      height: 100,
      show: false,
      resizable: false,
      movable: false,
      alwaysOnTop: true,
      frame: false
    })
    arg.val = arg.val || ''
    const promptHtml = '<label for="val">' + arg.title + '</label>\
    <input id="val" value="' + arg.val + '" autofocus />\
    <button onclick="require(\'electron\').ipcRenderer.send(\'prompt-response\', document.getElementById(\'val\').value);window.close()">Ok</button>\
    <button onclick="window.close()">Cancel</button>\
    <style>body {font-family: sans-serif;} button {float:right; margin-left: 10px;} label,input {margin-bottom: 10px; width: 100%; display:block;}</style>'
    promptWindow.loadURL('data:text/html,' + promptHtml)
    promptWindow.show()
    promptWindow.on('closed', function() {
      eventRet.returnValue = promptResponse
      promptWindow = null
    })
  })
  
  ipcMain.on('prompt-response', function(event, arg) 
  {
    if (arg === ''){ arg = null }
    promptResponse = arg
  })  
  
  
  
  
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  app.quit();
});


