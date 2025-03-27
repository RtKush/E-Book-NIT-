
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { User, Image, ThumbsUp, MessageSquare, Share2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

interface Post {
  id: number;
  author: {
    name: string;
    title: string;
    avatar?: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  image?: string;
}

const Feed = ({ isAuthenticated = false }) => {
  const [newPost, setNewPost] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  
  useEffect(() => {
    // Load user data
    const authUserString = localStorage.getItem('authUser');
    if (authUserString) {
      try {
        const authUser = JSON.parse(authUserString);
        setCurrentUser(authUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
    
    // Load sample posts
    setPosts([
      {
        id: 1,
        author: {
          name: 'Sarah Johnson',
          title: 'HR Manager at TechCorp',
          avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
        },
        content: 'Excited to announce that we are hiring for multiple positions in our tech department! If you\'re passionate about innovation and want to work with cutting-edge technology, check out our careers page.',
        timestamp: '2h ago',
        likes: 76,
        comments: 14
      },
      {
        id: 2,
        author: {
          name: 'Alex Chen',
          title: 'Software Engineer at StartupX',
          avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
        },
        content: 'Just published my new article on microservices architecture. Check it out and let me know your thoughts!',
        timestamp: '4h ago',
        likes: 43,
        comments: 8,
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80'
      },
      {
        id: 3,
        author: {
          name: 'Jordan Williams',
          title: 'Product Manager',
          avatar: 'https://randomuser.me/api/portraits/women/45.jpg'
        },
        content: 'Attended an amazing product management conference last week. So many insights on building customer-centric products!',
        timestamp: '1d ago',
        likes: 112,
        comments: 22
      }
    ]);
  }, []);
  
  const handleSubmitPost = () => {
    if (!newPost.trim()) return;
    
    const newPostObj: Post = {
      id: Date.now(),
      author: {
        name: currentUser?.name || 'Anonymous User',
        title: currentUser?.title || 'LinkedIn Member',
        avatar: currentUser?.avatar
      },
      content: newPost,
      timestamp: 'Just now',
      likes: 0,
      comments: 0
    };
    
    setPosts([newPostObj, ...posts]);
    setNewPost('');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar isAuthenticated={isAuthenticated} />
      
      <div className="container mx-auto px-4 pt-20 pb-10">
        <div className="max-w-2xl mx-auto">
          {/* Post creation */}
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <Avatar>
                  {currentUser?.avatar ? (
                    <img src={currentUser.avatar} alt={currentUser.name} />
                  ) : (
                    <User className="h-full w-full p-2" />
                  )}
                </Avatar>
              </div>
              <div className="flex-grow">
                <Textarea 
                  placeholder="What's on your mind?"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="mb-3 resize-none"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost" className="text-gray-500">
                      <Image size={18} className="mr-1" />
                      Photo
                    </Button>
                    {/* More buttons can be added here */}
                  </div>
                  <Button 
                    size="sm" 
                    onClick={handleSubmitPost}
                    disabled={!newPost.trim()}
                  >
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Feed */}
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Avatar>
                      {post.author.avatar ? (
                        <img src={post.author.avatar} alt={post.author.name} />
                      ) : (
                        <User className="h-full w-full p-2" />
                      )}
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{post.author.name}</h3>
                      <p className="text-sm text-gray-500">{post.author.title}</p>
                      <p className="text-xs text-gray-400">{post.timestamp}</p>
                    </div>
                  </div>
                  
                  <p className="mb-3">{post.content}</p>
                  
                  {post.image && (
                    <div className="mb-3 -mx-4">
                      <img src={post.image} alt="Post attachment" className="w-full" />
                    </div>
                  )}
                  
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span>{post.likes} likes</span>
                    <span className="mx-1">•</span>
                    <span>{post.comments} comments</span>
                  </div>
                  
                  <Separator className="my-2" />
                  
                  <div className="flex justify-between pt-1">
                    <Button variant="ghost" size="sm" className="flex-1 text-gray-600">
                      <ThumbsUp size={18} className="mr-2" />
                      Like
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1 text-gray-600">
                      <MessageSquare size={18} className="mr-2" />
                      Comment
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1 text-gray-600">
                      <Share2 size={18} className="mr-2" />
                      Share
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1 text-gray-600">
                      <Send size={18} className="mr-2" />
                      Send
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
