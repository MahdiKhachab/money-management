import React, { useState } from 'react';
import { FiUserPlus } from 'react-icons/fi';
import { registerUser } from '../../../api/authService';
import { getErrorMessage } from '../../../api/client';
import { Alert, Button, Card, PageHeader, SelectField, TextField, useToast } from '../../../components/ui';
import { USER_ROLES, toOptions } from '../../../constants/labels';
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const EMPTY = { username: '', password: '', confirm: '', role: 'USER' };

const validate = ({ username, password, confirm }) => ({
  username: username.trim().length < 3 && 'اسم المستخدم يجب أن يكون 3 أحرف على الأقل.',
  password: password.length < 8 && 'كلمة المرور يجب أن تكون 8 أحرف على الأقل.',
  confirm: confirm !== password && 'كلمتا المرور غير متطابقتين.',
});

const UsersPage = () => {
  useDocumentTitle('إضافة مستخدم');
  const toast = useToast();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const setField = (name) => (e) => {
    setValues((v) => ({ ...v, [name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const found = validate(values);
    if (Object.values(found).some(Boolean)) {
      setErrors(found);
      return;
    }
    setSubmitting(true);
    try {
      await registerUser({ username: values.username.trim(), password: values.password, role: values.role });
      toast.success(`تم إنشاء حساب ${values.username.trim()}.`);
      setValues(EMPTY);
    } catch (error) {
      toast.error(error.response?.status === 409 ? 'اسم المستخدم مستخدم مسبقاً.' : getErrorMessage(error, 'تعذر إنشاء الحساب.'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHeader title="إضافة مستخدم" subtitle="أنشئ حساباً لأحد أعضاء الإدارة للدخول إلى لوحة التحكم." />
      <Card className="max-w-2xl">
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
            <div className="sm:col-span-2">
              <Alert tone="warning">
                <strong>مدير</strong>: يمكنه إضافة مستخدمين آخرين. <strong>مستخدم</strong>: يدير المالية والمحتوى فقط.
              </Alert>
            </div>
            <TextField label="اسم المستخدم" required dir="ltr" autoComplete="off" value={values.username} onChange={setField('username')} error={errors.username} />
            <SelectField label="الصلاحية" options={toOptions(USER_ROLES)} value={values.role} onChange={setField('role')} />
            <TextField label="كلمة المرور" type="password" required dir="ltr" autoComplete="new-password" value={values.password} onChange={setField('password')} error={errors.password} />
            <TextField label="تأكيد كلمة المرور" type="password" required dir="ltr" autoComplete="new-password" value={values.confirm} onChange={setField('confirm')} error={errors.confirm} />
          </div>
          <div className="border-t border-slate-100 px-5 py-4 sm:px-6">
            <Button type="submit" icon={FiUserPlus} loading={submitting}>إنشاء الحساب</Button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default UsersPage;
