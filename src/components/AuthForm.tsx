
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, Github, Twitter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface AuthFormProps {
  mode: 'login' | 'register';
  onSubmit: (data: any) => void;
  isLoading?: boolean;
  error?: string;
}

const AuthForm = ({ mode, onSubmit, isLoading = false, error }: AuthFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-medium mb-6">
        {mode === 'login' ? 'Sign in' : 'Join LinkedIn'}
      </h2>
      
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded mb-6 text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'register' && (
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Full Name
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full"
              placeholder="John Doe"
            />
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email or phone
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full"
            placeholder="example@email.com"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full pr-10"
              placeholder="••••••••"
            />
            <button 
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {mode === 'login' ? 
              <Link to="/forgot-password" className="text-blue-600 hover:underline">Forgot password?</Link> : 
              "Password must be 6+ characters"
            }
          </p>
        </div>
        
        {mode === 'register' && (
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full"
              placeholder="••••••••"
            />
          </div>
        )}
        
        <Button
          type="submit"
          disabled={isLoading}
          className={cn(
            "w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full py-3 h-auto",
            isLoading && "opacity-70 cursor-not-allowed"
          )}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            <span>{mode === 'login' ? 'Sign in' : 'Agree & Join'}</span>
          )}
        </Button>
        
        {mode === 'login' && (
          <div className="relative mt-6 mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">or</span>
            </div>
          </div>
        )}
        
        {mode === 'login' && (
          <div className="space-y-3">
            <Button 
              type="button"
              variant="outline" 
              className="w-full border-gray-300 text-gray-700 font-medium rounded-full flex items-center justify-center gap-2"
            >
              <Github size={16} />
              Sign in with GitHub
            </Button>
            
            <Button 
              type="button"
              variant="outline" 
              className="w-full border-gray-300 text-gray-700 font-medium rounded-full flex items-center justify-center gap-2"
            >
              <Twitter size={16} />
              Sign in with Twitter
            </Button>
          </div>
        )}
      </form>
      
      <div className="mt-6 text-center text-sm">
        {mode === 'login' ? (
          <p className="text-gray-600">
            New to LinkedIn?{' '}
            <Link to="/register" className="text-blue-600 hover:underline font-medium">
              Join now
            </Link>
          </p>
        ) : (
          <p className="text-gray-600">
            Already on LinkedIn?{' '}
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Sign in
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
