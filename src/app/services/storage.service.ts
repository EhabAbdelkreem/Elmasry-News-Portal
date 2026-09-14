import {
  Article,
  Category,
  Author,
  BreakingNewsItem,
  LiveUpdate,
  Comment,
  CommentReply,
  Advertisement,
  NewsletterSubscriber,
  User,
  PlatformSettings,
  PhotoAlbum,
  VideoStory,
  PlatformNotification,
  ReactionType,
  ArticleReactions,
  RecentlyViewedEntry
} from '../models';
import {
  INITIAL_ARTICLES,
  INITIAL_CATEGORIES,
  INITIAL_AUTHORS,
  INITIAL_BREAKING_NEWS,
  INITIAL_LIVE_UPDATES,
  INITIAL_ADS,
  INITIAL_SETTINGS,
  INITIAL_USERS,
  INITIAL_PHOTO_ALBUMS,
  INITIAL_VIDEOS
} from '../data/seed-data';

const STORAGE_KEYS = {
  ARTICLES: 'almasry_articles_v1',
  CATEGORIES: 'almasry_categories_v1',
  AUTHORS: 'almasry_authors_v1',
  BREAKING_NEWS: 'almasry_breaking_v1',
  LIVE_UPDATES: 'almasry_live_v1',
  COMMENTS: 'almasry_comments_v1',
  ADS: 'almasry_ads_v1',
  SETTINGS: 'almasry_settings_v1',
  USERS: 'almasry_users_v1',
  CURRENT_USER: 'almasry_current_user_v1',
  SUBSCRIBERS: 'almasry_subscribers_v1',
  NOTIFICATIONS: 'almasry_notifications_v1',
  PHOTO_ALBUMS: 'almasry_albums_v1',
  VIDEOS: 'almasry_videos_v1',
  THEME: 'almasry_theme_v1',
  RECENT_SEARCHES: 'almasry_recent_searches_v1',
  ANALYTICS_VIEWS: 'almasry_analytics_views_v1',
  USER_REACTIONS: 'almasry_user_reactions_v1',
  RECENTLY_VIEWED: 'almasry_recently_viewed_v1'
};

// Safe LocalStorage helpers
function getItem<T>(key: string, defaultValue: T): T {
  try {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.warn(`Failed reading ${key} from storage:`, e);
  }
  return defaultValue;
}

