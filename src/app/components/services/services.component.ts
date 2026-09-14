import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GoldPriceItem, CurrencyRateItem, WeatherItem, PrayerTimeItem } from '../../models';
import { GOLD_PRICES, CURRENCY_RATES, WEATHER_FORECAST, PRAYER_TIMES } from '../../data/seed-data';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans" dir="rtl">
      <!-- Title Header Banner -->
      <div class="bg-linear-to-l from-stone-900 to-stone-800 text-white rounded-3xl p-8 mb-8 shadow-md border border-stone-700 text-right">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="bg-red-600 text-white text-xs font-black px-2.5 py-0.5 rounded">
                خدمات حية لحظية
              </span>
              <span class="text-stone-300 text-xs">تحديث مباشر لأسواق الصاغة والبنوك المصرية</span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-black font-display text-white">
              بوابة الخدمات اليومية | الذهب والعملات والطقس ومواقيت الصلاة
            </h1>
            <p class="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
              دليلك الشامل والمحدث لأسعار الذهب عيار 21 و 24، أسعار صرف الدولار والعملات العربية والأجنبية، حاسبة المصنعية الذكية، ومواقيت الصلاة بجميع محافظات الجمهورية.
            </p>
          </div>

          <div class="bg-stone-950/80 p-4 rounded-2xl border border-stone-700 text-xs shrink-0">
            <span class="text-stone-400 block mb-1">مؤشر البورصة المصرية EGX30</span>
            <strong class="text-emerald-400 text-base font-bold font-mono">30,420.5 نقطة (+1.25%)</strong>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <div class="flex items-center gap-2 mt-6 pt-4 border-t border-stone-700 overflow-x-auto scrollbar-none">
          <button
            (click)="activeTab = 'gold'"
            [class.bg-amber-400]="activeTab === 'gold'"
            [class.text-stone-950]="activeTab === 'gold'"
            [class.bg-stone-800]="activeTab !== 'gold'"
            [class.text-white]="activeTab !== 'gold'"
            class="px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            🪙 أسعار الذهب والحاسبة
          </button>
          <button
            (click)="activeTab = 'currency'"
            [class.bg-amber-400]="activeTab === 'currency'"
            [class.text-stone-950]="activeTab === 'currency'"
            [class.bg-stone-800]="activeTab !== 'currency'"
            [class.text-white]="activeTab !== 'currency'"
            class="px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            💵 أسعار العملات والمحول
          </button>
          <button
            (click)="activeTab = 'weather'"
            [class.bg-amber-400]="activeTab === 'weather'"
            [class.text-stone-950]="activeTab === 'weather'"
            [class.bg-stone-800]="activeTab !== 'weather'"
            [class.text-white]="activeTab !== 'weather'"
            class="px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            ☀️ طقس 27 محافظة
          </button>
          <button
            (click)="activeTab = 'prayer'"
            [class.bg-amber-400]="activeTab === 'prayer'"
            [class.text-stone-950]="activeTab === 'prayer'"
            [class.bg-stone-800]="activeTab !== 'prayer'"
            [class.text-white]="activeTab !== 'prayer'"
            class="px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            🕌 مواقيت الصلاة
          </button>
        </div>
      </div>

      <!-- Tab 1: Gold Prices & Calculator -->
      <div *ngIf="activeTab === 'gold'" class="space-y-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- Prices Table (Span 7) -->
          <div class="lg:col-span-7 bg-white rounded-3xl p-6 border border-stone-200 shadow-xs text-right">
            <h2 class="text-lg font-black text-stone-900 mb-4 pb-2 border-b border-stone-200 flex items-center justify-between">
              <span>أسعار الذهب الآن بمحلات الصاغة</span>
              <span class="text-xs text-stone-500 font-normal">دون احتساب المصنعية</span>
            </h2>
            <div class="overflow-x-auto">
              <table class="w-full text-right text-xs">
                <thead>
                  <tr class="bg-amber-50 text-amber-950 font-bold border-b border-amber-200">
                    <th class="p-3">العيار</th>
                    <th class="p-3">سعر الشراء</th>
                    <th class="p-3">سعر البيع</th>
                    <th class="p-3">حركة السعر</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let g of goldPrices" class="border-b border-stone-100 hover:bg-stone-50">
                    <td class="p-3 font-bold text-stone-800">{{ g.karat }}</td>
                    <td class="p-3 font-bold text-stone-900 font-mono">{{ g.buyPrice | number }} ج.م</td>
                    <td class="p-3 font-bold text-stone-900 font-mono">{{ g.sellPrice | number }} ج.م</td>
                    <td class="p-3 text-emerald-600 font-bold">▲ مستقر مع ارتفاع طفيف</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Gold Calculator (Span 5) -->
          <div class="lg:col-span-5 bg-amber-50/70 rounded-3xl p-6 border border-amber-200 shadow-xs text-right space-y-4">
            <h3 class="text-base font-black text-amber-950 pb-2 border-b border-amber-200">
              🧮 حاسبة شراء الذهب والمصنعية
            </h3>

            <div>
              <label class="block text-xs font-bold text-stone-700 mb-1">اختر العيار:</label>
              <select
                [(ngModel)]="selectedKaratPrice"
                class="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs font-bold"
              >
                <option *ngFor="let g of goldPrices" [value]="g.sellPrice">{{ g.karat }} ({{ g.sellPrice | number }} ج.م)</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold text-stone-700 mb-1">الوزن بالجرام:</label>
              <input
                type="number"
                [(ngModel)]="goldGrams"
                min="1"
                class="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs font-bold"
              />
            </div>

            <div>
              <label class="block text-xs font-bold text-stone-700 mb-1">متوسط المصنعية للجرام (ج.م):</label>
              <input
                type="number"
                [(ngModel)]="goldCraftFee"
                min="0"
                class="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs font-bold"
              />
            </div>

            <div class="bg-white p-4 rounded-2xl border border-amber-200 mt-4 text-center">
              <span class="text-xs text-stone-500 block">إجمالي السعر التقديري شامل المصنعية:</span>
              <strong class="text-2xl font-black text-amber-700 font-mono block mt-1">
                {{ totalGoldCalculated | number }} ج.م
              </strong>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab 2: Currency Rates & Converter -->
      <div *ngIf="activeTab === 'currency'" class="space-y-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- Currency Table (Span 7) -->
          <div class="lg:col-span-7 bg-white rounded-3xl p-6 border border-stone-200 shadow-xs text-right">
            <h2 class="text-lg font-black text-stone-900 mb-4 pb-2 border-b border-stone-200">
              أسعار صرف العملات مقابل الجنيه المصري
            </h2>
            <div class="overflow-x-auto">
              <table class="w-full text-right text-xs">
                <thead>
                  <tr class="bg-emerald-50 text-emerald-950 font-bold border-b border-emerald-200">
                    <th class="p-3">العملة</th>
                    <th class="p-3">الكود</th>
                    <th class="p-3">سعر الشراء</th>
                    <th class="p-3">سعر البيع</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let c of currencyRates" class="border-b border-stone-100 hover:bg-stone-50">
                    <td class="p-3 font-bold text-stone-800">{{ c.flag }} {{ c.currency }}</td>
                    <td class="p-3 font-mono font-bold text-stone-500">{{ c.code }}</td>
                    <td class="p-3 font-bold text-stone-900 font-mono">{{ c.buyPrice }} ج.م</td>
                    <td class="p-3 font-bold text-stone-900 font-mono">{{ c.sellPrice }} ج.م</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Currency Converter (Span 5) -->
          <div class="lg:col-span-5 bg-emerald-50/70 rounded-3xl p-6 border border-emerald-200 shadow-xs text-right space-y-4">
            <h3 class="text-base font-black text-emerald-950 pb-2 border-b border-emerald-200">
              💱 محول العملات الأجنبية للجنيه المصري
            </h3>

            <div>
              <label class="block text-xs font-bold text-stone-700 mb-1">المبلغ بالعملة الأجنبية:</label>
              <input
                type="number"
                [(ngModel)]="currencyAmount"
                min="1"
                class="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs font-bold"
              />
            </div>

            <div>
              <label class="block text-xs font-bold text-stone-700 mb-1">اختر العملة:</label>
              <select
                [(ngModel)]="selectedCurrencyRate"
                class="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs font-bold"
              >
                <option *ngFor="let c of currencyRates" [value]="c.sellPrice">
                  {{ c.flag }} {{ c.currency }} ({{ c.sellPrice }} ج.م)
                </option>
              </select>
            </div>

            <div class="bg-white p-4 rounded-2xl border border-emerald-200 mt-4 text-center">
              <span class="text-xs text-stone-500 block">القيمة الإجمالية بالجنيه المصري:</span>
              <strong class="text-2xl font-black text-emerald-700 font-mono block mt-1">
                {{ totalCurrencyConverted | number:'1.2-2' }} ج.م
              </strong>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab 3: Weather -->
      <div *ngIf="activeTab === 'weather'" class="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs text-right">
        <h2 class="text-xl font-black text-stone-900 mb-6 pb-2 border-b border-stone-200">
          حالة الطقس ودرجات الحرارة في محافظات مصر
        </h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div *ngFor="let w of weatherList" class="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-center space-y-1">
            <span class="text-2xl block mb-1">{{ w.conditionIcon }}</span>
            <strong class="text-sm font-black text-stone-900 block">{{ w.city }}</strong>
            <span class="text-xs text-stone-500 block">{{ w.condition }}</span>
            <div class="pt-2 border-t border-stone-200 mt-2 font-mono">
              <span class="text-base font-black text-stone-900">{{ w.temp }}°م</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab 4: Prayer Times -->
      <div *ngIf="activeTab === 'prayer'" class="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs text-right">
        <h2 class="text-xl font-black text-stone-900 mb-6 pb-2 border-b border-stone-200">
          مواقيت الصلاة اليوم لمدن ومحافظات الجمهورية
        </h2>
        <div class="overflow-x-auto">
          <table class="w-full text-right text-xs">
            <thead>
              <tr class="bg-sky-50 text-sky-950 font-bold border-b border-sky-200">
                <th class="p-3">المدينة / المحافظة</th>
                <th class="p-3">الفجر</th>
                <th class="p-3">الشروق</th>
                <th class="p-3">الظهر</th>
                <th class="p-3">العصر</th>
                <th class="p-3">المغرب</th>
                <th class="p-3">العشاء</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let p of prayerTimesList" class="border-b border-stone-100 hover:bg-stone-50">
                <td class="p-3 font-bold text-stone-800">{{ p.city }}</td>
                <td class="p-3 font-mono">{{ p.fajr }}</td>
                <td class="p-3 font-mono">{{ p.sunrise }}</td>
                <td class="p-3 font-mono font-bold text-sky-800 bg-sky-50/50">{{ p.dhuhr }}</td>
                <td class="p-3 font-mono">{{ p.asr }}</td>
                <td class="p-3 font-mono">{{ p.maghrib }}</td>
                <td class="p-3 font-mono">{{ p.isha }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class ServicesComponent {
  activeTab: 'gold' | 'currency' | 'weather' | 'prayer' = 'gold';

  goldPrices: GoldPriceItem[] = GOLD_PRICES;
  currencyRates: CurrencyRateItem[] = CURRENCY_RATES;
  weatherList: WeatherItem[] = WEATHER_FORECAST;
  prayerTimesList: PrayerTimeItem[] = PRAYER_TIMES;

  // Gold Calculator
  selectedKaratPrice = GOLD_PRICES[1]?.sellPrice || 3450;
  goldGrams = 10;
  goldCraftFee = 120;

  get totalGoldCalculated(): number {
    return this.goldGrams * (Number(this.selectedKaratPrice) + Number(this.goldCraftFee));
  }

  // Currency Converter
  currencyAmount = 100;
  selectedCurrencyRate = CURRENCY_RATES[0]?.sellPrice || 48.75;

  get totalCurrencyConverted(): number {
    return this.currencyAmount * Number(this.selectedCurrencyRate);
  }
}
