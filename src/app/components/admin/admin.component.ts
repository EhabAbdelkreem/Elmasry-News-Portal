import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { storageService } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';
import {
  Article,
  Category,
  BreakingNewsItem,
  Comment,
  User,
  UserRole,
  PlatformSettings,
  FactVerdict
} from '../../models';
import { INITIAL_CATEGORIES, INITIAL_AUTHORS } from '../../data/seed-data';
import { SafePipe } from '../../pipes/safe.pipe';
import { parseVideoUrl, ParsedVideo } from '../../services/video.helper';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SafePipe],
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);

  // Active navigation tab
  activeTab: 'articles' | 'newArticle' | 'users' | 'theme' | 'display' | 'analytics' = 'articles';

  // Data collections
  articles: Article[] = [];
  categories: Category[] = [];
  authors = INITIAL_AUTHORS;
  users: User[] = [];
  breakingItems: BreakingNewsItem[] = [];
  comments: Comment[] = [];
  settings!: PlatformSettings;
  analyticsData: any = {};

  // Notification Toast
  toastMessage: string | null = null;
  toastType: 'success' | 'info' | 'error' = 'success';

  // Articles Filtering & Search
  articleSearch = '';
  selectedCategoryFilter = 'all';
  selectedStatusFilter = 'all';
  articlesViewMode: 'rows' | 'table' = 'rows';

  // Users Filtering & Search
  userSearch = '';
  selectedRoleFilter = 'all';
  selectedUserStatusFilter = 'all';

  // Article Form State (Add / Edit)
  editingArticleId: string | null = null;
  articleForm = {
    title: '',
    subtitle: '',
    categoryId: 'egypt',
    subCategory: '',
    authorId: INITIAL_AUTHORS[0]?.id || 'author-ehab',
    governorate: 'القاهرة',
    featuredImage: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1000&auto=format&fit=crop&q=80',
    imageCaption: '',
    videoUrl: '',
    videoTitle: '',
    excerpt: '',
    content: '',
    tagsString: 'مصر, أخبار, عاجل',
    isBreaking: false,
    isFeatured: false,
    isEditorChoice: false,
    isFactCheck: false,
    status: 'published' as 'published' | 'draft' | 'archived',
    factClaim: '',
    factTruth: '',
    factVerdict: 'false' as FactVerdict
  };

  // User Modal State (Add / Edit)
  showUserModal = false;
  editingUserId: string | null = null;
  userForm = {
    name: '',
    email: '',
    password: '',
    role: 'editor' as UserRole,
    roleTitle: 'محرر صحفي',
    department: 'هيئة التحرير والأخبار',
    phone: '',
    bio: '',
    notes: '',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
    isActive: true
  };

  // Quick breaking news input
  quickBreakingTitle = '';

  // Theme presets
  presetColors = [
    { name: 'الأحمر الصحفي (الافتراضي)', value: '#dc2626', bg: 'bg-red-600' },
    { name: 'الأزرق النيلي الملكي', value: '#2563eb', bg: 'bg-blue-600' },
    { name: 'الأخضر الزمردي', value: '#059669', bg: 'bg-emerald-600' },
    { name: 'العنبري الدافئ', value: '#d97706', bg: 'bg-amber-600' },
    { name: 'البنفسجي الفاخر', value: '#7c3aed', bg: 'bg-purple-600' },
    { name: 'الأسود الفحمي العصري', value: '#18181b', bg: 'bg-stone-900' }
  ];

  ngOnInit() {
    this.refreshAllData();
  }

  refreshAllData() {
    this.articles = storageService.getArticles();
    this.categories = storageService.getCategories();
    this.users = storageService.getUsers();
    this.breakingItems = storageService.getAllBreakingNews();
    this.comments = storageService.getComments();
    this.settings = storageService.getSettings();
    this.analyticsData = storageService.getAnalytics();
  }

  showToast(msg: string, type: 'success' | 'info' | 'error' = 'success') {
    this.toastMessage = msg;
    this.toastType = type;
    setTimeout(() => {
      this.toastMessage = null;
    }, 3500);
  }

  // ==========================================
  // ARTICLES MANAGEMENT
  // ==========================================
  get filteredArticles(): Article[] {
    return this.articles.filter(art => {
      const matchSearch = !this.articleSearch.trim() ||
        art.title.toLowerCase().includes(this.articleSearch.toLowerCase()) ||
        art.excerpt.toLowerCase().includes(this.articleSearch.toLowerCase()) ||
        (art.tags && art.tags.some(t => t.toLowerCase().includes(this.articleSearch.toLowerCase())));

      const matchCat = this.selectedCategoryFilter === 'all' ||
        art.categoryId === this.selectedCategoryFilter ||
        art.categorySlug === this.selectedCategoryFilter;

      let matchStatus = true;
      if (this.selectedStatusFilter === 'published') matchStatus = art.status === 'published';
      else if (this.selectedStatusFilter === 'draft') matchStatus = art.status === 'draft';
      else if (this.selectedStatusFilter === 'breaking') matchStatus = !!art.isBreaking;
      else if (this.selectedStatusFilter === 'featured') matchStatus = !!art.isFeatured;
      else if (this.selectedStatusFilter === 'factcheck') matchStatus = !!art.isFactCheck;

      return matchSearch && matchCat && matchStatus;
    });
  }

  openNewArticleTab() {
    this.editingArticleId = null;
    this.articleForm = {
      title: '',
      subtitle: '',
      categoryId: 'egypt',
      subCategory: '',
      authorId: INITIAL_AUTHORS[0]?.id || 'author-ehab',
      governorate: 'القاهرة',
      featuredImage: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1000&auto=format&fit=crop&q=80',
      imageCaption: '',
      videoUrl: '',
      videoTitle: '',
      excerpt: '',
      content: '',
      tagsString: 'مصر, أخبار, عاجل',
      isBreaking: false,
      isFeatured: false,
      isEditorChoice: false,
      isFactCheck: false,
      status: 'published',
      factClaim: '',
      factTruth: '',
      factVerdict: 'false'
    };
    this.activeTab = 'newArticle';
  }

  editArticle(art: Article) {
    this.editingArticleId = art.id;
    this.articleForm = {
      title: art.title,
      subtitle: art.subtitle || '',
      categoryId: art.categoryId,
      subCategory: art.subCategory || '',
      authorId: art.authorId,
      governorate: art.governorate || 'القاهرة',
      featuredImage: art.featuredImage,
      imageCaption: art.imageCaption || '',
      videoUrl: art.videoUrl || '',
      videoTitle: art.videoTitle || '',
      excerpt: art.excerpt,
      content: art.content,
      tagsString: (art.tags || []).join(', '),
      isBreaking: !!art.isBreaking,
      isFeatured: !!art.isFeatured,
      isEditorChoice: !!art.isEditorChoice,
      isFactCheck: !!art.isFactCheck,
      status: (art.status as any) || 'published',
      factClaim: art.factCheckData?.claim || '',
      factTruth: art.factCheckData?.truth || '',
      factVerdict: art.factCheckData?.verdict || 'false'
    };
    this.activeTab = 'newArticle';
  }

  saveArticleForm(e?: Event) {
    if (e) e.preventDefault();
    if (!this.articleForm.title.trim() || !this.articleForm.content.trim()) {
      this.showToast('يرجى ملء عنوان المقال ومحتواه أولاً', 'error');
      return;
    }

    const cat = this.categories.find(c => c.id === this.articleForm.categoryId || c.slug === this.articleForm.categoryId);
    const author = this.authors.find(a => a.id === this.articleForm.authorId) || INITIAL_AUTHORS[0];
    const tags = this.articleForm.tagsString.split(',').map(t => t.trim()).filter(Boolean);

    if (this.editingArticleId) {
      // Update existing article
      const existing = storageService.getArticleById(this.editingArticleId);
      const updated: Article = {
        ...(existing || {}),
        id: this.editingArticleId,
        title: this.articleForm.title.trim(),
        subtitle: this.articleForm.subtitle.trim(),
        slug: existing?.slug || `art-${Date.now()}`,
        excerpt: this.articleForm.excerpt.trim() || this.articleForm.content.slice(0, 150),
        content: this.articleForm.content.trim(),
        categoryId: this.articleForm.categoryId,
        categoryName: cat?.name || 'أخبار',
        categorySlug: cat?.slug || 'news',
        subCategory: this.articleForm.subCategory,
        authorId: author.id,
        authorName: author.name,
        authorAvatar: author.avatar,
        authorRole: author.role,
        featuredImage: this.articleForm.featuredImage.trim(),
        imageCaption: this.articleForm.imageCaption.trim(),
        videoUrl: this.articleForm.videoUrl.trim() || undefined,
        videoTitle: this.articleForm.videoTitle.trim() || undefined,
        governorate: this.articleForm.governorate,
        isBreaking: this.articleForm.isBreaking,
        isFeatured: this.articleForm.isFeatured,
        isEditorChoice: this.articleForm.isEditorChoice,
        isFactCheck: this.articleForm.isFactCheck,
        factCheckData: this.articleForm.isFactCheck ? {
          claim: this.articleForm.factClaim.trim() || this.articleForm.title,
          claimant: 'منشورات متداولة على وسائل التواصل',
          verdict: this.articleForm.factVerdict,
          verdictLabel: this.articleForm.factVerdict === 'true' ? 'صحيح' : this.articleForm.factVerdict === 'false' ? 'غير صحيح' : 'مضلل',
          truth: this.articleForm.factTruth.trim() || this.articleForm.excerpt,
          evidence: ['مصادر رسمية وجهات حكومية معتمدة'],
          dateChecked: new Date().toISOString()
        } : undefined,
        status: this.articleForm.status,
        tags: tags.length ? tags : ['مصر', 'أخبار'],
        updatedAt: new Date().toISOString(),
        publishedAt: existing?.publishedAt || new Date().toISOString(),
        views: existing?.views || 100,
        likesCount: existing?.likesCount || 10,
        commentsCount: existing?.commentsCount || 0,
        sharesCount: existing?.sharesCount || 2,
        readingTimeMinutes: Math.max(1, Math.ceil(this.articleForm.content.split(' ').length / 200)),
        seo: {
          metaTitle: this.articleForm.title.trim(),
          metaDescription: this.articleForm.subtitle.trim() || this.articleForm.excerpt.trim(),
          keywords: tags
        }
      };

      storageService.saveArticle(updated);
      this.showToast('تم تحديث المقال بنجاح!');
    } else {
      // Create new article
      const newArticle: Article = {
        id: `art-${Date.now()}`,
        title: this.articleForm.title.trim(),
        subtitle: this.articleForm.subtitle.trim(),
        slug: `art-${Date.now()}`,
        excerpt: this.articleForm.excerpt.trim() || this.articleForm.content.slice(0, 150),
        content: this.articleForm.content.trim(),
        categoryId: this.articleForm.categoryId,
        categoryName: cat?.name || 'أخبار',
        categorySlug: cat?.slug || 'news',
        subCategory: this.articleForm.subCategory,
        authorId: author.id,
        authorName: author.name,
        authorAvatar: author.avatar,
        authorRole: author.role,
        featuredImage: this.articleForm.featuredImage.trim(),
        imageCaption: this.articleForm.imageCaption.trim(),
        videoUrl: this.articleForm.videoUrl.trim() || undefined,
        videoTitle: this.articleForm.videoTitle.trim() || undefined,
        governorate: this.articleForm.governorate,
        isBreaking: this.articleForm.isBreaking,
        isFeatured: this.articleForm.isFeatured,
        isEditorChoice: this.articleForm.isEditorChoice,
        isFactCheck: this.articleForm.isFactCheck,
        factCheckData: this.articleForm.isFactCheck ? {
          claim: this.articleForm.factClaim.trim() || this.articleForm.title,
          claimant: 'منشورات متداولة على وسائل التواصل',
          verdict: this.articleForm.factVerdict,
          verdictLabel: this.articleForm.factVerdict === 'true' ? 'صحيح' : this.articleForm.factVerdict === 'false' ? 'غير صحيح' : 'مضلل',
          truth: this.articleForm.factTruth.trim() || this.articleForm.excerpt,
          evidence: ['مصادر رسمية معتمدة'],
          dateChecked: new Date().toISOString()
        } : undefined,
        status: this.articleForm.status,
        tags: tags.length ? tags : ['مصر', 'أخبار'],
        publishedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        views: 45,
        likesCount: 5,
        commentsCount: 0,
        sharesCount: 1,
        readingTimeMinutes: Math.max(1, Math.ceil(this.articleForm.content.split(' ').length / 200)),
        seo: {
          metaTitle: this.articleForm.title.trim(),
          metaDescription: this.articleForm.subtitle.trim() || this.articleForm.excerpt.trim(),
          keywords: tags
        }
      };

      storageService.saveArticle(newArticle);

      // If breaking, also add to breaking news ticker
      if (this.articleForm.isBreaking) {
        storageService.addBreakingNews({
          id: `brk-${Date.now()}`,
          title: newArticle.title,
          createdAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 86400000).toISOString(),
          active: true,
          category: 'عاجل',
          priority: 'urgent',
          articleId: newArticle.id
        });
      }

      this.showToast('تم نشر الخبر الجديد بنجاح!');
    }

    this.refreshAllData();
    this.activeTab = 'articles';
  }

  deleteArticle(id: string, title: string) {
    if (confirm(`هل أنت متأكد من رغبتك في حذف المقال: "${title}"؟`)) {
      storageService.deleteArticle(id);
      this.showToast('تم حذف المقال بنجاح');
      this.refreshAllData();
    }
  }

  toggleBreaking(art: Article) {
    art.isBreaking = !art.isBreaking;
    storageService.saveArticle(art);
    if (art.isBreaking) {
      storageService.addBreakingNews({
        id: `brk-${Date.now()}`,
        title: art.title,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 86400000).toISOString(),
        active: true,
        category: 'عاجل',
        priority: 'urgent',
        articleId: art.id
      });
      this.showToast(`تمت إضافة "${art.title}" إلى شريط الأخبار العاجلة`);
    } else {
      this.showToast('تم إلغاء تمييز الخبر كعاجل');
    }
    this.refreshAllData();
  }

  toggleFeatured(art: Article) {
    art.isFeatured = !art.isFeatured;
    storageService.saveArticle(art);
    this.showToast(art.isFeatured ? 'تم تمييز المقال في الصفحة الرئيسية' : 'تم إلغاء التمييز الرئيسي');
    this.refreshAllData();
  }

  // Quick breaking news
  addQuickBreakingNews(e: Event) {
    e.preventDefault();
    if (!this.quickBreakingTitle.trim()) return;

    storageService.addBreakingNews({
      id: `brk-${Date.now()}`,
      title: this.quickBreakingTitle.trim(),
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 86400000).toISOString(),
      active: true,
      category: 'عاجل',
      priority: 'urgent'
    });

    this.quickBreakingTitle = '';
    this.showToast('تمت إضافة الخبر العاجل للشريط فوراً');
    this.refreshAllData();
  }

  deleteBreaking(id: string) {
    storageService.deleteBreakingNews(id);
    this.showToast('تم حذف الخبر العاجل');
    this.refreshAllData();
  }

  // ==========================================
  // USERS MANAGEMENT
  // ==========================================
  get isClientRole(): boolean {
    return this.userForm.role === 'client';
  }

  get parsedArticleVideo(): ParsedVideo | null {
    return this.articleForm.videoUrl ? parseVideoUrl(this.articleForm.videoUrl) : null;
  }

  get filteredUsers(): User[] {
    return this.users.filter(u => {
      const matchSearch = !this.userSearch.trim() ||
        u.name.toLowerCase().includes(this.userSearch.toLowerCase()) ||
        u.email.toLowerCase().includes(this.userSearch.toLowerCase()) ||
        (u.phone && u.phone.includes(this.userSearch));

      let matchRole = true;
      if (this.selectedRoleFilter === 'all') {
        matchRole = true;
      } else if (this.selectedRoleFilter === 'officials') {
        matchRole = ['superadmin', 'admin', 'editor', 'journalist', 'photographer', 'video_editor', 'moderator'].includes(u.role);
      } else if (this.selectedRoleFilter === 'clients') {
        matchRole = u.role === 'client';
      } else if (this.selectedRoleFilter === 'subscribers') {
        matchRole = ['subscriber', 'user'].includes(u.role);
      } else {
        matchRole = u.role === this.selectedRoleFilter;
      }

      const matchStatus = this.selectedUserStatusFilter === 'all' ||
        (this.selectedUserStatusFilter === 'active' ? u.isActive : !u.isActive);

      return matchSearch && matchRole && matchStatus;
    });
  }

  openAddUserModal() {
    this.openAddOfficialModal();
  }

  openAddOfficialModal() {
    this.editingUserId = null;
    this.userForm = {
      name: '',
      email: '',
      password: '',
      role: 'editor' as UserRole,
      roleTitle: 'محرر صحفي ومسؤول',
      department: 'هيئة التحرير والإدارة',
      phone: '',
      bio: '',
      notes: '',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80',
      isActive: true
    };
    this.showUserModal = true;
  }

  openAddClientModal() {
    this.editingUserId = null;
    this.userForm = {
      name: '',
      email: '',
      password: '',
      role: 'client' as UserRole,
      roleTitle: 'عميل معتمد / شريك إعلاني',
      department: 'قسم العملاء والتسويق والإعلانات',
      phone: '',
      bio: 'شريك تجاري ومعلن معتمد لدى بوابة المصري الإخباري.',
      notes: 'عميل تجاري',
      avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=300&auto=format&fit=crop&q=80',
      isActive: true
    };
    this.showUserModal = true;
  }

  onUserRoleChange() {
    if (this.userForm.role === 'client') {
      if (!this.userForm.roleTitle || this.userForm.roleTitle.includes('محرر') || this.userForm.roleTitle.includes('صحفي')) {
        this.userForm.roleTitle = 'عميل تجاري / معلن معتمد';
      }
      if (!this.userForm.department || this.userForm.department.includes('التحرير')) {
        this.userForm.department = 'قسم الرعايات والعملاء والإعلانات';
      }
    } else if (this.userForm.role === 'admin' || this.userForm.role === 'superadmin') {
      this.userForm.roleTitle = 'مسؤول إدارة وهيئة تحرير';
      this.userForm.department = 'مجلس الإدارة والتحرير';
    } else if (this.userForm.role === 'journalist') {
      this.userForm.roleTitle = 'صحفي ومراسل ميداني';
      this.userForm.department = 'قسم المراسلين والتحقيقات';
    } else if (this.userForm.role === 'photographer') {
      this.userForm.roleTitle = 'مصور صحفي معتمد';
      this.userForm.department = 'وحدة التصوير الصحفي';
    } else if (this.userForm.role === 'video_editor') {
      this.userForm.roleTitle = 'مونتير ومحرر فيديو';
      this.userForm.department = 'استوديو المصري فيديو';
    }
  }

  onUserAvatarFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const file = target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        this.showToast('حجم الصورة كبير، يرجى اختيار صورة أقل من 5 ميجابايت', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          this.userForm.avatar = e.target.result as string;
          this.showToast('تم تحميل صورة الحساب من جهازك بنجاح!');
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onArticleImageFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const file = target.files[0];
      if (!file.type.startsWith('image/')) {
        this.showToast('يرجى اختيار ملف صورة صالح (JPG, PNG, WebP)', 'error');
        return;
      }
      if (file.size > 12 * 1024 * 1024) {
        this.showToast('حجم الصورة كبير جداً، يرجى اختيار صورة أقل من 12 ميجابايت', 'error');
        return;
      }
      this.optimizeAndSetArticleImage(file);
      // Reset input value so re-selecting the same file works
      target.value = '';
    }
  }

  optimizeAndSetArticleImage(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const rawData = e.target?.result as string;
      if (!rawData) return;

      const img = new Image();
      img.onload = () => {
        try {
          const maxDim = 1200;
          let width = img.width;
          let height = img.height;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, width, height);
            // Compress to webp or jpeg with good balance
            const compressed = canvas.toDataURL('image/jpeg', 0.85);
            this.articleForm.featuredImage = compressed;
            this.showToast('تم تحميل ومعالجة صورة الخبر بنجاح!');
          } else {
            this.articleForm.featuredImage = rawData;
            this.showToast('تم تحميل صورة الخبر بنجاح!');
          }
        } catch {
          this.articleForm.featuredImage = rawData;
          this.showToast('تم تحميل صورة الخبر بنجاح!');
        }
      };
      img.onerror = () => {
        this.articleForm.featuredImage = rawData;
        this.showToast('تم تحميل صورة الخبر بنجاح!');
      };
      img.src = rawData;
    };
    reader.onerror = () => {
      this.showToast('حدث خطأ أثناء قراءة ملف الصورة', 'error');
    };
    reader.readAsDataURL(file);
  }

  setPresetAvatar(type: 'male1' | 'female1' | 'client' | 'admin') {
    switch (type) {
      case 'male1':
        this.userForm.avatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80';
        break;
      case 'female1':
        this.userForm.avatar = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80';
        break;
      case 'client':
        this.userForm.avatar = 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=300&auto=format&fit=crop&q=80';
        break;
      case 'admin':
        this.userForm.avatar = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80';
        break;
    }
    this.showToast('تم اختيار الصورة المقترحة');
  }

  openEditUserModal(user: User) {
    this.editingUserId = user.id;
    this.userForm = {
      name: user.name,
      email: user.email,
      password: user.password || '',
      role: user.role,
      roleTitle: user.roleTitle || '',
      department: user.department || 'هيئة التحرير والإدارة',
      phone: user.phone || '',
      bio: user.bio || '',
      notes: user.notes || '',
      avatar: user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80',
      isActive: user.isActive
    };
    this.showUserModal = true;
  }

  saveUserModal() {
    if (!this.userForm.name.trim() || !this.userForm.email.trim()) {
      this.showToast('يرجى إدخال اسم الحساب وبريده الإلكتروني', 'error');
      return;
    }

    const roleName = this.isClientRole ? 'العميل' : 'المسؤول';

    if (this.editingUserId) {
      const user = this.users.find(u => u.id === this.editingUserId);
      if (user) {
        user.name = this.userForm.name.trim();
        user.email = this.userForm.email.trim();
        if (this.userForm.password) user.password = this.userForm.password;
        user.role = this.userForm.role;
        user.roleTitle = this.userForm.roleTitle.trim();
        user.department = this.userForm.department.trim();
        user.phone = this.userForm.phone.trim();
        user.bio = this.userForm.bio.trim();
        user.notes = this.userForm.notes.trim();
        user.avatar = this.userForm.avatar.trim();
        user.isActive = this.userForm.isActive;
        storageService.updateUser(user);
        this.showToast(`تم تحديث بيانات ${roleName} بنجاح`);
      }
    } else {
      storageService.createUser({
        name: this.userForm.name.trim(),
        email: this.userForm.email.trim(),
        password: this.userForm.password.trim() || '123456',
        role: this.userForm.role,
        roleTitle: this.userForm.roleTitle.trim(),
        department: this.userForm.department.trim(),
        phone: this.userForm.phone.trim(),
        bio: this.userForm.bio.trim(),
        notes: this.userForm.notes.trim(),
        avatar: this.userForm.avatar.trim(),
        isActive: this.userForm.isActive
      });
      this.showToast(`تم إضافة ${roleName} الجديد بنجاح`);
    }

    this.showUserModal = false;
    this.refreshAllData();
  }

  toggleUserActive(user: User) {
    const newState = storageService.toggleUserStatus(user.id);
    this.showToast(newState ? `تم تفعيل حساب ${user.name}` : `تم تعطيل حساب ${user.name}`, 'info');
    this.refreshAllData();
  }

  deleteUser(user: User) {
    if (user.role === 'superadmin') {
      this.showToast('لا يمكن حذف حساب رئيس التحرير والمدير العام الرئيسي', 'error');
      return;
    }
    if (confirm(`هل أنت متأكد من رغبتك في حذف حساب "${user.name}" نهائياً؟`)) {
      storageService.deleteUser(user.id);
      this.showToast('تم حذف الحساب بنجاح');
      this.refreshAllData();
    }
  }

  // ==========================================
  // THEME & IDENTITY SETTINGS
  // ==========================================
  setPresetColor(hex: string) {
    this.settings.primaryColor = hex;
  }

  saveThemeSettings() {
    storageService.updateSettings(this.settings);
    document.documentElement.style.setProperty('--primary-brand-color', this.settings.primaryColor);
    this.showToast('تم حفظ ألوان وهوية وشعار المنصة بنجاح!');
    this.refreshAllData();
  }

  resetThemeDefaults() {
    this.settings.siteName = 'بوابة المصري الإخباري';
    this.settings.tagline = 'نبض الخبر.. صوت الحقيقة على مدار الساعة';
    this.settings.logoText = 'المصري';
    this.settings.brandSubtitle = 'الإخباري';
    this.settings.primaryColor = '#dc2626';
    storageService.updateSettings(this.settings);
    this.showToast('تمت استعادة الإعدادات الافتراضية للهوية');
    this.refreshAllData();
  }

  // ==========================================
  // DISPLAY & HOMEPAGE SETTINGS
  // ==========================================
  saveDisplaySettings() {
    storageService.updateSettings(this.settings);
    this.showToast('تم حفظ خيارات عرض الأخبار والصفحة الرئيسية بنجاح!');
    this.refreshAllData();
  }

  // ==========================================
  // COMMENTS MODERATION
  // ==========================================
  approveComment(id: string) {
    storageService.updateCommentStatus(id, 'approved');
    this.showToast('تمت الموافقة على نشر التعليق');
    this.refreshAllData();
  }

  rejectComment(id: string) {
    storageService.updateCommentStatus(id, 'rejected');
    this.showToast('تم رفض التعليق');
    this.refreshAllData();
  }

  // Role display helper
  getRoleBadge(role: UserRole): { text: string; class: string } {
    switch (role) {
      case 'superadmin':
        return { text: 'المدير العام ورئيس التحرير', class: 'bg-red-100 text-red-700 border-red-200' };
      case 'admin':
        return { text: 'مسؤول إدارة ومدير تحرير', class: 'bg-purple-100 text-purple-700 border-purple-200' };
      case 'editor':
        return { text: 'محرر صحفي مسؤول', class: 'bg-blue-100 text-blue-700 border-blue-200' };
      case 'journalist':
        return { text: 'صحفي ومراسل ميداني', class: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
      case 'photographer':
        return { text: 'مصور صحفي', class: 'bg-cyan-100 text-cyan-700 border-cyan-200' };
      case 'video_editor':
        return { text: 'محرر ومونتير فيديو', class: 'bg-rose-100 text-rose-700 border-rose-200' };
      case 'moderator':
        return { text: 'مدقق ومراجع محتوى', class: 'bg-amber-100 text-amber-700 border-amber-200' };
      case 'client':
        return { text: 'عميل معتمد / شريك إعلاني', class: 'bg-teal-100 text-teal-800 border-teal-200' };
      case 'subscriber':
        return { text: 'مشترك مميز', class: 'bg-indigo-100 text-indigo-700 border-indigo-200' };
      default:
        return { text: 'عضو مسجل', class: 'bg-stone-100 text-stone-700 border-stone-200' };
    }
  }
}
