
import { useState } from 'react';
import { Book } from '@/lib/types';
import { ChevronDown, ChevronUp, ShoppingCart, Share2, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BookDetailsProps {
  book: Book;
  onAddToCart: (book: Book, quantity: number) => void;
}

const BookDetails = ({ book, onAddToCart }: BookDetailsProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const incrementQuantity = () => {
    if (quantity < book.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(book, quantity);
  };

  return (
    <div className="animate-fade-in">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <div className="relative overflow-hidden rounded-xl bg-book-highlight">
            {!isImageLoaded && (
              <div className="absolute inset-0 bg-muted animate-pulse" />
            )}
            <img
              src={book.coverImage}
              alt={book.title}
              className={cn(
                "w-full h-auto object-cover transition-opacity duration-300",
                !isImageLoaded && "opacity-0"
              )}
              onLoad={() => setIsImageLoaded(true)}
            />
          </div>
        </div>
        
        <div>
          <span className="badge bg-book-highlight text-book-primary mb-2">
            {book.category}
          </span>
          
          <h1 className="text-3xl md:text-4xl font-medium mb-2">{book.title}</h1>
          <p className="text-xl text-muted-foreground mb-4">by {book.author}</p>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="text-2xl font-medium">${book.price.toFixed(2)}</span>
            <span className={cn(
              "badge",
              book.stock > 0 ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
            )}>
              {book.stock > 0 ? `In Stock (${book.stock})` : "Out of Stock"}
            </span>
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium mb-2">Description</h3>
            <div className={cn(
              "text-muted-foreground relative overflow-hidden transition-all duration-300",
              !isDescriptionExpanded && "max-h-24"
            )}>
              <p>{book.description}</p>
            </div>
            <button 
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              className="text-sm text-primary mt-2 flex items-center"
            >
              {isDescriptionExpanded ? (
                <>Show less <ChevronUp size={16} className="ml-1" /></>
              ) : (
                <>Show more <ChevronDown size={16} className="ml-1" /></>
              )}
            </button>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-md">
                <button 
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="p-2 hover:bg-muted disabled:opacity-50"
                >
                  <ChevronDown size={16} />
                </button>
                <span className="px-4">{quantity}</span>
                <button 
                  onClick={incrementQuantity}
                  disabled={quantity >= book.stock}
                  className="p-2 hover:bg-muted disabled:opacity-50"
                >
                  <ChevronUp size={16} />
                </button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                disabled={book.stock === 0}
                className="btn-primary flex items-center gap-2 disabled:opacity-50"
              >
                <ShoppingCart size={16} />
                Add to Cart
              </button>
              
              <button className="p-2 rounded-md hover:bg-muted">
                <Heart size={20} />
              </button>
              
              <button className="p-2 rounded-md hover:bg-muted">
                <Share2 size={20} />
              </button>
            </div>
            
            <div className="border-t pt-6 space-y-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-muted-foreground">ISBN</div>
                <div>{book.isbn}</div>
                
                <div className="text-muted-foreground">Publisher</div>
                <div>{book.publisher}</div>
                
                <div className="text-muted-foreground">Publication Date</div>
                <div>{book.publicationDate}</div>
                
                <div className="text-muted-foreground">Pages</div>
                <div>{book.pages}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
