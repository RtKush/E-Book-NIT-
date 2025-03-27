import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { books } from '@/lib/data';
import { Book } from '@/lib/types';
import { BookDetails as BookDetailsComponent } from '@/components';
import Navbar from '@/components/Navbar';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const foundBook = books.find(b => b.id === id) || null;
      setBook(foundBook);
      
      if (foundBook) {
        const sameCategory = books.filter(b => 
          b.id !== foundBook.id && b.category === foundBook.category
        ).slice(0, 3);
        setRelatedBooks(sameCategory);
      }
      
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  const handleAddToCart = (book: Book, quantity: number) => {
    setCartItemsCount(prev => prev + quantity);
    toast.success(`${quantity} × ${book.title} added to cart`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar isAuthenticated={false} />
        <div className="page-container pt-24">
          <div className="animate-pulse">
            <div className="h-8 bg-muted w-1/4 rounded mb-8"></div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="aspect-[2/3] bg-muted rounded-xl"></div>
              <div className="space-y-4">
                <div className="h-8 bg-muted w-3/4 rounded"></div>
                <div className="h-6 bg-muted w-1/2 rounded"></div>
                <div className="h-6 bg-muted w-1/4 rounded mt-4"></div>
                <div className="h-24 bg-muted w-full rounded mt-6"></div>
                <div className="h-10 bg-muted w-full rounded mt-6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!book) {
    return (
      <div className="min-h-screen">
        <Navbar isAuthenticated={false} />
        <div className="page-container pt-24 text-center">
          <h1 className="text-3xl font-medium mb-6">Book Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The book you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/books" className="btn-primary">
            Browse Books
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar isAuthenticated={false} />
      
      <div className="page-container pt-24">
        <Link to="/books" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft size={16} className="mr-2" />
          Back to Books
        </Link>
        
        <BookDetailsComponent 
          book={book} 
          onAddToCart={handleAddToCart} 
        />
        
        {relatedBooks.length > 0 && (
          <div className="mt-16">
            <h2 className="section-title">Related Books</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              {relatedBooks.map((book, index) => (
                <Link 
                  key={book.id} 
                  to={`/book/${book.id}`}
                  className="book-card group animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="book-image"
                    />
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium line-clamp-1">{book.title}</h3>
                        <p className="text-sm text-muted-foreground">{book.author}</p>
                      </div>
                      <span className="font-medium text-primary">${book.price.toFixed(2)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
