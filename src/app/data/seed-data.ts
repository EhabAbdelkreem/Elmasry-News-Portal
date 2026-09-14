import {
  Article,
  Author,
  Category,
  BreakingNewsItem,
  LiveUpdate,
  Governorate,
  GoldPriceItem,
  CurrencyRateItem,
  WeatherItem,
  PrayerTimeItem,
  MatchItem,
  LeagueStandingItem,
  Advertisement,
  User,
  PhotoAlbum,
  VideoStory,
  PlatformSettings
} from '../models';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'news',
    slug: 'news',
    name: 'أخبار',
    nameEn: 'News',
    description: 'أهم الأخبار المحلية والعربية والدولية العاجلة والشاملة',
    iconName: 'Newspaper',
    color: '#dc2626',
    subCategories: ['أخبار مصر', 'بيانات رسمية', 'تغطيات خاصة', 'تقارير'],
    order: 1
  },
  {
    id: 'egypt',
    slug: 'egypt',
    name: 'مصر',
    nameEn: 'Egypt',
    description: 'تغطية يومية شاملة لكافة الفعاليات والمشروعات القومية والتطورات في مصر',
    iconName: 'Landmark',
    color: '#ea580c',
    subCategories: ['مجلس الوزراء', 'المشروعات القومية', 'العاصمة الإدارية', 'البرلمان'],
    order: 2
  },
  {
    id: 'politics',
    slug: 'politics',
    name: 'سياسة',
    nameEn: 'Politics',
    description: 'تحليلات وكواليس القرارات السياسية، الحوار الوطني، والدبلوماسية المصرية',
    iconName: 'Scale',
    color: '#2563eb',
    subCategories: ['الرئاسة', 'الخارجية', 'الأحزاب', 'الدبلوماسية'],
    order: 3
  },
  {
    id: 'economy',
    slug: 'economy',
    name: 'اقتصاد',
    nameEn: 'Economy',
    description: 'أسعار الذهب، العملات، البورصة، البنوك، والاستثمار والطاقة',
    iconName: 'TrendingUp',
    color: '#16a34a',
    subCategories: ['البنوك', 'البورصة المصرية', 'الذهب والعملات', 'العقارات', 'الطاقة'],
    order: 4
  },
  {
    id: 'sports',
    slug: 'sports',
    name: 'رياضة',
    nameEn: 'Sports',
    description: 'الدوري المصري، دوري أبطال إفريقيا، المحترفون، والكرة العالمية',
    iconName: 'Trophy',
    color: '#0284c7',
    subCategories: ['الأهلي', 'الزمالك', 'الدوري المصري', 'دوري أبطال أوروبا', 'الكرة العالمية'],
    order: 5
  },
  {
    id: 'factcheck',
    slug: 'factcheck',
    name: 'المصري فاكت',
    nameEn: 'Fact Check',
    description: 'وحدة تدقيق المعلومات ومكافحة الشائعات والأخبار المضللة',
    iconName: 'ShieldCheck',
    color: '#059669',
    subCategories: ['تحقق الشائعات', 'تدقيق الصور', 'تصريحات المسؤولين'],
    order: 6
  },
  {
    id: 'world',
    slug: 'world',
    name: 'عرب وعالم',
    nameEn: 'Arab & World',
    description: 'آخر التطورات والأحداث الجيوسياسية في الشرق الأوسط والعالم',
    iconName: 'Globe',
    color: '#7c3aed',
    subCategories: ['الشرق الأوسط', 'الخليج', 'أوروبا', 'الولايات المتحدة'],
    order: 7
  },
  {
    id: 'governorates',
    slug: 'governorates',
    name: 'محافظات',
    nameEn: 'Governorates',
    description: 'نبض الشارع في 27 محافظة مصرية من الإسكندرية إلى أسوان',
    iconName: 'MapPin',
    color: '#d97706',
    subCategories: ['الإسكندرية', 'الدلتا', 'القناة وسيناء', 'الصعيد'],
    order: 7
  },
  {
    id: 'accidents',
    slug: 'accidents',
    name: 'حوادث وقضايا',
    nameEn: 'Accidents',
    description: 'متابعة أمنية وقضائية لأبرز القضايا ومحاكم الجنايات والمرور',
    iconName: 'ShieldAlert',
    color: '#b91c1c',
    subCategories: ['محاكم', 'تحقيقات النيابة', 'المرور', 'الأمن العام'],
    order: 8
  },
  {
    id: 'tech',
    slug: 'tech',
    name: 'تكنولوجيا',
    nameEn: 'Technology',
    description: 'الذكاء الاصطناعي، الهواتف الذكية، الأمن السيبراني، وأحدث التطبيقات',
    iconName: 'Cpu',
    color: '#0891b2',
    subCategories: ['ذكاء اصطناعي', 'هواتف ذكية', 'أمن سيبراني', 'شركات ناشئة'],
    order: 9
  },
  {
    id: 'health',
    slug: 'health',
    name: 'صحة',
    nameEn: 'Health',
    description: 'استشارات طبية، تغذية علاجية، أحدث الأبحاث العلمية، والتأمين الصحي',
    iconName: 'HeartPulse',
    color: '#e11d48',
    subCategories: ['طب وصحة', 'تغذية', 'أدوية', 'التأمين الصحي الشامل'],
    order: 10
  },
  {
    id: 'education',
    slug: 'education',
    name: 'تعليم',
    nameEn: 'Education',
    description: 'أخبار المدارس، الجامعات، التنسيق، والثانوية العامة ومناهج التطوير',
    iconName: 'GraduationCap',
    color: '#4f46e5',
    subCategories: ['الثانوية العامة', 'الجامعات', 'التنسيق', 'التعليم الفني'],
    order: 11
  },
  {
    id: 'arts',
    slug: 'arts',
    name: 'فن وثقافة',
    nameEn: 'Arts & Culture',
    description: 'نجوم الفن، السينما، الدراما، المهرجانات، والمعارض الأدبية',
    iconName: 'Film',
    color: '#db2777',
    subCategories: ['سينما وتلفزيون', 'مهرجانات', 'كتب وروايات', 'حوارات فنية'],
    order: 12
  },
  {
    id: 'investigations',
    slug: 'investigations',
    name: 'تحقيقات وملفات',
    nameEn: 'Investigations',
    description: 'تحقيقات استقصائية معمقة وتقارير ميدانية تكشف الحقائق',
    iconName: 'FileSearch',
    color: '#475569',
    subCategories: ['استقصاء', 'ملفات خاصة', 'بيئة ومناخ', 'قضايا مجتمعية'],
    order: 13
  },
  {
    id: 'opinion',
    slug: 'opinion',
    name: 'رأي ومقالات',
    nameEn: 'Opinion',
    description: 'نخبة من كبار الكتاب والمفكرين يناقشون قضايا الساعة',
    iconName: 'PenTool',
    color: '#0d9488',
    subCategories: ['أعمدة يومية', 'كتاب الضيوف', 'تحليلات سياسية', 'رؤى اقتصادية'],
    order: 14
  },
  {
    id: 'services',
    slug: 'services',
    name: 'خدمات',
    nameEn: 'Services',
    description: 'أسعار الذهب، العملات، الطقس، والخدمات الحكومية',
    iconName: 'Sparkles',
    color: '#65a30d',
    subCategories: ['أسعار الذهب', 'صرف العملات', 'الطقس'],
    order: 15
  }
];

export const INITIAL_AUTHORS: Author[] = [
  {
    id: 'author-ehab',
    name: 'م. إيهاب عبد الكريم',
    slug: 'ehab-abdelkreem',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    role: 'رئيس التحرير والمدير العام',
    bio: 'المدير العام ورئيس التحرير للمصري الإخباري، المشرف العام على السياسة التحريرية والتغطيات الإخبارية الكبرى.',
    email: 'ehababdelkreem012@yahoo.com',
    social: { twitter: 'https://twitter.com', linkedin: 'https://linkedin.com' },
    articlesCount: 64
  },
  {
    id: 'author-magdy',
    name: 'مجدي محمد أبو زيد',
    slug: 'magdy-mohamed-abouzeid',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    role: 'مدير التحرير التنفيذي',
    bio: 'مدير التحرير التنفيذي لصحيفة المصري الإخباري، المشرف العام على غرف الأخبار وصياغة التغطيات والتحقيقات الصحفية.',
    email: 'magdy@almasry-news.eg',
    social: { twitter: 'https://twitter.com', linkedin: 'https://linkedin.com' },
    articlesCount: 95
  },
  {
    id: 'author-1',
    name: 'د. مجدي إبراهيم الشناوي',
    slug: 'magdy-el-shennawy',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    role: 'رئيس قسم الشؤون الاقتصادية والتحليلات المالية',
    bio: 'خبير اقتصادي ومحلل أسواق المال، كتب لأكثر من عشرين عاماً في كبريات الصحف الاقتصادية العربية، حاصل على الدكتوراه في الاقتصاد الكلي.',
    email: 'm.shennawy@almasry-news.eg',
    social: { twitter: 'https://twitter.com', linkedin: 'https://linkedin.com' },
    articlesCount: 142
  },
  {
    id: 'author-2',
    name: 'سارة عبد الفتاح المنياوي',
    slug: 'sara-el-meniawy',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    role: 'مديرة وحدة التحقيقات الاستقصائية والملفات الخاصة',
    bio: 'صحفية استقصائية حائزة على عدة جوائز صحفية في الرصد الميداني والتقارير البيئية والمجتمعية المعمقة.',
    email: 's.meniawy@almasry-news.eg',
    social: { twitter: 'https://twitter.com', facebook: 'https://facebook.com' },
    articlesCount: 89
  },
  {
    id: 'author-3',
    name: 'أحمد طارق رضوان',
    slug: 'ahmed-tarek-radwan',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    role: 'كبير محرري الرياضة والكرة الإفريقية',
    bio: 'ناقد رياضي ومتابع لبطولات الكاف والاتحاد الدولي، قام بتغطية 4 نسخ لكأس العالم و6 نسخ لكأس الأمم الإفريقية.',
    email: 'a.radwan@almasry-news.eg',
    social: { twitter: 'https://twitter.com' },
    articlesCount: 215
  },
  {
    id: 'author-4',
    name: 'مهندس عمر النجار',
    slug: 'omar-el-naggar',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    role: 'رئيس قسم التكنولوجيا والذكاء الاصطناعي',
    bio: 'باحث في تقنيات الذكاء الاصطناعي والأمن السيبراني، ومستشار تحول رقمي للعديد من المنصات الإخبارية العربية.',
    email: 'o.naggar@almasry-news.eg',
    social: { twitter: 'https://twitter.com', linkedin: 'https://linkedin.com' },
    articlesCount: 76
  },
  {
    id: 'author-5',
    name: 'د. ليلى عبد الرحمن فهمي',
    slug: 'laila-fahmy',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    role: 'كاتبة رأي ومستشارة سياسات عامة',
    bio: 'أستاذة العلوم السياسية بالجامعة، صاحبة عمود "رؤى معاصرة" الأسبوعي، ومؤلفة دراسات حول العلاقات الدولية.',
    email: 'l.fahmy@almasry-news.eg',
    social: { twitter: 'https://twitter.com' },
    articlesCount: 110
  }
];

