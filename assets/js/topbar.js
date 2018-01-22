/* Topbar */

const {remote} = require('electron');
const {BrowserWindow, dialog, shell} = remote;
let print_win;

function navigateTo(url) {
  document.querySelector('webview').src = url;
}

function getControlsHeight() {
  var controls = document.querySelector('#controls');
  if (controls) {
    return controls.offsetHeight;
  } else {
    return 0;
  }
}

function homeButton() {
   document.querySelector('#home').onclick = function() {
    var attribute = document.getElementById('webview');
    var home = attribute.getAttribute("data-home");
    navigateTo(home);
  };
}

function printButton() {
  document.getElementById('print_button').addEventListener('click', print);
}

function print() {
  var webview = document.querySelector('webview');
  print_win = new BrowserWindow({'auto-hide-menu-bar':true});
  print_win.loadURL(webview.src);
  print_win.webContents.on('did-finish-load', function() {
    print_win.webContents.print();
  });
}