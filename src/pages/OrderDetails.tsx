
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import OrderTracker from '@/components/OrderTracker';
import { ArrowLeft, Package } from 'lucide-react';
import { toast } from 'sonner';

// Mock order data - in a real app, this would come from your Spring Boot backend
const mockOrder = {
  id: '1234567',
  date: '2023-09-01',
  status: 3, // 1-5
  estimatedDelivery: 'September 10, 2023',
  total: 42.97,
  items: [
    {
      id: '1',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      price: 9.99,
      quantity: 1,
      coverImage: 'https://source.unsplash.com/random/300x400?book'
    },
    {
      id: '3',
      title: '1984',
      author: 'George Orwell',
      price: 10.99,
      quantity: 3,
      coverImage: 'https://source.unsplash.com/random/300x400?dystopia'
    }
  ],
  shippingAddress: {
    name: 'John Doe',
    street: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'USA'
  }
};

const OrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call to get order details
    const timer = setTimeout(() => {
      // In a real app, fetch from Spring Boot backend
      setOrder(mockOrder);
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen dark:bg-gray-900">
        <Navbar isAuthenticated={false} />
        <div className="page-container pt-24">
          <div className="animate-pulse">
            <div className="h-8 bg-muted w-1/4 rounded mb-8"></div>
            <div className="h-64 bg-muted rounded-xl mb-8"></div>
            <div className="h-96 bg-muted rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!order) {
    return (
      <div className="min-h-screen dark:bg-gray-900">
        <Navbar isAuthenticated={false} />
        <div className="page-container pt-24 text-center">
          <h1 className="text-3xl font-medium mb-6 dark:text-white">Order Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The order you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/profile" className="btn-primary">
            View All Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark:bg-gray-900">
      <Navbar isAuthenticated={true} />
      
      <div className="page-container pt-24">
        <Link to="/profile" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft size={16} className="mr-2" />
          Back to Profile
        </Link>
        
        <div className="mb-6">
          <h1 className="text-3xl font-medium mb-2 dark:text-white">Order #{order.id}</h1>
          <p className="text-muted-foreground">
            Placed on {order.date}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <OrderTracker 
              orderId={order.id} 
              estimatedDelivery={order.estimatedDelivery}
              currentStatus={order.status}
            />
            
            <div className="mt-8 glass-card p-6 dark:bg-gray-800 dark:border-gray-700">
              <h2 className="text-xl font-medium mb-4 dark:text-white">Order Items</h2>
              
              <div className="space-y-6">
                {order.items.map((item: any) => (
                  <div key={item.id} className="flex border-b border-border pb-6 last:border-b-0 last:pb-0 dark:border-gray-700">
                    <div className="w-20 h-24 overflow-hidden rounded">
                      <img 
                        src={item.coverImage} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="ml-4 flex-1">
                      <h3 className="font-medium dark:text-white">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">By {item.author}</p>
                      
                      <div className="flex justify-between mt-2">
                        <span className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </span>
                        <span className="font-medium dark:text-white">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <div className="glass-card p-6 sticky top-20 dark:bg-gray-800 dark:border-gray-700">
              <h2 className="text-xl font-medium mb-4 dark:text-white">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="dark:text-white">${order.total.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="dark:text-white">$4.99</span>
                </div>
                
                <div className="border-t pt-3 font-medium flex justify-between dark:border-gray-700">
                  <span className="dark:text-white">Total</span>
                  <span className="dark:text-white">${(order.total + 4.99).toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <h3 className="font-medium dark:text-white">Shipping Address</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>{order.shippingAddress.name}</p>
                  <p>{order.shippingAddress.street}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </div>
              
              <button
                onClick={() => toast.success("Track order functionality will be connected to the Spring Boot backend")}
                className="mt-6 flex items-center justify-center w-full btn-secondary"
              >
                <Package size={16} className="mr-2" />
                Track Package
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
