@echo off
title Almasry News Portal - Angular 18 Runner
color 0B
cls

echo ===============================================================================
echo                🅰️  Almasry News Portal (Angular 18 Standalone)
echo ===============================================================================
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [!] Node.js is required. Download it from https://nodejs.org
    pause
    start https://nodejs.org
    exit /b
)

if not exist node_modules (
    echo Installing Angular dependencies...
    call npm install
)

echo Starting Angular dev server at http://localhost:4200 ...
timeout /t 3 /nobreak > nul
start http://localhost:4200

call npm start

pause
