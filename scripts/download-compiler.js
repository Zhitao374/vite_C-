// scripts/download-compiler.js
import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import { execSync } from 'node:child_process';

const ROOT = path.resolve(__dirname, '..');
const COMPILER_DIR = path.join(ROOT, 'resources', 'compiler');
const ZIP_PATH = path.join(ROOT, 'resources', 'compiler.zip');

// 这里找一个稳定开源的 TDM-GCC 便携版下载链接
const DOWNLOAD_URL = 'https://github.com/.../tdm-gcc-portable.zip'; 

if (fs.existsSync(path.join(COMPILER_DIR, 'bin', 'g++.exe'))) {
  console.log('✅ 本地编译器已存在，跳过下载。');
  process.exit(0);
}

console.log('⏳ 正在下载便携版 C++ 编译器 (约 80MB)...');

if (!fs.existsSync(path.join(ROOT, 'resources'))) {
  fs.mkdirSync(path.join(ROOT, 'resources'), { recursive: true });
}

const file = fs.createWriteStream(ZIP_PATH);
https.get(DOWNLOAD_URL, (response) => {
  response.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('✅ 下载完成，正在解压...');
    
    // 使用系统自带的解压（Windows PowerShell）
    // 或者引入解压库（如 adm-zip）
    try {
      execSync(`powershell -command "Expand-Archive -Path '${ZIP_PATH}' -DestinationPath '${COMPILER_DIR}' -Force"`);
      fs.unlinkSync(ZIP_PATH); // 删除压缩包
      console.log('🎉 编译器部署完成！');
    } catch (e) {
      console.error('❌ 解压失败，请手动解压', e.message);
    }
  });
}).on('error', (err) => {
  fs.unlinkSync(ZIP_PATH);
  console.error('❌ 下载失败:', err.message);
});