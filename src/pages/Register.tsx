
import { useState } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { AuthForm } from '@/components';
import { toast } from 'sonner';
import { LinkedinIcon } from 'lucide-react';

const Register = ({ isAuthenticated = false }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to="/feed" replace />;
  }
  
  const handleRegister = async (data: { 
    name: string; 
    email: string; 
    password: string;
    confirmPassword: string;
  }) => {
    setIsLoading(true);
    setError(null);
    
    // Basic validation
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }
    
    try {
      // Connect to Express backend
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password
        }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to register');
      }
      
      toast.success("Account created successfully");
      navigate("/login");
    } catch (err: any) {
      setError(err.message || "An error occurred during registration. Please try again.");
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
            <LinkedinIcon className="w-10 h-10 text-blue-600" />
            <span className="text-2xl font-semibold ml-1 text-blue-600">Linked</span>
            <span className="sr-only">in</span>
          </Link>
        </div>
        
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <AuthForm
            mode="register"
            onSubmit={handleRegister}
            isLoading={isLoading}
            error={error || undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
