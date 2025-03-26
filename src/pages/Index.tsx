import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookCard } from '@/components';
import { books } from '@/lib/data';
import { toast } from 'sonner';
import { Book } from '@/lib/types';
import Navbar from '@/components/Navbar';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [newBooks, setNewBooks] = useState<Book[]>([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const randomFeatured = [...books].sort(() => 0.5 - Math.random()).slice(0, 3);
      setFeaturedBooks(randomFeatured);
      
      const remaining = books.filter(book => !randomFeatured.find(b => b.id === book.id));
      setNewBooks(remaining.slice(0, 4));
      
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleAddToCart = (book: Book) => {
    setCartItemsCount(prev => prev + 1);
    toast.success(`${book.title} added to cart`);
  };

  return (
    <div className="min-h-screen">
      <Navbar cartItemsCount={cartItemsCount} />
      
      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-muted to-transparent">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-medium tracking-tight mb-6 animate-fade-in">
            Discover Your Next <span className="text-primary">Favorite Book</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 animate-fade-in animate-delay-100">
            Browse our curated collection of books across all genres. 
            From bestsellers to classics, we have something for every reader.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animate-delay-200">
            <Link to="/books" className="btn-primary">
              Browse Collection
            </Link>
            <Link to="/login" className="btn-secondary">
              Sign In
            </Link>
          </div>
        </div>
      </section>
      
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-title">Featured Books</h2>
            <Link to="/books" className="text-sm text-primary flex items-center hover:underline">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="book-card animate-pulse">
                  <div className="aspect-[2/3] bg-muted"></div>
                  <div className="p-4">
                    <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredBooks.map((book, index) => (
                <BookCard 
                  key={book.id} 
                  book={book} 
                  onAddToCart={handleAddToCart}
                  className={`animate-slide-up animate-delay-${index * 100}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="section-title text-center">Browse by Category</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {['Fiction', 'Non-Fiction', 'Science Fiction', 'History', 'Self-Help', 'Biography', 'Philosophy', 'Psychology'].map((category, index) => (
              <div 
                key={category}
                className="glass-card p-6 text-center hover:shadow-md transition-shadow cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <h3 className="font-medium">{category}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-title">New Arrivals</h2>
            <Link to="/books" className="text-sm text-primary flex items-center hover:underline">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="book-card animate-pulse">
                  <div className="aspect-[2/3] bg-muted"></div>
                  <div className="p-4">
                    <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {newBooks.map((book, index) => (
                <BookCard 
                  key={book.id} 
                  book={book} 
                  onAddToCart={handleAddToCart}
                  className={`animate-slide-up animate-delay-${index * 100}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      
      <section className="py-20 px-4 bg-gradient-to-r from-book-primary/10 to-book-accent/10">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-medium mb-6 animate-fade-in">
            Join Our Community of Book Lovers
          </h2>
          <p className="text-lg text-muted-foreground mb-8 animate-fade-in">
            Sign up today and get personalized book recommendations, 
            exclusive offers, and join our community discussions.
          </p>
          <Link to="/register" className="btn-primary inline-block animate-fade-in">
            Create Account
          </Link>
        </div>
      </section>
      
      <footer className="bg-muted/30 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-medium mb-4">Bookopia</h3>
              <p className="text-muted-foreground">
                Your destination for quality books and literary experiences.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Explore</h4>
              <ul className="space-y-2">
                <li><Link to="/books" className="text-muted-foreground hover:text-primary">Books</Link></li>
                <li><Link to="/books" className="text-muted-foreground hover:text-primary">Categories</Link></li>
                <li><Link to="/books" className="text-muted-foreground hover:text-primary">New Arrivals</Link></li>
                <li><Link to="/books" className="text-muted-foreground hover:text-primary">Bestsellers</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Account</h4>
              <ul className="space-y-2">
                <li><Link to="/login" className="text-muted-foreground hover:text-primary">Sign In</Link></li>
                <li><Link to="/register" className="text-muted-foreground hover:text-primary">Create Account</Link></li>
                <li><Link to="/cart" className="text-muted-foreground hover:text-primary">Cart</Link></li>
                <li><Link to="/profile" className="text-muted-foreground hover:text-primary">My Orders</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-muted-foreground">support@bookopia.com</li>
                <li className="text-muted-foreground">+1 (555) 123-4567</li>
                <li className="text-muted-foreground">123 Reading St, Booktown</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-6 border-t text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Bookopia. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
