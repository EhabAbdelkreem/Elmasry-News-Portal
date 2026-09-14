@echo off
chcp 65001 > nul
echo ================================================================
echo   بوابة المصري الإخباري - أداة النشر والتحضير لـ MonsterASP.NET
echo ================================================================
echo.

echo [1/3] جاري فحص بيئة .NET SDK...
dotnet --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [خطأ] لم يتم العثور على dotnet SDK على جهازك. يُرجى تثبيت .NET 8 SDK أولاً.
    pause
    exit /b
)

echo [2/3] جاري عمل Publish لمشروع ASP.NET Core Web API...
cd backend
dotnet publish -c Release -o ../publish_monsterasp

if %errorlevel% neq 0 (
    echo [خطأ] فشلت عملية الـ Publish. تفقد أخطاء الكود أعلاه.
    pause
    exit /b
)

cd ..

echo [3/3] جاري التأكد من ملف web.config وقاعدة البيانات...
if exist backend\web.config (
    copy backend\web.config publish_monsterasp\web.config > nul
)
if exist Database_Setup.sql (
    copy Database_Setup.sql publish_monsterasp\Database_Setup.sql > nul
)

echo.
echo ================================================================
echo   ✅ تم إنشاء مجلد النشر بنجاح: publish_monsterasp
echo ================================================================
echo   الخطوة التالية:
echo   1. افتح المجلد: publish_monsterasp
echo   2. حدد جميع الملفات التي بداخله واضغط Right Click -> Send to Compressed ZIP.
echo   3. ارفع ملف الـ ZIP إلى File Manager في لوحة تحكم MonsterASP.
echo   4. قم بعمل Extract داخل مجلد site / wwwroot.
echo ================================================================
echo.
pause
