import React from 'react';
import { formatMoney } from '../../utils/format';

// Horizontal bar chart for category totals; items: [{ label, value }]
const BarList = ({ items, tone = 'bg-blue-600', emptyLabel = 'لا توجد بيانات لهذه الفترة.' }) => {
  const visible = items.filter((item) => item.value > 0).sort((a, b) => b.value - a.value);
  const max = Math.max(...visible.map((item) => item.value), 0);
  const total = visible.reduce((sum, item) => sum + item.value, 0);

  if (!visible.length) {
    return <p className="py-8 text-center text-sm text-slate-500">{emptyLabel}</p>;
  }

  return (
    <ul className="space-y-4">
      {visible.map(({ label, value }) => (
        <li key={label}>
          <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
            <span className="font-bold text-slate-700">{label}</span>
            <span className="text-slate-500">
              <span className="font-bold text-slate-900">{formatMoney(value)}</span>
              <span className="mr-2 text-xs">({Math.round((value / total) * 100)}%)</span>
            </span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
            <div className={`h-full rounded-full ${tone}`} style={{ width: `${(value / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BarList;
