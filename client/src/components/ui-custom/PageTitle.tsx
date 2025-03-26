
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageTitleProps {
  title: string;
  description?: string;
  className?: string;
  children?: ReactNode;
}

export function PageTitle({ title, description, className, children }: PageTitleProps) {
  return (
    <div className={cn("flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4", className)}>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      {children && <div className="flex-shrink-0">{children}</div>}
    </div>
  );
}
