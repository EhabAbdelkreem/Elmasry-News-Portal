@echo off
chcp 65001 > nul
title بوابة المصري الإخباري - تشغيل المشروع المتكامل (Full-Stack)
color 0B
cls

echo ===============================================================================
echo          🌟 بوابة المصري الإخباري - التشغيل التلقائي بضغطة واحدة 🌟
echo       (Frontend: Angular 18  +  Backend: .NET Core 8 Web API / Node)
echo ===============================================================================
echo.

:: 1. فحص Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [!] تنبيه: Node.js غير مثبت على جهازك.
    echo لتشغيل واجهة Angular، يُرجى تثبيته من https://nodejs.org
    pause
    start https://nodejs.org
    exit /b
)

:: 2. تثبيت الحزم إذا لم تكن موجودة
if not exist node_modules (
    echo [⏳] جاري تثبيت حزم واجهة Angular لأول مرة فقط، انتظر لحظات...
    call npm install
    if %errorlevel% neq 0 (
        echo [X] فشل تثبيت الحزم. تأكد من اتصال الإنترنت ثم أعد المحاولة.
        pause
        exit /b
    )
)

:: 3. فحص بيئة .NET لتشغيل الباك إند
where dotnet >nul 2>nul
if %errorlevel% equ 0 (
    if exist backend\AlmasryNews.Api.csproj (
        echo [🟣] جاري تشغيل سيرفر الباك إند ASP.NET Core 8 Web API في نافذة خلفية...
        start "AlmasryNews .NET Core Backend API" cmd /k "cd backend && dotnet run"
    )
) else (
    echo [ℹ️] لم يتم العثور على dotnet. سيتم تشغيل الباك إند الخفيف المرفق (Node/Express)...
    start "AlmasryNews Node Backend" cmd /k "npm run server"
)

echo.
echo [🚀] جاري تشغيل واجهة الموقع (Angular 18)...
echo [🌐] سيتم فتح الموقع في متصفحك تلقائياً بعد ثوانٍ على:
echo      http://localhost:4200
echo.
echo ===============================================================================
echo 🔑 بيانات تسجيل الدخول الافتراضية:
echo - م. إيهاب عبد الكريم (Superadmin):
echo   البريد: ehababdelkreem012@yahoo.com
echo   كلمة المرور: 01282407472ehab
echo ===============================================================================
echo.

timeout /t 4 /nobreak > nul
start http://localhost:4200

:: تشغيل خادم Angular
call npm start

pause
