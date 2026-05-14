import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LoginPage from './pages/LoginPage';
import DashboardHome from './pages/DashboardHome';
import UsersPage from './pages/UsersPage';

function App() {
  const [theme, setTheme] = useState('light');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    () => JSON.parse(localStorage.getItem('admindash-sidebar-collapsed')) || false
  );
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('admindash-user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('admindash-theme');
    const initialTheme =
      savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  useEffect(() => {
    localStorage.setItem('admindash-sidebar-collapsed', JSON.stringify(sidebarCollapsed));
  }, [sidebarCollapsed]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('admindash-theme', nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  };

  const handleLogin = (userProfile) => {
    setUser(userProfile);
    localStorage.setItem('admindash-user', JSON.stringify(userProfile));
  };

  const handleLogout = () => {
    localStorage.removeItem('admindash-user');
    setUser(null);
  };

  const isAuthenticated = Boolean(user);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <DashboardHome
                  theme={theme}
                  toggleTheme={toggleTheme}
                  sidebarCollapsed={sidebarCollapsed}
                  onToggleSidebar={() => setSidebarCollapsed((prev) => !prev)}
                  onLogout={handleLogout}
                  userName={user?.name || 'Admin'}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/users"
            element={
              isAuthenticated ? (
                <UsersPage
                  theme={theme}
                  toggleTheme={toggleTheme}
                  sidebarCollapsed={sidebarCollapsed}
                  onToggleSidebar={() => setSidebarCollapsed((prev) => !prev)}
                  onLogout={handleLogout}
                  userName={user?.name || 'Admin'}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
