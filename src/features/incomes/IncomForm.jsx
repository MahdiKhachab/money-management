import React, { useState } from 'react';
import { createIncome } from '../../api/incomeService';

const IncomeForm = ({ onIncomeCreated }) => {
  const [sourceType, setSource] = useState('');
  const [amount, setAmount] = useState('');
  const [dateReceived, setDateReceived] = useState('');
  const [description, setDescription] = useState('');
  const [donorId, setDonorId] = useState('');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createIncome({
        sourceType,
        amount: parseFloat(amount),
        dateReceived,
        description,
        donorId: donorId ? parseInt(donorId) : null
      });

      // Show success dialog
      setShowSuccessDialog(true);

      // Clear form fields
      setSource('');
      setAmount('');
      setDateReceived('');
      setDescription('');
      setDonorId('');

      if (typeof onIncomeCreated === 'function') {
        onIncomeCreated(); // reload list
      }
    } catch (error) {
      alert('حدث خطأ أثناء الإضافة');
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6 mb-6 max-w-lg mx-auto">
        <h2 className="text-lg font-bold mb-6 text-center">إضافة إيراد جديد</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block mb-1 font-semibold">نوع المصدر</label>
            <select
              value={sourceType}
              onChange={(e) => setSource(e.target.value)}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">اختر المصدر</option>
              <option value="CASH">نقداً</option>
              <option value="BANK_TRANSFER">تحويل بنكي</option>
              <option value="CHECK">شيك</option>
              <option value="ONLINE">إلكتروني</option>
              <option value="OTHER">أخرى</option>
            </select>
          </div>

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
            <label className="block mb-1 font-semibold">تاريخ الاستلام</label>
            <input
              type="date"
              value={dateReceived}
              onChange={(e) => setDateReceived(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">معرّف المتبرع (Donor ID)</label>
            <input
              type="number"
              value={donorId}
              onChange={(e) => setDonorId(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 font-semibold">الوصف</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border p-2 rounded resize-y"
              rows={3}
              placeholder="أدخل وصفاً للإيراد"
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


      {/* Success Dialog */}
      {showSuccessDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-96 text-center">
            <h3 className="text-lg font-bold mb-4">✅ تمت الإضافة بنجاح</h3>
            <p className="mb-6">تمت إضافة الإيراد إلى القائمة بنجاح.</p>
            <button
              onClick={() => setShowSuccessDialog(false)}
              className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
            >
              تم
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default IncomeForm;
