import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  Palette, 
  Monitor, 
  Globe,
  Save,
  Check,
  ChevronRight,
  Camera,
  Mail,
  Lock,
  Zap,
  ArrowLeft
} from 'lucide-react';
import { Card, Button, Badge, cn, Toast } from '../components/UI';
import { motion, AnimatePresence } from 'motion/react';

export const SettingsPage = ({ 
  user, 
  onUpdateUser, 
  onBack, 
  isDarkMode, 
  setIsDarkMode 
}: { 
  user: any, 
  onUpdateUser: (data: any) => void, 
  onBack: () => void,
  isDarkMode: boolean;
  setIsDarkMode: (v: boolean) => void;
}) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    avatar: user.avatar,
  });
  
  const [toggles, setToggles] = useState(() => {
    const saved = localStorage.getItem('velora_toggles');
    return saved ? JSON.parse(saved) : {
      mission: true,
      temporal: true,
      streak: true,
      activity: true
    };
  });

  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('velora_theme_mode') || 'dark';
  });

  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const handleToggle = (key: string) => {
    const newToggles = { ...toggles, [key]: !toggles[key] };
    setToggles(newToggles);
    localStorage.setItem('velora_toggles', JSON.stringify(newToggles));
  };

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme);
    localStorage.setItem('velora_theme_mode', theme);
    if (theme === 'dark') setIsDarkMode(true);
    else if (theme === 'light') setIsDarkMode(false);
    else {
      // Adaptive
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      onUpdateUser({ ...user, ...formData });
      setIsSaving(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1000);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="p-8 space-y-8 max-w-[1200px] mx-auto pb-20">
      <AnimatePresence>
        {showToast && (
          <Toast 
            message="Profile updated successfully." 
            type="success"
            onClose={() => setShowToast(false)}
          />
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex items-center gap-4">
           <button onClick={onBack} className="p-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
             <ArrowLeft size={18} />
           </button>
           <div>
             <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight italic uppercase">Settings</h2>
             <p className="text-slate-500 dark:text-slate-400 font-medium">Manage your profile, security, and notification preferences.</p>
           </div>
        </div>
        <Button onClick={handleSave} className="gap-2 rounded-2xl h-12 uppercase tracking-widest text-[10px] font-bold" isLoading={isSaving}>
           <Save size={16} />
           <span>Save Changes</span>
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-72 space-y-2">
           {tabs.map((tab) => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id)}
               className={cn(
                 "w-full flex items-center justify-between p-4 rounded-2xl transition-all font-bold text-sm tracking-tight",
                 activeTab === tab.id 
                  ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20" 
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5"
               )}
             >
               <div className="flex items-center gap-3">
                  <tab.icon size={18} />
                  <span>{tab.label}</span>
               </div>
               {activeTab === tab.id && <ChevronRight size={16} />}
             </button>
           ))}
        </aside>

        <div className="flex-1">
           <AnimatePresence mode="wait">
             {activeTab === 'profile' && (
               <motion.div
                 key="profile"
                 initial={{ opacity: 0, x: 10 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -10 }}
                 className="space-y-8"
               >
                 <Card className="p-8 dark:bg-slate-900/40">
                    <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-8 border-b border-slate-100 dark:border-white/5 pb-4 uppercase italic tracking-tight">Profile Details</h3>
                    
                    <div className="flex flex-col md:flex-row gap-12">
                       <div className="flex flex-col items-center gap-4">
                          <div className="relative group">
                             <img 
                               src={formData.avatar} 
                               className="w-32 h-32 rounded-[2.5rem] border-4 border-slate-100 dark:border-white/10 shadow-xl bg-slate-50 dark:bg-slate-800" 
                                alt="Avatar" 
                             />
                             <button className="absolute -bottom-2 -right-2 p-3 bg-brand-primary text-white rounded-2xl shadow-lg hover:scale-110 transition-transform">
                                <Camera size={18} />
                             </button>
                          </div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">App Version: v1.2</p>
                       </div>

                       <div className="flex-1 space-y-6">
                          <div className="grid md:grid-cols-2 gap-6">
                             <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Full Name</label>
                                <div className="relative group">
                                   <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary" />
                                   <input 
                                     type="text" 
                                     value={formData.name}
                                     onChange={(e) => setFormData({...formData, name: e.target.value})}
                                     className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-3 pl-12 outline-none focus:border-brand-primary text-sm font-medium dark:text-white"
                                   />
                                </div>
                             </div>
                             <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Email Address</label>
                                <div className="relative group">
                                   <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary" />
                                   <input 
                                     type="email" 
                                     value={formData.email}
                                     onChange={(e) => setFormData({...formData, email: e.target.value})}
                                     className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-3 pl-12 outline-none focus:border-brand-primary text-sm font-medium dark:text-white"
                                   />
                                </div>
                             </div>
                          </div>

                          <div className="space-y-2">
                             <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Role</label>
                             <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-500/5 border border-amber-100 dark:border-amber-500/10 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                   <Badge variant="warning">{user.role}</Badge>
                                   <span className="text-sm font-bold text-amber-900 dark:text-amber-400 uppercase tracking-tight">{user.role === 'ADMIN' ? 'Administrator' : 'Team Member'}</span>
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 italic">Account Role</span>
                             </div>
                          </div>
                       </div>
                    </div>
                 </Card>

                 <Card className="p-8 dark:bg-slate-900/40">
                    <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-6 uppercase italic tracking-tight">Activity Summary</h3>
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                             <Zap size={20} />
                          </div>
                          <div>
                             <p className="text-sm font-bold dark:text-white">Active Days</p>
                             <p className="text-xs text-slate-500">{user.streak} days of active participation</p>
                          </div>
                       </div>
                    </div>
                 </Card>
               </motion.div>
             )}

             {activeTab === 'security' && (
               <motion.div
                 key="security"
                 initial={{ opacity: 0, x: 10 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -10 }}
                 className="space-y-8"
               >
                 <Card className="p-8 dark:bg-slate-900/40">
                    <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-8 border-b border-slate-100 dark:border-white/5 pb-4 uppercase italic tracking-tight">Security</h3>
                    <div className="space-y-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">New Password</label>
                          <div className="relative">
                             <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                             <input type="password" placeholder="••••••••" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 pl-12 outline-none focus:border-brand-primary dark:text-white" />
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Confirm New Password</label>
                          <div className="relative">
                             <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                             <input type="password" placeholder="••••••••" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 pl-12 outline-none focus:border-brand-primary dark:text-white" />
                          </div>
                       </div>
                       <Button variant="outline" className="w-full rounded-2xl h-12 uppercase tracking-widest text-[10px] font-bold">Update Password</Button>
                    </div>
                 </Card>

                 <Card className="p-8 dark:bg-emerald-950/10 border-rose-100 dark:border-rose-500/20">
                    <h3 className="text-xl font-display font-bold text-rose-600 mb-6 uppercase italic tracking-tight underline decoration-rose-500/30">Danger Zone</h3>
                    <p className="text-sm text-slate-500 mb-8 font-medium">Permanently delete your account and all associated data. This action is irreversible.</p>
                    <Button variant="danger" className="w-full uppercase tracking-widest text-xs font-bold rounded-2xl h-12">Delete Account</Button>
                 </Card>
               </motion.div>
             )}

             {activeTab === 'notifications' && (
                <motion.div
                  key="notifications"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                >
                  <Card className="p-8 dark:bg-slate-900/40">
                     <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-8 border-b border-slate-100 dark:border-white/5 pb-4 uppercase italic tracking-tight">Notifications</h3>
                     <div className="space-y-8">
                        {[
                          { id: 'project', title: 'Project Updates', desc: 'Notify when a new task is assigned or project updated.' },
                          { id: 'deadline', title: 'Deadline Reminders', desc: 'Alerts sent before a task is due.' },
                          { id: 'activity', title: 'Team Activity', desc: 'Notifications about team interactions on your projects.' }
                        ].map((item, i) => (
                           <div key={i} className="flex items-center justify-between">
                              <div className="max-w-md">
                                 <p className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</p>
                                 <p className="text-xs text-slate-500 mt-1 font-medium">{item.desc}</p>
                              </div>
                              <button 
                                onClick={() => handleToggle(item.id)}
                                className={cn(
                                  "w-12 h-6 rounded-full transition-all relative",
                                  toggles[item.id] ? "bg-brand-primary" : "bg-slate-200 dark:bg-white/10"
                                )}
                              >
                                 <div className={cn(
                                   "absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-sm",
                                   toggles[item.id] ? "right-1" : "left-1"
                                 )}></div>
                              </button>
                           </div>
                        ))}
                     </div>
                  </Card>
                </motion.div>
             )}

           </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

