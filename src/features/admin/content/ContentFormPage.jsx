import React, { useEffect, useMemo, useState } from 'react';
import { FiPaperclip, FiUploadCloud, FiX } from 'react-icons/fi';
import { assetUrl, createContent, fetchPublicContentById, isImage, updateContent } from '../../../api/contentService';
import { SelectField, TextAreaField, TextField } from '../../../components/ui';
import { CONTENT_TYPES, toOptions } from '../../../constants/labels';
import useEntityForm from '../../../hooks/useEntityForm';
import FormShell from '../components/FormShell';

const MAX_FILE_MB = 5;

const validate = ({ title, description, type, attachment }) => ({
  title: !title.trim() && 'العنوان مطلوب.',
  description: !description.trim() && 'النص مطلوب.',
  type: !type && 'اختر نوع المحتوى.',
  attachment: attachment && attachment.size > MAX_FILE_MB * 1024 * 1024 && `الحد الأقصى لحجم الملف ${MAX_FILE_MB} ميغابايت.`,
});

const ContentFormPage = () => {
  const form = useEntityForm({
    initialValues: { title: '', description: '', type: 'NEWS', attachment: null, attachmentUrl: '' },
    fetchOne: fetchPublicContentById,
    fromEntity: (c) => ({ title: c.title || '', description: c.description || '', type: c.type || 'NEWS', attachmentUrl: c.attachmentUrl || '' }),
    create: createContent,
    update: updateContent,
    toPayload: (v) => ({ title: v.title.trim(), description: v.description.trim(), type: v.type, attachment: v.attachment }),
    validate,
    listPath: '/admin/content',
    messages: { created: 'تم نشر المحتوى على الموقع.', updated: 'تم تحديث المحتوى.' },
  });
  const { values, setField, errors } = form;

  // Preview: newly picked file, otherwise the existing attachment
  const localPreview = useMemo(
    () => (values.attachment && values.attachment.type.startsWith('image/') ? URL.createObjectURL(values.attachment) : null),
    [values.attachment]
  );
  useEffect(() => () => localPreview && URL.revokeObjectURL(localPreview), [localPreview]);
  const existingPreview = !values.attachment && isImage(values.attachmentUrl) ? assetUrl(values.attachmentUrl) : null;
  const preview = localPreview || existingPreview;

  const [dragging, setDragging] = useState(false);
  const pickFile = (file) => file && setField('attachment')(file);

  return (
    <FormShell
      title={form.isEdit ? 'تعديل المحتوى' : 'محتوى جديد'}
      subtitle="ما تنشره هنا يظهر مباشرة للزوار في صفحات الأخبار والأنشطة ومن نحن."
      form={form}
      cancelTo="/admin/content"
    >
      <TextField label="العنوان" required value={values.title} onChange={setField('title')} error={errors.title} />
      <SelectField label="نوع المحتوى" required options={toOptions(CONTENT_TYPES)} value={values.type} onChange={setField('type')} error={errors.type} />
      <TextAreaField label="النص" required rows={8} className="sm:col-span-2" value={values.description} onChange={setField('description')} error={errors.description} />

      <div className="sm:col-span-2">
        <p className="mb-1.5 text-sm font-bold text-slate-700">صورة أو مرفق</p>
        <label
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); pickFile(e.dataTransfer.files[0]); }}
          className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-4 py-8 text-center transition ${
            dragging ? 'border-blue-500 bg-blue-50' : errors.attachment ? 'border-red-300 bg-red-50/40' : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
          }`}
        >
          <FiUploadCloud className="h-8 w-8 text-slate-400" />
          <span className="text-sm font-bold text-slate-700">اسحب الملف هنا أو انقر للاختيار</span>
          <span className="text-xs text-slate-500">صور JPG / PNG / WEBP أو PDF — حتى {MAX_FILE_MB} ميغابايت</span>
          <input type="file" accept="image/*,application/pdf" className="sr-only" onChange={(e) => pickFile(e.target.files[0])} />
        </label>
        {errors.attachment && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.attachment}</p>}

        {(preview || values.attachment || values.attachmentUrl) && (
          <div className="mt-4 flex items-start gap-4 rounded-xl border border-slate-200 p-3">
            {preview ? (
              <img src={preview} alt="معاينة" className="h-24 w-36 rounded-lg object-cover" />
            ) : (
              <div className="flex h-24 w-36 items-center justify-center rounded-lg bg-slate-100 text-slate-400"><FiPaperclip className="h-6 w-6" /></div>
            )}
            <div className="min-w-0 flex-1 text-sm">
              <p className="truncate font-bold text-slate-800">{values.attachment ? values.attachment.name : 'المرفق الحالي'}</p>
              <p className="text-xs text-slate-500">{values.attachment ? 'سيتم رفعه عند الحفظ.' : 'يبقى كما هو ما لم تختر ملفاً جديداً.'}</p>
            </div>
            {values.attachment && (
              <button type="button" onClick={() => setField('attachment')(null)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="إزالة الملف المختار">
                <FiX />
              </button>
            )}
          </div>
        )}
      </div>
    </FormShell>
  );
};

export default ContentFormPage;
