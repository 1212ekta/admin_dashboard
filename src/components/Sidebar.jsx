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
  X,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Users', path: '/users', icon: Users },
];

function Sidebar({ collapsed, onToggleCollapse, onLogout }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setDrawerOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <button
        type="button"
        className="fixed left-4 top-4 z-40 inline-flex h-10 w-10 items-center justify-center rounded-3xl border border-slate-200 bg-white text-slate-900 shadow-lg shadow-slate-200/60 transition hover:bg-slate-100 lg:hidden"
        onClick={() => setDrawerOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu size={18} />
      </button>

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col overflow-hidden border-r border-slate-800/80 bg-slate-950 text-slate-100 shadow-2xl shadow-slate-950/40 transition-transform duration-300 ease-in-out ${
          collapsed ? 'w-20' : 'w-72'
        } ${drawerOpen ? 'translate-x-0' : '-translate-x-full'} lg:static lg:translate-x-0 lg:h-screen lg:flex-shrink-0 lg:shadow-none`}
        style={{ maxWidth: '90vw' }}
      >
        <div className="relative flex items-center justify-between gap-2 border-b border-slate-900/80 px-4 py-5 sm:px-5 sm:py-6">
          <div className={`flex items-center gap-2 ${collapsed ? 'justify-center' : 'gap-3'}`}>
            <div className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-3xl bg-sky-500 text-white sm:h-11 sm:w-11">
              <BarChart3 size={18} className="sm:size-[22px]" />
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="truncate text-xs text-slate-400 sm:text-sm">Admin Console</p>
                <h1 className="truncate text-lg font-semibold sm:text-xl">SaaS Desk</h1>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 text-slate-300 transition hover:bg-slate-800 lg:hidden"
              onClick={() => setDrawerOpen(false)}
              title="Close sidebar"
              aria-label="Close sidebar"
            >
              <X size={18} />
            </button>

            <button
              type="button"
              className="hidden h-9 w-9 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 text-slate-300 transition hover:bg-slate-800 lg:inline-flex"
              onClick={onToggleCollapse}
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          </div>
        </div>

        <nav className="mt-6 flex-1 space-y-1 px-2 sm:mt-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 rounded-3xl px-4 py-2 text-xs transition-all duration-200 sm:gap-4 sm:py-3 sm:text-sm ${
                  isActive
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                } ${collapsed ? 'justify-center' : ''}`}
                onClick={() => setDrawerOpen(false)}
                title={item.label}
              >
                <Icon size={16} className="flex-shrink-0" />
                <span className={`${collapsed ? 'hidden' : 'block'}`}>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-800/60 px-3 py-4 sm:px-3 sm:py-6">
          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center justify-center gap-2 rounded-3xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-slate-300 transition hover:bg-slate-800 sm:gap-3 sm:px-4 sm:py-3 sm:text-sm"
          >
            <LogOut size={16} className="flex-shrink-0" />
            {!collapsed && 'Sign out'}
          </button>
        </div>
      </aside>

      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 transition-opacity duration-300 ease-in-out lg:hidden"
          onClick={() => setDrawerOpen(false)}
          role="presentation"
        />
      )}
    </>
  );
}

export default Sidebar;
