import { X } from 'lucide-react';
import { avatarColor, formatCurrency, roleStyle, statusStyle } from '../utils/helpers';

function UserModal({ user, onClose }) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4" onClick={onClose}>
      <div
        className="w-full max-w-2xl rounded-[2rem] bg-white shadow-2xl shadow-slate-900/20 dark:bg-slate-950"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-800">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">User details</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Review profile information and activity summary.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl p-2 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
            aria-label="Close user details"
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid gap-6 px-6 py-6 sm:grid-cols-[220px_auto]">
          <div className="flex flex-col items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center dark:border-slate-800 dark:bg-slate-900">
            <div className={`flex h-24 w-24 items-center justify-center rounded-full text-3xl font-bold text-white ${avatarColor(user.name)}`}>
              {user.name.charAt(0)}
            </div>
            <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{user.name}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{user.role}</p>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">Email</p>
              <p className="mt-2 text-slate-900 dark:text-slate-100">{user.email}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
                <p className="text-sm text-slate-500 dark:text-slate-400">Status</p>
                <span className={`mt-2 inline-flex badge ${statusStyle(user.status)}`}>{user.status}</span>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
                <p className="text-sm text-slate-500 dark:text-slate-400">Role</p>
                <span className={`mt-2 inline-flex badge ${roleStyle(user.role)}`}>{user.role}</span>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
                <p className="text-sm text-slate-500 dark:text-slate-400">Joined</p>
                <p className="mt-2 text-slate-900 dark:text-slate-100">{user.joined}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
                <p className="text-sm text-slate-500 dark:text-slate-400">Orders</p>
                <p className="mt-2 text-slate-900 dark:text-slate-100">{user.orders}</p>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">Estimated revenue</p>
              <p className="mt-2 text-slate-900 dark:text-slate-100">{formatCurrency(user.revenue)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserModal;
