import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import loginIllustration from '../assets/images/login_illustration.png';
import { authAccount } from '../data/dummyData';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem('admindash-remember-email');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }

    if (localStorage.getItem('admindash-user')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.includes('@') || password.length < 6) {
      setError('Please enter a valid email and password with at least 6 characters.');
      return;
    }

    setLoading(true);
    setError('');

    setTimeout(() => {
      if (email !== authAccount.email || password !== authAccount.password) {
        setError('Invalid credentials. Use the demo email and password.');
        toast.error('Login failed. Check your email or password.');
        setLoading(false);
        return;
      }

      const userProfile = { email: authAccount.email, name: 'Rahul Jain' };
      localStorage.setItem('admindash-user', JSON.stringify(userProfile));
      if (rememberMe) {
        localStorage.setItem('admindash-remember-email', email);
      } else {
        localStorage.removeItem('admindash-remember-email');
      }

      onLogin(userProfile);
      toast.success('Welcome back, Rahul');
      navigate('/dashboard');
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10 dark:bg-slate-950">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
        <div className="rounded-[2rem] bg-white p-8 shadow-lg shadow-slate-200/60 dark:bg-slate-900 dark:shadow-slate-950/40 lg:p-12">
          <div className="mb-6">
            <span className="inline-flex rounded-full bg-sky-100 px-4 py-2 text-sm font-medium text-sky-700 dark:bg-sky-900/30 dark:text-sky-200">
              Welcome back
            </span>
            <h1 className="mt-6 text-4xl font-semibold text-slate-950 dark:text-white sm:text-5xl">
              Sign in to your admin workspace.
            </h1>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              Use the dashboard to manage users, sales, and performance with a polished responsive interface.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="admin@visionhub.in"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="Password123"
              />
            </div>
            <div className="flex items-center justify-between gap-4 text-sm text-slate-600 dark:text-slate-300">
              <label className="inline-flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                />
                Remember me
              </label>
              <span>Secure sign in</span>
            </div>
            {error && <p className="text-sm text-rose-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-3xl bg-sky-600 px-5 py-3 text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="mt-8 rounded-3xl bg-slate-50 p-5 text-sm text-slate-600 dark:bg-slate-950 dark:text-slate-300">
            <p className="font-semibold">Demo credentials</p>
            <p className="mt-2">Email: admin@visionhub.in</p>
            <p>Password: Password123</p>
          </div>
        </div>

      
          <div className="flex flex-col justify-start rounded-[2rem] bg-slate-950 p-8 text-white shadow-xl shadow-slate-950/40 lg:p-10">
          <div className="mb-8 max-w-md">
            <h2 className="text-3xl font-semibold">Control your workspace seamlessly</h2>
          </div>
          <img
            src={loginIllustration}
            alt="Login illustration"
            className="rounded-[1.75rem] border border-white/10 shadow-2xl shadow-slate-950/60"
          />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
