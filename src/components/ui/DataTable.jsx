import React, { useEffect, useMemo, useState } from 'react';
import { FiChevronDown, FiChevronLeft, FiChevronRight, FiChevronUp, FiDownload, FiSearch } from 'react-icons/fi';
import Button from './Button';
import { Card } from './Card';
import { EmptyState, ErrorState, LoadingState } from './States';

/*
 * columns: [{ key, header, render?(row), value?(row), sortable?, className?, exportable? }]
 *   value(row) is used for sorting, searching and CSV export (falls back to row[key]).
 */
const cellValue = (column, row) => (column.value ? column.value(row) : row[column.key]);

const compare = (a, b) => {
  if (a == null) return 1;
  if (b == null) return -1;
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  return String(a).localeCompare(String(b), 'ar');
};

const downloadCsv = (filename, columns, rows) => {
  const exportable = columns.filter((column) => column.exportable !== false && column.header);
  const escape = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;
  const lines = [
    exportable.map((column) => escape(column.header)).join(','),
    ...rows.map((row) => exportable.map((column) => escape(cellValue(column, row))).join(',')),
  ];
  // BOM so Excel opens Arabic text correctly
  const blob = new Blob([`﻿${lines.join('\r\n')}`], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};

const DataTable = ({
  columns,
  rows,
  loading,
  error,
  onRetry,
  searchPlaceholder = 'بحث...',
  pageSize = 10,
  initialSort,
  emptyTitle = 'لا توجد سجلات بعد',
  emptyDescription,
  emptyAction,
  toolbar,
  summary,
  exportName,
  rowKey = (row) => row.id,
}) => {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState(initialSort || null);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    let result = rows || [];
    if (term) {
      result = result.filter((row) =>
        columns.some((column) => String(cellValue(column, row) ?? '').toLowerCase().includes(term))
      );
    }
    if (sort) {
      const column = columns.find((col) => col.key === sort.key);
      if (column) {
        result = [...result].sort((a, b) => compare(cellValue(column, a), cellValue(column, b)) * (sort.dir === 'desc' ? -1 : 1));
      }
    }
    return result;
  }, [rows, columns, query, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, pageCount);
  const pageRows = filtered.slice((current - 1) * pageSize, current * pageSize);

  useEffect(() => setPage(1), [query, rows]);

  const toggleSort = (key) =>
    setSort((prev) => (prev?.key === key ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' }));

  const hasRows = (rows || []).length > 0;

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 p-4 print:hidden">
        <div className="relative min-w-[200px] flex-1 sm:max-w-xs">
          <FiSearch className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            className="w-full rounded-xl border border-slate-300 bg-white py-2 pl-3 pr-9 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
        {toolbar}
        {exportName && hasRows && (
          <Button variant="secondary" size="sm" icon={FiDownload} onClick={() => downloadCsv(exportName, columns, filtered)} className="mr-auto">
            تصدير CSV
          </Button>
        )}
      </div>

      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={onRetry} />
      ) : !hasRows ? (
        <EmptyState title={emptyTitle} description={emptyDescription} action={emptyAction} />
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-right text-sm">
              <thead className="bg-slate-50 text-xs font-bold uppercase text-slate-500">
                <tr>
                  {columns.map((column) => (
                    <th key={column.key} scope="col" className={`px-4 py-3 ${column.className || ''}`}>
                      {column.sortable ? (
                        <button type="button" onClick={() => toggleSort(column.key)} className="inline-flex items-center gap-1 hover:text-slate-800">
                          {column.header}
                          {sort?.key === column.key && (sort.dir === 'asc' ? <FiChevronUp /> : <FiChevronDown />)}
                        </button>
                      ) : (
                        column.header
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pageRows.length ? (
                  pageRows.map((row) => (
                    <tr key={rowKey(row)} className="transition hover:bg-slate-50/70">
                      {columns.map((column) => (
                        <td key={column.key} className={`px-4 py-3 text-slate-700 ${column.className || ''}`}>
                          {column.render ? column.render(row) : cellValue(column, row) ?? '—'}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={columns.length} className="px-4 py-10 text-center text-slate-500">
                      لا توجد نتائج مطابقة للبحث.
                    </td>
                  </tr>
                )}
              </tbody>
              {summary && <tfoot className="border-t-2 border-slate-200 bg-slate-50 font-bold text-slate-900">{summary(filtered)}</tfoot>}
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-4 py-3 text-sm text-slate-500 print:hidden">
            <span>
              {filtered.length} سجل{query && ` (من أصل ${rows.length})`}
            </span>
            {pageCount > 1 && (
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="icon" onClick={() => setPage(current - 1)} disabled={current === 1} aria-label="الصفحة السابقة">
                  <FiChevronRight />
                </Button>
                <span className="min-w-[70px] text-center">
                  {current} / {pageCount}
                </span>
                <Button variant="secondary" size="icon" onClick={() => setPage(current + 1)} disabled={current === pageCount} aria-label="الصفحة التالية">
                  <FiChevronLeft />
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </Card>
  );
};

export default DataTable;
