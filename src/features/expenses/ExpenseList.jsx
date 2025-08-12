import React, { useState, useEffect } from 'react';
import { deleteExpense, fetchExpenses } from '../../api/expenseService';
import { FaTrash } from 'react-icons/fa';

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
  const [loading, setLoading] = useState(true);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const loadExpenses = async () => {
    try {
      setLoading(true);
      const data = await fetchExpenses();
      // Log the shape to confirm what you’re getting
      console.log('Expenses API response:', data);

      // Extract the array no matter how the API structures it
      const items = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.content)
        ? data.content
        : Array.isArray(data?.items)
        ? data.items
        : [];

      setExpenses(items);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowConfirmDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteExpense(deleteId);
      setShowConfirmDialog(false);
      await loadExpenses();
    } catch (error) {
      console.error(error);
      setShowConfirmDialog(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    });
  };

  const formatAmount = (amount) => {
    const num = typeof amount === 'number' ? amount : Number(amount);
    if (Number.isNaN(num)) return '€0.00';
    return `€${num.toFixed(2)}`;
  };

  const hasExpenses = Array.isArray(expenses) && expenses.length > 0;

  return (
    <div className="bg-white shadow rounded p-6">
      <h2 className="text-lg font-bold mb-4">قائمة المصروفات</h2>

      {loading ? (
        <p className="text-center p-4">جاري التحميل...</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">#</th>
              <th className="border p-2">الفئة</th>
              <th className="border p-2">التفاصيل</th>
              <th className="border p-2">المبلغ</th>
              <th className="border p-2">التاريخ</th>
              <th className="border p-2">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {hasExpenses ? (
              expenses.map((expense, idx) => (
                <tr key={expense.id ?? idx}>
                  <td className="border p-2">{idx + 1}</td>
                  <td className="border p-2">
                    {categoryLabels[expense?.category] ?? expense?.category ?? '-'}
                  </td>
                  <td className="border p-2">{expense?.details ?? '-'}</td>
                  <td className="border p-2">{formatAmount(expense?.amount)}</td>
                  <td className="border p-2">{formatDate(expense?.dateSpent)}</td>
                  <td className="border p-2 text-center">
                    <button
                      onClick={() => handleDeleteClick(expense?.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  لا توجد مصروفات.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h3 className="text-lg font-bold mb-4 text-center">تأكيد الحذف</h3>
            <p className="text-center mb-6">هل أنت متأكد من حذف هذا المصروف؟</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                نعم
              </button>
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;