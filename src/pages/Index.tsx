
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { LinkedinIcon, Search, Briefcase, MessageSquare, Bell, Users, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check if user is already authenticated via localStorage
    const authUser = localStorage.getItem('authUser');
    if (authUser) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar isAuthenticated={isAuthenticated} />
      
      {!isAuthenticated ? (
        // Landing page for non-authenticated users
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/2">
                <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
                  Welcome to your professional community
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Connect with professionals, stay informed with industry news, and build your career.
                </p>
                
                <div className="space-y-4 max-w-md">
                  <Link to="/login" className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full py-3 px-6 transition-colors">
                    Sign in
                  </Link>
                  <Link to="/register" className="flex items-center justify-center w-full border border-gray-400 hover:bg-gray-50 text-gray-700 font-medium rounded-full py-3 px-6 transition-colors">
                    Join now
                  </Link>
                </div>
              </div>
              
              <div className="w-full md:w-1/2">
                <img 
                  src="https://static.licdn.com/aero-v1/sc/h/dxf91zhqd2z6b0bwg85ktm5s4" 
                  alt="LinkedIn illustration" 
                  className="w-full max-w-xl mx-auto"
                />
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 py-16 mt-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-light text-center mb-12">
                Find the right job or internship for you
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {['Engineering', 'Business Development', 'Finance', 'Marketing', 'Information Technology', 'Human Resources', 'Education', 'Healthcare', 'Retail', 'Arts', 'Legal', 'Operations'].map((category) => (
                  <div key={category} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                    <p className="font-medium text-sm">{category}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Redirect to feed if already authenticated
        <div className="container mx-auto px-4 pt-24">
          <div className="text-center py-8">
            <h2 className="text-xl font-medium mb-4">You're already signed in</h2>
            <Link to="/feed" className="text-blue-600 hover:underline">
              Go to your feed
            </Link>
          </div>
        </div>
      )}
      
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="flex items-center mb-8">
            <LinkedinIcon className="w-10 h-10 text-white" />
            <span className="text-2xl font-semibold ml-1">LinkedIn</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-medium mb-4">General</h4>
              <ul className="space-y-2">
                <li><Link to="#" className="text-gray-300 hover:text-white text-sm">Sign Up</Link></li>
                <li><Link to="#" className="text-gray-300 hover:text-white text-sm">Help Center</Link></li>
                <li><Link to="#" className="text-gray-300 hover:text-white text-sm">About</Link></li>
                <li><Link to="#" className="text-gray-300 hover:text-white text-sm">Press</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Browse LinkedIn</h4>
              <ul className="space-y-2">
                <li><Link to="#" className="text-gray-300 hover:text-white text-sm">Learning</Link></li>
                <li><Link to="#" className="text-gray-300 hover:text-white text-sm">Jobs</Link></li>
                <li><Link to="#" className="text-gray-300 hover:text-white text-sm">Salary</Link></li>
                <li><Link to="#" className="text-gray-300 hover:text-white text-sm">Mobile</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Business Solutions</h4>
              <ul className="space-y-2">
                <li><Link to="#" className="text-gray-300 hover:text-white text-sm">Talent</Link></li>
                <li><Link to="#" className="text-gray-300 hover:text-white text-sm">Marketing</Link></li>
                <li><Link to="#" className="text-gray-300 hover:text-white text-sm">Sales</Link></li>
                <li><Link to="#" className="text-gray-300 hover:text-white text-sm">Learning</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Directories</h4>
              <ul className="space-y-2">
                <li><Link to="#" className="text-gray-300 hover:text-white text-sm">Members</Link></li>
                <li><Link to="#" className="text-gray-300 hover:text-white text-sm">Jobs</Link></li>
                <li><Link to="#" className="text-gray-300 hover:text-white text-sm">Companies</Link></li>
                <li><Link to="#" className="text-gray-300 hover:text-white text-sm">Featured</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} LinkedIn Clone. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
