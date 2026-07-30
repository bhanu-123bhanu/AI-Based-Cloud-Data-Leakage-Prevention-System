import { AnimatePresence, motion } from 'framer-motion';
import { Bell, ChevronDown, LayoutDashboard, LogOut, Menu, Moon, Search, Settings, ShieldCheck, Sparkles, Upload, UserCircle2, FileText, FileCheck2, Activity, Users } from 'lucide-react';
import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/upload', label: 'Upload', icon: Upload },
  { to: '/documents', label: 'Documents', icon: FileText },
  { to: '/verify', label: 'Verify', icon: FileCheck2 },
  { to: '/activity', label: 'Activity', icon: Activity },
  { to: '/admin', label: 'Users', icon: Users },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const { darkMode, setDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      <div className="flex min-h-screen">
        <aside className={`fixed inset-y-0 left-0 z-30 ${sidebarOpen ? 'w-72' : 'w-24'} border-r ${darkMode ? 'border-slate-800 bg-slate-950/95' : 'border-slate-200 bg-white/90'} px-4 py-6 backdrop-blur-xl transition-all duration-300 lg:static`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-blue-600 p-2 shadow-lg shadow-blue-600/20">
                <ShieldCheck className="h-6 w-6 text-white" />
              </div>
              {sidebarOpen && <div>
                <p className="text-lg font-semibold">IBM Secure</p>
                <p className="text-xs text-slate-400">Cloud Guard</p>
              </div>}
            </div>
            <button className={`rounded-lg p-2 ${darkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`} onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="h-5 w-5" />
            </button>
          </div>

          <nav className="mt-8 space-y-2">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to} className={({ isActive }) => `flex items-center gap-3 rounded-2xl px-3 py-3 transition ${isActive ? 'bg-blue-600/15 text-blue-400' : darkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'}`}>
                <Icon className="h-5 w-5" />
                {sidebarOpen && <span>{label}</span>}
              </NavLink>
            ))}
          </nav>

          <div className={`mt-8 rounded-3xl border ${darkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-slate-100'} p-4 ${!sidebarOpen && 'hidden'}`}>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-blue-600/15 p-2 text-blue-400"><Sparkles className="h-5 w-5" /></div>
              <div>
                <p className="text-sm font-semibold">AI Threat Scan</p>
                <p className="text-xs text-slate-400">128 checks in last hour</p>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1 lg:ml-0">
          <header className={`sticky top-0 z-20 border-b ${darkMode ? 'border-slate-800 bg-slate-950/80' : 'border-slate-200 bg-white/75'} backdrop-blur-xl`}>
            <div className="flex items-center justify-between px-4 py-4 lg:px-8">
              <div className="flex items-center gap-3">
                <button className={`rounded-xl p-2 lg:hidden ${darkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`} onClick={() => setSidebarOpen(true)}>
                  <Menu className="h-5 w-5" />
                </button>
                <div>
                  <p className="text-sm text-slate-400">Enterprise Security Platform</p>
                  <h1 className="text-xl font-semibold">AI Cloud Data Leakage Prevention</h1>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <label className={`flex items-center gap-2 rounded-2xl border px-3 py-2 ${darkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-slate-100'}`}>
                  <Search className="h-4 w-4 text-slate-400" />
                  <input className={`w-32 bg-transparent text-sm outline-none lg:w-56 ${darkMode ? 'text-slate-100' : 'text-slate-800'}`} placeholder="Search" />
                </label>
                <button onClick={() => setDarkMode(!darkMode)} className={`rounded-2xl p-2 ${darkMode ? 'bg-slate-900 hover:bg-slate-800' : 'bg-slate-100 hover:bg-slate-200'}`}>
                  <Moon className="h-5 w-5" />
                </button>
                <button className={`relative rounded-2xl p-2 ${darkMode ? 'bg-slate-900 hover:bg-slate-800' : 'bg-slate-100 hover:bg-slate-200'}`}>
                  <Bell className="h-5 w-5" />
                  <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-blue-500" />
                </button>
                <div className="relative">
                  <button onClick={() => setProfileOpen(!profileOpen)} className={`flex items-center gap-3 rounded-2xl px-2 py-2 ${darkMode ? 'bg-slate-900 hover:bg-slate-800' : 'bg-slate-100 hover:bg-slate-200'}`}>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 font-semibold">AC</div>
                    <div className="hidden text-left sm:block">
                      <p className="text-sm font-semibold">{user?.name}</p>
                      <p className="text-xs text-slate-400">{user?.role}</p>
                    </div>
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  </button>
                  {profileOpen && <div className={`absolute right-0 mt-3 w-48 rounded-2xl border p-2 shadow-2xl ${darkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'}`}>
                    <button onClick={() => navigate('/profile')} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left hover:bg-slate-800"> <UserCircle2 className="h-4 w-4" /> Profile </button>
                    <button onClick={() => navigate('/settings')} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left hover:bg-slate-800"> <Settings className="h-4 w-4" /> Settings </button>
                    <button onClick={handleLogout} className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-red-400 hover:bg-slate-800"> <LogOut className="h-4 w-4" /> Logout </button>
                  </div>}
                </div>
              </div>
            </div>
          </header>

          <main className="px-4 py-6 lg:px-8">
            <AnimatePresence mode="wait">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.25 }}>
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
