import React, { useEffect, useState } from 'react';
import { fetchIncomes } from '../../api/incomeService';

const IncomeList = () => {
  const [incomes, setIncomes] = useState([]);

  const loadIncomes = async () => {
    try {
      const res = await fetchIncomes();
      setIncomes(res.data);
    } catch (err) {
      console.error('فشل في تحميل البيانات:', err);
    }
  };

  useEffect(() => {
    loadIncomes();
  }, []);

  const translateSourceType = (type) => {
    const map = {
      CASH: "نقدًا",
      BANK_TRANSFER: "تحويل بنكي",
      CHECK: "شيك",
      ONLINE: "إلكتروني",
      OTHER: "أخرى"
    };
    return map[type] || type;
  };
  
  return (
    <div className="bg-white shadow rounded p-6">
      <h2 className="text-lg font-bold mb-4">قائمة الإيرادات</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">#</th>
            <th className="border p-2">نوع المصدر</th>
            <th className="border p-2">الوصف</th>
            <th className="border p-2">اسم المتبرع</th>
            <th className="border p-2">المبلغ</th>
            <th className="border p-2">التاريخ</th>
          </tr>
        </thead>
        <tbody>
          {incomes.length > 0 ? (
            incomes.map((income, idx) => (
              <tr key={income.id}>
                <td className="border p-2">{idx + 1}</td>
                <td>{translateSourceType(income.sourceType)}</td>
                <td className="border p-2">{income.description || '-'}</td>
                <td className="border p-2">{income.donorName || '-'}</td>
                <td className="border p-2">{income.amount}</td>
                <td className="border p-2">{income.dateReceived}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center p-4">لا توجد بيانات.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default IncomeList;
