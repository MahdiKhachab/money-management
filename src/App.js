import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import LoginPage from "./features/auth/LoginPage";

import IncomesPage from "./features/incomes/IncomeList";
import DonorsPage from "./features/donors/DonorList";
import ExpensesPage from "./features/expenses/ExpenseList";
import MonthlyReport from "./features/reports/monthly/MonthlyReport";
import AnnualReport from "./features/reports/annual/AnnualReport";
import DonorForm from "./features/donors/DonorForm";
import IncomeForm from "./features/incomes/IncomForm";
import ExpenseForm from "./features/expenses/ExpenseForm";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <Router>
      <Routes>
        {!token ? (
          <Route path="*" element={<LoginPage onLogin={handleLogin} />} />
        ) : (
          <Route path="/" element={<Layout onLogout={handleLogout} />}>
            {/* Donors */}
            <Route path="/donors/list" element={<DonorsPage />} />
            <Route path="/donors/card" element={<DonorForm />} />

            {/* Incomes */}
            <Route path="/incomes/list" element={<IncomesPage />} />
            <Route path="/incomes/card" element={<IncomeForm />} />

            {/* Expenses */}
            <Route path="/expenses/list" element={<ExpensesPage />} />
            <Route path="/expenses/card" element={<ExpenseForm />} />

            {/* Reports */}
            <Route path="/reports/monthly" element={<MonthlyReport month={12} year={2025} />} />
            <Route path="/reports/annual" element={<AnnualReport year={2025} />} />

            {/* Redirect any unknown path */}
            <Route path="*" element={<Navigate to="/donors/list" />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
}

export default App;
