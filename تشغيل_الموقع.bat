@echo off
chcp 65001 > nul
title تشغيل بوابة المصري الإخباري - Angular 18
color 0E
cls

echo ===============================================================================
echo        🅰️  بوابة المصري الإخباري - مشغل مشروع الانجيولار (Angular 18)
echo ===============================================================================
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [!] تنبيه: لم يتم العثور على برمجية Node.js على جهازك.
    echo لتشغيل مشروع Angular، يرجى تحميله وتثبيته مجاناً من:
    echo https://nodejs.org
    echo.
    pause
    start https://nodejs.org
    exit /b
)

echo [✓] تم التحقق من Node.js بنجاح.
echo.

if not exist node_modules (
    echo [⏳] جاري تثبيت حزم Angular 18 لأول مرة فقط، يرجى الانتظار دقيقة...
    call npm install
    if %errorlevel% neq 0 (
        echo [X] حدث خطأ أثناء تثبيت الحزم، تأكد من اتصال الإنترنت ثم أعد المحاولة.
        pause
        exit /b
    )
)

echo [🚀] جاري تشغيل سيرفر المشروع...
echo سيتم فتح الموقع تلقائياً في متصفحك على الرابط:
echo http://localhost:4200
echo.
echo [معلومة]: يمكنك أيضاً تشغيل سيرفر الباك إند المرفق وقاعدة البيانات عبر:
echo npm run server
echo -------------------------------------------------------------------------------
echo [!] لإيقاف تشغيل السيرفر في أي وقت، يمكنك إغلاق هذه النافذة.
echo -------------------------------------------------------------------------------
echo.

timeout /t 3 /nobreak > nul
start http://localhost:4200

call npm start

pause
