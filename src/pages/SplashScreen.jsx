import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/login'), 2200);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.16),_transparent_45%),linear-gradient(135deg,_#020617,_#0f172a)]">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="rounded-[2rem] border border-blue-500/20 bg-slate-900/70 p-10 text-center shadow-2xl shadow-blue-600/10 backdrop-blur-xl">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2.4, ease: 'linear' }} className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-4 border-blue-500/30 border-t-blue-500">
          <ShieldCheck className="h-10 w-10 text-blue-400" />
        </motion.div>
        <h1 className="mt-6 text-3xl font-semibold text-white">IBM Cloud Security</h1>
        <p className="mt-2 text-slate-400">Initializing leakage prevention intelligence…</p>
        <div className="mt-8 h-2 w-64 overflow-hidden rounded-full bg-slate-800">
          <motion.div animate={{ x: ['-100%', '100%'] }} transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }} className="h-full w-1/3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
        </div>
      </motion.div>
    </div>
  );
}
