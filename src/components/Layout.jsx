// src/components/Layout.jsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-4">
        <h1 className="text-2xl font-bold mb-6">💙 القائمة</h1>
        <nav className="space-y-4">
          <Link to="/donors" className="block hover:text-blue-300">المتبرعين</Link>
          <Link to="/incomes" className="block hover:text-blue-300">الإيرادات</Link>
          <Link to="/expenses" className="block hover:text-blue-300">المصروفات</Link>
          <Link to="/reports/monthly" className="block hover:text-blue-300"> التقارير الشهرية</Link>
          <Link to="/reports/annual" className="block hover:text-blue-300">التقارير السنوية</Link>
        </nav>
      </aside>

      {/* Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow p-4 text-right text-xl font-bold text-blue-800">
          جمعية الزهراء الثقافية
        </header>

        {/* Quranic Verse */}
        <div className="bg-blue-50 text-blue-900 p-4 text-center text-lg font-semibold italic mx-6 my-4 rounded-md" dir="rtl">
          وَتَجْرِةٌ مَّعَ اللَّهِ ۖ وَمَا هِيَ بِخَسَارَةٍ<br />
          <span className="text-sm font-normal">سورة الفرقان - 25:58</span>
        </div>

        {/* Main Content */}
        <main className="p-6 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
