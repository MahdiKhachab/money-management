import React, { useState } from 'react';
import DonorForm from '../features/donors/DonorForm';
import DonorList from '../features/donors/DonorList';

const DonorsPage = () => {
  const [reloadFlag, setReloadFlag] = useState(false);

  const refreshDonorList = () => {
    setReloadFlag((prev) => !prev);
  };

  return (
    <div>
      <h1>Donors Management</h1>
      <DonorForm onDonorCreated={refreshDonorList} />
      <DonorList key={reloadFlag} />
    </div>
  );
};

export default DonorsPage;
