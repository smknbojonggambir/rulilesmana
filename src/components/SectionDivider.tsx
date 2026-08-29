import React from 'react';
import { motion, Variants } from 'motion/react';
import {
  Sparkles,
  Layers,
  GraduationCap,
  Award,
  Code2,
  Bookmark,
  Compass,
  Palette,
  Camera,
  FolderGit2,
  Globe,
  Mail,
  Flame,
} from 'lucide-react';

export type DividerIconType =
  | 'sparkles'
  | 'diamond'
  | 'layers'
  | 'graduation'
  | 'award'
  | 'code'
  | 'palette'
  | 'camera'
  | 'compass'
  | 'globe'
  | 'mail'
  | 'flame'
  | 'bookmark'
  | 'dot';

export type DividerVariant =
  | 'default'
  | 'rose'
  | 'indigo'
  | 'emerald'
  | 'amber'
  | 'cyan';

interface SectionDividerProps {
  variant?: DividerVariant;
  icon?: DividerIconType;
  label?: string;
  className?: string;
  id?: string;
}

const leftLineVariants: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const rightLineVariants: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const badgeVariants: Variants = {
  hidden: { scale: 0.7, opacity: 0, y: 8 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.15,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
};

const dotLeftVariants: Variants = {
  hidden: { scale: 0, opacity: 0, x: 10 },
  visible: {
    scale: 1,
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: 0.3,
      ease: 'easeOut',
    },
  },
};

const dotRightVariants: Variants = {
  hidden: { scale: 0, opacity: 0, x: -10 },
  visible: {
    scale: 1,
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: 0.3,
      ease: 'easeOut',
    },
  },
};

