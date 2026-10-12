import React, { useId } from 'react';

const inputClasses = (error) =>
  `block w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 ${
    error ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
  }`;

const FieldShell = ({ id, label, required, hint, error, className = '', children }) => (
  <div className={className}>
    {label && (
      <label htmlFor={id} className="mb-1.5 block text-sm font-bold text-slate-700">
        {label}
        {required && <span className="mr-1 text-red-500">*</span>}
      </label>
    )}
    {children}
    {error ? (
      <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-red-600">{error}</p>
    ) : (
      hint && <p className="mt-1.5 text-xs text-slate-500">{hint}</p>
    )}
  </div>
);

export const TextField = ({ label, hint, error, className, ...props }) => {
  const id = useId();
  return (
    <FieldShell id={id} label={label} required={props.required} hint={hint} error={error} className={className}>
      <input id={id} className={inputClasses(error)} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} {...props} />
    </FieldShell>
  );
};

export const TextAreaField = ({ label, hint, error, className, rows = 4, ...props }) => {
  const id = useId();
  return (
    <FieldShell id={id} label={label} required={props.required} hint={hint} error={error} className={className}>
      <textarea id={id} rows={rows} className={`${inputClasses(error)} resize-y`} aria-invalid={Boolean(error)} {...props} />
    </FieldShell>
  );
};

export const SelectField = ({ label, hint, error, className, options, placeholder, ...props }) => {
  const id = useId();
  return (
    <FieldShell id={id} label={label} required={props.required} hint={hint} error={error} className={className}>
      <select id={id} className={inputClasses(error)} aria-invalid={Boolean(error)} {...props}>
        {placeholder !== undefined && <option value="">{placeholder}</option>}
        {options.map(({ value, label: optionLabel }) => (
          <option key={value} value={value}>{optionLabel}</option>
        ))}
      </select>
    </FieldShell>
  );
};
