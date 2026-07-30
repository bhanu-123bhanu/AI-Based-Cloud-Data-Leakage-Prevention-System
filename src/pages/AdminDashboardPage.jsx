import { motion } from 'framer-motion';
import { Activity, BarChart3, FileText, ShieldCheck, Users } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const chartData = [
  { name: 'Mon', users: 40, docs: 80 },
  { name: 'Tue', users: 55, docs: 95 },
  { name: 'Wed', users: 58, docs: 90 },
  { name: 'Thu', users: 72, docs: 110 },
  { name: 'Fri', users: 68, docs: 118 },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/30">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-400">Administrative Control Center</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">Govern users, documents, and system trust</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ['Active Users', '248', Users],
          ['Document Analytics', '1,284', FileText],
          ['Policy Alerts', '17', ShieldCheck],
          ['System Logs', '3,406', Activity],
        ].map(([title, value, Icon]) => (
          <div key={title} className="rounded-[1.5rem] border border-slate-800 bg-slate-900/70 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">{title}</p>
                <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
              </div>
              <div className="rounded-2xl bg-blue-600/15 p-3 text-blue-400"><Icon className="h-6 w-6" /></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[1.75rem] border border-slate-800 bg-slate-900/70 p-5">
          <div className="mb-4 flex items-center gap-2 text-white"><BarChart3 className="h-5 w-5 text-blue-400" /> Document analytics</div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="users" fill="#2563eb" radius={[6, 6, 0, 0]} />
                <Bar dataKey="docs" fill="#38bdf8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[1.75rem] border border-slate-800 bg-slate-900/70 p-5">
            <h3 className="text-xl font-semibold text-white">Role Management</h3>
            <div className="mt-4 space-y-3">
              {['Admin', 'Security Analyst', 'Compliance Officer', 'Viewer'].map((role) => (
                <div key={role} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm text-slate-300">
                  <span>{role}</span>
                  <span className="text-blue-400">Configured</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[1.75rem] border border-slate-800 bg-slate-900/70 p-5">
            <h3 className="text-xl font-semibold text-white">Recent Activities</h3>
            <div className="mt-4 space-y-3">
              {['Policy updated', 'New admin invited', 'Audit export completed'].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm text-slate-300">{item}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