export const GOVERNORATES_LIST: Governorate[] = [
  { id: 'cairo', name: 'القاهرة', slug: 'cairo', capital: 'القاهرة', region: 'القاهرة الكبرى', population: '10.2 مليون', newsCount: 342 },
  { id: 'giza', name: 'الجيزة', slug: 'giza', capital: 'الجيزة', region: 'القاهرة الكبرى', population: '9.1 مليون', newsCount: 215 },
  { id: 'alexandria', name: 'الإسكندرية', slug: 'alexandria', capital: 'الإسكندرية', region: 'وجه بحري', population: '5.4 مليون', newsCount: 198 },
  { id: 'qalyubia', name: 'القليوبية', slug: 'qalyubia', capital: 'بنها', region: 'القاهرة الكبرى', population: '5.9 مليون', newsCount: 88 },
  { id: 'port-said', name: 'بورسعيد', slug: 'port-said', capital: 'بورسعيد', region: 'القناة وسيناء', population: '780 ألف', newsCount: 65 },
  { id: 'suez', name: 'السويس', slug: 'suez', capital: 'السويس', region: 'القناة وسيناء', population: '770 ألف', newsCount: 54 },
  { id: 'ismailia', name: 'الإسماعيلية', slug: 'ismailia', capital: 'الإسماعيلية', region: 'القناة وسيناء', population: '1.4 مليون', newsCount: 62 },
  { id: 'dakahlia', name: 'الدقهلية', slug: 'dakahlia', capital: 'المنصورة', region: 'وجه بحري', population: '6.9 مليون', newsCount: 112 },
  { id: 'sharqia', name: 'الشرقية', slug: 'sharqia', capital: 'الزقازيق', region: 'وجه بحري', population: '7.8 مليون', newsCount: 97 },
  { id: 'gharbia', name: 'الغربية', slug: 'gharbia', capital: 'طنطا', region: 'وجه بحري', population: '5.3 مليون', newsCount: 84 },
  { id: 'monufia', name: 'المنوفية', slug: 'monufia', capital: 'شبين الكوم', region: 'وجه بحري', population: '4.6 مليون', newsCount: 73 },
  { id: 'beheira', name: 'البحيرة', slug: 'beheira', capital: 'دمنهور', region: 'وجه بحري', population: '6.7 مليون', newsCount: 91 },
  { id: 'kafr-el-sheikh', name: 'كفر الشيخ', slug: 'kafr-el-sheikh', capital: 'كفر الشيخ', region: 'وجه بحري', population: '3.6 مليون', newsCount: 58 },
  { id: 'damietta', name: 'دمياط', slug: 'damietta', capital: 'دمياط', region: 'وجه بحري', population: '1.6 مليون', newsCount: 46 },
  { id: 'matrouh', name: 'مطروح', slug: 'matrouh', capital: 'مرسى مطروح', region: 'الحدود', population: '520 ألف', newsCount: 39 },
  { id: 'red-sea', name: 'البحر الأحمر', slug: 'red-sea', capital: 'الغردقة', region: 'الحدود', population: '390 ألف', newsCount: 51 },
  { id: 'new-valley', name: 'الوادي الجديد', slug: 'new-valley', capital: 'الخارجة', region: 'الحدود', population: '260 ألف', newsCount: 31 },
  { id: 'north-sinai', name: 'شمال سيناء', slug: 'north-sinai', capital: 'العريش', region: 'القناة وسيناء', population: '490 ألف', newsCount: 48 },
  { id: 'south-sinai', name: 'جنوب سيناء', slug: 'south-sinai', capital: 'الطور', region: 'القناة وسيناء', population: '115 ألف', newsCount: 43 },
  { id: 'fayoum', name: 'الفيوم', slug: 'fayoum', capital: 'الفيوم', region: 'شمال الصعيد', population: '3.9 مليون', newsCount: 66 },
  { id: 'beni-suef', name: 'بني سويف', slug: 'beni-suef', capital: 'بني سويف', region: 'شمال الصعيد', population: '3.5 مليون', newsCount: 59 },
  { id: 'minya', name: 'المنيا', slug: 'minya', capital: 'المنيا', region: 'شمال الصعيد', population: '6.1 مليون', newsCount: 82 },
  { id: 'asyut', name: 'أسيوط', slug: 'asyut', capital: 'أسيوط', region: 'وسط وجنوب الصعيد', population: '4.9 مليون', newsCount: 77 },
  { id: 'sohag', name: 'سوهاج', slug: 'sohag', capital: 'سوهاج', region: 'وسط وجنوب الصعيد', population: '5.6 مليون', newsCount: 85 },
  { id: 'qena', name: 'قنا', slug: 'qena', capital: 'قنا', region: 'وسط وجنوب الصعيد', population: '3.5 مليون', newsCount: 63 },
  { id: 'luxor', name: 'الأقصر', slug: 'luxor', capital: 'الأقصر', region: 'وسط وجنوب الصعيد', population: '1.3 مليون', newsCount: 71 },
  { id: 'aswan', name: 'أسوان', slug: 'aswan', capital: 'أسوان', region: 'وسط وجنوب الصعيد', population: '1.6 مليون', newsCount: 69 }
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'رئيس الوزراء يترأس اجتماع الحكومة الأسبوعي بالعاصمة الإدارية ويعلن حزمة حوافز جديدة للصناعة والاستثمار الأجنبي',
    subtitle: 'إطلاق الرخصة الذهبية لـ 15 مجمعاً صناعياً وتسهيلات ائتمانية غير مسبوقة للقطاع الخاص',
    slug: 'cabinet-approves-new-industrial-incentives-2026',
    excerpt: 'أكد رئيس مجلس الوزراء خلال الاجتماع المنعقد بمقر الحكومة في العاصمة الإدارية الجديدة، أن الدولة ماضية في تقديم تيسيرات ضريبية وجمركية لدعم توطين الصناعات الاستراتيجية وتعظيم الصادرات المصرية.',
    content: `عقد الدكتور مصطفى مدبولي، رئيس مجلس الوزراء، الاجتماع الأسبوعي للحكومة بمقر المجلس بالعاصمة الإدارية الجديدة، حيث استعرض الموقف التنفيذي لعدد من المشروعات التنموية والخدمية الكبرى الجاري تنفيذها في مختلف محافظات الجمهورية.

وفي مستهل الاجتماع، أكد رئيس الوزراء أن الحكومة تعمل على تنفيذ التوجيهات الرئاسية بتهيئة بيئة استثمارية جاذبة، وإتاحة كافة التسهيلات الممكنة أمام المستثمرين المحليين والأجانب، لافتاً إلى أن حزمة الحوافز الجديدة تتضمن إعفاءات ضريبية متدرجة، وتخصيص الأراضي الصناعية بنظام حق الانتفاع أو التمليك الميسر.

وشدد رئيس الوزراء على أن الحكومة تولي أولوية قصوى لملفات توطين صناعات السيارات الكهربائية، الطاقة المتجددة، والصناعات الهندسية والإلكترونية، مشيراً إلى أن الرخصة الذهبية أثبتت نجاحاً كبيراً في اختصار الإجراءات البيروقراطية وبدء تشغيل المصانع في مدد قياسية.

كما استعرض الاجتماع تقريراً مفصلاً لوزير المالية حول مؤشرات الأداء المالي، والذي أظهر تحقيق فائض أولي قياسي وتحسن التصنيف الائتماني لمصر لدى وكالات التصنيف الدولية، ما يعزز ثقة المؤسسات التمويلية الدولية في مسار الاقتصاد المصري.`,
    categoryId: 'egypt',
    categoryName: 'مصر',
    subCategory: 'مجلس الوزراء',
    authorId: 'author-1',
    authorName: 'د. مجدي إبراهيم الشناوي',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    authorRole: 'رئيس قسم الشؤون الاقتصادية',
    featuredImage: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'جانب من اجتماع مجلس الوزراء في العاصمة الإدارية الجديدة اليوم',
    tags: ['مجلس الوزراء', 'العاصمة الإدارية', 'الاستثمار', 'الصناعة', 'الاقتصاد المصري'],
    views: 45210,
    readingTimeMinutes: 4,
    isBreaking: false,
    isFeatured: true,
    isEditorChoice: true,
    governorate: 'cairo',
    videoUrl: 'https://www.youtube.com/watch?v=_UwsW5uGtE8',
    videoTitle: 'مؤتمر رئيس الوزراء لإعلان حوافز الاستثمار والرخصة الذهبية',
    videoDuration: '04:15',
    videoType: 'youtube',
    publishedAt: '2026-08-22T09:30:00Z',
    updatedAt: '2026-08-22T10:15:00Z',
    status: 'published',
    likesCount: 1420,
    commentsCount: 88,
    sharesCount: 312,
    reactions: {
      like: 920,
      love: 310,
      clap: 120,
      insightful: 65,
      sad: 5
    },
    seo: {
      metaTitle: 'رئيس الوزراء يعلن حزمة حوافز للصناعة والاستثمار بالعاصمة الإدارية',
      metaDescription: 'تفاصيل اجتماع مجلس الوزراء وحزمة التسهيلات الاستثمارية والرخصة الذهبية للصناعات الاستراتيجية.',
      keywords: ['مجلس الوزراء', 'رئيس الوزراء', 'الاستثمار في مصر', 'الرخصة الذهبية']
    }
  },
  {
    id: 'art-2',
    title: 'عاجل: البنك المركزي يعلن ارتفاع صافي الاحتياطي النقدي الأجنبي إلى 49.8 مليار دولار بنهاية الربع المالي',
    subtitle: 'تدفقات قياسية من الاستثمار الأجنبي المباشر وعائدات السياحة والصادرات تدعم الجنيه',
    slug: 'cbe-foreign-reserves-reach-new-record-high',
    excerpt: 'أعلن البنك المركزي المصري اليوم قفزة جديدة في صافي احتياطيات النقد الأجنبي، مدفوعة بصفقات الاستثمار الكبرى وزيادة تحويلات المصريين بالخارج وتنامي الإيرادات السياحية.',
    content: `أصدر البنك المركزي المصري بياناً رسمياً أكد فيه ارتفاع صافي الاحتياطيات الدولية ليصل إلى مستويات قياسية بلغت 49.8 مليار دولار، مسجلاً أعلى مستوى له في تاريخ القطاع المصرفي المصري.

وأوضح التقرير أن هذه القفزة تأتي انعكاساً لنجاح برنامج الإصلاح الهيكلي وتوحيد سعر الصرف، إلى جانب التدفقات النقدية الضخمة من عوائد الاستثمارات المباشرة في رأس الحكمة والمناطق الصناعية الحرة بالمنطقة الاقتصادية لقناة السويس.

وأشار خبراء مصرفيون إلى أن ارتفاع الاحتياطي يمنح الاقتصاد المصري مرونة فائقة لمواجهة التقلبات الإقليمية والدولية، ويوفر غطاءً آمناً لتمويل واردات السلع الأساسية والمواد الخام لأكثر من 8.5 أشهر، متجاوزاً بذلك المعدلات القياسية العالمية الموصى بها.`,
    categoryId: 'economy',
    categoryName: 'اقتصاد',
    subCategory: 'البنوك',
    authorId: 'author-1',
    authorName: 'د. مجدي إبراهيم الشناوي',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    authorRole: 'رئيس قسم الشؤون الاقتصادية',
    featuredImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'المقر الرئيسي للبنك المركزي المصري بوسط القاهرة',
    tags: ['البنك المركزي', 'الاحتياطي النقدي', 'الدولار', 'الجنيه المصري', 'البنوك'],
    views: 38900,
    readingTimeMinutes: 3,
    isBreaking: true,
    isFeatured: true,
    isEditorChoice: false,
    publishedAt: '2026-08-22T08:45:00Z',
    updatedAt: '2026-08-22T09:10:00Z',
    status: 'published',
    likesCount: 980,
    commentsCount: 64,
    sharesCount: 520,
    seo: {
      metaTitle: 'البنك المركزي المصري: الاحتياطي النقدي الأجنبي يسجل 49.8 مليار دولار',
      metaDescription: 'تفاصيل بيان البنك المركزي حول قفزة الاحتياطي النقدي الأجنبي لمصر.',
      keywords: ['البنك المركزي المصري', 'احتياطي النقد الأجنبي', 'الدولار في مصر']
    }
  },
  {
    id: 'art-3',
    title: 'الأهلي يتأهل لنصف نهائي دوري أبطال إفريقيا بعد فوز مثير بثلاثية في استاد القاهرة الدولي وسط 70 ألف مشجع',
    subtitle: 'تألق لافت لخط الهجوم وعرض تكتيكي مميز يقود المارد الأحمر لمواصلة حملة الدفاع عن لقبه القاري',
    slug: 'ahly-qualifies-caf-champions-league-semi-finals',
    excerpt: 'حسم النادي الأهلي بطاقة التأهل إلى الدور نصف النهائي لبطولة دوري أبطال إفريقيا عقب تغلبه المستحق على ضيفه ماميلودي صن داونز بثلاثة أهداف مقابل هدف في ليلة كروية تاريخية.',
    content: `وسط أجواء جماهيرية حماسية هزت مدرجات استاد القاهرة الدولي، حقق النادي الأهلي فوزاً عريضاً ومستحقاً بنتيجة 3-1 أمام نظيره صن داونز الجنوب إفريقي، ليؤكد تفوقه القاري ويصل للمربع الذهبي للبطولة الإفريقية للمرة السادسة على التوالي.

بدأت المباراة بضغط هجومي مكثف من جانب الشياطين الحمر، حيث نجح إمام عاشور في افتتاح التسجيل في الدقيقة 18 بتسديدة صاروخية سكنت أقصى الزاوية اليمنى للحارس. وقبل نهاية الشوط الأول أضاف وسام أبو علي الهدف الثاني إثر تمريرة عرضية حريرية.

وفي الشوط الثاني، واصل الأهلي سيطرته المحكمة على منتصف الملعب، وأحرز حسين الشحات الهدف الثالث في الدقيقة 74 ليطلق رصاصة الرحمة على الفريق الضيف، وسط هتافات مدوية من 70 ألف مشجع احتشدوا في الملعب منذ ساعات مبكرة.

بهذه النتيجة يضرب الأهلي موعداً نارياً في الدور نصف النهائي مع الفائز من مواجهة الترجي التونسي والرجاء المغربي.`,
    categoryId: 'sports',
    categoryName: 'رياضة',
    subCategory: 'الأهلي',
    authorId: 'author-3',
    authorName: 'أحمد طارق رضوان',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    authorRole: 'كبير محرري الرياضة',
    featuredImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'احتفالات لاعبي الأهلي عقب تسجيل الهدف الثاني باستاد القاهرة',
    tags: ['الأهلي', 'دوري أبطال إفريقيا', 'صن داونز', 'استاد القاهرة', 'كرة القدم'],
    views: 62400,
    readingTimeMinutes: 4,
    isBreaking: false,
    isFeatured: true,
    isEditorChoice: true,
    governorate: 'cairo',
    videoUrl: 'https://www.youtube.com/watch?v=m1NbuLXLfFw',
    videoTitle: 'ملخص أهداف مباراة الأهلي وصن داونز وهتافات الجماهير في استاد القاهرة',
    videoDuration: '03:45',
    videoType: 'youtube',
    publishedAt: '2026-08-22T07:15:00Z',
    updatedAt: '2026-08-22T08:00:00Z',
    status: 'published',
    likesCount: 3840,
    commentsCount: 245,
    sharesCount: 1200,
    seo: {
      metaTitle: 'الأهلي إلى نصف نهائي دوري أبطال إفريقيا بعد فوز ساحق على صن داونز',
      metaDescription: 'تغطية مباراة الأهلي وصن داونز: الأهداف والتحليل الفني لتأهل المارد الأحمر.',
      keywords: ['الأهلي', 'صن داونز', 'دوري أبطال إفريقيا', 'أهداف الأهلي']
    }
  },
  {
    id: 'art-4',
    title: 'تحقيق استقصائي: كيف تعيد محطات الطاقة الشمسية بالصحراء الغربية كتابة مستقبل الطاقة الخضراء في إفريقيا؟',
    subtitle: 'جولة ميدانية داخل أكبر مجمع للخلايا الكهروضوئية وتصدير الكهرباء النظيفة لأوروبا',
    slug: 'investigation-green-energy-western-desert-egypt',
    excerpt: 'على رمال صحراء بنبان والواحات، تمتد ملايين الألواح الشمسية لترسم ملامح أكبر ثورة طاقة متجددة في المنطقة. تحقيق يوثق الأرقام والكواليس وفرص التشغيل والتصدير.',
    content: `في قلب الصحراء الغربية المصرية، حيث تسطع الشمس بأعلى معدلات الإشعاع في حوض البحر الأبيض المتوسط، يقف واحد من أعظم المشاريع الهندسية في القرن الحادي والعشرين.

رصد فريق "المنصة الإخبارية" في معايشة استمرت 4 أيام على مساحة تتجاوز 37 كيلومتراً مربعاً، كيف تحولت رمال الصحراء إلى عملاق طاقة يولد آلاف الميجاوات سنوياً، مما يمنع انبعاث أكثر من 2 مليون طن من ثاني أكسيد الكربون.

ويقول المهندس كريم حسني، مدير المشروع الميداني: "نحن هنا لا ننتج الكهرباء لمصر وحدها، بل نؤسس البنية التحتية لخط الربط الكهربائي القاري مع اليونان وإيطاليا لتزويد أوروبا بالطاقة الخضراء المستدامة بحلول 2028".

يكشف التحقيق عن شراكات عالمية مع أكثر من 30 شركة دولية، وتوفير 14 ألف فرصة عمل مباشرة وغير مباشرة لشباب محافظات الصعيد، مع تدريب جيل كامل من الكوادر المصرية على أحدث برمجيات التحكم الذكي والروبوتات المخصصة لتنظيف الألواح بدون استهلاك قطرة مياه واحدة.`,
    categoryId: 'investigations',
    categoryName: 'تحقيقات وملفات',
    subCategory: 'بيئة ومناخ',
    authorId: 'author-2',
    authorName: 'سارة عبد الفتاح المنياوي',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    authorRole: 'مديرة وحدة التحقيقات',
    featuredImage: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'مجمع الألواح الشمسية العملاقة في الصحراء الغربية',
    tags: ['تحقيقات', 'الطاقة الشمسية', 'بنبان', 'الطاقة المتجددة', 'الربط الكهربائي'],
    views: 29800,
    readingTimeMinutes: 6,
    isBreaking: false,
    isFeatured: true,
    isSpecialReport: true,
    isEditorChoice: true,
    governorate: 'aswan',
    publishedAt: '2026-08-21T18:00:00Z',
    updatedAt: '2026-08-22T06:30:00Z',
    status: 'published',
    likesCount: 1650,
    commentsCount: 42,
    sharesCount: 410,
    seo: {
      metaTitle: 'تحقيق: مجمعات الطاقة الشمسية بالصحراء الغربية ومستقبل تصدير الطاقة لأوروبا',
      metaDescription: 'معايشة ميدانية في بنبان والصحراء الغربية لتوثيق مشروعات الطاقة المتجددة.',
      keywords: ['طاقة شمسية', 'بنبان', 'تحقيقات استقصائية', 'الكهرباء النظيفة']
    }
  },
  {
    id: 'art-5',
    title: 'المصري فاكت: حقيقة المنشور المتداول حول زيادة أسعار شرائح الكهرباء بنسبة 40% ابتداءً من الشهر المقبل',
    subtitle: 'وحدة تدقيق المعلومات تتواصل مع وزارة الكهرباء وتكشف حقيقة الجداول المفبركة',
    slug: 'fact-check-electricity-tariffs-rumor',
    excerpt: 'انتشرت خلال الساعات الماضية شائعة تزعم إقرار زيادات حادة في أسعار استهلاك الكهرباء لكافة الشرائح المنزلية. قمنا بالتدقيق والتواصل مع المصادر الرسمية.',
    content: `رصدت وحدة "المصري فاكت" لتدقيق المعلومات انتشاراً واسعاً لمنشور عبر منصات التواصل الاجتماعي وفيسبوك، يتضمن جدولاً مزعوماً لزيادة أسعار شرائح الكهرباء المنزلية والتجارية بنسب تصل إلى 40% ابتداءً من أول الشهر المقبل.

قام فريق التحقق بإجراء بحث عكسي عن الصورة والجداول المرفقة، والرجوع إلى الجريدة الرسمية وقرارات مجلس الوزراء، والتواصل المباشر مع المتحدث الرسمي باسم وزارة الكهرباء والطاقة المتجددة.

النتيجة المؤكدة: الادعاء "كاذب ومضلل". الجداول المتداولة تعود لمقترحات قديمة غير معتمدة، وأكدت الوزارة عدم صدور أي قرارات جديدة بشأن تعديل أسعار الشرائح، وأن أي تحديثات رسمية يتم الإعلان عنها بشفافية كاملة عبر القنوات الحكومية المعتمدة.`,
    categoryId: 'factcheck',
    categoryName: 'المصري فاكت',
    subCategory: 'تحقق الشائعات',
    authorId: 'author-2',
    authorName: 'سارة عبد الفتاح المنياوي',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    authorRole: 'مديرة وحدة التحقيقات وتدقيق الحقائق',
    featuredImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'وحدة المصري فاكت ترصد الشائعات الرقمية وتتحقق منها علمياً',
    tags: ['المصري فاكت', 'تدقيق معلومات', 'شائعات', 'أسعار الكهرباء', 'حقائق'],
    views: 18400,
    readingTimeMinutes: 3,
    isBreaking: false,
    isFeatured: false,
    isEditorChoice: false,
    isFactCheck: true,
    factCheckData: {
      claim: 'تطبيق زيادة بنسبة 40% على أسعار شرائح استهلاك الكهرباء المنزلية بدءاً من الشهر المقبل.',
      claimant: 'حسابات وصفحات غير موثقة على منصات التواصل الاجتماعي.',
      verdict: 'false',
      verdictLabel: 'مفبرك وغير صحيح',
      truth: 'نفت وزارة الكهرباء صدور أي قرار بزيادة الأسعار، وأكدت أن الجداول المتداولة مضللة.',
      evidence: [
        'بيان رسمي صادر عن المتحدث الرسمي لوزارة الكهرباء.',
        'عدم نشر أي قرارات في الجريدة الرسمية تفيد بتعديل الأسعار.',
        'البحث العكسي يثبت تداول نفس المنشور في سنوات سابقة.'
      ],
      dateChecked: '2026-08-22'
    },
    publishedAt: '2026-08-22T06:00:00Z',
    updatedAt: '2026-08-22T07:30:00Z',
    status: 'published',
    likesCount: 890,
    commentsCount: 31,
    sharesCount: 680,
    seo: {
      metaTitle: 'المصري فاكت: حقيقة زيادة أسعار الكهرباء 40% الشهر القادم',
      metaDescription: 'تدقيق رسمي حول شائعة رفع أسعار الكهرباء وتوضيح وزارة الكهرباء.',
      keywords: ['المصري فاكت', 'شائعة الكهرباء', 'تدقيق الأخبار', 'أسعار الكهرباء']
    }
  },
  {
    id: 'fact-check-bread-subsidy-rumor',
    title: 'المصري فاكت: حقيقة إلغاء صرف الخبز المدعم واستبداله بدعم نقدي مشروط ابتداءً من أول الشهر',
    subtitle: 'وحدة تدقيق المعلومات تتواصل مع وزارة التموين وتفند منشورات متداولة حول منظومة الخبز',
    slug: 'fact-check-bread-subsidy-rumor',
    excerpt: 'تداولت منصات وصفحات على مواقع التواصل الاجتماعي أنباء تفيد بإلغاء منظومة الخبز المدعم وتحويلها إلى دعم نقدي فوري. فريق "المصري فاكت" يكشف التفاصيل الكاملة.',
    content: `رصدت وحدة "المصري فاكت" تداول منشورات بكثافة عبر منصات فيسبوك وتطبيقات التراسل الفوري، تزعم صدور توجيهات وزارية بوقف صرف حصص الخبز البلدي المدعم على بطاقات التموين بدءاً من مطلع الشهر المقبل، وصرف بدل نقدي مشروط للمواطنين.

فريق التحقق بالوحدة قام بالتواصل مع المركز الإعلامي لمجلس الوزراء والمتحدث الرسمي باسم وزارة التموين والتجارة الداخلية، والاطلاع على أحدث القرارات الوزارية المنظمة لعمل المخابز البلدية.

النتيجة الرسمية: الادعاء "مفبرك وعارٍ تماماً عن الصحة". أكدت وزارة التموين استمرار منظومة صرف الخبز المدعم بانتظام لكافة حاملي البطاقات التموينية البالغ عددهم نحو 71 مليون مواطن، بمعدل 5 أرغفة يومياً للمستفيد بسعر 20 قرشاً للرغيف، دون أي مساس بحصة المواطن أو تغيير في آلية الصرف المعمول بها.`,
    categoryId: 'factcheck',
    categoryName: 'المصري فاكت',
    subCategory: 'تحقق الشائعات',
    authorId: 'author-2',
    authorName: 'سارة عبد الفتاح المنياوي',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    authorRole: 'مديرة وحدة التحقيقات وتدقيق الحقائق',
    featuredImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'استمرار منظومة الخبز المدعم لكافة المواطنين على بطاقات التموين',
    tags: ['المصري فاكت', 'التموين', 'الخبز المدعم', 'شائعات', 'تدقيق'],
    views: 22600,
    readingTimeMinutes: 3,
    isBreaking: false,
    isFeatured: false,
    isEditorChoice: true,
    isFactCheck: true,
    factCheckData: {
      claim: 'إلغاء منظومة الخبز المدعم للمواطنين واستبدالها بالدعم النقدي بدءاً من أول الشهر.',
      claimant: 'صفحات وحسابات غير رسمية على مواقع التواصل الاجتماعي.',
      verdict: 'false',
      verdictLabel: 'مفبرك وغير صحيح',
      truth: 'أكدت وزارة التموين استمرار صرف الخبز المدعم بانتظام بـ 20 قرشاً للرغيف دون أي تغيير أو إلغاء.',
      evidence: [
        'بيان رسمي من المركز الإعلامي لمجلس الوزراء يكذب الشائعة.',
        'تأكيد وزارة التموين انتظام عمل 30 ألف مخبز بلدي على مستوى الجمهورية.',
        'عدم صدور أي تشريع أو قرار وزاري بوقف المنظومة الحالية.'
      ],
      dateChecked: '2026-08-23'
    },
    publishedAt: '2026-08-23T08:00:00Z',
    updatedAt: '2026-08-23T09:15:00Z',
    status: 'published',
    likesCount: 1120,
    commentsCount: 45,
    sharesCount: 890,
    seo: {
      metaTitle: 'المصري فاكت: حقيقة إلغاء الخبز المدعم وتحويله لدعم نقدي',
      metaDescription: 'الرد الرسمي على شائعة إلغاء منظومة الخبز المدعم على بطاقات التموين.',
      keywords: ['المصري فاكت', 'بطاقة التموين', 'الخبز المدعم', 'شائعات']
    }
  },
  {
    id: 'fact-check-monorail-fares-currency',
    title: 'المصري فاكت: حقيقة فرض سداد تذاكر واشتراكات المونوريل والقطار الكهربائي بالدولار',
    subtitle: 'وحدة تدقيق المعلومات توضح اللبس المنتشر حول لوائح الدفع في شبكة النقل الحديثة',
    slug: 'fact-check-monorail-fares-currency',
    excerpt: 'تداولت مواقع خبراً يزعم اشتراط سداد تذاكر المونوريل والقطار السريع بالعملة الصعبة. الوحدة توضح حقيقة اللائحة وما يخص الركاب الأجانب.',
    content: `تداولت عدة صفحات خبراً منسوباً لهيئة الأنفاق يزعم تحصيل رسوم تذاكر مونوريل شرق وغرب النيل وشبكة القطار الكهربائي الخفيف بالعملات الأجنبية كالدولار واليورو.

قام فريق "المصري فاكت" بمراجعة لائحة التشغيل والأسعار المعلنة من الهيئة القومية للأنفاق ووزارة النقل، والتواصل مع مسؤولي تشغيل المحطات.

النتيجة المؤكدة: الادعاء "مضلل وخارج السياق". تنص اللائحة الرسمية بوضوح تام على أن كافة التذاكر والاشتراكات لجميع المواطنين المصريين يتم تحصيلها حصرياً بالجنيه المصري دون أدنى استثناء، وأن تحصيل القيمة بالعملات الأجنبية ينطبق فقط على السائحين الأجانب غير المقيمين من خلال منافذ مخصصة لحاملي بطاقات الائتمان الدولية.`,
    categoryId: 'factcheck',
    categoryName: 'المصري فاكت',
    subCategory: 'تدقيق وتوضيح',
    authorId: 'author-2',
    authorName: 'سارة عبد الفتاح المنياوي',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    authorRole: 'مديرة وحدة التحقيقات وتدقيق الحقائق',
    featuredImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'شبكة المونوريل والقطار الكهربائي تخدم ملايين الركاب يومياً بالعملة الوطنية',
    tags: ['المصري فاكت', 'المونوريل', 'وزارة النقل', 'تذاكر بالدولار', 'حقائق'],
    views: 16800,
    readingTimeMinutes: 3,
    isBreaking: false,
    isFeatured: false,
    isEditorChoice: false,
    isFactCheck: true,
    factCheckData: {
      claim: 'إلزام جميع الركاب بسداد تذاكر المونوريل والقطار الكهربائي بالدولار.',
      claimant: 'منشورات مجتزأة على وسائل التواصل الاجتماعي.',
      verdict: 'misleading',
      verdictLabel: 'مضلل وخارج السياق',
      truth: 'سداد التذاكر للمصريين حصرياً بالجنيه المصري، بينما يقتصر الدفع بالعملة الأجنبية على السياح الأجانب غير المقيمين.',
      evidence: [
        'لائحة الهيئة القومية للأنفاق الرسمية لتعريفة الركوب.',
        'تصريح رسمي من وزير النقل يوضح حقيقة الضوابط للسياح.',
        'ماكينات حجز التذاكر الآلية بالمحطات تعمل بالعملة المحلية.'
      ],
      dateChecked: '2026-08-24'
    },
    publishedAt: '2026-08-24T10:00:00Z',
    updatedAt: '2026-08-24T11:00:00Z',
    status: 'published',
    likesCount: 940,
    commentsCount: 28,
    sharesCount: 520,
    seo: {
      metaTitle: 'المصري فاكت: حقيقة دفع تذاكر المونوريل بالدولار',
      metaDescription: 'توضيح حقيقة تسعير تذاكر وسائل النقل الذكية بالعملة الصعبة.',
      keywords: ['المصري فاكت', 'المونوريل', 'القطار الكهربائي', 'تذاكر بالدولار']
    }
  },
  {
    id: 'art-6',
    title: 'مقال اليوم: التوازن الجيوسياسي ومستقبل سلاسل الإمداد العالمية في عصر الذكاء الاصطناعي',
    subtitle: 'قراءة في تحولات التجارة الدولية وموقع الممرات الملاحية المصرية',
    slug: 'opinion-geopolitics-ai-supply-chains-egypt',
    excerpt: 'تتغير ملامح التجارة الدولية بوتيرة متسارعة، حيث تفرض الثورة الرقمية والتطورات اللوجستية شروطاً جديدة تجعل من مصر رقماً صعباً في خريطة التجارة الكونية.',
    content: `لا يمكن قراءة المشهد الدولي الراهن بمعزل عن التداخل العميق بين خوارزميات الذكاء الاصطناعي والتحكم في سلاسل الإمداد العالمية. فالصراع لم يعد فقط على الموارد الطبيعية التقليدية، بل انتقل إلى السيطرة على خطوط النقل السريع، مراكز البيانات الضخمة، والممرات الملاحية الاستراتيجية.

وفي هذا السياق، تبرز قناة السويس والمنطقة الاقتصادية المحيطة بها كركيزة لا غنى عنها في بنية الاقتصاد الكوكبي. إن تطوير الموانئ المصرية على البحرين المتوسط والأحمر، وربطها بخطوط القطار الكهربائي فائق السرعة، ليس مجرد مشروع بنية تحتية محلي، بل هو إعادة هندسة لمسارات التجارة بين الشرق والغرب.

علينا أن ندرك أن الاستثمار في رأس المال البشري والقدرات الرقمية هو الضمان الحقيقي لحجز موقع متقدم في النظام العالمي الجديد.`,
    categoryId: 'opinion',
    categoryName: 'رأي ومقالات',
    subCategory: 'تحليلات سياسية',
    authorId: 'author-5',
    authorName: 'د. ليلى عبد الرحمن فهمي',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    authorRole: 'أستاذة العلوم السياسية وكاتبة رأي',
    featuredImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
    tags: ['مقال رأي', 'سلاسل الإمداد', 'قناة السويس', 'الذكاء الاصطناعي', 'التجارة العالمية'],
    views: 14200,
    readingTimeMinutes: 5,
    isBreaking: false,
    isFeatured: false,
    isEditorChoice: true,
    publishedAt: '2026-08-21T21:00:00Z',
    updatedAt: '2026-08-22T05:00:00Z',
    status: 'published',
    likesCount: 720,
    commentsCount: 38,
    sharesCount: 190,
    seo: {
      metaTitle: 'مقال: د. ليلى فهمي تكتب عن سلاسل الإمداد والذكاء الاصطناعي',
      metaDescription: 'تحليل جيوسياسي لدور الممرات الملاحية المصرية في التجارة العالمية الجديدة.',
      keywords: ['مقالات رأي', 'ليلى فهمي', 'قناة السويس', 'الذكاء الاصطناعي']
    }
  },
  {
    id: 'art-7',
    title: 'تكنولوجيا: إطلاق أول منصة عربية مفتوحة المصدر للنماذج اللغوية الفائقة المتخصصة في اللهجات والعلوم',
    subtitle: 'تحالف تقني مصري عربي يطور نموذج ذكاء اصطناعي يدعم الفصحى واللهجات المحلية بدقة 98%',
    slug: 'arabic-ai-llm-platform-launch',
    excerpt: 'أعلنت نخبة من الباحثين والمهندسين إطلاق نموذج ذكاء اصطناعي عربي جديد، قادر على معالجة النصوص البرمجية والتحليلات الطبية والقانونية وفهم السياق الثقافي العربي بدقة استثنائية.',
    content: `في خطوة وصفت بأنها علامة فارقة في مسيرة السيادة الرقمية العربية، أعلن تحالف تكنولوجي بالتعاون مع مراكز بحثية جامعية عن تدشين النموذج اللغوي العربي فائق القدرات "الضاد-1".

يتميز النموذج الجديد بتدريبه على أكثر من 3 تريليونات رمز لغوي عربي، تغطي التراث الفكري، المصطلحات العلمية الحديثة، اللهجات الدارجة، وقواعد الصرف والنحو، مما يجعله قادراً على تفوق ملحوظ على النماذج العالمية في اختبارات الفهم العربي المتخصص.

وأوضح المهندس عمر النجار، أحد المشرفين على المشروع: "الهدف ليس فقط تقديم أداة محادثة، بل تمكين المستشفيات والمحاكم والشركات من أتمتة الوثائق وصياغة العقود وتطوير التطبيقات دون الاعتماد على خوادم أجنبية قد تشكل تهديداً لخصوصية البيانات".`,
    categoryId: 'tech',
    categoryName: 'تكنولوجيا',
    subCategory: 'ذكاء اصطناعي',
    authorId: 'author-4',
    authorName: 'مهندس عمر النجار',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    authorRole: 'رئيس قسم التكنولوجيا',
    featuredImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'الواجهة البرمجية للنموذج اللغوي العربي الجديد',
    tags: ['تكنولوجيا', 'ذكاء اصطناعي', 'اللغة العربية', 'برمجيات', 'أمن سيبراني'],
    views: 24500,
    readingTimeMinutes: 4,
    isBreaking: false,
    isFeatured: true,
    isEditorChoice: false,
    publishedAt: '2026-08-22T04:20:00Z',
    updatedAt: '2026-08-22T06:15:00Z',
    status: 'published',
    likesCount: 1120,
    commentsCount: 53,
    sharesCount: 430,
    seo: {
      metaTitle: 'إطلاق نموذج ذكاء اصطناعي عربي فائق للغات والعلوم',
      metaDescription: 'تفاصيل إطلاق منصة الضاد-1 للذكاء الاصطناعي التوليدي باللغة العربية.',
      keywords: ['ذكاء اصطناعي عربي', 'نماذج لغوية', 'تكنولوجيا مصرية']
    }
  },
  {
    id: 'art-8',
    title: 'الإسكندرية تستعد لافتتاح المتحف اليوناني الروماني وتطوير كورنيش عروس المتوسط بممشى سياحي عالمي',
    subtitle: 'مشروعات تراثية كبرى تعيد بهاء العاصمة التاريخية وتجذب ملايين الزائرين من أنحاء العالم',
    slug: 'alexandria-greek-roman-museum-waterfront-development',
    excerpt: 'تضع محافظة الإسكندرية اللمسات النهائية لمشروع التطوير الشامل للواجهة البحرية والمتاحف الأثرية، في إطار خطة متكاملة للارتقاء بالسياحة الثقافية والترفيهية.',
    content: `تشهد مدينة الإسكندرية نقلة حضارية وتاريخية كبرى مع اكتمال أعمال ترميم وتحديث المتحف اليوناني الروماني ومحيطه التراثي، ليعود إلى استقبال زواره بأحدث نظم العرض المتحفي العالمية.

كما تواصل الأجهزة التنفيذية استكمال مشروع ممشى أهل الإسكندرية وتوسعة الكورنيش، مع الحفاظ الكامل على الطابع المعماري الكلاسيكي وإضافة مسارات للمشاة والدراجات ومناطق خضراء مفتوحة تطل مباشرة على البحر.

وأكد محافظ الإسكندرية أن هذه المشروعات تهدف إلى تعزيز جاذبية عروس البحر الأبيض كوجهة سياحية عالمية على مدار العام وليس في موسم الصيف فقط.`,
    categoryId: 'governorates',
    categoryName: 'محافظات',
    subCategory: 'الإسكندرية',
    authorId: 'author-2',
    authorName: 'سارة عبد الفتاح المنياوي',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    authorRole: 'مديرة وحدة التحقيقات',
    featuredImage: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'واجهة كورنيش الإسكندرية والقلعة بعد التطوير الحضري',
    tags: ['الإسكندرية', 'المتحف اليوناني الروماني', 'السياحة', 'محافظات مصر', 'تطوير الكورنيش'],
    views: 19800,
    readingTimeMinutes: 3,
    isBreaking: false,
    isFeatured: false,
    isEditorChoice: false,
    governorate: 'alexandria',
    publishedAt: '2026-08-21T16:00:00Z',
    updatedAt: '2026-08-22T03:00:00Z',
    status: 'published',
    likesCount: 940,
    commentsCount: 29,
    sharesCount: 260,
    seo: {
      metaTitle: 'تطوير الإسكندرية وافتتاح المتحف اليوناني الروماني',
      metaDescription: 'أحدث مشروعات التطوير الحضري والمتاحف التاريخية في الإسكندرية.',
      keywords: ['الإسكندرية', 'المتحف اليوناني الروماني', 'كورنيش الإسكندرية']
    }
  },
  {
    id: 'art-news-summit',
    title: 'مصر تستضيف القمة الإفريقية للتعاون الإنمائي بحضور 35 دولة لبحث مشروعات الربط القاري والأمن الغذائي',
    subtitle: 'إعلان مبادرة القاهرة لتعزيز التجارة البينية الإفريقية وتدشين خطوط ملاحية سريعة',
    slug: 'egypt-hosts-african-development-summit-cairo-2026',
    excerpt: 'انطلقت في مركز المنارة للمؤتمرات الدولية بالقاهرة أعمال القمة الإفريقية بمشاركة رؤساء وقادة 35 دولة إفريقية وممثلي المؤسسات التمويلية الدولية لمناقشة تسريع مشروعات البنية التحتية والربط السككي والكهربائي.',
    content: `افتتحت في القاهرة فعاليات القمة الإفريقية للتعاون الإنمائي 2026، التي تستضيفها جمهورية مصر العربية برعاية رئاسية وحضور حاشد من قادة الدول ورؤساء الحكومات والمنظمات الإقليمية.

وتركزت جلسات العمل الافتتاحية على سبل تفعيل اتفاقية التجارة الحرة القارية (AfCFTA)، وتخفيض تكلفة الشحن اللوجستي بين العواصم الإفريقية، بالإضافة إلى استعراض التقدم في مشروع طريق "القاهرة - كيب تاون" الذي يدخل مراحله التشغيلية الأخيرة.

وأكد وزير الخارجية والهجرة في كلمته أن مصر تضع كافة خبراتها وإمكاناتها الهندسية لدعم تنمية دول القارة الشقيقة، مشيراً إلى إبرام 12 اتفاقية ثنائية في مجالات الطاقة المتجددة ومعالجة المياه والتحول الرقمي.`,
    categoryId: 'news',
    categoryName: 'أخبار',
    subCategory: 'تغطيات خاصة',
    authorId: 'author-ehab',
    authorName: 'م. إيهاب عبد الكريم',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    authorRole: 'رئيس التحرير',
    featuredImage: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'الجلسة الافتتاحية للقمة الإفريقية بمركز المنارة الدولي للمؤتمرات',
    tags: ['أخبار مصر', 'إفريقيا', 'القمة الإفريقية', 'التجارة البينية', 'القاهرة'],
    views: 31200,
    readingTimeMinutes: 4,
    isBreaking: false,
    isFeatured: true,
    isEditorChoice: true,
    publishedAt: '2026-08-22T11:00:00Z',
    updatedAt: '2026-08-22T11:30:00Z',
    status: 'published',
    likesCount: 1420,
    commentsCount: 65,
    sharesCount: 380,
    reactions: { like: 950, love: 310, clap: 110, insightful: 45, sad: 5 },
    seo: {
      metaTitle: 'مصر تستضيف القمة الإفريقية للتعاون الإنمائي بالقاهرة',
      metaDescription: 'تفاصيل انطلاق القمة الإفريقية بمشاركة 35 دولة لبحث مشروعات الربط القاري.',
      keywords: ['القمة الإفريقية', 'أخبار مصر', 'القاهرة', 'التجارة الحرة']
    }
  },
  {
    id: 'art-politics-dialogue',
    title: 'الحوار الوطني يستكمل مناقشة حزمة القوانين السياسية والاقتصادية بمشاركة واسعة لممثلي الأحزاب والنقابات',
    subtitle: 'توافق عام حول تعزيز تمكين الشباب وتوسيع مظلة الحماية الاجتماعية ودعم الإنتاج المحلي',
    slug: 'national-dialogue-political-economic-consensus-2026',
    excerpt: 'شهدت جلسات الحوار الوطني بالعاصمة الإدارية نقاشات معمقة بمشاركة مختلف الأطياف السياسية، لبحث مخرجات الإصلاح التشريعي وتطوير منظومة الضرائب وتيسير بيئة ريادة الأعمال.',
    content: `عقد مجلس أمناء الحوار الوطني سلسلة من الجلسات التخصصية بحضور ممثلي الأحزاب السياسية، النقابات المهنية والعمالية، ورجال الأعمال والخبراء الاقتصاديين.

وتركزت النقاشات على مقترحات تعديل قانون الإدارة المحلية وإجراء انتخابات المجالس الشعبية، إلى جانب صياغة حوافز استثنائية للشركات الناشئة والمشروعات المتوسطة والصغيرة.

وأكد المنسق العام للحوار الوطني أن كافة التوصيات يتم رفعها مباشرة إلى القيادة السياسية بعد صياغتها بصورة توافقية تعكس المصلحة الوطنية العليا وترسخ دعائم الجمهورية الجديدة.`,
    categoryId: 'politics',
    categoryName: 'سياسة',
    subCategory: 'الأحزاب',
    authorId: 'author-magdy',
    authorName: 'مجدي محمد أبو زيد',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    authorRole: 'مدير التحرير التنفيذي',
    featuredImage: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'جانب من الجلسات المشتركة للحوار الوطني اليوم',
    tags: ['الحوار الوطني', 'السياسة المصرية', 'الأحزاب', 'البرلمان'],
    views: 26800,
    readingTimeMinutes: 4,
    isBreaking: false,
    isFeatured: true,
    isEditorChoice: false,
    publishedAt: '2026-08-22T08:15:00Z',
    updatedAt: '2026-08-22T09:00:00Z',
    status: 'published',
    likesCount: 880,
    commentsCount: 39,
    sharesCount: 210,
    reactions: { like: 620, love: 140, clap: 85, insightful: 32, sad: 3 },
    seo: {
      metaTitle: 'الحوار الوطني يناقش الإصلاح السياسي والاقتصادي',
      metaDescription: 'تفاصيل جلسات الحوار الوطني وتوافق الأحزاب على حزمة التشريعات الجديدة.',
      keywords: ['الحوار الوطني', 'سياسة مصر', 'الأحزاب السياسية']
    }
  },
  {
    id: 'art-world-gaza-reconstruction',
    title: 'دبلوماسية حثيثة: مصر تقود جهوداً إقليمية لتثبيت الهدنة الشاملة وإدخال قوافل المساعدات الإنسانية والطبية',
    subtitle: 'غرفة عمليات مصرية تتابع معبر رفح على مدار الساعة لتسهيل عبور الجرحى وتفريغ الشاحنات',
    slug: 'egypt-leads-diplomatic-efforts-aid-reconstruction',
    excerpt: 'تواصل الدولة المصرية اتصالاتها المكثفة مع كافة الأطراف الدولية والإقليمية لضمان استدامة التهدئة وتدفق الإغاثة الطارئة، مع وضع خطط هندسية متكاملة للتعافي وإعادة الإعمار.',
    content: `تواصل الجهود الدبلوماسية والإنسانية المصرية مساعيها لوقف التصعيد في المنطقة وإرساء سلام شامل وعادل يضمن استقرار الشرق الأوسط وحقوق الشعب الفلسطيني المشروعة.

وتستمر الشاحنات المحملة بآلاف الأطنان من المواد الغذائية والمستلزمات الطبية والوقود بالعبور عبر المنافذ الحدودية، بالتعاون مع المنظمات الأممية والهلال الأحمر المصري، في ملحمة إغاثية تؤكد الدور الريادي التاريخي لمصر.

وأعلنت وزارة الصحة عن جاهزية المستشفيات في شمال سيناء ومدن القناة والقاهرة لاستقبال الحالات الحرجة وتقديم أعلى مستويات الرعاية الطبية والعمليات الجراحية المتقدمة.`,
    categoryId: 'world',
    categoryName: 'عرب وعالم',
    subCategory: 'الشرق الأوسط',
    authorId: 'author-5',
    authorName: 'د. ليلى عبد الرحمن فهمي',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    authorRole: 'كاتبة رأي ومستشارة سياسات عامة',
    featuredImage: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'قوافل المساعدات الإغاثية المصرية المتواصلة',
    tags: ['عرب وعالم', 'دبلوماسية مصر', 'المساعدات الإنسانية', 'الشرق الأوسط'],
    views: 41500,
    readingTimeMinutes: 4,
    isBreaking: true,
    isFeatured: true,
    isEditorChoice: true,
    publishedAt: '2026-08-22T10:45:00Z',
    updatedAt: '2026-08-22T11:15:00Z',
    status: 'published',
    likesCount: 2310,
    commentsCount: 178,
    sharesCount: 940,
    reactions: { like: 1600, love: 520, clap: 140, insightful: 45, sad: 5 },
    seo: {
      metaTitle: 'مصر تقود جهود الدبلوماسية والإغاثة وتثبيت التهدئة',
      metaDescription: 'تفاصيل المساعي المصرية لإدخال المساعدات الإنسانية وتثبيت الاستقرار الإقليمي.',
      keywords: ['عرب وعالم', 'الدبلوماسية المصرية', 'المساعدات', 'الشرق الأوسط']
    }
  },
  {
    id: 'art-accidents-digital-security',
    title: 'الأمن العام يضبط تشكيلاً عصابياً دولياً تخصص في النصب الإلكتروني وسرقة المحافظ الرقمية',
    subtitle: 'وزارة الداخلية تحذر المواطنين من الروابط المشبوهة وطلبات مشاركة أكواد التحقق (OTP)',
    slug: 'interior-ministry-busts-cyber-crime-scam-network',
    excerpt: 'نجحت قطاعات الأمن العام ومباحث تكنولوجيا المعلومات بوزارة الداخلية في تفكيك شبكة إجرامية استولت على ملايين الجنيهات عبر الرسائل النصية الاحتيالية وانتحال صفة البنوك.',
    content: `في إطار الضربات الأمنية الاستباقية لجرائم النصب والاحتيال السيبراني، ألقت الأجهزة الأمنية بوزارة الداخلية القبض على عناصر شبكة احتيال دولية منظمة استهدفت عملاء البنوك والمحافظ الإلكترونية.

وكشفت التحريات عن قيام المتهمين بإرسال رسائل هاتفية تحث الضحايا على تحديث بياناتهم المصرفية أو المطالبة بجوائز وهمية، واستدراجهم للإفصاح عن كلمات السر المؤقتة (OTP) للاستيلاء على مدخراتهم.

وضبطت القوات أجهزة حواسب آلية وهواتف ذكية محملة بقواعد بيانات مسروقة، ومبالغ مالية كبيرة، وتمت إحالة المتهمين للنيابة العامة التي باشرت التحقيق وأمرت بحبسهم على ذمة القضية.`,
    categoryId: 'accidents',
    categoryName: 'حوادث وقضايا',
    subCategory: 'الأمن العام',
    authorId: 'author-magdy',
    authorName: 'مجدي محمد أبو زيد',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    authorRole: 'مدير التحرير التنفيذي',
    featuredImage: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'قطاع مكافحة جرائم تقنية المعلومات بوزارة الداخلية يواصل جهوده الرادعة',
    tags: ['حوادث', 'وزارة الداخلية', 'الأمن العام', 'الاحتيال الإلكتروني', 'مباحث الإنترنت'],
    views: 33400,
    readingTimeMinutes: 3,
    isBreaking: false,
    isFeatured: true,
    isEditorChoice: false,
    publishedAt: '2026-08-22T06:40:00Z',
    updatedAt: '2026-08-22T07:10:00Z',
    status: 'published',
    likesCount: 1100,
    commentsCount: 72,
    sharesCount: 650,
    reactions: { like: 820, love: 120, clap: 110, insightful: 45, sad: 5 },
    seo: {
      metaTitle: 'الأمن العام يضبط تشكيلاً عصابياً للنصب وسرقة المحافظ الإلكترونية',
      metaDescription: 'تفاصيل ضبط شبكة احتيال إلكتروني تخصصت في سرقة حسابات البنوك.',
      keywords: ['حوادث وقضايا', 'مباحث الإنترنت', 'وزارة الداخلية', 'نصب إلكتروني']
    }
  },
  {
    id: 'art-health-insurance-expansion',
    title: 'الصحة تعلن ضم 4 محافظات جديدة لمنظومة التأمين الصحي الشامل وافتتاح 28 مركزاً تخصصياً',
    subtitle: 'توفير الكشف والأدوية والعمليات الجراحية الدقيقة بالمجان لأكثر من 6 ملايين مواطن جديد',
    slug: 'comprehensive-health-insurance-expansion-new-governorates',
    excerpt: 'أعلنت الهيئة العامة للتأمين الصحي الشامل توسيع التغطية الطبية لتشمل محافظات جديدة في الصعيد والدلتا، مع ميكنة كاملة لملفات المرضى وتطبيق نظام الحجز الإلكتروني عبر التطبيق الموحد.',
    content: `حققت منظومة التأمين الصحي الشامل في مصر إنجازاً تاريخياً جديداً بالإعلان الرسمي عن بدء التشغيل التجريبي للمنظومة في 4 محافظات إضافية، رافعةً عدد المنتفعين بمظلة الرعاية الطبية المتكاملة.

وتشمل الخدمات الجديدة تغطية نفقات زراعة الأعضاء، جراحات القلب المفتوح والأورام، وتوفير أحدث بروتوكولات الأدوية البيولوجية، دون تحميل المواطنين أية أعباء إضافية.

وأكدت وزارة الصحة أن المراكز الجديدة جهزت بأحدث أجهزة الرنين المغناطيسي والأشعة المقطعية وغرف العمليات الكبسولية الرقمية، مع ربطها بشبكة استشارات طبية عن بُعد مع كبار أساتذة الطب بالجامعات المصرية.`,
    categoryId: 'health',
    categoryName: 'صحة',
    subCategory: 'التأمين الصحي الشامل',
    authorId: 'author-2',
    authorName: 'سارة عبد الفتاح المنياوي',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    authorRole: 'مديرة وحدة التحقيقات',
    featuredImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'المستشفيات التخصصية الجديدة التابعة للتأمين الصحي الشامل',
    tags: ['صحة', 'التأمين الصحي الشامل', 'وزارة الصحة', 'مستشفيات', 'العلاج المجاني'],
    views: 29500,
    readingTimeMinutes: 4,
    isBreaking: false,
    isFeatured: true,
    isEditorChoice: true,
    publishedAt: '2026-08-22T05:30:00Z',
    updatedAt: '2026-08-22T06:00:00Z',
    status: 'published',
    likesCount: 1840,
    commentsCount: 94,
    sharesCount: 510,
    reactions: { like: 1250, love: 460, clap: 95, insightful: 30, sad: 5 },
    seo: {
      metaTitle: 'توسيع منظومة التأمين الصحي الشامل لـ 4 محافظات جديدة',
      metaDescription: 'تفاصيل ضم محافظات جديدة لمنظومة التأمين الصحي الشامل وافتتاح 28 مركزاً طبياً.',
      keywords: ['التأمين الصحي الشامل', 'صحة مصر', 'علاج مجاني']
    }
  },
  {
    id: 'art-education-stem-universities',
    title: 'التعليم العالي يعلن تنسيق الجامعات التكنولوجية ومدارس المتفوقين (STEM) بمنح دراسية كاملة',
    subtitle: 'شراكات مع جامعات ألمانية ويابانية لتخريج كوادر متخصصة في الذكاء الاصطناعي وصناعة الرقائق',
    slug: 'higher-education-technological-universities-stem-grants',
    excerpt: 'أعلنت وزارة التعليم العالي والبحث العلمي فتح باب التقديم لـ 10 جامعات تكنولوجية جديدة تقدم برامج تطبيقية حديثة ومزدوجة الشهادات، تلبي احتياجات سوق العمل الإقليمي والدولي.',
    content: `كشفت وزارة التعليم العالي والبحث العلمي عن تفاصيل المنظومة التعليمية المتطورة للجامعات التكنولوجية التي تستقبل آلاف الطلاب في تخصصات هندسة الروبوتات، تصنيع السيارات، والبرمجيات المتقدمة.

وتقدم الجامعات بالتعاون مع كبرى الشركات العالمية برامج تدريب عملي مدفوعة الأجر أثناء سنوات الدراسة، مع اشتراط إتقان لغة أجنبية ثانية ومشروع تخرج تطبيقي يحل مشكلة صناعية فعلية.

كما تم الإعلان عن تخصيص 500 منحة كاملة لأوائل الثانوية العامة ومدارس المتفوقين في العلوم والتكنولوجيا (STEM) للدراسة في فروع الجامعات الدولية بالعاصمة الإدارية.`,
    categoryId: 'education',
    categoryName: 'تعليم',
    subCategory: 'الجامعات',
    authorId: 'author-1',
    authorName: 'د. مجدي إبراهيم الشناوي',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    authorRole: 'رئيس قسم الشؤون الاقتصادية والتعليمية',
    featuredImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'مختبرات الذكاء الاصطناعي والتصنيع بالجامعات التكنولوجية الحديثة',
    tags: ['تعليم', 'الجامعات التكنولوجية', 'تنسيق الجامعات', 'STEM', 'التعليم العالي'],
    views: 35100,
    readingTimeMinutes: 4,
    isBreaking: false,
    isFeatured: true,
    isEditorChoice: false,
    publishedAt: '2026-08-22T04:50:00Z',
    updatedAt: '2026-08-22T05:20:00Z',
    status: 'published',
    likesCount: 1530,
    commentsCount: 82,
    sharesCount: 670,
    reactions: { like: 1080, love: 320, clap: 90, insightful: 35, sad: 5 },
    seo: {
      metaTitle: 'تنسيق الجامعات التكنولوجية ومدارس STEM بمنح مجانية كاملة',
      metaDescription: 'تفاصيل برامج الجامعات التكنولوجية الجديدة وشراكات الشهادات المزدوجة.',
      keywords: ['الجامعات التكنولوجية', 'تنسيق الثانوية العامة', 'تعليم مصر']
    }
  },
  {
    id: 'art-arts-opera-grand-festival',
    title: 'افتتاح مهرجان الموسيقى العربية بدار الأوبرا بمشاركة نجوم الطرب من 14 دولة عربية',
    subtitle: 'تكريم رواد التلحين والشعر الغنائي وعروض أوركسترالية حية بتقنيات الصوت المحيطي الحديثة',
    slug: 'arab-music-festival-cairo-opera-house-opening-2026',
    excerpt: 'تألقت دار الأوبرا المصرية في حفل افتتاح الدورة الجديدة لمهرجان ومؤتمر الموسيقى العربية، الذي يشهد على مدار 15 يوماً تقديم 40 حقلاً غنائياً بمشاركة كبار الفنانين والفرق التراثية.',
    content: `شهد المسرح الكبير بدار الأوبرا المصرية انطلاق فعاليات مهرجان الموسيقى العربية في دورته الاستثنائية، وسط حضور نخبوي من نجوم الفن والمبدعين وسفراء الدول الشقيقة.

تضمن حفل الافتتاح تكريم كوكبة من رموز الموسيقى والغناء العربي الذين أثروا المكتبة الفنية بروائع خالدة، أعقبه أوبريت غنائي واستعراضي جسد الهوية الفنية العربية المشتركة.

وتشهد هذه الدورة استخدام أحدث تقنيات الإبهار البصري والهندسة الصوتية ثلاثية الأبعاد، مع بث الحفلات بجودة فائقة لجمهور الملايين في الوطن العربي والعالم عبر المنصات الرقمية.`,
    categoryId: 'arts',
    categoryName: 'فن وثقافة',
    subCategory: 'مهرجانات',
    authorId: 'author-2',
    authorName: 'سارة عبد الفتاح المنياوي',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    authorRole: 'مديرة وحدة التحقيقات والفنون',
    featuredImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'المسرح الكبير بدار الأوبرا المصرية في ليلة افتتاح المهرجان',
    tags: ['فن وثقافة', 'دار الأوبرا', 'مهرجان الموسيقى العربية', 'حفلات', 'طرب'],
    views: 28400,
    readingTimeMinutes: 3,
    isBreaking: false,
    isFeatured: true,
    isEditorChoice: false,
    publishedAt: '2026-08-21T20:00:00Z',
    updatedAt: '2026-08-21T21:15:00Z',
    status: 'published',
    likesCount: 1680,
    commentsCount: 61,
    sharesCount: 420,
    reactions: { like: 1100, love: 480, clap: 75, insightful: 20, sad: 5 },
    seo: {
      metaTitle: 'افتتاح مهرجان الموسيقى العربية بدار الأوبرا المصرية',
      metaDescription: 'تغطية شاملة لافتتاح مهرجان ومؤتمر الموسيقى العربية وتكريم كبار النجوم.',
      keywords: ['دار الأوبرا المصرية', 'مهرجان الموسيقى العربية', 'فن وثقافة']
    }
  },
  {
    id: 'art-services-gold-currency-daily',
    title: 'دليل الخدمات اليومي: استقرار أسعار الذهب واستمرار مبادرات الإسكان المتوسط والتمويل العقاري',
    subtitle: 'تفاصيل أسعار عيار 21 وسعر صرف الجنيه ومواعيد القطارات الذكية وخدمات الشهر العقاري',
    slug: 'daily-services-gold-rates-housing-initiatives-guide',
    excerpt: 'يقدم قسم الخدمات ببوابة المصري الإخباري رصداً شاملاً على مدار اليوم لأسعار الذهب والعملات الأجنبية في البنوك الرسمية، إلى جانب تفاصيل حجز شقق الإسكان الاجتماعي ومتطلبات التمويل العقاري.',
    content: `سجلت أسعار الذهب في الأسواق المصرية استقراراً ملحوظاً اليوم، حيث بلغ جرام الذهب عيار 21 الأكثر تداولاً مستويات مستقرة مدعومة بانتظام العرض والطلب واستقرار البورصة العالمية للمعادن الثمينة.

وفي سياق متصل، أعلنت وزارة الإسكان والمرافق عن استمرار حجز الوحدات السكنية الجاهزة للتسليم الفوري بمشروعات جنة وسكن مصر ودار مصر بعدة مدن جديدة، بفائدة متناقصة وأقساط ميسرة تمتد حتى 20 عاماً.

كما يقدم الدليل مواعيد قطارات تالجو الفاخرة على خطي (القاهرة - الإسكندرية) و(القاهرة - أسوان)، ورابط الاستعلام عن المخالفات المرورية وسدادها إلكترونياً عبر بوابة مصر الرقمية.`,
    categoryId: 'services',
    categoryName: 'خدمات',
    subCategory: 'أسعار الذهب',
    authorId: 'author-1',
    authorName: 'د. مجدي إبراهيم الشناوي',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    authorRole: 'رئيس قسم الشؤون الاقتصادية والخدمات',
    featuredImage: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'متابعة حركة تداول الذهب وأسعار الصرف الرسمية بالبنوك المصرية',
    tags: ['خدمات', 'أسعار الذهب', 'التمويل العقاري', 'الإسكان', 'سعر الدولار'],
    views: 48900,
    readingTimeMinutes: 3,
    isBreaking: false,
    isFeatured: true,
    isEditorChoice: false,
    publishedAt: '2026-08-22T07:45:00Z',
    updatedAt: '2026-08-22T08:15:00Z',
    status: 'published',
    likesCount: 1450,
    commentsCount: 52,
    sharesCount: 780,
    reactions: { like: 1020, love: 280, clap: 110, insightful: 35, sad: 5 },
    seo: {
      metaTitle: 'دليل الخدمات اليومي: أسعار الذهب والعملات وحجز شقق الإسكان',
      metaDescription: 'دليل شامل لأسعار الذهب عيار 21 وسعر الدولار ومبادرات التمويل العقاري في مصر.',
      keywords: ['أسعار الذهب اليوم', 'سعر الدولار', 'شقق الإسكان', 'خدمات مصر']
    }
  }
];

