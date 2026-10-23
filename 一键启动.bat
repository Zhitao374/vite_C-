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

:: 检查 node_modules 是否存在
if not exist "node_modules" (
    echo ⚠️  未检测到依赖，正在为您执行 npm install...
    call npm install
    if errorlevel 1 (
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

:: 启动项目
call npm start

:: 如果进程退出，暂停一下，防止窗口一闪而过
pause