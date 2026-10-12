import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import RequireAuth from './auth/RequireAuth';
import { LoadingState, ToastProvider } from './components/ui';

import PublicLayout from './layout/PublicLayout';
import HomePage from './features/public/HomePage';
import NewsPage from './features/public/NewsPage';
import ActivityPage from './features/public/ActivityPage';
import AboutPage from './features/public/AboutPage';
import DetailPage from './features/public/DetailPage';
import NotFoundPage from './features/public/NotFoundPage';
import LoginPage from './features/auth/LoginPage';

// Admin area is code-split so public visitors never download it.
const AdminLayout = lazy(() => import('./features/admin/AdminLayout'));
const DashboardPage = lazy(() => import('./features/admin/dashboard/DashboardPage'));
const DonorsPage = lazy(() => import('./features/admin/donors/DonorsPage'));
const DonorFormPage = lazy(() => import('./features/admin/donors/DonorFormPage'));
const IncomesPage = lazy(() => import('./features/admin/incomes/IncomesPage'));
const IncomeFormPage = lazy(() => import('./features/admin/incomes/IncomeFormPage'));
const ExpensesPage = lazy(() => import('./features/admin/expenses/ExpensesPage'));
const ExpenseFormPage = lazy(() => import('./features/admin/expenses/ExpenseFormPage'));
const MaintenancePage = lazy(() => import('./features/admin/maintenance/MaintenancePage'));
const MaintenanceFormPage = lazy(() => import('./features/admin/maintenance/MaintenanceFormPage'));
const ContentPage = lazy(() => import('./features/admin/content/ContentPage'));
const ContentFormPage = lazy(() => import('./features/admin/content/ContentFormPage'));
const ReportsPage = lazy(() => import('./features/admin/reports/ReportsPage'));
const UsersPage = lazy(() => import('./features/admin/users/UsersPage'));

// list + create + edit routes for one admin module
const crudRoutes = (path, List, Form) => [
  <Route key={path} path={path} element={<List />} />,
  <Route key={`${path}/new`} path={`${path}/new`} element={<Form />} />,
  <Route key={`${path}/edit`} path={`${path}/:id/edit`} element={<Form />} />,
];

export const AppRoutes = () => (
  <Suspense fallback={<LoadingState />}>
    <Routes>
      {/* Public website */}
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="activity" element={<ActivityPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="details/:id" element={<DetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route path="login" element={<LoginPage />} />

      {/* Internal management (login required) */}
      <Route path="admin" element={<RequireAuth />}>
        <Route element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          {crudRoutes('donors', DonorsPage, DonorFormPage)}
          {crudRoutes('incomes', IncomesPage, IncomeFormPage)}
          {crudRoutes('expenses', ExpensesPage, ExpenseFormPage)}
          {crudRoutes('maintenance', MaintenancePage, MaintenanceFormPage)}
          {crudRoutes('content', ContentPage, ContentFormPage)}
          <Route path="reports" element={<ReportsPage />} />
          <Route element={<RequireAuth role="ADMIN" />}>
            <Route path="users" element={<UsersPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>
      </Route>
    </Routes>
  </Suspense>
);

const App = () => (
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <ToastProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ToastProvider>
  </BrowserRouter>
);

export default App;
