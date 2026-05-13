function StatCard({ title, value, details, icon, trend }) {
  return (
    <div className="card p-6 shadow-sm shadow-slate-200/80 transition duration-200 hover:-translate-y-1 hover:shadow-lg dark:shadow-slate-950/40">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">{value}</p>
        </div>
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-200">
          {icon}
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between gap-3">
        <p className="text-sm text-slate-500 dark:text-slate-400">{details}</p>
        {trend && (
          <span
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
              trend.includes('-')
                ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-200'
                : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200'
            }`}
          >
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}

export default StatCard;
