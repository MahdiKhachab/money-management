import React, { useMemo, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { deleteIncome, fetchIncomes } from '../../../api/incomeService';
import { Badge, Button, ConfirmDialog, DataTable, PageHeader } from '../../../components/ui';
import { INCOME_SOURCES } from '../../../constants/labels';
import useAsync from '../../../hooks/useAsync';
import useDeleteConfirm from '../../../hooks/useDeleteConfirm';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import { formatDate, formatMoney, sumBy } from '../../../utils/format';
import RowActions from '../components/RowActions';
import YearFilter, { filterByYear, yearsOf } from '../components/YearFilter';

const IncomesPage = () => {
  useDocumentTitle('الإيرادات');
  const [year, setYear] = useState('');
  const { data: incomes, setData, loading, error, reload } = useAsync(fetchIncomes, [], []);
  const deletion = useDeleteConfirm(deleteIncome, {
    successMessage: 'تم حذف الإيراد.',
    onDeleted: (row) => setData((list) => list.filter((item) => item.id !== row.id)),
  });

  const columns = [
    { key: 'dateReceived', header: 'التاريخ', sortable: true, render: (r) => formatDate(r.dateReceived) },
    { key: 'amount', header: 'المبلغ', sortable: true, render: (r) => <span className="font-bold text-emerald-700">{formatMoney(r.amount)}</span> },
    { key: 'sourceType', header: 'المصدر', sortable: true, value: (r) => INCOME_SOURCES[r.sourceType] || r.sourceType, render: (r) => <Badge tone="green">{INCOME_SOURCES[r.sourceType] || r.sourceType}</Badge> },
    { key: 'donorName', header: 'المتبرع', sortable: true, render: (r) => r.donorName || '—' },
    { key: 'description', header: 'الوصف', className: 'max-w-xs', render: (r) => <span className="line-clamp-2">{r.description || '—'}</span> },
    {
      key: 'actions', header: '', exportable: false, className: 'w-24',
      render: (r) => <RowActions label="الإيراد" editTo={`/admin/incomes/${r.id}/edit`} onDelete={() => deletion.ask(r)} />,
    },
  ];

  const rows = useMemo(() => filterByYear(incomes, 'dateReceived', year), [incomes, year]);

  return (
    <>
      <PageHeader
        title="الإيرادات"
        subtitle="التبرعات والمداخيل المسجلة."
        actions={<Button to="/admin/incomes/new" icon={FiPlus}>إيراد جديد</Button>}
      />
      <DataTable
        columns={columns}
        rows={rows}
        loading={loading}
        error={error}
        onRetry={reload}
        initialSort={{ key: 'dateReceived', dir: 'desc' }}
        searchPlaceholder="بحث بالمتبرع أو الوصف..."
        exportName={`incomes${year ? `-${year}` : ''}`}
        toolbar={<YearFilter years={yearsOf(incomes, 'dateReceived')} value={year} onChange={setYear} />}
        emptyTitle="لا توجد إيرادات"
        emptyAction={<Button to="/admin/incomes/new" size="sm" icon={FiPlus}>تسجيل إيراد</Button>}
        summary={(filtered) => (
          <tr>
            <td className="px-4 py-3">الإجمالي</td>
            <td className="px-4 py-3 text-emerald-700">{formatMoney(sumBy(filtered, 'amount'))}</td>
            <td colSpan={columns.length - 2} />
          </tr>
        )}
      />
      <ConfirmDialog {...deletion.dialogProps} message={<>هل تريد حذف إيراد بقيمة <strong>{formatMoney(deletion.target?.amount)}</strong>؟</>} />
    </>
  );
};

export default IncomesPage;
