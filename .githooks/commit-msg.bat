@echo off
node "%~dp0..\scripts\git-hooks\commit-msg.mjs" %1
exit /b %errorlevel%