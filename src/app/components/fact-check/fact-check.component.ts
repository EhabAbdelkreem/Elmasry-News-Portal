import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { storageService } from '../../services/storage.service';
import { Article } from '../../models';

@Component({
  selector: 'app-fact-check',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans" dir="rtl">
      <!-- Top Banner Header -->
      <div class="bg-gradient-to-l from-emerald-950 via-stone-900 to-black text-white p-8 sm:p-10 rounded-3xl mb-8 shadow-xl border border-emerald-800 text-right">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="bg-amber-400 text-stone-950 text-xs font-black px-3 py-1 rounded-lg">
                🛡️ وحدة المصري فاكت
              </span>
              <span class="text-xs text-emerald-300">منظومة تدقيق المعلومات ومكافحة التزييف الرقمي</span>
            </div>
            <h1 class="text-3xl sm:text-4xl font-black text-white mb-2 font-display">
              رصد وتفنيد الشائعات والأخبار المضللة
            </h1>
            <p class="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
              فريق استقصائي يعمل بأحدث تقنيات التحقق البصري والرقمي لمراجعة الادعاءات والصور المتداولة عبر منصات التواصل وتقديم الحقيقة الرسمية الموثقة بالمصادر.
            </p>
          </div>

          <div class="bg-emerald-900/60 p-4 rounded-2xl border border-emerald-700/60 text-xs shrink-0 space-y-2">
            <div class="flex items-center justify-between gap-4">
              <span class="text-stone-300">إجمالي الادعاءات المدققة:</span>
              <span class="font-black text-amber-400 text-sm font-mono">{{ factChecks.length }}</span>
            </div>
            <div class="flex items-center justify-between gap-4">
              <span class="text-stone-300">نسبة الشائعات المفبركة:</span>
              <span class="font-black text-red-400 text-sm font-mono">75%</span>
            </div>
          </div>
        </div>

        <!-- Filter Buttons -->
        <div class="flex items-center gap-2 mt-8 pt-4 border-t border-emerald-800/80 overflow-x-auto scrollbar-none">
          <button
            (click)="filter = 'all'"
            [class.bg-amber-400]="filter === 'all'"
            [class.text-stone-950]="filter === 'all'"
            [class.bg-stone-800]="filter !== 'all'"
            [class.text-white]="filter !== 'all'"
            class="px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            جميع الادعاءات
          </button>
          <button
            (click)="filter = 'false'"
            [class.bg-red-600]="filter === 'false'"
            [class.text-white]="filter === 'false'"
            [class.bg-stone-800]="filter !== 'false'"
            [class.text-white]="filter !== 'false'"
            class="px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            ❌ مفبرك وغير صحيح
          </button>
          <button
            (click)="filter = 'misleading'"
            [class.bg-amber-600]="filter === 'misleading'"
            [class.text-white]="filter === 'misleading'"
            [class.bg-stone-800]="filter !== 'misleading'"
            [class.text-white]="filter !== 'misleading'"
            class="px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            ⚠️ مضلل وسياق مجتزأ
          </button>
          <button
            (click)="filter = 'true'"
            [class.bg-emerald-600]="filter === 'true'"
            [class.text-white]="filter === 'true'"
            [class.bg-stone-800]="filter !== 'true'"
            [class.text-white]="filter !== 'true'"
            class="px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            ✓ صحيح ومؤكد
          </button>
        </div>
      </div>

      <!-- Fact Checks Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          *ngFor="let item of filteredList"
          [routerLink]="['/article', item.id]"
          class="bg-white rounded-3xl border border-stone-200 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group cursor-pointer"
        >
          <div>
            <div class="relative h-48 overflow-hidden">
              <img
                [src]="item.featuredImage"
                [alt]="item.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div class="absolute top-3 right-3">
                <span
                  [class.bg-red-600]="item.factCheckData?.verdict === 'false'"
                  [class.bg-amber-600]="item.factCheckData?.verdict === 'misleading'"
                  [class.bg-emerald-600]="item.factCheckData?.verdict === 'true'"
                  class="text-white text-xs font-black px-3 py-1 rounded-lg shadow-sm"
                >
                  {{ getVerdictLabel(item.factCheckData?.verdict) }}
                </span>
              </div>
            </div>

            <div class="p-5 text-right space-y-3">
              <h3 class="font-black text-base text-stone-900 group-hover:text-emerald-700 transition-colors leading-snug">
                {{ item.title }}
              </h3>

              <div *ngIf="item.factCheckData" class="space-y-2">
                <!-- Claim Box -->
                <div class="bg-red-50/80 border-r-4 border-red-500 p-3 rounded-l-xl text-xs">
                  <span class="font-bold text-red-800 block mb-1">الادعاء المتداول:</span>
                  <p class="text-stone-700">{{ item.factCheckData.claim }}</p>
                </div>

                <!-- Truth Box -->
                <div class="bg-emerald-50/80 border-r-4 border-emerald-600 p-3 rounded-l-xl text-xs">
                  <span class="font-bold text-emerald-800 block mb-1">الحقيقة الرسمية:</span>
                  <p class="text-stone-700">{{ item.factCheckData.truth }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="p-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <span>{{ formatDate(item.publishedAt) }}</span>
            <span class="text-emerald-700 font-bold group-hover:translate-x-[-4px] transition-transform">
              عرض التقرير الكامل والأدلة ←
            </span>
          </div>
        </div>
      </div>

      <!-- Report a Rumor Box -->
      <div class="mt-12 bg-stone-900 text-white rounded-3xl p-6 sm:p-8 border border-stone-800 text-right">
        <div class="max-w-2xl mx-auto space-y-4">
          <div class="text-center">
            <span class="bg-amber-400 text-stone-950 text-xs font-black px-3 py-0.5 rounded-md">خدمة الجمهور</span>
            <h3 class="text-xl sm:text-2xl font-black mt-2">هل صادفك خبر تشك في صحته؟</h3>
            <p class="text-xs text-stone-400 mt-1">أرسل لنا الرابط أو نص الادعاء وسيقوم فريق التحرير بالتحقق منه فوراً.</p>
          </div>

          <form (submit)="onSubmitRumor($event)" class="space-y-3">
            <input
              type="text"
              [(ngModel)]="rumorUrl"
              name="url"
              placeholder="ضع رابط الخبر أو صفحة المنشور..."
              class="w-full bg-stone-800 border border-stone-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-stone-400 focus:outline-hidden focus:border-amber-400"
              required
            />
            <textarea
              [(ngModel)]="rumorNotes"
              name="notes"
              rows="2"
              placeholder="اكتب ملاحظاتك أو نص الشائعة..."
              class="w-full bg-stone-800 border border-stone-700 rounded-xl px-4 py-2 text-xs text-white placeholder-stone-400 focus:outline-hidden focus:border-amber-400"
            ></textarea>
            <button
              type="submit"
              class="w-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs py-3 rounded-xl transition-colors cursor-pointer"
            >
              {{ rumorSubmitted ? '✓ تم استلام البلاغ وجاري التدقيق!' : 'إرسال للتدقيق والتحقق' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  `
})
export class FactCheckComponent implements OnInit {
  factChecks: Article[] = [];
  filter: 'all' | 'false' | 'misleading' | 'true' = 'all';

  rumorUrl = '';
  rumorNotes = '';
  rumorSubmitted = false;

  ngOnInit() {
    this.factChecks = storageService.getArticles().filter(a => a.isFactCheck || a.categoryId === 'factcheck');
  }

  get filteredList(): Article[] {
    if (this.filter === 'all') return this.factChecks;
    return this.factChecks.filter(a => a.factCheckData?.verdict === this.filter);
  }

  getVerdictLabel(verdict?: string): string {
    switch (verdict) {
      case 'false': return '❌ مفبرك وغير صحيح';
      case 'true': return '✓ صحيح ومؤكد';
      case 'misleading': return '⚠️ مضلل وسياق مجتزأ';
      default: return 'تحت التدقيق';
    }
  }

  formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString('ar-EG', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  onSubmitRumor(e: Event) {
    e.preventDefault();
    if (!this.rumorUrl.trim()) return;
    this.rumorSubmitted = true;
    setTimeout(() => {
      this.rumorSubmitted = false;
      this.rumorUrl = '';
      this.rumorNotes = '';
    }, 4000);
  }
}
