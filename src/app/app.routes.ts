import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'fact-check',
    loadComponent: () => import('./components/fact-check/fact-check.component').then(m => m.FactCheckComponent)
  },
  {
    path: 'services',
    loadComponent: () => import('./components/services/services.component').then(m => m.ServicesComponent)
  },
  {
    path: 'sports',
    loadComponent: () => import('./components/sports/sports.component').then(m => m.SportsComponent)
  },
  {
    path: 'governorates',
    loadComponent: () => import('./components/governorates/governorates.component').then(m => m.GovernoratesComponent)
  },
  {
    path: 'category/:slug',
    loadComponent: () => import('./components/category/category.component').then(m => m.CategoryComponent)
  },
  {
    path: 'search',
    loadComponent: () => import('./components/search/search.component').then(m => m.SearchComponent)
  },
  {
    path: 'article/:id',
    loadComponent: () => import('./components/article-detail/article-detail.component').then(m => m.ArticleDetailComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./components/admin/admin.component').then(m => m.AdminComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
