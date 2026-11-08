import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { exec, spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function runCppCode(code, input = '') {
  return new Promise((resolve) => {
    let compilerPath = app.isPackaged
      ? path.join(process.resourcesPath, 'compiler', 'bin', 'g++.exe')
      : path.join(__dirname, 'resources', 'compiler', 'bin', 'g++.exe');
      
    if (!fs.existsSync(compilerPath)) compilerPath = 'g++';

    const tempDir = os.tmpdir();
    const timeStr = Date.now();
    const cppPath = path.join(tempDir, `cpp_run_${timeStr}.cpp`);
    const exePath = path.join(tempDir, `cpp_run_${timeStr}${process.platform === 'win32' ? '.exe' : ''}`);

    try {
      fs.writeFileSync(cppPath, code, 'utf-8');
    } catch (err) {
      return resolve({ output: `❌ 无法写入临时文件：${err.message}` });
    }

    const startTime = Date.now();
    exec(`"${compilerPath}" "${cppPath}" -o "${exePath}" -O2`, { timeout: 10000 }, (compileErr, stdout, stderr) => {
      try { fs.unlinkSync(cppPath); } catch (e) {}
      if (compileErr) return resolve({ output: `❌ 编译失败：\n${stderr || compileErr.message}` });

      const compileTime = Date.now() - startTime;
      const child = spawn(exePath, []); 
      let runOutput = '';
      
      if (input) child.stdin.write(input + '\n');
      child.stdin.end();

      child.stdout.on('data', (data) => { runOutput += data.toString(); });
      child.stderr.on('data', (data) => { runOutput += data.toString(); });

      const timeoutId = setTimeout(() => {
        child.kill('SIGKILL');
        runOutput += `\n❌ 运行超时 (超过 2.5 秒限制，请检查是否死循环)`;
      }, 2500);

      child.on('close', (code) => {
        clearTimeout(timeoutId);
        try { fs.unlinkSync(exePath); } catch (e) {}
        const runTime = Date.now() - startTime - compileTime;
        resolve({ output: (runOutput || '（程序无输出）') + `\n\n---\n✅ 编译: ${compileTime}ms | 运行: ${runTime}ms` });
      });
    });
  });
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      // ⚡ 注意这里改成了 .cjs
      preload: path.join(__dirname, 'electron-preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false
    }
  });

  // ⚡ 强制打开控制台，如果白屏，直接看这里！
  win.webContents.openDevTools();

  if (!app.isPackaged) {
    win.loadURL('http://localhost:5173');
  } else {
    win.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }
}

app.whenReady().then(() => {
  Menu.setApplicationMenu(null); 
  ipcMain.handle('compile-cpp', async (event, code, input) => await runCppCode(code, input));
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});