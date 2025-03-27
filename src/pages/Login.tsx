
import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthForm } from '@/components';
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
      // Connect to our Express backend
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to login');
      }
      
      // Store user info and token in localStorage for persistence
      localStorage.setItem('authUser', JSON.stringify(result.user));
      localStorage.setItem('authToken', result.token);
      
      toast.success("Login successful");
      navigate("/profile");
    } catch (err: any) {
      setError(err.message || "An error occurred during login. Please try again.");
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
