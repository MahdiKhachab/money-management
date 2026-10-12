import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiDollarSign, FiPrinter, FiShoppingBag, FiTool, FiTrendingUp } from 'react-icons/fi';
import { fetchExpenses } from '../../../api/expenseService';
import { fetchIncomes } from '../../../api/incomeService';
import { fetchMaintenances } from '../../../api/maintenanceService';
import { getAnnualReport, getExpenseByCategory, getIncomeBySource, getMonthlyReport } from '../../../api/reportService';
import { BarList, Button, Card, CardHeader, ErrorState, LoadingState, PageHeader, StatCard } from '../../../components/ui';
import { ORG_NAME } from '../../../config/env';
import { EXPENSE_CATEGORIES, INCOME_SOURCES, MAINTENANCE_TYPES, MONTHS } from '../../../constants/labels';
import useAsync from '../../../hooks/useAsync';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import { formatDate, formatMoney, sumBy } from '../../../utils/format';
import { monthlyTotals } from '../components/MonthlyChart';

const NOW = new Date();
const YEARS = Array.from({ length: 6 }, (_, i) => NOW.getFullYear() - i);
const selectClass = 'h-11 rounded-xl border border-slate-300 bg-white px-3 text-sm font-bold focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100';

const ReportsPage = () => {
  useDocumentTitle('التقارير');
  const [params, setParams] = useSearchParams();
  const tab = params.get('type') === 'annual' ? 'annual' : 'monthly';
  const year = Number(params.get('year')) || NOW.getFullYear();
  const month = Number(params.get('month')) || NOW.getMonth() + 1;

  const update = (changes) => setParams({ type: tab, year, month, ...changes }, { replace: true });

  return (
    <>
      <PageHeader
        title="التقارير المالية"
        subtitle="كشوفات شهرية وسنوية قابلة للطباعة."
        actions={<Button variant="secondary" icon={FiPrinter} onClick={() => window.print()}>طباعة</Button>}
      />

      <div className="mb-6 flex flex-wrap items-center gap-3 print:hidden">
        <div className="flex rounded-xl bg-white p-1 shadow-sm ring-1 ring-slate-200" role="tablist">
          {[['monthly', 'تقرير شهري'], ['annual', 'تقرير سنوي']].map(([key, label]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={tab === key}
              onClick={() => update({ type: key })}
              className={`rounded-lg px-4 py-2 text-sm font-bold transition ${tab === key ? 'bg-blue-700 text-white' : 'text-slate-600 hover:text-slate-900'}`}
            >
              {label}
            </button>
          ))}
        </div>
        <select value={year} onChange={(e) => update({ year: e.target.value })} className={selectClass} aria-label="السنة">
          {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
        </select>
        {tab === 'monthly' && (
          <select value={month} onChange={(e) => update({ month: e.target.value })} className={selectClass} aria-label="الشهر">
            {MONTHS.map((name, i) => <option key={name} value={i + 1}>{name}</option>)}
          </select>
        )}
      </div>

      {/* Printed header */}
      <div className="mb-6 hidden text-center print:block">
        <p className="text-xl font-black">{ORG_NAME}</p>
        <p className="text-sm">
          {tab === 'monthly' ? `التقرير المالي لشهر ${MONTHS[month - 1]} ${year}` : `التقرير المالي السنوي ${year}`} — صدر بتاريخ {formatDate(NOW.toISOString())}
        </p>
      </div>

      {tab === 'monthly' ? <MonthlyReport year={year} month={month} /> : <AnnualReport year={year} />}
    </>
  );
};

const inMonth = (rows, key, year, month) => rows.filter((r) => String(r[key] || '').startsWith(`${year}-${String(month).padStart(2, '0')}`));

const MonthlyReport = ({ year, month }) => {
  const { data, loading, error, reload } = useAsync(async () => {
    const [summary, incomes, expenses, maintenances] = await Promise.all([getMonthlyReport(year, month), fetchIncomes(), fetchExpenses(), fetchMaintenances()]);
    return {
      summary,
      incomes: inMonth(incomes, 'dateReceived', year, month),
      expenses: inMonth(expenses, 'dateSpent', year, month),
      maintenances: inMonth(maintenances, 'date', year, month),
    };
  }, [year, month]);

  if (loading) return <LoadingState />;
  if (error) return <Card><ErrorState message={error} onRetry={reload} /></Card>;
  const { summary, incomes, expenses, maintenances } = data;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="إجمالي الإيرادات" value={formatMoney(summary.totalIncome)} icon={FiDollarSign} tone="green" />
        <StatCard label="المصروفات والصيانة" value={formatMoney(summary.totalExpenses)} icon={FiShoppingBag} tone="red" />
        <StatCard label="الرصيد الصافي" value={formatMoney(summary.netBalance)} icon={FiTrendingUp} tone={summary.netBalance >= 0 ? 'blue' : 'red'} />
      </div>

      <Ledger
        title="الإيرادات"
        rows={incomes}
        dateKey="dateReceived"
        amountKey="amount"
        tone="text-emerald-700"
        describe={(r) => [INCOME_SOURCES[r.sourceType], r.donorName, r.description].filter(Boolean).join(' — ')}
      />
      <Ledger title="المصروفات" rows={expenses} dateKey="dateSpent" amountKey="amount" tone="text-red-700"
        describe={(r) => [EXPENSE_CATEGORIES[r.category], r.details].filter(Boolean).join(' — ')} />
      <Ledger title="الصيانة" rows={maintenances} dateKey="date" amountKey="cost" tone="text-amber-700"
        describe={(r) => [r.itemName, MAINTENANCE_TYPES[r.maintenanceType], r.remarks].filter(Boolean).join(' — ')} />
    </div>
  );
};

