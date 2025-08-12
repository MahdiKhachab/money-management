import React, { useState } from 'react';
import { createDonor } from '../../api/donorService';

const DonorForm = ({ onDonorCreated }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createDonor({ fullName, phone, email });

      // Show success dialog
      setShowSuccessDialog(true);

      // Clear form fields
      setFullName('');
      setPhone('');
      setEmail('');

      if (typeof onDonorCreated === 'function') {
        onDonorCreated();
      }
    } catch (error) {
      alert('فشل في إضافة المتبرع');
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6 mb-6 max-w-lg mx-auto">
        <h2 className="text-lg font-bold mb-6 text-center">إضافة متبرع جديد</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block mb-1 font-semibold">الاسم الكامل</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="مثال: محمد عبد الله"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">رقم الهاتف</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="0912345678"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 font-semibold">البريد الإلكتروني</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="example@email.com"
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
            <p className="mb-6">تمت إضافة المتبرع إلى القائمة بنجاح.</p>
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

export default DonorForm;
