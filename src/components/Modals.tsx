import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Briefcase, 
  CheckSquare, 
  Users, 
  ChevronRight,
  TrendingUp,
  Target
} from 'lucide-react';
import { Card, Button, Badge } from './UI';

export const InviteMemberModal = ({ isOpen, onClose, onInvite }: { isOpen: boolean, onClose: () => void, onInvite: (data: any) => void, key?: React.Key }) => {
  const [formData, setFormData] = useState({ name: '', email: '', role: 'MEMBER', project: '' });
  const [error, setError] = useState<string | null>(null);

  const validate = () => {
    if (!formData.name) return "Node Name is required.";
    if (!formData.email || !formData.email.includes('@')) return "Valid Spectral Email is required.";
    return null;
  };

  const handleInvite = () => {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    onInvite(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 border border-white/10"
      >
        <h3 className="text-xl font-display font-bold mb-6 dark:text-white uppercase tracking-tight italic">Invite Member</h3>
        
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-bold uppercase tracking-widest leading-relaxed">
            CRITICAL ERROR: {error}
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Full Name</label>
            <input 
              className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 outline-none focus:border-brand-primary transition-all dark:text-white font-bold"
              value={formData.name} onChange={e => { setFormData({...formData, name: e.target.value}); setError(null); }}
              placeholder="e.g. Alex Thorne"
              autoFocus
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Email Address</label>
            <input 
              className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 outline-none focus:border-brand-primary transition-all dark:text-white font-bold"
              value={formData.email} onChange={e => { setFormData({...formData, email: e.target.value}); setError(null); }}
              placeholder="alex@valora.io"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Role</label>
              <select 
                className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 outline-none focus:border-brand-primary transition-all dark:text-white appearance-none font-bold text-xs"
                value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}
              >
                <option value="MEMBER">Member</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Project</label>
              <select 
                className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 outline-none focus:border-brand-primary transition-all dark:text-white appearance-none font-bold text-xs"
                value={formData.project} onChange={e => setFormData({...formData, project: e.target.value})}
              >
                <option value="">None</option>
                <option value="stellar-alpha">Stellar Alpha</option>
                <option value="nebula-genesis">Nebula Genesis</option>
              </select>
            </div>
          </div>
          <Button className="w-full h-14 rounded-2xl font-bold uppercase tracking-widest mt-4" onClick={handleInvite}>Send Invitation</Button>
        </div>
      </motion.div>
    </div>
  );
};

export const CreateTaskModal = ({ isOpen, onClose, initialStatus = 'TODO', onCreate }: { isOpen: boolean, onClose: () => void, initialStatus?: any, onCreate: (data: any) => void, key?: React.Key }) => {
  const [formData, setFormData] = useState({
    title: '',
    status: initialStatus || 'TODO',
    priority: 'MEDIUM',
    projectId: '1'
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({ ...prev, status: initialStatus || 'TODO' }));
    }
  }, [isOpen, initialStatus]);

  const handleCreate = () => {
    if (!formData.title) {
      setError("Objective Title is required.");
      return;
    }
    onCreate(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 border border-white/10"
      >
        <h3 className="text-xl font-display font-bold mb-6 dark:text-white uppercase tracking-tight italic">Create Task</h3>
        
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-bold uppercase tracking-widest leading-relaxed">
             SYNC FAILED: {error}
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Task Title</label>
            <input 
              className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 outline-none focus:border-brand-primary transition-all dark:text-white font-bold"
              value={formData.title} onChange={e => { setFormData({...formData, title: e.target.value}); setError(null); }}
              placeholder="e.g. Protocol refinement"
              autoFocus
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Status</label>
              <select 
                className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 outline-none focus:border-brand-primary transition-all dark:text-white appearance-none font-bold text-xs"
                value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}
              >
                <option value="TODO">TO DO</option>
                <option value="IN_PROGRESS">IN PROGRESS</option>
                <option value="REVIEW">REVIEW</option>
                <option value="DONE">DONE</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Priority</label>
              <select 
                className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 outline-none focus:border-brand-primary transition-all dark:text-white appearance-none font-bold text-xs"
                value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})}
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
                <option value="URGENT">URGENT</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Select Project</label>
            <select 
              className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 outline-none focus:border-brand-primary transition-all dark:text-white appearance-none font-bold text-xs"
              value={formData.projectId} onChange={e => setFormData({...formData, projectId: e.target.value})}
            >
              <option value="1">Velora Core Interface</option>
              <option value="2">Quantum Sync Layer</option>
            </select>
          </div>

          <Button className="w-full h-14 rounded-2xl font-bold uppercase tracking-widest mt-4" onClick={handleCreate}>Create Task</Button>
        </div>
      </motion.div>
    </div>
  );
};

export const CreateProjectModal = ({ isOpen, onClose, onCreate }: { isOpen: boolean, onClose: () => void, onCreate: (data: any) => void, key?: React.Key }) => {
  const [name, setName] = useState('');
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 border border-white/10"
      >
        <h3 className="text-xl font-display font-bold mb-6 dark:text-white uppercase tracking-tight">Create Project</h3>
        <div className="space-y-4">
          <input 
            className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 outline-none focus:border-brand-primary transition-all dark:text-white"
            value={name} onChange={e => setName(e.target.value)}
            placeholder="Mission Name..."
          />
          <Button className="w-full h-14 rounded-2xl font-bold uppercase tracking-widest" onClick={() => { onCreate({ name }); onClose(); }}>Create Project</Button>
        </div>
      </motion.div>
    </div>
  );
};

export const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, title = "Delete?" }: { isOpen: boolean, onClose: () => void, onConfirm: () => void, title?: string, key?: React.Key }) => {
  return (
    <div className="fixed inset-0 z-[160] flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 border border-rose-500/20 text-center"
      >
        <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-500">
           <X size={32} />
        </div>
        <h3 className="text-xl font-display font-bold mb-2 dark:text-white uppercase tracking-tight">{title}</h3>
        <p className="text-slate-500 text-sm font-medium mb-8">This action is permanent and cannot be undone.</p>
        
        <div className="grid grid-cols-2 gap-4">
           <Button variant="outline" className="h-12 rounded-xl text-xs uppercase font-bold tracking-widest" onClick={onClose}>Cancel</Button>
           <Button className="h-12 rounded-xl bg-rose-500 hover:bg-rose-600 text-white border-0 text-xs uppercase font-bold tracking-widest" onClick={() => { onConfirm(); onClose(); }}>Delete</Button>
        </div>
      </motion.div>
    </div>
  );
};
