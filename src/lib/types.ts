
export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  coverImage: string;
  description: string;
  isbn: string;
  publisher: string;
  publicationDate: string;
  pages: number;
  category: string;
  stock: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // In a real app, this would be hashed and stored securely
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  currentUser: User | null;
}
