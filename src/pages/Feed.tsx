
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Edit, Image, Video, Calendar, FileText, ThumbsUp, MessageSquare, Share2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';

// Sample post data
const initialPosts = [
  {
    id: 1,
    author: {
      name: 'John Doe',
      role: 'Software Engineer at Tech Company',
      avatar: '/placeholder.svg'
    },
    content: 'Just launched a new feature for our app. Check it out and let me know what you think!',
    timestamp: '3h',
    likes: 42,
    comments: 7
  },
  {
    id: 2,
    author: {
      name: 'Jane Smith',
      role: 'Product Manager at Design Studio',
      avatar: '/placeholder.svg'
    },
    content: 'Excited to announce I\'m starting a new position as Senior Product Manager at Design Studio!',
    timestamp: '1d',
    likes: 128,
    comments: 23
  },
  {
    id: 3,
    author: {
      name: 'Alex Johnson',
      role: 'Frontend Developer at Web Solutions',
      avatar: '/placeholder.svg'
    },
    content: 'What are your favorite React libraries in 2023? Looking for recommendations for a new project.',
    timestamp: '2d',
    likes: 35,
    comments: 18
  }
];

const Feed = ({ isAuthenticated = false }) => {
  const [posts, setPosts] = useState(initialPosts);
  const [newPost, setNewPost] = useState('');
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Redirect if not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  useEffect(() => {
    // Load user data from localStorage
    const authUserString = localStorage.getItem('authUser');
    if (authUserString) {
      try {
        const authUser = JSON.parse(authUserString);
        setUser(authUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
    
    setIsLoading(false);
  }, []);
  
  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPost.trim()) return;
    
    const newPostObj = {
      id: Date.now(),
      author: {
        name: user?.name || 'Current User',
        role: user?.role || 'LinkedIn Member',
        avatar: '/placeholder.svg'
      },
      content: newPost,
      timestamp: 'Just now',
      likes: 0,
      comments: 0
    };
    
    setPosts([newPostObj, ...posts]);
    setNewPost('');
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b border-gray-200 fixed top-0 w-full z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center">
            <svg className="w-8 h-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </div>
          
          <div className="flex items-center">
            <Avatar className="h-8 w-8">
              <div className="bg-blue-200 text-blue-600 h-full w-full flex items-center justify-center">
                {user?.name?.charAt(0) || 'U'}
              </div>
            </Avatar>
          </div>
        </div>
      </header>
      
      <main className="pt-16 pb-10">
        <div className="max-w-2xl mx-auto px-4">
          <Card className="mb-4 p-4">
            <form onSubmit={handlePostSubmit}>
              <div className="flex gap-3">
                <Avatar className="h-12 w-12">
                  <div className="bg-blue-200 text-blue-600 h-full w-full flex items-center justify-center">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                </Avatar>
                <div className="flex-1">
                  <textarea
                    placeholder="Start a post"
                    className="w-full border border-gray-300 rounded-md p-3 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                    rows={3}
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                  ></textarea>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <div className="flex gap-2">
                  <Button type="button" variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md">
                    <Image size={18} className="mr-1" /> Photo
                  </Button>
                  <Button type="button" variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md">
                    <Video size={18} className="mr-1" /> Video
                  </Button>
                  <Button type="button" variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md">
                    <Calendar size={18} className="mr-1" /> Event
                  </Button>
                  <Button type="button" variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md">
                    <FileText size={18} className="mr-1" /> Article
                  </Button>
                </div>
                
                <Button 
                  type="submit" 
                  disabled={!newPost.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4"
                >
                  Post
                </Button>
              </div>
            </form>
          </Card>
          
          <div className="space-y-4">
            {posts.map(post => (
              <Card key={post.id} className="p-4">
                <div className="flex gap-3">
                  <Avatar className="h-12 w-12">
                    <div className="bg-blue-200 text-blue-600 h-full w-full flex items-center justify-center">
                      {post.author.name.charAt(0)}
                    </div>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{post.author.name}</h3>
                    <p className="text-sm text-gray-500">{post.author.role}</p>
                    <p className="text-xs text-gray-400">{post.timestamp}</p>
                  </div>
                </div>
                
                <div className="mt-3">
                  <p className="text-gray-800">{post.content}</p>
                </div>
                
                <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md">
                    <ThumbsUp size={18} className="mr-1" /> Like ({post.likes})
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md">
                    <MessageSquare size={18} className="mr-1" /> Comment ({post.comments})
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md">
                    <Share2 size={18} className="mr-1" /> Share
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md">
                    <Send size={18} className="mr-1" /> Send
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Feed;
