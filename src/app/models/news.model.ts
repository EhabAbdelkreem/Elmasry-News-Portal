export interface Article {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  categoryId: string;
  category?: Category;
  authorId: string;
  author?: User;
  governorate?: string;
  imageUrl: string;
  imageCaption?: string;
  publishedAt: string;
  updatedAt?: string;
  viewsCount: number;
  likesCount: number;
  sharesCount: number;
  isBreaking: boolean;
  isFeatured: boolean;
  isTrending: boolean;
  isFactCheck: boolean;
  factClaim?: string;
  factTruth?: string;
  factVerdict?: 'true' | 'false' | 'misleading' | 'unproven';
  status: 'published' | 'draft' | 'archived';
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
  displayOrder: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'superadmin' | 'editor' | 'reporter' | any;
  avatar?: string;
  title?: string;
  roleTitle?: string;
  department?: string;
  createdAt?: string;
}

export interface Comment {
  id: string;
  articleId: string;
  authorName: string;
  content: string;
  createdAt: string;
  likes: number;
}
