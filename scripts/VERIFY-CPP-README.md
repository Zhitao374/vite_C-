此脚本用于在有 g++ 的环境下验证 `public/codes/lesson-06` 下的示例能否独立编译。

运行方式（PowerShell）：

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\verify-cpp.ps1
```

返回值说明：
- 0: 所有文件编译通过（ALL_OK）
- 1: 有文件编译失败
- 2: 系统中未找到 `g++`（请安装编译器并确保其在 PATH 中）

建议：在 Windows 上可安装 MinGW-w64 或使用 WSL 的 gcc。