export const INITIAL_BREAKING_NEWS: BreakingNewsItem[] = [
  {
    id: 'brk-1',
    title: 'رئيس مجلس الوزراء يعلن حزمة تسهيلات استثمارية وإعفاءات ضريبية جديدة للقطاع الصناعي',
    articleId: 'art-1',
    priority: 'urgent',
    active: true,
    category: 'مصر',
    createdAt: '2026-08-22T09:30:00Z',
    expiresAt: '2026-08-22T15:00:00Z'
  },
  {
    id: 'brk-2',
    title: 'البنك المركزي المصري: صافي احتياطي النقد الأجنبي يسجل 49.8 مليار دولار بنهاية الربع المالي',
    articleId: 'art-2',
    priority: 'high',
    active: true,
    category: 'اقتصاد',
    createdAt: '2026-08-22T08:45:00Z',
    expiresAt: '2026-08-22T14:00:00Z'
  },
  {
    id: 'brk-3',
    title: 'الأهلي يتأهل لنصف نهائي دوري أبطال إفريقيا بعد الفوز على صن داونز 3-1 باستاد القاهرة',
    articleId: 'art-3',
    priority: 'normal',
    active: true,
    category: 'رياضة',
    createdAt: '2026-08-22T07:15:00Z',
    expiresAt: '2026-08-22T13:00:00Z'
  },
  {
    id: 'brk-4',
    title: 'هيئة الأرصاد الجوية: طقس معتدل نهاراً على القاهرة والوجه البحري مع انخفاض طفيف في الرطوبة',
    priority: 'normal',
    active: true,
    category: 'طقس',
    createdAt: '2026-08-22T06:00:00Z',
    expiresAt: '2026-08-22T12:00:00Z'
  }
];

