import React from 'react';
import { 
  Users, 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  Activity,
  AlertTriangle,
  ChevronRight,
  MoreVertical,
  Plus
} from 'lucide-react';
import { Card, Badge, Button, cn } from '../components/UI';
import { MOCK_PROJECTS, MOCK_TASKS, MOCK_ACTIVITIES, MOCK_USERS } from '../data';
import { motion } from 'motion/react';
import { VelocityChart, StatusPie } from '../components/DashboardComponents';

const velocityData = [
  { name: 'Mon', tasks: 12 },
  { name: 'Tue', tasks: 19 },
  { name: 'Wed', tasks: 15 },
  { name: 'Thu', tasks: 22 },
  { name: 'Fri', tasks: 30 },
  { name: 'Sat', tasks: 20 },
  { name: 'Sun', tasks: 14 },
];

const statusData = [
  { name: 'To Do', value: 8, color: '#94a3b8' },
  { name: 'In Progress', value: 12, color: '#6366f1' },
  { name: 'Done', value: 45, color: '#10b981' },
];

export const AdminDashboard = ({ onOpenMetrics, onNewProject, onInviteMember }: { onOpenMetrics?: () => void, onNewProject?: () => void, onInviteMember?: () => void }) => {
  const stats = [
    { label: 'Total Projects', value: MOCK_PROJECTS.length, icon: Briefcase, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Total Tasks', value: 124, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Active Members', value: MOCK_USERS.length, icon: Users, color: 'text-sky-600', bg: 'bg-sky-50' },
    { label: 'Overdue Alerts', value: 3, icon: AlertTriangle, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight">Dashboard</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Overview of projects, tasks, and team activity.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="gap-2 dark:border-white/10 dark:text-white dark:hover:bg-white/5 rounded-xl uppercase tracking-widest text-[10px] font-bold h-10 px-4" onClick={onInviteMember}>
            <Plus size={16} />
            <span>Invite Member</span>
          </Button>
          <Button size="sm" className="gap-2 rounded-xl uppercase tracking-widest text-[10px] font-bold h-10 px-4" onClick={onNewProject}>
            <Plus size={16} />
            <span>New Project</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="relative group dark:bg-slate-900/40">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white">{stat.value}</h3>
                  <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded-full">+12%</span>
                </div>
              </div>
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", stat.bg, stat.color, "dark:bg-slate-800/50")}>
                <stat.icon size={20} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
             <Card className="p-8 dark:bg-slate-900/40">
                <div className="flex items-center justify-between mb-6">
                   <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white">Team Workload</h3>
                   <Badge variant="info">Optimized</Badge>
                </div>
                <div className="space-y-4">
                   {MOCK_USERS.slice(0, 4).map((u, i) => (
                      <div key={i} className="flex items-center gap-4">
                         <img src={u.avatar} className="w-8 h-8 rounded-lg" alt="" />
                         <div className="flex-1">
                            <div className="flex justify-between text-[10px] mb-1 font-bold">
                               <span className="text-slate-600 dark:text-slate-400">{u.name}</span>
                               <span className="text-slate-900 dark:text-white">{15 + i * 12}%</span>
                            </div>
                            <div className="h-1 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                               <div 
                                className={cn("h-full rounded-full", i === 1 ? "bg-rose-500" : "bg-brand-primary")} 
                                style={{ width: `${15 + i * 12}%` }}
                               ></div>
                            </div>
                         </div>
                      </div>
                   ))}
                </div>
             </Card>

             <Card className="p-8 dark:bg-slate-900/40">
                <div className="flex items-center justify-between mb-6">
                   <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white">Recent Users</h3>
                   <button className="text-[10px] font-bold text-brand-primary border-b border-brand-primary/20">MANAGE ROSTER</button>
                </div>
                <div className="flex -space-x-2 mb-6">
                   {MOCK_USERS.map((u, i) => (
                      <motion.img 
                       key={i}
                       whileHover={{ scale: 1.1, zIndex: 10 }}
                       src={u.avatar} 
                       className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 shadow-sm cursor-pointer" 
                       alt="" 
                      />
                   ))}
                </div>
                <div className="space-y-3">
                   {MOCK_USERS.slice(0, 2).map((u, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded-xl border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/5">
                         <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                            <span className="text-xs font-bold text-slate-800 dark:text-white">{u.name}</span>
                         </div>
                         <Badge variant="neutral">{u.role}</Badge>
                      </div>
                   ))}
                </div>
             </Card>
          </div>

          <Card className="p-8 dark:bg-slate-900/40">
             <div className="flex items-center justify-between mb-8">
                <div>
                   <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white">Task Completion</h3>
                   <p className="text-xs text-slate-400">Total volume of completed tasks over time</p>
                </div>
             </div>
             <VelocityChart data={velocityData} />
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 dark:bg-slate-900/40">
               <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white mb-4">Status Distribution</h3>
               <StatusPie data={statusData} total={65} />
               <div className="mt-4 grid grid-cols-3 gap-2">
                 {statusData.map((item, i) => (
                   <div key={i} className="text-center">
                     <div className="flex items-center justify-center gap-1.5 mb-1">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-[8px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{item.name}</span>
                     </div>
                     <p className="text-xs font-bold text-slate-900 dark:text-white">{((item.value/65)*100).toFixed(0)}%</p>
                   </div>
                 ))}
               </div>
            </Card>

            <Card className="p-8 dark:bg-slate-900/40">
               <div className="flex items-center justify-between mb-6">
                 <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white">Project Health</h3>
                 <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"><MoreVertical size={16} /></button>
               </div>
               <div className="space-y-5">
                 {MOCK_PROJECTS.slice(0, 3).map((project, i) => (
                   <div key={i} className="space-y-2">
                     <div className="flex justify-between text-xs">
                       <span className="font-bold text-slate-700 dark:text-slate-300">{project.name}</span>
                       <span className={cn("font-bold", project.progress > 80 ? "text-emerald-500" : "text-brand-primary")}>{project.progress}%</span>
                     </div>
                     <div className="w-full h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: `${project.progress}%` }}
                         transition={{ duration: 1, delay: i * 0.1 }}
                         className={cn("h-full rounded-full", project.progress > 80 ? "bg-emerald-500" : "bg-brand-primary")}
                       ></motion.div>
                     </div>
                   </div>
                 ))}
               </div>
            </Card>
          </div>
        </div>

        <div className="space-y-8">
           <Card className="p-8 bg-slate-900 text-white border-none relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/20 blur-3xl rounded-full"></div>
              <div className="flex flex-col relative">
                 <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                       <AlertTriangle className="text-rose-400" size={20} />
                    </div>
                    <h3 className="text-lg font-display font-bold">Overdue Risks</h3>
                 </div>
                 <div className="space-y-4 mb-6">
                    {MOCK_TASKS.filter(t => t.status !== 'DONE' && new Date(t.dueDate) < new Date()).map((task, i) => (
                       <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/5">
                          <div className="flex justify-between items-start mb-1">
                             <p className="text-xs font-bold truncate pr-4">{task.title}</p>
                             <Badge variant="urgent">CRITICAL</Badge>
                          </div>
                          <p className="text-[10px] text-slate-400">Owner: {MOCK_USERS.find(u => u.id === task.assigneeId)?.name}</p>
                       </div>
                    ))}
                 </div>
                 <Button variant="glass" className="w-full text-white bg-white/10 border-white/10" size="sm">
                    View All Overdue
                 </Button>
              </div>
           </Card>

           <Card className="p-8 dark:bg-slate-900/40">
              <div className="flex items-center justify-between mb-6">
                 <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white">Recent Activity</h3>
                 <Activity size={18} className="text-brand-primary" />
              </div>
              <div className="space-y-6">
                 {MOCK_ACTIVITIES.map((activity, i) => (
                    <div key={i} className="flex gap-4">
                       <img 
                        src={MOCK_USERS.find(u => u.id === activity.userId)?.avatar} 
                        alt="" 
                        className="w-8 h-8 rounded-full border border-slate-100 dark:border-white/10"
                       />
                       <div className="flex-1">
                          <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight">
                             <span className="font-bold text-slate-900 dark:text-white">{MOCK_USERS.find(u => u.id === activity.userId)?.name.split(' ')[0]} </span>
                             {activity.action}
                             <span className="font-bold text-slate-900 dark:text-white block mt-0.5"> {MOCK_PROJECTS.find(p => p.id === activity.targetId)?.name || MOCK_TASKS.find(t => t.id === activity.targetId)?.title}</span>
                          </p>
                       </div>
                    </div>
                 ))}
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
};
