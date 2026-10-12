import React, { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { FiArrowRight, FiLock } from 'react-icons/fi';
import logo from '../../components/assets/logo.png';
import { useAuth } from '../../auth/AuthContext';
import { Alert, Button, TextField } from '../../components/ui';
import { ORG_NAME } from '../../config/env';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const LoginPage = () => {
  useDocumentTitle('تسجيل الدخول');
  const { user, login, sessionExpired } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname?.startsWith('/admin') ? location.state.from.pathname : '/admin';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (user) return <Navigate to={from} replace />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(username.trim(), password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 px-4 py-10" dir="rtl">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <img src={logo} alt="" className="mx-auto mb-4 h-20 w-20 rounded-full border-2 border-white/20 object-cover shadow-xl" />
          <h1 className="text-2xl font-black text-white">{ORG_NAME}</h1>
          <p className="mt-1 text-sm text-blue-200">الدخول إلى لوحة الإدارة</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700"><FiLock /></div>
            <h2 className="text-xl font-black text-slate-900">تسجيل الدخول</h2>
          </div>

          {sessionExpired && !error && <Alert tone="warning">انتهت صلاحية الجلسة. يرجى تسجيل الدخول مجدداً.</Alert>}
          {error && <Alert>{error}</Alert>}

          <TextField label="اسم المستخدم" required autoComplete="username" autoFocus dir="ltr" value={username} onChange={(e) => setUsername(e.target.value)} />
          <TextField label="كلمة المرور" type="password" required autoComplete="current-password" dir="ltr" value={password} onChange={(e) => setPassword(e.target.value)} />

          <Button type="submit" loading={submitting} disabled={!username.trim() || !password} className="w-full justify-center">
            دخول
          </Button>
        </form>

        <Link to="/" className="mt-6 inline-flex w-full items-center justify-center gap-2 text-sm font-medium text-blue-200 hover:text-white">
          <FiArrowRight />
          العودة إلى الموقع
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
