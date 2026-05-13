import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts';
import BannerImage from '../assets/images/dashboard_banner.png';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import StatCard from '../components/StatCard';
import { BarChart3, ShoppingCart, Wallet, Clock3 } from 'lucide-react';
import { dashboardStats, revenueHistory, userGrowth, orderDistribution, activityTimeline } from '../data/dummyData';
import { formatCurrency } from '../utils/helpers';

const pieColors = ['#38bdf8', '#60a5fa', '#818cf8', '#a855f7'];

function DashboardHome({ theme, toggleTheme, sidebarCollapsed, onToggleSidebar, onLogout, userName }) {
  const stats = [
    {
      title: 'Total Users',
      value: dashboardStats.totalUsers,
      details: 'Users active this month',
      icon: <BarChart3 size={24} />,
      trend: '+8.4%',
    },
    {
      title: 'Total Orders',
      value: dashboardStats.totalOrders,
      details: 'Placed this week',
      icon: <ShoppingCart size={24} />,
      trend: '+6.1%',
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(dashboardStats.totalRevenue),
      details: 'Revenue generated',
      icon: <Wallet size={24} />,
      trend: '+9.7%',
    },
    {
      title: 'Pending Tasks',
      value: dashboardStats.pendingTasks,
      details: 'Tasks to complete',
      icon: <Clock3 size={24} />,
      trend: '-2.5%',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <Sidebar collapsed={sidebarCollapsed} onToggleCollapse={onToggleSidebar} onLogout={onLogout} />
      <main className={`desktop-padding pt-6 lg:pt-8 ${sidebarCollapsed ? 'lg:pl-24' : 'lg:pl-72'}`}>
        <div className="px-4 pb-10 lg:px-10">
          <Header theme={theme} onToggleTheme={toggleTheme} onLogout={onLogout} userName={userName} />

          <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
            <div className="card overflow-hidden">
              <div className="flex flex-col gap-6 bg-slate-950 p-8 text-white sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Performance overview</p>
                  <h2 className="mt-4 text-3xl font-semibold">Sales snapshot</h2>
                  <p className="mt-3 max-w-xl text-slate-300">
                    Monitor orders, revenue, and pending tasks from a modern admin experience built for teams.
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/10 p-4 text-center backdrop-blur">
                  <p className="text-sm text-slate-300">Live traffic</p>
                  <p className="mt-2 text-2xl font-semibold">72.1%</p>
                </div>
              </div>
              <img src={BannerImage} alt="Dashboard banner" className="w-full object-cover" loading="lazy" />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-1">
              {stats.map((stat) => (
                <StatCard key={stat.title} title={stat.title} value={stat.value} details={stat.details} icon={stat.icon} trend={stat.trend} />
              ))}
            </div>
          </div>

          <section className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
            <div className="space-y-6">
              <div className="card p-6">
                <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-950 dark:text-slate-100">Revenue & growth</h3>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                      Revenue and user growth charts help you understand the business momentum.
                    </p>
                  </div>
                </div>
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="rounded-[2rem] border border-slate-200/80 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Revenue trend</h4>
                    <div className="mt-4 h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={revenueHistory} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" opacity={0.25} />
                          <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#64748b' }} />
                          <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748b' }} />
                          <Tooltip formatter={(value) => formatCurrency(value)} />
                          <Line type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="rounded-[2rem] border border-slate-200/80 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">User growth</h4>
                    <div className="mt-4 h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={userGrowth} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" opacity={0.25} />
                          <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#64748b' }} />
                          <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748b' }} />
                          <Tooltip />
                          <Bar dataKey="users" fill="#0284c7" radius={[12, 12, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <h4 className="text-xl font-semibold text-slate-950 dark:text-slate-100">Orders distribution</h4>
                <div className="mt-5 h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Legend verticalAlign="bottom" height={36} />
                      <Pie data={orderDistribution} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={4} stroke="transparent">
                        {orderDistribution.map((entry, index) => (
                          <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card p-6">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-950 dark:text-slate-100">Recent activity</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Latest updates from your team and orders.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {activityTimeline.map((item) => (
                    <div key={item.id} className="rounded-3xl border border-slate-200/80 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{item.title}</p>
                          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{item.description}</p>
                        </div>
                        <span className="text-xs text-slate-500 dark:text-slate-400">{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-semibold text-slate-950 dark:text-slate-100">Quick summary</h3>
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">A compact view of the most important business metrics.</p>
                <div className="mt-6 space-y-4">
                  <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Average order value</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">{formatCurrency(dashboardStats.averageOrder)}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                    <p className="text-sm text-slate-500 dark:text-slate-400">New users onboarded</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">{dashboardStats.newUsers}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default DashboardHome;
