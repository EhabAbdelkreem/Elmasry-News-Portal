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

echo [3/4] جاري التأكد من مجلد wwwroot وملف web.config...
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

echo [4/4] جاري فحص محتويات مجلد النشر...
if exist publish_monsterasp\wwwroot\index.html (
    echo [✓] تم التحقق بنجاح: ملف wwwroot\index.html جاهز وموجود داخل مجلد النشر!
) else (
    echo [!] تنبيه: يرجى التأكد من وجود ملفات Angular داخل backend\wwwroot.
)

echo.
echo ================================================================
echo   ✅ تم إنشاء وتجهيز مجلد النشر بنجاح: publish_monsterasp
echo ================================================================
echo   مجلد publish_monsterasp يحتوي الآن على:
echo   1. مجلد wwwroot (وفيه واجهة الموقع Angular بالكامل: HTML, CSS, JS)
echo   2. ملف AlmasryNews.Api.dll (سيرفر الباك إند)
echo   3. ملف web.config (إعدادات استضافة MonsterASP وخادم IIS)
echo   4. ملف Database_Setup.sql (قاعدة بيانات SQL Server)
echo.
echo   الخطوة التالية للرفع على MonsterASP.NET:
echo   1. افتح المجلد: publish_monsterasp
echo   2. حدد جميع الملفات التي بداخله واضغط Right Click -> Send to Compressed ZIP.
echo   3. ارفع ملف الـ ZIP إلى File Manager في لوحة تحكم MonsterASP.
echo   4. قم بعمل Extract داخل مجلد الموقع الرئيسي (site / wwwroot).
echo ================================================================
echo.
pause
