import { motion } from 'framer-motion';
import { Bell, Globe2, Lock, MoonStar, Settings as SettingsIcon, ShieldCheck } from 'lucide-react';

const sections = [
  { title: 'Theme', description: 'Adjust visual mode and contrast', icon: MoonStar },
  { title: 'Notifications', description: 'Configure alert channels', icon: Bell },
  { title: 'Security', description: 'MFA and policy options', icon: Lock },
  { title: 'Language', description: 'Choose your interface language', icon: Globe2 },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/30">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-400">Preferences</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">Tailor your security workspace</h2>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {sections.map(({ title, description, icon: Icon }, index) => (
          <motion.div key={title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }} className="rounded-[1.75rem] border border-slate-800 bg-slate-900/70 p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-blue-600/15 p-3 text-blue-400"><Icon className="h-5 w-5" /></div>
              <div>
                <h3 className="font-semibold text-white">{title}</h3>
                <p className="text-sm text-slate-400">{description}</p>
              </div>
            </div>
            <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/50 p-4 text-sm text-slate-400">
              Configuration available for enterprise admin controls.
            </div>
          </motion.div>
        ))}
      </div>
      <div className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/30">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-blue-600/15 p-3 text-blue-400"><SettingsIcon className="h-5 w-5" /></div>
          <div>
            <h3 className="text-xl font-semibold text-white">About Platform</h3>
            <p className="text-sm text-slate-400">IBM-style security experience with distributed verification and AI monitoring.</p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4 text-sm text-blue-300"><ShieldCheck className="h-4 w-4" /> Version 2.0.1 · Secure by design</div>
      </div>
    </div>
  );
}