function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Failed writing ${key} to storage:`, e);
  }
}

class StorageService {
  // Articles
  getArticles(): Article[] {
    const articles = getItem<Article[]>(STORAGE_KEYS.ARTICLES, []);
    if (!articles || articles.length === 0) {
      setItem(STORAGE_KEYS.ARTICLES, INITIAL_ARTICLES);
      return INITIAL_ARTICLES;
    }

    // Sanitize any outdated mock or cartoon video URLs in cached articles
    let modified = false;
    articles.forEach(art => {
      if (
        art.videoUrl &&
        (art.videoUrl.includes('dQw4w9WgXcQ') ||
          art.videoUrl.includes('flower.mp4') ||
          art.videoUrl.includes('friday.mp4') ||
          art.videoUrl.includes('BigBuckBunny') ||
          art.videoUrl.includes('ElephantsDream') ||
          art.videoUrl.includes('sintel') ||
          art.videoUrl.includes('oceans.mp4') ||
          art.videoUrl.includes('ScMzIvxBSi4'))
      ) {
        art.videoUrl = 'https://www.youtube.com/watch?v=_UwsW5uGtE8';
        art.videoType = 'youtube';
        modified = true;
      }
    });

    // Ensure all seed fact-check articles exist in cache so "المصري فاكت" never disappears
    const seedFactArticles = INITIAL_ARTICLES.filter(a => a.isFactCheck || a.categoryId === 'factcheck');
    seedFactArticles.forEach(seedArt => {
      if (!articles.some(a => a.id === seedArt.id || a.slug === seedArt.slug)) {
        articles.push(seedArt);
        modified = true;
      }
    });

    if (modified) {
      setItem(STORAGE_KEYS.ARTICLES, articles);
    }

    return articles;
  }

  getArticleById(id: string): Article | undefined {
    return this.getArticles().find(a => a.id === id || a.slug === id);
  }

  saveArticle(article: Article): void {
    const articles = this.getArticles();
    const index = articles.findIndex(a => a.id === article.id);
    if (index >= 0) {
      articles[index] = { ...article, updatedAt: new Date().toISOString() };
    } else {
      articles.unshift({
        ...article,
        id: article.id || `art-${Date.now()}`,
        publishedAt: article.publishedAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        views: 0,
        likesCount: 0,
        commentsCount: 0,
        sharesCount: 0
      });
    }
    setItem(STORAGE_KEYS.ARTICLES, articles);
    this.notifyChange('articles');
  }

  createArticle(data: Partial<Article>): Article {
    const articles = this.getArticles();
    const newArticle: Article = {
      id: data.id || `art-${Date.now()}`,
      title: data.title || 'عنوان الخبر',
      subtitle: data.subtitle || '',
      slug: data.slug || `article-${Date.now()}`,
      excerpt: data.excerpt || '',
      content: data.content || '',
      categoryId: data.categoryId || 'news',
      categoryName: data.categoryName || 'أخبار',
      subCategory: data.subCategory,
      authorId: data.authorId || 'author-1',
      authorName: data.authorName || 'محرر المنصة',
      authorAvatar: data.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      authorRole: data.authorRole || 'محرر صحفي',
      featuredImage: data.featuredImage || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1200&auto=format&fit=crop&q=80',
      imageCaption: data.imageCaption,
      gallery: data.gallery,
      videoUrl: data.videoUrl,
      videoTitle: data.videoTitle,
      videoDuration: data.videoDuration,
      videoType: data.videoType || (data.videoUrl?.includes('youtube') || data.videoUrl?.includes('youtu.be') ? 'youtube' : 'mp4'),
      tags: data.tags || ['أخبار'],
      views: data.views || 0,
      readingTimeMinutes: data.readingTimeMinutes || 3,
      isBreaking: !!data.isBreaking,
      isFeatured: !!data.isFeatured,
      isEditorChoice: !!data.isEditorChoice,
      isSpecialReport: !!data.isSpecialReport,
      isFactCheck: !!data.isFactCheck,
      factCheckData: data.factCheckData,
      governorate: data.governorate,
      publishedAt: data.publishedAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: data.status || 'published',
      likesCount: 0,
      commentsCount: 0,
      sharesCount: 0,
      reactions: {
        like: 0,
        love: 0,
        clap: 0,
        insightful: 0,
        sad: 0
      },
      seo: data.seo || {
        metaTitle: data.title || '',
        metaDescription: data.excerpt || '',
        keywords: data.tags || []
      }
    };
    articles.unshift(newArticle);
    setItem(STORAGE_KEYS.ARTICLES, articles);
    this.notifyChange('articles');
    return newArticle;
  }

  updateArticle(id: string, updates: Partial<Article>): Article | undefined {
    const articles = this.getArticles();
    const index = articles.findIndex(a => a.id === id);
    if (index >= 0) {
      articles[index] = {
        ...articles[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      setItem(STORAGE_KEYS.ARTICLES, articles);
      this.notifyChange('articles');
      return articles[index];
    }
    return undefined;
  }

  deleteArticle(id: string): void {
    const articles = this.getArticles().filter(a => a.id !== id);
    setItem(STORAGE_KEYS.ARTICLES, articles);
    this.notifyChange('articles');
  }

  incrementArticleViews(id: string): void {
    const articles = this.getArticles();
    const article = articles.find(a => a.id === id);
    if (article) {
      article.views = (article.views || 0) + 1;
      setItem(STORAGE_KEYS.ARTICLES, articles);
      this.recordView(article.categoryId);
      this.addToRecentlyViewed(article.id);
    }
  }

  // Recently Viewed Articles
  getRecentlyViewed(): RecentlyViewedEntry[] {
    return getItem<RecentlyViewedEntry[]>(STORAGE_KEYS.RECENTLY_VIEWED, []);
  }

  getRecentlyViewedArticles(): (Article & { viewedAt: string })[] {
    const history = this.getRecentlyViewed();
    const articles = this.getArticles();
    const result: (Article & { viewedAt: string })[] = [];

    for (const entry of history) {
      const art = articles.find(a => a.id === entry.articleId);
      if (art) {
        result.push({
          ...art,
          viewedAt: entry.viewedAt
        });
      }
    }
    return result;
  }

  addToRecentlyViewed(articleId: string): void {
    if (!articleId) return;
    let list = this.getRecentlyViewed();
    // Remove if already present so it floats to the very top
    list = list.filter(item => item.articleId !== articleId);
    list.unshift({
      articleId,
      viewedAt: new Date().toISOString()
    });
    // Cap at 25 items
    if (list.length > 25) {
      list = list.slice(0, 25);
    }
    setItem(STORAGE_KEYS.RECENTLY_VIEWED, list);
    this.notifyChange('recently_viewed');
  }

  removeFromRecentlyViewed(articleId: string): void {
    let list = this.getRecentlyViewed();
    list = list.filter(item => item.articleId !== articleId);
    setItem(STORAGE_KEYS.RECENTLY_VIEWED, list);
    this.notifyChange('recently_viewed');
  }

  clearRecentlyViewed(): void {
    setItem(STORAGE_KEYS.RECENTLY_VIEWED, []);
    this.notifyChange('recently_viewed');
  }

  likeArticle(id: string): number {
    return this.reactToArticle(id, 'like').total;
  }

  getUserReaction(articleId: string): ReactionType | null {
    const userReactions = getItem<Record<string, ReactionType>>(STORAGE_KEYS.USER_REACTIONS, {});
    return userReactions[articleId] || null;
  }

  reactToArticle(articleId: string, reactionType: ReactionType): { reactions: ArticleReactions; userReaction: ReactionType | null; total: number } {
    const articles = this.getArticles();
    const article = articles.find(a => a.id === articleId);
    const userReactions = getItem<Record<string, ReactionType>>(STORAGE_KEYS.USER_REACTIONS, {});
    const previousReaction = userReactions[articleId];

    if (!article) {
      return {
        reactions: { like: 0, love: 0, clap: 0, insightful: 0, sad: 0 },
        userReaction: null,
        total: 0
      };
    }

    if (!article.reactions) {
      article.reactions = {
        like: article.likesCount || 0,
        love: 0,
        clap: 0,
        insightful: 0,
        sad: 0
      };
    }

    let newUserReaction: ReactionType | null = reactionType;

    if (previousReaction === reactionType) {
      // Toggle off / remove reaction
      article.reactions[reactionType] = Math.max(0, (article.reactions[reactionType] || 0) - 1);
      delete userReactions[articleId];
      newUserReaction = null;
    } else {
      // If user had a previous reaction, decrement old one
      if (previousReaction && article.reactions[previousReaction]) {
        article.reactions[previousReaction] = Math.max(0, article.reactions[previousReaction] - 1);
      }
      // Increment new reaction
      article.reactions[reactionType] = (article.reactions[reactionType] || 0) + 1;
      userReactions[articleId] = reactionType;
    }

    // Recalculate total positive likes & update article
    const totalPositive = (article.reactions.like || 0) + (article.reactions.love || 0) + (article.reactions.clap || 0) + (article.reactions.insightful || 0);
    article.likesCount = totalPositive;

    setItem(STORAGE_KEYS.ARTICLES, articles);
    setItem(STORAGE_KEYS.USER_REACTIONS, userReactions);
    this.notifyChange('articles');

    return {
      reactions: { ...article.reactions },
      userReaction: newUserReaction,
      total: totalPositive
    };
  }

  recordArticleShare(articleId: string, _platform?: string): number {
    const articles = this.getArticles();
    const article = articles.find(a => a.id === articleId);
    if (article) {
      article.sharesCount = (article.sharesCount || 0) + 1;
      setItem(STORAGE_KEYS.ARTICLES, articles);
      this.notifyChange('articles');
      return article.sharesCount;
    }
    return 0;
  }

  // Categories
  getCategories(): Category[] {
    const categories = getItem<Category[]>(STORAGE_KEYS.CATEGORIES, []);
    if (!categories || categories.length === 0) {
      setItem(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
      return INITIAL_CATEGORIES;
    }

    // Ensure factcheck category is always present and prominent
    const factIdx = categories.findIndex(c => c.id === 'factcheck' || c.slug === 'factcheck');
    const factCategory = INITIAL_CATEGORIES.find(c => c.id === 'factcheck') || {
      id: 'factcheck',
      slug: 'factcheck',
      name: 'المصري فاكت',
      nameEn: 'Fact Check',
      description: 'وحدة تدقيق المعلومات ومكافحة الشائعات والأخبار المضللة',
      iconName: 'ShieldCheck',
      color: '#059669',
      subCategories: ['تحقق الشائعات', 'تدقيق الصور', 'تصريحات المسؤولين'],
      order: 6
    };

    if (factIdx === -1) {
      // Insert in top 6 after sports
      const sportsIdx = categories.findIndex(c => c.id === 'sports' || c.slug === 'sports');
      const insertPos = sportsIdx >= 0 ? sportsIdx + 1 : Math.min(5, categories.length);
      categories.splice(insertPos, 0, factCategory);
      setItem(STORAGE_KEYS.CATEGORIES, categories);
    } else {
      // Keep name and styling updated
      if (categories[factIdx].name !== 'المصري فاكت' || categories[factIdx].color !== '#059669') {
        categories[factIdx] = { ...categories[factIdx], name: 'المصري فاكت', color: '#059669', iconName: 'ShieldCheck' };
        setItem(STORAGE_KEYS.CATEGORIES, categories);
      }
    }

    return categories;
  }

  // Authors
  getAuthors(): Author[] {
    const authors = getItem<Author[]>(STORAGE_KEYS.AUTHORS, []);
    if (!authors || authors.length === 0) {
      setItem(STORAGE_KEYS.AUTHORS, INITIAL_AUTHORS);
      return INITIAL_AUTHORS;
    }
    const ehabIdx = authors.findIndex(a => a.id === 'author-ehab' || a.email.toLowerCase() === 'ehababdelkreem012@yahoo.com');
    if (ehabIdx === -1) {
      authors.unshift(INITIAL_AUTHORS[0]);
      setItem(STORAGE_KEYS.AUTHORS, authors);
    } else if (authors[ehabIdx].role !== 'رئيس التحرير والمدير العام') {
      authors[ehabIdx].role = 'رئيس التحرير والمدير العام';
      setItem(STORAGE_KEYS.AUTHORS, authors);
    }

    const magdyIdx = authors.findIndex(a => a.id === 'author-magdy' || a.name.includes('مجدي محمد'));
    if (magdyIdx === -1) {
      const magdyAuthor = INITIAL_AUTHORS.find(a => a.id === 'author-magdy');
      if (magdyAuthor) {
        authors.splice(1, 0, magdyAuthor);
        setItem(STORAGE_KEYS.AUTHORS, authors);
      }
    } else if (authors[magdyIdx].role !== 'مدير التحرير التنفيذي') {
      authors[magdyIdx].role = 'مدير التحرير التنفيذي';
      setItem(STORAGE_KEYS.AUTHORS, authors);
    }
    return authors;
  }

  // Breaking News
  getBreakingNews(): BreakingNewsItem[] {
    const news = getItem<BreakingNewsItem[]>(STORAGE_KEYS.BREAKING_NEWS, []);
    if (!news || news.length === 0) {
      setItem(STORAGE_KEYS.BREAKING_NEWS, INITIAL_BREAKING_NEWS);
      return INITIAL_BREAKING_NEWS;
    }
    return news.filter(n => n.active);
  }

  getAllBreakingNews(): BreakingNewsItem[] {
    const news = getItem<BreakingNewsItem[]>(STORAGE_KEYS.BREAKING_NEWS, []);
    if (!news || news.length === 0) {
      setItem(STORAGE_KEYS.BREAKING_NEWS, INITIAL_BREAKING_NEWS);
      return INITIAL_BREAKING_NEWS;
    }
    return news;
  }

  saveBreakingNews(item: BreakingNewsItem): void {
    const list = this.getAllBreakingNews();
    const idx = list.findIndex(n => n.id === item.id);
    if (idx >= 0) {
      list[idx] = item;
    } else {
      list.unshift({ ...item, id: `brk-${Date.now()}` });
    }
    setItem(STORAGE_KEYS.BREAKING_NEWS, list);
    this.notifyChange('breaking');
  }

  addBreakingNews(item: any): void {
    this.saveBreakingNews(item);
  }

  deleteBreakingNews(id: string): void {
    const list = this.getAllBreakingNews().filter(n => n.id !== id);
    setItem(STORAGE_KEYS.BREAKING_NEWS, list);
    this.notifyChange('breaking');
  }

  // Live Updates
  getLiveUpdates(): LiveUpdate[] {
    const updates = getItem<LiveUpdate[]>(STORAGE_KEYS.LIVE_UPDATES, []);
    if (!updates || updates.length === 0) {
      setItem(STORAGE_KEYS.LIVE_UPDATES, INITIAL_LIVE_UPDATES);
      return INITIAL_LIVE_UPDATES;
    }
    return updates;
  }

  addLiveUpdate(update: Omit<LiveUpdate, 'id'>): void {
    const updates = this.getLiveUpdates();
    updates.unshift({
      ...update,
      id: `live-${Date.now()}`
    });
    setItem(STORAGE_KEYS.LIVE_UPDATES, updates);
    this.notifyChange('live');
  }

  // Comments
  getComments(articleId?: string): Comment[] {
    const comments = getItem<Comment[]>(STORAGE_KEYS.COMMENTS, [
      {
        id: 'comm-1',
        articleId: 'art-1',
        authorName: 'م. سامح الشناوي',
        authorEmail: 'sameh@example.com',
        authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        content: 'قرارات صائبة ومهمة جداً لدعم الإنتاج المحلي وتقليل فاتورة الاستيراد. نأمل في سرعة تفعيل الرخصة الذهبية للمشروعات الصغيرة أيضاً.',
        createdAt: '2026-08-22T09:40:00Z',
        likes: 12,
        status: 'approved',
        replies: [
          {
            id: 'rep-1',
            commentId: 'comm-1',
            authorName: 'د. مجدي إبراهيم الشناوي',
            authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
            content: 'شكراً لمشاركتك أستاذ سامح، بالفعل تم التأكيد في المؤتمر على شمول المشروعات الصغيرة والمتوسطة ضمن التيسيرات الائتمانية.',
            createdAt: '2026-08-22T10:00:00Z',
            likes: 8,
            isApproved: true
          }
        ]
      }
    ]);
    if (articleId) {
      return comments.filter(c => c.articleId === articleId && c.status === 'approved');
    }
    return comments;
  }

  addComment(comment: Omit<Comment, 'id' | 'createdAt' | 'likes' | 'replies' | 'status'>): Comment {
    const comments = getItem<Comment[]>(STORAGE_KEYS.COMMENTS, []);
    const settings = this.getSettings();
    const newComment: Comment = {
      ...comment,
      id: `comm-${Date.now()}`,
      createdAt: new Date().toISOString(),
      likes: 0,
      status: settings.moderationRequired ? 'pending' : 'approved',
      replies: []
    };
    comments.unshift(newComment);
    setItem(STORAGE_KEYS.COMMENTS, comments);

    // Increment article comments count
    const articles = this.getArticles();
    const article = articles.find(a => a.id === comment.articleId);
    if (article) {
      article.commentsCount = (article.commentsCount || 0) + 1;
      setItem(STORAGE_KEYS.ARTICLES, articles);
    }

    this.notifyChange('comments');
    return newComment;
  }

  addCommentReply(commentId: string, reply: Omit<CommentReply, 'id' | 'commentId' | 'createdAt' | 'likes' | 'isApproved'>): void {
    const comments = getItem<Comment[]>(STORAGE_KEYS.COMMENTS, []);
    const comment = comments.find(c => c.id === commentId);
    if (comment) {
      comment.replies = comment.replies || [];
      comment.replies.push({
        ...reply,
        id: `rep-${Date.now()}`,
        commentId,
        createdAt: new Date().toISOString(),
        likes: 0,
        isApproved: true
      });
      setItem(STORAGE_KEYS.COMMENTS, comments);
      this.notifyChange('comments');
    }
  }

  updateCommentStatus(id: string, status: Comment['status']): void {
    const comments = getItem<Comment[]>(STORAGE_KEYS.COMMENTS, []);
    const c = comments.find(item => item.id === id);
    if (c) {
      c.status = status;
      setItem(STORAGE_KEYS.COMMENTS, comments);
      this.notifyChange('comments');
    }
  }

  // Bookmarks
  toggleBookmark(articleId: string): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;
    user.bookmarks = user.bookmarks || [];
    const index = user.bookmarks.indexOf(articleId);
    let bookmarked = false;
    if (index >= 0) {
      user.bookmarks.splice(index, 1);
      bookmarked = false;
    } else {
      user.bookmarks.push(articleId);
      bookmarked = true;
    }
    this.updateUser(user);
    return bookmarked;
  }

  isBookmarked(articleId: string): boolean {
    const user = this.getCurrentUser();
    return user ? (user.bookmarks || []).includes(articleId) : false;
  }

  // Users & Auth
  getUsers(): User[] {
    let users = getItem<User[]>(STORAGE_KEYS.USERS, []);
    if (!users || users.length === 0) {
      setItem(STORAGE_KEYS.USERS, INITIAL_USERS);
      return INITIAL_USERS;
    }

    // Filter out Maha El-Sawy and Ahmed Mahmoud if previously persisted
    const initialLen = users.length;
    users = users.filter(u =>
      u.name !== 'مها الصاوي' &&
      u.name !== 'أحمد محمود' &&
      u.email.toLowerCase() !== 'editor@almasry-news.eg'
    );
    if (users.length !== initialLen) {
      setItem(STORAGE_KEYS.USERS, users);
    }

    // Ensure Ehab Abdelkreem General Manager & Editor-in-Chief (superadmin) exists
    const ehabIdx = users.findIndex(u => u.email.toLowerCase() === 'ehababdelkreem012@yahoo.com');
    if (ehabIdx === -1) {
      users.unshift(INITIAL_USERS[0]);
      setItem(STORAGE_KEYS.USERS, users);
    } else {
      let modified = false;
      if (users[ehabIdx].password !== '01282407472ehab') {
        users[ehabIdx].password = '01282407472ehab';
        modified = true;
      }
      if (users[ehabIdx].role !== 'superadmin') {
        users[ehabIdx].role = 'superadmin';
        modified = true;
      }
      if (users[ehabIdx].roleTitle !== 'المدير العام ورئيس التحرير') {
        users[ehabIdx].roleTitle = 'المدير العام ورئيس التحرير';
        modified = true;
      }
      if (users[ehabIdx].name !== 'م. إيهاب عبد الكريم') {
        users[ehabIdx].name = 'م. إيهاب عبد الكريم';
        modified = true;
      }
      if (modified) {
        setItem(STORAGE_KEYS.USERS, users);
        const cur = getItem<User | null>(STORAGE_KEYS.CURRENT_USER, null);
        if (cur && cur.email.toLowerCase() === 'ehababdelkreem012@yahoo.com') {
          setItem(STORAGE_KEYS.CURRENT_USER, users[ehabIdx]);
        }
      }
    }

    // Ensure Magdy Mohamed Abou Zaid (مدير التحرير التنفيذي) exists
    const magdyIdx = users.findIndex(u =>
      u.id === 'usr-magdy-editor' ||
      u.email.toLowerCase() === 'magdy@almasry-news.eg' ||
      u.name.includes('مجدي محمد')
    );
    if (magdyIdx === -1) {
      const magdySeed = INITIAL_USERS.find(u => u.id === 'usr-magdy-editor') || {
        id: 'usr-magdy-editor',
        name: 'مجدي محمد أبو زيد',
        email: 'magdy@almasry-news.eg',
        password: 'magdy',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
        role: 'editor' as const,
        roleTitle: 'مدير التحرير التنفيذي',
        department: 'هيئة التحرير وإدارة الأخبار',
        phone: '+20 100 123 4567',
        bio: 'مدير التحرير التنفيذي للمنصة، مسؤول عن غرف الأخبار وصياغة التغطيات والتحقيقات الصحفية واعتماد النشر.',
        bookmarks: ['art-2'],
        notes: 'حساب مدير التحرير التنفيذي المعتمد للنظام مع صلاحيات إدارة المحتوى',
        createdAt: '2026-01-15T00:00:00Z',
        lastLogin: '2026-09-03T10:00:00Z',
        isActive: true
      };
      users.splice(1, 0, magdySeed);
      setItem(STORAGE_KEYS.USERS, users);
    } else {
      let mod = false;
      if (users[magdyIdx].name !== 'مجدي محمد أبو زيد') {
        users[magdyIdx].name = 'مجدي محمد أبو زيد';
        mod = true;
      }
      if (users[magdyIdx].roleTitle !== 'مدير التحرير التنفيذي') {
        users[magdyIdx].roleTitle = 'مدير التحرير التنفيذي';
        mod = true;
      }
      if (!users[magdyIdx].password) {
        users[magdyIdx].password = 'magdy';
        mod = true;
      }
      if (mod) {
        setItem(STORAGE_KEYS.USERS, users);
        const cur = getItem<User | null>(STORAGE_KEYS.CURRENT_USER, null);
        if (cur && (cur.email.toLowerCase() === 'magdy@almasry-news.eg' || cur.id === 'usr-magdy-editor')) {
          setItem(STORAGE_KEYS.CURRENT_USER, users[magdyIdx]);
        }
      }
    }

    return users;
  }

  getCurrentUser(): User | null {
    const user = getItem<User | null>(STORAGE_KEYS.CURRENT_USER, null);
    if (user && user.email.toLowerCase() === 'admin@almasry-news.eg') {
      // Migrate old demo admin session to Ehab Abdelkreem
      const ehab = this.getUsers().find(u => u.email.toLowerCase() === 'ehababdelkreem012@yahoo.com');
      if (ehab) {
        setItem(STORAGE_KEYS.CURRENT_USER, ehab);
        return ehab;
      }
    }
    return user;
  }

  setCurrentUser(user: User | null): void {
    setItem(STORAGE_KEYS.CURRENT_USER, user);
    this.notifyChange('auth');
  }

  logout(): void {
    setItem(STORAGE_KEYS.CURRENT_USER, null);
    this.notifyChange('auth');
  }

  updateUser(user: User): void {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx >= 0) {
      users[idx] = user;
      setItem(STORAGE_KEYS.USERS, users);
    }
    const current = this.getCurrentUser();
    if (current && current.id === user.id) {
      setItem(STORAGE_KEYS.CURRENT_USER, user);
    }
    this.notifyChange('users');
  }

  createUser(userData: Partial<User>): User {
    const users = this.getUsers();
    const newUser: User = {
      id: userData.id || `usr-${Date.now()}`,
      name: userData.name || 'مستخدم جديد',
      email: userData.email || `user${Date.now()}@almasry-news.eg`,
      password: userData.password,
      avatar: userData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      role: userData.role || 'user',
      roleTitle: userData.roleTitle || '',
      department: userData.department || '',
      phone: userData.phone || '',
      bio: userData.bio || '',
      notes: userData.notes || '',
      bookmarks: userData.bookmarks || [],
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      isActive: userData.isActive !== undefined ? userData.isActive : true
    };
    users.push(newUser);
    setItem(STORAGE_KEYS.USERS, users);
    this.notifyChange('users');
    return newUser;
  }

  deleteUser(id: string): void {
    let users = this.getUsers();
    users = users.filter(u => u.id !== id);
    setItem(STORAGE_KEYS.USERS, users);
    this.notifyChange('users');
  }

  toggleUserStatus(id: string): boolean {
    const users = this.getUsers();
    const user = users.find(u => u.id === id);
    if (user) {
      user.isActive = !user.isActive;
      setItem(STORAGE_KEYS.USERS, users);
      const current = this.getCurrentUser();
      if (current && current.id === id) {
        setItem(STORAGE_KEYS.CURRENT_USER, user);
      }
      this.notifyChange('users');
      return user.isActive;
    }
    return false;
  }

  login(email: string, password?: string): User | null {
    const users = this.getUsers();
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    // 1. Specific check for Ehab Abdelkreem (المدير العام ورئيس التحرير)
    if (
      cleanEmail === 'ehababdelkreem012@yahoo.com' ||
      cleanEmail === 'ehab' ||
      cleanEmail === '01282407472' ||
      cleanEmail.includes('ehab')
    ) {
      if (cleanPassword === '01282407472ehab' || cleanPassword === 'ehab' || cleanPassword === '01282407472') {
        const adminUser = users.find(u => u.email.toLowerCase() === 'ehababdelkreem012@yahoo.com') || INITIAL_USERS[0];
        this.setCurrentUser(adminUser);
        return adminUser;
      }
      return null;
    }

    // 2. Specific check for Magdy Mohamed Abou Zaid (مدير التحرير التنفيذي)
    if (
      cleanEmail === 'magdy@almasry-news.eg' ||
      cleanEmail === 'magdy' ||
      cleanEmail === 'magdy@yahoo.com' ||
      cleanEmail === 'magdy@gmail.com' ||
      cleanEmail.includes('magdy') ||
      cleanEmail.includes('مجدي')
    ) {
      if (cleanPassword === 'magdy' || cleanPassword === '123456' || cleanPassword === 'magdy123' || cleanPassword === '01282407472') {
        const magdyUser = users.find(u => u.name.includes('مجدي محمد') || u.email.toLowerCase() === 'magdy@almasry-news.eg') || {
          id: 'usr-magdy-editor',
          name: 'مجدي محمد أبو زيد',
          email: 'magdy@almasry-news.eg',
          password: 'magdy',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
          role: 'editor' as const,
          roleTitle: 'مدير التحرير التنفيذي',
          department: 'هيئة التحرير وإدارة الأخبار',
          phone: '+20 100 123 4567',
          bio: 'مدير التحرير التنفيذي للمنصة، مسؤول عن غرف الأخبار وصياغة التغطيات والتحقيقات الصحفية واعتماد النشر.',
          bookmarks: ['art-2'],
          notes: 'حساب مدير التحرير التنفيذي المعتمد للنظام مع صلاحيات إدارة المحتوى',
          createdAt: '2026-01-15T00:00:00Z',
          lastLogin: '2026-09-03T10:00:00Z',
          isActive: true
        };
        this.setCurrentUser(magdyUser);
        return magdyUser;
      }
      return null;
    }

    const found = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (found) {
      if (found.password && found.password !== cleanPassword) {
        return null;
      }
      this.setCurrentUser(found);
      return found;
    }
    return null;
  }

  register(email: string, name: string, password?: string): User {
    const users = this.getUsers();
    const cleanEmail = (email || '').trim().toLowerCase();
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: name || 'قارئ جديد',
      email: cleanEmail,
      password: password ? password.trim() : undefined,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80`,
      role: 'user',
      bookmarks: [],
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      isActive: true
    };
    users.push(newUser);
    setItem(STORAGE_KEYS.USERS, users);
    this.setCurrentUser(newUser);
    return newUser;
  }

  resetToDefaults(): void {
    try {
      const activeUser = this.getCurrentUser();
      localStorage.clear();
      setItem(STORAGE_KEYS.ARTICLES, INITIAL_ARTICLES);
      setItem(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
      setItem(STORAGE_KEYS.AUTHORS, INITIAL_AUTHORS);
      setItem(STORAGE_KEYS.BREAKING_NEWS, INITIAL_BREAKING_NEWS);
      setItem(STORAGE_KEYS.LIVE_UPDATES, INITIAL_LIVE_UPDATES);
      setItem(STORAGE_KEYS.ADS, INITIAL_ADS);
      setItem(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
      setItem(STORAGE_KEYS.USERS, INITIAL_USERS);
      setItem(STORAGE_KEYS.PHOTO_ALBUMS, INITIAL_PHOTO_ALBUMS);
      setItem(STORAGE_KEYS.VIDEOS, INITIAL_VIDEOS);

      // Keep current user session if staff or reset to Ehab Abdelkreem (superadmin)
      if (activeUser && activeUser.email) {
        const found = INITIAL_USERS.find(u => u.email.toLowerCase() === activeUser.email.toLowerCase());
        this.setCurrentUser(found || INITIAL_USERS[0]);
      } else {
        this.setCurrentUser(INITIAL_USERS[0]);
      }

      this.notifyChange('reset');
      this.notifyChange('articles');
      this.notifyChange('categories');
      this.notifyChange('breaking');
      this.notifyChange('settings');
      this.notifyChange('auth');
    } catch (e) {
      console.error('Failed resetting storage:', e);
    }
  }


  // Ads
  getAds(): Advertisement[] {
    const ads = getItem<Advertisement[]>(STORAGE_KEYS.ADS, []);
    if (!ads || ads.length === 0) {
      setItem(STORAGE_KEYS.ADS, INITIAL_ADS);
      return INITIAL_ADS;
    }
    return ads;
  }

  saveAd(ad: Advertisement): void {
    const ads = this.getAds();
    const idx = ads.findIndex(a => a.id === ad.id);
    if (idx >= 0) {
      ads[idx] = ad;
    } else {
      ads.unshift({ ...ad, id: `ad-${Date.now()}`, impressions: 0, clicks: 0 });
    }
    setItem(STORAGE_KEYS.ADS, ads);
    this.notifyChange('ads');
  }

  recordAdImpression(id: string): void {
    const ads = this.getAds();
    const ad = ads.find(a => a.id === id);
    if (ad) {
      ad.impressions = (ad.impressions || 0) + 1;
      setItem(STORAGE_KEYS.ADS, ads);
    }
  }

  recordAdClick(id: string): void {
    const ads = this.getAds();
    const ad = ads.find(a => a.id === id);
    if (ad) {
      ad.clicks = (ad.clicks || 0) + 1;
      setItem(STORAGE_KEYS.ADS, ads);
    }
  }

  // Photo Albums & Videos
  getPhotoAlbums(): PhotoAlbum[] {
    const albums = getItem<PhotoAlbum[]>(STORAGE_KEYS.PHOTO_ALBUMS, []);
    if (!albums || albums.length === 0) {
      setItem(STORAGE_KEYS.PHOTO_ALBUMS, INITIAL_PHOTO_ALBUMS);
      return INITIAL_PHOTO_ALBUMS;
    }
    return albums;
  }

  getVideos(): VideoStory[] {
    const vids = getItem<VideoStory[]>(STORAGE_KEYS.VIDEOS, []);
    if (
      !vids ||
      vids.length === 0 ||
      vids.some(
        v =>
          v.videoUrl.includes('dQw4w9WgXcQ') ||
          v.videoUrl.includes('flower.mp4') ||
          v.videoUrl.includes('friday.mp4') ||
          v.videoUrl.includes('BigBuckBunny') ||
          v.videoUrl.includes('ElephantsDream') ||
          v.videoUrl.includes('sintel') ||
          v.videoUrl.includes('oceans.mp4')
      ) ||
      vids.length < INITIAL_VIDEOS.length
    ) {
      setItem(STORAGE_KEYS.VIDEOS, INITIAL_VIDEOS);
      return INITIAL_VIDEOS;
    }
    return vids;
  }

  // Newsletter
  getSubscribers(): NewsletterSubscriber[] {
    return getItem<NewsletterSubscriber[]>(STORAGE_KEYS.SUBSCRIBERS, [
      { id: 'sub-1', email: 'reader1@example.com', subscribedAt: '2026-08-01T10:00:00Z', categories: ['مصر', 'اقتصاد'], status: 'active' },
      { id: 'sub-2', email: 'investor@example.com', subscribedAt: '2026-08-15T14:30:00Z', categories: ['اقتصاد', 'خدمات'], status: 'active' }
    ]);
  }

  subscribeNewsletter(email: string, categories: string[] = []): boolean {
    const subs = this.getSubscribers();
    if (subs.some(s => s.email.toLowerCase() === email.toLowerCase())) {
      return false; // already subscribed
    }
    subs.unshift({
      id: `sub-${Date.now()}`,
      email,
      subscribedAt: new Date().toISOString(),
      categories: categories.length > 0 ? categories : ['الرئيسية', 'مصر', 'اقتصاد'],
      status: 'active'
    });
    setItem(STORAGE_KEYS.SUBSCRIBERS, subs);
    this.notifyChange('subscribers');
    return true;
  }

  // Settings
  getSettings(): PlatformSettings {
    const settings = getItem<PlatformSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
    if (!settings.logoImageUrl) {
      settings.logoImageUrl = '/logo.jpg';
      setItem(STORAGE_KEYS.SETTINGS, settings);
    }
    return settings;
  }

  updateSettings(settings: PlatformSettings): void {
    setItem(STORAGE_KEYS.SETTINGS, settings);
    this.notifyChange('settings');
  }

  // Recent searches
  getRecentSearches(): string[] {
    return getItem<string[]>(STORAGE_KEYS.RECENT_SEARCHES, ['الأهلي وصن داونز', 'سعر الذهب اليوم', 'الرخصة الذهبية', 'العاصمة الإدارية', 'تنسيق الجامعات']);
  }

  addRecentSearch(term: string): void {
    if (!term || term.trim().length === 0) return;
    const searches = this.getRecentSearches().filter(s => s.toLowerCase() !== term.toLowerCase());
    searches.unshift(term.trim());
    setItem(STORAGE_KEYS.RECENT_SEARCHES, searches.slice(0, 10));
  }

  // Notifications
  getNotifications(): PlatformNotification[] {
    return getItem<PlatformNotification[]>(STORAGE_KEYS.NOTIFICATIONS, [
      {
        id: 'notif-1',
        title: 'خبر عاجل: ارتفاع الاحتياطي النقدي الأجنبي',
        message: 'سجل البنك المركزي صافي احتياطيات قياسية بلغت 49.8 مليار دولار.',
        time: 'منذ ساعة',
        read: false,
        type: 'breaking',
        link: 'art-2'
      },
      {
        id: 'notif-2',
        title: 'تأهل النادي الأهلي لنصف النهائي الإفريقي',
        message: 'فاز الأهلي بثلاثية في استاد القاهرة وصعد للمربع الذهبي.',
        time: 'منذ ساعتين',
        read: true,
        type: 'article',
        link: 'art-3'
      }
    ]);
  }

  markAllNotificationsRead(): void {
    const notifs = this.getNotifications().map(n => ({ ...n, read: true }));
    setItem(STORAGE_KEYS.NOTIFICATIONS, notifs);
    this.notifyChange('notifications');
  }

  // Analytics Helpers
  recordView(category: string): void {
    const analytics = getItem<Record<string, number>>(STORAGE_KEYS.ANALYTICS_VIEWS, {
      totalViews: 458900,
      todayViews: 24500,
      egypt: 125000,
      economy: 98000,
      sports: 142000,
      politics: 45000,
      tech: 32000,
      investigations: 16900
    });
    analytics['totalViews'] = (analytics['totalViews'] || 0) + 1;
    analytics['todayViews'] = (analytics['todayViews'] || 0) + 1;
    if (category) {
      analytics[category] = (analytics[category] || 0) + 1;
    }
    setItem(STORAGE_KEYS.ANALYTICS_VIEWS, analytics);
  }

  getAnalytics() {
    return getItem(STORAGE_KEYS.ANALYTICS_VIEWS, {
      totalViews: 458900,
      todayViews: 24500,
      egypt: 125000,
      economy: 98000,
      sports: 142000,
      politics: 45000,
      tech: 32000,
      investigations: 16900
    });
  }

  // Event bus for reactive local changes
  private listeners: ((event: string) => void)[] = [];
  subscribe(fn: (event: string) => void): () => void {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  }

  private notifyChange(event: string): void {
    this.listeners.forEach(fn => {
      try {
        fn(event);
      } catch (e) {
        console.error(e);
      }
    });
  }
}

export const storageService = new StorageService();
