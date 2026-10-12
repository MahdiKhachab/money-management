import React from 'react';
import { Link } from 'react-router-dom';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const RowActions = ({ editTo, onDelete, label }) => (
  <div className="flex items-center justify-end gap-1">
    {editTo && (
      <Link to={editTo} className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-700" aria-label={`تعديل ${label}`} title="تعديل">
        <FiEdit2 className="h-4 w-4" />
      </Link>
    )}
    {onDelete && (
      <button type="button" onClick={onDelete} className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600" aria-label={`حذف ${label}`} title="حذف">
        <FiTrash2 className="h-4 w-4" />
      </button>
    )}
  </div>
);

export default RowActions;
