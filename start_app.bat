@echo off
setlocal enabledelayedexpansion
title MISSION START: EVENT ORBIT MANAGER

:: Neubrutalist Header
echo.
echo  ############################################################
echo  #                                                          #
echo  #          EVENT ORBIT MANAGER : NEUBRUTAL START           #
echo  #                                                          #
echo  ############################################################
echo.

:: 1. DEEP SCAN: node_modules
if not exist "node_modules\" (
    echo [!] ALERT: OPERATIVE DATA MISSING (node_modules not found).
    echo [i] INITIALIZING RECOVERY: Running npm install...
    call npm install
    if !errorlevel! neq 0 (
        echo [!] FATAL ERROR: RECOVERY FAILED.
        pause
        exit /b
    )
)

:: 2. FREQUENCY SCAN: PORT 8080
echo [i] SCANNING FREQUENCY : 8080...
netstat -ano | findstr LISTENING | findstr :8080 > nul
if !errorlevel! equ 0 (
    echo [!] ALERT: FREQUENCY JAMMED (Port 8080 already in use).
    echo [!] MISSION ABORTED. RESOLVE CONFLICT BEFORE RE-ENTRY.
    pause
    exit /b
)

echo.
echo [i] DEPLOYING CORE SERVER...
:: Start the dev server in a new window with a distinct title
start "EOM: SERVER" cmd /k "title EOM: SERVER && npm run dev"

:: 3. STABILIZATION WAIT
echo [i] STABILIZING SYSTEM (5s)...
timeout /t 5 /nobreak > nul

:: 4. INTERFACE LAUNCH
echo [i] ESTABLISHING CONNECTION: http://localhost:8080
start http://localhost:8080

echo.
echo  ------------------------------------------------------------
echo   SYSTEM STATUS: [ONLINE]
echo   MONITOR THE SERVER WINDOW FOR ACTIVE INTELLIGENCE.
echo  ------------------------------------------------------------
echo.
pause
exit
