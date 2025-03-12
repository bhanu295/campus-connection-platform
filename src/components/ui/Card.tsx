
import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'outline';
  hoverable?: boolean;
  children: React.ReactNode;
}

const Card = ({ 
  variant = 'default', 
  hoverable = false, 
  className, 
  children, 
  ...props 
}: CardProps) => {
  return (
    <div
      className={cn(
        'rounded-xl overflow-hidden',
        {
          'bg-card text-card-foreground shadow-sm': variant === 'default',
          'glass': variant === 'glass',
          'border border-border bg-background': variant === 'outline',
          'transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]': hoverable,
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CardHeader = ({ className, children, ...props }: CardHeaderProps) => {
  return (
    <div
      className={cn('p-6 flex flex-col space-y-1.5', className)}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

const CardTitle = ({ className, children, ...props }: CardTitleProps) => {
  return (
    <h3
      className={cn('font-semibold leading-none tracking-tight', className)}
      {...props}
    >
      {children}
    </h3>
  );
};

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

const CardDescription = ({ className, children, ...props }: CardDescriptionProps) => {
  return (
    <p
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    >
      {children}
    </p>
  );
};

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CardContent = ({ className, children, ...props }: CardContentProps) => {
  return (
    <div className={cn('p-6 pt-0', className)} {...props}>
      {children}
    </div>
  );
};

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CardFooter = ({ className, children, ...props }: CardFooterProps) => {
  return (
    <div
      className={cn('p-6 pt-0 flex items-center', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
