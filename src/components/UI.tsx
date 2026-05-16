import React from 'react';
import { motion, HTMLMotionProps, AnimatePresence } from 'motion/react';
import { Zap } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-brand-primary text-white hover:bg-brand-primary/90 shadow-lg shadow-brand-primary/25',
      secondary: 'bg-brand-secondary text-white hover:bg-brand-secondary/90 shadow-lg shadow-brand-secondary/25',
      outline: 'border-2 border-slate-200 bg-transparent hover:bg-slate-50 text-slate-700 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5',
      ghost: 'bg-transparent hover:bg-slate-100 text-slate-600 dark:text-slate-400 dark:hover:bg-white/5',
      danger: 'bg-rose-500 text-white hover:bg-rose-600 shadow-lg shadow-rose-500/25',
      glass: 'glass dark:glass-dark hover:bg-white/80 dark:hover:bg-white/10 text-slate-800 dark:text-white'
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs rounded-lg',
      md: 'px-5 py-2.5 text-sm font-medium rounded-xl',
      lg: 'px-8 py-4 text-base font-semibold rounded-2xl',
      icon: 'p-2 rounded-lg'
    };

    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
          variants[variant],
          sizes[size],
          className
        )}
        {...(props as any)}
      >
        {isLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </motion.button>
    );
  }
);

export const Card = ({ children, className, hover = true, ...props }: { children: React.ReactNode; className?: string; hover?: boolean; [key: string]: any }) => (
  <motion.div
    {...props}
    whileHover={hover ? { y: -5, boxShadow: '0 20px 40px -20px rgba(0,0,0,0.3)' } : {}}
    className={cn('glass dark:glass-dark rounded-2xl p-6 transition-all duration-300', className)}
  >
    {children}
  </motion.div>
);

export const Badge = ({ children, variant = 'neutral', className }: { children: React.ReactNode; variant?: 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'urgent'; className?: string; key?: React.Key }) => {
  const styles = {
    neutral: 'bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-300',
    success: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400',
    warning: 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400',
    danger: 'bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-400',
    info: 'bg-sky-100 text-sky-800 dark:bg-sky-500/20 dark:text-sky-400',
    urgent: 'bg-brand-accent/20 text-brand-accent border border-brand-accent/30 dark:bg-brand-accent/30 dark:border-brand-accent/40'
  };
  return (
    <span className={cn('px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider', styles[variant], className)}>
      {children}
    </span>
  );
};

export const Toast = ({ message, type = 'success', onClose }: { message: string; type?: 'success' | 'error' | 'info'; onClose: () => void, key?: React.Key }) => (
  <motion.div
    initial={{ y: 50, opacity: 0, scale: 0.9 }}
    animate={{ y: 0, opacity: 1, scale: 1 }}
    exit={{ y: 20, opacity: 0, scale: 0.9 }}
    className={cn(
      "fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border transition-colors",
      type === 'error' ? "bg-rose-500 text-white border-rose-600" : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-white/10 dark:border-black/5"
    )}
  >
    <Zap size={18} className={type === 'error' ? "text-white" : "text-brand-primary"} />
    <span className="text-sm font-bold tracking-tight">{message}</span>
    <button onClick={onClose} className="hover:opacity-50 transition-opacity ml-2">
       <span className="text-lg">×</span>
    </button>
  </motion.div>
);
