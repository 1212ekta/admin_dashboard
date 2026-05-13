import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Menu,
  LogOut,
  ChevronLeft,
  ChevronRight,
  BarChart3,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Users', path: '/users', icon: Users },
];

function Sidebar({ collapsed, onToggleCollapse, onLogout }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setDrawerOpen(false);
    }
  }, []);

  return (
    <>
      <button
        type="button"
        className="fixed left-4 top-4 z-40 inline-flex h-12 w-12 items-center justify-center rounded-3xl border border-slate-200 bg-white text-slate-900 shadow-lg shadow-slate-200/60 transition hover:bg-slate-100 lg:hidden"
        onClick={() => setDrawerOpen(true)}
      >
        <Menu size={20} />
      </button>

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col overflow-hidden border-r border-slate-800/80 bg-slate-950 text-slate-100 shadow-2xl shadow-slate-950/40 transition-all duration-300 ${
          collapsed ? 'w-20' : 'w-72'
        } ${drawerOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="flex items-center justify-between gap-3 border-b border-slate-900/80 px-5 py-6">
          <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-3xl bg-sky-500 text-white">
              <BarChart3 size={22} />
            </div>
            {!collapsed && (
              <div>
                <p className="text-sm text-slate-400">Admin Console</p>
                <h1 className="text-xl font-semibold">SaaS Desk</h1>
              </div>
            )}
          </div>
          <button
            type="button"
            className="hidden h-10 w-10 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 text-slate-300 transition hover:bg-slate-800 lg:inline-flex"
            onClick={onToggleCollapse}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <nav className="mt-8 flex-1 space-y-1 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 rounded-3xl px-4 py-3 text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                } ${collapsed ? 'justify-center' : ''}`}
                onClick={() => setDrawerOpen(false)}
                title={item.label}
              >
                <Icon size={18} />
                <span className={`${collapsed ? 'hidden' : 'block'}`}>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto px-3 pb-6">
          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center justify-center gap-3 rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-300 transition hover:bg-slate-800"
          >
            <LogOut size={18} />
            {!collapsed && 'Sign out'}
          </button>
        </div>
      </aside>

      {drawerOpen && <div className="fixed inset-0 z-30 bg-slate-950/60 lg:hidden" onClick={() => setDrawerOpen(false)} />}
    </>
  );
}

export default Sidebar;
