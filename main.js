const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

var path = require('path');
var fs = require("fs");

// Menu (for standard keyboard shortcuts)
const {Menu} = require('electron');

const template = [
  {
    label: 'Edit',
    submenu: [
      {role: 'undo'},
      {role: 'redo'},
      {type: 'separator'},
      {role: 'cut'},
      {role: 'copy'},
      {role: 'paste'},
      {role: 'pasteandmatchstyle'},
      {role: 'delete'},
      {role: 'selectall'}
    ]
  },
  {
    label: 'View',
    submenu: [
      {role: 'reload'},
      {role: 'forcereload'},
      {role: 'toggledevtools'},
      {type: 'separator'},
      {role: 'resetzoom'},
      {role: 'zoomin'},
      {role: 'zoomout'},
      {type: 'separator'},
      {role: 'togglefullscreen'}
    ]
  },
  {
    role: 'window',
    submenu: [
      {role: 'minimize'},
      {role: 'close'}
    ]
  }
];

if (process.platform === 'darwin') {
  template.unshift({
    label: app.getName(),
    submenu: [
      {role: 'about'},
      {type: 'separator'},
      {role: 'services', submenu: []},
      {type: 'separator'},
      {role: 'hide'},
      {role: 'hideothers'},
      {role: 'unhide'},
      {type: 'separator'},
      {role: 'quit'}
    ]
  });

  // Edit menu
  template[1].submenu.push(
    {type: 'separator'},
    {
      label: 'Speech',
      submenu: [
        {role: 'startspeaking'},
        {role: 'stopspeaking'}
      ]
    }
  );

  // Window menu
  template[3].submenu = [
    {role: 'close'},
    {role: 'minimize'},
    {role: 'zoom'},
    {type: 'separator'},
    {role: 'front'}
  ]
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let initPath;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  initPath = path.join(app.getPath('userData'), "init.json");

  var data;
  try {
    data = JSON.parse(fs.readFileSync(initPath, 'utf8'));
  }
  catch(e) {}

  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    icon: path.join(__dirname, 'assets/icons/png/64x64.png'),
    //titleBarStyle: 'hidden',
    //frame: false,
    backgroundColor: '#fff',
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true
    }
  });

  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // Display Dev Tools
  //mainWindow.openDevTools();

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  var data = {
    bounds: mainWindow.getBounds()
  };
  fs.writeFileSync(initPath, JSON.stringify(data));
  app.quit();
});