export const INITIAL_LIVE_UPDATES: LiveUpdate[] = [
  {
    id: 'live-1',
    title: 'مؤتمر صحفي لوزير المالية لإعلان النتائج الختامية للموازنة العامة للدولة',
    content: 'أكد الوزير تحقيق فائض أولي بلغ 3.2% وخفض نسبة الدين العام إلى الناتج المحلي الإجمالي بمقدار 5 نقاط مئوية.',
    timestamp: '10:45 ص',
    category: 'اقتصاد',
    isBreaking: true,
    author: 'محرر الشؤون المالية'
  },
  {
    id: 'live-2',
    title: 'انتظام حركة الملاحة بقناة السويس وعبور 72 سفينة بحمولات تتجاوز 4.8 مليون طن',
    content: 'أكدت هيئة القناة جاهزية كافة المرشدين وأطقم الطوارئ مع تدشين قاطرات إنقاذ عملاقة جديدة.',
    timestamp: '10:15 ص',
    category: 'مصر',
    isBreaking: false,
    author: 'مكتب القناة'
  },
  {
    id: 'live-3',
    title: 'افتتاح معرض القاهرة الدولي للكتاب في دورته الاستثنائية بمركز مصر للمعارض الدولية',
    content: 'إقبال جماهيري قياسي منذ الساعات الأولى لمشاركة 1200 دار نشر من 55 دولة عربية وأجنبية.',
    timestamp: '09:50 ص',
    category: 'ثقافة',
    isBreaking: false,
    author: 'محرر الثقافة'
  },
  {
    id: 'live-4',
    title: 'استقرار أسعار الذهب في الصاغة المصرية: عيار 21 يسجل 3,450 جنيهاً للجرام',
    content: 'استقرار في الأسواق المحلية تزامناً مع ثبات الأوقية عالمياً عند مستويات 2,420 دولاراً.',
    timestamp: '09:20 ص',
    category: 'اقتصاد',
    isBreaking: false,
    author: 'شعبة الذهب'
  }
];

