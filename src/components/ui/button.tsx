import React from 'react';

export const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className = '', ...props }, ref) => (
    <button
      ref={ref}
      className={`px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 ${className}`}
      {...props}
    />
  )
);

Button.displayName = 'Button';
