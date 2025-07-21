// src/features/expenses/ExpenseForm.jsx
import React, { useState } from 'react';
import { createExpense } from '../../api/expenseService';

const categoryOptions = [
  { value: 'MAINTENANCE', label: 'صيانة' },
  { value: 'EVENT', label: 'فعالية' },
  { value: 'ELECTRICITY', label: 'كهرباء' },
  { value: 'MOSQUE_SUPPLY', label: 'مستلزمات المسجد' },
  { value: 'STAFF', label: 'الموظفين' },
  { value: 'OTHER', label: 'أخرى' },
];

const ExpenseForm = ({ onExpenseCreated }) => {
  const [details, setDetails] = useState('');
  const [amount, setAmount] = useState('');
  const [dateSpent, setDateSpent] = useState('');
  const [category, setCategory] = useState('OTHER');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const expenseDTO = {
        amount: parseFloat(amount),
        category,
        details,
        dateSpent,
      };

      await createExpense(expenseDTO);
      alert('تمت إضافة المصروف بنجاح!');
      setDetails('');
      setAmount('');
      setDateSpent('');
      setCategory('OTHER');
      onExpenseCreated();
    } catch (error) {
      alert('فشل في إضافة المصروف');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6 mb-6">
      <h2 className="text-lg font-bold mb-4">إضافة مصروف جديد</h2>

      <div className="mb-4">
        <label className="block mb-1">التفاصيل</label>
        <input
          type="text"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">المبلغ</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">تاريخ الصرف</label>
        <input
          type="date"
          value={dateSpent}
          onChange={(e) => setDateSpent(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">الفئة</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-2 rounded"
          required
        >
          {categoryOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
        إضافة
      </button>
    </form>
  );
};

export default ExpenseForm;
