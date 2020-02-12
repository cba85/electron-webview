const { remote } = require("electron");
const { BrowserWindow } = remote;
let print_win;

function navigateTo(url) {
  document.querySelector("webview").src = url;
}

function getControlsHeight() {
  let controls = document.querySelector("#controls");
  if (controls) {
    return controls.offsetHeight;
  }
  return 0;
}

function homeButton() {
  document.querySelector("#home").onclick = () => {
    let attribute = document.getElementById("webview");
    let home = attribute.getAttribute("data-home");
    navigateTo(home);
  };
}

function printButton() {
  document.getElementById("print_button").addEventListener("click", print);
}

function print() {
  let webview = document.querySelector("webview");
  print_win = new BrowserWindow({ "auto-hide-menu-bar": true });
  print_win.loadURL(webview.src);
  print_win.webContents.on("did-finish-load", () => {
    print_win.webContents.print();
  });
}
