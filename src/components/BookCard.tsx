
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Book } from '@/lib/types';
import { ShoppingCart, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BookCardProps {
  book: Book;
  onAddToCart?: (book: Book) => void;
  className?: string;
}

const BookCard = ({ book, onAddToCart, className }: BookCardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(book);
    }
  };

  return (
    <div 
      className={cn(
        "book-card group",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/book/${book.id}`} className="block">
        <div className="relative overflow-hidden">
          {!isImageLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse" />
          )}
          <img
            src={book.coverImage}
            alt={book.title}
            className={cn(
              "book-image",
              !isImageLoaded && "opacity-0"
            )}
            onLoad={() => setIsImageLoaded(true)}
          />
          
          <div className={cn(
            "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transform transition-transform duration-300",
            isHovered ? "translate-y-0" : "translate-y-full"
          )}>
            <div className="flex justify-between items-center">
              <button 
                onClick={handleAddToCart}
                className="p-2 bg-white/90 rounded-full hover:bg-primary hover:text-white transition-colors"
              >
                <ShoppingCart size={16} />
              </button>
              
              <button className="p-2 bg-white/90 rounded-full hover:bg-primary hover:text-white transition-colors">
                <Heart size={16} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium line-clamp-1">{book.title}</h3>
              <p className="text-sm text-muted-foreground">{book.author}</p>
            </div>
            <span className="font-medium text-primary">${book.price.toFixed(2)}</span>
          </div>
          
          <div className="mt-2">
            <span className="badge bg-book-highlight text-book-primary">
              {book.category}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BookCard;
