
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

export interface OrderStatus {
  step: number;
  label: string;
  time: string;
  completed: boolean;
}

export interface OrderTrackerProps {
  orderId: string;
  estimatedDelivery: string;
  currentStatus: number; // 1-5: ordered, confirmed, shipped, out for delivery, delivered
}

const OrderTracker = ({ orderId, estimatedDelivery, currentStatus }: OrderTrackerProps) => {
  const [progress, setProgress] = useState(0);
  
  // Calculate progress percentage based on current status (1-5)
  useEffect(() => {
    const percentage = (currentStatus / 5) * 100;
    
    // Animate progress over 700ms
    let start = 0;
    const target = percentage;
    const duration = 700;
    let startTime: number | null = null;
    
    const animateProgress = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setProgress(start + progress * (target - start));
      
      if (progress < 1) {
        window.requestAnimationFrame(animateProgress);
      }
    };
    
    window.requestAnimationFrame(animateProgress);
    
    return () => {
      startTime = null;
    };
  }, [currentStatus]);
  
  const statuses: OrderStatus[] = [
    {
      step: 1,
      label: "Order Placed",
      time: new Date().toLocaleDateString(),
      completed: currentStatus >= 1
    },
    {
      step: 2,
      label: "Order Confirmed",
      time: new Date().toLocaleDateString(),
      completed: currentStatus >= 2
    },
    {
      step: 3,
      label: "Shipped",
      time: new Date().toLocaleDateString(),
      completed: currentStatus >= 3
    },
    {
      step: 4,
      label: "Out for Delivery",
      time: new Date().toLocaleDateString(),
      completed: currentStatus >= 4
    },
    {
      step: 5,
      label: "Delivered",
      time: estimatedDelivery,
      completed: currentStatus >= 5
    }
  ];

  return (
    <div className="w-full p-6 bg-background border border-border rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Order Status</h3>
        <span className="text-sm text-muted-foreground">Order #{orderId}</span>
      </div>
      
      <div className="mb-6">
        <Progress value={progress} className="h-2" />
      </div>
      
      <div className="space-y-8">
        {statuses.map((status) => (
          <div key={status.step} className="relative flex items-center">
            <div className={`z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 ${
              status.completed 
                ? "bg-primary border-primary text-primary-foreground" 
                : "bg-background border-muted-foreground text-muted-foreground"
            }`}>
              {status.completed ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                status.step
              )}
            </div>
            
            {status.step < statuses.length && (
              <div className={`absolute top-4 left-4 -ml-px h-full w-0.5 ${
                status.completed ? "bg-primary" : "bg-muted-foreground/20"
              }`} aria-hidden="true"></div>
            )}
            
            <div className="ml-4">
              <h4 className={`text-sm font-medium ${status.completed ? "text-foreground" : "text-muted-foreground"}`}>
                {status.label}
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                {status.completed ? "Completed on " : "Expected by "}{status.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-sm">
        <p className="text-muted-foreground">
          Estimated delivery: <span className="font-medium text-foreground">{estimatedDelivery}</span>
        </p>
      </div>
    </div>
  );
};

export default OrderTracker;
