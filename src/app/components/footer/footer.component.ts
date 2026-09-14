import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { storageService } from '../../services/storage.service';
import { Category } from '../../models';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <footer class="bg-stone-950 text-stone-400 border-t-4 border-red-600 font-sans mt-16 pt-12 pb-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- 4 Columns Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-stone-800 text-right">
          <!-- Col 1: Brand & Slogan -->
          <div>
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md">
                م
              </div>
              <span class="text-xl font-black text-white font-display">
                بوابة <span class="text-red-500">المصري</span> الإخباري
              </span>
            </div>
            <p class="text-xs text-stone-400 leading-relaxed mb-4">
              صحيفة إلكترونية مصرية شاملة تصدر عن مؤسسة المصري للصحافة والنشر. تغطية لحظية للأخبار المحلية والعالمية، تحقيقات استقصائية، وخدمات المواطن على مدار الساعة.
            </p>
            <div class="text-[11px] text-stone-500 space-y-1">
              <p>📍 المقر الرئيسي: 12 شارع التحرير، الدقي، الجيزة، مصر</p>
              <p>📞 الهاتف التحريري: 02-33385500</p>
              <p>✉️ البريد الإلكتروني: contact&#64;almasry-news.eg</p>
            </div>
          </div>

          <!-- Col 2: Categories Links -->
          <div>
            <h4 class="text-white text-sm font-bold mb-4 pb-2 border-b border-red-600/50 inline-block">
              أقسام الموقع
            </h4>
            <ul class="grid grid-cols-2 gap-2 text-xs">
              <li *ngFor="let cat of categories">
                <a [routerLink]="['/category', cat.slug]" class="hover:text-red-400 transition-colors">
                  • {{ cat.name }}
                </a>
              </li>
              <li>
                <a routerLink="/fact-check" class="text-amber-400 hover:text-amber-300 font-bold">
                  • المصري فاكت
                </a>
              </li>
              <li>
                <a routerLink="/services" class="hover:text-red-400">
                  • الذهب والعملات
                </a>
              </li>
              <li>
                <a routerLink="/sports" class="hover:text-red-400">
                  • الدوري المصري
                </a>
              </li>
            </ul>
          </div>

          <!-- Col 3: Services & Interactive -->
          <div>
            <h4 class="text-white text-sm font-bold mb-4 pb-2 border-b border-red-600/50 inline-block">
              الخدمات التفاعلية
            </h4>
            <ul class="space-y-2 text-xs">
              <li>
                <a routerLink="/services" class="hover:text-amber-300 flex items-center gap-2">
                  <span>💰</span>
                  <span>أسعار الذهب لحظة بلحظة بالصاغة</span>
                </a>
              </li>
              <li>
                <a routerLink="/services" class="hover:text-emerald-300 flex items-center gap-2">
                  <span>💵</span>
                  <span>أسعار الدولار والعملات بالبنوك</span>
                </a>
              </li>
              <li>
                <a routerLink="/services" class="hover:text-sky-300 flex items-center gap-2">
                  <span>🕌</span>
                  <span>مواقيت الصلاة لجميع المحافظات</span>
                </a>
              </li>
              <li>
                <a routerLink="/governorates" class="hover:text-amber-300 flex items-center gap-2">
                  <span>🗺️</span>
                  <span>تغطيات المحافظات المصرية</span>
                </a>
              </li>
              <li>
                <a routerLink="/fact-check" class="hover:text-red-400 flex items-center gap-2 font-bold text-amber-400">
                  <span>🛡️</span>
                  <span>إبلاغ عن شائعة أو خبر مضلل</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- Col 4: Newsletter & Apps -->
          <div>
            <h4 class="text-white text-sm font-bold mb-4 pb-2 border-b border-red-600/50 inline-block">
              النشرة البريدية
            </h4>
            <p class="text-xs text-stone-400 mb-3">
              اشترك الآن ليصلك ملخص أهم الأخبار والتحقيقات الصحفية صباح كل يوم في بريدك الإلكتروني.
            </p>
            <form (submit)="onSubscribe($event)" class="space-y-2">
              <input
                type="email"
                [(ngModel)]="newsletterEmail"
                name="email"
                placeholder="أدخل بريدك الإلكتروني..."
                class="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-xs text-white placeholder-stone-500 focus:outline-hidden focus:border-red-500"
                required
              />
              <button
                type="submit"
                class="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-2 rounded-lg transition-colors cursor-pointer"
              >
                {{ subscribed ? '✓ تم الاشتراك بنجاح!' : 'اشترك مجاناً' }}
              </button>
            </form>

            <div class="mt-4 pt-4 border-t border-stone-900">
              <span class="text-[11px] text-stone-500 block mb-2">تابعنا عبر المنصات:</span>
              <div class="flex items-center gap-2 text-xs text-stone-300">
                <span class="bg-stone-900 p-1.5 rounded-md hover:bg-blue-600 cursor-pointer">فيسبوك</span>
                <span class="bg-stone-900 p-1.5 rounded-md hover:bg-sky-500 cursor-pointer">إكس / تويتر</span>
                <span class="bg-stone-900 p-1.5 rounded-md hover:bg-red-600 cursor-pointer">يوتيوب</span>
                <span class="bg-stone-900 p-1.5 rounded-md hover:bg-emerald-600 cursor-pointer">واتساب</span>
              </div>
            </div>
          </div>
        </div>

        <!-- هیئة الإدارة والتحرير العليا (بيانات إيهاب ومجدي فقط) -->
        <div class="my-8 p-5 sm:p-6 bg-stone-900/90 rounded-2xl border border-stone-800 text-right shadow-lg">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-stone-800 gap-2">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse"></span>
              <h4 class="text-white text-sm sm:text-base font-black tracking-tight">
                هيئة الإدارة والتحرير العليا
              </h4>
            </div>
            <span class="text-[11px] text-amber-400 bg-amber-950/40 px-3 py-1 rounded-full border border-amber-800/40 w-fit">
              الإدارة العامة والتحريرية المعتمدة
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- 1. م. إيهاب عبد الكريم -->
            <div class="bg-stone-950/90 p-4 rounded-xl border border-stone-800 hover:border-red-900/60 transition-colors flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-linear-to-br from-red-600 to-amber-600 text-white flex items-center justify-center font-black text-lg shrink-0 shadow-md">
                إ
              </div>
              <div class="space-y-1.5 flex-1">
                <div class="flex items-center justify-between">
                  <h5 class="text-white font-bold text-sm sm:text-base">م. إيهاب عبد الكريم</h5>
                  <span class="bg-red-950 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded-md border border-red-900/60">Superadmin</span>
                </div>
                <p class="text-amber-400 font-semibold text-xs">رئيس مجلس الإدارة ورئيس التحرير</p>
                <div class="text-stone-400 text-xs space-y-1 pt-1 border-t border-stone-900">
                  <p class="flex items-center gap-2">
                    <span class="text-stone-500">✉️ البريد:</span>
                    <a href="mailto:ehababdelkreem012@yahoo.com" class="text-stone-300 hover:text-amber-400 transition-colors">ehababdelkreem012&#64;yahoo.com</a>
                  </p>
                  <p class="flex items-center gap-2">
                    <span class="text-stone-500">📞 الهاتف:</span>
                    <a href="tel:01282407472" class="text-stone-300 hover:text-amber-400 transition-colors" dir="ltr">01282407472</a>
                  </p>
                </div>
              </div>
            </div>

            <!-- 2. أ. مجدي محمد أبو زيد -->
            <div class="bg-stone-950/90 p-4 rounded-xl border border-stone-800 hover:border-stone-700 transition-colors flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-linear-to-br from-stone-700 to-stone-900 text-white flex items-center justify-center font-black text-lg shrink-0 shadow-md border border-stone-700">
                م
              </div>
              <div class="space-y-1.5 flex-1">
                <div class="flex items-center justify-between">
                  <h5 class="text-white font-bold text-sm sm:text-base">أ. مجدي محمد أبو زيد</h5>
                  <span class="bg-stone-800 text-stone-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-stone-700">Editor</span>
                </div>
                <p class="text-red-400 font-semibold text-xs">مدير التحرير التنفيذي</p>
                <div class="text-stone-400 text-xs space-y-1 pt-1 border-t border-stone-900">
                  <p class="flex items-center gap-2">
                    <span class="text-stone-500">✉️ البريد:</span>
                    <a href="mailto:magdy@almasry-news.eg" class="text-stone-300 hover:text-red-400 transition-colors">magdy&#64;almasry-news.eg</a>
                  </p>
                  <p class="flex items-center gap-2">
                    <span class="text-stone-500">📞 الهاتف:</span>
                    <a href="tel:01001234567" class="text-stone-300 hover:text-red-400 transition-colors" dir="ltr">0100 123 4567</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Copyright & Back to Top -->
        <div class="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© 2026 بوابة المصري الإخباري - جميع الحقوق محفوظة | رئيس مجلس الإدارة ورئيس التحرير: م. إيهاب عبد الكريم | مدير التحرير التنفيذي: أ. مجدي محمد أبو زيد</p>

          <div class="flex items-center gap-4">
            <a routerLink="/admin" class="hover:text-stone-300">لوحة الإدارة</a>
            <span class="text-stone-700">•</span>
            <button (click)="scrollToTop()" class="text-red-500 hover:text-red-400 font-bold cursor-pointer">
              ↑ العودة للأعلى
            </button>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  categories: Category[] = storageService.getCategories();
  newsletterEmail = '';
  subscribed = false;

  onSubscribe(e: Event) {
    e.preventDefault();
    if (this.newsletterEmail.includes('@')) {
      this.subscribed = true;
      this.newsletterEmail = '';
      setTimeout(() => { this.subscribed = false; }, 4000);
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
