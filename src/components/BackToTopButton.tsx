import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

interface BackToTopButtonProps {
  heroElementId?: string;
}

export const BackToTopButton: React.FC<BackToTopButtonProps> = ({
  heroElementId = 'hero',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const heroElement = document.getElementById(heroElementId);

    if (heroElement && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          // When hero is NOT intersecting and user has scrolled down (boundingClientRect.top < 0), show button
          const isPast = !entry.isIntersecting && entry.boundingClientRect.top < 0;
          setIsVisible(isPast);
        },
        {
          root: null,
          threshold: 0,
          rootMargin: '-50px 0px 0px 0px',
        }
      );

      observer.observe(heroElement);

      return () => {
        observer.disconnect();
      };
    } else {
      // Fallback scroll listener
      const handleScroll = () => {
        const heroEl = document.getElementById(heroElementId);
        const heroHeight = heroEl ? heroEl.offsetHeight : 500;
        setIsVisible(window.scrollY > heroHeight * 0.8);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [heroElementId]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto scale-100'
          : 'opacity-0 translate-y-4 pointer-events-none scale-90'
      }`}
    >
      <div className="relative flex items-center">
        {/* Tooltip on hover */}
        <div
          className={`absolute right-full mr-3 px-2.5 py-1 rounded-lg bg-slate-900/90 dark:bg-slate-100/95 text-white dark:text-slate-900 text-xs font-semibold whitespace-nowrap shadow-md pointer-events-none transition-all duration-200 ${
            isHovered
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-2'
          }`}
        >
          Kembali ke Atas
        </div>

        {/* Floating Action Button */}
        <button
          id="back-to-top-button"
          type="button"
          onClick={scrollToTop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label="Kembali ke atas halaman"
          className="group p-3.5 sm:p-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white shadow-xl shadow-red-600/30 hover:shadow-red-600/50 hover:scale-110 active:scale-95 transition-all duration-200 border border-white/20 dark:border-white/10 flex items-center justify-center cursor-pointer"
        >
          <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1" />
        </button>
      </div>
    </div>
  );
};
