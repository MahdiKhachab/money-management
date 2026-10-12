import React from 'react';
import { FiSave } from 'react-icons/fi';
import { Button, Card, ErrorState, LoadingState, PageHeader } from '../../../components/ui';
import useDocumentTitle from '../../../hooks/useDocumentTitle';

// Page wrapper for create/edit forms built with useEntityForm.
const FormShell = ({ title, subtitle, form, cancelTo, children }) => {
  useDocumentTitle(title);
  const { loading, loadError, submitting, handleSubmit, isEdit } = form;

  return (
    <>
      <PageHeader title={title} subtitle={subtitle} />
      <Card className="max-w-3xl">
        {loading ? (
          <LoadingState />
        ) : loadError ? (
          <ErrorState message={loadError} />
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">{children}</div>
            <div className="flex flex-wrap gap-3 border-t border-slate-100 px-5 py-4 sm:px-6">
              <Button type="submit" icon={FiSave} loading={submitting}>
                {isEdit ? 'حفظ التعديلات' : 'حفظ'}
              </Button>
              <Button variant="secondary" to={cancelTo}>
                إلغاء
              </Button>
            </div>
          </form>
        )}
      </Card>
    </>
  );
};

export default FormShell;
