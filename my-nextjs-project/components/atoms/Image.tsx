/**
 * Image Component - Atomic component for Nozah
 * Optimized image with lazy loading and error handling
 */

import React, { useState } from 'react';
import { COLORS } from '../../shared/const';

export interface ImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down';
  loading?: 'lazy' | 'eager';
  showPlaceholder?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      alt,
      width,
      height,
      objectFit = 'cover',
      loading = 'lazy',
      showPlaceholder = true,
      onLoad,
      onError,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const handleLoad = () => {
      setIsLoading(false);
      onLoad?.();
    };

    const handleError = () => {
      setIsLoading(false);
      setHasError(true);
      onError?.();
    };

    const inlineStyles: React.CSSProperties = {
      objectFit: objectFit,
      width: width ? `${width}px` : '100%',
      height: height ? `${height}px` : 'auto',
      ...style,
    };

    if (hasError) {
      return (
        <div
          className="flex items-center justify-center bg-gray-200 rounded-lg"
          style={{
            width: width ? `${width}px` : '100%',
            height: height ? `${height}px` : '200px',
            backgroundColor: COLORS.LIGHT_GRAY,
          }}
        >
          <span style={{ color: COLORS.MEDIUM_GRAY }}>Failed to load image</span>
        </div>
      );
    }

    return (
      <div
        className="relative overflow-hidden rounded-lg"
        style={{
          width: width ? `${width}px` : '100%',
          height: height ? `${height}px` : 'auto',
        }}
      >
        {isLoading && showPlaceholder && (
          <div
            className="absolute inset-0 animate-pulse"
            style={{ backgroundColor: COLORS.LIGHT_GRAY }}
          />
        )}

        <img
          ref={ref}
          src={src}
          alt={alt}
          loading={loading}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full ${className}`}
          style={inlineStyles}
          {...props}
        />
      </div>
    );
  }
);

Image.displayName = 'Image';

export default Image;

