import { motion } from 'framer-motion';
import { Camera, KeyRound, LogOut, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/30">
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-3xl font-semibold text-white">AC</div>
            <button className="absolute bottom-0 right-0 rounded-full bg-blue-600 p-2 text-white"><Camera className="h-4 w-4" /></button>
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-white">{user?.name}</h2>
          <p className="mt-1 text-sm text-slate-400">{user?.role}</p>
          <p className="mt-2 text-sm text-slate-400">{user?.email}</p>
        </div>
        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
          <div className="flex items-center gap-2 text-sm text-slate-300"><ShieldCheck className="h-4 w-4 text-blue-400" /> Security posture</div>
          <p className="mt-3 text-sm text-slate-400">98% policy compliance · 4 active incidents monitored</p>
        </div>
      </motion.div>

      <div className="space-y-6">
        <div className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/30">
          <h3 className="text-xl font-semibold text-white">Personal Details</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {[
              ['Full Name', user?.name],
              ['Email', user?.email],
              ['Role', user?.role],
              ['Department', 'Cloud Security'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
                <p className="text-sm text-slate-400">{label}</p>
                <p className="mt-2 font-medium text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/30">
          <h3 className="text-xl font-semibold text-white">Change Password</h3>
          <div className="mt-4 space-y-3">
            <input type="password" placeholder="Current password" className="w-full rounded-2xl border border-slate-700 bg-slate-950/50 px-4 py-3 text-white" />
            <input type="password" placeholder="New password" className="w-full rounded-2xl border border-slate-700 bg-slate-950/50 px-4 py-3 text-white" />
            <button className="flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 font-semibold text-white"><KeyRound className="h-4 w-4" /> Update Password</button>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/30">
          <h3 className="text-xl font-semibold text-white">Activity History</h3>
          <div className="mt-4 space-y-3">
            {['Verified 12 docs', 'Rotated encryption key', 'Reviewed 3 policy alerts'].map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm text-slate-300"><Sparkles className="h-4 w-4 text-blue-400" /> {item}</div>
            ))}
          </div>
          <button className="mt-6 flex items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-red-300"><LogOut className="h-4 w-4" /> Logout</button>
        </div>
      </div>
    </div>
  );
}
