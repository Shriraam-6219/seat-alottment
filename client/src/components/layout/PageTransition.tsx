
import React from 'react';
import { cn } from "@/lib/utils";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const PageTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  className,
  delay = 0 
}) => {
  return (
    <div 
      className={cn(
        "animate-fade-in opacity-0",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default PageTransition;
