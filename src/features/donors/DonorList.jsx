import React, { useEffect, useState } from 'react';
import { fetchDonors } from '../../api/donorService';
import { FiSearch } from 'react-icons/fi';

const DonorList = () => {
  const [donors, setDonors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const loadDonors = async () => {
    try {
      const response = await fetchDonors();
      setDonors(response.data);
    } catch (error) {
      console.error('فشل في تحميل المتبرعين:', error);
    }
  };

  useEffect(() => {
    loadDonors();
  }, []);

  const filteredDonors = donors.filter((donor) =>
    (donor.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (donor.phone || '').includes(searchTerm)
  );

  return (
    <div className="bg-white shadow rounded p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">📋 قائمة المتبرعين</h2>
        <div className="relative w-full max-w-xs">
          <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="بحث بالاسم أو الهاتف..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 w-full"
          />
        </div>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">#</th>
            <th className="border p-2">الاسم</th>
            <th className="border p-2">الهاتف</th>
            <th className="border p-2">البريد الإلكتروني</th>
          </tr>
        </thead>
        <tbody>
          {filteredDonors.length > 0 ? (
            filteredDonors.map((donor, idx) => (
              <tr key={donor.id || idx}>
                <td className="border p-2">{idx + 1}</td>
                <td className="border p-2">{donor.fullName}</td>
                <td className="border p-2">{donor.phone}</td>
                <td className="border p-2">{donor.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-4">لا يوجد متبرعين.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DonorList;
