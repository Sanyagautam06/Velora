import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Rocket, 
  Users, 
  Zap, 
  Shield, 
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
  Monitor,
  MousePointer2,
  CheckCircle2,
  Lock,
  Search,
  Layout,
  Briefcase,
  CheckCircle,
  Clock,
  Activity,
  AlertTriangle,
  Flame,
  Globe,
  PieChart as PieChartIcon,
  BarChart3,
  ArrowUp
} from 'lucide-react';
import { Button, Card, cn, Toast, Badge } from '../components/UI';
import { MOCK_PROJECTS, MOCK_USERS, MOCK_TASKS } from '../data';

import { useNavigate } from 'react-router-dom';

export const LandingPage = ({ onLogin, onSignup, onDemo }: { onLogin: () => void; onSignup: () => void; onDemo: () => void }) => {
  const navigate = useNavigate();
  const [toast, setToast] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (msg: string) => {
    setToast(null);
    setTimeout(() => setToast(msg), 10);
  };

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for students & solo hackers",
      features: ["Up to 3 projects", "Personal Workspace", "Community Support", "Basic Analytics"],
      cta: "Get Started",
      recommended: false
    },
    {
      name: "Team",
      price: "$12",
      description: "Command center for growing teams",
      features: ["Unlimited projects", "Admin Dashboard", "Team Workload Meter", "Priority Support", "Real-time Sync"],
      cta: "Start Free Trial",
      recommended: true
    },
    {
      name: "Enterprise",
      price: "$49",
      description: "Advanced infrastructure for pros",
      features: ["Custom Permissions", "Strategic Reports", "Single Sign-On (SSO)", "Dedicated Manager", "Compliance Vault"],
      cta: "Contact Sales",
      recommended: false
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 selection:bg-brand-primary/30 selection:text-brand-primary overflow-x-hidden">
      <AnimatePresence>
        {toast && (
          <Toast 
            message={toast} 
            onClose={() => setToast(null)} 
          />
        )}
      </AnimatePresence>
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-200 dark:border-white/5 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-primary/30">
              <Shield size={24} />
            </div>
            <span className="text-2xl font-display font-bold tracking-tight text-slate-900 dark:text-white">Velora</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-400">
            <a href="#features" className="hover:text-brand-primary dark:hover:text-white transition-colors">Features</a>
            <button onClick={onDemo} className="hover:text-brand-primary dark:hover:text-white transition-colors">Live Demo</button>
            <a href="#pricing" className="hover:text-brand-primary dark:hover:text-white transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden sm:flex text-slate-900 dark:text-white" onClick={onLogin}>Sign In</Button>
            <Button variant="primary" className="shadow-lg shadow-brand-primary/25" onClick={onSignup}>Start for Free</Button>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden min-h-[90vh] flex flex-col items-center">
          <div className="absolute inset-0 -z-10 mesh-gradient opacity-60 dark:opacity-100"></div>
          
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-600 dark:text-slate-400 mb-8"
            >
              <Zap size={14} className="text-brand-primary fill-brand-primary" />
              <span className="tracking-widest uppercase">The best way to manage team tasks</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tighter text-slate-900 dark:text-white mb-8 leading-[0.9]"
            >
              Unite your teams. <br />
              <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent">
                Manage tasks.
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-10 leading-relaxed font-medium"
            >
              Velora is the cleanest task manager for teams. Manage projects, assign tasks, and track progress with ease and precision.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24"
            >
              <Button size="lg" className="h-16 px-10 gap-3 text-lg rounded-2xl shadow-xl shadow-brand-primary/30" onClick={onSignup}>
                Create Workspace <ArrowRight size={20} />
              </Button>
              <Button variant="outline" size="lg" className="h-16 px-10 text-lg rounded-2xl dark:border-white/10 dark:text-white dark:hover:bg-white/5" onClick={onDemo}>
                Live Demo
              </Button>
            </motion.div>

            {/* Rich Product Preview Mockup */}
            <motion.div
              id="features"
              initial={{ opacity: 0, scale: 0.95, rotateX: 10 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative max-w-6xl mx-auto group perspective-[2000px] scroll-mt-32"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-slate-950 rounded-3xl p-1.5 md:p-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] overflow-hidden border border-white/10">
                <div className="w-full h-full bg-[#020617] rounded-2xl overflow-hidden flex flex-col min-h-[500px] md:min-h-[700px]">
                  {/* Mock Navbar */}
                  <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 gap-2 bg-slate-900/50">
                    <div className="flex items-center gap-6">
                      <div className="flex gap-2 mr-4">
                        <div className="w-3 h-3 rounded-full bg-rose-500/80 shadow-sm shadow-rose-500/20"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-500/80 shadow-sm shadow-amber-500/20"></div>
                        <div className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-sm shadow-emerald-500/20"></div>
                      </div>
                      <div className="h-5 w-32 bg-white/5 rounded border border-white/10"></div>
                    </div>
                    <div className="flex gap-4">
                       <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/5"></div>
                       <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/5"></div>
                    </div>
                  </div>
                  <div className="flex-1 flex overflow-hidden">
                    {/* Mock Sidebar */}
                    <div className="w-56 border-r border-white/5 p-4 space-y-6 hidden lg:block bg-slate-950/50">
                       <div className="space-y-2">
                          <div className="h-9 w-full bg-brand-primary/10 rounded-lg flex items-center px-3 gap-3 border border-brand-primary/20">
                             <Layout size={16} className="text-brand-primary" />
                             <div className="h-3 w-20 bg-brand-primary/30 rounded"></div>
                          </div>
                          {[Briefcase, CheckCircle, Users, Activity].map((Icon, i) => (
                             <div key={i} className="h-9 w-full rounded-lg flex items-center px-3 gap-3 hover:bg-white/5 transition-colors">
                                <Icon size={16} className="text-slate-500" />
                                <div className="h-3 w-16 bg-slate-800 rounded"></div>
                             </div>
                          ))}
                       </div>
                       <div className="pt-6 border-t border-white/5 space-y-2">
                          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-4">Infrastructure</p>
                          <div className="h-8 w-full bg-white/5 rounded-lg"></div>
                          <div className="h-8 w-full bg-white/5 rounded-lg"></div>
                       </div>
                    </div>
                    {/* Mock Dashboard Content */}
                    <div className="flex-1 p-8 overflow-y-auto bg-slate-950 scrollbar-hide">
                       <div className="flex justify-between items-end mb-10">
                          <div>
                             <div className="h-4 w-32 bg-slate-800 rounded mb-2"></div>
                             <div className="h-8 w-64 bg-white/10 rounded-lg"></div>
                          </div>
                          <div className="flex gap-2">
                             <div className="h-10 w-24 bg-white/5 rounded-xl"></div>
                             <div className="h-10 w-32 bg-brand-primary/80 rounded-xl"></div>
                          </div>
                       </div>

                       {/* Stats Cards */}
                       <div className="grid grid-cols-4 gap-6 mb-10">
                          {[
                             { color: 'bg-emerald-500/20', text: 'text-emerald-400', icon: Briefcase },
                             { color: 'bg-brand-primary/20', text: 'text-brand-primary', icon: CheckCircle },
                             { color: 'bg-sky-500/20', text: 'text-sky-400', icon: Users },
                             { color: 'bg-rose-500/20', text: 'text-rose-400', icon: AlertTriangle },
                          ].map((stat, i) => (
                             <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 h-24 flex flex-col justify-between">
                                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", stat.color, stat.text)}>
                                   <stat.icon size={16} />
                                </div>
                                <div className="h-3 w-12 bg-white/10 rounded"></div>
                             </div>
                          ))}
                       </div>

                       {/* Two Column Layout inside mockup */}
                       <div className="grid grid-cols-2 gap-8">
                          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-64 relative overflow-hidden">
                             <div className="h-4 w-40 bg-white/10 rounded mb-8"></div>
                             <div className="flex items-end gap-3 h-32">
                                {[60, 80, 45, 90, 70, 50, 85].map((h, i) => (
                                   <motion.div 
                                      key={i} 
                                      initial={{ height: 0 }} 
                                      animate={{ height: `${h}%` }} 
                                      transition={{ duration: 1, delay: 0.5 + (i*0.1) }}
                                      className="flex-1 bg-brand-primary/40 rounded-t-lg"
                                   ></motion.div>
                                ))}
                             </div>
                          </div>
                          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-64">
                             <div className="h-4 w-40 bg-white/10 rounded mb-6"></div>
                             <div className="space-y-4">
                                {[80, 45, 65].map((w, i) => (
                                   <div key={i} className="space-y-2">
                                      <div className="flex justify-between">
                                         <div className="h-3 w-24 bg-white/5 rounded"></div>
                                      </div>
                                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                         <motion.div 
                                            initial={{ width: 0 }} 
                                            animate={{ width: `${w}%` }} 
                                            transition={{ duration: 1, delay: 0.8 }}
                                            className={cn("h-full rounded-full", i === 0 ? "bg-emerald-500" : "bg-brand-primary")}
                                         ></motion.div>
                                      </div>
                                   </div>
                                ))}
                             </div>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements for Dynamism */}
                <motion.div
                  animate={{ x: [0, 15, -10, 0], y: [0, -20, 10, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-1/2 left-20 z-20"
                >
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 flex items-center gap-3">
                     <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <Flame size={16} className="text-orange-500 fill-orange-500" />
                     </div>
                     <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Productivity Streak</p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">12 Days 🔥</p>
                     </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Roles Section Upgrade */}
        <section id="features" className="py-32 px-6 bg-slate-50 dark:bg-slate-950/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-display font-bold text-slate-900 dark:text-white mb-6 tracking-tight">Built for every role</h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">Precision controls that adapt to your responsibilities. Administrators command, members execute.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <Card className="p-12 border-slate-200 dark:border-white/5 hover:border-brand-primary/30 group bg-white dark:bg-slate-900/40 relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-primary/5 blur-3xl rounded-full"></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary mb-8 group-hover:scale-110 transition-transform shadow-inner">
                    <Monitor size={32} />
                  </div>
                  <h3 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-6">Team Leadership</h3>
                  <ul className="space-y-5 mb-10">
                    {[
                      { text: "Full project tracking and health views", icon: Globe },
                      { text: "Team collaboration management", icon: Users },
                      { text: "Task distribution and metrics", icon: BarChart3 },
                      { text: "Deadline and priority tracking", icon: AlertTriangle }
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-4 text-slate-600 dark:text-slate-300">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center">
                           <item.icon size={16} className="text-brand-primary" />
                        </div>
                        <span className="font-medium">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Miniature Admin Preview */}
                  <div className="mt-auto bg-slate-50 dark:bg-slate-950/50 rounded-2xl p-6 border border-slate-200 dark:border-white/10 shadow-inner">
                     <div className="flex justify-between items-center mb-6">
                        <div className="h-4 w-32 bg-slate-200 dark:bg-white/10 rounded"></div>
                        <Badge variant="urgent">Restricted</Badge>
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-white/5 shadow-sm">
                           <div className="h-4 w-8 bg-brand-primary/20 rounded mb-2"></div>
                           <div className="h-6 w-12 bg-slate-900 dark:bg-white rounded"></div>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-white/5 shadow-sm">
                           <div className="h-4 w-8 bg-emerald-500/20 rounded mb-2"></div>
                           <div className="h-6 w-12 bg-slate-900 dark:bg-white rounded"></div>
                        </div>
                     </div>
                  </div>
                </div>
              </Card>

              <Card className="p-12 border-slate-200 dark:border-white/5 hover:border-brand-secondary/30 group bg-white dark:bg-slate-900/40 relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-secondary/5 blur-3xl rounded-full"></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-16 h-16 bg-brand-secondary/10 rounded-2xl flex items-center justify-center text-brand-secondary mb-8 group-hover:scale-110 transition-transform shadow-inner">
                    <Rocket size={32} />
                  </div>
                  <h3 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-6">Individual Workspace</h3>
                  <ul className="space-y-5 mb-10">
                    {[
                      { text: "Focused personal dashboard", icon: Layout },
                      { text: "Interactive Kanban board", icon: CheckCircle },
                      { text: "Progress and task tracking", icon: Flame },
                      { text: "Real-time activity logs", icon: Activity }
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-4 text-slate-600 dark:text-slate-300">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center">
                           <item.icon size={16} className="text-brand-secondary" />
                        </div>
                        <span className="font-medium">{item.text}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Miniature Member Preview */}
                  <div className="mt-auto bg-slate-50 dark:bg-slate-950/50 rounded-2xl p-6 border border-slate-200 dark:border-white/10 shadow-inner">
                     <div className="flex justify-between items-center mb-6">
                        <div className="h-4 w-32 bg-slate-200 dark:bg-white/10 rounded"></div>
                        <div className="flex gap-1">
                           <div className="w-2 h-2 rounded-full bg-brand-secondary"></div>
                           <div className="w-2 h-2 rounded-full bg-brand-secondary animate-pulse"></div>
                        </div>
                     </div>
                     <div className="space-y-3">
                        {[75, 40].map((w, i) => (
                           <div key={i} className="h-6 w-full bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-white/5 flex items-center px-3">
                              <div className="h-1.5 rounded-full bg-brand-secondary" style={{ width: `${w}%` }}></div>
                           </div>
                        ))}
                     </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-32 px-6 bg-white dark:bg-slate-950">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-display font-bold text-slate-900 dark:text-white mb-6 tracking-tight">Simple Pricing</h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">Scale your team as you grow. Choose a plan that fits your needs.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
               {pricingPlans.map((plan, i) => (
                 <Card key={i} className={cn(
                   "p-10 flex flex-col border-slate-200 dark:border-white/5 relative",
                   plan.recommended && "border-brand-primary shadow-2xl shadow-brand-primary/10 ring-1 ring-brand-primary/50"
                 )}>
                   {plan.recommended && (
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-primary text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                       Recommended
                     </div>
                   )}
                   <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{plan.name}</h3>
                   <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-4xl font-display font-bold text-slate-900 dark:text-white">{plan.price}</span>
                      <span className="text-slate-500 text-sm">/mo</span>
                   </div>
                   <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">{plan.description}</p>
                   
                   <div className="space-y-4 mb-10 flex-1">
                      {plan.features.map((feature, j) => (
                        <div key={j} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                           <CheckCircle2 size={16} className="text-brand-primary flex-shrink-0" />
                           <span>{feature}</span>
                        </div>
                      ))}
                   </div>
                   
                   <Button 
                    variant={plan.recommended ? "primary" : "outline"} 
                    className="w-full h-12 rounded-xl dark:border-white/10 dark:text-white dark:hover:bg-white/5"
                    onClick={() => i === 2 ? showToast("Contact sales@velora.io") : onSignup()}
                   >
                     {plan.cta}
                   </Button>
                 </Card>
               ))}
            </div>
          </div>
        </section>

        {/* Feature Highlights Redesigned */}
        <section className="py-32 px-6 bg-slate-950 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/10 blur-[120px] -z-10"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-secondary/10 blur-[120px] -z-10"></div>
          
          <div className="max-w-7xl mx-auto flex flex-col items-center">
            <div className="text-center mb-24">
               <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tighter">Built for productivity</h2>
               <p className="text-slate-400 text-lg max-w-2xl mx-auto">Smart tools to help your team work better together.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-16">
              <div className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-8 text-brand-primary shadow-[inset_0_0_20px_rgba(99,102,241,0.1)] group-hover:-translate-y-2 transition-all duration-500">
                  <Zap size={36} className="animate-glow" />
                </div>
                <h4 className="text-2xl font-display font-bold mb-4">Instant Sync</h4>
                <p className="text-slate-400 leading-relaxed">Zero lag between action and visibility. Every status update reflected across the entire workspace instantly.</p>
              </div>

              <div className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-8 text-brand-secondary shadow-[inset_0_0_20px_rgba(168,85,247,0.1)] group-hover:-translate-y-2 transition-all duration-500">
                  <Shield size={36} />
                </div>
                <h4 className="text-2xl font-display font-bold mb-4">Secure Workspace</h4>
                <p className="text-slate-400 leading-relaxed">Role-based access controls that ensure your workspace is secure and your data is protected.</p>
              </div>
            </div>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="mt-32 p-10 bg-gradient-to-r from-brand-primary/20 via-brand-secondary/20 to-brand-accent/20 rounded-[40px] border border-white/10 backdrop-blur-xl relative overflow-hidden group cursor-pointer max-w-4xl w-full"
              onClick={onSignup}
            >
               <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
                  <div className="text-left">
                     <h3 className="text-3xl font-display font-bold mb-3">Ready to manage your team?</h3>
                     <p className="text-slate-400 font-medium">Join 2,000+ high-velocity teams already using Velora.</p>
                  </div>
                  <Button size="lg" className="h-14 px-8 rounded-xl shrink-0 gap-2">
                     Get Started Free <ArrowRight size={18} />
                  </Button>
               </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="py-20 px-6 border-t border-slate-200 dark:border-white/5 bg-white dark:bg-slate-950 transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
             <div className="space-y-6 max-w-sm">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-slate-900 dark:bg-white rounded-xl flex items-center justify-center text-white dark:text-slate-900">
                      <Shield size={22} />
                   </div>
                   <span className="text-2xl font-display font-bold text-slate-900 dark:text-white">Velora</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                   The cleanest task manager for modern teams. Built for high-velocity environments that demand simplicity.
                </p>
                <div className="flex items-center gap-5 text-slate-400">
                   <a href="#" className="hover:text-brand-primary transition-colors"><Twitter size={20} /></a>
                   <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors"><Github size={20} /></a>
                   <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors"><Linkedin size={20} /></a>
                </div>
             </div>
             
             <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 sm:gap-24">
                <div className="space-y-4">
                   <h4 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">Product</h4>
                   <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                      <li><button onClick={() => navigate('/features')} className="hover:text-brand-primary">Features</button></li>
                      <li><button onClick={onDemo} className="hover:text-brand-primary">Live Demo</button></li>
                      <li><button onClick={() => navigate('/pricing')} className="hover:text-brand-primary">Pricing</button></li>
                   </ul>
                </div>
                <div className="space-y-4">
                   <h4 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">Company</h4>
                   <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                      <li><button onClick={() => navigate('/about')} className="hover:text-brand-primary">About</button></li>
                      <li><button onClick={() => navigate('/privacy')} className="hover:text-brand-primary">Privacy</button></li>
                   </ul>
                </div>
                <div className="space-y-4 col-span-2 sm:col-span-1">
                   <h4 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">Support</h4>
                   <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                      <li><button onClick={() => navigate('/docs')} className="hover:text-brand-primary">Documentation</button></li>
                      <li><button onClick={() => navigate('/help')} className="hover:text-brand-primary">Help Center</button></li>
                      <li><button onClick={() => navigate('/contact')} className="hover:text-brand-primary">Contact</button></li>
                   </ul>
                </div>
             </div>
          </div>
          
          <div className="pt-12 border-t border-slate-200 dark:border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
             <p className="text-xs text-slate-400">
                © 2026 Velora Technologies Inc. All rights reserved. Built for teams that deliver.
             </p>
             <div className="flex gap-6">
                <span className="flex items-center gap-2 text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                   All systems operational
                </span>
             </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="fixed bottom-10 right-10 z-[60]"
          >
            <Button
              onClick={scrollToTop}
              className="w-14 h-14 rounded-2xl shadow-2xl p-0 flex items-center justify-center bg-brand-primary hover:scale-110 active:scale-95 transition-transform"
            >
              <ArrowUp size={24} />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
