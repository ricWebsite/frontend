/**
 * Input Component - Atomic component for Nozah
 * Reusable input field with validation and styling
 */

import React from 'react';
import { COLORS } from '../../shared/const';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      icon,
      iconPosition = 'left',
      fullWidth = true,
      className = '',
      ...props
    },
    ref
  ) => {
    const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const baseStyles =
      'w-full px-4 py-2.5 rounded-lg border-2 transition-all duration-300 font-[Lato] focus:outline-none';

    const borderColor = error
      ? COLORS.ERROR
      : props.disabled
        ? COLORS.BORDER
        : COLORS.PRIMARY;

    const focusBorderColor = error ? COLORS.ERROR : COLORS.PRIMARY;

    const inlineStyles: React.CSSProperties = {
      borderColor: borderColor,
      backgroundColor: props.disabled ? COLORS.LIGHT_GRAY : COLORS.WHITE,
      color: props.disabled ? COLORS.MEDIUM_GRAY : COLORS.BLACK,
    };

    const focusStyles: React.CSSProperties = {
      borderColor: focusBorderColor,
      boxShadow: `0 0 0 3px ${focusBorderColor}20`,
    };

    const containerClass = fullWidth ? 'w-full' : '';
    const wrapperClass = icon ? 'relative' : '';

    return (
      <div className={`${containerClass}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-semibold mb-2"
            style={{ color: COLORS.BLACK }}
          >
            {label}
          </label>
        )}

        <div className={wrapperClass}>
          {icon && iconPosition === 'left' && (
            <span
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg"
              style={{ color: COLORS.PRIMARY }}
            >
              {icon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            className={`${baseStyles} ${icon && iconPosition === 'left' ? 'pl-10' : ''} ${icon && iconPosition === 'right' ? 'pr-10' : ''} ${className}`}
            style={inlineStyles}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = focusStyles.borderColor as string;
              e.currentTarget.style.boxShadow = focusStyles.boxShadow as string;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = borderColor;
              e.currentTarget.style.boxShadow = 'none';
            }}
            {...props}
          />

          {icon && iconPosition === 'right' && (
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lg"
              style={{ color: COLORS.PRIMARY }}
            >
              {icon}
            </span>
          )}
        </div>

        {error && (
          <p className="text-sm mt-1" style={{ color: COLORS.ERROR }}>
            {error}
          </p>
        )}

        {helperText && !error && (
          <p className="text-sm mt-1" style={{ color: COLORS.MEDIUM_GRAY }}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;

