const avatarColors = [
  'bg-sky-500',
  'bg-fuchsia-500',
  'bg-emerald-500',
  'bg-orange-500',
  'bg-violet-500',
  'bg-cyan-500',
];

export const getInitials = (name) => {
  if (!name) return 'NA';
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
};

export const avatarColor = (name) => {
  if (!name) return 'bg-slate-400';
  const key = name.trim().charCodeAt(0) + name.length;
  return avatarColors[key % avatarColors.length];
};

export const formatCurrency = (amount) => {
  if (typeof amount === 'string') {
    return amount;
  }

  return `₹${Number(amount).toLocaleString('en-IN')}`;
};

export const downloadCSV = (data, filename = 'users-export.csv') => {
  if (!data || !data.length) return;

  const headers = Object.keys(data[0]);
  const rows = data.map((row) =>
    headers
      .map((key) => {
        const cell = row[key] ?? '';
        const value = typeof cell === 'string' ? cell.replace(/"/g, '""') : String(cell);
        return `"${value}"`;
      })
      .join(',')
  );

  const csvContent = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
};

export const statusStyle = (status) => {
  switch (status) {
    case 'Active':
      return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200';
    case 'Pending':
      return 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200';
    case 'Blocked':
      return 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-200';
    case 'Offline':
      return 'bg-slate-100 text-slate-600 dark:bg-slate-800/60 dark:text-slate-300';
    default:
      return 'bg-slate-100 text-slate-700 dark:bg-slate-800/60 dark:text-slate-300';
  }
};

export const roleStyle = (role) => {
  switch (role) {
    case 'Admin':
      return 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-200';
    case 'Manager':
      return 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-200';
    case 'Sales':
      return 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-200';
    case 'Support':
      return 'bg-lime-100 text-lime-700 dark:bg-lime-900/40 dark:text-lime-200';
    case 'Designer':
      return 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/40 dark:text-fuchsia-200';
    default:
      return 'bg-slate-100 text-slate-700 dark:bg-slate-800/60 dark:text-slate-300';
  }
};
