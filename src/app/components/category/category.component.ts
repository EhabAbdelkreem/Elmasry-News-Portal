import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { storageService } from '../../services/storage.service';
import { Article, Category } from '../../models';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans" dir="rtl">
      <!-- Category Header -->
      <div class="bg-white rounded-3xl p-8 mb-8 border border-stone-200 shadow-xs text-right">
        <div class="flex items-center gap-2 mb-2">
          <a routerLink="/" class="text-xs text-stone-400 hover:text-red-600">الرئيسية</a>
          <span class="text-stone-300">/</span>
          <span class="text-xs font-bold text-red-600">{{ currentCategory?.name || 'الأقسام' }}</span>
        </div>
        <h1 class="text-3xl font-black text-stone-900 font-display">
          {{ currentCategory?.name || 'أحدث الأخبار والتقارير' }}
        </h1>
        <p class="text-xs sm:text-sm text-stone-500 mt-2">
          {{ currentCategory?.description || 'متابعة حية وشاملة لأهم التطورات والتقارير الميدانية والمقالات.' }}
        </p>
      </div>

      <!-- Articles Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          *ngFor="let item of categoryArticles"
          [routerLink]="['/article', item.id]"
          class="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div class="relative h-48 overflow-hidden">
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
export class CategoryComponent implements OnInit {
  categorySlug = '';
  currentCategory: Category | undefined;
  categoryArticles: Article[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.categorySlug = params.get('slug') || '';
      this.loadCategory();
    });
  }

  loadCategory() {
    const allCategories = storageService.getCategories();
    this.currentCategory = allCategories.find(c => c.slug === this.categorySlug || c.id === this.categorySlug);

    const allArticles = storageService.getArticles();
    this.categoryArticles = allArticles.filter(a =>
      a.categoryId === this.categorySlug ||
      a.categorySlug === this.categorySlug ||
      a.categoryId === this.currentCategory?.id
    );

    if (this.categoryArticles.length === 0) {
      this.categoryArticles = allArticles.slice(0, 6);
    }
  }
}
