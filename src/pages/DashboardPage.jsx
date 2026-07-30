import { motion } from 'framer-motion';
import { Activity, ArrowUpRight, FileCheck2, FileText, ShieldCheck, Upload, Users, Zap } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useEffect, useState } from 'react';
import api from "../services/api";



const activityData = [
  { name: 'Jan', value: 120 },
  { name: 'Feb', value: 180 },
  { name: 'Mar', value: 170 },
  { name: 'Apr', value: 260 },
  { name: 'May', value: 230 },
  { name: 'Jun', value: 310 },
];

export default function DashboardPage() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [dashboard, setDashboard] = useState({});

  useEffect(() => {

  const loadDashboard = async () => {
    try {
      const response = await api.get("/dashboard");
      setDashboard(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  loadDashboard();

}, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 rounded-[2rem] border border-slate-800 bg-gradient-to-br from-blue-600/20 via-slate-900 to-slate-950 p-6 shadow-2xl shadow-blue-900/10 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-blue-400">Overview</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Enterprise risk posture is strong</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">Monitor uploads, verify document integrity, and maintain compliance with a single AI-assisted control plane.</p>
        </div>
        <button className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-500">
          <Upload className="h-4 w-4" /> New Upload
        </button>
</div>

<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

<div className="rounded-[1.5rem] border border-slate-800 bg-slate-900/70 p-5">
  <p className="text-sm text-slate-400">Total Documents</p>
  <h2 className="text-3xl font-bold text-white">
    {dashboard.total_documents}
  </h2>
</div>

<div className="rounded-[1.5rem] border border-slate-800 bg-slate-900/70 p-5">
  <p className="text-sm text-slate-400">Verified Documents</p>
  <h2 className="text-3xl font-bold text-white">
    {dashboard.verified_documents}
  </h2>
</div>

<div className="rounded-[1.5rem] border border-slate-800 bg-slate-900/70 p-5">
  <p className="text-sm text-slate-400">Encrypted Documents</p>
  <h2 className="text-3xl font-bold text-white">
    {dashboard.encrypted_documents}
  </h2>
</div>

<div className="rounded-[1.5rem] border border-slate-800 bg-slate-900/70 p-5">
  <p className="text-sm text-slate-400">Blockchain Records</p>
  <h2 className="text-3xl font-bold text-white">
    {dashboard.blockchain_records}
  </h2>
</div>

</div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
        <div className="rounded-[1.75rem] border border-slate-800 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/40">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Analytics</p>
              <h3 className="text-xl font-semibold text-white">Threat prevention performance</h3>
            </div>
            <div className="rounded-2xl bg-blue-600/15 px-3 py-2 text-sm text-blue-400">+24% this quarter</div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#2563eb" fillOpacity={1} fill="url(#colorUv)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[1.75rem] border border-slate-800 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/40">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Quick Actions</h3>
              <Zap className="h-5 w-5 text-blue-400" />
            </div>
            <div className="space-y-3">
              {['Scan new document', 'Verify blockchain record', 'Review policy drift', 'Export compliance log'].map((action) => (
                <button key={action} className="flex w-full items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-300 hover:border-blue-500/40 hover:text-white">
                  {action}
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-[1.75rem] border border-slate-800 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/40">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Recent Uploads</h3>
              <Users className="h-5 w-5 text-blue-400" />
            </div>
            <div className="space-y-3">
  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
    <p className="font-medium text-white">No recent uploads</p>
    <p className="mt-1 text-sm text-slate-400">
      Upload a document to see it here.
    </p>
  </div>
</div>
          </div>
        </div>
      </div>
    </div>
  );
}
