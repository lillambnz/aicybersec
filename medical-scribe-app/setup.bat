@echo off
REM Medical Scribe App - Quick Setup Script for Windows
REM This script sets up and runs the frontend for testing

echo ====================================
echo Medical AI Scribe - Quick Setup
echo ====================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js 18+ from: https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js detected:
node -v
echo [OK] npm detected:
npm -v
echo.

REM Navigate to frontend directory
cd /d "%~dp0\frontend"

REM Check if node_modules exists
if not exist "node_modules" (
    echo [INFO] Installing dependencies...
    echo [INFO] This will take 1-2 minutes...
    echo.
    call npm install

    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo [ERROR] Installation failed!
        echo Try running: npm cache clean --force
        pause
        exit /b 1
    )

    echo.
    echo [OK] Dependencies installed successfully!
) else (
    echo [OK] Dependencies already installed
)

echo.
echo [INFO] Starting development server...
echo.
echo Quick Guide:
echo    1. App will open at: http://localhost:3000
echo    2. Login with ANY email/password
echo    3. Explore Dashboard, Patients, Consultations
echo    4. Press Ctrl+C to stop the server
echo.
echo ====================================
echo.

REM Start the dev server
call npm run dev

pause
