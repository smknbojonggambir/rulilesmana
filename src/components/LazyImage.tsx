import React, { useState, useEffect, useRef } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  rootMargin?: string;
  threshold?: number;
  placeholderClassName?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  rootMargin = '200px',
  threshold = 0.01,
  placeholderClassName = '',
  ...rest
}) => {
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    if (!('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(node);
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${wrapperClassName}`}
    >
      {/* Shimmer skeleton placeholder while loading or waiting for intersection */}
      {(!isLoaded || hasError) && (
        <div
          className={`absolute inset-0 bg-slate-200 dark:bg-slate-800 flex items-center justify-center transition-opacity duration-300 ${
            !hasError ? 'animate-pulse' : ''
          } ${placeholderClassName}`}
        >
          {hasError ? (
            <div className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500">
              <ImageIcon className="w-6 h-6 stroke-[1.5]" />
              <span className="text-[10px] font-medium">Gambar tidak dapat dimuat</span>
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-transparent via-slate-300/40 dark:via-slate-700/40 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
          )}
        </div>
      )}

      {/* Actual image rendered only once in view */}
      {isInView && !hasError && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`${className} transition-all duration-700 ease-out ${
            isLoaded ? 'opacity-100 filter-none scale-100' : 'opacity-0 scale-95 blur-sm'
          }`}
          referrerPolicy="no-referrer"
          {...rest}
        />
      )}
    </div>
  );
};
