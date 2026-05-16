import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Kanban as KanbanIcon, 
  Table as TableIcon,
  MoreVertical,
  CheckCircle2,
  Clock,
  User as UserIcon,
  CheckSquare,
  AlertCircle,
  GripVertical,
  ArrowRight,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { Card, Badge, Button, cn, Toast } from '../components/UI';
import { MOCK_PROJECTS, MOCK_USERS } from '../data';
import { supabase } from '../lib/supabase';
import { Task, TaskStatus, Priority } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  DndContext, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent
} from '@dnd-kit/core';
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates, 
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const TasksPage = ({ role, onNewTaskTrigger }: { role: string, onNewTaskTrigger?: (status?: TaskStatus) => void }) => {
  const [view, setView] = useState<'KANBAN' | 'TABLE'>('KANBAN');
  const [tasks, setTasks] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase.from('tasks').select('*').order('created_at', { ascending: false });
      if (!error && data) {
        setTasks(data);
      }
    };
    
    fetchTasks();

    const subscription = supabase
      .channel('tasks_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, (payload) => {
        fetchTasks();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const isAdmin = role === 'ADMIN';

  const onStatusChange = async (taskId: string, newStatus: string) => {
    await supabase.from('tasks').update({ status: newStatus }).eq('id', taskId);

    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        if (newStatus === 'DONE' && t.status !== 'DONE') {
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#6366f1', '#ec4899', '#10b981']
          });
          setToast('Strategic objective reached.');
        }
        return { ...t, status: newStatus };
      }
    }));
    setTimeout(() => setToast(null), 3000);
  };

  const filteredTasks = tasks.filter(t => 
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.description.toLowerCase().includes(search.toLowerCase())
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveTask(tasks.find(t => t.id === active.id) || null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeTask = tasks.find(t => t.id === activeId);
    if (!activeTask) return;

    // Determine if we are hovering over a column or a task
    const isOverAColumn = ['TODO', 'IN_PROGRESS', 'REVIEW', 'DONE'].includes(overId);
    
    if (isOverAColumn) {
       if (activeTask.status !== overId) {
          setTasks(prev => prev.map(t => t.id === activeId ? { ...t, status: overId as TaskStatus } : t));
       }
    } else {
       const overTask = tasks.find(t => t.id === overId);
       if (overTask && activeTask.status !== overTask.status) {
          setTasks(prev => prev.map(t => t.id === activeId ? { ...t, status: overTask.status } : t));
       }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
       const activeId = active.id as string;
       const overId = over.id as string;
       
       const oldIndex = tasks.findIndex(t => t.id === activeId);
       const newIndex = tasks.findIndex(t => t.id === overId);
       
       if (newIndex !== -1) {
          setTasks(prev => arrayMove(prev, oldIndex, newIndex));
       }
    }
    setActiveTask(null);
    if (active && over && active.id !== over.id) {
       const activeTask = tasks.find(t => t.id === active.id);
       if (activeTask) {
          supabase.from('tasks').update({ status: activeTask.status }).eq('id', active.id);
       }
    }
  };

  const columns: { id: TaskStatus; title: string }[] = [
    { id: 'TODO', title: 'TO DO' },
    { id: 'IN_PROGRESS', title: 'IN PROGRESS' },
    { id: 'REVIEW', title: 'IN REVIEW' },
    { id: 'DONE', title: 'COMPLETED' }
  ];

  return (
    <div className="p-8 space-y-8 flex flex-col h-[calc(100vh-64px)] overflow-hidden">
      <AnimatePresence>
        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0">
        <div>
          <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight italic uppercase">Mission Board</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Coordinate execution throughput across the collaborative frequency.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-slate-100 dark:bg-white/5 rounded-2xl p-1 flex gap-1">
             <button onClick={() => setView('KANBAN')} className={cn("p-2 rounded-xl transition-all", view === 'KANBAN' ? "bg-white dark:bg-slate-800 shadow-lg text-brand-primary" : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-white")}>
                <KanbanIcon size={18} />
             </button>
             <button onClick={() => setView('TABLE')} className={cn("p-2 rounded-xl transition-all", view === 'TABLE' ? "bg-white dark:bg-slate-800 shadow-lg text-brand-primary" : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-white")}>
                <TableIcon size={18} />
             </button>
          </div>
          <div className="h-8 w-[1px] bg-slate-200 dark:bg-white/5 mx-1"></div>
          {isAdmin && (
            <Button className="gap-2 rounded-xl uppercase tracking-widest text-[10px] font-bold h-10 px-6" size="sm" onClick={() => onNewTaskTrigger?.()}>
               <Plus size={16} />
               <span>Initialize Objective</span>
            </Button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 bg-slate-50/50 dark:bg-white/5 p-2 rounded-3xl border border-slate-100 dark:border-white/5 shrink-0">
         <div className="relative flex-1 group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search cognitive patterns, objectives, or project tags..." 
              className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm outline-none focus:ring-4 focus:ring-brand-primary/5 transition-all text-slate-900 dark:text-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
         </div>
         <Button variant="outline" size="sm" className="gap-2 dark:border-white/10 dark:text-white dark:hover:bg-white/5 rounded-xl uppercase tracking-widest text-[10px] font-bold h-10 px-4">
            <Filter size={16} />
            <span>Filter</span>
         </Button>
      </div>

      <div className="flex-1 overflow-hidden">
        {view === 'KANBAN' ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            <div className="h-full overflow-x-auto pb-6 scrollbar-hide">
              <div className="flex gap-8 h-full min-w-max pr-8">
                {columns.map((col) => (
                  <KanbanColumn 
                    key={col.id}
                    id={col.id}
                    title={col.title} 
                    tasks={filteredTasks.filter(t => t.status === col.id)} 
                    onStatusChange={onStatusChange}
                    isAdmin={isAdmin}
                    onNewTask={() => onNewTaskTrigger?.(col.id)}
                  />
                ))}
              </div>
            </div>
            <DragOverlay dropAnimation={{
              sideEffects: defaultDropAnimationSideEffects({
                styles: {
                  active: {
                    opacity: '0.5',
                  },
                },
              }),
            }}>
              {activeTask ? <TaskCard task={activeTask} isOverlay onStatusChange={onStatusChange} /> : null}
            </DragOverlay>
          </DndContext>
        ) : (
          <Card className="h-full overflow-y-auto border-slate-100 dark:border-white/5 dark:bg-slate-900/40">
             <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-slate-50 dark:bg-slate-800 border-b border-slate-100 dark:border-white/5 z-10">
                   <tr>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Objective</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Maintainer</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Node Project</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Priority</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right leading-none">Deadlines</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                   {filteredTasks.map((task) => (
                      <tr key={task.id} className="group hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
                         <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                               <button 
                                 onClick={() => onStatusChange(task.id, task.status === 'DONE' ? 'TODO' : 'DONE')}
                                 className={cn(
                                   "w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center",
                                   task.status === 'DONE' ? "bg-brand-primary border-brand-primary text-white" : "border-slate-200 group-hover:border-brand-primary"
                                 )}
                               >
                                  {task.status === 'DONE' && <CheckCircle2 size={14} />}
                               </button>
                               <span className={cn("text-sm font-bold tracking-tight", task.status === 'DONE' && "line-through text-slate-400")}>{task.title}</span>
                            </div>
                         </td>
                         <td className="px-6 py-5">
                             <div className="flex items-center gap-2">
                               <img src={MOCK_USERS.find(u => u.id === task.assignee_id)?.avatar} className="w-8 h-8 rounded-xl border border-slate-200 dark:border-white/10" alt="" />
                               <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{MOCK_USERS.find(u => u.id === task.assignee_id)?.name}</span>
                             </div>
                         </td>
                         <td className="px-6 py-5">
                             <Badge variant="info" className="uppercase tracking-widest text-[9px]">{MOCK_PROJECTS.find(p => p.id === task.project_id)?.name}</Badge>
                         </td>
                         <td className="px-6 py-5">
                            <Badge variant={task.priority === 'URGENT' ? 'urgent' : task.priority === 'HIGH' ? 'danger' : 'neutral'}>
                               {task.priority}
                            </Badge>
                         </td>
                         <td className="px-6 py-5 text-right">
                            <div className="flex flex-col items-end">
                               <span className="text-xs font-bold text-slate-700 dark:text-slate-300 tracking-tight">{new Date(task.dueDate).toLocaleDateString()}</span>
                               {new Date(task.dueDate) < new Date() && task.status !== 'DONE' && (
                                 <span className="text-[10px] font-bold text-rose-500 mt-1">OVERDUE • CRITICAL</span>
                               )}
                            </div>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </Card>
        )}
      </div>
    </div>
  );
};

const KanbanColumn = ({ id, title, tasks, onStatusChange, isAdmin, onNewTask }: { id: string, title: string, tasks: Task[], onStatusChange: (id: string, s: TaskStatus) => void, isAdmin: boolean, onNewTask?: () => void, key?: React.Key }) => {
  return (
    <div className="w-80 flex flex-col h-full bg-slate-50/50 dark:bg-white/5 rounded-[2rem] border border-slate-100/50 dark:border-white/10 p-3">
      <div className="flex items-center justify-between p-4 mb-4">
         <div className="flex items-center gap-3">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.25em]">{title}</h3>
            <Badge variant="neutral" className="px-2">{tasks.length}</Badge>
         </div>
         {isAdmin && <button onClick={onNewTask} className="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 hover:text-brand-primary transition-all shadow-sm"><Plus size={16} /></button>}
      </div>
      
      <div className="flex-1 overflow-y-auto px-1 space-y-6 scrollbar-hide pb-10">
         <SortableContext id={id} items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
            {tasks.map((task) => (
               <TaskCard key={task.id} task={task} onStatusChange={onStatusChange} />
            ))}
         </SortableContext>
         
         {tasks.length === 0 && (
           <div className="h-40 flex flex-col items-center justify-center text-slate-300 border-2 border-dashed border-slate-100 dark:border-white/5 rounded-[1.5rem] bg-white/30 dark:bg-slate-800/20">
              <Sparkles size={32} className="mb-3 text-slate-200 dark:text-slate-700" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Sector Initialized</p>
           </div>
         )}
      </div>
    </div>
  );
};

const TaskCard = ({ task, onStatusChange, isOverlay }: { task: Task, onStatusChange?: (id: string, s: TaskStatus) => void, isOverlay?: boolean, key?: React.Key }) => {
  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'DONE';
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  if (isDragging && !isOverlay) {
    return <div ref={setNodeRef} style={style} className="h-40 rounded-[1.5rem] border-2 border-dashed border-brand-primary/20 bg-brand-primary/5" />;
  }

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      className={cn(
        "group relative",
        isOverlay && "cursor-grabbing opacity-80"
      )}
    >
      <Card className={cn(
        "p-6 border-slate-200/60 dark:border-white/5 hover:border-brand-primary/40 dark:hover:border-brand-primary/30 transition-all duration-300 shadow-sm rounded-[1.5rem]",
        task.status === 'DONE' ? "bg-slate-50/50 dark:bg-white/5" : "bg-white dark:bg-slate-900"
      )}>
         <div className="flex items-start justify-between mb-4">
            <Badge variant={task.priority === 'URGENT' ? 'urgent' : task.priority === 'HIGH' ? 'danger' : 'neutral'} className="text-[9px]">
               {task.priority}
            </Badge>
            <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-1 text-slate-300 hover:text-slate-500 dark:hover:text-slate-400">
               <GripVertical size={16} />
            </div>
         </div>

         <div className="mb-5">
            <h4 className={cn(
              "text-base font-bold text-slate-800 dark:text-white break-words leading-tight mb-2 tracking-tight",
              task.status === 'DONE' && "line-through text-slate-400"
            )}>
              {task.title}
            </h4>
            <div className="flex items-center gap-2">
               <Badge variant="neutral" className="text-[8px] bg-slate-50 dark:bg-white/5 font-bold uppercase tracking-widest px-1.5">{MOCK_PROJECTS.find(p => p.id === task.project_id)?.name}</Badge>
            </div>
         </div>

         <div className="flex items-center justify-between mt-auto">
            <div className="flex -space-x-2">
               <img src={MOCK_USERS.find(u => u.id === task.assignee_id)?.avatar} className="w-8 h-8 rounded-xl border-2 border-white dark:border-slate-800 shadow-sm bg-slate-100" alt="" />
               <div className="w-8 h-8 rounded-xl border-2 border-white dark:border-slate-800 bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400 shadow-sm">
                  +1
               </div>
            </div>
            <div className="flex items-center gap-4">
               {task.subtasks && task.subtasks.length > 0 && (
                 <div className="flex items-center gap-1.5 text-slate-400">
                    <CheckSquare size={14} />
                    <span className="text-[10px] font-bold">{task.subtasks.filter((s: any) => s.completed).length}/{task.subtasks.length}</span>
                 </div>
               )}
               {isOverdue ? (
                 <div className="flex items-center gap-1.5 text-rose-500 animate-pulse">
                    <AlertCircle size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Risk</span>
                 </div>
               ) : (
                 <div className="flex items-center gap-1.5 text-slate-400">
                    <Clock size={14} />
                    <span className="text-[10px] font-bold">{task.due_date ? `${new Date(task.due_date).getMonth() + 1}/${new Date(task.due_date).getDate()}` : 'No date'}</span>
                 </div>
               )}
            </div>
         </div>
      </Card>
      
      {/* Checkbox button */}
      <button 
        onClick={() => onStatusChange?.(task.id, task.status === 'DONE' ? 'TODO' : 'DONE')}
        className={cn(
          "absolute -top-2 -left-2 w-8 h-8 rounded-xl border-4 border-white dark:border-slate-900 shadow-lg flex items-center justify-center transition-all scale-0 group-hover:scale-100",
          task.status === 'DONE' ? "bg-emerald-500 text-white" : "bg-white dark:bg-slate-800 text-slate-300 hover:text-brand-primary"
        )}
      >
         <CheckCircle2 size={16} />
      </button>
    </motion.div>
  );
};
