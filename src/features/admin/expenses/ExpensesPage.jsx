import React, { useMemo, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { deleteExpense, fetchExpenses } from '../../../api/expenseService';
import { Badge, Button, ConfirmDialog, DataTable, PageHeader } from '../../../components/ui';
import { EXPENSE_CATEGORIES } from '../../../constants/labels';
import useAsync from '../../../hooks/useAsync';
import useDeleteConfirm from '../../../hooks/useDeleteConfirm';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import { formatDate, formatMoney, sumBy } from '../../../utils/format';
import RowActions from '../components/RowActions';
import YearFilter, { filterByYear, yearsOf } from '../components/YearFilter';

const ExpensesPage = () => {
  useDocumentTitle('المصروفات');
  const [year, setYear] = useState('');
  const { data: expenses, setData, loading, error, reload } = useAsync(fetchExpenses, [], []);
  const deletion = useDeleteConfirm(deleteExpense, {
    successMessage: 'تم حذف المصروف.',
    onDeleted: (row) => setData((list) => list.filter((item) => item.id !== row.id)),
  });

  const columns = [
    { key: 'dateSpent', header: 'التاريخ', sortable: true, render: (r) => formatDate(r.dateSpent) },
    { key: 'amount', header: 'المبلغ', sortable: true, render: (r) => <span className="font-bold text-red-700">{formatMoney(r.amount)}</span> },
    { key: 'category', header: 'الفئة', sortable: true, value: (r) => EXPENSE_CATEGORIES[r.category] || r.category, render: (r) => <Badge tone="amber">{EXPENSE_CATEGORIES[r.category] || r.category}</Badge> },
    { key: 'details', header: 'التفاصيل', className: 'max-w-sm', render: (r) => <span className="line-clamp-2">{r.details || '—'}</span> },
    {
      key: 'actions', header: '', exportable: false, className: 'w-24',
      render: (r) => <RowActions label="المصروف" editTo={`/admin/expenses/${r.id}/edit`} onDelete={() => deletion.ask(r)} />,
    },
  ];

  const rows = useMemo(() => filterByYear(expenses, 'dateSpent', year), [expenses, year]);

  return (
    <>
      <PageHeader
        title="المصروفات"
        subtitle="النفقات التشغيلية ومصاريف الأنشطة."
        actions={<Button to="/admin/expenses/new" icon={FiPlus}>مصروف جديد</Button>}
      />
      <DataTable
        columns={columns}
        rows={rows}
        loading={loading}
        error={error}
        onRetry={reload}
        initialSort={{ key: 'dateSpent', dir: 'desc' }}
        searchPlaceholder="بحث بالفئة أو التفاصيل..."
        exportName={`expenses${year ? `-${year}` : ''}`}
        toolbar={<YearFilter years={yearsOf(expenses, 'dateSpent')} value={year} onChange={setYear} />}
        emptyTitle="لا توجد مصروفات"
        emptyAction={<Button to="/admin/expenses/new" size="sm" icon={FiPlus}>تسجيل مصروف</Button>}
        summary={(filtered) => (
          <tr>
            <td className="px-4 py-3">الإجمالي</td>
            <td className="px-4 py-3 text-red-700">{formatMoney(sumBy(filtered, 'amount'))}</td>
            <td colSpan={columns.length - 2} />
          </tr>
        )}
      />
      <ConfirmDialog {...deletion.dialogProps} message={<>هل تريد حذف مصروف بقيمة <strong>{formatMoney(deletion.target?.amount)}</strong>؟</>} />
    </>
  );
};

export default ExpensesPage;
