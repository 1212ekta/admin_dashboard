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
    <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 lg:flex lg:items-stretch">
      <Sidebar collapsed={sidebarCollapsed} onToggleCollapse={onToggleSidebar} onLogout={onLogout} />
      <main className="flex-1 pt-4 sm:pt-6 lg:pt-8 px-4 sm:px-6 lg:px-8">
        <div className="pb-8">
          <Header theme={theme} onToggleTheme={toggleTheme} onLogout={onLogout} userName={userName} />

          <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1.7fr_1.3fr] xl:grid-cols-[1.6fr_1.4fr]">
            <div className="card overflow-hidden">
              <div className="flex flex-col gap-4 bg-slate-950 p-5 text-white sm:gap-6 sm:p-8 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400 sm:text-sm">Performance overview</p>
                  <h2 className="mt-2 text-2xl font-semibold sm:mt-4 sm:text-3xl">Sales snapshot</h2>
                  <p className="mt-2 max-w-xl text-xs text-slate-300 sm:mt-3 sm:text-sm">
                    Monitor orders, revenue, and pending tasks from a modern admin experience built for teams.
                  </p>
                </div>
                <div className="flex-shrink-0 rounded-3xl border border-white/10 bg-white/10 p-3 text-center backdrop-blur sm:p-4">
                  <p className="text-xs text-slate-300 sm:text-sm">Live traffic</p>
                  <p className="mt-1 text-xl font-semibold sm:mt-2 sm:text-2xl">72.1%</p>
                </div>
              </div>
              <img src={BannerImage} alt="Dashboard banner" className="w-full max-w-full object-cover" loading="lazy" />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-2">
              {stats.map((stat) => (
                <StatCard key={stat.title} title={stat.title} value={stat.value} details={stat.details} icon={stat.icon} trend={stat.trend} />
              ))}
            </div>
          </div>

          <section className="mt-6 grid gap-4 sm:mt-8 sm:gap-6 xl:grid-cols-[1.4fr_0.6fr]">
            <div className="space-y-4 sm:space-y-6">
              <div className="card p-4 sm:p-6">
                <div className="mb-4 flex flex-col gap-2 sm:mb-6 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-950 dark:text-slate-100 sm:text-xl">Revenue & growth</h3>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 sm:mt-2 sm:text-sm">
                      Revenue and user growth charts help you understand the business momentum.
                    </p>
                  </div>
                </div>
                <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
                  <div className="rounded-[2rem] border border-slate-200/80 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900 sm:p-4">
                    <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100 sm:text-sm">Revenue trend</h4>
                    <div className="mt-3 h-56 sm:mt-4 sm:h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={revenueHistory} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" opacity={0.25} />
                          <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                          <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                          <Tooltip formatter={(value) => formatCurrency(value)} />
                          <Line type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="rounded-[2rem] border border-slate-200/80 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900 sm:p-4">
                    <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100 sm:text-sm">User growth</h4>
                    <div className="mt-3 h-56 sm:mt-4 sm:h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={userGrowth} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" opacity={0.25} />
                          <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                          <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                          <Tooltip />
                          <Bar dataKey="users" fill="#0284c7" radius={[12, 12, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-4 sm:p-6">
                <h4 className="text-lg font-semibold text-slate-950 dark:text-slate-100 sm:text-xl">Orders distribution</h4>
                <div className="mt-4 h-56 sm:mt-5 sm:h-72">
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

            <div className="space-y-4 sm:space-y-6">
              <div className="card p-4 sm:p-6">
                <div className="mb-3 flex items-center justify-between gap-2 sm:mb-4 sm:gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-950 dark:text-slate-100 sm:text-xl">Recent activity</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 sm:text-sm">Latest updates from your team and orders.</p>
                  </div>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {activityTimeline.map((item) => (
                    <div key={item.id} className="rounded-3xl border border-slate-200/80 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900 sm:p-5">
                      <div className="flex items-start justify-between gap-2 sm:gap-4">
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 sm:text-sm">{item.title}</p>
                          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{item.description}</p>
                        </div>
                        <span className="text-xs text-slate-500 dark:text-slate-400">{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-slate-950 dark:text-slate-100 sm:text-xl">Quick summary</h3>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 sm:mt-3 sm:text-sm">A compact view of the most important business metrics.</p>
                <div className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
                  <div className="rounded-3xl bg-slate-50 p-3 dark:bg-slate-900 sm:p-4">
                    <p className="text-xs text-slate-500 dark:text-slate-400 sm:text-sm">Average order value</p>
                    <p className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-100 sm:mt-2 sm:text-2xl">{formatCurrency(dashboardStats.averageOrder)}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-3 dark:bg-slate-900 sm:p-4">
                    <p className="text-xs text-slate-500 dark:text-slate-400 sm:text-sm">New users onboarded</p>
                    <p className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-100 sm:mt-2 sm:text-2xl">{dashboardStats.newUsers}</p>
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
