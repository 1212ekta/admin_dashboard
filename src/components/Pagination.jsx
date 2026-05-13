function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-white px-4 py-3 text-sm shadow-sm shadow-slate-200 transition-colors duration-300 dark:bg-slate-900 dark:border dark:border-slate-800 dark:shadow-slate-950/40">
      <button
        type="button"
        className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="text-slate-600 dark:text-slate-300">
        Page {currentPage} of {totalPages}
      </span>
      <button
        type="button"
        className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
