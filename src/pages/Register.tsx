
import { useState } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { AuthForm } from '@/components';
import { toast } from 'sonner';
import { BookIcon } from 'lucide-react';

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
      // In a production environment, we would connect to a real backend
      // For demonstration purposes, simulate a successful registration
      
      // Check if email is already used (simulate backend validation)
      if (data.email === "user@example.com") {
        throw new Error("User with this email already exists");
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a new user in localStorage (simulating database storage)
      const existingUsers = JSON.parse(localStorage.getItem('bookstoreUsers') || '[]');
      const newUser = {
        id: (existingUsers.length + 1).toString(),
        name: data.name,
        email: data.email,
        password: data.password, // In a real app, this would be hashed
      };
      
      existingUsers.push(newUser);
      localStorage.setItem('bookstoreUsers', JSON.stringify(existingUsers));
      
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
            <BookIcon className="w-10 h-10 text-blue-600" />
            <span className="text-2xl font-semibold ml-1 text-blue-600">Bookstore</span>
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
