
import React from 'react';
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  children,
  ...props
}) => {
  const baseStyles = "rounded-full font-medium transition-all duration-300 flex items-center justify-center focus-ring btn-press";
  
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    outline: "border border-input bg-transparent hover:bg-secondary hover:text-secondary-foreground",
    ghost: "hover:bg-secondary text-foreground"
  };
  
  const sizes = {
    sm: "text-sm px-4 py-2",
    md: "text-base px-5 py-2.5",
    lg: "text-lg px-6 py-3"
  };
  
  const loadingStyles = loading ? "opacity-80 pointer-events-none" : "";
  
  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        loadingStyles,
        className
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <>
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
