import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { storageService } from '../../services/storage.service';
import { Article, Category, Governorate, GoldPriceItem, CurrencyRateItem, WeatherItem, PrayerTimeItem, MatchItem, LeagueStandingItem, PhotoAlbum, VideoStory } from '../../models';
import { SafePipe } from '../../pipes/safe.pipe';
import { parseVideoUrl, ParsedVideo } from '../../services/video.helper';
import {
  GOLD_PRICES,
  CURRENCY_RATES,
  WEATHER_FORECAST,
  PRAYER_TIMES,
  GOVERNORATES_LIST,
  MATCHES_SCHEDULE,
  LEAGUE_STANDINGS,
  INITIAL_PHOTO_ALBUMS
} from '../../data/seed-data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, SafePipe],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 font-sans">

      <!-- ========================================================= -->
      <!-- 1. HERO & TOP STORIES SECTION                             -->
      <!-- ========================================================= -->
      <section class="mb-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">

          <!-- Main Lead Story (Span 8) -->
          <div class="lg:col-span-8 flex flex-col gap-6">
            <div
              *ngIf="leadArticle"
              [routerLink]="['/article', leadArticle.id]"
              class="relative bg-black rounded-3xl overflow-hidden h-[380px] sm:h-[420px] group cursor-pointer shadow-md border border-stone-200"
            >
              <img
                [src]="leadArticle.featuredImage"
                [alt]="leadArticle.title"
                class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-750 opacity-85"
                referrerPolicy="no-referrer"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent z-10"></div>

              <div class="absolute bottom-0 p-6 sm:p-8 z-20 w-full text-right space-y-2">
                <div class="flex items-center gap-2">
                  <span class="bg-red-600 text-white px-3 py-1 text-xs font-black rounded-lg shadow-sm">
                    {{ leadArticle.categoryName }}
                  </span>
                  <span *ngIf="leadArticle.isBreaking" class="bg-amber-500 text-black px-2.5 py-0.5 text-[10px] font-black rounded-md animate-pulse">
                    عاجل
                  </span>
                  <span class="text-xs text-stone-300 mr-auto font-mono">
                    {{ formatDate(leadArticle.publishedAt) }}
                  </span>
                </div>

                <h2 class="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-snug group-hover:text-red-400 transition-colors">
                  {{ leadArticle.title }}
                </h2>

                <p class="text-xs sm:text-sm text-stone-200 line-clamp-2 leading-relaxed">
                  {{ leadArticle.subtitle || leadArticle.excerpt }}
                </p>

                <div class="flex items-center justify-between pt-2 border-t border-white/20 text-xs text-stone-300">
                  <div class="flex items-center gap-2">
                    <img [src]="leadArticle.authorAvatar" class="w-6 h-6 rounded-full object-cover border border-white" />
                    <span>بقلم: {{ leadArticle.authorName }}</span>
                  </div>
                  <div class="flex items-center gap-3 text-[11px]">
                    <span>👁️ {{ leadArticle.views | number }} قراءة</span>
                    <span>⏱️ {{ leadArticle.readingTimeMinutes }} دقائق</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 2 Sub-Featured Secondary Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                *ngFor="let item of subLeadArticles"
                [routerLink]="['/article', item.id]"
                class="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col"
              >
                <div class="relative h-44 overflow-hidden">
                  <img
                    [src]="item.featuredImage"
                    [alt]="item.title"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span class="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                    {{ item.categoryName }}
                  </span>
                </div>
                <div class="p-4 flex-1 flex flex-col justify-between text-right">
                  <h3 class="font-bold text-sm sm:text-base text-stone-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug mb-2">
                    {{ item.title }}
                  </h3>
                  <div class="flex items-center justify-between text-[11px] text-stone-500 pt-2 border-t border-stone-100">
                    <span>{{ item.authorName }}</span>
                    <span>{{ formatDate(item.publishedAt) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Side Panel: Trending & Most Read (Span 4) -->
          <div class="lg:col-span-4 flex flex-col gap-4">
            <div class="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs">
              <!-- Tabs Header -->
              <div class="flex items-center justify-between pb-3 border-b border-stone-200 mb-4 text-xs font-black">
                <button
                  (click)="activeSideTab = 'mostRead'"
                  [class.text-red-600]="activeSideTab === 'mostRead'"
                  [class.border-b-2]="activeSideTab === 'mostRead'"
                  [class.border-red-600]="activeSideTab === 'mostRead'"
                  class="pb-1 cursor-pointer transition-colors"
                >
                  🔥 الأكثر قراءة
                </button>
                <button
                  (click)="activeSideTab = 'trending'"
                  [class.text-red-600]="activeSideTab === 'trending'"
                  [class.border-b-2]="activeSideTab === 'trending'"
                  [class.border-red-600]="activeSideTab === 'trending'"
                  class="pb-1 cursor-pointer transition-colors"
                >
                  ⚡ تريند الآن
                </button>
                <button
                  (click)="activeSideTab = 'editors'"
                  [class.text-red-600]="activeSideTab === 'editors'"
                  [class.border-b-2]="activeSideTab === 'editors'"
                  [class.border-red-600]="activeSideTab === 'editors'"
                  class="pb-1 cursor-pointer transition-colors"
                >
                  ⭐ اختيارات المحرر
                </button>
              </div>

              <!-- List Items -->
              <div class="space-y-3">
                <div
                  *ngFor="let item of currentSideArticles; let i = index"
                  [routerLink]="['/article', item.id]"
                  class="flex items-start gap-3 group cursor-pointer pb-3 border-b border-stone-100 last:border-none"
                >
                  <span class="w-7 h-7 rounded-xl bg-stone-100 group-hover:bg-red-600 group-hover:text-white font-black text-sm text-stone-700 flex items-center justify-center shrink-0 transition-colors">
                    {{ i + 1 }}
                  </span>
                  <div class="flex-1 text-right">
                    <h4 class="font-bold text-xs sm:text-sm text-stone-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                      {{ item.title }}
                    </h4>
                    <div class="flex items-center justify-between text-[10px] text-stone-400 mt-1">
                      <span>{{ item.categoryName }}</span>
                      <span>{{ item.views | number }} مشاهدة</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Ad / Special Widget Banner -->
            <div class="bg-linear-to-br from-red-700 to-stone-900 text-white rounded-3xl p-5 text-right shadow-sm flex flex-col justify-between">
              <div>
                <span class="bg-white/20 text-white text-[10px] font-black px-2 py-0.5 rounded">خدمة حصرية</span>
                <h3 class="text-base font-black mt-2 mb-1">المصري فاكت | دليلك لكشف الشائعات</h3>
                <p class="text-xs text-stone-200">فريق تحريري متخصص يدقق الأخبار والصور المفبركة أولاً بأول.</p>
              </div>
              <a
                routerLink="/fact-check"
                class="mt-4 bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs py-2 px-4 rounded-xl text-center transition-colors block"
              >
                تصفح وحدة التحقق الآن ←
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- ========================================================= -->
      <!-- 2. FACT CHECK SECTION (المصري فاكت)                        -->
      <!-- ========================================================= -->
      <section class="my-10 bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-emerald-800 text-right">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-emerald-800/80 mb-6">
          <div>
            <div class="flex items-center gap-2">
              <span class="bg-amber-400 text-stone-950 font-black text-xs px-2.5 py-0.5 rounded">وحدة تدقيق المعلومات</span>
              <span class="text-emerald-300 text-xs">مكافحة الأخبار المضللة والشائعات</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-black mt-1 font-display">المصري فاكت | الحقيقة وراء الشائعات</h2>
          </div>
          <a
            routerLink="/fact-check"
            class="bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors shrink-0"
          >
            عرض كافة التقارير والادعاءات ←
          </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            *ngFor="let fact of factCheckArticles"
            [routerLink]="['/article', fact.id]"
            class="bg-emerald-900/60 rounded-2xl p-5 border border-emerald-700/60 hover:border-amber-400 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div class="flex items-center justify-between mb-3">
                <span
                  [class.bg-red-600]="fact.factCheckData?.verdict === 'false'"
                  [class.bg-emerald-600]="fact.factCheckData?.verdict === 'true'"
                  [class.bg-amber-600]="fact.factCheckData?.verdict === 'misleading'"
                  class="text-white text-[11px] font-black px-2.5 py-1 rounded-md"
                >
                  {{ getVerdictLabel(fact.factCheckData?.verdict) }}
                </span>
                <span class="text-[10px] text-emerald-300">{{ formatDate(fact.publishedAt) }}</span>
              </div>

              <h4 class="font-bold text-sm text-white mb-2 leading-snug">
                {{ fact.title }}
              </h4>

              <div *ngIf="fact.factCheckData" class="bg-black/30 rounded-xl p-3 text-xs space-y-2 mb-3">
                <p class="text-red-300 font-semibold">
                  <span class="text-white">❌ الادعاء المتداول:</span> {{ fact.factCheckData.claim }}
                </p>
                <p class="text-emerald-300 font-semibold">
                  <span class="text-white">✓ الحقيقة الرسمية:</span> {{ fact.factCheckData.truth }}
                </p>
              </div>
            </div>

            <span class="text-amber-300 text-xs font-bold pt-2 border-t border-emerald-800 flex items-center justify-between">
              <span>اقرأ التقرير الكامل ومصادر التحقق</span>
              <span>←</span>
            </span>
          </div>
        </div>
      </section>

      <!-- ========================================================= -->
      <!-- 3. SERVICES HUB: GOLD, CURRENCY, PRAYER & WEATHER         -->
      <!-- ========================================================= -->
      <section class="my-10 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs text-right">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 mb-6">
          <div>
            <div class="flex items-center gap-2">
              <span class="bg-amber-500 text-stone-950 text-xs font-black px-2.5 py-0.5 rounded">خدمات المواطن الحية</span>
              <span class="text-stone-500 text-xs">تحديث لحظي لأسواق الصاغة والبنوك المصرية</span>
            </div>
            <h2 class="text-2xl font-black text-stone-900 mt-1 font-display">أسعار الذهب والعملات والطقس ومواقيت الصلاة</h2>
          </div>
          <a
            routerLink="/services"
            class="bg-stone-900 hover:bg-black text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors shrink-0"
          >
            فتح حاسبة الذهب ومحول العملات الكامل ←
          </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Gold Prices Card -->
          <div class="bg-amber-50/60 rounded-2xl p-4 border border-amber-200">
            <h3 class="text-sm font-black text-amber-900 mb-3 flex items-center justify-between">
              <span>🪙 أسعار الذهب اليوم بالصاغة</span>
              <span class="text-[10px] text-amber-700 font-normal">شراء / بيع</span>
            </h3>
            <div class="space-y-2 text-xs">
              <div *ngFor="let g of goldPrices" class="flex items-center justify-between py-1 border-b border-amber-200/60 last:border-none">
                <span class="font-bold text-stone-800">{{ g.karat }}</span>
                <div class="font-bold text-stone-900">
                  <span>{{ g.sellPrice | number }} ج.م</span>
                  <span class="text-[10px] text-stone-500 mr-1">({{ g.buyPrice | number }})</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Currency Exchange Card -->
          <div class="bg-emerald-50/60 rounded-2xl p-4 border border-emerald-200">
            <h3 class="text-sm font-black text-emerald-900 mb-3 flex items-center justify-between">
              <span>💵 أسعار العملات بالبنك المركزي</span>
              <span class="text-[10px] text-emerald-700 font-normal">بيع</span>
            </h3>
            <div class="space-y-2 text-xs">
              <div *ngFor="let c of currencyRates" class="flex items-center justify-between py-1 border-b border-emerald-200/60 last:border-none">
                <span class="font-bold text-stone-800">{{ c.flag }} {{ c.currency }}</span>
                <span class="font-bold text-stone-900">{{ c.sellPrice }} ج.م</span>
              </div>
            </div>
          </div>

          <!-- Prayer Times Card -->
          <div class="bg-sky-50/60 rounded-2xl p-4 border border-sky-200">
            <h3 class="text-sm font-black text-sky-900 mb-3 flex items-center justify-between">
              <span>🕌 مواقيت الصلاة (القاهرة)</span>
              <span class="text-[10px] text-sky-700 font-normal">توقيت محلي</span>
            </h3>
            <div *ngIf="cairoPrayer" class="space-y-1.5 text-xs">
              <div class="flex justify-between py-0.5 border-b border-sky-100">
                <span class="text-stone-700">الفجر</span>
                <span class="font-bold text-stone-900">{{ cairoPrayer.fajr }}</span>
              </div>
              <div class="flex justify-between py-0.5 border-b border-sky-100">
                <span class="text-stone-700">الشروق</span>
                <span class="font-bold text-stone-900">{{ cairoPrayer.sunrise }}</span>
              </div>
              <div class="flex justify-between py-0.5 border-b border-sky-100 bg-sky-200/50 px-1 rounded">
                <span class="text-sky-950 font-bold">الظهر</span>
                <span class="font-black text-sky-950">{{ cairoPrayer.dhuhr }}</span>
              </div>
              <div class="flex justify-between py-0.5 border-b border-sky-100">
                <span class="text-stone-700">العصر</span>
                <span class="font-bold text-stone-900">{{ cairoPrayer.asr }}</span>
              </div>
              <div class="flex justify-between py-0.5 border-b border-sky-100">
                <span class="text-stone-700">المغرب</span>
                <span class="font-bold text-stone-900">{{ cairoPrayer.maghrib }}</span>
              </div>
              <div class="flex justify-between py-0.5">
                <span class="text-stone-700">العشاء</span>
                <span class="font-bold text-stone-900">{{ cairoPrayer.isha }}</span>
              </div>
            </div>
          </div>

          <!-- Weather Preview Card -->
          <div class="bg-stone-50 rounded-2xl p-4 border border-stone-200">
            <h3 class="text-sm font-black text-stone-900 mb-3 flex items-center justify-between">
              <span>☀️ طقس محافظات مصر</span>
              <span class="text-[10px] text-stone-500 font-normal">درجة الحرارة</span>
            </h3>
            <div class="space-y-2 text-xs">
              <div *ngFor="let w of weatherPreview" class="flex items-center justify-between py-1 border-b border-stone-200/60 last:border-none">
                <span class="font-bold text-stone-800">{{ w.city }}</span>
                <div class="flex items-center gap-2 font-bold text-stone-900">
                  <span>{{ w.temp }}°م</span>
                  <span class="text-xs">{{ w.conditionIcon }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ========================================================= -->
      <!-- 4. GOVERNORATES SECTION (نبض محافظات مصر)                   -->
      <!-- ========================================================= -->
      <section class="my-10 bg-amber-50/40 rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs text-right">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-amber-200 mb-6">
          <div>
            <div class="flex items-center gap-2">
              <span class="bg-amber-600 text-white text-xs font-black px-2.5 py-0.5 rounded">27 محافظة</span>
              <span class="text-stone-500 text-xs">من الإسكندرية ومطروح وحتى الأقصر وأسوان</span>
            </div>
            <h2 class="text-2xl font-black text-stone-900 mt-1 font-display">نبض محافظات مصر | تغطية ميدانية شاملة</h2>
          </div>

          <!-- Region Tabs -->
          <div class="flex items-center gap-1 overflow-x-auto scrollbar-none py-1">
            <button
              *ngFor="let r of regions"
              (click)="selectedRegion = r"
              [class.bg-amber-600]="selectedRegion === r"
              [class.text-white]="selectedRegion === r"
              [class.bg-white]="selectedRegion !== r"
              [class.text-stone-700]="selectedRegion !== r"
              class="text-xs font-bold px-3 py-1.5 rounded-xl border border-amber-200 transition-colors whitespace-nowrap cursor-pointer"
            >
              {{ r }}
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            *ngFor="let item of governorateArticles"
            [routerLink]="['/article', item.id]"
            class="bg-white rounded-2xl overflow-hidden border border-amber-100 shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col"
          >
            <div class="relative h-36 overflow-hidden">
              <img
                [src]="item.featuredImage"
                [alt]="item.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <span class="absolute top-2 right-2 bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                {{ item.governorate || 'المحافظات' }}
              </span>
            </div>
            <div class="p-3.5 flex-1 flex flex-col justify-between">
              <h4 class="font-bold text-xs sm:text-sm text-stone-900 group-hover:text-amber-700 transition-colors line-clamp-2 leading-snug mb-2">
                {{ item.title }}
              </h4>
              <div class="flex items-center justify-between text-[10px] text-stone-400 pt-2 border-t border-stone-100">
                <span>{{ formatDate(item.publishedAt) }}</span>
                <span>👁️ {{ item.views | number }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ========================================================= -->
      <!-- 4.5 AL-MASRY VIDEO STUDIO (استوديو المصري فيديو)           -->
      <!-- ========================================================= -->
      <section id="video-section" class="my-10 bg-stone-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-800 text-right">
        <!-- Section Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-800 mb-6">
          <div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-red-600 animate-ping"></span>
              <span class="bg-red-600 text-white font-black text-xs px-2.5 py-0.5 rounded shadow-sm">المصري فيديو • بث عالي الدقة HD</span>
              <span class="text-stone-400 text-xs hidden sm:inline">تقارير مصورة وتغطيات ميدانية حصرية</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-black mt-2 font-display text-white">
              🎥 استوديو التغطيات المرئية الحية
            </h2>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-xs text-emerald-400 font-bold hidden sm:flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              جميع الفيديوهات مفعلة وشغالة 100%
            </span>
          </div>
        </div>

        <!-- Video Player and Playlist Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">

          <!-- Main Player Showcase (Span 8) -->
          <div class="lg:col-span-8 flex flex-col justify-between bg-stone-900 rounded-2xl overflow-hidden border border-stone-800 shadow-lg">
            <!-- Screen Box (16:9 responsive) -->
            <div class="relative w-full aspect-video bg-black flex items-center justify-center">
              <ng-container *ngIf="parsedActiveVideo && parsedActiveVideo.isPlayable; else noVideo">
                <!-- YouTube Player -->
                <iframe
                  *ngIf="parsedActiveVideo.type === 'youtube'"
                  [src]="parsedActiveVideo.embedUrl | safe:'resourceUrl'"
                  class="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                  title="مشغل الفيديو الرئيسي"
                ></iframe>

                <!-- HTML5 MP4 Player -->
                <video
                  *ngIf="parsedActiveVideo.type === 'mp4'"
                  controls
                  autoplay
                  playsinline
                  class="w-full h-full object-contain"
                  [src]="parsedActiveVideo.rawUrl"
                ></video>
              </ng-container>

              <ng-template #noVideo>
                <div class="text-stone-500 text-sm flex flex-col items-center gap-2">
                  <span class="text-3xl">🎬</span>
                  <span>اختر فيديو من القائمة لتشغيله فوراً</span>
                </div>
              </ng-template>
            </div>

            <!-- Active Video Details & Action Bar -->
            <div class="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-stone-900/90 text-right">
              <div class="space-y-1 max-w-xl">
                <div class="flex items-center gap-2 text-xs">
                  <span class="bg-red-900/80 text-red-300 font-bold px-2 py-0.5 rounded border border-red-800/60">
                    مشغل الآن
                  </span>
                  <span *ngIf="selectedVideo?.duration" class="text-stone-400 font-mono">
                    ⏱️ {{ selectedVideo?.duration }}
                  </span>
                  <span *ngIf="selectedVideo?.views" class="text-stone-400">
                    👁️ {{ selectedVideo?.views | number }} مشاهدة
                  </span>
                </div>
                <h3 class="text-base sm:text-lg font-black text-white leading-snug">
                  {{ selectedVideo?.title }}
                </h3>
                <p *ngIf="selectedVideo?.description" class="text-xs text-stone-400 line-clamp-2">
                  {{ selectedVideo?.description }}
                </p>
              </div>

              <!-- Fullscreen Cinema Button -->
              <button
                *ngIf="selectedVideo"
                (click)="openVideoModal(selectedVideo)"
                class="bg-stone-800 hover:bg-red-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-stone-700 transition-colors shrink-0 flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>وضع السينما ⛶</span>
              </button>
            </div>
          </div>

          <!-- Playlist / Video Queue (Span 4) -->
          <div class="lg:col-span-4 flex flex-col">
            <div class="p-3 bg-stone-900 rounded-t-2xl border-t border-x border-stone-800 flex items-center justify-between">
              <span class="font-bold text-xs text-stone-200">📋 قائمة التقارير المرئية ({{ videos.length }})</span>
              <span class="text-[10px] text-amber-400">اضغط للمشاهدة فوراً</span>
            </div>

            <div class="flex-1 space-y-2.5 overflow-y-auto max-h-[460px] p-2 bg-stone-900/50 rounded-b-2xl border border-stone-800 scrollbar-thin">
              <div
                *ngFor="let v of videos"
                (click)="selectVideo(v, true)"
                [class.border-red-600]="selectedVideo?.id === v.id"
                [class.bg-red-950]="selectedVideo?.id === v.id"
                [class.border-stone-800]="selectedVideo?.id !== v.id"
                [class.bg-stone-950]="selectedVideo?.id !== v.id"
                class="p-2.5 rounded-xl border hover:border-red-500 transition-all cursor-pointer flex gap-3 group items-center"
              >
                <!-- Video Thumbnail -->
                <div class="relative w-24 h-16 shrink-0 rounded-lg overflow-hidden bg-black">
                  <img [src]="v.thumbnail" [alt]="v.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div class="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <span
                      [class.bg-red-600]="selectedVideo?.id === v.id"
                      [class.bg-stone-900]="selectedVideo?.id !== v.id"
                      class="w-6 h-6 rounded-full text-white text-[10px] flex items-center justify-center shadow"
                    >
                      ▶
                    </span>
                  </div>
                  <span class="absolute bottom-1 left-1 bg-black/80 text-[9px] font-mono px-1 rounded text-white">
                    {{ v.duration }}
                  </span>
                </div>

                <!-- Video Info -->
                <div class="flex-1 min-w-0">
                  <h4
                    [class.text-red-400]="selectedVideo?.id === v.id"
                    [class.text-stone-200]="selectedVideo?.id !== v.id"
                    class="font-bold text-xs leading-snug line-clamp-2 group-hover:text-red-400 transition-colors"
                  >
                    {{ v.title }}
                  </h4>
                  <div class="flex items-center justify-between text-[10px] text-stone-400 mt-1">
                    <span>{{ v.author || 'فريق المصري' }}</span>
                    <span>👁️ {{ v.views | number }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- Video Cinema Modal -->
      <div *ngIf="activeModalVideo && parsedModalVideo" class="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
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
              title="مشغل الفيديو سينما"
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

          <!-- Modal Footer -->
          <div class="p-4 bg-stone-900/90 text-stone-300 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p class="text-stone-300">{{ activeModalVideo.description }}</p>
            <div class="flex items-center gap-3 text-[11px] text-stone-400 shrink-0 font-mono">
              <span>⏱️ {{ activeModalVideo.duration }}</span>
              <span>👁️ {{ activeModalVideo.views | number }} مشاهدة</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ========================================================= -->
      <!-- 5. SPORTS HUB (بوابة الرياضة والدوري المصري)                -->
      <!-- ========================================================= -->
      <section class="my-10 bg-sky-950 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-sky-800 text-right">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-sky-800 mb-6">
          <div>
            <div class="flex items-center gap-2">
              <span class="bg-sky-500 text-stone-950 font-black text-xs px-2.5 py-0.5 rounded">الدوري المصري والأهلي والزمالك</span>
              <span class="text-sky-300 text-xs">نتائج، مواعيد، وجدول الترتيب</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-black mt-1 font-display">بوابة الرياضة والملاعب</h2>
          </div>
          <a
            routerLink="/sports"
            class="bg-sky-700 hover:bg-sky-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors shrink-0"
          >
            تصفح مركز الرياضة بالكامل ←
          </a>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- Upcoming Matches Schedule (Span 7) -->
          <div class="lg:col-span-7 space-y-3">
            <h3 class="text-sm font-black text-sky-300 mb-2">⚽ جدول أقوى المباريات القادمة</h3>
            <div
              *ngFor="let m of matches"
              class="bg-sky-900/60 rounded-2xl p-3.5 border border-sky-700/60 flex items-center justify-between"
            >
              <!-- Home -->
              <div class="flex items-center gap-2 w-1/3 text-right">
                <span class="font-bold text-xs text-white truncate">{{ m.homeTeam }}</span>
              </div>

              <!-- VS Badge & Time -->
              <div class="text-center px-2">
                <span class="bg-sky-500 text-stone-950 text-[10px] font-black px-2 py-0.5 rounded-full">
                  {{ m.timeOrMinute }}
                </span>
                <span class="block text-[10px] text-sky-200 mt-0.5">{{ m.league }}</span>
              </div>

              <!-- Away -->
              <div class="flex items-center gap-2 w-1/3 justify-end text-left">
                <span class="font-bold text-xs text-white truncate">{{ m.awayTeam }}</span>
              </div>
            </div>
          </div>

          <!-- Standings Mini Table (Span 5) -->
          <div class="lg:col-span-5 bg-sky-900/50 rounded-2xl p-4 border border-sky-700/50">
            <h3 class="text-sm font-black text-sky-300 mb-3">🏆 ترتيب قمة الدوري المصري</h3>
            <div class="space-y-1 text-xs">
              <div class="flex justify-between text-[10px] text-sky-300 pb-1 border-b border-sky-800">
                <span>الفريق</span>
                <div class="space-x-3 space-x-reverse">
                  <span>لعب</span>
                  <span>نقاط</span>
                </div>
              </div>
              <div
                *ngFor="let s of standings.slice(0, 5)"
                class="flex justify-between items-center py-1.5 border-b border-sky-800/40 last:border-none"
              >
                <div class="flex items-center gap-2">
                  <span class="w-4 text-[10px] text-sky-300 font-bold">{{ s.rank }}</span>
                  <span class="font-bold text-white">{{ s.team }}</span>
                </div>
                <div class="space-x-4 space-x-reverse font-mono">
                  <span class="text-sky-200">{{ s.played }}</span>
                  <span class="font-black text-amber-400">{{ s.points }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ========================================================= -->
      <!-- 6. OPINION SECTION (أقلام ورؤى - مقالات الرأي)             -->
      <!-- ========================================================= -->
      <section class="my-10 bg-teal-950/20 rounded-3xl p-6 sm:p-8 border border-teal-200/80 shadow-xs text-right">
        <div class="pb-4 border-b border-teal-200 mb-6">
          <span class="bg-teal-700 text-white text-xs font-black px-2.5 py-0.5 rounded">نخبة الكتاب والمفكرين</span>
          <h2 class="text-2xl font-black text-stone-900 mt-1 font-display">أقلام ورؤى | مقالات الرأي والتحليلات</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            *ngFor="let op of opinionArticles"
            [routerLink]="['/article', op.id]"
            class="bg-white rounded-2xl p-5 border border-stone-200 hover:border-teal-600 transition-all cursor-pointer shadow-xs hover:shadow-md flex flex-col justify-between"
          >
            <div>
              <div class="flex items-center gap-3 mb-4">
                <img [src]="op.authorAvatar" class="w-12 h-12 rounded-full object-cover border-2 border-teal-600 shadow-sm" />
                <div>
                  <h4 class="font-bold text-sm text-stone-900">{{ op.authorName }}</h4>
                  <span class="text-[11px] text-stone-500">{{ op.authorRole }}</span>
                </div>
              </div>

              <h3 class="font-bold text-sm sm:text-base text-stone-900 hover:text-teal-700 transition-colors leading-snug mb-2">
                "{{ op.title }}"
              </h3>

              <p class="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                {{ op.excerpt }}
              </p>
            </div>

            <div class="pt-3 mt-4 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
              <span>{{ formatDate(op.publishedAt) }}</span>
              <span class="text-teal-700 font-bold">قراءة المقال ←</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  `
})
export class HomeComponent implements OnInit {
  articles: Article[] = storageService.getArticles();

  // Categories and items
  categories: Category[] = storageService.getCategories();
  leadArticle: Article | null = null;
  subLeadArticles: Article[] = [];
  sideArticles: Article[] = [];
  activeSideTab: 'mostRead' | 'trending' | 'editors' = 'mostRead';

  // Section data
  factCheckArticles: Article[] = [];
  goldPrices: GoldPriceItem[] = GOLD_PRICES;
  currencyRates: CurrencyRateItem[] = CURRENCY_RATES;
  weatherPreview: WeatherItem[] = WEATHER_FORECAST.slice(0, 4);
  cairoPrayer: PrayerTimeItem | undefined = PRAYER_TIMES[0];
  governorateArticles: Article[] = [];
  regions = ['الكل', 'القاهرة الكبرى', 'وجه بحري', 'القناة وسيناء', 'الصعيد', 'الحدود'];
  selectedRegion = 'الكل';
  matches: MatchItem[] = MATCHES_SCHEDULE.slice(0, 3);
  standings: LeagueStandingItem[] = LEAGUE_STANDINGS;
  opinionArticles: Article[] = [];

  // Video Section state
  videos: VideoStory[] = [];
  selectedVideo: VideoStory | null = null;
  parsedActiveVideo: ParsedVideo | null = null;
  activeModalVideo: VideoStory | null = null;
  parsedModalVideo: ParsedVideo | null = null;

  get currentSideArticles(): Article[] {
    if (this.activeSideTab === 'mostRead') {
      return [...this.articles].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5);
    }
    if (this.activeSideTab === 'trending') {
      return this.articles.filter(a => a.isBreaking || a.isFeatured).slice(0, 5);
    }
    return this.articles.filter(a => a.isEditorChoice).slice(0, 5);
  }

  ngOnInit() {
    this.leadArticle = this.articles.find(a => a.isFeatured) || this.articles[0];
    const rest = this.articles.filter(a => a.id !== this.leadArticle?.id);
    this.subLeadArticles = rest.slice(0, 2);
    this.sideArticles = rest.slice(2, 7);

    this.factCheckArticles = this.articles.filter(a => a.isFactCheck || a.categoryId === 'factcheck').slice(0, 3);
    this.governorateArticles = this.articles.filter(a => a.governorate || a.categoryId === 'governorates').slice(0, 4);
    this.opinionArticles = this.articles.filter(a => a.categoryId === 'opinion').slice(0, 3);

    // Initialize Video Studio
    this.videos = storageService.getVideos();
    if (this.videos.length > 0) {
      this.selectVideo(this.videos[0], false);
    }
  }

  selectVideo(v: VideoStory, autoplay = true) {
    this.selectedVideo = v;
    this.parsedActiveVideo = parseVideoUrl(v.videoUrl, autoplay);
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
    return d.toLocaleDateString('ar-EG', { month: 'short', day: 'numeric' });
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
