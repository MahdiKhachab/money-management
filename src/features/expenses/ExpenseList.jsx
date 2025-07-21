import React, { useEffect, useState } from 'react';
import { fetchExpenses } from '../../api/expenseService';

const categoryLabels = {
  MAINTENANCE: 'صيانة',
  EVENT: 'فعالية',
  ELECTRICITY: 'كهرباء',
  MOSQUE_SUPPLY: 'مستلزمات المسجد',
  STAFF: 'الموظفين',
  OTHER: 'أخرى',
};

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  const loadExpenses = async () => {
    try {
      const res = await fetchExpenses();
      setExpenses(res.data);
    } catch (error) {
      if (error.response && error.response.status === 201) {
        alert('تمت إضافة المصروف بنجاح (باستثناء الاستجابة)!');
      } else {
        alert('فشل في إضافة المصروف');
        console.error(error);
      }
    }
  };

  

  useEffect(() => {
    loadExpenses();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    }); // Example: 21 Jul 2025
  };

  const formatAmount = (amount) => {
    return `€${amount.toFixed(2)}`;
  };

  return (
    <div className="bg-white shadow rounded p-6">
      <h2 className="text-lg font-bold mb-4">قائمة المصروفات</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">#</th>
            <th className="border p-2">الفئة</th>
            <th className="border p-2">التفاصيل</th>
            <th className="border p-2">المبلغ</th>
            <th className="border p-2">التاريخ</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length > 0 ? (
            expenses.map((expense, idx) => (
              <tr key={expense.id || idx}>
                <td className="border p-2">{idx + 1}</td>
                <td className="border p-2">{categoryLabels[expense.category]}</td>
                <td className="border p-2">{expense.details}</td>
                <td className="border p-2">{formatAmount(expense.amount)}</td>
                <td className="border p-2">{formatDate(expense.dateSpent)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4">لا توجد مصروفات.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
