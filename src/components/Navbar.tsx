
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = ({ isAuthenticated = false, cartItemsCount = 0 }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-medium tracking-tight">
              Bookopia
            </Link>
          </div>

          {!isMobile && (
            <nav className="mx-auto">
              <ul className="flex space-x-8">
                <li>
                  <Link 
                    to="/" 
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      location.pathname === "/" ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/books" 
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      location.pathname === "/books" || location.pathname.startsWith("/book/") 
                        ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    Books
                  </Link>
                </li>
              </ul>
            </nav>
          )}

          <div className="flex items-center space-x-4">
            {!isMobile && (
              <button className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted">
                <Search size={20} />
              </button>
            )}
            
            <Link 
              to="/cart" 
              className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted relative"
            >
              <ShoppingCart size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            
            <Link 
              to={isAuthenticated ? "/profile" : "/login"} 
              className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted"
            >
              <User size={20} />
            </Link>

            {isMobile && (
              <button 
                onClick={toggleMenu} 
                className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobile && isMenuOpen && (
        <div className="bg-white border-t animate-slide-down">
          <nav className="container mx-auto px-4 py-4">
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/" 
                  className={cn(
                    "block py-2 text-base font-medium transition-colors hover:text-primary",
                    location.pathname === "/" ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/books" 
                  className={cn(
                    "block py-2 text-base font-medium transition-colors hover:text-primary",
                    location.pathname === "/books" ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  Books
                </Link>
              </li>
              <li>
                <div className="relative">
                  <input
                    type="search"
                    placeholder="Search books..."
                    className="w-full input-field pl-10"
                  />
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
