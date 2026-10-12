import React from 'react';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const NotFoundPage = () => {
  useDocumentTitle('الصفحة غير موجودة');
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center" dir="rtl">
      <p className="text-7xl font-black text-blue-700/20">404</p>
      <h1 className="text-3xl font-black text-slate-900">الصفحة غير موجودة</h1>
      <p className="max-w-md text-slate-600">ربما تم نقل هذه الصفحة أو أن الرابط غير صحيح.</p>
      <Link to="/" className="rounded-full bg-blue-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-800">
        العودة إلى الرئيسية
      </Link>
    </div>
  );
};

export default NotFoundPage;
