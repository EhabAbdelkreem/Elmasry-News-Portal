import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { storageService } from '../../services/storage.service';
import { Article } from '../../models';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans" dir="rtl">
      <!-- Search Input Box -->
      <div class="bg-white rounded-3xl p-8 mb-8 border border-stone-200 shadow-xs text-right">
        <h1 class="text-2xl font-black text-stone-900 mb-4 font-display">
          محرك البحث الإخباري المتقدم
        </h1>
        <div class="flex items-center bg-stone-100 rounded-2xl px-4 py-3 border border-stone-300 focus-within:border-red-600 transition-colors">
          <input
            type="text"
            [(ngModel)]="query"
            (keyup.enter)="onSearch()"
            placeholder="اكتب كلمة البحث (اسم شخص، مدينة، موضوع، كاتب)..."
            class="bg-transparent border-none text-sm text-stone-900 placeholder-stone-400 focus:outline-hidden w-full text-right"
          />
          <button (click)="onSearch()" class="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-5 py-2 rounded-xl mr-3 cursor-pointer">
            بحث
          </button>
        </div>
        <p class="text-xs text-stone-400 mt-2">
          تم العثور على ({{ results.length }}) نتيجة بحث مطابقة
        </p>
      </div>

      <!-- Results Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          *ngFor="let item of results"
          [routerLink]="['/article', item.id]"
          class="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div class="relative h-44 overflow-hidden">
              <img [src]="item.featuredImage" [alt]="item.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <span class="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2.5 py-0.5 rounded shadow-sm">
                {{ item.categoryName }}
              </span>
            </div>
            <div class="p-5 text-right">
              <h3 class="font-bold text-base text-stone-900 group-hover:text-red-600 transition-colors leading-snug mb-2">
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
    </div>
  `
})
export class SearchComponent implements OnInit {
  query = '';
  results: Article[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.query = params['q'] || '';
      this.onSearch();
    });
  }

  onSearch() {
    const q = this.query.trim().toLowerCase();
    const all = storageService.getArticles();
    if (!q) {
      this.results = all.slice(0, 9);
      return;
    }
    this.results = all.filter(a =>
      a.title.toLowerCase().includes(q) ||
      (a.subtitle && a.subtitle.toLowerCase().includes(q)) ||
      (a.excerpt && a.excerpt.toLowerCase().includes(q)) ||
      (a.content && a.content.toLowerCase().includes(q)) ||
      a.authorName.toLowerCase().includes(q) ||
      (a.tags && a.tags.some(t => t.toLowerCase().includes(q)))
    );
  }
}
