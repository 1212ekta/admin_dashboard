function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 rounded-3xl bg-white px-3 py-3 text-xs shadow-sm shadow-slate-200 transition-colors duration-300 dark:bg-slate-900 dark:border dark:border-slate-800 dark:shadow-slate-950/40 sm:gap-3 sm:px-4 sm:py-3 sm:text-sm">
      <button
        type="button"
        className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900 sm:px-4 sm:py-2"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="text-xs text-slate-600 dark:text-slate-300 sm:text-sm">
        Page {currentPage} of {totalPages}
      </span>
      <button
        type="button"
        className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900 sm:px-4 sm:py-2"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
