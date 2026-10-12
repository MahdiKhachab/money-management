import React from 'react';
import { FiAlertCircle, FiInbox } from 'react-icons/fi';
import Button from './Button';
import Spinner from './Spinner';

export const LoadingState = ({ label = 'جاري التحميل...' }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-16 text-slate-500" role="status">
    <Spinner className="h-7 w-7 text-blue-600" />
    <p className="text-sm font-medium">{label}</p>
  </div>
);

export const EmptyState = ({ title = 'لا توجد بيانات', description, action }) => (
  <div className="flex flex-col items-center justify-center gap-3 px-4 py-14 text-center">
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
      <FiInbox className="h-6 w-6" />
    </div>
    <p className="font-bold text-slate-700">{title}</p>
    {description && <p className="max-w-sm text-sm text-slate-500">{description}</p>}
    {action}
  </div>
);

export const ErrorState = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center gap-3 px-4 py-14 text-center" role="alert">
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
      <FiAlertCircle className="h-6 w-6" />
    </div>
    <p className="font-bold text-slate-700">تعذر تحميل البيانات</p>
    <p className="max-w-sm text-sm text-slate-500">{message}</p>
    {onRetry && <Button variant="secondary" size="sm" onClick={onRetry}>إعادة المحاولة</Button>}
  </div>
);

export const Alert = ({ tone = 'error', children }) => (
  <div
    role="alert"
    className={`rounded-xl border px-4 py-3 text-sm font-medium ${
      tone === 'error' ? 'border-red-200 bg-red-50 text-red-700' : tone === 'warning' ? 'border-amber-200 bg-amber-50 text-amber-800' : 'border-emerald-200 bg-emerald-50 text-emerald-700'
    }`}
  >
    {children}
  </div>
);
