import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { storageService } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';
import { Category, BreakingNewsItem, GoldPriceItem, CurrencyRateItem, WeatherItem, PrayerTimeItem } from '../../models';
import {
  GOLD_PRICES,
  CURRENCY_RATES,
  WEATHER_FORECAST,
  PRAYER_TIMES
} from '../../data/seed-data';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <header class="w-full bg-stone-900 text-white border-b border-stone-800 shadow-md font-sans">
      <!-- 1. Top Bar: Live Date, Gold/Currency Tickers, Weather, Prayer & Auth -->
      <div class="bg-stone-950 text-stone-300 text-[11px] border-b border-stone-800/80 px-4 py-1.5">
        <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <!-- Right side (Date & Hijri) -->
          <div class="flex items-center gap-3">
            <span class="font-bold text-stone-200 flex items-center gap-1">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {{ todayDateFormatted }}
            </span>
            <span class="text-stone-500 hidden sm:inline">|</span>
            <!-- Live Currency & Gold Quick Tickers -->
            <div class="hidden lg:flex items-center gap-4 text-[10px]">
              <span class="text-amber-400 font-semibold flex items-center gap-1">
                <span>ذهب عيار 21:</span>
                <span class="font-bold text-white">{{ gold21Price }} ج.م</span>
              </span>
              <span class="text-emerald-400 font-semibold flex items-center gap-1">
                <span>الدولار:</span>
                <span class="font-bold text-white">{{ usdPrice }} ج.م</span>
              </span>
              <span class="text-sky-400 font-semibold flex items-center gap-1">
                <span>القاهرة:</span>
                <span class="text-white font-bold">{{ cairoTemp }}°م</span>
              </span>
              <span class="text-stone-400 flex items-center gap-1">
                <span>أذان الظهر:</span>
                <span class="text-amber-300 font-bold">{{ prayerDhuhr }}</span>
              </span>
            </div>
          </div>

          <!-- Left side: Quick Links & Login / Admin -->
          <div class="flex items-center gap-3">
            <a routerLink="/services" class="hover:text-amber-400 transition-colors hidden sm:inline">
              الذهب والعملات
            </a>
            <a routerLink="/governorates" class="hover:text-amber-400 transition-colors hidden md:inline">
              المحافظات
            </a>
            <a routerLink="/sports" class="hover:text-amber-400 transition-colors hidden md:inline">
              الدوري المصري
            </a>

            <span class="text-stone-700 hidden sm:inline">|</span>

            <!-- Auth Controls -->
            <div *ngIf="!authService.isAuthenticated()" class="flex items-center gap-2">
              <a routerLink="/login" class="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-[11px] font-black transition-all flex items-center gap-1.5 shadow-sm border border-emerald-400/40 hover:scale-102">
                <svg class="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span>تسجيل الدخول</span>
              </a>
            </div>

            <div *ngIf="authService.isAuthenticated()" class="flex items-center gap-2">
              <span class="text-amber-400 font-bold hidden sm:inline text-xs flex items-center gap-1">
                <span class="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                مرحباً، {{ authService.currentUser()?.name }}
              </span>
              <a *ngIf="authService.isSuperadmin() || authService.currentUser()?.role === 'editor' || authService.currentUser()?.role === 'journalist'" routerLink="/admin" class="bg-red-600 hover:bg-red-700 text-white px-2.5 py-1 rounded-md text-[11px] font-black transition-colors shadow-xs">
                لوحة التحكم
              </a>
              <button (click)="authService.logout()" class="bg-rose-600/90 hover:bg-rose-700 text-white px-2.5 py-1 rounded-md text-[11px] font-black transition-all flex items-center gap-1 shadow-xs border border-rose-500/40 cursor-pointer hover:scale-102">
                <svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>خروج</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. Main Masthead: Logo & Newspaper Identity -->
      <div class="max-w-7xl mx-auto px-4 py-4 sm:py-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <!-- Logo & Branding -->
        <a routerLink="/" class="flex items-center gap-3 group cursor-pointer text-right">
          <div class="w-12 h-12 sm:w-14 sm:h-14 bg-linear-to-br from-red-600 to-red-800 rounded-2xl flex items-center justify-center text-white font-black text-2xl sm:text-3xl shadow-lg border border-red-500/40 group-hover:scale-105 transition-transform shrink-0">
            م
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-2xl sm:text-3xl font-black tracking-tight text-white font-display flex items-center gap-1.5">
                <span>بوابة</span>
                <span class="text-red-500">المصري</span>
                <span class="text-stone-300">الإخباري</span>
              </h1>
              <span class="bg-red-950 text-red-400 border border-red-800 text-[10px] font-black px-2 py-0.5 rounded-full hidden sm:inline">
                العدد 842
              </span>
            </div>
            <p class="text-[11px] text-stone-400 font-serif">صوت الوطن والمواطن • صحيفة إلكترونية مصرية يومية شاملة</p>
          </div>
        </a>

        <!-- Middle / Live Status -->
        <div class="hidden lg:flex items-center gap-2 bg-stone-800/80 px-4 py-2 rounded-2xl border border-stone-700">
          <span class="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
          <div class="text-right">
            <span class="text-xs font-black text-white block">تغطية خاصة ومباشرة</span>
            <span class="text-[10px] text-stone-400">تحديثات إخبارية على مدار 24 ساعة</span>
          </div>
        </div>

        <!-- Search Bar -->
        <div class="w-full md:w-80 relative">
          <div class="flex items-center bg-stone-800/90 rounded-xl px-3 py-2 border border-stone-700 focus-within:border-red-500 transition-colors">
            <input
              type="text"
              [(ngModel)]="searchQuery"
              (keyup.enter)="onSearch()"
              placeholder="ابحث عن خبر، تقرير، أو كاتب..."
              class="bg-transparent border-none text-xs text-white placeholder-stone-400 focus:outline-hidden w-full text-right"
            />
            <button (click)="onSearch()" class="text-stone-400 hover:text-red-500 mr-2 cursor-pointer">
              🔍
            </button>
          </div>
        </div>
      </div>

      <!-- 3. Navigation Bar: Categories & Fact-Check Button -->
      <nav class="bg-red-700 text-white shadow-inner">
        <div class="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <ul class="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 text-xs font-bold scrollbar-none">
            <li>
              <a
                routerLink="/"
                routerLinkActive="bg-red-900 text-white"
                [routerLinkActiveOptions]="{ exact: true }"
                class="px-3 py-1.5 rounded-lg hover:bg-red-800 transition-colors whitespace-nowrap block"
              >
                الرئيسية
              </a>
            </li>
            <li *ngFor="let cat of categories">
              <a
                [routerLink]="['/category', cat.slug]"
                routerLinkActive="bg-red-900 text-white"
                class="px-3 py-1.5 rounded-lg hover:bg-red-800 transition-colors whitespace-nowrap block"
              >
                {{ cat.name }}
              </a>
            </li>
            <li>
              <a
                routerLink="/services"
                routerLinkActive="bg-red-900 text-white"
                class="px-3 py-1.5 rounded-lg hover:bg-red-800 transition-colors whitespace-nowrap block text-amber-200"
              >
                خدمات المواطن
              </a>
            </li>
            <li>
              <a
                routerLink="/sports"
                routerLinkActive="bg-red-900 text-white"
                class="px-3 py-1.5 rounded-lg hover:bg-red-800 transition-colors whitespace-nowrap block text-sky-200"
              >
                الرياضة والمباريات
              </a>
            </li>
            <li>
              <a
                routerLink="/"
                fragment="video-section"
                class="px-3 py-1.5 rounded-lg bg-red-900/60 hover:bg-red-800 text-amber-300 font-black transition-colors whitespace-nowrap flex items-center gap-1"
              >
                <span>🎥 المصري فيديو</span>
              </a>
            </li>
          </ul>

          <!-- Pinned "المصري فاكت" Button -->
          <a
            routerLink="/fact-check"
            class="shrink-0 bg-stone-950 hover:bg-black text-amber-400 px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-md border border-amber-500/40 transition-all hover:scale-103"
          >
            <span>🛡️ المصري فاكت</span>
            <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          </a>
        </div>
      </nav>

      <!-- 4. Breaking News Ticker Bar (الشريط العاجل الأحمر) -->
      <div *ngIf="breakingNews.length > 0" class="bg-red-600 text-white text-xs border-t border-red-500 shadow-md">
        <div class="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between gap-3">
          <div class="flex items-center gap-3 overflow-hidden flex-1">
            <!-- Badge -->
            <div class="bg-white text-red-700 text-[11px] font-black px-2.5 py-0.5 rounded-md shrink-0 flex items-center gap-1 shadow-xs">
              <span class="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
              <span>عاجل</span>
            </div>

            <!-- Ticker Title -->
            <a
              *ngIf="currentBreakingItem"
              [routerLink]="currentBreakingItem.articleId ? ['/article', currentBreakingItem.articleId] : []"
              class="font-bold text-xs hover:underline truncate cursor-pointer transition-opacity duration-300"
            >
              {{ currentBreakingItem.title }}
            </a>
          </div>

          <!-- Controls (Next, Prev, Count) -->
          <div class="flex items-center gap-2 shrink-0 text-[11px] text-red-100">
            <span>{{ currentBreakingIndex + 1 }} من {{ breakingNews.length }}</span>
            <button (click)="prevBreaking()" class="hover:bg-red-700 p-1 rounded cursor-pointer" title="السابق">
              ◀
            </button>
            <button (click)="nextBreaking()" class="hover:bg-red-700 p-1 rounded cursor-pointer" title="التالي">
              ▶
            </button>
          </div>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent implements OnInit, OnDestroy {
  authService = inject(AuthService);
  private router = inject(Router);

  todayDateFormatted = new Intl.DateTimeFormat('ar-EG', { dateStyle: 'full' }).format(new Date());
  searchQuery = '';

  // Data from seed
  categories: Category[] = storageService.getCategories();
  breakingNews: BreakingNewsItem[] = storageService.getBreakingNews();
  currentBreakingIndex = 0;
  private breakingTimer: any;

  // Ticker Quick Data
  gold21Price = GOLD_PRICES[1]?.sellPrice || 3450;
  usdPrice = CURRENCY_RATES[0]?.sellPrice || 48.75;
  cairoTemp = WEATHER_FORECAST[0]?.temp || 32;
  prayerDhuhr = PRAYER_TIMES[0]?.dhuhr || '11:58 ص';

  get currentBreakingItem(): BreakingNewsItem | null {
    return this.breakingNews[this.currentBreakingIndex] || null;
  }

  ngOnInit() {
    this.startBreakingRotation();
  }

  ngOnDestroy() {
    if (this.breakingTimer) {
      clearInterval(this.breakingTimer);
    }
  }

  private startBreakingRotation() {
    if (this.breakingNews.length <= 1) return;
    this.breakingTimer = setInterval(() => {
      this.nextBreaking();
    }, 6000);
  }

  nextBreaking() {
    this.currentBreakingIndex = (this.currentBreakingIndex + 1) % this.breakingNews.length;
  }

  prevBreaking() {
    this.currentBreakingIndex = (this.currentBreakingIndex - 1 + this.breakingNews.length) % this.breakingNews.length;
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery.trim() } });
    }
  }
}
