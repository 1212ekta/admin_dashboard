import { useEffect, useMemo, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import SelectFilter from '../components/SelectFilter';
import Pagination from '../components/Pagination';
import UserModal from '../components/UserModal';
import { downloadCSV, statusStyle, roleStyle, avatarColor } from '../utils/helpers';
import { users as userData, statusOptions } from '../data/dummyData';
import emptyState from '../assets/images/empty_state.png';
import { toast } from 'react-hot-toast';

const ITEMS_PER_PAGE = 6;

function UsersPage({ sidebarCollapsed, onToggleSidebar, onLogout, theme, toggleTheme, userName }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredUsers = useMemo(() => {
    const search = searchTerm.toLowerCase();
    return userData.filter((user) => {
      const matchesSearch = user.name.toLowerCase().includes(search) || user.email.toLowerCase().includes(search);
      const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / ITEMS_PER_PAGE));
  const visibleUsers = filteredUsers.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handlePageChange = (nextPage) => {
    if (nextPage < 1 || nextPage > totalPages) return;
    setPage(nextPage);
  };

  const handleExport = () => {
    downloadCSV(filteredUsers, 'users-export.csv');
    toast.success('Users exported successfully');
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 lg:flex lg:items-stretch">
      <Sidebar collapsed={sidebarCollapsed} onToggleCollapse={onToggleSidebar} onLogout={onLogout} />
      <main className="flex-1 pt-4 sm:pt-6 lg:pt-8 px-4 sm:px-6 lg:px-8">
        <div className="pb-8">
          <Header
            theme={theme}
            onToggleTheme={toggleTheme}
            onSearch={(value) => {
              setSearchTerm(value);
              setPage(1);
            }}
            searchQuery={searchTerm}
            onLogout={onLogout}
            userName={userName}
          />

          <div className="mb-4 grid gap-3 rounded-3xl bg-white p-4 shadow-sm shadow-slate-200 transition-colors duration-300 dark:bg-slate-900 dark:shadow-slate-950/40 sm:mb-6 sm:gap-4 sm:p-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 sm:text-sm">Active users</p>
              <h1 className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100 sm:mt-2 sm:text-2xl">Team members</h1>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-end sm:justify-end">
              <SelectFilter
                label="Status"
                options={statusOptions}
                value={statusFilter}
                onChange={(value) => {
                  setStatusFilter(value);
                  setPage(1);
                }}
              />
              <button
                type="button"
                onClick={handleExport}
                disabled={isLoading}
                className="w-full rounded-3xl bg-sky-600 px-4 py-3 text-xs font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-5 sm:text-sm"
              >
                
                Export CSV
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-3 sm:space-y-4">
              {[...Array(4)].map((item, index) => (
                <div key={index} className="animate-pulse rounded-[2rem] bg-white p-4 shadow-sm shadow-slate-200 dark:bg-slate-900 dark:shadow-slate-950/40 sm:p-6"></div>
              ))}
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="card flex flex-col items-center justify-center gap-4 rounded-[2rem] border border-slate-200 bg-white p-6 text-center dark:border-slate-800 dark:bg-slate-950 sm:gap-5 sm:p-10">
              <img src={emptyState} alt="No results" className="mx-auto max-h-48 w-full max-w-full object-contain sm:max-h-56" />
              <div>
                <p className="text-base font-semibold text-slate-900 dark:text-slate-100 sm:text-lg">No users found</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 sm:mt-2 sm:text-sm">Try changing your search or filters to see more results.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950">
                <div className="overflow-x-auto">
                  <table className="min-w-[720px] w-full table-auto divide-y divide-slate-200 text-left text-xs dark:divide-slate-800 sm:text-sm">
                    <thead className="sticky top-0 z-10 bg-slate-50 text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                      <tr>
                        <th className="px-3 py-3 sm:px-6 sm:py-4">Name</th>
                        <th className="px-3 py-3 sm:px-6 sm:py-4">Email</th>
                        <th className="px-3 py-3 sm:px-6 sm:py-4">Role</th>
                        <th className="px-3 py-3 sm:px-6 sm:py-4">Status</th>
                        <th className="px-3 py-3 sm:px-6 sm:py-4">Orders</th>
                        <th className="px-3 py-3 sm:px-6 sm:py-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-950">
                      {visibleUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-900">
                          <td className="px-3 py-3 sm:px-6 sm:py-5">
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-2xl text-xs font-semibold text-white sm:h-11 sm:w-11 sm:text-base ${avatarColor(user.name)}`}>
                                {user.name.charAt(0)}
                              </div>
                              <div className="min-w-0">
                                <p className="truncate text-xs font-medium text-slate-900 dark:text-slate-100 sm:text-sm">{user.name}</p>
                                <p className="truncate text-xs text-slate-500 dark:text-slate-400">Joined {user.joined}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-3 py-3 text-xs text-slate-600 dark:text-slate-300 sm:px-6 sm:py-5 sm:text-sm">
                            <div className="truncate">{user.email}</div>
                          </td>
                          <td className="px-3 py-3 sm:px-6 sm:py-5">
                            <span className={`badge text-xs ${roleStyle(user.role)}`}>{user.role}</span>
                          </td>
                          <td className="px-3 py-3 sm:px-6 sm:py-5">
                            <span className={`badge text-xs ${statusStyle(user.status)}`}>{user.status}</span>
                          </td>
                          <td className="px-3 py-3 text-xs text-slate-700 dark:text-slate-200 sm:px-6 sm:py-5 sm:text-sm">{user.orders}</td>
                          <td className="px-3 py-3 sm:px-6 sm:py-5">
                            <button
                              type="button"
                              onClick={() => {document.activeElement.blur();
                                setSelectedUser(user);
                                }}
                                                
  

                              className="rounded-2xl bg-sky-600 px-2 py-1 text-xs font-medium text-white transition hover:bg-sky-700 sm:px-4 sm:py-2 sm:text-sm"
                            >
                              Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-4 sm:mt-6">
                <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
              </div>
            </div>
          )}
        </div>
      </main>

      <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </div>
  );
}

export default UsersPage;
