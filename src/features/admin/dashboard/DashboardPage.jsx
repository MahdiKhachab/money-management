import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiDollarSign, FiPlus, FiShoppingBag, FiTool, FiTrendingUp } from 'react-icons/fi';
import { fetchDonors } from '../../../api/donorService';
import { fetchExpenses } from '../../../api/expenseService';
import { fetchIncomes } from '../../../api/incomeService';
import { fetchMaintenances } from '../../../api/maintenanceService';
import { getAnnualReport, getExpenseByCategory, getIncomeBySource } from '../../../api/reportService';
import { BarList, Button, Card, CardHeader, ErrorState, LoadingState, PageHeader, StatCard } from '../../../components/ui';
import { EXPENSE_CATEGORIES, INCOME_SOURCES } from '../../../constants/labels';
import { useAuth } from '../../../auth/AuthContext';
import useAsync from '../../../hooks/useAsync';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import { formatDate, formatMoney } from '../../../utils/format';
import MonthlyChart, { monthlyTotals } from '../components/MonthlyChart';

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 6 }, (_, i) => CURRENT_YEAR - i);

const loadDashboard = async (year) => {
  const [annual, bySource, byCategory, incomes, expenses, maintenances, donors] = await Promise.all([
    getAnnualReport(year),
    getIncomeBySource(year),
    getExpenseByCategory(year),
    fetchIncomes(),
    fetchExpenses(),
    fetchMaintenances(),
    fetchDonors(),
  ]);
  return { annual, bySource, byCategory, incomes, expenses, maintenances, donors };
};

const DashboardPage = () => {
  useDocumentTitle('لوحة التحكم');
  const { user } = useAuth();
  const [year, setYear] = useState(CURRENT_YEAR);
  const { data, loading, error, reload } = useAsync(() => loadDashboard(year), [year]);

  const header = (
    <PageHeader
      title={`أهلاً، ${user?.username}`}
      subtitle="نظرة عامة على الوضع المالي للجمعية."
      actions={
        <>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            aria-label="السنة"
            className="h-11 rounded-xl border border-slate-300 bg-white px-3 text-sm font-bold focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
          <Button to="/admin/incomes/new" icon={FiPlus}>إيراد</Button>
          <Button to="/admin/expenses/new" variant="secondary" icon={FiPlus}>مصروف</Button>
        </>
      }
    />
  );

  if (loading && !data) return <>{header}<LoadingState /></>;
  if (error) return <>{header}<Card><ErrorState message={error} onRetry={reload} /></Card></>;

  const { annual, bySource, byCategory, incomes, expenses, maintenances, donors } = data;
  const net = annual?.netBalance ?? 0;
  const recentIncomes = [...incomes].sort((a, b) => String(b.dateReceived).localeCompare(String(a.dateReceived))).slice(0, 5);
  const recentExpenses = [...expenses].sort((a, b) => String(b.dateSpent).localeCompare(String(a.dateSpent))).slice(0, 5);

  return (
    <>
      {header}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label={`إيرادات ${year}`} value={formatMoney(annual?.totalIncome)} icon={FiDollarSign} tone="green" />
        <StatCard label={`مصروفات ${year}`} value={formatMoney(annual?.totalExpense)} icon={FiShoppingBag} tone="red" />
        <StatCard label={`تكاليف الصيانة ${year}`} value={formatMoney(annual?.totalMaintenance)} icon={FiTool} tone="amber" />
        <StatCard
          label={`الرصيد الصافي `}
          value={formatMoney(net)}
          hint={`${donors.length} متبرع مسجل`}
          icon={FiTrendingUp}
          tone={net >= 0 ? 'blue' : 'red'}
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader title="الحركة الشهرية" subtitle={`الإيرادات مقابل المصروفات والصيانة خلال ${year}`} />
          <div className="p-5">
            <MonthlyChart data={monthlyTotals(incomes, expenses, maintenances, year)} />
          </div>
        </Card>

        <Card>
          <CardHeader title="الإيرادات حسب المصدر" />
          <div className="p-5">
            <BarList tone="bg-emerald-500" items={(bySource || []).map((s) => ({ label: INCOME_SOURCES[s.sourceType] || s.sourceType, value: s.totalAmount }))} />
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Card>
          <CardHeader title="المصروفات حسب الفئة" />
          <div className="p-5">
            <BarList tone="bg-red-400" items={(byCategory || []).map((c) => ({ label: EXPENSE_CATEGORIES[c.category] || c.category, value: c.totalAmount }))} />
          </div>
        </Card>

        <RecentList title="آخر الإيرادات" to="/admin/incomes" rows={recentIncomes} dateKey="dateReceived" amountClass="text-emerald-700"
          describe={(r) => r.donorName || INCOME_SOURCES[r.sourceType] || '—'} />
        <RecentList title="آخر المصروفات" to="/admin/expenses" rows={recentExpenses} dateKey="dateSpent" amountClass="text-red-700"
          describe={(r) => EXPENSE_CATEGORIES[r.category] || r.category} />
      </div>
    </>
  );
};

const RecentList = ({ title, to, rows, dateKey, amountClass, describe }) => (
  <Card>
    <CardHeader
      title={title}
      actions={<Link to={to} className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:underline">عرض الكل <FiArrowLeft /></Link>}
    />
    {rows.length ? (
      <ul className="divide-y divide-slate-100">
        {rows.map((row) => (
          <li key={row.id} className="flex items-center justify-between gap-3 px-5 py-3 text-sm">
            <div className="min-w-0">
              <p className="truncate font-bold text-slate-800">{describe(row)}</p>
              <p className="text-xs text-slate-500">{formatDate(row[dateKey])}</p>
            </div>
            <span className={`shrink-0 font-bold ${amountClass}`}>{formatMoney(row.amount)}</span>
          </li>
        ))}
      </ul>
    ) : (
      <p className="px-5 py-10 text-center text-sm text-slate-500">لا توجد سجلات.</p>
    )}
  </Card>
);

export default DashboardPage;
