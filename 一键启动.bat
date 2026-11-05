@echo off
chcp 65001 >nul
title C++ 竞赛课程 - 一键启动器
color 0b

echo ===================================================
echo.
echo            🚀 C++ 竞赛课程系统 启动中...
echo.
echo ===================================================
echo.

:: 1. 检查物理外挂引擎 my-electron 是否存在
if not exist "my-electron" (
    color 0c
    echo ❌ 【严重错误】未检测到 my-electron 引擎文件夹！
    echo 请确保把包含 electron.exe 的 my-electron 文件夹放在当前目录下。
    echo （可从之前的备份或 U 盘中复制过来）
    pause
    exit /b
)

:: 2. 检查 node_modules 是否存在
if not exist "node_modules" (
    echo ⚠️  未检测到依赖，正在为您执行 npm install...
    :: 强制使用国内镜像源安装，防止卡死
    call npm install --registry=https://registry.npmmirror.com
    if errorlevel 1 (
        color 0c
        echo.
        echo ❌ 依赖安装失败，请检查网络或 Node.js 环境！
        pause
        exit /b
    )
)

echo.
echo ⏳ 正在启动开发环境（Vite + Electron）...
echo （请勿关闭此黑窗口，关闭即代表退出程序）
echo.

:: 3. 启动项目
call npm start

:: 如果进程退出，暂停一下，防止窗口一闪而过
pause