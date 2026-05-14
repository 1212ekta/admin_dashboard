import { X } from 'lucide-react';
import { avatarColor, formatCurrency, roleStyle, statusStyle } from '../utils/helpers';

function UserModal({ user, onClose }) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/60 p-3 sm:p-4" onClick={onClose}>
      <div
        className="w-full max-w-[95vw] max-h-[90vh] overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-slate-900/20 dark:bg-slate-950 sm:max-w-3xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 border-b border-slate-200 px-4 py-4 dark:border-slate-800 sm:px-6 sm:py-5">
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 sm:text-xl">User details</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 sm:text-sm">Review profile information and activity summary.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex-shrink-0 rounded-2xl p-1.5 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900 sm:p-2"
            aria-label="Close user details"
          >
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 4rem)' }}>
          <div className="grid gap-4 px-4 py-4 sm:gap-6 sm:px-6 sm:py-6 md:grid-cols-[160px_auto]">
            <div className="flex flex-col items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-center dark:border-slate-800 dark:bg-slate-900 sm:gap-4 sm:p-6">
              <div className={`flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold text-white sm:h-24 sm:w-24 sm:text-3xl ${avatarColor(user.name)}`}>
                {user.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-base font-semibold text-slate-900 dark:text-slate-100 sm:text-lg">{user.name}</p>
                <p className="truncate text-xs text-slate-500 dark:text-slate-400 sm:text-sm">{user.role}</p>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900 sm:p-5">
                <p className="text-xs text-slate-500 dark:text-slate-400 sm:text-sm">Email</p>
                <p className="mt-1 truncate text-xs text-slate-900 dark:text-slate-100 sm:mt-2 sm:text-sm">{user.email}</p>
              </div>
              <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900 sm:p-5">
                  <p className="text-xs text-slate-500 dark:text-slate-400 sm:text-sm">Status</p>
                  <span className={`mt-1 inline-flex badge text-xs sm:mt-2 sm:text-xs ${statusStyle(user.status)}`}>{user.status}</span>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900 sm:p-5">
                  <p className="text-xs text-slate-500 dark:text-slate-400 sm:text-sm">Role</p>
                  <span className={`mt-1 inline-flex badge text-xs sm:mt-2 sm:text-xs ${roleStyle(user.role)}`}>{user.role}</span>
                </div>
              </div>
              <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900 sm:p-5">
                  <p className="text-xs text-slate-500 dark:text-slate-400 sm:text-sm">Joined</p>
                  <p className="mt-1 text-xs text-slate-900 dark:text-slate-100 sm:mt-2 sm:text-sm">{user.joined}</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900 sm:p-5">
                  <p className="text-xs text-slate-500 dark:text-slate-400 sm:text-sm">Orders</p>
                  <p className="mt-1 text-xs text-slate-900 dark:text-slate-100 sm:mt-2 sm:text-sm">{user.orders}</p>
                </div>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900 sm:p-5">
                <p className="text-xs text-slate-500 dark:text-slate-400 sm:text-sm">Estimated revenue</p>
                <p className="mt-1 text-xs text-slate-900 dark:text-slate-100 sm:mt-2 sm:text-sm">{formatCurrency(user.revenue)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserModal;
