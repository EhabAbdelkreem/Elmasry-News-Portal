-- ============================================================================
-- بوابة المصري الإخباري - سكربت إنشاء قاعدة البيانات الشاملة
-- Database: AlmasryNewsDb (SQL Server 2019 / 2022 / Azure SQL)
-- التوافق: ASP.NET Core 8 Web API + Entity Framework Core
-- المهندس: إيهاب عبد الكريم (Superadmin)
-- ============================================================================

USE master;
GO

IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'AlmasryNewsDb')
BEGIN
    CREATE DATABASE AlmasryNewsDb;
END
GO

USE AlmasryNewsDb;
GO

-- ============================================================================
-- 1. جدول المستخدمين (Users)
-- ============================================================================
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Users]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[Users] (
        [Id] NVARCHAR(100) NOT NULL PRIMARY KEY,
        [Email] NVARCHAR(256) NOT NULL UNIQUE,
        [PasswordHash] NVARCHAR(256) NOT NULL,
        [Name] NVARCHAR(150) NOT NULL,
        [Role] NVARCHAR(50) NOT NULL DEFAULT 'editor',
        [RoleTitle] NVARCHAR(100) NULL,
        [Department] NVARCHAR(100) NULL,
        [Avatar] NVARCHAR(MAX) NULL,
        [IsActive] BIT NOT NULL DEFAULT 1,
        [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE()
    );
END
GO

-- ============================================================================
-- 2. جدول الأقسام الإخبارية (Categories)
-- ============================================================================
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Categories]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[Categories] (
        [Id] NVARCHAR(100) NOT NULL PRIMARY KEY,
        [Slug] NVARCHAR(100) NOT NULL UNIQUE,
        [Name] NVARCHAR(150) NOT NULL,
        [NameEn] NVARCHAR(150) NULL,
        [Description] NVARCHAR(500) NULL,
        [IconName] NVARCHAR(50) NULL,
        [Color] NVARCHAR(20) NULL,
        [DisplayOrder] INT NOT NULL DEFAULT 0,
        [IsActive] BIT NOT NULL DEFAULT 1
    );
END
GO

-- ============================================================================
-- 3. جدول الكتاب والمراسلين (Authors)
-- ============================================================================
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Authors]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[Authors] (
        [Id] NVARCHAR(100) NOT NULL PRIMARY KEY,
        [Slug] NVARCHAR(100) NOT NULL UNIQUE,
        [Name] NVARCHAR(150) NOT NULL,
        [Role] NVARCHAR(100) NOT NULL,
        [Bio] NVARCHAR(1000) NULL,
        [Email] NVARCHAR(256) NULL,
        [Avatar] NVARCHAR(MAX) NULL,
        [ArticlesCount] INT NOT NULL DEFAULT 0
    );
END
GO

