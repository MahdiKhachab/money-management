import React, { useState } from 'react';
import { getMonthlyReport } from '../../../api/reportService';

const MonthlyReport = () => {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');

  const handleFetchReport = async () => {
    setError('');
    setReport(null);

    if (!year || !month) {
      setError('يرجى إدخال كل من السنة والشهر.');
      return;
    }

    try {
      const response = await getMonthlyReport(parseInt(year), parseInt(month));
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
      <h2 className="text-lg font-bold mb-4">📊 التقرير الشهري</h2>

      <div className="mb-4">
        <label className="block mb-1">السنة</label>
        <input
          type="number"
          placeholder="مثال: 2025"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">الشهر</label>
        <input
          type="number"
          placeholder="1 - 12"
          min="1"
          max="12"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="w-full border p-2 rounded"
          required
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
          <p><strong>الشهر:</strong> {report.month}</p>
          <p><strong>إجمالي الإيرادات:</strong> {report.totalIncome}</p>
          <p><strong>إجمالي المصروفات:</strong> {report.totalExpense}</p>
          <p><strong>الرصيد الصافي:</strong> {report.netBalance}</p>
        </div>
      )}
    </form>
  );
};

export default MonthlyReport;
