import React from 'react';
import { createDonor, fetchDonor, updateDonor } from '../../../api/donorService';
import { TextField } from '../../../components/ui';
import useEntityForm from '../../../hooks/useEntityForm';
import FormShell from '../components/FormShell';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = ({ fullName, email }) => ({
  fullName: !fullName.trim() && 'الاسم مطلوب.',
  email: email && !EMAIL_RE.test(email) && 'صيغة البريد الإلكتروني غير صحيحة.',
});

const DonorFormPage = () => {
  const form = useEntityForm({
    initialValues: { fullName: '', organization: '', phone: '', email: '' },
    fetchOne: fetchDonor,
    fromEntity: (d) => ({ fullName: d.fullName || '', organization: d.organization || '', phone: d.phone || '', email: d.email || '' }),
    create: createDonor,
    update: updateDonor,
    toPayload: (v) => ({ ...v, fullName: v.fullName.trim() }),
    validate,
    listPath: '/admin/donors',
    messages: { created: 'تمت إضافة المتبرع.', updated: 'تم تحديث بيانات المتبرع.' },
  });
  const { values, setField, errors } = form;

  return (
    <FormShell title={form.isEdit ? 'تعديل متبرع' : 'متبرع جديد'} subtitle="بيانات التواصل مع المتبرع أو الجهة الداعمة." form={form} cancelTo="/admin/donors">
      <TextField label="الاسم الكامل" required value={values.fullName} onChange={setField('fullName')} error={errors.fullName} placeholder="مثال: محمد عبد الله" />
      <TextField label="الجهة / المؤسسة" value={values.organization} onChange={setField('organization')} placeholder="اختياري" />
      <TextField label="رقم الهاتف" type="tel" dir="ltr" value={values.phone} onChange={setField('phone')} placeholder="+49 ..." />
      <TextField label="البريد الإلكتروني" type="email" dir="ltr" value={values.email} onChange={setField('email')} error={errors.email} placeholder="example@email.com" />
    </FormShell>
  );
};

export default DonorFormPage;
