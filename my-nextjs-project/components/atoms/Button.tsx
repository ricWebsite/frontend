/**
 * Button Component - Atomic component for Nozah
 * Reusable button with various styles and sizes
 */

import React from 'react';
import { COLORS } from '../../shared/const';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      icon,
      iconPosition = 'left',
      disabled,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles =
      'font-[Lato] font-semibold transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    // Size styles
    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-6 py-2.5 text-base',
      lg: 'px-8 py-3 text-lg',
    };

    // Inline styles for dynamic colors
    const getInlineStyles = (): React.CSSProperties => {
      const baseColor = {
        backgroundColor:
          variant === 'primary'
            ? COLORS.PRIMARY
            : variant === 'secondary'
              ? COLORS.SECONDARY
              : variant === 'accent'
                ? COLORS.ACCENT
                : 'transparent',
        color:
          variant === 'primary' || variant === 'secondary' || variant === 'accent'
            ? COLORS.BLACK
            : COLORS.PRIMARY,
        borderColor: variant === 'outline' ? COLORS.PRIMARY : 'transparent',
        borderWidth: variant === 'outline' ? '2px' : '0px',
      };

      return baseColor;
    };

    const fullWidthClass = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`${baseStyles} ${sizeStyles[size]} ${fullWidthClass} ${className}`}
        style={getInlineStyles()}
        {...props}
      >
        <span className="flex items-center justify-center gap-2">
          {icon && iconPosition === 'left' && !loading && <span>{icon}</span>}
          {loading && (
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          )}
          {children}
          {icon && iconPosition === 'right' && !loading && <span>{icon}</span>}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;

