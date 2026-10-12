import React, { useMemo, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { deleteMaintenance, fetchMaintenances } from '../../../api/maintenanceService';
import { Badge, Button, ConfirmDialog, DataTable, PageHeader } from '../../../components/ui';
import { MAINTENANCE_TYPES } from '../../../constants/labels';
import useAsync from '../../../hooks/useAsync';
import useDeleteConfirm from '../../../hooks/useDeleteConfirm';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import { formatDate, formatMoney, sumBy } from '../../../utils/format';
import RowActions from '../components/RowActions';
import YearFilter, { filterByYear, yearsOf } from '../components/YearFilter';

const MaintenancePage = () => {
  useDocumentTitle('الصيانة');
  const [year, setYear] = useState('');
  const { data: items, setData, loading, error, reload } = useAsync(fetchMaintenances, [], []);
  const deletion = useDeleteConfirm(deleteMaintenance, {
    successMessage: 'تم حذف سجل الصيانة.',
    onDeleted: (row) => setData((list) => list.filter((item) => item.id !== row.id)),
  });

  const columns = [
    { key: 'date', header: 'التاريخ', sortable: true, render: (r) => formatDate(r.date) },
    { key: 'itemName', header: 'البند', sortable: true, render: (r) => <span className="font-bold text-slate-900">{r.itemName}</span> },
    { key: 'maintenanceType', header: 'النوع', sortable: true, value: (r) => MAINTENANCE_TYPES[r.maintenanceType] || r.maintenanceType, render: (r) => <Badge tone="blue">{MAINTENANCE_TYPES[r.maintenanceType] || r.maintenanceType}</Badge> },
    { key: 'cost', header: 'التكلفة', sortable: true, render: (r) => <span className="font-bold">{formatMoney(r.cost)}</span> },
    { key: 'remarks', header: 'ملاحظات', className: 'max-w-xs', render: (r) => <span className="line-clamp-2">{r.remarks || '—'}</span> },
    {
      key: 'actions', header: '', exportable: false, className: 'w-24',
      render: (r) => <RowActions label={r.itemName} editTo={`/admin/maintenance/${r.id}/edit`} onDelete={() => deletion.ask(r)} />,
    },
  ];

  const rows = useMemo(() => filterByYear(items, 'date', year), [items, year]);

  return (
    <>
      <PageHeader
        title="الصيانة"
        subtitle="أعمال الإصلاح والتركيب والتنظيف في مرافق الجمعية."
        actions={<Button to="/admin/maintenance/new" icon={FiPlus}>سجل صيانة جديد</Button>}
      />
      <DataTable
        columns={columns}
        rows={rows}
        loading={loading}
        error={error}
        onRetry={reload}
        initialSort={{ key: 'date', dir: 'desc' }}
        searchPlaceholder="بحث بالبند أو الملاحظات..."
        exportName={`maintenance${year ? `-${year}` : ''}`}
        toolbar={<YearFilter years={yearsOf(items, 'date')} value={year} onChange={setYear} />}
        emptyTitle="لا توجد سجلات صيانة"
        emptyAction={<Button to="/admin/maintenance/new" size="sm" icon={FiPlus}>إضافة سجل</Button>}
        summary={(filtered) => (
          <tr>
            <td className="px-4 py-3" colSpan={3}>إجمالي التكلفة</td>
            <td className="px-4 py-3">{formatMoney(sumBy(filtered, 'cost'))}</td>
            <td colSpan={columns.length - 4} />
          </tr>
        )}
      />
      <ConfirmDialog {...deletion.dialogProps} message={<>هل تريد حذف سجل صيانة <strong>{deletion.target?.itemName}</strong>؟</>} />
    </>
  );
};

export default MaintenancePage;
