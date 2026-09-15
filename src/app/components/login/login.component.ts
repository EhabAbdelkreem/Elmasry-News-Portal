import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-[82vh] flex items-center justify-center px-4 py-12 bg-stone-100 font-sans text-right" dir="rtl">
      <div class="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xl">
        <!-- Logo & Newspaper Identity -->
        <div class="text-center mb-6">
          <div class="w-16 h-16 bg-linear-to-br from-red-600 to-red-800 rounded-2xl mx-auto flex items-center justify-center text-white text-3xl font-black mb-3 shadow-lg border border-red-500/40">
            م
          </div>
          <h2 class="text-2xl font-black text-stone-900 font-display">بوابة المصري الإخباري</h2>
          <p class="text-xs text-stone-500 mt-1">صوت الوطن والمواطن • البوابة الرقمية الإخبارية</p>
        </div>

        <!-- Navigation Tabs: Login vs Register -->
        <div class="flex items-center p-1 bg-stone-100 rounded-2xl mb-6 border border-stone-200">
          <button
            type="button"
            (click)="activeTab = 'login'; clearMessages()"
            [class]="activeTab === 'login' ? 'bg-white text-stone-900 shadow-sm font-black' : 'text-stone-500 hover:text-stone-800 font-bold'"
            class="flex-1 py-2.5 rounded-xl text-xs sm:text-sm transition-all text-center cursor-pointer"
          >
            تسجيل الدخول
          </button>
          <button
            type="button"
            (click)="activeTab = 'register'; clearMessages()"
            [class]="activeTab === 'register' ? 'bg-white text-stone-900 shadow-sm font-black' : 'text-stone-500 hover:text-stone-800 font-bold'"
            class="flex-1 py-2.5 rounded-xl text-xs sm:text-sm transition-all text-center cursor-pointer"
          >
            إنشاء حساب جديد
          </button>
        </div>

        <!-- Success Toast -->
        <div *ngIf="successMessage" class="mb-4 bg-emerald-50 text-emerald-800 text-xs sm:text-sm p-3.5 rounded-2xl border border-emerald-200 flex items-center gap-2">
          <span class="text-base">✓</span>
          <span>{{ successMessage }}</span>
        </div>

        <!-- Error Alert -->
        <div *ngIf="errorMessage" class="mb-4 bg-red-50 text-red-700 text-xs sm:text-sm p-3.5 rounded-2xl border border-red-200 flex items-center gap-2">
          <span class="text-base">⚠️</span>
          <span>{{ errorMessage }}</span>
        </div>

        <!-- TAB 1: LOGIN FORM -->
        <form *ngIf="activeTab === 'login'" (ngSubmit)="onLogin()" class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-stone-700 mb-1.5">البريد الإلكتروني أو اسم المستخدم</label>
            <input
              type="text"
              [(ngModel)]="loginEmail"
              name="loginEmail"
              required
              class="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-red-600 focus:outline-hidden transition-colors"
              placeholder="ehababdelkreem012@yahoo.com"
            />
          </div>

          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label class="block text-xs font-bold text-stone-700">كلمة المرور</label>
              <button
                type="button"
                (click)="showPassword = !showPassword"
                class="text-[11px] text-stone-500 hover:text-red-600 transition-colors"
              >
                {{ showPassword ? 'إخفاء' : 'إظهار' }}
              </button>
            </div>
            <input
              [type]="showPassword ? 'text' : 'password'"
              [(ngModel)]="loginPassword"
              name="loginPassword"
              required
              class="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-red-600 focus:outline-hidden transition-colors"
              placeholder="••••••••"
            />
          </div>

          <div class="flex items-center justify-between text-xs text-stone-600 pt-1">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" [(ngModel)]="rememberMe" name="rememberMe" class="rounded text-red-600 focus:ring-red-500" />
              <span>تذكر تسجيل دخولي</span>
            </label>
            <a href="javascript:void(0)" (click)="activeTab = 'register'" class="text-red-600 hover:underline font-bold">
              ليس لديك حساب؟
            </a>
          </div>

          <button
            type="submit"
            [disabled]="isLoading"
            class="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-black py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg text-sm cursor-pointer disabled:opacity-50 mt-3 flex items-center justify-center gap-2 border border-emerald-500/30"
          >
            <span *ngIf="isLoading" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            <svg *ngIf="!isLoading" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            <span>{{ isLoading ? 'جاري التحقق...' : 'تسجيل الدخول' }}</span>
          </button>
        </form>

        <!-- TAB 2: REGISTER FORM -->
        <form *ngIf="activeTab === 'register'" (ngSubmit)="onRegister()" class="space-y-3.5">
          <div>
            <label class="block text-xs font-bold text-stone-700 mb-1">الاسم الكامل</label>
            <input
              type="text"
              [(ngModel)]="registerName"
              name="registerName"
              required
              class="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-red-600 focus:outline-hidden"
              placeholder="مثال: أحمد محمود إبراهيم"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-stone-700 mb-1">البريد الإلكتروني</label>
            <input
              type="email"
              [(ngModel)]="registerEmail"
              name="registerEmail"
              required
              class="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-red-600 focus:outline-hidden"
              placeholder="ahmed@example.com"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-stone-700 mb-1">رقم الهاتف (اختياري)</label>
            <input
              type="tel"
              [(ngModel)]="registerPhone"
              name="registerPhone"
              class="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-red-600 focus:outline-hidden"
              placeholder="01xxxxxxxxx"
              dir="ltr"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-stone-700 mb-1">نوع الحساب</label>
            <div class="grid grid-cols-2 gap-2">
              <label class="flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-all"
                [class]="registerRole === 'subscriber' ? 'border-red-600 bg-red-50 text-red-900 font-bold' : 'border-stone-200 text-stone-600'">
                <input type="radio" [(ngModel)]="registerRole" name="registerRole" value="subscriber" class="hidden" />
                <span class="text-xs">📰 قارئ ومتابع</span>
              </label>

              <label class="flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-all"
                [class]="registerRole === 'journalist' ? 'border-red-600 bg-red-50 text-red-900 font-bold' : 'border-stone-200 text-stone-600'">
                <input type="radio" [(ngModel)]="registerRole" name="registerRole" value="journalist" class="hidden" />
                <span class="text-xs">✍️ محرر / مراسل</span>
              </label>
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-stone-700 mb-1">كلمة المرور</label>
            <input
              type="password"
              [(ngModel)]="registerPassword"
              name="registerPassword"
              required
              class="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-red-600 focus:outline-hidden"
              placeholder="6 أحرف أو أرقام على الأقل"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-stone-700 mb-1">تأكيد كلمة المرور</label>
            <input
              type="password"
              [(ngModel)]="registerConfirmPassword"
              name="registerConfirmPassword"
              required
              class="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-red-600 focus:outline-hidden"
              placeholder="تأكيد كلمة المرور"
            />
          </div>

          <button
            type="submit"
            [disabled]="isLoading"
            class="w-full bg-red-600 hover:bg-red-700 text-white font-black py-3 rounded-xl transition-all shadow-md text-sm cursor-pointer disabled:opacity-50 mt-3 flex items-center justify-center gap-2"
          >
            <span *ngIf="isLoading" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            <span>{{ isLoading ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب والتسجيل فوراً' }}</span>
          </button>

          <p class="text-center text-xs text-stone-500 pt-2">
            لديك حساب بالفعل؟
            <a href="javascript:void(0)" (click)="activeTab = 'login'" class="text-red-600 hover:underline font-bold mr-1">
              تسجيل الدخول
            </a>
          </p>
        </form>

        <!-- Back to Home Link -->
        <div class="mt-6 pt-4 border-t border-stone-100 text-center">
          <a routerLink="/" class="text-xs text-stone-500 hover:text-red-600 transition-colors flex items-center justify-center gap-1">
            <span>← العودة إلى الصفحة الرئيسية</span>
          </a>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  activeTab: 'login' | 'register' = 'login';

  // Login fields
  loginEmail = 'ehababdelkreem012@yahoo.com';
  loginPassword = '';
  showPassword = false;
  rememberMe = true;

  // Register fields
  registerName = '';
  registerEmail = '';
  registerPhone = '';
  registerRole: 'subscriber' | 'journalist' = 'subscriber';
  registerPassword = '';
  registerConfirmPassword = '';

  // Status
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  ngOnInit() {
    // Detect URL or query parameters
    const url = this.router.url;
    if (url.includes('/register') || this.route.snapshot.queryParams['mode'] === 'register') {
      this.activeTab = 'register';
    }

    this.route.queryParams.subscribe(params => {
      if (params['tab'] === 'register' || params['mode'] === 'register') {
        this.activeTab = 'register';
      } else if (params['tab'] === 'login') {
        this.activeTab = 'login';
      }
    });
  }

  clearMessages() {
    this.errorMessage = '';
    this.successMessage = '';
  }

  onLogin() {
    if (!this.loginEmail || !this.loginPassword) {
      this.errorMessage = 'يرجى إدخال البريد الإلكتروني وكلمة المرور';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.login(this.loginEmail, this.loginPassword).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.successMessage = `أهلاً بك، ${res.user.name}! تم تسجيل الدخول بنجاح.`;
        setTimeout(() => {
          if (res.user.role === 'superadmin' || res.user.role === 'editor' || res.user.role === 'journalist') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/']);
          }
        }, 600);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err?.message || 'بيانات الدخول غير صحيحة، يرجى المحاولة مجدداً';
      }
    });
  }

  onRegister() {
    if (!this.registerName.trim()) {
      this.errorMessage = 'يرجى إدخال الاسم الكامل';
      return;
    }
    if (!this.registerEmail.trim() || !this.registerEmail.includes('@')) {
      this.errorMessage = 'يرجى إدخال بريد إلكتروني صحيح';
      return;
    }
    if (!this.registerPassword || this.registerPassword.length < 4) {
      this.errorMessage = 'كلمة المرور يجب ألا تقل عن 4 أحرف';
      return;
    }
    if (this.registerPassword !== this.registerConfirmPassword) {
      this.errorMessage = 'كلمتا المرور غير متطابقتين';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.register({
      name: this.registerName.trim(),
      email: this.registerEmail.trim(),
      password: this.registerPassword,
      phone: this.registerPhone.trim(),
      role: this.registerRole
    }).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.successMessage = `تم إنشاء الحساب بنجاح! مرحباً بك يا ${res.user.name}.`;
        setTimeout(() => {
          if (res.user.role === 'journalist') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/']);
          }
        }, 800);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err?.message || 'حدث خطأ أثناء التسجيل، يرجى المحاولة مجدداً';
      }
    });
  }
}
