// compile-server.js
const express = require('express');
const cors = require('cors');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const app = express();
app.use(cors()); // 允许前端跨域请求
app.use(express.json());

// 编译并运行代码的接口
app.post('/compile', (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: '没有代码' });

  // 生成临时文件路径
  const tempDir = os.tmpdir();
  const fileId = `temp_${Date.now()}`;
  const cppFile = path.join(tempDir, `${fileId}.cpp`);
  const exeFile = path.join(tempDir, `${fileId}.exe`);

  try {
    // 1. 把前端传来的代码写入临时 .cpp 文件
    fs.writeFileSync(cppFile, code);

    // 2. 调用本地 g++ 编译
    // 注意：确保你的电脑安装了 MinGW (g++) 并配置了环境变量
    execSync(`g++ "${cppFile}" -o "${exeFile}"`, { stdio: 'pipe' });

    // 3. 运行编译后的 exe 文件
    // 这里假设程序没有死循环，或者限制个超时时间
    const runOutput = execSync(`"${exeFile}"`, { encoding: 'utf-8', timeout: 3000 });

    res.json({ output: runOutput });
  } catch (error) {
    // 处理编译失败或运行崩溃的情况
    let errMsg = error.stderr ? error.stderr.toString() : error.message;
    res.json({ output: '❌ 运行出错：\n' + errMsg });
  } finally {
    // 4. 清理临时文件（防止硬盘塞满）
    if (fs.existsSync(cppFile)) fs.unlinkSync(cppFile);
    if (fs.existsSync(exeFile)) fs.unlinkSync(exeFile);
  }
});

app.listen(3000, () => {
  console.log('✅ 本地编译服务已启动：http://localhost:3000');
});