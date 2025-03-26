
import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthForm } from '@/components';
import { authenticate } from '@/lib/data';
import Navbar from '@/components/Navbar';
import { toast } from 'sonner';
import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Login = ({ isAuthenticated = false }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Check if a standalone login page exists and redirect if needed
  useEffect(() => {
    const isStandaloneLogin = window.location.pathname === '/login.html';
    if (isStandaloneLogin) {
      window.location.href = '/login';
    }
  }, []);
  
  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }
  
  const handleLogin = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      const user = authenticate(data.email, data.password);
      
      if (user) {
        // Store user info in localStorage for persistence
        localStorage.setItem('authUser', JSON.stringify(user));
        
        toast.success("Login successful");
        navigate("/profile");
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = () => {
    // Use the Web Share API if available
    if (navigator.share) {
      navigator.share({
        title: 'Bookopia Login',
        text: 'Check out Bookopia - your destination for quality books!',
        url: window.location.href,
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href)
        .then(() => toast.success('Link copied to clipboard!'))
        .catch(() => toast.error('Failed to copy link'));
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="page-container pt-24">
        <div className="max-w-md mx-auto">
          <div className="flex justify-end mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleShare}
              aria-label="Share"
              className="text-muted-foreground hover:text-primary"
            >
              <Share2 className="mr-2" />
              Share
            </Button>
          </div>
          <AuthForm
            mode="login"
            onSubmit={handleLogin}
            isLoading={isLoading}
            error={error || undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
