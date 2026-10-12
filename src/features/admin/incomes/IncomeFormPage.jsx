import React from 'react';
import { fetchDonors } from '../../../api/donorService';
import { createIncome, fetchIncome, updateIncome } from '../../../api/incomeService';
import { SelectField, TextAreaField, TextField } from '../../../components/ui';
import { INCOME_SOURCES, toOptions } from '../../../constants/labels';
import useAsync from '../../../hooks/useAsync';
import useEntityForm from '../../../hooks/useEntityForm';
import { todayISO } from '../../../utils/format';
import FormShell from '../components/FormShell';

const validate = ({ amount, sourceType, dateReceived }) => ({
  amount: !(Number(amount) > 0) && 'أدخل مبلغاً أكبر من صفر.',
  sourceType: !sourceType && 'اختر مصدر الإيراد.',
  dateReceived: !dateReceived && 'التاريخ مطلوب.',
});

const IncomeFormPage = () => {
  const { data: donors, loading: donorsLoading } = useAsync(fetchDonors, [], []);
  const form = useEntityForm({
    initialValues: { amount: '', sourceType: 'CASH', dateReceived: todayISO(), donorId: '', description: '' },
    fetchOne: fetchIncome,
    fromEntity: (r) => ({
      amount: r.amount ?? '',
      sourceType: r.sourceType || '',
      dateReceived: r.dateReceived || '',
      donorId: r.donorId ? String(r.donorId) : '',
      description: r.description || '',
    }),
    create: createIncome,
    update: updateIncome,
    toPayload: (v) => ({ ...v, amount: Number(v.amount), donorId: v.donorId ? Number(v.donorId) : null }),
    validate,
    listPath: '/admin/incomes',
    messages: { created: 'تم تسجيل الإيراد.', updated: 'تم تحديث الإيراد.' },
  });
  const { values, setField, errors } = form;

  const donorOptions = [...donors]
    .sort((a, b) => (a.fullName || '').localeCompare(b.fullName || '', 'ar'))
    .map((d) => ({ value: String(d.id), label: d.organization ? `${d.fullName} — ${d.organization}` : d.fullName }));

  return (
    <FormShell title={form.isEdit ? 'تعديل إيراد' : 'إيراد جديد'} subtitle="سجّل تبرعاً أو مدخولاً للجمعية." form={form} cancelTo="/admin/incomes">
      <TextField label="المبلغ" type="number" min="0" step="0.01" dir="ltr" required value={values.amount} onChange={setField('amount')} error={errors.amount} />
      <SelectField label="مصدر الإيراد" required options={toOptions(INCOME_SOURCES)} placeholder="اختر المصدر" value={values.sourceType} onChange={setField('sourceType')} error={errors.sourceType} />
      <TextField label="تاريخ الاستلام" type="date" required value={values.dateReceived} onChange={setField('dateReceived')} error={errors.dateReceived} />
      <SelectField
        label="المتبرع"
        options={donorOptions}
        placeholder={donorsLoading ? 'جاري تحميل المتبرعين...' : 'بدون متبرع محدد'}
        value={values.donorId}
        onChange={setField('donorId')}
        hint="أضف المتبرع أولاً من صفحة المتبرعين إذا لم يكن موجوداً."
      />
      <TextAreaField label="الوصف" className="sm:col-span-2" value={values.description} onChange={setField('description')} placeholder="ملاحظات حول الإيراد (اختياري)" />
    </FormShell>
  );
};

export default IncomeFormPage;
