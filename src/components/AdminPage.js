// src/components/AdminPage.js
import React, { useState } from 'react';
import { createPublicContent } from '../api/publicContentService';

const AdminPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'ABOUT', // Default type
    attachment: null,
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, attachment: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('يرجى تسجيل الدخول كمسؤول');
      return;
    }

    try {
      await createPublicContent(formData, token);
      setMessage('تم إضافة المحتوى بنجاح!');
      // Reset form
      setFormData({ title: '', description: '', type: 'ABOUT', attachment: null });
    } catch (err) {
      setError(err.message || 'حدث خطأ أثناء إضافة المحتوى');
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-lg" dir="rtl">
      <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">صفحة إدارة المحتوى العام</h2>
      
      {message && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">{message}</div>}
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">العنوان</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">الوصف</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg h-32"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">نوع المحتوى</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            <option value="ABOUT">عن الجمعية</option>
            <option value="NEWS">أخبار</option>
            <option value="ACTIVITY">نشاط</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">صورة/مرفق</label>
          <input
            type="file"
            name="attachment"
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-900 text-white p-3 rounded-lg hover:bg-blue-800 transition-colors font-bold"
        >
          إضافة المحتوى
        </button>
      </form>
    </div>
  );
};

export default AdminPage;
