import { ArrowLeft, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.16),_transparent_35%),linear-gradient(135deg,_#020617,_#111827)] px-4">
      <div className="w-full max-w-xl rounded-[2rem] border border-slate-800 bg-slate-900/70 p-10 text-center shadow-2xl shadow-blue-900/20 backdrop-blur-xl">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-600/15 text-blue-400">
          <ShieldAlert className="h-10 w-10" />
        </div>
        <h1 className="mt-6 text-4xl font-semibold text-white">404</h1>
        <p className="mt-3 text-lg text-slate-300">The requested page could not be found.</p>
        <p className="mt-2 text-sm text-slate-400">You may have entered an invalid route or the page was moved.</p>
        <Link to="/dashboard" className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 font-semibold text-white">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
