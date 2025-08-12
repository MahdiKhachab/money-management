import React, { useEffect, useState } from 'react';
import { fetchDonors, deleteDonor } from '../../api/donorService'; // make sure deleteDonor exists
import { FiSearch, FiTrash2 } from 'react-icons/fi';

const DonorList = () => {
  const [donors, setDonors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [donorToDelete, setDonorToDelete] = useState(null);
  const [error, setError] = useState('');

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

  const handleDeleteClick = (donor) => {
    setDonorToDelete(donor);
    setShowConfirmDialog(true);
    setError('');
  };

  const confirmDelete = async () => {
    if (!donorToDelete) return;
    try {
      await deleteDonor(donorToDelete.id);
      setShowConfirmDialog(false);
      setDonorToDelete(null);
      loadDonors();
    } catch (err) {
      setError('حدث خطأ أثناء حذف المتبرع.');
      console.error(err);
    }
  };

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
            <th className="border p-2">حذف</th>
          </tr>
        </thead>
        <tbody>
          {filteredDonors.length > 0 ? (
            filteredDonors.map((donor, idx) => (
              <tr key={donor.id || idx}>
                <td className="border p-2">{donor.id}</td>
                <td className="border p-2">{donor.fullName}</td>
                <td className="border p-2">{donor.phone}</td>
                <td className="border p-2">{donor.email}</td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => handleDeleteClick(donor)}
                    className="text-red-600 hover:text-red-800"
                    aria-label={`حذف المتبرع ${donor.fullName}`}
                  >
                    <FiTrash2 size={20} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4">لا يوجد متبرعين.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-96 text-center">
            <h3 className="text-lg font-bold mb-4 text-red-600">⚠️ تأكيد الحذف</h3>
            <p className="mb-6">
              هل أنت متأكد من حذف المتبرع <strong>{donorToDelete?.fullName}</strong>؟ لا يمكن التراجع عن هذا الإجراء.
            </p>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                حذف
              </button>
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
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

export default DonorList;
