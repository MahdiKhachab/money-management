import React, { useState } from 'react';
import { getAnnualReport } from '../../../api/reportService';

const AnnualReport = () => {
  const [year, setYear] = useState('');
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');

  const handleFetchReport = async () => {
    setError('');
    setReport(null);

    if (!year) {
      setError('يرجى إدخال السنة.');
      return;
    }

    try {
      const response = await getAnnualReport(parseInt(year));
      setReport(response.data);
    } catch (err) {
      setError('فشل في جلب التقرير');
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleFetchReport();
      }}
      dir="rtl"
      className="bg-white shadow-md rounded p-6 mb-6 max-w-2xl mx-auto"
    >
      <h2 className="text-lg font-bold mb-4">📊 التقرير السنوي</h2>

      <div className="mb-4">
        <label className="block mb-1">السنة</label>
        <input
          type="number"
          placeholder="مثال: 2025"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        عرض التقرير
      </button>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {report && (
        <div className="bg-gray-100 p-4 rounded mt-6 space-y-2">
          <p><strong>السنة:</strong> {report.year}</p>
          <p><strong>إجمالي الإيرادات:</strong> {report.totalIncome}</p>
          <p><strong>إجمالي المصروفات:</strong> {report.totalExpense}</p>
          <p><strong>إجمالي الصيانة:</strong> {report.totalMaintenance}</p>
          <p><strong>الرصيد الصافي:</strong> {report.netBalance}</p>
        </div>
      )}
    </form>
  );
};

export default AnnualReport;
