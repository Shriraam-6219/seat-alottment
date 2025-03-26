
import React, { useState } from 'react';
import { cn } from "@/lib/utils";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  helperText,
  error,
  className,
  labelClassName,
  inputClassName,
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  
  return (
    <div className={cn("space-y-1", className)}>
      {label && (
        <label 
          htmlFor={props.id}
          className={cn(
            "text-sm font-medium text-foreground",
            labelClassName
          )}
        >
          {label}
        </label>
      )}
      <div 
        className={cn(
          "relative overflow-hidden rounded-lg transition-all duration-300",
          focused ? "ring-2 ring-primary/30" : "ring-1 ring-input",
          error ? "ring-destructive/30" : ""
        )}
      >
        <input
          className={cn(
            "w-full px-4 py-2.5 bg-white dark:bg-gray-950 outline-none transition-all duration-300",
            "text-foreground placeholder:text-muted-foreground",
            inputClassName
          )}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />
      </div>
      {(helperText || error) && (
        <p className={cn(
          "text-xs",
          error ? "text-destructive" : "text-muted-foreground"
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};

export default InputField;
