
import { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { users } from '@/lib/data';
import { User, ShoppingBag, Heart, LogOut, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

// For demo purposes - in a real app this would come from authentication state
const DEMO_USER_ID = '1';

const Profile = ({ isAuthenticated = true }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Redirect if not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      const foundUser = users.find(u => u.id === DEMO_USER_ID);
      setUser(foundUser);
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleLogout = () => {
    // In a real app, this would handle the logout logic
    toast.success("Logout successful");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="page-container pt-24">
          <div className="animate-pulse">
            <div className="h-16 w-16 bg-muted rounded-full mx-auto mb-4"></div>
            <div className="h-6 bg-muted w-48 mx-auto rounded mb-8"></div>
            <div className="max-w-3xl mx-auto">
              <div className="h-10 bg-muted w-full rounded mb-6"></div>
              <div className="space-y-4">
                <div className="h-12 bg-muted rounded"></div>
                <div className="h-12 bg-muted rounded"></div>
                <div className="h-12 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar isAuthenticated={true} />
      
      <div className="page-container pt-24">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <User size={32} className="text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-medium">{user?.name || 'User'}</h1>
          <p className="text-muted-foreground">{user?.email || 'user@example.com'}</p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="flex overflow-x-auto border-b mb-8 no-scrollbar">
            <button
              onClick={() => setActiveTab('profile')}
              className={cn(
                "px-4 py-2 text-sm font-medium whitespace-nowrap",
                activeTab === 'profile' 
                  ? "text-primary border-b-2 border-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Profile Information
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={cn(
                "px-4 py-2 text-sm font-medium whitespace-nowrap",
                activeTab === 'orders' 
                  ? "text-primary border-b-2 border-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              My Orders
            </button>
            <button
              onClick={() => setActiveTab('wishlist')}
              className={cn(
                "px-4 py-2 text-sm font-medium whitespace-nowrap",
                activeTab === 'wishlist' 
                  ? "text-primary border-b-2 border-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Wishlist
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={cn(
                "px-4 py-2 text-sm font-medium whitespace-nowrap",
                activeTab === 'settings' 
                  ? "text-primary border-b-2 border-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Account Settings
            </button>
          </div>
          
          <div className="glass-card p-6">
            {activeTab === 'profile' && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-medium mb-6">Profile Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                    <input
                      type="text"
                      value={user?.name || ''}
                      className="input-field w-full mt-1"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      className="input-field w-full mt-1"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Member Since</label>
                    <input
                      type="text"
                      value="January 2023"
                      className="input-field w-full mt-1"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'orders' && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-medium mb-6">My Orders</h2>
                <div className="text-center py-10">
                  <ShoppingBag size={64} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">You haven't placed any orders yet</p>
                  <Link to="/books" className="btn-primary">
                    Start Shopping
                  </Link>
                </div>
              </div>
            )}
            
            {activeTab === 'wishlist' && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-medium mb-6">My Wishlist</h2>
                <div className="text-center py-10">
                  <Heart size={64} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">Your wishlist is empty</p>
                  <Link to="/books" className="btn-primary">
                    Explore Books
                  </Link>
                </div>
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-medium mb-6">Account Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Change Password</h3>
                    <div className="space-y-3">
                      <input
                        type="password"
                        placeholder="Current Password"
                        className="input-field w-full"
                      />
                      <input
                        type="password"
                        placeholder="New Password"
                        className="input-field w-full"
                      />
                      <input
                        type="password"
                        placeholder="Confirm New Password"
                        className="input-field w-full"
                      />
                      <button className="btn-primary mt-2">Update Password</button>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t">
                    <h3 className="text-sm font-medium mb-2">Account Actions</h3>
                    <div className="space-y-3">
                      <button 
                        onClick={handleLogout}
                        className="flex items-center text-muted-foreground hover:text-destructive"
                      >
                        <LogOut size={16} className="mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
