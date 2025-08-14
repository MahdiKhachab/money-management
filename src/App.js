// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Layout from "./layout/Layout";
import LoginPage from "./features/auth/LoginPage";
import AdminPage from './components/AdminPage'; // Import the new admin page

import IncomesPage from "./features/incomes/IncomeList";
import DonorsPage from "./features/donors/DonorList";
import ExpensesPage from "./features/expenses/ExpenseList";
import MonthlyReport from "./features/reports/monthly/MonthlyReport";
import AnnualReport from "./features/reports/annual/AnnualReport";
import DonorForm from "./features/donors/DonorForm";
import IncomeForm from "./features/incomes/IncomForm";
import ExpenseForm from "./features/expenses/ExpenseForm";

import PublicLayout from "./layout/PublicLayout";
import AboutPage from "./features/public/AboutPage";
import NewsPage from "./features/public/NewsPage";
import HomePage from "./features/public/HomePage";
import ActivityPage from "./features/public/ActivityPage";


import DetailPage from './features/public/DetailPage';


function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <Router>
      <AppRoutes token={token} setToken={setToken} />
    </Router>
  );
}

function AppRoutes({ token, setToken }) {
  const navigate = useNavigate();

  const handleLogin = (newToken, username) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("username", username);
    setToken(newToken);
    navigate("/donors/list");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken(null);
    navigate("/"); // Redirect to public page on logout
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/activity" element={<ActivityPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/details/:id" element={<DetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      </Route>
      
      {/* Protected Routes - These require a token */}
      {token ? (
        <Route path="/" element={<Layout onLogout={handleLogout} />}>
          {/* Admin Page */}
          <Route path="admin" element={<AdminPage />} />

          {/* Donors */}
          <Route path="donors/list" element={<DonorsPage />} />
          <Route path="donors/card" element={<DonorForm />} />

          {/* Incomes */}
          <Route path="incomes/list" element={<IncomesPage />} />
          <Route path="incomes/card" element={<IncomeForm />} />

          {/* Expenses */}
          <Route path="expenses/list" element={<ExpensesPage />} />
          <Route path="expenses/card" element={<ExpenseForm />} />

          {/* Reports */}
          <Route path="reports/monthly" element={<MonthlyReport month={12} year={2025} />} />
          <Route path="reports/annual" element={<AnnualReport year={2025} />} />

          {/* Redirect unknown paths */}
          <Route path="*" element={<Navigate to="/donors/list" />} />
        </Route>
      ) : (
        // Redirect any private route attempt to the public page if not authenticated
        <Route path="*" element={<Navigate to="/" />} />
      )}
    </Routes>
  );
}

export default App;
