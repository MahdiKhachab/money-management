import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FiAlertTriangle, FiX } from 'react-icons/fi';
import Button from './Button';

export const Modal = ({ open, title, onClose, children, footer, size = 'max-w-md' }) => {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => event.key === 'Escape' && onClose?.();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" dir="rtl">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div role="dialog" aria-modal="true" aria-label={title} className={`relative w-full ${size} rounded-2xl bg-white shadow-2xl`}>
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 className="text-lg font-black text-slate-900">{title}</h2>
          <button type="button" onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="إغلاق">
            <FiX className="h-5 w-5" />
          </button>
        </div>
        <div className="px-5 py-4">{children}</div>
        {footer && <div className="flex justify-start gap-3 border-t border-slate-100 px-5 py-4">{footer}</div>}
      </div>
    </div>,
    document.body
  );
};

export const ConfirmDialog = ({ open, title = 'تأكيد الحذف', message, confirmLabel = 'حذف', loading, onConfirm, onCancel }) => (
  <Modal
    open={open}
    title={title}
    onClose={loading ? undefined : onCancel}
    footer={
      <>
        <Button variant="danger" loading={loading} onClick={onConfirm}>{confirmLabel}</Button>
        <Button variant="secondary" disabled={loading} onClick={onCancel}>إلغاء</Button>
      </>
    }
  >
    <div className="flex gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
        <FiAlertTriangle className="h-5 w-5" />
      </div>
      <div className="text-sm leading-7 text-slate-600">
        {message}
        <p className="mt-1 text-xs text-slate-400">لا يمكن التراجع عن هذا الإجراء.</p>
      </div>
    </div>
  </Modal>
);