-- ============================================================================
-- 4. جدول الأخبار والمقالات (Articles)
-- ============================================================================
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Articles]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[Articles] (
        [Id] NVARCHAR(100) NOT NULL PRIMARY KEY,
        [Slug] NVARCHAR(255) NOT NULL UNIQUE,
        [Title] NVARCHAR(500) NOT NULL,
        [Subtitle] NVARCHAR(500) NULL,
        [Excerpt] NVARCHAR(1000) NULL,
        [Content] NVARCHAR(MAX) NOT NULL,
        [FeaturedImage] NVARCHAR(MAX) NOT NULL,
        [ImageCaption] NVARCHAR(500) NULL,
        [CategoryId] NVARCHAR(100) NOT NULL FOREIGN KEY REFERENCES [dbo].[Categories]([Id]),
        [CategoryName] NVARCHAR(150) NULL,
        [AuthorId] NVARCHAR(100) NOT NULL FOREIGN KEY REFERENCES [dbo].[Authors]([Id]),
        [AuthorName] NVARCHAR(150) NULL,
        [Governorate] NVARCHAR(100) NULL,
        [Status] NVARCHAR(50) NOT NULL DEFAULT 'published',
        [IsBreaking] BIT NOT NULL DEFAULT 0,
        [IsFeatured] BIT NOT NULL DEFAULT 0,
        [IsTrending] BIT NOT NULL DEFAULT 0,
        [IsFactCheck] BIT NOT NULL DEFAULT 0,
        [FactVerdict] NVARCHAR(50) NULL,
        [VideoUrl] NVARCHAR(MAX) NULL,
        [VideoType] NVARCHAR(50) NULL,
        [Views] INT NOT NULL DEFAULT 0,
        [LikesCount] INT NOT NULL DEFAULT 0,
        [CommentsCount] INT NOT NULL DEFAULT 0,
        [SharesCount] INT NOT NULL DEFAULT 0,
        [PublishedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        [UpdatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE()
    );
END
GO

-- ============================================================================
-- 5. جدول الشريط الإخباري العاجل (BreakingNews)
-- ============================================================================
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[BreakingNews]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[BreakingNews] (
        [Id] NVARCHAR(100) NOT NULL PRIMARY KEY,
        [Title] NVARCHAR(500) NOT NULL,
        [ArticleId] NVARCHAR(100) NULL,
        [Timestamp] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        [Urgency] NVARCHAR(50) NOT NULL DEFAULT 'high',
        [IsActive] BIT NOT NULL DEFAULT 1
    );
END
GO

-- ============================================================================
-- 6. جدول التغطيات الحية (LiveUpdates)
-- ============================================================================
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[LiveUpdates]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[LiveUpdates] (
        [Id] NVARCHAR(100) NOT NULL PRIMARY KEY,
        [EventTitle] NVARCHAR(255) NOT NULL,
        [Title] NVARCHAR(500) NOT NULL,
        [Content] NVARCHAR(MAX) NOT NULL,
        [Timestamp] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        [IsPinned] BIT NOT NULL DEFAULT 0
    );
END
GO

-- ============================================================================
-- 7. جدول التعليقات (Comments)
-- ============================================================================
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Comments]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[Comments] (
        [Id] NVARCHAR(100) NOT NULL PRIMARY KEY,
        [ArticleId] NVARCHAR(100) NOT NULL FOREIGN KEY REFERENCES [dbo].[Articles]([Id]) ON DELETE CASCADE,
        [UserName] NVARCHAR(150) NOT NULL,
        [Content] NVARCHAR(1000) NOT NULL,
        [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        [Status] NVARCHAR(50) NOT NULL DEFAULT 'approved',
        [Likes] INT NOT NULL DEFAULT 0
    );
END
GO

-- ============================================================================
-- 8. جدول الإعلانات والحملات الترويجية (Advertisements)
-- ============================================================================
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Advertisements]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[Advertisements] (
        [Id] NVARCHAR(100) NOT NULL PRIMARY KEY,
        [Title] NVARCHAR(200) NOT NULL,
        [Placement] NVARCHAR(50) NOT NULL,
        [ImageUrl] NVARCHAR(MAX) NOT NULL,
        [LinkUrl] NVARCHAR(500) NOT NULL,
        [IsActive] BIT NOT NULL DEFAULT 1,
        [Impressions] INT NOT NULL DEFAULT 0,
        [Clicks] INT NOT NULL DEFAULT 0
    );
END
GO

-- ============================================================================
-- 9. جدول الإعدادات العامة للمنصة (PlatformSettings)
-- ============================================================================
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[PlatformSettings]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[PlatformSettings] (
        [Id] INT IDENTITY(1,1) PRIMARY KEY,
        [SiteName] NVARCHAR(200) NOT NULL,
        [SiteDescription] NVARCHAR(1000) NULL,
        [LogoUrl] NVARCHAR(MAX) NULL,
        [ContactEmail] NVARCHAR(256) NULL,
        [PhoneNumber] NVARCHAR(50) NULL,
        [BreakingNewsSpeed] INT NOT NULL DEFAULT 40,
        [MaintenanceMode] BIT NOT NULL DEFAULT 0,
        [UpdatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE()
    );
END
GO

-- ============================================================================
-- بيانات أولية (SEED DATA)
-- ============================================================================

-- حسابات المسؤولين
IF NOT EXISTS (SELECT 1 FROM [dbo].[Users] WHERE [Email] = 'ehababdelkreem012@yahoo.com')
BEGIN
    INSERT INTO [dbo].[Users] ([Id], [Email], [PasswordHash], [Name], [Role], [RoleTitle], [Department], [IsActive])
    VALUES ('usr-ehab', 'ehababdelkreem012@yahoo.com', '01282407472ehab', N'م. إيهاب عبد الكريم', 'superadmin', N'رئيس مجلس الإدارة ورئيس التحرير', N'مجلس الإدارة العليا', 1);
END

IF NOT EXISTS (SELECT 1 FROM [dbo].[Users] WHERE [Email] = 'magdy@almasry-news.eg')
BEGIN
    INSERT INTO [dbo].[Users] ([Id], [Email], [PasswordHash], [Name], [Role], [RoleTitle], [Department], [IsActive])
    VALUES ('usr-magdy', 'magdy@almasry-news.eg', 'magdy', N'أ. مجدي محمد أبو زيد', 'editor', N'مدير التحرير التنفيذي', N'غرفة الأخبار المركزية', 1);
END

-- الأقسام الإخبارية
INSERT INTO [dbo].[Categories] ([Id], [Slug], [Name], [NameEn], [Description], [Color], [DisplayOrder])
SELECT 'cat-egypt', 'egypt', N'مصر والمحافظات', 'Egypt & Govs', N'تغطية شاملة لأخبار المحافظات', '#dc2626', 1
WHERE NOT EXISTS (SELECT 1 FROM [dbo].[Categories] WHERE [Id] = 'cat-egypt');

INSERT INTO [dbo].[Categories] ([Id], [Slug], [Name], [NameEn], [Description], [Color], [DisplayOrder])
SELECT 'cat-politics', 'politics', N'سياسة', 'Politics', N'أخبار مصر والسياسة الدولية', '#2563eb', 2
WHERE NOT EXISTS (SELECT 1 FROM [dbo].[Categories] WHERE [Id] = 'cat-politics');

INSERT INTO [dbo].[Categories] ([Id], [Slug], [Name], [NameEn], [Description], [Color], [DisplayOrder])
SELECT 'cat-economy', 'economy', N'اقتصاد وأسواق', 'Economy', N'أسعار الذهب، العملات، البورصة', '#059669', 3
WHERE NOT EXISTS (SELECT 1 FROM [dbo].[Categories] WHERE [Id] = 'cat-economy');

INSERT INTO [dbo].[Categories] ([Id], [Slug], [Name], [NameEn], [Description], [Color], [DisplayOrder])
SELECT 'cat-sports', 'sports', N'رياضة', 'Sports', N'الدوري المصري والدوريات العالمية', '#d97706', 4
WHERE NOT EXISTS (SELECT 1 FROM [dbo].[Categories] WHERE [Id] = 'cat-sports');

INSERT INTO [dbo].[Categories] ([Id], [Slug], [Name], [NameEn], [Description], [Color], [DisplayOrder])
SELECT 'cat-factcheck', 'factcheck', N'المصري فاكت', 'FactCheck', N'تدقيق الشائعات والتحقق من الأخبار', '#7c3aed', 5
WHERE NOT EXISTS (SELECT 1 FROM [dbo].[Categories] WHERE [Id] = 'cat-factcheck');

-- الكتاب
INSERT INTO [dbo].[Authors] ([Id], [Slug], [Name], [Role], [Bio], [Email], [ArticlesCount])
SELECT 'auth-ehab', 'ehab-abdelkreem', N'م. إيهاب عبد الكريم', N'رئيس التحرير', N'خبير صحفي وإعلامي', 'ehababdelkreem012@yahoo.com', 45
WHERE NOT EXISTS (SELECT 1 FROM [dbo].[Authors] WHERE [Id] = 'auth-ehab');

INSERT INTO [dbo].[Authors] ([Id], [Slug], [Name], [Role], [Bio], [Email], [ArticlesCount])
SELECT 'auth-magdy', 'magdy-abuzeid', N'أ. مجدي محمد أبو زيد', N'مدير التحرير التنفيذي', N'صحفي استقصائي ومحلل سياسي', 'magdy@almasry-news.eg', 38
WHERE NOT EXISTS (SELECT 1 FROM [dbo].[Authors] WHERE [Id] = 'auth-magdy');

PRINT '=======================================================';
PRINT '✅ تم إعداد وتثبيت قاعدة بيانات AlmasryNewsDb بنجاح!';
PRINT '=======================================================';
GO
