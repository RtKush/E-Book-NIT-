
import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthForm } from '@/components';
import { authenticate } from '@/lib/data';
import Navbar from '@/components/Navbar';
import { toast } from 'sonner';

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
      // Try to authenticate with provided credentials
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

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="page-container pt-24">
        <div className="max-w-md mx-auto">
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
