import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Rocket, Target, Shield, Zap, Mail, Globe, MessageSquare, Clock, Search, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Card, Button, Badge, cn } from '../components/UI';

const PageLayout = ({ title, description, children }: { title: string, description?: string, children: React.ReactNode }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500 overflow-x-hidden">
      <nav className="h-20 border-b border-slate-100 dark:border-white/5 flex items-center px-8 lg:px-20 justify-between sticky top-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-4">
           <button onClick={() => navigate('/')} className="p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400">
             <ArrowLeft size={18} />
           </button>
           <h1 className="text-xl font-display font-bold tracking-tight dark:text-white">Velora</h1>
        </div>
        <Button size="sm" variant="outline" onClick={() => navigate('/login')}>Sign In</Button>
      </nav>
      <main className="max-w-4xl mx-auto px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
           <h1 className="text-5xl font-display font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-tight">{title}</h1>
           {description && <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">{description}</p>}
        </motion.div>
        {children}
      </main>
      <footer className="border-t border-slate-100 dark:border-white/5 py-12 text-center text-slate-400 text-xs font-bold uppercase tracking-widest">
        &copy; 2026 Velora • All Rights Reserved
      </footer>
    </div>
  );
};

export const FeaturesPage = () => (
  <PageLayout title="Features" description="Simple and efficient tools for team productivity.">
    <div className="grid md:grid-cols-2 gap-8">
      {[
        { t: 'High-Velocity Projects', d: 'Manage complex projects with granular control.', i: Rocket },
        { t: 'Deadlines', d: 'Efficient deadline tracking and progress logic.', i: Clock },
        { t: 'Secure Access', d: 'Role-based access controls for secure collaboration.', i: Shield },
        { t: 'Admin Dashboard', d: 'Full visibility for administrative oversight.', i: Rocket }
      ].map((f, i) => (
        <Card key={i} className="p-8 group hover:border-brand-primary">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-white transition-all">
             <f.i size={24} />
          </div>
          <h3 className="text-xl font-display font-bold mb-2 dark:text-white">{f.t}</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">{f.d}</p>
        </Card>
      ))}
    </div>
  </PageLayout>
);

export const DocumentationPage = () => (
  <PageLayout title="Documentation" description="Guides and resources for your team.">
    <div className="space-y-12">
      <div className="p-8 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/10">
         <h3 className="text-xl font-bold mb-4 dark:text-white">Quick Start Guide</h3>
         <p className="text-slate-500 leading-relaxed max-w-2xl font-medium">To begin your journey, ensure your account is correctly initialized within the project directory.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {['API Guides', 'Security & Login', 'Deadlines & Progress', 'Team Management'].map(doc => (
          <div key={doc} className="p-4 flex items-center justify-between border-b border-slate-100 dark:border-white/5 group cursor-pointer hover:border-brand-primary transition-colors">
            <span className="font-bold text-slate-700 dark:text-slate-300">{doc}</span>
            <ChevronRight size={18} className="text-slate-300 group-hover:text-brand-primary" />
          </div>
        ))}
      </div>
    </div>
  </PageLayout>
);

export const HelpCenterPage = () => (
  <PageLayout title="Help Center" description="Our support team is here to help.">
    <div className="grid md:grid-cols-3 gap-8">
      {[
        { t: 'Troubleshooting', d: 'Resolve technical issues.' },
        { t: 'Billing & Tiers', d: 'Manage your subscription.' },
        { t: 'Community Forum', d: 'Connect with other users.' }
      ].map(h => (
        <Card key={h.t} className="p-8 text-center space-y-4 dark:bg-slate-900/40">
           <div className="w-12 h-12 bg-slate-100 dark:bg-white/5 rounded-[1.25rem] mx-auto flex items-center justify-center text-slate-400">
              <Zap size={20} />
           </div>
           <h3 className="font-bold dark:text-white">{h.t}</h3>
           <p className="text-xs text-slate-500 font-medium">{h.d}</p>
           <Button variant="outline" className="w-full text-xs">Access Hub</Button>
        </Card>
      ))}
    </div>
  </PageLayout>
);

export const AboutPage = () => (
  <PageLayout title="The Velora Mission" description="Building the next generation of productivity tools for high-velocity teams.">
    <div className="space-y-12 text-left">
      <section>
        <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-4">What is Velora?</h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
          Velora (formerly FlowDesk) is a role-based productivity ecosystem designed to bridge the gap between high-level management and granular execution. We believe that clarity of purpose drives speed of action.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-8 dark:bg-slate-900/40">
            <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-6">
              <Rocket size={24} />
            </div>
            <h3 className="font-display font-bold text-slate-900 dark:text-white mb-2">For Administrators</h3>
            <p className="text-sm text-slate-500">Full visibility into team workload, project health, and resource allocation without the noise.</p>
          </Card>
          <Card className="p-8 dark:bg-slate-900/40">
            <div className="w-12 h-12 rounded-2xl bg-brand-secondary/10 text-brand-secondary flex items-center justify-center mb-6">
              <Target size={24} />
            </div>
            <h3 className="font-display font-bold text-slate-900 dark:text-white mb-2">For Members</h3>
            <p className="text-sm text-slate-500">Focused workspace with zero distractions, automated priority tracking, and clear accountability.</p>
          </Card>
        </div>
      </section>

      <section className="bg-slate-50 dark:bg-white/5 rounded-3xl p-12 text-center">
        <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-4 italic">"Productivity isn't about doing more. It's about being more intentional."</h2>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">— The Velora Philosophy</p>
      </section>
    </div>
  </PageLayout>
);

