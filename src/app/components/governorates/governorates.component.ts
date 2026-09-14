import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { storageService } from '../../services/storage.service';
import { Article, Governorate } from '../../models';
import { GOVERNORATES_LIST } from '../../data/seed-data';

@Component({
  selector: 'app-governorates',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans" dir="rtl">
      <!-- Header Banner -->
      <div class="bg-linear-to-l from-amber-950 via-stone-900 to-black text-white rounded-3xl p-8 mb-8 border border-amber-800 shadow-lg text-right">
        <div class="flex items-center gap-2 mb-2">
          <span class="bg-amber-500 text-stone-950 text-xs font-black px-2.5 py-0.5 rounded">
            27 محافظة
          </span>
          <span class="text-amber-300 text-xs">تغطية ميدانية حصرية من مراسلينا في كافة الأقاليم</span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-black font-display text-white">
          نبض محافظات مصر | أخبار الصعيد والدلتا والقناة وسيناء
        </h1>
        <p class="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
          متابعة مستمرة للمشروعات القومية والتنموية، مشكلات المواطنين، حركة الأسواق، والأنشطة المحلية في كل قرية ومدينة مصرية.
        </p>

        <!-- Regions Filter -->
        <div class="flex items-center gap-2 mt-6 pt-4 border-t border-amber-800/80 overflow-x-auto scrollbar-none">
          <button
            *ngFor="let reg of regions"
            (click)="selectedRegion = reg"
            [class.bg-amber-500]="selectedRegion === reg"
            [class.text-stone-950]="selectedRegion === reg"
            [class.bg-stone-800]="selectedRegion !== reg"
            [class.text-white]="selectedRegion !== reg"
            class="px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer"
          >
            {{ reg }}
          </button>
        </div>
      </div>

      <!-- Governorates Pills Grid -->
      <div class="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs mb-10 text-right">
        <h3 class="text-sm font-black text-stone-700 mb-3">اختر محافظة لتصفح أخبارها:</h3>
        <div class="flex flex-wrap gap-2">
          <button
            *ngFor="let g of filteredGovs"
            (click)="selectedGov = g.name"
            [class.bg-amber-600]="selectedGov === g.name"
            [class.text-white]="selectedGov === g.name"
            [class.bg-stone-100]="selectedGov !== g.name"
            [class.text-stone-700]="selectedGov !== g.name"
            class="text-xs font-bold px-3 py-1.5 rounded-xl transition-colors cursor-pointer hover:bg-amber-500 hover:text-white"
          >
            📍 {{ g.name }}
          </button>
        </div>
      </div>

      <!-- Governorates News Grid -->
      <section class="text-right">
        <h2 class="text-xl font-black text-stone-900 pb-3 border-b border-stone-200 mb-6 flex items-center justify-between">
          <span>أخبار المحافظات المختارة ({{ selectedGov ? selectedGov : selectedRegion }})</span>
          <span class="text-xs text-stone-500 font-normal">{{ displayArticles.length }} خبر منشور</span>
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            *ngFor="let item of displayArticles"
            [routerLink]="['/article', item.id]"
            class="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div class="relative h-44 overflow-hidden">
                <img [src]="item.featuredImage" [alt]="item.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span class="absolute top-3 right-3 bg-amber-600 text-white text-xs font-bold px-2.5 py-0.5 rounded shadow-sm">
                  {{ item.governorate || 'المحافظات' }}
                </span>
              </div>
              <div class="p-5">
                <h3 class="font-bold text-sm sm:text-base text-stone-900 group-hover:text-amber-700 transition-colors leading-snug mb-2">
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
export class GovernoratesComponent implements OnInit {
  governorates: Governorate[] = GOVERNORATES_LIST;
  articles: Article[] = [];
  regions = ['الكل', 'القاهرة الكبرى', 'وجه بحري', 'القناة وسيناء', 'الصعيد', 'الحدود'];
  selectedRegion = 'الكل';
  selectedGov = '';

  ngOnInit() {
    this.articles = storageService.getArticles().filter(a => a.governorate || a.categoryId === 'governorates');
  }

  get filteredGovs(): Governorate[] {
    if (this.selectedRegion === 'الكل') return this.governorates;
    return this.governorates.filter(g => g.region === this.selectedRegion);
  }

  get displayArticles(): Article[] {
    if (this.selectedGov) {
      const match = this.articles.filter(a => a.governorate === this.selectedGov);
      return match.length > 0 ? match : this.articles;
    }
    return this.articles;
  }
}
