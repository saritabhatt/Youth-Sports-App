import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange?: (checked: boolean) => void;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = '', onCheckedChange, ...props }, ref) => (
    <input
      ref={ref}
      type="checkbox"
      className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer ${className}`}
      onChange={(e) => {
        onCheckedChange?.(e.currentTarget.checked);
      }}
      {...props}
    />
  )
);

Checkbox.displayName = 'Checkbox';
