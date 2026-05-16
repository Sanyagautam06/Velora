import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  CheckSquare, 
  Users, 
  AlertCircle, 
  BarChart3, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  Plus,
  Command,
  ChevronRight,
  Flame,
  Zap,
  ArrowLeft
} from 'lucide-react';
import { Button, cn } from './UI';
import { Role, User } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  role: Role;
  currentPage: string;
  onPageChange: (page: string) => void;
  user: User;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const Sidebar = ({ role, currentPage, onPageChange, user, isDarkMode, toggleDarkMode, onLogout }: SidebarProps & { onLogout: () => void }) => {
  const adminItems = [
    { id: 'command-center', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'projects', icon: Briefcase, label: 'Projects' },
    { id: 'tasks', icon: CheckSquare, label: 'Tasks' },
    { id: 'roster', icon: Users, label: 'Team' },
    { id: 'deadlines', icon: AlertCircle, label: 'Deadlines' },
    { id: 'reports', icon: BarChart3, label: 'Reports' },
  ];

  const memberItems = [
    { id: 'workspace', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'my-tasks', icon: CheckSquare, label: 'My Tasks' },
    { id: 'my-projects', icon: Briefcase, label: 'My Projects' },
    { id: 'deadlines', icon: AlertCircle, label: 'Deadlines' },
  ];

  const items = role === 'ADMIN' ? adminItems : memberItems;

  return (
    <div className="w-64 h-screen border-r border-slate-200 dark:border-white/5 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl flex flex-col fixed left-0 top-0 z-50 transition-colors duration-500">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-primary/30">
          <Command size={24} />
        </div>
        <span className="text-2xl font-display font-bold tracking-tight bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
          Velora
        </span>
      </div>

      <div className="flex-1 px-4 py-4 space-y-1 overflow-y-auto scrollbar-hide">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-left",
              currentPage === item.id 
                ? "bg-brand-primary text-white shadow-md shadow-brand-primary/20" 
                : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            <item.icon size={20} className={cn("transition-transform duration-200 shrink-0", currentPage !== item.id && "group-hover:scale-110")} />
            <span className="font-medium text-sm">{item.label}</span>
            {currentPage === item.id && (
              <motion.div layoutId="active-nav" className="ml-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <ChevronRight size={16} />
              </motion.div>
            )}
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-slate-100 dark:border-white/5 space-y-4">
        <button 
          onClick={toggleDarkMode}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-all group"
        >
          {isDarkMode ? <Zap size={20} className="text-amber-400" /> : <Command size={20} />}
          <span className="font-medium text-sm">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>

        <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 group relative overflow-hidden">
          <button 
            onClick={() => onPageChange('settings')}
            className="flex flex-1 items-center gap-3 min-w-0"
          >
            <img src={user.avatar} alt="avatar" className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10" />
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
              <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest">{role}</p>
            </div>
          </button>
          <button 
            onClick={onLogout}
            className="text-slate-400 hover:text-rose-500 transition-colors p-2"
            title="Log Out"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export const Topbar = ({ 
  title, 
  currentPage, 
  onBack, 
  onPageChange
}: { 
  title: string, 
  currentPage?: string, 
  onBack?: () => void,
  onPageChange: (page: string) => void
}) => {
  const navigate = useNavigate();
  // Main pages that don't need a back button (since they are top level in their view)
  const isMainPage = currentPage === 'command-center' || currentPage === 'workspace';

  return (
    <div className="h-16 border-b border-slate-200 dark:border-white/5 bg-white/30 dark:bg-slate-900/30 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-40 transition-colors duration-500">
      <div className="flex items-center gap-4">
        {!isMainPage && (
          <button 
            onClick={onBack || (() => window.history.back())}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-white/10 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-all mr-2"
          >
            <ArrowLeft size={16} />
          </button>
        )}
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
           <div className="flex items-center gap-2">
            <h1 className="text-xl font-display font-bold text-slate-900 dark:text-white tracking-tight">{title}</h1>
            <div className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 text-[10px] font-bold text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10">
              V1.0.4
            </div>
           </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <NotificationDropdown />
          <button 
            onClick={() => onPageChange('settings')}
            className={cn(
              "p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors",
              currentPage === 'settings' && "text-brand-primary bg-brand-primary/5"
            )}
          >
            <Settings size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const notifications = [
    { id: 1, text: "New task assigned: Protocol review", time: "2m ago" },
    { id: 2, text: "Alex invited you to Stellar Alpha", time: "1h ago" },
    { id: 3, text: "Project Nebula Genesis completed", time: "3h ago" }
  ];

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl relative transition-colors"
      >
        <Bell size={20} />
        <span className="absolute top-2 right-2 w-2 h-2 bg-brand-primary rounded-full border-2 border-white dark:border-slate-950"></span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-white/10 z-50 overflow-hidden"
            >
              <div className="p-4 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
                <h3 className="font-bold text-sm dark:text-white">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map(n => (
                  <div key={n.id} className="p-4 border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
                    <p className="text-sm dark:text-slate-300 mb-1">{n.text}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{n.time}</p>
                  </div>
                ))}
              </div>
              <div className="p-3 text-center">
                <button className="text-[10px] font-bold text-brand-primary uppercase tracking-widest hover:underline">Clear all</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
