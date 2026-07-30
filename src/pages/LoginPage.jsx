import { motion } from 'framer-motion';
import { Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from "axios";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
  try {

    const response = await axios.post(
      "http://127.0.0.1:8000/login",
      {
        email: data.email,
        password: data.password
      }
    );

    if (response.data.status === "Success") {

  login(response.data);

  navigate("/dashboard");

} else {

  alert(response.data.message);

}
  } catch (error) {

    console.log(error);

    console.log(error.response);

    alert(error.response?.data?.message || error.message);

}
};

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.2),_transparent_35%),linear-gradient(135deg,_#020617,_#111827)] px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/70 shadow-2xl shadow-blue-900/20 backdrop-blur-xl">
        <div className="grid md:grid-cols-2">
          <div className="hidden bg-[linear-gradient(135deg,_rgba(37,99,235,0.25),_rgba(14,116,144,0.15))] p-10 md:flex md:flex-col md:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-white/10 p-2"><ShieldCheck className="h-7 w-7 text-blue-300" /></div>
                <div>
                  <p className="text-lg font-semibold text-white">Secure Workspace</p>
                  <p className="text-sm text-slate-300">AI-driven data leakage prevention</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-white">Protect every document with blockchain trust.</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">Monitor uploads, verify integrity, and enforce enterprise-grade governance from a single portal.</p>
            </div>
          </div>
          <div className="p-8 sm:p-10">
            <div className="mb-8 text-center md:text-left">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">Sign In</p>
              <h3 className="mt-2 text-3xl font-semibold text-white">Welcome back</h3>
              <p className="mt-2 text-sm text-slate-400">Use your credentials to access the control plane.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm text-slate-300">Email</span>
                <input {...register('email')} type="email" defaultValue="ava.chen@ibmcloud.com" className="w-full rounded-2xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-white outline-none ring-0" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-slate-300">Password</span>
                <div className="flex items-center rounded-2xl border border-slate-700 bg-slate-800/80 px-4 py-3">
                  <input {...register('password')} type={showPassword ? 'text' : 'password'} defaultValue="secure123" className="w-full bg-transparent text-white outline-none" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="ml-2 text-slate-400">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </label>
              <div className="flex items-center justify-between text-sm text-slate-400">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-slate-600 bg-slate-800" />
                  Remember me
                </label>
                <a href="#" className="text-blue-400">Forgot password?</a>
              </div>
              <button type="submit" className="w-full rounded-2xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-500">Login</button>
            </form>

            <div className="my-6 flex items-center gap-3 text-slate-500">
              <div className="h-px flex-1 bg-slate-700" />
              <span className="text-sm">or continue with</span>
              <div className="h-px flex-1 bg-slate-700" />
            </div>

            <button className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-700 bg-slate-800/70 px-4 py-3 text-white transition hover:bg-slate-800">
              <FcGoogle className="h-5 w-5" /> Sign in with Google
            </button>

            <p className="mt-6 text-center text-sm text-slate-400">
              New here?{' '}
              <Link to="/register" className="font-semibold text-blue-400">Create an account</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
