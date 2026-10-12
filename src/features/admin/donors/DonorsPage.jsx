import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { deleteDonor, fetchDonors } from '../../../api/donorService';
import { Button, ConfirmDialog, DataTable, PageHeader } from '../../../components/ui';
import useAsync from '../../../hooks/useAsync';
import useDeleteConfirm from '../../../hooks/useDeleteConfirm';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import RowActions from '../components/RowActions';

const DonorsPage = () => {
  useDocumentTitle('المتبرعون');
  const { data: donors, setData, loading, error, reload } = useAsync(fetchDonors, [], []);
  const deletion = useDeleteConfirm(deleteDonor, {
    successMessage: 'تم حذف المتبرع.',
    onDeleted: (donor) => setData((list) => list.filter((item) => item.id !== donor.id)),
  });

  const columns = [
    { key: 'fullName', header: 'الاسم', sortable: true, render: (d) => <span className="font-bold text-slate-900">{d.fullName}</span> },
    { key: 'organization', header: 'الجهة', sortable: true, render: (d) => d.organization || '—' },
    { key: 'phone', header: 'الهاتف', render: (d) => (d.phone ? <span dir="ltr">{d.phone}</span> : '—') },
    { key: 'email', header: 'البريد الإلكتروني', render: (d) => d.email || '—' },
    {
      key: 'actions', header: '', exportable: false, className: 'w-24',
      render: (d) => <RowActions label={d.fullName} editTo={`/admin/donors/${d.id}/edit`} onDelete={() => deletion.ask(d)} />,
    },
  ];

  return (
    <>
      <PageHeader
        title="المتبرعون"
        subtitle="سجل المتبرعين والجهات الداعمة للجمعية."
        actions={<Button to="/admin/donors/new" icon={FiPlus}>متبرع جديد</Button>}
      />
      <DataTable
        columns={columns}
        rows={donors}
        loading={loading}
        error={error}
        onRetry={reload}
        initialSort={{ key: 'fullName', dir: 'asc' }}
        searchPlaceholder="بحث بالاسم أو الهاتف أو البريد..."
        exportName="donors"
        emptyTitle="لا يوجد متبرعون بعد"
        emptyAction={<Button to="/admin/donors/new" size="sm" icon={FiPlus}>إضافة أول متبرع</Button>}
      />
      <ConfirmDialog
        {...deletion.dialogProps}
        message={<>هل تريد حذف المتبرع <strong>{deletion.target?.fullName}</strong>؟</>}
      />
    </>
  );
};

export default DonorsPage;
