import React, { useState } from 'react';
import { createDonor } from '../../api/donorService';

const DonorForm = ({ onDonorCreated }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createDonor({ fullName, phone, email });
      alert('تمت إضافة المتبرع بنجاح!');
      setFullName('');
      setPhone('');
      setEmail('');
      onDonorCreated?.();
    } catch (error) {
      alert('فشل في إضافة المتبرع');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6 mb-6">
      <h2 className="text-lg font-bold mb-4">إضافة متبرع جديد</h2>

      <div className="mb-4">
        <label className="block mb-1">الاسم الكامل</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="مثال: محمد عبد الله"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">رقم الهاتف</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="0912345678"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">البريد الإلكتروني</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="example@email.com"
        />
      </div>

      <button
        type="submit"
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        إضافة
      </button>
    </form>
  );
};

export default DonorForm;
