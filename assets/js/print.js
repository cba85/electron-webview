const {remote} = require('electron');
const {BrowserWindow, dialog, shell} = remote;
const fs = require('fs');

let print_win;

function print() {
  var webview = document.querySelector('webview');
  print_win = new BrowserWindow({'auto-hide-menu-bar':true});
  print_win.loadURL(webview.src);
  print_win.webContents.on('did-finish-load', function() {
    print_win.webContents.print();
  });
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('print_button').addEventListener('click', print);
});