const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // 这里的 'compile-cpp' 就是报错里提到的通道名
  runCode: (code) => ipcRenderer.invoke('compile-cpp', code) 
});