export const PricingPage = () => (
  <PageLayout title="Pricing Plans" description="Choose the plan that fits your team's ambition.">
    <div className="grid md:grid-cols-3 gap-8">
      {[
        { name: 'Basic', price: '$0', desc: 'For solo creators', features: ['3 Projects', '10 Tasks', 'Standard Support'] },
        { name: 'Team', price: '$12', desc: 'For growing teams', features: ['Unlimited Projects', 'Kanban Access', 'Team Analytics', 'Priority Support'], popular: true },
        { name: 'Enterprise', price: '$29', desc: 'For large organizations', features: ['Custom Roles', 'API Access', '24/7 Priority Support', 'Dedicated Success Manager'] },
      ].map((tier, i) => (
        <Card key={i} className={cn("p-8 relative", tier.popular && "border-brand-primary ring-1 ring-brand-primary/50")}>
          {tier.popular && <Badge variant="info" className="absolute -top-3 left-1/2 -translate-x-1/2">MOST POPULAR</Badge>}
          <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-2">{tier.name}</h3>
          <div className="flex items-baseline gap-1 mb-6">
             <span className="text-4xl font-display font-bold dark:text-white">{tier.price}</span>
             <span className="text-slate-400 text-sm">/mo</span>
          </div>
          <p className="text-xs text-slate-500 mb-8">{tier.desc}</p>
          <ul className="space-y-4 mb-8 text-left">
            {tier.features.map(f => (
              <li key={f} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <CheckCircle2 size={14} className="text-brand-accent" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <Button className="w-full" variant={tier.popular ? 'primary' : 'outline'}>Get Started with {tier.name}</Button>
        </Card>
      ))}
    </div>
  </PageLayout>
);

export const PrivacyPage = () => (
  <PageLayout title="Privacy Policy" description="How we handle your data within the Velora network.">
    <div className="space-y-8 text-left max-w-2xl mx-auto">
      <div className="prose dark:prose-invert">
        <h3 className="text-xl font-bold dark:text-white">1. Data Storage</h3>
        <p className="text-slate-600 dark:text-slate-400">We store your name, email, and workspace metadata to provide a seamless service experience. All password data is salt-hashed and never stored in plain text.</p>
        
        <h3 className="text-xl font-bold dark:text-white mt-8">2. Third Party Access</h3>
        <p className="text-slate-600 dark:text-slate-400">Velora does not sell your account history to external entities. We use industry-standard encryption for all data in transit.</p>
      </div>
      <Card className="p-8 bg-brand-primary/5 border-brand-primary/20 mt-12">
        <h4 className="font-bold mb-2">Need clarification?</h4>
        <p className="text-sm text-slate-600 mb-4">Contact our privacy compliance team for more details on our security stack.</p>
        <Button size="sm" variant="outline">Email compliance@velora.ai</Button>
      </Card>
    </div>
  </PageLayout>
);

export const ContactPage = () => (
  <PageLayout title="Reach Out" description="Connect with the team behind Velora.">
    <div className="grid md:grid-cols-2 gap-12 text-left">
      <div>
        <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-6">Inquiries</h3>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center shrink-0">
               <Mail className="text-brand-primary" />
            </div>
            <div>
               <p className="font-bold text-slate-900 dark:text-white">Support Email</p>
               <p className="text-sm text-slate-500">support@velora.ai</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center shrink-0">
               <Globe className="text-brand-primary" />
            </div>
            <div>
               <p className="font-bold text-slate-900 dark:text-white">Global Offices</p>
               <p className="text-sm text-slate-500">Singapore • San Francisco • London</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center shrink-0">
               <MessageSquare className="text-brand-primary" />
            </div>
            <div>
               <p className="font-bold text-slate-900 dark:text-white">Community</p>
               <p className="text-sm text-slate-500">Join our Discord server</p>
            </div>
          </div>
        </div>
      </div>
      <Card className="p-8 dark:bg-slate-900/40">
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
           <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Subject</label>
              <input type="text" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-3 outline-none focus:border-brand-primary" placeholder="Partnership request" />
           </div>
           <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Your Message</label>
              <textarea rows={4} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-3 outline-none focus:border-brand-primary" placeholder="How can we help?" />
           </div>
           <Button className="w-full">Send Message</Button>
        </form>
      </Card>
    </div>
  </PageLayout>
);
