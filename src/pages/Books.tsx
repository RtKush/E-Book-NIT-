import { useState, useEffect } from 'react';
import { books } from '@/lib/data';
import { Book } from '@/lib/types';
import { toast } from 'sonner';
import { BookCard } from '@/components';
import Navbar from '@/components/Navbar';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';

const Books = () => {
  const [displayBooks, setDisplayBooks] = useState<Book[]>([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('relevance');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const categories = ['All', ...Array.from(new Set(books.map(book => book.category)))];
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setDisplayBooks(books);
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    let filtered = [...books];
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(book => 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(book => book.category === selectedCategory);
    }
    
    // Sort books
    switch (sortBy) {
      case 'priceAsc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'titleAsc':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'titleDesc':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        // relevance - keep original order
        break;
    }
    
    setDisplayBooks(filtered);
  }, [searchQuery, selectedCategory, sortBy]);
  
  const handleAddToCart = (book: Book) => {
    setCartItemsCount(prev => prev + 1);
    toast.success(`${book.title} added to cart`);
  };
  
  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="min-h-screen">
      <Navbar cartItemsCount={cartItemsCount} />
      
      <div className="page-container pt-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-medium mb-4 md:mb-0">Browse Books</h1>
          
          <div className="relative w-full md:w-auto">
            <input
              type="search"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10 w-full md:w-64"
            />
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>
        
        <button
          onClick={toggleFilters}
          className="flex items-center gap-2 text-sm font-medium md:hidden mb-4"
        >
          <SlidersHorizontal size={16} />
          Filters
          <ChevronDown size={16} className={`transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className={`md:block ${isFilterOpen ? 'block' : 'hidden'}`}>
            <div className="glass-card p-4 sticky top-20">
              <h3 className="font-medium mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`block w-full text-left px-2 py-1 rounded-md text-sm transition-colors ${
                      selectedCategory === category 
                        ? 'bg-book-accent/20 text-primary font-medium' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium mb-4">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input-field w-full"
                >
                  <option value="relevance">Relevance</option>
                  <option value="priceAsc">Price: Low to High</option>
                  <option value="priceDesc">Price: High to Low</option>
                  <option value="titleAsc">Title: A to Z</option>
                  <option value="titleDesc">Title: Z to A</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-3">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="book-card animate-pulse">
                    <div className="aspect-[2/3] bg-muted"></div>
                    <div className="p-4">
                      <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-muted rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : displayBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayBooks.map((book, index) => (
                  <BookCard 
                    key={book.id} 
                    book={book} 
                    onAddToCart={handleAddToCart}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">No books found matching your criteria</p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setSortBy('relevance');
                  }}
                  className="btn-secondary mt-4"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;
