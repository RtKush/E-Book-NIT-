
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import Books from "./pages/Books";
import BookDetails from "./pages/BookDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Feed from "./pages/Feed";
import NotFound from "./pages/NotFound";
import { User } from "./lib/types";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // Check authentication status on app load
  useEffect(() => {
    const checkAuth = () => {
      const authUserString = localStorage.getItem('authUser');
      
      if (authUserString) {
        try {
          const authUser = JSON.parse(authUserString);
          setCurrentUser(authUser);
          setIsAuthenticated(true);
        } catch (error) {
          // If parsing fails, clear localStorage
          localStorage.removeItem('authUser');
          setIsAuthenticated(false);
          setCurrentUser(null);
        }
      } else {
        setIsAuthenticated(false);
        setCurrentUser(null);
      }
    };

    // Check on initial load
    checkAuth();
    
    // Listen for storage events (if user logs in/out in another tab)
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);
  
  // Protected route component
  const ProtectedRoute = ({ element }: { element: React.ReactNode }) => {
    return isAuthenticated ? <>{element}</> : <Navigate to="/login" />;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/books" element={<Books />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login isAuthenticated={isAuthenticated} />} />
            <Route path="/register" element={<Register isAuthenticated={isAuthenticated} />} />
            <Route path="/profile" element={<ProtectedRoute element={<Profile user={currentUser} isAuthenticated={isAuthenticated} />} />} />
            <Route path="/feed" element={<ProtectedRoute element={<Feed isAuthenticated={isAuthenticated} />} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
