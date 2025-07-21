import React, { useState } from 'react';
import { createIncome } from '../../api/incomeService';

const IncomeForm = ({ onIncomeCreated }) => {
  const [sourceType, setSource] = useState('');
  const [amount, setAmount] = useState('');
  const [dateReceived, setDateReceived] = useState('');
  const [description, setDescription] = useState('');
  const [donorId, setDonorId] = useState('');

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
      alert('تمت إضافة الإيراد بنجاح!');
      setSource('');
      setAmount('');
      setDateReceived('');
      setDescription('');
      setDonorId('');
      onIncomeCreated(); // إعادة تحميل القائمة
    } catch (error) {
      alert('حدث خطأ أثناء الإضافة');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6 mb-6">
      <h2 className="text-lg font-bold mb-4">إضافة إيراد جديد</h2>

      <div className="mb-4">
        <label className="block mb-1">نوع المصدر</label>
        <select value={sourceType} onChange={(e) => setSource(e.target.value)}
          className="w-full border p-2 rounded" required>
          <option value="">اختر المصدر</option>
          <option value="CASH">نقداً</option>
          <option value="BANK_TRANSFER">تحويل بنكي</option>
          <option value="CHECK">شيك</option>
          <option value="ONLINE">إلكتروني</option>
          <option value="OTHER">أخرى</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">المبلغ</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
          className="w-full border p-2 rounded" required />
      </div>

      <div className="mb-4">
        <label className="block mb-1">تاريخ الاستلام</label>
        <input type="date" value={dateReceived} onChange={(e) => setDateReceived(e.target.value)}
          className="w-full border p-2 rounded" required />
      </div>

      <div className="mb-4">
        <label className="block mb-1">الوصف</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded" rows="3" />
      </div>

      <div className="mb-4">
        <label className="block mb-1">معرّف المتبرع (Donor ID)</label>
        <input type="number" value={donorId} onChange={(e) => setDonorId(e.target.value)}
          className="w-full border p-2 rounded" />
      </div>

      <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">
        إضافة
      </button>
    </form>
  );
};

export default IncomeForm;
