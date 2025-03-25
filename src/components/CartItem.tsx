
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CartItem as CartItemType } from '@/lib/types';
import { Trash2, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (bookId: string, quantity: number) => void;
  onRemove: (bookId: string) => void;
}

const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  const incrementQuantity = () => {
    if (item.quantity < item.book.stock) {
      onUpdateQuantity(item.book.id, item.quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.book.id, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    onRemove(item.book.id);
  };

  const totalPrice = item.book.price * item.quantity;

  return (
    <div className="flex py-6 border-b animate-fade-in">
      <div className="h-24 w-18 flex-shrink-0 overflow-hidden rounded-md">
        <div className="relative h-full w-full">
          {!isImageLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse" />
          )}
          <img
            src={item.book.coverImage}
            alt={item.book.title}
            className={cn(
              "h-full w-full object-cover transition-opacity duration-300",
              !isImageLoaded && "opacity-0"
            )}
            onLoad={() => setIsImageLoaded(true)}
          />
        </div>
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium">
            <Link to={`/book/${item.book.id}`} className="hover:text-primary">
              <h3 className="line-clamp-1">{item.book.title}</h3>
            </Link>
            <p className="ml-4">${totalPrice.toFixed(2)}</p>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{item.book.author}</p>
        </div>
        
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex items-center border rounded-md">
            <button 
              onClick={decrementQuantity}
              disabled={item.quantity <= 1}
              className="p-1 hover:bg-muted disabled:opacity-50"
            >
              <Minus size={12} />
            </button>
            <span className="px-3">{item.quantity}</span>
            <button 
              onClick={incrementQuantity}
              disabled={item.quantity >= item.book.stock}
              className="p-1 hover:bg-muted disabled:opacity-50"
            >
              <Plus size={12} />
            </button>
          </div>

          <div className="flex">
            <button
              type="button"
              onClick={handleRemove}
              className="text-muted-foreground hover:text-destructive flex items-center"
            >
              <Trash2 size={16} className="mr-1" />
              <span>Remove</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
