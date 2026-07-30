import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import api from "../services/api";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();




const onSubmit = async (data) => {
  try {
    const response = await api.post("/register", {
      fullname: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      role: data.role,
    });

    alert(response.data.message);

    navigate("/login");
  } catch (error) {
    alert(error.response?.data?.detail || "Registration Failed");
  }
};

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.2),_transparent_35%),linear-gradient(135deg,_#020617,_#111827)] px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-4xl rounded-[2rem] border border-slate-800 bg-slate-900/70 p-8 shadow-2xl shadow-blue-900/20 backdrop-blur-xl sm:p-10">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">Register</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Create your secure workspace account</h2>
          <p className="mt-2 text-sm text-slate-400">Join the enterprise data protection network.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm text-slate-300">Full Name</span>
            <input {...register('name', { required: 'Full name is required' })} className="w-full rounded-2xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-white" />
            {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>}
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-slate-300">Email</span>
            <input {...register('email', { required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email address' } })} className="w-full rounded-2xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-white" />
            {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>}
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-slate-300">Phone</span>
            <input {...register('phone')} className="w-full rounded-2xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-white" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-slate-300">Role</span>
            <select {...register('role')} className="w-full rounded-2xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-white">
              <option value="Employee">Employee</option>
              <option value="Admin">Admin</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-slate-300">Password</span>
            <input {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })} type="password" className="w-full rounded-2xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-white" />
            {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>}
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-slate-300">Confirm Password</span>
            <input {...register('confirmPassword', { validate: value => value === watch('password') || 'Passwords do not match' })} type="password" className="w-full rounded-2xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-white" />
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-400">{errors.confirmPassword.message}</p>}
          </label>

          <div className="md:col-span-2">
            <button type="submit" className="w-full rounded-2xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-500">Register</button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account? <Link to="/login" className="font-semibold text-blue-400">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
