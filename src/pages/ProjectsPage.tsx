import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Grid, 
  List as ListIcon, 
  Plus, 
  MoreVertical, 
  Users, 
  Calendar,
  ChevronRight,
  TrendingUp,
  FileText,
  Trash2,
  Lock
} from 'lucide-react';
import { Card, Badge, Button, cn } from '../components/UI';
import { MOCK_TASKS, MOCK_USERS } from '../data';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'motion/react';
import { ProgressRing } from '../components/DashboardComponents';
import { ConfirmDeleteModal } from '../components/Modals';

export const ProjectsPage = ({ role, onBack, onNewProjectTrigger }: { role: string, onBack?: () => void, onNewProjectTrigger?: () => void }) => {
  const [view, setView] = useState<'GRID' | 'LIST'>('GRID');
  const [search, setSearch] = useState('');
  const [projects, setProjects] = useState<any[]>([]);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (!error && data) {
        setProjects(data);
      }
    };
    
    fetchProjects();

    const subscription = supabase
      .channel('projects_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, (payload) => {
        fetchProjects();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const isAdmin = role === 'ADMIN';
  const filteredProjects = projects.filter((p: any) => search === '' || p.name.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = async (id: string) => {
    await supabase.from('projects').delete().eq('id', id);
    setIsDeleting(null);
  };

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight italic uppercase">Project Ecosystem</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Manage, track, and synchronize your infrastructure hubs.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-slate-100 dark:bg-white/5 rounded-2xl p-1 flex gap-1">
             <button onClick={() => setView('GRID')} className={cn("p-2 rounded-xl transition-all", view === 'GRID' ? "bg-white dark:bg-slate-800 shadow-xl text-brand-primary" : "text-slate-400 hover:text-slate-600 dark:hover:text-white")}>
                <Grid size={18} />
             </button>
             <button onClick={() => setView('LIST')} className={cn("p-2 rounded-xl transition-all", view === 'LIST' ? "bg-white dark:bg-slate-800 shadow-xl text-brand-primary" : "text-slate-400 hover:text-slate-600 dark:hover:text-white")}>
                <ListIcon size={18} />
             </button>
          </div>
          <div className="h-8 w-[1px] bg-slate-200 dark:bg-white/5 mx-1"></div>
          <div className="relative">
             {!isAdmin && (
               <div className="group">
                  <Button variant="outline" className="gap-2 opacity-50 cursor-not-allowed rounded-xl uppercase tracking-widest text-[10px] font-bold h-10" size="sm">
                    <Plus size={16} />
                    <span>New Project</span>
                    <Lock size={12} className="text-slate-400" />
                  </Button>
               </div>
             )}
             {isAdmin && (
               <Button className="gap-2 rounded-xl uppercase tracking-widest text-[10px] font-bold h-10 px-6" size="sm" onClick={onNewProjectTrigger || (() => setIsWizardOpen(true))}>
                 <Plus size={16} />
                 <span>New Project</span>
               </Button>
             )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-slate-50/50 dark:bg-white/5 p-2 rounded-3xl border border-slate-100 dark:border-white/5">
         <div className="relative flex-1 group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Filter by project resonance name..." 
              className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm outline-none focus:ring-4 focus:ring-brand-primary/5 transition-all text-slate-900 dark:text-white font-medium"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
         </div>
         <Button variant="outline" size="icon" className="shrink-0 h-10 w-10 rounded-xl dark:border-white/10 dark:text-white dark:hover:bg-white/5">
            <Filter size={18} />
         </Button>
      </div>

      {view === 'GRID' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {filteredProjects.map((project: any) => (
             <ProjectCard key={project.id} project={project} isAdmin={isAdmin} onDeleteTrigger={() => setIsDeleting(project.id)} />
           ))}
        </div>
      ) : (
        <Card className="overflow-hidden border-slate-100 dark:border-white/5 dark:bg-slate-900/40 rounded-[2rem]">
           <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-100 dark:border-white/5">
                 <tr>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Project</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Team</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Progress</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                 {filteredProjects.map((project: any) => (
                    <tr key={project.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors group">
                       <td className="px-6 py-4">
                          <div>
                             <p className="text-sm font-bold text-slate-900 dark:text-white">{project.name}</p>
                             <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1 italic">{project.description}</p>
                          </div>
                       </td>
                       <td className="px-6 py-4">
                          <div className="flex -space-x-2">
                             {(project.memberIds || []).map((id: string) => (
                                <img key={id} src={MOCK_USERS.find(u => u.id === id)?.avatar} className="w-8 h-8 rounded-xl border-2 border-white dark:border-slate-800 bg-slate-50 shadow-sm" alt="" />
                             ))}
                          </div>
                       </td>
                       <td className="px-6 py-4">
                          <Badge variant={project.status === 'ACTIVE' ? 'success' : project.status === 'PLANNING' ? 'info' : 'warning'}>
                             {project.status}
                          </Badge>
                       </td>
                       <td className="px-6 py-4">
                          <div className="flex items-center gap-3 w-40">
                             <div className="flex-1 h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-brand-primary" style={{ width: `${project.progress}%` }}></div>
                             </div>
                             <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">{project.progress}%</span>
                          </div>
                       </td>
                       <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                             {isAdmin && (
                               <button onClick={() => setIsDeleting(project.id)} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-colors">
                                 <Trash2 size={16} />
                               </button>
                             )}
                             <button className="p-2 text-slate-400 hover:text-brand-primary hover:bg-brand-primary/5 rounded-xl transition-colors font-bold text-[10px] uppercase tracking-widest flex items-center gap-1">
                                <span>Details</span>
                                <ChevronRight size={14} />
                             </button>
                          </div>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </Card>
      )}

      {/* Confirmation Modal */}
      <AnimatePresence>
        {isDeleting && (
          <ConfirmDeleteModal 
            key="confirm-delete"
            isOpen={true} 
            onClose={() => setIsDeleting(null)} 
            onConfirm={() => handleDelete(isDeleting)}
            title="Dissolve Strategic Project?"
          />
        )}
      </AnimatePresence>

      {/* Project Wizard Placeholder */}
      <AnimatePresence>
        {isWizardOpen && (
           <div className="fixed inset-0 z-[130] flex items-center justify-center p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                onClick={() => setIsWizardOpen(false)}
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-2xl"
              >
                 <Card className="p-10 glass border-white/40 shadow-3xl">
                    <div className="flex justify-between items-start mb-8">
                       <div>
                          <Badge variant="info">STEP 1 OF 3</Badge>
                          <h3 className="text-2xl font-display font-bold text-slate-900 mt-2">New Project Instantiation</h3>
                       </div>
                       <button onClick={() => setIsWizardOpen(false)} className="p-2 text-slate-400 hover:text-slate-600">
                          <Plus size={24} className="rotate-45" />
                       </button>
                    </div>

                    <div className="space-y-6">
                       <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Project Code Name</label>
                          <input type="text" placeholder="e.g. Project Aurora" className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-3 px-4 outline-none focus:border-brand-primary/30 transition-all font-medium" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Mission Description</label>
                          <textarea placeholder="Outline the primary objectives and scale..." rows={3} className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-3 px-4 outline-none focus:border-brand-primary/30 transition-all font-medium resize-none" />
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                             <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Terminal Date</label>
                             <input type="date" className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-3 px-4 outline-none focus:border-brand-primary/30 transition-all font-medium" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Priority Rank</label>
                             <select className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-3 px-4 outline-none focus:border-brand-primary/30 transition-all font-medium appearance-none">
                                <option>LOW</option>
                                <option>MEDIUM</option>
                                <option>HIGH</option>
                                <option>URGENT</option>
                             </select>
                          </div>
                       </div>
                    </div>

                    <div className="flex gap-4 mt-10">
                       <Button variant="outline" className="flex-1" onClick={() => setIsWizardOpen(false)}>Cancel</Button>
                       <Button className="flex-1 gap-2">
                          Next Stage <ChevronRight size={18} />
                       </Button>
                    </div>
                 </Card>
              </motion.div>
           </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProjectCard = ({ project, isAdmin, onDeleteTrigger }: { project: any, isAdmin: boolean, onDeleteTrigger?: () => void, key?: React.Key }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleDeleteClick = (e: React.MouseEvent) => {
     e.stopPropagation();
     onDeleteTrigger?.();
  };

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={isHovered ? { y: -8 } : { y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="h-full flex flex-col p-8 group relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
           {isAdmin && (
              <button 
                onClick={handleDeleteClick}
                className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                title="Delete project"
              >
                 <Trash2 size={18} />
              </button>
           )}
        </div>

        <div className="flex justify-between items-start mb-6">
           <div className="relative">
              <ProgressRing progress={project.progress} size={64} strokeWidth={6} />
              {project.status === 'ACTIVE' && (
                <span className="absolute top-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white animate-pulse"></span>
              )}
           </div>
           <Badge variant={project.priority === 'URGENT' ? 'urgent' : project.priority === 'HIGH' ? 'danger' : 'neutral'}>
              {project.priority}
           </Badge>
        </div>

        <div className="flex-1 mb-8">
           <h3 className="text-xl font-display font-bold text-slate-900 group-hover:text-brand-primary transition-colors leading-tight mb-2">{project.name}</h3>
           <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">{project.description}</p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
             <div className="flex -space-x-2">
                 {(project.memberIds || []).map((id: string) => (
                    <img key={id} src={MOCK_USERS.find(u => u.id === id)?.avatar} className="w-8 h-8 rounded-full border-2 border-white bg-slate-50 shadow-sm" alt="" />
                 ))}
                <div className="w-8 h-8 rounded-full bg-slate-50 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-400 shadow-sm">
                   +3
                </div>
             </div>
             <div className="flex items-center gap-1.5 text-slate-400">
                <Calendar size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest">{project.deadline ? new Date(project.deadline).toLocaleDateString() : 'No Deadline'}</span>
             </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
             <div className="flex items-center gap-2">
                <FileText size={16} className="text-slate-400" />
                <span className="text-xs font-bold text-slate-600">24 Tasks</span>
             </div>
             <Button variant="ghost" size="sm" className="text-brand-primary h-8 px-2 -mr-2">
                Details <ChevronRight size={14} />
             </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
