// electron-preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // 暴露一个 runCode 方法给前端
  runCode: (code) => ipcRenderer.invoke('compile-cpp', code)
});