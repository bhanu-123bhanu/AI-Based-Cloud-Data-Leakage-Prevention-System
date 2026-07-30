import { motion } from 'framer-motion';
import { CalendarDays, Download, Search, ShieldCheck, Trash2, Upload, Verified } from 'lucide-react';
import { useEffect, useState } from "react";
import api from "../services/api";



export default function ActivityLogsPage() {

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const loadLogs = async () => {
      try {
        const response = await api.get("/activity");
        setLogs(response.data.logs);
      } catch (error) {
        console.log(error);
      }
    };

    loadLogs();
  }, []);

  return (
    <div className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/30">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-blue-400">Activity Logs</p>
          <h2 className="text-3xl font-semibold text-white">Operational audit trail</h2>
        </div>
        <div className="flex gap-3">
          <label className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-950/50 px-3 py-2 text-sm text-slate-400">
            <Search className="h-4 w-4" />
            <input className="bg-transparent outline-none" placeholder="Search logs" />
          </label>
          <button className="flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white"><CalendarDays className="h-4 w-4" /> Date Filter</button>
        </div>
      </div>
      <div className="space-y-3">
        {logs.map(({ action, user, document, time }, index) => (
  <motion.div
    key={action + time + index}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08 }}
    className="flex items-start justify-between rounded-[1.25rem] border border-slate-800 bg-slate-950/50 p-4"
  >
    <div className="flex gap-3">
      <div className="rounded-2xl bg-blue-600/15 p-3 text-blue-400">
        <ShieldCheck className="h-5 w-5" />
      </div>

      <div>
        <p className="font-semibold text-white">{action}</p>
        <p className="text-sm text-slate-400">
          {user} · {document}
        </p>
      </div>
    </div>

    <div className="flex items-center gap-2 text-sm text-slate-400">
      <ShieldCheck className="h-4 w-4 text-blue-400" />
      {time}
    </div>
  </motion.div>
))}
      </div>
    </div>
  );
}
