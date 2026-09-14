import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { storageService } from '../../services/storage.service';
import { Article, MatchItem, LeagueStandingItem } from '../../models';
import { MATCHES_SCHEDULE, LEAGUE_STANDINGS } from '../../data/seed-data';

@Component({
  selector: 'app-sports',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans" dir="rtl">
      <!-- Header Banner -->
      <div class="bg-gradient-to-l from-sky-950 via-slate-900 to-stone-900 text-white rounded-3xl p-8 mb-8 border border-sky-800 shadow-lg text-right">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="bg-sky-500 text-stone-950 text-xs font-black px-2.5 py-0.5 rounded">
                مركز الرياضة والمباريات
              </span>
              <span class="text-sky-300 text-xs">الدوري المصري الممتاز • دوري أبطال إفريقيا • المحترفون</span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-black font-display text-white">
              بوابة الرياضة والملاعب | النتائج والمواعيد وجدول الترتيب
            </h1>
            <p class="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
              تغطية شاملة لكل صغيرة وكبيرة في ملاعب كرة القدم المصرية والإفريقية والعالمية، مواعيد مباريات الأهلي والزمالك، وجدول ترتيب الدوري لحظة بلحظة.
            </p>
          </div>

          <div class="flex items-center gap-3 bg-sky-900/60 p-4 rounded-2xl border border-sky-700 text-xs shrink-0">
            <span class="text-2xl">🏆</span>
            <div>
              <span class="text-sky-200 block">متصدر الدوري المصري الممتاز</span>
              <strong class="text-white text-sm font-bold font-display">النادي الأهلي (70 نقطة)</strong>
            </div>
          </div>
        </div>

        <!-- Filter buttons -->
        <div class="flex items-center gap-2 mt-6 pt-4 border-t border-sky-800/80 overflow-x-auto scrollbar-none">
          <button
            (click)="filter = 'all'"
            [class.bg-sky-500]="filter === 'all'"
            [class.text-stone-950]="filter === 'all'"
            [class.bg-stone-800]="filter !== 'all'"
            [class.text-white]="filter !== 'all'"
            class="px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            كل الأخبار الرياضية
          </button>
          <button
            (click)="filter = 'ahly'"
            [class.bg-red-600]="filter === 'ahly'"
            [class.text-white]="filter === 'ahly'"
            [class.bg-stone-800]="filter !== 'ahly'"
            [class.text-white]="filter !== 'ahly'"
            class="px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            🦅 أخبار النادي الأهلي
          </button>
          <button
            (click)="filter = 'zamalek'"
            [class.bg-white]="filter === 'zamalek'"
            [class.text-red-600]="filter === 'zamalek'"
            [class.bg-stone-800]="filter !== 'zamalek'"
            [class.text-white]="filter !== 'zamalek'"
            class="px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            🏹 أخبار نادي الزمالك
          </button>
        </div>
      </div>

      <!-- Main Layout: Matches & Standings -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <!-- Upcoming Matches (Span 7) -->
        <div class="lg:col-span-7 space-y-4 text-right">
          <h2 class="text-lg font-black text-stone-900 pb-2 border-b border-stone-200 flex items-center justify-between">
            <span>⚽ جدول المباريات القادمة</span>
            <span class="text-xs text-stone-500 font-normal">الدوري المصري والبطولات القارية</span>
          </h2>

          <div class="space-y-3">
            <div
              *ngFor="let m of matches"
              class="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs flex items-center justify-between"
            >
              <div class="flex items-center gap-2 w-1/3 text-right">
                <span class="font-bold text-sm text-stone-900 truncate">{{ m.homeTeam }}</span>
              </div>

              <div class="text-center px-4">
                <span class="bg-sky-100 text-sky-900 text-xs font-black px-3 py-1 rounded-full font-mono">
                  {{ m.timeOrMinute }}
                </span>
                <span class="block text-[11px] text-stone-500 mt-1">{{ m.league }}</span>
              </div>

              <div class="flex items-center gap-2 w-1/3 justify-end text-left">
                <span class="font-bold text-sm text-stone-900 truncate">{{ m.awayTeam }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Standings Table (Span 5) -->
        <div class="lg:col-span-5 bg-white rounded-3xl p-6 border border-stone-200 shadow-xs text-right">
          <h2 class="text-lg font-black text-stone-900 pb-2 border-b border-stone-200 mb-4">
            🏆 جدول ترتيب الدوري المصري
          </h2>

          <div class="overflow-x-auto">
            <table class="w-full text-right text-xs">
              <thead>
                <tr class="bg-stone-50 text-stone-600 font-bold border-b border-stone-200">
                  <th class="p-2">#</th>
                  <th class="p-2">النادي</th>
                  <th class="p-2">لعب</th>
                  <th class="p-2">فاز</th>
                  <th class="p-2">نقاط</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  *ngFor="let s of standings"
                  [class.bg-amber-50]="s.rank === 1"
                  class="border-b border-stone-100 hover:bg-stone-50"
                >
                  <td class="p-2 font-bold" [class.text-amber-600]="s.rank === 1">{{ s.rank }}</td>
                  <td class="p-2 font-bold text-stone-900">{{ s.team }}</td>
                  <td class="p-2 font-mono text-stone-600">{{ s.played }}</td>
                  <td class="p-2 font-mono text-stone-600">{{ s.won }}</td>
                  <td class="p-2 font-mono font-black text-stone-900">{{ s.points }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Sports Articles Grid -->
      <section class="text-right">
        <h2 class="text-xl font-black text-stone-900 pb-3 border-b border-stone-200 mb-6">
          أحدث التقارير والأخبار الرياضية
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            *ngFor="let item of filteredArticles"
            [routerLink]="['/article', item.id]"
            class="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div class="relative h-44 overflow-hidden">
                <img [src]="item.featuredImage" [alt]="item.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span class="absolute top-3 right-3 bg-sky-600 text-white text-xs font-bold px-2.5 py-0.5 rounded shadow-sm">
                  رياضة
                </span>
              </div>
              <div class="p-5">
                <h3 class="font-bold text-sm sm:text-base text-stone-900 group-hover:text-sky-700 transition-colors leading-snug mb-2">
                  {{ item.title }}
                </h3>
                <p class="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                  {{ item.subtitle || item.excerpt }}
                </p>
              </div>
            </div>

            <div class="p-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
              <span>{{ item.authorName }}</span>
              <span>👁️ {{ item.views | number }} قراءة</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class SportsComponent implements OnInit {
  matches: MatchItem[] = MATCHES_SCHEDULE;
  standings: LeagueStandingItem[] = LEAGUE_STANDINGS;
  sportsArticles: Article[] = [];
  filter: 'all' | 'ahly' | 'zamalek' = 'all';

  ngOnInit() {
    this.sportsArticles = storageService.getArticles().filter(a => a.categoryId === 'sports');
  }

  get filteredArticles(): Article[] {
    if (this.filter === 'ahly') {
      return this.sportsArticles.filter(a => a.tags?.includes('الأهلي') || a.title.includes('الأهلي'));
    }
    if (this.filter === 'zamalek') {
      return this.sportsArticles.filter(a => a.tags?.includes('الزمالك') || a.title.includes('الزمالك'));
    }
    return this.sportsArticles;
  }
}
