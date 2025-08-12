import React, { useEffect, useState } from 'react';
import { fetchIncomes, deleteIncome } from '../../api/incomeService';
import { FiTrash2 } from 'react-icons/fi';

const IncomeList = () => {
  const [incomes, setIncomes] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

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

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteIncome(selectedId);
      setShowDialog(false);
      setSelectedId(null);
      loadIncomes();
    } catch (err) {
      console.error('فشل في الحذف:', err);
    }
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
            <th className="border p-2">إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {incomes.length > 0 ? (
            incomes.map((income, idx) => (
              <tr key={income.id}>
                <td className="border p-2">{idx + 1}</td>
                <td className="border p-2">{translateSourceType(income.sourceType)}</td>
                <td className="border p-2">{income.description || '-'}</td>
                <td className="border p-2">{income.donorName || '-'}</td>
                <td className="border p-2">{income.amount}</td>
                <td className="border p-2">{income.dateReceived}</td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => handleDeleteClick(income.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center p-4">لا توجد بيانات.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Dialog التأكيد */}
      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80 text-center">
            <p className="mb-4">هل أنت متأكد من حذف هذا السجل؟</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                نعم
              </button>
              <button
                onClick={() => setShowDialog(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
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

export default IncomeList;
