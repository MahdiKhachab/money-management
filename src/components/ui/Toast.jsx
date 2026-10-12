import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { FiAlertCircle, FiCheckCircle, FiX } from 'react-icons/fi';

const ToastContext = createContext(null);
let nextId = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => setToasts((list) => list.filter((toast) => toast.id !== id)), []);

  const show = useCallback(
    (type, message) => {
      const id = ++nextId;
      setToasts((list) => [...list, { id, type, message }]);
      setTimeout(() => dismiss(id), 4500);
    },
    [dismiss]
  );

  const api = useMemo(
    () => ({ success: (message) => show('success', message), error: (message) => show('error', message) }),
    [show]
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="pointer-events-none fixed bottom-4 left-4 z-[200] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2" dir="rtl" aria-live="polite">
        {toasts.map(({ id, type, message }) => {
          const success = type === 'success';
          const Icon = success ? FiCheckCircle : FiAlertCircle;
          return (
            <div
              key={id}
              role="status"
              className={`pointer-events-auto flex items-start gap-3 rounded-xl border bg-white p-4 text-sm shadow-lg ${success ? 'border-emerald-200' : 'border-red-200'}`}
            >
              <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${success ? 'text-emerald-600' : 'text-red-600'}`} />
              <p className="flex-1 font-medium text-slate-700">{message}</p>
              <button type="button" onClick={() => dismiss(id)} className="text-slate-400 hover:text-slate-700" aria-label="إغلاق">
                <FiX className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used inside <ToastProvider>');
  return context;
};
