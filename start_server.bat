@echo off
title Event Orbit Manager - Server
echo ========================================
echo   STARTING EVENT ORBIT MANAGER SERVER
echo ========================================

:: Check for node_modules
if not exist "node_modules\" (
    echo [!] node_modules missing. Installing...
    call npm install
)

:: Launch browser in background
echo [i] Opening browser at http://localhost:8080
start http://localhost:8080

:: Start the server in this window
echo [i] Starting Vite dev server...
npm run dev