export const GOLD_PRICES: GoldPriceItem[] = [
  { karat: 'عيار 24', buyPrice: 3942, sellPrice: 3965, change: 15 },
  { karat: 'عيار 21 (الأكثر مبيعاً)', buyPrice: 3450, sellPrice: 3470, change: 10 },
  { karat: 'عيار 18', buyPrice: 2957, sellPrice: 2974, change: 8 },
  { karat: 'عيار 14', buyPrice: 2300, sellPrice: 2315, change: 5 },
  { karat: 'الجنيه الذهب (8 جرام)', buyPrice: 27600, sellPrice: 27760, change: 80 },
  { karat: 'الأوقية عالمياً ($)', buyPrice: 2422, sellPrice: 2425, change: -4.5 }
];

export const CURRENCY_RATES: CurrencyRateItem[] = [
  { currency: 'الدولار الأمريكي', code: 'USD', flag: '🇺🇸', buyPrice: 48.65, sellPrice: 48.75, change: -0.05 },
  { currency: 'اليورو الأوروبي', code: 'EUR', flag: '🇪🇺', buyPrice: 53.10, sellPrice: 53.25, change: 0.12 },
  { currency: 'الريال السعودي', code: 'SAR', flag: '🇸🇦', buyPrice: 12.96, sellPrice: 13.00, change: 0.00 },
  { currency: 'الدرهم الإماراتي', code: 'AED', flag: '🇦🇪', buyPrice: 13.24, sellPrice: 13.28, change: 0.01 },
  { currency: 'الجنيه الإسترليني', code: 'GBP', flag: '🇬🇧', buyPrice: 62.45, sellPrice: 62.68, change: 0.25 },
  { currency: 'الدينار الكويتي', code: 'KWD', flag: '🇰🇼', buyPrice: 158.40, sellPrice: 159.20, change: -0.15 }
];

