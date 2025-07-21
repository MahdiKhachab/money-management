// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import DonorList from './features/donors/DonorList';
import DonorForm from './features/donors/DonorForm';

import IncomForm from './features/icomes/IncomForm';
import IncomeList from './features/icomes/IncomeList';

import ExpenseForm from './features/expenses/ExpenseForm';
import ExpenseList from './features/expenses/ExpenseList';

import MonthlyReport from './features/reports/monthly/MonthlyReport'; // استيراد صفحة التقرير

import AnnualReport from './features/reports/annual/AnnualReport'; // استيراد صفحة التقرير


// لاحقاً نضيف بقية الصفحات

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/donors" element={<><DonorForm onDonorCreated={() => {}} /><DonorList /></>} />
          <Route path="/incomes" element={<><IncomForm onDonorCreated={() => {}} /><IncomeList /></>} />
          <Route path="/expenses" element={<><ExpenseForm onDonorCreated={() => {}} /><ExpenseList /></>} />
          <Route path="/reports/monthly" element={<MonthlyReport month={12} year={2025} />} /> {/* إضافة التقارير */}
          <Route path="/reports/annual" element={<AnnualReport year={2025} />} /> {/* إضافة التقارير */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