export const SectionDivider: React.FC<SectionDividerProps> = ({
  variant = 'default',
  icon = 'sparkles',
  label,
  className = '',
  id,
}) => {
  const getIcon = () => {
    const iconClass = 'w-3.5 h-3.5';
    switch (icon) {
      case 'sparkles':
        return <Sparkles className={iconClass} />;
      case 'layers':
        return <Layers className={iconClass} />;
      case 'graduation':
        return <GraduationCap className={iconClass} />;
      case 'award':
        return <Award className={iconClass} />;
      case 'code':
        return <Code2 className={iconClass} />;
      case 'palette':
        return <Palette className={iconClass} />;
      case 'camera':
        return <Camera className={iconClass} />;
      case 'compass':
        return <Compass className={iconClass} />;
      case 'globe':
        return <Globe className={iconClass} />;
      case 'mail':
        return <Mail className={iconClass} />;
      case 'flame':
        return <Flame className={iconClass} />;
      case 'bookmark':
        return <Bookmark className={iconClass} />;
      case 'diamond':
        return (
          <div className="w-2.5 h-2.5 rotate-45 rounded-[2px] bg-current" />
        );
      case 'dot':
      default:
        return <div className="w-2 h-2 rounded-full bg-current" />;
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'rose':
        return {
          lineLeft:
            'from-transparent via-rose-300 to-rose-500/80 dark:via-rose-500/20 dark:to-rose-500/60',
          lineRight:
            'from-rose-500/80 via-rose-300 to-transparent dark:from-rose-500/60 dark:via-rose-500/20 dark:to-transparent',
          badge:
            'bg-rose-50/90 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200/80 dark:border-rose-800/60 shadow-rose-500/5',
          glow: 'bg-rose-500/20 dark:bg-rose-500/30',
          accentDot: 'bg-rose-400 dark:bg-rose-500',
        };
      case 'indigo':
        return {
          lineLeft:
            'from-transparent via-indigo-300 to-indigo-500/80 dark:via-indigo-500/20 dark:to-indigo-500/60',
          lineRight:
            'from-indigo-500/80 via-indigo-300 to-transparent dark:from-indigo-500/60 dark:via-indigo-500/20 dark:to-transparent',
          badge:
            'bg-indigo-50/90 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-200/80 dark:border-indigo-800/60 shadow-indigo-500/5',
          glow: 'bg-indigo-500/20 dark:bg-indigo-500/30',
          accentDot: 'bg-indigo-400 dark:bg-indigo-500',
        };
      case 'emerald':
        return {
          lineLeft:
            'from-transparent via-emerald-300 to-emerald-500/80 dark:via-emerald-500/20 dark:to-emerald-500/60',
          lineRight:
            'from-emerald-500/80 via-emerald-300 to-transparent dark:from-emerald-500/60 dark:via-emerald-500/20 dark:to-transparent',
          badge:
            'bg-emerald-50/90 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200/80 dark:border-emerald-800/60 shadow-emerald-500/5',
          glow: 'bg-emerald-500/20 dark:bg-emerald-500/30',
          accentDot: 'bg-emerald-400 dark:bg-emerald-500',
        };
      case 'amber':
        return {
          lineLeft:
            'from-transparent via-amber-300 to-amber-500/80 dark:via-amber-500/20 dark:to-amber-500/60',
          lineRight:
            'from-amber-500/80 via-amber-300 to-transparent dark:from-amber-500/60 dark:via-amber-500/20 dark:to-transparent',
          badge:
            'bg-amber-50/90 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200/80 dark:border-amber-800/60 shadow-amber-500/5',
          glow: 'bg-amber-500/20 dark:bg-amber-500/30',
          accentDot: 'bg-amber-400 dark:bg-amber-500',
        };
      case 'cyan':
        return {
          lineLeft:
            'from-transparent via-cyan-300 to-cyan-500/80 dark:via-cyan-500/20 dark:to-cyan-500/60',
          lineRight:
            'from-cyan-500/80 via-cyan-300 to-transparent dark:from-cyan-500/60 dark:via-cyan-500/20 dark:to-transparent',
          badge:
            'bg-cyan-50/90 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 border-cyan-200/80 dark:border-cyan-800/60 shadow-cyan-500/5',
          glow: 'bg-cyan-500/20 dark:bg-cyan-500/30',
          accentDot: 'bg-cyan-400 dark:bg-cyan-500',
        };
      case 'default':
      default:
        return {
          lineLeft:
            'from-transparent via-slate-300 to-slate-400/80 dark:via-slate-700/50 dark:to-slate-600/70',
          lineRight:
            'from-slate-400/80 via-slate-300 to-transparent dark:from-slate-600/70 dark:via-slate-700/50 dark:to-transparent',
          badge:
            'bg-white/90 dark:bg-slate-900/90 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 shadow-slate-900/5',
          glow: 'bg-slate-400/10 dark:bg-slate-400/10',
          accentDot: 'bg-slate-400 dark:bg-slate-600',
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div
      id={id}
      role="separator"
      aria-label={label || 'Section Divider'}
      className={`relative w-full py-6 sm:py-8 flex items-center justify-center select-none overflow-hidden ${className}`}
    >
      {/* Outer wrapper with responsive max-width */}
      <div className="w-full max-w-5xl px-4 flex items-center justify-center gap-3 sm:gap-4 relative">
        {/* Left Decorative Dot Accent */}
        <motion.div
          variants={dotLeftVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-20px' }}
          className={`hidden sm:block w-1.5 h-1.5 rounded-full shrink-0 ${styles.accentDot} opacity-60`}
        />

        {/* Left Gradient Expanding Wing */}
        <div className="relative flex-1 h-[1px] overflow-hidden">
          <motion.div
            variants={leftLineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-20px' }}
            className={`w-full h-[1.5px] bg-gradient-to-r ${styles.lineLeft} origin-right`}
          />
        </div>

        {/* Center Decorative Emblem / Pill Badge */}
        <motion.div
          variants={badgeVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-20px' }}
          whileHover={{ scale: 1.06, transition: { duration: 0.2 } }}
          className="relative shrink-0 flex items-center justify-center cursor-default group"
        >
          {/* Subtle Ambient Backlight Glow */}
          <div
            className={`absolute -inset-1.5 rounded-full blur-md opacity-40 group-hover:opacity-80 transition-opacity duration-300 ${styles.glow}`}
          />

          {/* Badge Container */}
          <div
            className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold tracking-wide backdrop-blur-md shadow-xs transition-all duration-300 ${styles.badge}`}
          >
            <span className="shrink-0 transition-transform duration-300 group-hover:rotate-12">
              {getIcon()}
            </span>
            {label && (
              <span className="text-[11px] font-medium tracking-wider uppercase whitespace-nowrap opacity-90">
                {label}
              </span>
            )}
          </div>
        </motion.div>

        {/* Right Gradient Expanding Wing */}
        <div className="relative flex-1 h-[1px] overflow-hidden">
          <motion.div
            variants={rightLineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-20px' }}
            className={`w-full h-[1.5px] bg-gradient-to-l ${styles.lineRight} origin-left`}
          />
        </div>

        {/* Right Decorative Dot Accent */}
        <motion.div
          variants={dotRightVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-20px' }}
          className={`hidden sm:block w-1.5 h-1.5 rounded-full shrink-0 ${styles.accentDot} opacity-60`}
        />
      </div>
    </div>
  );
};
