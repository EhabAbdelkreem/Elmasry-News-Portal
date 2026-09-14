# بوابة المصري الإخباري - مشروع Full-Stack متكامل
## (Frontend Angular 18 + Backend .NET 8 Core Web API + SQL Server Database)

مشروع إخباري إلكتروني متكامل جاهز للرفع على **GitHub** أو أي استضافة سحابية (مثل MonsterASP أو IIS أو Azure)، ومجهز بنظام كامل يجمع:
1. **Frontend**: تطبيق Angular 18 متقدم بتصميم Tailwind CSS وتجربة مستخدم صحفية حديثة كاملة.
2. **Backend (.NET Core)**: مشروع خادم ASP.NET Core 8 Web API متكامل ومكتوب بلغة C# (`backend/`) مع Entity Framework Core وتوثيق Swagger.
3. **Database (SQL Server)**: سكربت قاعدة بيانات شامل (`Database_Setup.sql` و `backend/Database_Setup.sql`) جاهز للتشغيل على SQL Server مع الجداول والعلاقات والبيانات الأولية وحساب رئيس التحرير.
4. **Node.js Server (بديل خفيف)**: خادم Express مدمج إضافي في `server/` لتسهيل التجربة السريعة محلياً بدون تثبيت أدوات إضافية.

---

## 📂 هيكل المشروع المتكامل (Architecture)

```text
almasry-news/
├── backend/                    # 🟣 خادم ASP.NET Core 8 Web API الكامل (C# + EF Core)
│   ├── Controllers/            # واجهات الـ REST API (Articles, Categories, Auth)
│   ├── Data/AppDbContext.cs    # سياق قاعدة البيانات و Entity Framework
│   ├── Models/Entities.cs      # كيانات ونماذج البيانات (Articles, Users, Categories...)
│   ├── Database_Setup.sql      # سكربت إنشاء قاعدة بيانات SQL Server
│   ├── Program.cs              # إعدادات السيرفر و Swagger و CORS
│   └── AlmasryNews.Api.csproj  # ملف مشروع .NET 8
├── Database_Setup.sql          # نسخة من سكربت SQL Server في المجلد الرئيسي
├── server/                     # 🟢 خادم Express و JSON DB كبديل تشغيل سريع
│   ├── index.js
│   └── db/database.json
├── src/                        # 🅰️ الواجهة الأمامية الكاملة (Angular 18 Standalone)
│   ├── app/                    # المكونات والخدمات والنماذج ولوحة التحكم CMS
│   ├── index.html
│   └── styles.css
├── تشغيل_الموقع.bat            # تشغيل فوري بنقرة واحدة على ويندوز
├── package.json                # إعدادات وحزم المشروع
└── README.md
```

---

## 🔑 بيانات تسجيل الدخول الافتراضية

- **حساب الإدارة العليا ورئيس التحرير (Superadmin):**
  - البريد: `ehababdelkreem012@yahoo.com`
  - كلمة المرور: `01282407472ehab`
  - الصلاحية: م. إيهاب عبد الكريم (صلاحيات كاملة ومطلقة)

- **حساب مدير التحرير التنفيذي (Editor):**
  - البريد: `magdy@almasry-news.eg`
  - كلمة المرور: `magdy`
  - الصلاحية: أ. مجدي محمد أبو زيد

---

## 🚀 طرق تشغيل المشروع محلياً

### الطريقة 1: تشغيل الفرونت إند (Angular)
```bash
npm install
npm start
```
يفتح على الرابط: `http://localhost:4200`

### الطريقة 2: تشغيل الباك إند مع قاعدة البيانات (Node/Express Server)
```bash
npm run server
```
السيرفر سيعمل على المنفذ: `http://localhost:3001` (أو المنفذ المخصص عبر `PORT`).

---

## 📦 خطوات رفع المشروع كاملاً على GitHub (الباك + الفرونت + الداتابيز)

عند رفع المشروع إلى GitHub، سترفع كافة الملفات بما فيها مجلد `server/` وقاعدة البيانات `server/db/database.json`:

```bash
# 1. تهيئة المستودع
git init

# 2. إضافة كافة الملفات (Front + Back + Database)
git add .

# 3. تسجيل الـ Commit
git commit -m "feat: complete fullstack almasry news portal (Angular + Express + JSON DB)"

# 4. تحديد الفرع الرئيسي
git branch -M main

# 5. ربط مستودع GitHub الخاص بك (استبدل الرابط برابطك)
git remote add origin https://github.com/USERNAME/almasry-news.git

# 6. الرفع إلى GitHub
git push -u origin main
```
