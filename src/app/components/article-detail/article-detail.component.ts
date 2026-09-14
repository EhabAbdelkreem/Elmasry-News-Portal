import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { storageService } from '../../services/storage.service';
import { Article, Comment, VideoStory } from '../../models';
import { SafePipe } from '../../pipes/safe.pipe';
import { parseVideoUrl, ParsedVideo } from '../../services/video.helper';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, SafePipe],
  template: `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-8 font-sans" dir="rtl" *ngIf="article">
      <!-- Breadcrumb Navigation -->
      <nav class="flex items-center gap-2 text-xs text-stone-500 mb-6 pb-2 border-b border-stone-200">
        <a routerLink="/" class="hover:text-red-600 font-bold">الرئيسية</a>
        <span>/</span>
        <a [routerLink]="['/category', article.categorySlug || article.categoryId]" class="hover:text-red-600">
          {{ article.categoryName }}
        </a>
        <span>/</span>
        <span class="text-stone-400 truncate max-w-xs">{{ article.title }}</span>
      </nav>

      <!-- Article Header -->
      <header class="mb-6 space-y-4 text-right">
        <!-- Category & Breaking badges -->
        <div class="flex items-center gap-2">
          <span class="bg-red-600 text-white text-xs font-black px-3 py-1 rounded-lg shadow-sm">
            {{ article.categoryName }}
          </span>
          <span *ngIf="article.isBreaking" class="bg-red-950 text-red-400 border border-red-800 text-xs font-black px-2.5 py-0.5 rounded-full animate-pulse">
            🔴 عاجل
          </span>
          <span *ngIf="article.isFactCheck" class="bg-emerald-700 text-white text-xs font-black px-2.5 py-0.5 rounded-full">
            🛡️ المصري فاكت
          </span>
        </div>

        <!-- Headline -->
        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 leading-tight">
          {{ article.title }}
        </h1>

        <!-- Subtitle -->
        <p *ngIf="article.subtitle" class="text-base sm:text-lg text-stone-600 font-serif leading-relaxed">
          {{ article.subtitle }}
        </p>

        <!-- Author & Meta bar -->
        <div class="flex flex-wrap items-center justify-between gap-4 py-3.5 border-y border-stone-200 text-xs text-stone-600">
          <div class="flex items-center gap-3">
            <img [src]="article.authorAvatar" [alt]="article.authorName" class="w-10 h-10 rounded-full object-cover border border-stone-300 shadow-xs" />
            <div>
              <span class="font-bold text-stone-900 block text-sm">{{ article.authorName }}</span>
              <span class="text-[11px] text-stone-500">{{ article.authorRole }}</span>
            </div>
          </div>

          <div class="flex items-center gap-4 text-[11px] text-stone-500">
            <span>📅 {{ formatDate(article.publishedAt) }}</span>
            <span>👁️ {{ article.views | number }} قراءة</span>
            <span>⏱️ {{ article.readingTimeMinutes }} دقائق قراءة</span>
          </div>
        </div>

        <!-- Reading Toolbar: Font Resize & Text-To-Speech -->
        <div class="flex items-center justify-between bg-stone-100/80 p-3 rounded-2xl border border-stone-200 text-xs">
          <!-- Text to Speech -->
          <div class="flex items-center gap-2">
            <button
              (click)="toggleSpeech()"
              class="bg-stone-900 hover:bg-black text-white px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>{{ isSpeaking ? '⏸️ إيقاف القراءة' : '🔊 استمع للمقال بالذكاء الصوتي' }}</span>
            </button>
            <span *ngIf="isSpeaking" class="text-[11px] text-emerald-600 font-bold animate-pulse">
              جاري القراءة الصوتية...
            </span>
          </div>

          <!-- Font Size Adjuster -->
          <div class="flex items-center gap-1.5">
            <span class="text-stone-500 text-[11px]">حجم الخط:</span>
            <button (click)="changeFontSize(-2)" class="w-7 h-7 bg-white border border-stone-300 rounded-lg font-bold hover:bg-stone-50 cursor-pointer">
              -A
            </button>
            <button (click)="changeFontSize(2)" class="w-7 h-7 bg-white border border-stone-300 rounded-lg font-bold hover:bg-stone-50 cursor-pointer">
              +A
            </button>
          </div>
        </div>
      </header>

      <!-- Featured Image & Caption -->
      <figure class="mb-8 rounded-3xl overflow-hidden border border-stone-200 shadow-xs">
        <img
          [src]="article.featuredImage"
          [alt]="article.title"
          class="w-full h-auto max-h-[520px] object-cover"
          referrerPolicy="no-referrer"
        />
        <figcaption *ngIf="article.imageCaption" class="bg-stone-50 text-stone-500 text-xs p-3 text-center border-t border-stone-200">
          {{ article.imageCaption }}
        </figcaption>
      </figure>

      <!-- Working Video Player (if article has attached video) -->
      <div *ngIf="parsedVideo && parsedVideo.isPlayable" class="mb-8 bg-stone-950 rounded-3xl overflow-hidden border border-stone-800 shadow-xl text-right">
        <!-- Video Header -->
        <div class="px-5 py-3.5 bg-gradient-to-r from-red-950 via-stone-900 to-black flex items-center justify-between border-b border-stone-800 text-white">
          <div class="flex items-center gap-2.5">
            <span class="w-3 h-3 rounded-full bg-red-500 animate-pulse shrink-0"></span>
            <span class="font-black text-xs sm:text-sm text-white">🎥 تغطية مرئية خاصة بالتقرير</span>
            <span *ngIf="article.videoDuration" class="bg-black/80 text-amber-400 text-[10px] font-mono px-2 py-0.5 rounded-md border border-stone-700">
              ⏱️ {{ article.videoDuration }}
            </span>
          </div>
          <span class="text-xs text-stone-300 font-bold truncate max-w-xs hidden sm:inline">
            {{ article.videoTitle || article.title }}
          </span>
        </div>

        <!-- Video Player Screen (16:9 Responsive) -->
        <div class="relative w-full aspect-video bg-black flex items-center justify-center">
          <!-- YouTube Player -->
          <iframe
            *ngIf="parsedVideo.type === 'youtube'"
            [src]="parsedVideo.embedUrl | safe:'resourceUrl'"
            class="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            title="فيديو التقرير"
          ></iframe>

          <!-- Direct MP4 / HTML5 Video Player -->
          <video
            *ngIf="parsedVideo.type === 'mp4'"
            controls
            playsinline
            preload="metadata"
            class="w-full h-full object-contain"
            [src]="parsedVideo.rawUrl"
          >
            متصفحك لا يدعم تشغيل الفيديو المباشر.
          </video>
        </div>

        <div class="p-3 bg-stone-900/90 text-stone-400 text-[11px] flex items-center justify-between border-t border-stone-800">
          <span>شاهد التغطية المصورة الحصرية بتقنية HD من وحدة الإنتاج المرئي لبوابة المصري الإخباري</span>
          <span class="text-emerald-400 font-bold flex items-center gap-1">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            جودة فائقة 1080p
          </span>
        </div>
      </div>

      <!-- Fact Check Callout if applicable -->
      <div *ngIf="article.isFactCheck && article.factCheckData" class="bg-emerald-950 text-white rounded-2xl p-5 mb-8 border border-emerald-800 text-right space-y-3">
        <div class="flex items-center justify-between">
          <span class="bg-amber-400 text-stone-950 font-black text-xs px-2.5 py-1 rounded-md">
            {{ getVerdictLabel(article.factCheckData.verdict) }}
          </span>
          <span class="text-xs text-emerald-300">المصدر: {{ article.factCheckData.sources?.[0]?.name || 'المصادر الرسمية' }}</span>
        </div>
        <div class="bg-black/30 p-4 rounded-xl text-xs space-y-2">
          <p class="text-red-300"><strong class="text-white">الادعاء المنتشر:</strong> {{ article.factCheckData.claim }}</p>
          <p class="text-emerald-300"><strong class="text-white">الحقيقة الموثقة:</strong> {{ article.factCheckData.truth }}</p>
        </div>
      </div>

      <!-- Article Body Content with dynamic font size -->
      <article
        [style.font-size.px]="fontSize"
        class="text-stone-800 leading-loose space-y-6 text-justify border-b border-stone-200 pb-8"
      >
        <div class="whitespace-pre-line leading-relaxed font-serif">
          {{ article.content }}
        </div>
      </article>

      <!-- Tags & Share Row -->
      <div class="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-stone-200">
        <!-- Tags -->
        <div class="flex flex-wrap items-center gap-1.5">
          <span class="text-xs font-bold text-stone-500">الكلمات الدلالية:</span>
          <span *ngFor="let tag of article.tags" class="bg-stone-100 text-stone-700 text-xs px-2.5 py-1 rounded-lg hover:bg-stone-200 cursor-pointer">
            #{{ tag }}
          </span>
        </div>

        <!-- Share Buttons -->
        <div class="flex items-center gap-2 text-xs">
          <span class="text-stone-500 font-bold">مشاركة:</span>
          <button (click)="shareWhatsApp()" class="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg font-bold cursor-pointer">
            واتساب
          </button>
          <button (click)="shareFacebook()" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg font-bold cursor-pointer">
            فيسبوك
          </button>
          <button (click)="copyLink()" class="bg-stone-800 hover:bg-stone-700 text-white px-3 py-1.5 rounded-lg font-bold cursor-pointer">
            {{ copied ? '✓ تم النسخ' : 'نسخ الرابط' }}
          </button>
        </div>
      </div>

      <!-- Reactions Bar -->
      <div class="my-8 bg-stone-50 p-4 rounded-2xl border border-stone-200 text-center">
        <h4 class="text-xs font-bold text-stone-600 mb-3">ما هو تقييمك لهذا المحتوى الإخباري؟</h4>
        <div class="flex items-center justify-center gap-4 sm:gap-8">
          <button (click)="react('like')" class="flex flex-col items-center hover:scale-110 transition-transform cursor-pointer">
            <span class="text-2xl">👍</span>
            <span class="text-[11px] font-bold text-stone-700 mt-1">أعجبني ({{ likes }})</span>
          </button>
          <button (click)="react('love')" class="flex flex-col items-center hover:scale-110 transition-transform cursor-pointer">
            <span class="text-2xl">❤️</span>
            <span class="text-[11px] font-bold text-stone-700 mt-1">أحببته ({{ loves }})</span>
          </button>
          <button (click)="react('insightful')" class="flex flex-col items-center hover:scale-110 transition-transform cursor-pointer">
            <span class="text-2xl">💡</span>
            <span class="text-[11px] font-bold text-stone-700 mt-1">مفيد ({{ insightful }})</span>
          </button>
          <button (click)="react('sad')" class="flex flex-col items-center hover:scale-110 transition-transform cursor-pointer">
            <span class="text-2xl">😢</span>
            <span class="text-[11px] font-bold text-stone-700 mt-1">محزن ({{ sads }})</span>
          </button>
        </div>
      </div>

      <!-- Comments Section -->
      <section class="my-10 text-right">
        <div class="flex items-center justify-between pb-3 border-b border-stone-200 mb-6">
          <h3 class="text-lg font-black text-stone-900">
            التعليقات ({{ comments.length }})
          </h3>
          <span class="text-xs text-stone-500">تخضع التعليقات لرقابة ميثاق الشرف الصحفي</span>
        </div>

        <!-- Add Comment Form -->
        <form (submit)="addComment($event)" class="bg-white p-5 rounded-2xl border border-stone-200 mb-8 space-y-3 shadow-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              [(ngModel)]="commentAuthor"
              name="author"
              placeholder="اسمك الكريم..."
              class="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-hidden focus:border-red-500"
              required
            />
            <input
              type="email"
              [(ngModel)]="commentEmail"
              name="email"
              placeholder="بريدك الإلكتروني (اختياري لن ينشر)..."
              class="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-hidden focus:border-red-500"
            />
          </div>
          <textarea
            [(ngModel)]="commentText"
            name="text"
            rows="3"
            placeholder="اكتب تعليقك الموضوعي هنا..."
            class="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-hidden focus:border-red-500"
            required
          ></textarea>
          <div class="flex justify-end">
            <button
              type="submit"
              class="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-5 py-2 rounded-xl transition-colors cursor-pointer"
            >
              نشر التعليق
            </button>
          </div>
        </form>

        <!-- Comments List -->
        <div class="space-y-4">
          <div *ngFor="let c of comments" class="bg-white p-4 rounded-2xl border border-stone-200 text-right">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-full bg-red-100 text-red-700 font-bold flex items-center justify-center text-xs">
                  {{ c.authorName.charAt(0) }}
                </div>
                <span class="font-bold text-xs text-stone-900">{{ c.authorName }}</span>
              </div>
              <span class="text-[10px] text-stone-400">{{ formatDate(c.createdAt) }}</span>
            </div>
            <p class="text-xs text-stone-700 leading-relaxed pr-10">
              {{ c.content }}
            </p>
          </div>
        </div>
      </section>

      <!-- Related Articles -->
      <section *ngIf="relatedArticles.length > 0" class="my-12 text-right">
        <h3 class="text-lg font-black text-stone-900 pb-3 border-b border-stone-200 mb-6">
          أخبار وتقارير ذات صلة
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            *ngFor="let item of relatedArticles"
            [routerLink]="['/article', item.id]"
            class="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col"
          >
            <img [src]="item.featuredImage" class="h-32 w-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div class="p-3 flex-1 flex flex-col justify-between">
              <h4 class="font-bold text-xs text-stone-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug mb-2">
                {{ item.title }}
              </h4>
              <span class="text-[10px] text-stone-400">{{ formatDate(item.publishedAt) }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Video Stories Recommendations (المصري فيديو) -->
      <section *ngIf="videoStories.length > 0" class="my-10 text-right bg-stone-900 text-white p-6 rounded-3xl border border-stone-800 shadow-lg">
        <div class="flex items-center justify-between pb-3 border-b border-stone-800 mb-5">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
            <h3 class="text-base sm:text-lg font-black text-white">
              🎥 المصري فيديو • تغطيات مرئية حصرية
            </h3>
          </div>
          <span class="text-xs text-amber-400 font-bold">بث عالي الدقة HD</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            *ngFor="let v of videoStories"
            (click)="openVideoModal(v)"
            class="bg-stone-950 rounded-2xl overflow-hidden border border-stone-800 hover:border-red-600 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div class="relative h-32 overflow-hidden bg-black">
              <img [src]="v.thumbnail" [alt]="v.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" />
              <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span class="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center text-sm font-black shadow-lg group-hover:scale-110 transition-transform">
                  ▶
                </span>
              </div>
              <span class="absolute bottom-2 left-2 bg-black/80 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                {{ v.duration }}
              </span>
            </div>
            <div class="p-3">
              <h4 class="font-bold text-xs text-stone-100 group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
                {{ v.title }}
              </h4>
              <div class="flex items-center justify-between text-[10px] text-stone-400 mt-2">
                <span>👁️ {{ v.views | number }}</span>
                <span class="text-red-400 font-bold">تشغيل الفيديو ◀</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Video Cinema Modal -->
      <div *ngIf="activeModalVideo && parsedModalVideo" class="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
        <div class="bg-stone-950 rounded-3xl border border-stone-800 shadow-2xl max-w-4xl w-full overflow-hidden text-right">
          <!-- Modal Header -->
          <div class="p-4 bg-gradient-to-r from-red-950 to-stone-900 flex items-center justify-between text-white border-b border-stone-800">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
              <h4 class="text-sm sm:text-base font-black truncate max-w-md sm:max-w-xl text-white">
                {{ activeModalVideo.title }}
              </h4>
            </div>
            <button (click)="closeVideoModal()" class="w-8 h-8 rounded-full bg-stone-800 hover:bg-red-600 text-white flex items-center justify-center text-sm font-black cursor-pointer transition-colors">
              ✕
            </button>
          </div>

          <!-- Video Player Screen -->
          <div class="relative w-full aspect-video bg-black flex items-center justify-center">
            <iframe
              *ngIf="parsedModalVideo.type === 'youtube'"
              [src]="parsedModalVideo.embedUrl | safe:'resourceUrl'"
              class="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
              title="مشغل الفيديو"
            ></iframe>

            <video
              *ngIf="parsedModalVideo.type === 'mp4'"
              controls
              autoplay
              playsinline
              class="w-full h-full object-contain"
              [src]="parsedModalVideo.rawUrl"
            ></video>
          </div>

          <!-- Modal Description Footer -->
          <div class="p-4 bg-stone-900/90 text-stone-300 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p class="text-stone-300">{{ activeModalVideo.description }}</p>
            <div class="flex items-center gap-3 text-[11px] text-stone-400 shrink-0 font-mono">
              <span>⏱️ {{ activeModalVideo.duration }}</span>
              <span>👁️ {{ activeModalVideo.views | number }} مشاهدة</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ArticleDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);

  article: Article | null = null;
  relatedArticles: Article[] = [];
  comments: Comment[] = [];
  parsedVideo: ParsedVideo | null = null;
  videoStories: VideoStory[] = [];
  activeModalVideo: VideoStory | null = null;
  parsedModalVideo: ParsedVideo | null = null;

  // Reading settings
  fontSize = 18;
  isSpeaking = false;
  copied = false;

  // Reactions
  likes = 42;
  loves = 18;
  insightful = 12;
  sads = 2;

  // Comment inputs
  commentAuthor = '';
  commentEmail = '';
  commentText = '';

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id') || 'art-1';
      this.loadArticle(id);
    });
  }

  loadArticle(id: string) {
    const found = storageService.getArticleById(id) || storageService.getArticles()[0];
    if (found) {
      this.article = found;
      this.parsedVideo = found.videoUrl ? parseVideoUrl(found.videoUrl) : null;
      this.likes = found.likesCount || 42;
      this.comments = storageService.getComments(found.id);
      this.relatedArticles = storageService.getArticles()
        .filter(a => a.categoryId === found.categoryId && a.id !== found.id)
        .slice(0, 3);
      this.videoStories = storageService.getVideos().slice(0, 3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  openVideoModal(v: VideoStory) {
    this.activeModalVideo = v;
    this.parsedModalVideo = parseVideoUrl(v.videoUrl, true);
  }

  closeVideoModal() {
    this.activeModalVideo = null;
    this.parsedModalVideo = null;
  }

  formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString('ar-EG', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  changeFontSize(delta: number) {
    const newSize = this.fontSize + delta;
    if (newSize >= 14 && newSize <= 28) {
      this.fontSize = newSize;
    }
  }

  toggleSpeech() {
    if (!('speechSynthesis' in window)) {
      alert('المتصفح لا يدعم القراءة الصوتية');
      return;
    }

    if (this.isSpeaking) {
      window.speechSynthesis.cancel();
      this.isSpeaking = false;
      return;
    }

    if (this.article) {
      const utterance = new SpeechSynthesisUtterance(this.article.title + '... ' + this.article.content);
      utterance.lang = 'ar-EG';
      utterance.rate = 0.9;
      utterance.onend = () => { this.isSpeaking = false; };
      utterance.onerror = () => { this.isSpeaking = false; };
      window.speechSynthesis.speak(utterance);
      this.isSpeaking = true;
    }
  }

  react(type: string) {
    if (type === 'like') this.likes++;
    if (type === 'love') this.loves++;
    if (type === 'insightful') this.insightful++;
    if (type === 'sad') this.sads++;
  }

  addComment(e: Event) {
    e.preventDefault();
    if (!this.commentText.trim() || !this.commentAuthor.trim() || !this.article) return;

    const newComment: Comment = {
      id: 'comm-' + Date.now(),
      articleId: this.article.id,
      authorName: this.commentAuthor.trim(),
      authorEmail: this.commentEmail.trim(),
      content: this.commentText.trim(),
      createdAt: new Date().toISOString(),
      status: 'approved',
      likesCount: 0
    };

    storageService.addComment(newComment);
    this.comments.unshift(newComment);
    this.commentText = '';
    this.commentAuthor = '';
    this.commentEmail = '';
  }

  shareWhatsApp() {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(document.title + ' ' + window.location.href)}`, '_blank');
  }

  shareFacebook() {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
  }

  copyLink() {
    navigator.clipboard.writeText(window.location.href);
    this.copied = true;
    setTimeout(() => { this.copied = false; }, 3000);
  }

  getVerdictLabel(verdict?: string): string {
    switch (verdict) {
      case 'false': return '❌ مفبرك وغير صحيح';
      case 'true': return '✓ صحيح ومؤكد';
      case 'misleading': return '⚠️ مضلل وخارج السياق';
      default: return 'تحت التدقيق';
    }
  }
}
