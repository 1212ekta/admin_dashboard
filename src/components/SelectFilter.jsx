function SelectFilter({ label, options, value, onChange }) {
  return (
    <div className="w-full space-y-1 sm:w-auto sm:space-y-2">
      {label && <label className="block text-xs font-medium text-slate-700 dark:text-slate-200 sm:text-sm">{label}</label>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="form-input"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectFilter;
