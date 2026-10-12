import React from 'react';
import { createExpense, fetchExpense, updateExpense } from '../../../api/expenseService';
import { SelectField, TextAreaField, TextField } from '../../../components/ui';
import { EXPENSE_CATEGORIES, toOptions } from '../../../constants/labels';
import useEntityForm from '../../../hooks/useEntityForm';
import { todayISO } from '../../../utils/format';
import FormShell from '../components/FormShell';

const validate = ({ amount, category, dateSpent }) => ({
  amount: !(Number(amount) > 0) && 'أدخل مبلغاً أكبر من صفر.',
  category: !category && 'اختر فئة المصروف.',
  dateSpent: !dateSpent && 'التاريخ مطلوب.',
});

const ExpenseFormPage = () => {
  const form = useEntityForm({
    initialValues: { amount: '', category: '', dateSpent: todayISO(), details: '' },
    fetchOne: fetchExpense,
    fromEntity: (r) => ({ amount: r.amount ?? '', category: r.category || '', dateSpent: r.dateSpent || '', details: r.details || '' }),
    create: createExpense,
    update: updateExpense,
    toPayload: (v) => ({ ...v, amount: Number(v.amount) }),
    validate,
    listPath: '/admin/expenses',
    messages: { created: 'تم تسجيل المصروف.', updated: 'تم تحديث المصروف.' },
  });
  const { values, setField, errors } = form;

  return (
    <FormShell title={form.isEdit ? 'تعديل مصروف' : 'مصروف جديد'} subtitle="سجّل نفقة من نفقات الجمعية." form={form} cancelTo="/admin/expenses">
      <TextField label="المبلغ" type="number" min="0" step="0.01" dir="ltr" required value={values.amount} onChange={setField('amount')} error={errors.amount} />
      <SelectField label="الفئة" required options={toOptions(EXPENSE_CATEGORIES)} placeholder="اختر الفئة" value={values.category} onChange={setField('category')} error={errors.category} />
      <TextField label="تاريخ الصرف" type="date" required value={values.dateSpent} onChange={setField('dateSpent')} error={errors.dateSpent} />
      <TextAreaField label="التفاصيل" className="sm:col-span-2" value={values.details} onChange={setField('details')} placeholder="وصف المصروف، الجهة المستفيدة، رقم الفاتورة..." />
    </FormShell>
  );
};

export default ExpenseFormPage;
