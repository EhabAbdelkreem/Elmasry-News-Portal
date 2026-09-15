@echo off
chcp 65001 > nul
echo ================================================================
echo   AlmasryNews - Publishing for MonsterASP.NET Hosting
echo ================================================================
echo.

echo [1/4] Building Backend (.NET 8)...
cd backend
dotnet clean -c Release
dotnet restore
dotnet build -c Release
if %errorlevel% neq 0 (
    echo [ERROR] Failed to build backend!
    pause
    exit /b %errorlevel%
)

echo.
echo [2/4] Publishing backend to: publish_monsterasp...
dotnet publish -c Release -o ../publish_monsterasp /p:UseAppHost=false
if %errorlevel% neq 0 (
    echo [ERROR] Failed to publish backend!
    pause
    exit /b %errorlevel%
)

cd ..

echo.
echo [3/4] Checking and syncing wwwroot and web.config...
if not exist publish_monsterasp\wwwroot (
    mkdir publish_monsterasp\wwwroot
)
xcopy /E /I /Y backend\wwwroot publish_monsterasp\wwwroot > nul

if exist backend\web.config (
    copy /Y backend\web.config publish_monsterasp\web.config > nul
)
if exist Database_Setup.sql (
    copy /Y Database_Setup.sql publish_monsterasp\Database_Setup.sql > nul
)

echo.
echo [4/4] Verifying publish files...
if exist publish_monsterasp\wwwroot\index.html (
    echo [SUCCESS] wwwroot\index.html is ready inside publish_monsterasp!
) else (
    echo [WARNING] Please make sure Angular build is in backend\wwwroot.
)

echo.
echo ================================================================
echo   Publishing completed successfully: publish_monsterasp
echo ================================================================
echo   Next steps:
echo   1. Open: publish_monsterasp
echo   2. Select all files inside and compress to site.zip
echo   3. Upload and extract inside MonsterASP File Manager!
echo ================================================================
echo.
pause
