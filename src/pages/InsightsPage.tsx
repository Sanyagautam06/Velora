/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Filter,
  Calendar
} from 'lucide-react';
import { Card, Button, Badge, cn } from '../components/UI';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';

const MOCK_BAR_DATA = [
  { name: 'Mon', completed: 12, pending: 4 },
  { name: 'Tue', completed: 18, pending: 6 },
  { name: 'Wed', completed: 15, pending: 8 },
  { name: 'Thu', completed: 22, pending: 5 },
  { name: 'Fri', completed: 30, pending: 3 },
  { name: 'Sat', completed: 10, pending: 2 },
  { name: 'Sun', completed: 8, pending: 1 },
];

const MOCK_PIE_DATA = [
  { name: 'Done', value: 45, color: '#10b981' },
  { name: 'In Progress', value: 30, color: '#6366f1' },
  { name: 'Backlog', value: 15, color: '#f59e0b' },
  { name: 'Blocked', value: 10, color: '#ef4444' },
];

const HEALTH_NODES = [
  { name: 'Stellar Alpha', health: 94, trend: '+1.2%', status: 'optimal' },
  { name: 'Nebula Genesis', health: 82, trend: '-3.4%', status: 'monitoring' },
  { name: 'Quasar Flux', health: 91, trend: '+0.5%', status: 'optimal' },
  { name: 'Void Core', health: 68, trend: '+12.1%', status: 'intervention' },
];

