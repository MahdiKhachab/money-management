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
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

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

      // إظهار رسالة النجاح
      setShowSuccessDialog(true);

      // تفريغ الحقول
      setDetails('');
      setAmount('');
      setDateSpent('');
      setCategory('OTHER');

      // تحديث القائمة
      if (typeof onExpenseCreated === 'function') {
        onExpenseCreated();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6 mb-6 max-w-lg mx-auto">
        <h2 className="text-lg font-bold mb-6 text-center">إضافة مصروف جديد</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block mb-1 font-semibold">المبلغ</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">تاريخ الصرف</label>
            <input
              type="date"
              value={dateSpent}
              onChange={(e) => setDateSpent(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 font-semibold">الفئة</label>
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

          <div className="md:col-span-2">
            <label className="block mb-1 font-semibold">التفاصيل</label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full border p-2 rounded resize-y"
              rows={4}
              required
              placeholder="أدخل تفاصيل المصروف هنا"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 w-full"
        >
          إضافة
        </button>
      </form>


      {/* Dialog نجاح */}
      {showSuccessDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-96 text-center">
            <h3 className="text-lg font-bold mb-4">✅ تمت الإضافة بنجاح</h3>
            <p className="mb-6">تمت إضافة المصروف إلى القائمة بنجاح.</p>
            <button
              onClick={() => setShowSuccessDialog(false)}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              تم
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ExpenseForm;
