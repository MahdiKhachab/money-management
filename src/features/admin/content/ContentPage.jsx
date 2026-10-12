import React, { useMemo, useState } from 'react';
import { FiExternalLink, FiImage, FiPlus } from 'react-icons/fi';
import { assetUrl, deleteContent, fetchPublicContent, isImage } from '../../../api/contentService';
import { Badge, Button, ConfirmDialog, DataTable, PageHeader } from '../../../components/ui';
import { CONTENT_TYPES } from '../../../constants/labels';
import useAsync from '../../../hooks/useAsync';
import useDeleteConfirm from '../../../hooks/useDeleteConfirm';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import { excerpt, formatDate } from '../../../utils/format';
import RowActions from '../components/RowActions';

const TYPE_TONES = { NEWS: 'blue', ACTIVITY: 'green', ABOUT: 'slate' };

const ContentPage = () => {
  useDocumentTitle('الأخبار والأنشطة');
  const [type, setType] = useState('');
  const { data: items, setData, loading, error, reload } = useAsync(() => fetchPublicContent(), [], []);
  const deletion = useDeleteConfirm(deleteContent, {
    successMessage: 'تم حذف المحتوى من الموقع.',
    onDeleted: (row) => setData((list) => list.filter((item) => item.id !== row.id)),
  });

  const columns = [
    {
      key: 'title', header: 'العنوان', sortable: true,
      render: (r) => (
        <div className="flex items-center gap-3">
          {r.attachmentUrl && isImage(r.attachmentUrl) ? (
            <img src={assetUrl(r.attachmentUrl)} alt="" className="h-12 w-16 shrink-0 rounded-lg object-cover ring-1 ring-slate-200" loading="lazy" />
          ) : (
            <div className="flex h-12 w-16 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-400"><FiImage /></div>
          )}
          <div className="min-w-0">
            <p className="font-bold text-slate-900">{r.title}</p>
            <p className="line-clamp-1 text-xs text-slate-500">{excerpt(r.description, 90)}</p>
          </div>
        </div>
      ),
    },
    { key: 'type', header: 'النوع', sortable: true, value: (r) => CONTENT_TYPES[r.type] || r.type, render: (r) => <Badge tone={TYPE_TONES[r.type]}>{CONTENT_TYPES[r.type] || r.type}</Badge> },
    { key: 'createdAt', header: 'تاريخ النشر', sortable: true, render: (r) => formatDate(r.createdAt) },
    {
      key: 'actions', header: '', exportable: false, className: 'w-32',
      render: (r) => (
        <div className="flex items-center justify-end gap-1">
          <a href={`/details/${r.id}`} target="_blank" rel="noreferrer" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800" title="عرض في الموقع" aria-label={`عرض ${r.title} في الموقع`}>
            <FiExternalLink className="h-4 w-4" />
          </a>
          <RowActions label={r.title} editTo={`/admin/content/${r.id}/edit`} onDelete={() => deletion.ask(r)} />
        </div>
      ),
    },
  ];

  const rows = useMemo(() => (type ? items.filter((item) => item.type === type) : items), [items, type]);

  return (
    <>
      <PageHeader
        title="الأخبار والأنشطة"
        subtitle="المحتوى المنشور على الموقع العام للجمعية."
        actions={<Button to="/admin/content/new" icon={FiPlus}>محتوى جديد</Button>}
      />
      <DataTable
        columns={columns}
        rows={rows}
        loading={loading}
        error={error}
        onRetry={reload}
        initialSort={{ key: 'createdAt', dir: 'desc' }}
        searchPlaceholder="بحث بالعنوان أو النص..."
        toolbar={
          <div className="flex flex-wrap gap-1 rounded-xl bg-slate-100 p-1" role="group" aria-label="تصفية حسب النوع">
            {[['', 'الكل'], ...Object.entries(CONTENT_TYPES)].map(([value, label]) => (
              <button
                key={value || 'all'}
                type="button"
                onClick={() => setType(value)}
                className={`rounded-lg px-3 py-1.5 text-sm font-bold transition ${type === value ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                aria-pressed={type === value}
              >
                {label}
              </button>
            ))}
          </div>
        }
        emptyTitle="لم يُنشر أي محتوى بعد"
        emptyDescription="أضف خبراً أو نشاطاً ليظهر للزوار على الموقع العام."
        emptyAction={<Button to="/admin/content/new" size="sm" icon={FiPlus}>إضافة محتوى</Button>}
      />
      <ConfirmDialog {...deletion.dialogProps} message={<>سيتم حذف <strong>{deletion.target?.title}</strong> من الموقع العام.</>} />
    </>
  );
};

export default ContentPage;