export const InsightsPage = ({ onExport }: { onExport?: () => void }) => {
  const [timeframe, setTimeframe] = useState('7d');

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
           <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-6 bg-brand-primary rounded-full"></div>
              <h2 className="text-4xl font-display font-bold tracking-tighter uppercase italic">Reports</h2>
           </div>
           <p className="text-slate-500 font-medium max-w-xl">Deep signal analysis of ecosystem performance and resonance metrics.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-xl border border-slate-200 dark:border-white/10">
            {['24h', '7d', '30d'].map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={cn(
                  "px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all",
                  timeframe === t 
                    ? "bg-white dark:bg-brand-primary text-slate-900 dark:text-white shadow-sm" 
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Primary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: 'Completion Rate', value: '88.4%', trend: '+4.2%', icon: CheckCircle2, color: 'text-emerald-500' },
           { label: 'Active Projects', value: '42', trend: '+12', icon: Activity, color: 'text-indigo-500' },
           { label: 'Avg. Time per Task', value: '1.2h', trend: '-18%', icon: Clock, color: 'text-amber-500' },
           { label: 'Blocked Tasks', value: '4', trend: 'stable', icon: AlertCircle, color: 'text-rose-500' },
         ].map((stat, i) => (
           <Card key={i} className="p-6 relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                 <div className={cn("p-2 rounded-xl bg-slate-100 dark:bg-white/5", stat.color)}>
                    <stat.icon size={20} />
                 </div>
                 <Badge variant={stat.trend.startsWith('+') ? 'success' : stat.trend === 'stable' ? 'neutral' : 'danger'}>
                    {stat.trend}
                 </Badge>
              </div>
              <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-3xl font-display font-bold dark:text-white">{stat.value}</h3>
              <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                 <stat.icon size={100} />
              </div>
           </Card>
         ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid lg:grid-cols-3 gap-8">
         <Card className="lg:col-span-2 p-8">
            <div className="flex items-center justify-between mb-8">
               <h3 className="font-display font-bold uppercase tracking-tight italic">Task Trends</h3>
               <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-brand-primary"></div>
                     <span>Completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-white/20"></div>
                     <span>Pending</span>
                  </div>
               </div>
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_BAR_DATA}>
                  <defs>
                    <linearGradient id="colorComp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: 'none', 
                      borderRadius: '16px',
                      color: '#fff',
                      fontSize: '12px'
                    }} 
                  />
                  <Area type="monotone" dataKey="completed" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorComp)" />
                  <Area type="monotone" dataKey="pending" stroke="#94a3b8" strokeWidth={2} fillOpacity={0} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
         </Card>

         <Card className="p-8">
            <h3 className="font-display font-bold uppercase tracking-tight italic mb-8">Status Distribution</h3>
            <div className="h-[250px] w-full relative mb-8">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie
                     data={MOCK_PIE_DATA}
                     cx="50%"
                     cy="50%"
                     innerRadius={60}
                     outerRadius={80}
                     paddingAngle={8}
                     dataKey="value"
                   >
                     {MOCK_PIE_DATA.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={entry.color} />
                     ))}
                   </Pie>
                   <Tooltip />
                 </PieChart>
               </ResponsiveContainer>
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-2xl font-bold dark:text-white">104</span>
                  <span className="text-[8px] uppercase font-bold tracking-widest text-slate-400">Total Tasks</span>
               </div>
            </div>
            <div className="space-y-3">
               {MOCK_PIE_DATA.map((item, i) => (
                 <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-3">
                       <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                       <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{item.name}</span>
                    </div>
                    <span className="text-xs font-mono font-bold dark:text-white">{item.value}%</span>
                 </div>
               ))}
            </div>
         </Card>
      </div>

      {/* Workplace Health */}
      <div className="grid md:grid-cols-2 gap-8">
         <Card className="p-8">
            <h3 className="font-display font-bold uppercase tracking-tight italic mb-6">Project Progress</h3>
            <div className="space-y-4">
              {HEALTH_NODES.map((node, i) => (
                <div key={i} className="p-4 rounded-2xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
                   <div className="flex justify-between items-center mb-3">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold dark:text-white">{node.name}</span>
                        <span className="text-[10px] text-slate-400 font-medium">Active Project</span>
                      </div>
                      <div className="text-right">
                         <div className="text-sm font-bold dark:text-white">{node.health}%</div>
                         <div className={cn("text-[10px] font-bold", node.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500')}>
                            {node.trend}
                         </div>
                      </div>
                   </div>
                   <div className="w-full h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${node.health}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className={cn(
                          "h-full rounded-full shadow-[0_0_10px_rgba(0,0,0,0.1)]",
                          node.status === 'optimal' ? 'bg-emerald-500' : 
                          node.status === 'monitoring' ? 'bg-amber-500' : 'bg-rose-500'
                        )}
                      />
                   </div>
                </div>
              ))}
            </div>
         </Card>

         <Card className="p-8">
            <h3 className="font-display font-bold uppercase tracking-tight italic mb-6">Recent Activity</h3>
            <div className="space-y-6">
               {[
                 { user: 'Sarah S.', action: 'Archived task #402', time: '2m ago', type: 'archive' },
                 { user: 'Jason M.', action: 'Created new project: Stellar Alpha', time: '14m ago', type: 'calib' },
                 { user: 'System', action: 'Weekly report generated', time: '1h ago', type: 'system' },
                 { user: 'Admin', action: 'New member invited', time: '3h ago', type: 'add' },
                 { user: 'Elena K.', action: 'Updated task status: Star Project', time: '5h ago', type: 'signal' },
               ].map((act, i) => (
                 <div key={i} className="flex gap-4 items-start group">
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 border border-white/5 flex items-center justify-center shrink-0">
                       <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></div>
                    </div>
                    <div className="flex-1 border-b border-slate-100 dark:border-white/5 pb-4 group-last:border-0">
                       <p className="text-xs font-bold dark:text-white leading-tight mb-1">
                          {act.user} <span className="text-slate-500 font-medium">{act.action}</span>
                       </p>
                       <p className="text-[10px] font-mono text-slate-400 uppercase">{act.time}</p>
                    </div>
                 </div>
               ))}
            </div>
            <Button variant="ghost" className="w-full mt-6 text-[10px] uppercase font-bold tracking-[0.2em] h-10 border-t border-slate-100 dark:border-white/5 rounded-none">View All Activity</Button>
         </Card>
      </div>
    </div>
  );
};
