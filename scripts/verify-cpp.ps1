# Verify C++ examples by compiling .cpp files under public/codes/lesson-06
# Usage: powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\verify-cpp.ps1

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
# project root is parent of scripts folder
$projectRoot = Split-Path -Parent $scriptDir
Set-Location $projectRoot

# Collect .cpp files under public/codes/lesson-06
$files = Get-ChildItem -Path 'public/codes/lesson-06' -Filter '*.cpp' -Recurse -ErrorAction SilentlyContinue | Select-Object -ExpandProperty FullName
if (-not $files) {
    Write-Host "No .cpp files found under public/codes/lesson-06"
    exit 0
}

# Check for g++
if (-not (Get-Command g++ -ErrorAction SilentlyContinue)) {
    Write-Host "g++ not found in PATH. Please install MinGW-w64, TDM-GCC, or WSL with g++ and ensure g++ is on PATH."
    exit 2
}

$failed = $false
foreach ($f in $files) {
    Write-Host "Compiling: $f"
    g++ -std=c++17 -Wall -Wextra "$f" -o out.exe
    if ($LASTEXITCODE -ne 0) {
        Write-Host "COMPILE_FAILED: $f"
        $failed = $true
        break
    }
    Remove-Item out.exe -ErrorAction SilentlyContinue
}

if ($failed) {
    Write-Host "One or more files failed to compile."
    exit 1
} else {
    Write-Host "ALL_OK"
    exit 0
}