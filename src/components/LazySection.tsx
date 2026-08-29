import React, { ReactNode } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface LazySectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  minHeight?: string | number;
}

export const LazySection: React.FC<LazySectionProps> = ({
  children,
  id,
  className = '',
  threshold = 0.05,
  rootMargin = '150px',
  minHeight = '100px',
}) => {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold,
    rootMargin,
    freezeOnceVisible: true,
  });

  return (
    <div
      ref={ref}
      id={id}
      style={{ minHeight: isVisible ? undefined : minHeight }}
      className={`${className} transition-all duration-700 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0 filter-none'
          : 'opacity-0 translate-y-6 pointer-events-none'
      }`}
    >
      {isVisible ? children : null}
    </div>
  );
};
