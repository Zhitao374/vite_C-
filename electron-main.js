import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { exec, spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================
// C++ 编译运行核心逻辑
// ============================================
function runCppCode(code, input = '') {
  return new Promise((resolve) => {
    // 1. 确定编译器路径
    let compilerPath = app.isPackaged
      ? path.join(process.resourcesPath, 'compiler', 'bin', 'g++.exe')
      : path.join(__dirname, 'resources', 'compiler', 'bin', 'g++.exe');
      
    if (!fs.existsSync(compilerPath)) {
      console.warn('⚠️ 未找到内置编译器，尝试使用系统 g++');
      compilerPath = 'g++';
    }

    // 2. 准备临时文件
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

    // 3. 编译代码
    exec(`"${compilerPath}" "${cppPath}" -o "${exePath}" -O2`, { timeout: 10000 }, (compileErr, stdout, stderr) => {
      try { fs.unlinkSync(cppPath); } catch (e) {}
      
      if (compileErr) {
        return resolve({ output: `❌ 编译失败：\n${stderr || compileErr.message}` });
      }

      const compileTime = Date.now() - startTime;

      // 4. 运行程序 (使用 spawn 流式处理)
      // 加上 shell: true 以便在 Windows 上正确执行带引号的路径
      const child = spawn(exePath, []); 
      let runOutput = '';
      
      // 5. 喂入标准输入并立即关闭流（防止 cin 死等）
      if (input) {
        child.stdin.write(input + '\n');
      }
      child.stdin.end();

      // 捕获标准输出和错误输出
      child.stdout.on('data', (data) => { runOutput += data.toString(); });
      child.stderr.on('data', (data) => { runOutput += data.toString(); });

      // 超时强制终止（限时 2.5 秒，防死循环）
      const timeoutId = setTimeout(() => {
        child.kill('SIGKILL');
        runOutput += `\n❌ 运行超时 (超过 2.5 秒限制，请检查是否死循环)`;
      }, 2500);

      child.on('close', (code) => {
        clearTimeout(timeoutId);
        try { fs.unlinkSync(exePath); } catch (e) {}
        
        const runTime = Date.now() - startTime - compileTime;
        const timeMsg = `\n\n---\n✅ 编译: ${compileTime}ms | 运行: ${runTime}ms`;
        
        resolve({ output: (runOutput || '（程序无输出）') + timeMsg });
      });
    });
  });
}

// ============================================
// 窗口与 IPC
// ============================================
function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'electron-preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  if (process.env.NODE_ENV === 'development' || !app.isPackaged) {
    win.loadURL('http://localhost:5173');
    // win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }
}

app.whenReady().then(() => {
  Menu.setApplicationMenu(null); // 隐藏默认菜单

  // 接收两个参数：code 和 input
  ipcMain.handle('compile-cpp', async (event, code, input) => {
    return await runCppCode(code, input);
  });

  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});