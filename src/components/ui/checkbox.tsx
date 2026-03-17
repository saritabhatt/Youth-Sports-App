import React from 'react';

export const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { onCheckedChange?: (checked: boolean) => void }
>(({ onCheckedChange, ...props }, ref) => (
  <input
    ref={ref}
    type="checkbox"
    onChange={(e) => onCheckedChange?.(e.currentTarget.checked)}
    {...props}
  />
));

Checkbox.displayName = 'Checkbox';
