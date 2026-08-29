import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  sectionId?: string;
  onClick?: () => void;
  active?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onNavigateHome?: () => void;
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  onNavigateHome,
  className = '',
}) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center flex-wrap gap-1.5 text-xs text-slate-500 dark:text-slate-400 ${className}`}
    >
      {/* Home Root */}
      <button
        onClick={() => {
          if (onNavigateHome) {
            onNavigateHome();
          } else {
            const el = document.getElementById('hero');
            if (el) {
              const navOffset = 80;
              const pos = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
              window.scrollTo({ top: pos, behavior: 'smooth' });
            }
          }
        }}
        className="flex items-center gap-1 hover:text-red-600 dark:hover:text-red-400 transition-colors font-medium"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Beranda</span>
      </button>

      {items.map((item, index) => {
        const isLast = index === items.length - 1 || item.active;

        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 shrink-0" />
            {isLast ? (
              <span className="font-semibold text-slate-900 dark:text-white truncate max-w-[200px] sm:max-w-xs">
                {item.label}
              </span>
            ) : (
              <button
                onClick={() => {
                  if (item.onClick) {
                    item.onClick();
                  } else if (item.sectionId) {
                    const el = document.getElementById(item.sectionId);
                    if (el) {
                      const navOffset = 80;
                      const pos = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
                      window.scrollTo({ top: pos, behavior: 'smooth' });
                    }
                  }
                }}
                className="hover:text-red-600 dark:hover:text-red-400 transition-colors font-medium truncate max-w-[150px] sm:max-w-xs"
              >
                {item.label}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