export const WEATHER_FORECAST: WeatherItem[] = [
  { city: 'القاهرة', temp: 32, condition: 'مشمس ومعتدل', conditionIcon: 'Sun', humidity: 45, windSpeed: 18 },
  { city: 'الإسكندرية', temp: 28, condition: 'صافٍ ولطيف', conditionIcon: 'SunMedium', humidity: 65, windSpeed: 22 },
  { city: 'شرم الشيخ', temp: 36, condition: 'حار مشمس', conditionIcon: 'Sun', humidity: 30, windSpeed: 14 },
  { city: 'الغردقة', temp: 35, condition: 'مشمس منعش', conditionIcon: 'Sun', humidity: 35, windSpeed: 16 },
  { city: 'الأقصر', temp: 39, condition: 'حار جاف', conditionIcon: 'Flame', humidity: 18, windSpeed: 12 },
  { city: 'أسوان', temp: 41, condition: 'شديد الحرارة', conditionIcon: 'Flame', humidity: 15, windSpeed: 10 },
  { city: 'مطروح', temp: 27, condition: 'معتدل ساحلي', conditionIcon: 'CloudSun', humidity: 68, windSpeed: 20 },
  { city: 'بورسعيد', temp: 29, condition: 'لطيف', conditionIcon: 'SunMedium', humidity: 62, windSpeed: 19 }
];

