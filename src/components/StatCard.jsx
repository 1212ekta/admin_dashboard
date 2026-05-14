function StatCard({ title, value, details, icon, trend }) {
  return (
    <div className="card p-4 shadow-sm shadow-slate-200/80 transition duration-200 hover:-translate-y-1 hover:shadow-lg dark:shadow-slate-950/40 sm:p-6">
      <div className="flex items-start justify-between gap-3 sm:gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 sm:text-sm">{title}</p>
          <p className="mt-2 truncate text-xl font-semibold text-slate-950 dark:text-white sm:mt-3 sm:text-3xl">{value}</p>
        </div>
        <div className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-3xl bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-200 sm:h-14 sm:w-14">
          {icon}
        </div>
      </div>
      <div className="mt-3 flex flex-col items-start justify-between gap-2 sm:mt-5 sm:flex-row sm:items-center sm:gap-3">
        <p className="text-xs text-slate-500 dark:text-slate-400 sm:text-sm">{details}</p>
        {trend && (
          <span
            className={`inline-flex flex-shrink-0 items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold sm:px-3 sm:py-1 ${
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
