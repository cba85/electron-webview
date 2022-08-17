const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  // Print function
  print: (arg) => ipcRenderer.invoke("print", arg),
});
