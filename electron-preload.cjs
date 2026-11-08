const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  runCode: (code, input) => ipcRenderer.invoke('compile-cpp', code, input)
});