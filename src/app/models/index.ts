export type ArticleStatus = 'published' | 'draft' | 'scheduled' | 'archived' | 'pending_review' | 'rejected';

export type UserRole = 'superadmin' | 'admin' | 'editor' | 'journalist' | 'photographer' | 'video_editor' | 'moderator' | 'client' | 'subscriber' | 'user';

export type FactVerdict = 'true' | 'false' | 'misleading' | 'partially_true' | 'unproven';

export type AdPlacement = 'header' | 'sidebar' | 'article_top' | 'article_middle' | 'article_bottom' | 'footer' | 'popup' | 'native_feed';

export interface Author {
  id: string;
  name: string;
  slug: string;
  avatar: string;
  role: string;
  bio: string;
  email: string;
  social: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
  };
  articlesCount: number;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  description: string;
  iconName: string;
  color: string;
  subCategories: string[];
  order: number;
}

export interface FactCheckData {
  claim: string;
  claimant: string;
  verdict: FactVerdict;
  verdictLabel: string;
  truth: string;
  evidence: string[];
  sourceUrl?: string;
  sources?: { name: string; url?: string }[];
  dateChecked: string;
}

export type ReactionType = 'like' | 'love' | 'clap' | 'insightful' | 'sad';

export interface ArticleReactions {
  like: number;
  love: number;
  clap: number;
  insightful: number;
  sad: number;
}

export interface Article {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  excerpt: string;
  content: string;
  categoryId: string;
  categoryName: string;
  categorySlug?: string;
  subCategory?: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorRole: string;
  featuredImage: string;
  imageCaption?: string;
  gallery?: { url: string; caption: string }[];
  videoUrl?: string;
  videoTitle?: string;
  videoDuration?: string;
  videoType?: 'youtube' | 'mp4' | 'embed' | 'file';
  tags: string[];
  views: number;
  readingTimeMinutes: number;
  isBreaking: boolean;
  isFeatured: boolean;
  isEditorChoice: boolean;
  isSpecialReport?: boolean;
  isFactCheck?: boolean;
  factCheckData?: FactCheckData;
  governorate?: string;
  publishedAt: string;
  updatedAt: string;
  status: ArticleStatus;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  reactions?: ArticleReactions;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

export interface BreakingNewsItem {
  id: string;
  title: string;
  url?: string;
  articleId?: string;
  priority: 'urgent' | 'high' | 'normal';
  active: boolean;
  category: string;
  createdAt: string;
  expiresAt: string;
}

export interface LiveUpdate {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  category: string;
  isBreaking: boolean;
  author: string;
  source?: string;
}

export interface CommentReply {
  id: string;
  commentId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
  likes: number;
  isApproved: boolean;
}

export interface Comment {
  id: string;
  articleId: string;
  authorName: string;
  authorEmail?: string;
  authorAvatar?: string;
  content: string;
  createdAt: string;
  likes?: number;
  likesCount?: number;
  status: 'approved' | 'pending' | 'rejected' | 'spam';
  replies?: CommentReply[];
  isPinned?: boolean;
}

export interface Governorate {
  id: string;
  name: string;
  slug: string;
  capital: string;
  region: 'القاهرة الكبرى' | 'وجه بحري' | 'القناة وسيناء' | 'شمال الصعيد' | 'وسط وجنوب الصعيد' | 'الحدود';
  population: string;
  newsCount: number;
}

export interface GoldPriceItem {
  karat: string;
  buyPrice: number;
  sellPrice: number;
  change: number; // percentage or diff
}

export interface CurrencyRateItem {
  currency: string;
  code: string;
  flag: string;
  buyPrice: number;
  sellPrice: number;
  change: number;
}

export interface WeatherItem {
  city: string;
  temp: number;
  condition: string;
  conditionIcon: string;
  humidity: number;
  windSpeed: number;
}

export interface PrayerTimeItem {
  city: string;
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

export interface MatchItem {
  id: string;
  league: string;
  homeTeam: string;
  homeLogo: string;
  awayTeam: string;
  awayLogo: string;
  homeScore?: number;
  awayScore?: number;
  status: 'upcoming' | 'live' | 'finished';
  timeOrMinute: string;
  date: string;
  stadium: string;
}

export interface LeagueStandingItem {
  rank: number;
  team: string;
  logo: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  points: number;
}

export interface Advertisement {
  id: string;
  title: string;
  advertiser: string;
  placement: AdPlacement;
  imageUrl: string;
  targetUrl: string;
  startDate: string;
  endDate: string;
  impressions: number;
  clicks: number;
  status: 'active' | 'paused' | 'ended';
}

export type AdUnit = Advertisement;


export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  categories: string[];
  status: 'active' | 'unsubscribed';
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  avatar: string;
  role: UserRole;
  roleTitle?: string;
  department?: string;
  notes?: string;
  phone?: string;
  bio?: string;
  bookmarks: string[]; // Article IDs
  createdAt: string;
  lastLogin: string;
  isActive: boolean;
}

export interface PlatformNotification {
  id: string;
  userId?: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'breaking' | 'article' | 'reply' | 'system';
  link?: string;
}

export interface PlatformSettings {
  siteName: string;
  tagline: string;
  description: string;
  logoText: string;
  logoImageUrl?: string;
  brandSubtitle?: string;
  primaryColor: string;
  accentColor: string;
  headerStyle: 'dark' | 'light' | 'primary';
  newsCardLayout: 'grid' | 'magazine' | 'compact';
  newsFontSize: 'sm' | 'md' | 'lg';
  showAuthorBio: boolean;
  showArticleViews: boolean;
  showReadingTime: boolean;
  showThumbnailInLists: boolean;
  breakingNewsEnabled: boolean;
  breakingNewsSpeed: number;
  breakingNewsAnimation?: 'scroll' | 'fade' | 'pulse';
  enableLiveFeed: boolean;
  enableComments: boolean;
  moderationRequired: boolean;
  allowGuestComments: boolean;
  darkModeDefault: boolean;
  contactEmail: string;
  phone: string;
  address: string;
  socialLinks: {
    facebook: string;
    twitter: string;
    instagram: string;
    youtube: string;
    telegram: string;
    whatsapp: string;
    tiktok: string;
  };
  analytics: {
    googleAnalyticsId: string;
    facebookPixelId: string;
  };
}

export interface PhotoAlbum {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  photographer: string;
  photosCount: number;
  views: number;
  publishedAt: string;
  photos: {
    url: string;
    caption: string;
  }[];
}

export interface VideoStory {
  id: string;
  title: string;
  slug: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  duration: string;
  views: number;
  publishedAt: string;
  category: string;
  author: string;
}

export interface RecentlyViewedEntry {
  articleId: string;
  viewedAt: string;
}

