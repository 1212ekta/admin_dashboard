import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  Search,
  Moon,
  SunMedium,
  ChevronDown,
  LogOut,
  Settings,
} from 'lucide-react';

function Header({
  theme,
  onToggleTheme,
  searchQuery = '',
  onSearch,
  onLogout,
  userName = 'Admin',
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setMenuOpen(false);
    onLogout?.();
    navigate('/');
  };

  return (
    <div className="mb-6 rounded-3xl bg-white px-4 py-4 shadow-sm shadow-slate-200 dark:bg-slate-900 dark:shadow-slate-950/40 sm:px-5 sm:py-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        {/* Left Section */}
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-medium text-slate-800 dark:text-white sm:text-xl">
            Welcome back
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end lg:flex-1">

          {/* Search */}
          <div className="flex w-full items-center gap-2 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 shadow-sm shadow-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 sm:max-w-md">
            <Search
              size={16}
              className="flex-shrink-0 text-slate-400"
            />

            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearch?.(e.target.value)}
              placeholder="Search users, orders, activity"
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2">

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={onToggleTheme}
              className="inline-flex h-11 w-11 items-center justify-center rounded-3xl border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <SunMedium size={16} />
              ) : (
                <Moon size={16} />
              )}
            </button>

            {/* Notification */}
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-3xl border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
              aria-label="Notifications"
            >
              <Bell size={16} />
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                className="inline-flex h-11 items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-3 text-slate-800 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-3xl bg-slate-900 text-sm font-semibold text-white dark:bg-slate-100 dark:text-slate-900">
                  {userName.charAt(0)}
                </span>

                <span className="max-w-[120px] truncate text-sm font-medium">
                  {userName}
                </span>

                <ChevronDown
                  size={14}
                  className="text-slate-500"
                />
              </button>

              {menuOpen && (
                <div className="absolute right-0 z-20 mt-3 w-52 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-950/10 dark:border-slate-800 dark:bg-slate-900">

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    <LogOut
                      size={14}
                      className="flex-shrink-0"
                    />
                    Sign out
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      navigate('/dashboard');
                    }}
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    <Settings
                      size={14}
                      className="flex-shrink-0"
                    />
                    Settings
                  </button>

                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;