import { useState } from 'react';
import { getErrorMessage } from '../api/client';
import { useToast } from '../components/ui';

// Drives a <ConfirmDialog>: ask(row) opens it, confirming calls deleteFn(row.id).
const useDeleteConfirm = (deleteFn, { onDeleted, successMessage = 'تم الحذف بنجاح.' } = {}) => {
  const toast = useToast();
  const [target, setTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const confirm = async () => {
    setDeleting(true);
    try {
      await deleteFn(target.id);
      toast.success(successMessage);
      onDeleted?.(target);
      setTarget(null);
    } catch (error) {
      toast.error(getErrorMessage(error, 'تعذر الحذف.'));
    } finally {
      setDeleting(false);
    }
  };

  return {
    target,
    ask: setTarget,
    dialogProps: {
      open: Boolean(target),
      loading: deleting,
      onConfirm: confirm,
      onCancel: () => setTarget(null),
    },
  };
};

export default useDeleteConfirm;
