import React from 'react';
import { createMaintenance, fetchMaintenance, updateMaintenance } from '../../../api/maintenanceService';
import { SelectField, TextAreaField, TextField } from '../../../components/ui';
import { MAINTENANCE_TYPES, toOptions } from '../../../constants/labels';
import useEntityForm from '../../../hooks/useEntityForm';
import { todayISO } from '../../../utils/format';
import FormShell from '../components/FormShell';

const validate = ({ itemName, maintenanceType, date, cost }) => ({
  itemName: !itemName.trim() && 'اسم البند مطلوب.',
  maintenanceType: !maintenanceType && 'اختر نوع الصيانة.',
  date: !date && 'التاريخ مطلوب.',
  cost: (cost === '' || Number(cost) < 0) && 'أدخل تكلفة صحيحة.',
});

const MaintenanceFormPage = () => {
  const form = useEntityForm({
    initialValues: { itemName: '', maintenanceType: '', date: todayISO(), cost: '', remarks: '' },
    fetchOne: fetchMaintenance,
    fromEntity: (r) => ({ itemName: r.itemName || '', maintenanceType: r.maintenanceType || '', date: r.date || '', cost: r.cost ?? '', remarks: r.remarks || '' }),
    create: createMaintenance,
    update: updateMaintenance,
    toPayload: (v) => ({ ...v, itemName: v.itemName.trim(), cost: Number(v.cost) }),
    validate,
    listPath: '/admin/maintenance',
    messages: { created: 'تمت إضافة سجل الصيانة.', updated: 'تم تحديث سجل الصيانة.' },
  });
  const { values, setField, errors } = form;

  return (
    <FormShell title={form.isEdit ? 'تعديل سجل صيانة' : 'سجل صيانة جديد'} subtitle="وثّق أعمال الصيانة وتكلفتها." form={form} cancelTo="/admin/maintenance">
      <TextField label="البند" required value={values.itemName} onChange={setField('itemName')} error={errors.itemName} placeholder="مثال: مكيف القاعة الرئيسية" />
      <SelectField label="نوع الصيانة" required options={toOptions(MAINTENANCE_TYPES)} placeholder="اختر النوع" value={values.maintenanceType} onChange={setField('maintenanceType')} error={errors.maintenanceType} />
      <TextField label="التاريخ" type="date" required value={values.date} onChange={setField('date')} error={errors.date} />
      <TextField label="التكلفة" type="number" min="0" step="0.01" dir="ltr" required value={values.cost} onChange={setField('cost')} error={errors.cost} />
      <TextAreaField label="ملاحظات" className="sm:col-span-2" value={values.remarks} onChange={setField('remarks')} />
    </FormShell>
  );
};

export default MaintenanceFormPage;
