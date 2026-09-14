import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article, Category, Comment } from '../models/news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {
  private http = inject(HttpClient);
  // Default API Base URL (relative path works with dev server, proxy, and ASP Monster)
  private apiUrl = '/api';

  setApiUrl(url: string) {
    this.apiUrl = url;
  }

  getArticles(params?: {
    categoryId?: string;
    governorate?: string;
    search?: string;
    isBreaking?: boolean;
    isFactCheck?: boolean;
  }): Observable<Article[]> {
    let httpParams = new HttpParams();
    if (params?.categoryId) httpParams = httpParams.set('categoryId', params.categoryId);
    if (params?.governorate) httpParams = httpParams.set('governorate', params.governorate);
    if (params?.search) httpParams = httpParams.set('search', params.search);
    if (params?.isBreaking !== undefined) httpParams = httpParams.set('isBreaking', params.isBreaking);
    if (params?.isFactCheck !== undefined) httpParams = httpParams.set('isFactCheck', params.isFactCheck);

    return this.http.get<Article[]>(`${this.apiUrl}/articles`, { params: httpParams });
  }

  getArticleById(id: string): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/articles/${id}`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  getComments(articleId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/comments/article/${articleId}`);
  }

  addComment(comment: { articleId: string; authorName: string; content: string }): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/comments`, comment);
  }

  likeArticle(id: string): Observable<{ likes: number }> {
    return this.http.post<{ likes: number }>(`${this.apiUrl}/articles/${id}/like`, {});
  }

  createArticle(article: Partial<Article>): Observable<Article> {
    return this.http.post<Article>(`${this.apiUrl}/articles`, article);
  }

  updateArticle(id: string, article: Partial<Article>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/articles/${id}`, article);
  }

  deleteArticle(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/articles/${id}`);
  }
}