export const PRAYER_TIMES: PrayerTimeItem[] = [
  { city: 'القاهرة', fajr: '04:52 ص', sunrise: '06:21 ص', dhuhr: '12:56 م', asr: '04:32 م', maghrib: '07:31 م', isha: '08:52 م' },
  { city: 'الإسكندرية', fajr: '04:55 ص', sunrise: '06:26 ص', dhuhr: '01:01 م', asr: '04:38 م', maghrib: '07:36 م', isha: '08:58 م' },
  { city: 'طنطا', fajr: '04:52 ص', sunrise: '06:22 ص', dhuhr: '12:57 م', asr: '04:33 م', maghrib: '07:32 م', isha: '08:53 م' },
  { city: 'المنصورة', fajr: '04:50 ص', sunrise: '06:20 ص', dhuhr: '12:55 م', asr: '04:32 م', maghrib: '07:30 م', isha: '08:52 م' },
  { city: 'أسيوط', fajr: '04:58 ص', sunrise: '06:24 ص', dhuhr: '12:57 م', asr: '04:29 م', maghrib: '07:29 م', isha: '08:47 م' },
  { city: 'الأقصر', fajr: '04:55 ص', sunrise: '06:19 ص', dhuhr: '12:50 م', asr: '04:20 م', maghrib: '07:22 م', isha: '08:38 م' },
  { city: 'أسوان', fajr: '04:57 ص', sunrise: '06:20 ص', dhuhr: '12:50 م', asr: '04:18 م', maghrib: '07:20 م', isha: '08:35 م' }
];

export const MATCHES_SCHEDULE: MatchItem[] = [
  {
    id: 'm-1',
    league: 'دوري أبطال إفريقيا - إياب نصف النهائي',
    homeTeam: 'الأهلي المصري',
    homeLogo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=100&auto=format&fit=crop&q=80',
    awayTeam: 'الترجي التونسي',
    awayLogo: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=100&auto=format&fit=crop&q=80',
    status: 'upcoming',
    timeOrMinute: '09:00 م',
    date: 'السبت 23 أغسطس',
    stadium: 'استاد القاهرة الدولي'
  },
  {
    id: 'm-2',
    league: 'الدوري المصري الممتاز',
    homeTeam: 'الزمالك',
    homeLogo: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=100&auto=format&fit=crop&q=80',
    awayTeam: 'بيراميدز',
    awayLogo: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=100&auto=format&fit=crop&q=80',
    homeScore: 2,
    awayScore: 1,
    status: 'finished',
    timeOrMinute: 'نهاية المباراة',
    date: 'أمس الجمعة',
    stadium: 'استاد الدفاع الجوي'
  },
  {
    id: 'm-3',
    league: 'الدوري الإنجليزي الممتاز',
    homeTeam: 'ليفربول (محمد صلاح)',
    homeLogo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=100&auto=format&fit=crop&q=80',
    awayTeam: 'مانشستر سيتي',
    awayLogo: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=100&auto=format&fit=crop&q=80',
    status: 'upcoming',
    timeOrMinute: '06:30 م',
    date: 'الأحد 24 أغسطس',
    stadium: 'ملعب أنفيلد'
  }
];

export const LEAGUE_STANDINGS: LeagueStandingItem[] = [
  { rank: 1, team: 'الأهلي', logo: '🔴', played: 28, won: 22, drawn: 4, lost: 2, goalsFor: 64, goalsAgainst: 18, goalDiff: 46, points: 70 },
  { rank: 2, team: 'بيراميدز', logo: '🔵', played: 28, won: 20, drawn: 5, lost: 3, goalsFor: 52, goalsAgainst: 21, goalDiff: 31, points: 65 },
  { rank: 3, team: 'الزمالك', logo: '⚪', played: 28, won: 18, drawn: 6, lost: 4, goalsFor: 49, goalsAgainst: 24, goalDiff: 25, points: 60 },
  { rank: 4, team: 'المصري البورسعيدي', logo: '🟢', played: 28, won: 14, drawn: 7, lost: 7, goalsFor: 38, goalsAgainst: 30, goalDiff: 8, points: 49 },
  { rank: 5, team: 'الاتحاد السكندري', logo: '🟢', played: 28, won: 12, drawn: 8, lost: 8, goalsFor: 34, goalsAgainst: 32, goalDiff: 2, points: 44 },
  { rank: 6, team: 'سيراميكا كليوباترا', logo: '🟡', played: 28, won: 11, drawn: 9, lost: 8, goalsFor: 39, goalsAgainst: 35, goalDiff: 4, points: 42 }
];

