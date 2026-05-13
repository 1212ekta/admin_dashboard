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
    <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <Sidebar collapsed={sidebarCollapsed} onToggleCollapse={onToggleSidebar} onLogout={onLogout} />
      <main className={`desktop-padding pt-6 lg:pt-8 ${sidebarCollapsed ? 'lg:pl-24' : 'lg:pl-72'}`}>
        <div className="px-4 pb-10 lg:px-10">
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

          <div className="mb-6 grid gap-4 rounded-3xl bg-white p-6 shadow-sm shadow-slate-200 transition-colors duration-300 dark:bg-slate-900 dark:shadow-slate-950/40 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Active users</p>
              <h1 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">Team members</h1>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
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
                className="rounded-3xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Export CSV
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[...Array(4)].map((item, index) => (
                <div key={index} className="animate-pulse rounded-[2rem] bg-white p-6 shadow-sm shadow-slate-200 dark:bg-slate-900 dark:shadow-slate-950/40"></div>
              ))}
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="card flex flex-col items-center justify-center gap-5 rounded-[2rem] border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-950">
              <img src={emptyState} alt="No results" className="mx-auto max-h-56" />
              <div>
                <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">No users found</p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Try changing your search or filters to see more results.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950">
                <div className="table-scroll">
                  <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
                    <thead className="sticky top-0 bg-slate-50 text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                      <tr>
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Email</th>
                        <th className="px-6 py-4">Role</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Orders</th>
                        <th className="px-6 py-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-950">
                      {visibleUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-900">
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div className={`flex h-11 w-11 items-center justify-center rounded-2xl text-white ${avatarColor(user.name)}`}>
                                {user.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-medium text-slate-900 dark:text-slate-100">{user.name}</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Joined {user.joined}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5 text-slate-600 dark:text-slate-300">{user.email}</td>
                          <td className="px-6 py-5">
                            <span className={`badge ${roleStyle(user.role)}`}>{user.role}</span>
                          </td>
                          <td className="px-6 py-5">
                            <span className={`badge ${statusStyle(user.status)}`}>{user.status}</span>
                          </td>
                          <td className="px-6 py-5 text-slate-700 dark:text-slate-200">{user.orders}</td>
                          <td className="px-6 py-5">
                            <button
                              type="button"
                              onClick={() => setSelectedUser(user)}
                              className="rounded-2xl bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-700"
                            >
                              View details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          )}
        </div>
      </main>

      <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </div>
  );
}

export default UsersPage;
