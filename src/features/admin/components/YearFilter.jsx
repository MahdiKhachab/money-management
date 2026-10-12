import React from 'react';

// Builds the list of years present in the rows (newest first).
export const yearsOf = (rows, dateKey) =>
  [...new Set((rows || []).map((row) => String(row[dateKey] || '').slice(0, 4)).filter(Boolean))].sort().reverse();

export const filterByYear = (rows, dateKey, year) =>
  year ? (rows || []).filter((row) => String(row[dateKey] || '').startsWith(year)) : rows || [];

const YearFilter = ({ years, value, onChange }) => (
  <select
    value={value}
    onChange={(event) => onChange(event.target.value)}
    aria-label="تصفية حسب السنة"
    className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
  >
    <option value="">كل السنوات</option>
    {years.map((year) => (
      <option key={year} value={year}>{year}</option>
    ))}
  </select>
);

export default YearFilter;