export const INITIAL_PHOTO_ALBUMS: PhotoAlbum[] = [
  {
    id: 'album-1',
    title: 'سحر الحضارة: 15 صورة توثق الافتتاح التجريبي لقاعات المتحف المصري الكبير بالجيزة',
    slug: 'grand-egyptian-museum-photo-gallery',
    description: 'جولة بصرية خلابة ترصد تمثال رمسيس الثاني والبهو العظيم وأحدث قاعات العرض المجهزة بتكنولوجيا الواقع المعزز.',
    coverImage: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=1000&auto=format&fit=crop&q=80',
    photographer: 'كريم البنا (عدسة المنصة)',
    photosCount: 15,
    views: 41200,
    publishedAt: '2026-08-22T08:00:00Z',
    photos: [
      { url: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=1200&auto=format&fit=crop&q=80', caption: 'الواجهة المعمارية المضيئة للمتحف المصري الكبير' },
      { url: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=1200&auto=format&fit=crop&q=80', caption: 'البهو العظيم وتمثال الملك رمسيس الثاني' },
      { url: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=1200&auto=format&fit=crop&q=80', caption: 'الدرج العظيم المطل على أهرامات الجيزة الخالدة' }
    ]
  },
  {
    id: 'album-2',
    title: 'أضواء وسحر النيل: لقطات بانورامية لقلب القاهرة التاريخية من أبراج ممشى أهل مصر',
    slug: 'nile-cairo-panoramic-views',
    description: 'مشاهد ليلية ساحرة تعكس حيوية العاصمة المصرية وأضواء المراكب النيلية في ليالي الصيف البهيجة.',
    coverImage: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=1000&auto=format&fit=crop&q=80',
    photographer: 'محمود عزت',
    photosCount: 12,
    views: 28400,
    publishedAt: '2026-08-21T20:30:00Z',
    photos: [
      { url: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=1200&auto=format&fit=crop&q=80', caption: 'نهر النيل في قلب القاهرة مع غروب الشمس' }
    ]
  }
];

export const INITIAL_VIDEOS: VideoStory[] = [
  {
    id: 'vid-1',
    title: 'فيديو حصري: رحلة كاملة داخل قطار المونوريل في مرحلة التشغيل من العاصمة الإدارية لمدينة نصر',
    slug: 'monorail-cairo-exclusive-tour-video',
    description: 'كاميرا المنصة تصحبكم في جولة وتجربة حقيقية لقطار مونوريل شرق النيل واستعراض المحطات والتقنيات الذكية.',
    videoUrl: 'https://www.youtube.com/watch?v=_UwsW5uGtE8',
    thumbnail: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&auto=format&fit=crop&q=80',
    duration: '09:20',
    views: 89300,
    publishedAt: '2026-08-22T07:45:00Z',
    category: 'مصر',
    author: 'وحدة الفيديو الميداني'
  },
  {
    id: 'vid-2',
    title: 'ملخص وأهداف: مباراة الأهلي وهتافات الجماهير التي تهز استاد القاهرة الدولي',
    slug: 'ahly-sundowns-highlights-goals',
    description: 'شاهد الأهداف والفرص الضائعة وأجواء الجماهير الحماسية من قلب استاد القاهرة في اللقاء المثير.',
    videoUrl: 'https://www.youtube.com/watch?v=m1NbuLXLfFw',
    thumbnail: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80',
    duration: '05:30',
    views: 145000,
    publishedAt: '2026-08-22T08:10:00Z',
    category: 'رياضة',
    author: 'فريق التغطية الرياضية'
  },
  {
    id: 'vid-3',
    title: 'جولة وثائقية: أعلى قمة في إفريقيا وأكبر جولة حقيقية داخل البرج الأيقوني بالعاصمة الإدارية',
    slug: 'iconic-tower-documentary-cairo',
    description: 'توثيق مصور من داخل أعلى ناطحة سحاب في إفريقيا ومنطقة الأعمال المركزية (CBD) بالعاصمة الإدارية الجديدة.',
    videoUrl: 'https://www.youtube.com/watch?v=9a5dLc7YXAo',
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
    duration: '08:45',
    views: 64200,
    publishedAt: '2026-08-21T14:20:00Z',
    category: 'اقتصاد',
    author: 'وحدة الإنتاج الوثائقي'
  },
  {
    id: 'vid-4',
    title: 'تطوير شبكة النقل: وزير النقل يستعرض قطارات ومحطات المرحلة الجديدة لمترو الأنفاق ومحطة عدلي منصور',
    slug: 'cairo-metro-new-trains-alexandria',
    description: 'استعراض شامل لمنظومة مترو الأنفاق والربط التبادلي مع محطة المستشار عدلي منصور المركزية التبادلية.',
    videoUrl: 'https://www.youtube.com/watch?v=XTd76mWQFFg',
    thumbnail: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&auto=format&fit=crop&q=80',
    duration: '07:15',
    views: 52100,
    publishedAt: '2026-08-20T11:00:00Z',
    category: 'مصر',
    author: 'قسم الوسائط والنقل'
  }
];

export const INITIAL_ADS: Advertisement[] = [
  {
    id: 'ad-1',
    title: 'إعلان البنك الأهلي المصري - قروض الطاقة النظيفة والمشروعات الصغيرة',
    advertiser: 'البنك الأهلي المصري',
    placement: 'header',
    imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&auto=format&fit=crop&q=80',
    targetUrl: 'https://nbe.com.eg',
    startDate: '2026-08-01',
    endDate: '2026-09-01',
    impressions: 184500,
    clicks: 6420,
    status: 'active'
  },
  {
    id: 'ad-2',
    title: 'حملة مشروعات طلعت مصطفى بالعاصمة الإدارية ومدينة نور',
    advertiser: 'مجموعة طلعت مصطفى',
    placement: 'sidebar',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format&fit=crop&q=80',
    targetUrl: 'https://tmg.com.eg',
    startDate: '2026-08-10',
    endDate: '2026-09-15',
    impressions: 92300,
    clicks: 3180,
    status: 'active'
  }
];

export const INITIAL_SETTINGS: PlatformSettings = {
  siteName: 'المصري الإخباري',
  tagline: 'نبض الخبر.. صوت الحقيقة على مدار الساعة',
  description: 'البوابة الإخبارية الرائدة في نقل الأحداث والتحقيقات العميقة والأخبار العاجلة والتحليلات السياسية والاقتصادية بموضوعية واحترافية.',
  logoText: 'المصري',
  brandSubtitle: 'الإخباري',
  logoImageUrl: '/logo.jpg',
  primaryColor: '#dc2626',
  accentColor: '#1e293b',
  headerStyle: 'dark',
  newsCardLayout: 'grid',
  newsFontSize: 'md',
  showAuthorBio: true,
  showArticleViews: true,
  showReadingTime: true,
  showThumbnailInLists: true,
  breakingNewsEnabled: true,
  breakingNewsSpeed: 30,
  breakingNewsAnimation: 'scroll',
  enableLiveFeed: true,
  enableComments: true,
  moderationRequired: false,
  allowGuestComments: true,
  darkModeDefault: false,
  contactEmail: 'contact@almasry-news.eg',
  phone: '+20 2 2795 0000',
  address: 'شارع قصر العيني، وسط القاهرة، جمهورية مصر العربية',
  socialLinks: {
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
    telegram: 'https://telegram.org',
    whatsapp: 'https://whatsapp.com',
    tiktok: 'https://tiktok.com'
  },
  analytics: {
    googleAnalyticsId: 'G-EGNEWS2026',
    facebookPixelId: 'FB-987654321'
  }
};

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-admin-ehab',
    name: 'م. إيهاب عبد الكريم',
    email: 'ehababdelkreem012@yahoo.com',
    password: '01282407472ehab',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    role: 'superadmin',
    roleTitle: 'المدير العام ورئيس التحرير',
    department: 'الإدارة العامة وهيئة التحرير العليا',
    phone: '01282407472',
    bio: 'المدير العام ورئيس التحرير والمسؤول التنفيذي الأعلى للمنصة، له كامل الصلاحيات الإدارية والتحريرية والمطلقة في النظام.',
    bookmarks: ['art-1', 'art-4'],
    notes: 'حساب المدير العام ورئيس التحرير المعتمد للنظام وصاحب الصلاحيات المطلقة',
    createdAt: '2026-01-01T00:00:00Z',
    lastLogin: '2026-09-03T10:00:00Z',
    isActive: true
  },
  {
    id: 'usr-magdy-editor',
    name: 'مجدي محمد أبو زيد',
    email: 'magdy@almasry-news.eg',
    password: 'magdy',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    role: 'editor',
    roleTitle: 'مدير التحرير التنفيذي',
    department: 'هيئة التحرير وإدارة الأخبار',
    phone: '+20 100 123 4567',
    bio: 'مدير التحرير التنفيذي للمنصة، مسؤول عن غرف الأخبار وصياغة التغطيات والتحقيقات الصحفية واعتماد النشر.',
    bookmarks: ['art-2'],
    notes: 'حساب مدير التحرير التنفيذي المعتمد للنظام مع صلاحيات إدارة المحتوى',
    createdAt: '2026-01-15T00:00:00Z',
    lastLogin: '2026-09-03T10:00:00Z',
    isActive: true
  },
  {
    id: 'usr-journo-1',
    name: 'د. مجدي إبراهيم الشناوي',
    email: 'm.shennawy@almasry-news.eg',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    role: 'journalist',
    roleTitle: 'رئيس قسم الاقتصاد والأسواق',
    department: 'الشؤون الاقتصادية',
    phone: '+20 122 345 6789',
    bio: 'محلل اقتصادي متخصص في السياسات النقدية وأسواق المال المصرية والدولية.',
    bookmarks: ['art-2'],
    notes: 'صحفي معتمد لكتابة ونشر الأخبار الاقتصادية',
    createdAt: '2026-02-01T00:00:00Z',
    lastLogin: '2026-08-22T08:15:00Z',
    isActive: true
  },
  {
    id: 'usr-client-1',
    name: 'مجموعة طلعت مصطفى (حساب إعلاني)',
    email: 'ads@tmg.com.eg',
    avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&auto=format&fit=crop&q=80',
    role: 'client',
    roleTitle: 'عميل معلن معتمد - فئة ذهبية',
    department: 'الإعلانات والرعاية التجارية',
    phone: '+20 2 2456 7890',
    bio: 'حساب عميل مؤسسي معلن، إدارة الحملات الإعلانية ومتابعة إحصائيات النقرات والظهور.',
    bookmarks: [],
    notes: 'عقد سنوي سارٍ للإعلانات والرعايات الرقمية',
    createdAt: '2026-03-01T00:00:00Z',
    lastLogin: '2026-08-21T14:20:00Z',
    isActive: true
  },
  {
    id: 'usr-client-2',
    name: 'البنك الأهلي المصري (شريك إستراتيجي)',
    email: 'marketing@nbe.com.eg',
    avatar: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=200&auto=format&fit=crop&q=80',
    role: 'client',
    roleTitle: 'شريك مصرفي - قطاع التسويق',
    department: 'الحملات الإعلانية المباشرة',
    phone: '+20 2 2789 1234',
    bio: 'حساب إدارة الحملات الترويجية للمنتجات المصرفية والمبادرات القومية.',
    bookmarks: [],
    notes: 'حملة إعلانات الطاقة الخضراء متجددة',
    createdAt: '2026-03-15T00:00:00Z',
    lastLogin: '2026-08-20T11:00:00Z',
    isActive: true
  },
  {
    id: 'usr-reader-1',
    name: 'كريم إبراهيم فؤاد',
    email: 'karim.reader@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
    role: 'subscriber',
    roleTitle: 'مشترك سنوي مميز (VIP)',
    department: 'الجمهور والقراء',
    phone: '+20 101 987 6543',
    bio: 'متابع يومي للأخبار الاقتصادية والتحقيقات، مشترك في خدمة النشرات البريدية الخاصة.',
    bookmarks: ['art-1', 'art-3', 'art-4'],
    notes: 'مشترك نشط منذ 6 أشهر',
    createdAt: '2026-04-10T00:00:00Z',
    lastLogin: '2026-08-22T10:40:00Z',
    isActive: true
  }
];

export const CATEGORIES_LIST = INITIAL_CATEGORIES;
export const AUTHORS_LIST = INITIAL_AUTHORS;

