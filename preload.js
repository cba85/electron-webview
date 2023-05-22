const { BrowserWindow } = require("@electron/remote");
const ipcRenderer = require('electron').ipcRenderer

window.prompt = function(title, val)
{
	return ipcRenderer.sendSync('prompt', {title, val});
}

window.addEventListener("DOMContentLoaded", () => {
  // Print function
  document.getElementById("print_button").addEventListener("click", () => {
    const url = document.querySelector("webview").getAttribute("src");

    let printWindow = new BrowserWindow({ "auto-hide-menu-bar": true });
    printWindow.loadURL(url);

    printWindow.webContents.on("did-finish-load", () => {
      printWindow.webContents.print();
    });
  });
});