const Ledger = ({ title, rows, dateKey, amountKey, tone, describe }) => {
  const sorted = [...rows].sort((a, b) => String(a[dateKey]).localeCompare(String(b[dateKey])));
  return (
    <Card className="overflow-hidden break-inside-avoid">
      <CardHeader title={title} subtitle={`${rows.length} حركة`} />
      {sorted.length ? (
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-slate-50 text-xs font-bold text-slate-500">
              <tr><th className="px-4 py-2.5">التاريخ</th><th className="px-4 py-2.5">البيان</th><th className="px-4 py-2.5">المبلغ</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sorted.map((r) => (
                <tr key={r.id}>
                  <td className="whitespace-nowrap px-4 py-2.5 text-slate-600">{formatDate(r[dateKey])}</td>
                  <td className="px-4 py-2.5 text-slate-700">{describe(r) || '—'}</td>
                  <td className={`whitespace-nowrap px-4 py-2.5 font-bold ${tone}`}>{formatMoney(r[amountKey])}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t-2 border-slate-200 bg-slate-50 font-bold">
              <tr><td className="px-4 py-2.5" colSpan={2}>المجموع</td><td className={`px-4 py-2.5 ${tone}`}>{formatMoney(sumBy(rows, amountKey))}</td></tr>
            </tfoot>
          </table>
        </div>
      ) : (
        <p className="px-5 py-8 text-center text-sm text-slate-500">لا توجد حركات في هذا الشهر.</p>
      )}
    </Card>
  );
};

const AnnualReport = ({ year }) => {
  const { data, loading, error, reload } = useAsync(async () => {
    const [annual, bySource, byCategory, incomes, expenses, maintenances] = await Promise.all([
      getAnnualReport(year), getIncomeBySource(year), getExpenseByCategory(year), fetchIncomes(), fetchExpenses(), fetchMaintenances(),
    ]);
    return { annual, bySource, byCategory, months: monthlyTotals(incomes, expenses, maintenances, year) };
  }, [year]);

  if (loading) return <LoadingState />;
  if (error) return <Card><ErrorState message={error} onRetry={reload} /></Card>;
  const { annual, bySource, byCategory, months } = data;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="إجمالي الإيرادات" value={formatMoney(annual.totalIncome)} icon={FiDollarSign} tone="green" />
        <StatCard label="المصروفات" value={formatMoney(annual.totalExpense)} icon={FiShoppingBag} tone="red" />
        <StatCard label="الصيانة" value={formatMoney(annual.totalMaintenance)} icon={FiTool} tone="amber" />
        <StatCard label="الرصيد الصافي" value={formatMoney(annual.netBalance)} icon={FiTrendingUp} tone={annual.netBalance >= 0 ? 'blue' : 'red'} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="break-inside-avoid">
          <CardHeader title="الإيرادات حسب المصدر" />
          <div className="p-5"><BarList tone="bg-emerald-500" items={bySource.map((s) => ({ label: INCOME_SOURCES[s.sourceType] || s.sourceType, value: s.totalAmount }))} /></div>
        </Card>
        <Card className="break-inside-avoid">
          <CardHeader title="المصروفات حسب الفئة" />
          <div className="p-5"><BarList tone="bg-red-400" items={byCategory.map((c) => ({ label: EXPENSE_CATEGORIES[c.category] || c.category, value: c.totalAmount }))} /></div>
        </Card>
      </div>

      <Card className="overflow-hidden break-inside-avoid">
        <CardHeader title="الملخص الشهري" subtitle="المصروفات تشمل تكاليف الصيانة" />
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-slate-50 text-xs font-bold text-slate-500">
              <tr><th className="px-4 py-2.5">الشهر</th><th className="px-4 py-2.5">الإيرادات</th><th className="px-4 py-2.5">المصروفات</th><th className="px-4 py-2.5">الصافي</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {months.map((m, i) => {
                const net = m.income - m.expense;
                return (
                  <tr key={MONTHS[i]}>
                    <td className="px-4 py-2.5 font-bold text-slate-700">{MONTHS[i]}</td>
                    <td className="px-4 py-2.5 text-emerald-700">{formatMoney(m.income)}</td>
                    <td className="px-4 py-2.5 text-red-700">{formatMoney(m.expense)}</td>
                    <td className={`px-4 py-2.5 font-bold ${net >= 0 ? 'text-slate-900' : 'text-red-700'}`}>{formatMoney(net)}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="border-t-2 border-slate-200 bg-slate-50 font-bold">
              <tr>
                <td className="px-4 py-2.5">المجموع</td>
                <td className="px-4 py-2.5 text-emerald-700">{formatMoney(sumBy(months, 'income'))}</td>
                <td className="px-4 py-2.5 text-red-700">{formatMoney(sumBy(months, 'expense'))}</td>
                <td className="px-4 py-2.5">{formatMoney(sumBy(months, 'income') - sumBy(months, 'expense'))}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default ReportsPage;
