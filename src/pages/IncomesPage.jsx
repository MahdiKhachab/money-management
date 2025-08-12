// src/features/incomes/IncomesPage.jsx
import React, { useState } from 'react';
import IncomForm from '../features/icomes/IncomForm';
import IncomeList from '../features/icomes/IncomeList';

const IncomesPage = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleIncomeCreated = () => {
    // تغيير refreshKey لإجبار IncomeList على إعادة التحميل
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div>
      <IncomForm onIncomeCreated={handleIncomeCreated} />
      <IncomeList key={refreshKey} />
    </div>
  );
};

export default IncomesPage;
