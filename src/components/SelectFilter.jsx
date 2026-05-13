function SelectFilter({ label, options, value, onChange }) {
  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</label>}
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
