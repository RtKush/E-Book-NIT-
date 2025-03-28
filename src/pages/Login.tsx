
import { useState, useEffect } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { AuthForm } from '@/components';
import { toast } from 'sonner';
import { BookIcon } from 'lucide-react';

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
    
    // Check if user is already authenticated via localStorage
    const authUser = localStorage.getItem('authUser');
    if (authUser) {
      // Update the app's auth state
      navigate('/profile');
    }
  }, [navigate]);
  
  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }
  
  const handleLogin = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // For demo purposes, we'll simulate a successful login
      // In a real app, this would connect to a backend API
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation (in a real app, this would be handled by the backend)
      if (data.email === "admin@bookstore.com" && data.password === "password") {
        // Create a mock user
        const user = {
          id: "1",
          name: "Admin User",
          email: data.email,
          role: "admin"
        };
        
        // Store in localStorage
        localStorage.setItem('authUser', JSON.stringify(user));
        localStorage.setItem('authToken', 'mock-jwt-token');
        
        toast.success("Login successful");
        navigate("/feed");
      } else {
        // For demo: allow any email/password with minimum validation
        if (data.email.includes('@') && data.password.length >= 6) {
          // Create a mock user
          const user = {
            id: "2",
            name: data.email.split('@')[0],
            email: data.email,
            role: "user"
          };
          
          // Store in localStorage
          localStorage.setItem('authUser', JSON.stringify(user));
          localStorage.setItem('authToken', 'mock-jwt-token');
          
          toast.success("Login successful");
          navigate("/feed");
        } else {
          throw new Error("Invalid email or password format");
        }
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during login. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-10">
          <Link to="/" className="flex items-center">
            <BookIcon className="w-10 h-10 text-blue-600" />
            <span className="text-2xl font-semibold ml-1 text-blue-600">Bookstore</span>
          </Link>
        </div>
        
        <div className="flex flex-col md:flex-row items-start gap-10">
          <div className="w-full md:w-6/12 md:pt-12">
            <h1 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
              Welcome to your book community
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Discover new books, connect with readers, and build your personal library.
            </p>
          </div>
          
          <div className="w-full md:w-5/12 bg-white rounded-lg shadow-md p-6">
            <AuthForm
              mode="login"
              onSubmit={handleLogin}
              isLoading={isLoading}
              error={error || undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
