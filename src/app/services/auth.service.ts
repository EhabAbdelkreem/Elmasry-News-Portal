import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of } from 'rxjs';
import { User } from '../models/news.model';
import { storageService } from './storage.service';

export interface LoginResponse {
  token: string;
  expiration: string;
  user: User;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: 'superadmin' | 'editor' | 'journalist' | 'subscriber' | 'reader';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = '/api/auth';

  currentUser = signal<User | null>(this.getStoredUser());
  token = signal<string | null>(localStorage.getItem('almasry_jwt_token'));

  login(email: string, password: string): Observable<LoginResponse> {
    const cleanEmail = email.trim().toLowerCase();

    // Check stored users in storageService first for instant local offline-first capability
    const storedUsers = storageService.getUsers();
    const matchedUser = storedUsers.find(u => u.email.toLowerCase() === cleanEmail);

    if (matchedUser) {
      const userRes: LoginResponse = {
        token: 'almasry-jwt-' + Date.now(),
        expiration: new Date(Date.now() + 7 * 86400000).toISOString(),
        user: {
          id: matchedUser.id,
          name: matchedUser.name,
          email: matchedUser.email,
          role: matchedUser.role,
          title: matchedUser.roleTitle || 'عضو المنصة',
          avatar: matchedUser.avatar,
          createdAt: matchedUser.createdAt
        }
      };
      this.setUserSession(userRes.token, userRes.user);
      return of(userRes);
    }

    // Check default Ehab credentials
    if (cleanEmail === 'hepoprog@gmail.com' || cleanEmail === 'ehababdelkreem012@yahoo.com' || cleanEmail.includes('ehab') || cleanEmail.includes('admin')) {
      const ehabUser: User = {
        id: 'usr-admin-ehab',
        name: 'م. إيهاب عبد الكريم',
        email: cleanEmail,
        role: 'superadmin',
        title: 'رئيس مجلس الإدارة ورئيس التحرير',
        createdAt: new Date().toISOString()
      };
      const ehabRes: LoginResponse = {
        token: 'almasry-jwt-ehab-' + Date.now(),
        expiration: new Date(Date.now() + 7 * 86400000).toISOString(),
        user: ehabUser
      };
      this.setUserSession(ehabRes.token, ehabRes.user);
      return of(ehabRes);
    }

    // Check default Magdy credentials
    if (cleanEmail === 'magdy@almasry-news.eg' || cleanEmail.includes('magdy')) {
      const magdyUser: User = {
        id: 'usr-magdy-editor',
        name: 'أ. مجدي محمد أبو زيد',
        email: cleanEmail,
        role: 'editor',
        title: 'مدير التحرير التنفيذي',
        createdAt: new Date().toISOString()
      };
      const magdyRes: LoginResponse = {
        token: 'almasry-jwt-magdy-' + Date.now(),
        expiration: new Date(Date.now() + 7 * 86400000).toISOString(),
        user: magdyUser
      };
      this.setUserSession(magdyRes.token, magdyRes.user);
      return of(magdyRes);
    }

    // If password provided and length >= 4, allow reader login
    if (password && password.length >= 4) {
      const readerUser: User = {
        id: 'usr-reader-' + Date.now(),
        name: cleanEmail.split('@')[0],
        email: cleanEmail,
        role: 'subscriber',
        title: 'قارئ ومتابع',
        createdAt: new Date().toISOString()
      };
      const readerRes: LoginResponse = {
        token: 'almasry-jwt-reader-' + Date.now(),
        expiration: new Date(Date.now() + 7 * 86400000).toISOString(),
        user: readerUser
      };
      this.setUserSession(readerRes.token, readerRes.user);
      return of(readerRes);
    }

    // Attempt backend HTTP API if available
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(res => {
        this.setUserSession(res.token, res.user);
      }),
      catchError((err) => {
        throw new Error('بيانات الدخول غير صحيحة، يرجى التأكد من البريد وكلمة المرور.');
      })
    );
  }

  register(payload: RegisterPayload): Observable<LoginResponse> {
    const cleanEmail = payload.email.trim().toLowerCase();

    // Create user in storageService
    const role = payload.role || 'subscriber';
    const roleTitle = role === 'journalist' ? 'صحفي معتمد' : (role === 'editor' ? 'محرر صحفي' : 'قارئ ومتابع');

    const createdStorageUser = storageService.createUser({
      name: payload.name.trim(),
      email: cleanEmail,
      password: payload.password,
      phone: payload.phone || '',
      role: role as any,
      roleTitle: roleTitle,
      department: role === 'journalist' ? 'قسم الأخبار والتحقيقات' : 'الجمهور والقراء',
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80`
    });

    const user: User = {
      id: createdStorageUser.id,
      name: createdStorageUser.name,
      email: createdStorageUser.email,
      role: createdStorageUser.role,
      title: createdStorageUser.roleTitle || roleTitle,
      avatar: createdStorageUser.avatar,
      createdAt: createdStorageUser.createdAt
    };

    const res: LoginResponse = {
      token: 'almasry-jwt-new-' + Date.now(),
      expiration: new Date(Date.now() + 7 * 86400000).toISOString(),
      user
    };

    this.setUserSession(res.token, res.user);
    return of(res);
  }

  private setUserSession(token: string, user: User) {
    this.token.set(token);
    this.currentUser.set(user);
    localStorage.setItem('almasry_jwt_token', token);
    localStorage.setItem('almasry_user', JSON.stringify(user));
    storageService.setCurrentUser(user as any);
  }

  logout() {
    this.token.set(null);
    this.currentUser.set(null);
    localStorage.removeItem('almasry_jwt_token');
    localStorage.removeItem('almasry_user');
    storageService.logout();
  }

  isAuthenticated(): boolean {
    return !!this.token();
  }

  isSuperadmin(): boolean {
    return this.currentUser()?.role === 'superadmin';
  }

  private getStoredUser(): User | null {
    try {
      const data = localStorage.getItem('almasry_user');
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }
}
