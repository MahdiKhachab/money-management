// src/components/Layout.jsx
import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  const [showDonors, setShowDonors] = useState(false);
  const [showIncomes, setShowIncomes] = useState(false);
  const [showExpenses, setShowExpenses] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleSubMenu = (menu) => {
    // Close all other menus before opening the selected one
    if (menu === 'donors') {
      setShowDonors(!showDonors);
      setShowIncomes(false);
      setShowExpenses(false);
    } else if (menu === 'incomes') {
      setShowIncomes(!showIncomes);
      setShowDonors(false);
      setShowExpenses(false);
    } else if (menu === 'expenses') {
      setShowExpenses(!showExpenses);
      setShowDonors(false);
      setShowIncomes(false);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header with Navigation */}
      <header className="bg-blue-900 text-white p-4 shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">جمعية الزهراء الثقافية</h1>
          
          {/* Hamburger Menu Button for Mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white md:hidden focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 text-sm">
            {/* Donors Dropdown */}
            <div className="relative group">
              <button
                className="py-2 px-3 hover:bg-blue-800 rounded-md transition-colors"
                onClick={() => toggleSubMenu('donors')}
              >
                المتبرعين
              </button>
              {showDonors && (
                <div className="absolute right-0 mt-2 w-48 bg-blue-800 rounded-md shadow-lg py-1 z-20">
                  <Link to="/donors/list" className="block px-4 py-2 hover:bg-blue-700" onClick={closeMenu}>قائمة المتبرعين</Link>
                  <Link to="/donors/card" className="block px-4 py-2 hover:bg-blue-700" onClick={closeMenu}>بطاقة المتبرع</Link>
                </div>
              )}
            </div>

            {/* Incomes Dropdown */}
            <div className="relative group">
              <button
                className="py-2 px-3 hover:bg-blue-800 rounded-md transition-colors"
                onClick={() => toggleSubMenu('incomes')}
              >
                الإيرادات
              </button>
              {showIncomes && (
                <div className="absolute right-0 mt-2 w-48 bg-blue-800 rounded-md shadow-lg py-1 z-20">
                  <Link to="/incomes/list" className="block px-4 py-2 hover:bg-blue-700" onClick={closeMenu}>قائمة الإيرادات</Link>
                  <Link to="/incomes/card" className="block px-4 py-2 hover:bg-blue-700" onClick={closeMenu}>بطاقة الإيراد</Link>
                </div>
              )}
            </div>
            
            {/* Expenses Dropdown */}
            <div className="relative group">
              <button
                className="py-2 px-3 hover:bg-blue-800 rounded-md transition-colors"
                onClick={() => toggleSubMenu('expenses')}
              >
                المصروفات
              </button>
              {showExpenses && (
                <div className="absolute right-0 mt-2 w-48 bg-blue-800 rounded-md shadow-lg py-1 z-20">
                  <Link to="/expenses/list" className="block px-4 py-2 hover:bg-blue-700" onClick={closeMenu}>قائمة المصروفات</Link>
                  <Link to="/expenses/card" className="block px-4 py-2 hover:bg-blue-700" onClick={closeMenu}>بطاقة المصروف</Link>
                </div>
              )}
            </div>
            
            {/* Reports Menu */}
            <div className="flex">
              <Link to="/reports/monthly" className="py-2 px-3 hover:bg-blue-800 rounded-md transition-colors">التقارير الشهرية</Link>
              <Link to="/reports/annual" className="py-2 px-3 hover:bg-blue-800 rounded-md transition-colors">التقارير السنوية</Link>
            </div>
          </nav>
        </div>
      </header>
      
      {/* Mobile Dropdown Menu */}
      <div
        className={`bg-blue-800 shadow-md transform transition-all duration-300 ease-in-out z-40 md:hidden ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <nav className="p-4 space-y-2 text-white">
          {/* Donors Menu */}
          <div>
            <button
              className="w-full text-right p-2 hover:bg-blue-700 rounded-md"
              onClick={() => toggleSubMenu('donors')}
            >
              المتبرعين
            </button>
            {showDonors && (
              <div className="pr-4 mt-2 space-y-1">
                <Link to="/donors/list" className="block p-2 hover:bg-blue-700 rounded-md" onClick={closeMenu}>قائمة المتبرعين</Link>
                <Link to="/donors/card" className="block p-2 hover:bg-blue-700 rounded-md" onClick={closeMenu}>بطاقة المتبرع</Link>
              </div>
            )}
          </div>
          
          {/* Incomes Menu */}
          <div>
            <button
              className="w-full text-right p-2 hover:bg-blue-700 rounded-md"
              onClick={() => toggleSubMenu('incomes')}
            >
              الإيرادات
            </button>
            {showIncomes && (
              <div className="pr-4 mt-2 space-y-1">
                <Link to="/incomes/list" className="block p-2 hover:bg-blue-700 rounded-md" onClick={closeMenu}>قائمة الإيرادات</Link>
                <Link to="/incomes/card" className="block p-2 hover:bg-blue-700 rounded-md" onClick={closeMenu}>بطاقة الإيراد</Link>
              </div>
            )}
          </div>
          
          {/* Expenses Menu */}
          <div>
            <button
              className="w-full text-right p-2 hover:bg-blue-700 rounded-md"
              onClick={() => toggleSubMenu('expenses')}
            >
              المصروفات
            </button>
            {showExpenses && (
              <div className="pr-4 mt-2 space-y-1">
                <Link to="/expenses/list" className="block p-2 hover:bg-blue-700 rounded-md" onClick={closeMenu}>قائمة المصروفات</Link>
                <Link to="/expenses/card" className="block p-2 hover:bg-blue-700 rounded-md" onClick={closeMenu}>بطاقة المصروف</Link>
              </div>
            )}
          </div>

          {/* Reports Menu */}
          <Link to="/reports/monthly" className="block p-2 hover:bg-blue-700 rounded-md" onClick={closeMenu}>التقارير الشهرية</Link>
          <Link to="/reports/annual" className="block p-2 hover:bg-blue-700 rounded-md" onClick={closeMenu}>التقارير السنوية</Link>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Quranic Verse */}
        <div
          className="bg-blue-50 text-blue-900 p-4 text-center text-lg font-semibold italic mx-6 my-4 rounded-md"
          dir="rtl"
        >
          وَتَجْرِةٌ مَّعَ اللَّهِ ۖ وَمَا هِيَ بِخَسَارَةٍ
          <br />
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