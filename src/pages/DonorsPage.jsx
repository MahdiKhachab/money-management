// src/features/donors/DonorsPage.jsx
import React, { useState } from 'react';
import DonorForm from '../features/donors/DonorForm';
import DonorList from '../features/donors/DonorList';

const DonorsPage = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleDonorCreated = () => {
    // يغير الـ key عشان يرندر الـ DonorList من جديد
    setRefreshKey(prevKey => prevKey + 1);
  };

  return (
    <div>
      <DonorForm onDonorCreated={handleDonorCreated} />
      {/* تمرير الـ key يجبر القائمة تعمل إعادة تحميل */}
      <DonorList key={refreshKey} />
    </div>
  );
};

export default DonorsPage;
