import React from 'react';
import { MONTHS } from '../../../constants/labels';
import { formatMoney } from '../../../utils/format';

// Grouped bar chart of income vs. expense per month; data: [{ income, expense }] x 12
const MonthlyChart = ({ data }) => {
  const max = Math.max(...data.flatMap((m) => [m.income, m.expense]), 0);
  if (!max) return <p className="py-10 text-center text-sm text-slate-500">لا توجد حركات مالية في هذه السنة.</p>;

  return (
    <div>
      <div className="mb-4 flex items-center gap-4 text-xs text-slate-600">
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-emerald-500" />الإيرادات</span>
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-red-400" />المصروفات والصيانة</span>
      </div>
      <div className="flex h-56 items-end gap-1 sm:gap-2" role="img" aria-label="رسم بياني للإيرادات والمصروفات الشهرية">
        {data.map((month, index) => (
          <div key={MONTHS[index]} className="group relative flex h-full flex-1 flex-col justify-end">
            <div className="flex h-full items-end justify-center gap-0.5">
              <div className="w-1/2 max-w-[18px] rounded-t bg-emerald-500 transition group-hover:bg-emerald-600" style={{ height: `${(month.income / max) * 100}%` }} />
              <div className="w-1/2 max-w-[18px] rounded-t bg-red-400 transition group-hover:bg-red-500" style={{ height: `${(month.expense / max) * 100}%` }} />
            </div>
            <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-2 text-xs text-white shadow-lg group-hover:block">
              <p className="mb-1 font-bold">{MONTHS[index]}</p>
              <p>إيرادات: {formatMoney(month.income)}</p>
              <p>مصروفات: {formatMoney(month.expense)}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-1 border-t border-slate-200 pt-2 sm:gap-2">
        {MONTHS.map((name, index) => (
          <span key={name} className="flex-1 truncate text-center text-[10px] text-slate-500" title={name}>{index + 1}</span>
        ))}
      </div>
    </div>
  );
};

// Maintenance costs count as spending, matching the backend reports.
export const monthlyTotals = (incomes, expenses, maintenances, year) => {
  const months = Array.from({ length: 12 }, () => ({ income: 0, expense: 0 }));
  const add = (rows, dateKey, field, amountKey) =>
    rows.forEach((row) => {
      const date = String(row[dateKey] || '');
      if (date.startsWith(String(year))) {
        const month = Number(date.slice(5, 7)) - 1;
        if (month >= 0 && month < 12) months[month][field] += Number(row[amountKey]) || 0;
      }
    });
  add(incomes, 'dateReceived', 'income', 'amount');
  add(expenses, 'dateSpent', 'expense', 'amount');
  add(maintenances, 'date', 'expense', 'cost');
  return months;
};

export default MonthlyChart;
