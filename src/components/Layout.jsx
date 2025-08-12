import React, { useState, useEffect, useRef } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = ({ onLogout }) => {
  const [showDonors, setShowDonors] = useState(false);
  const [showIncomes, setShowIncomes] = useState(false);
  const [showExpenses, setShowExpenses] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const username = localStorage.getItem("username") || "ضيف";

  const toggleSubMenu = (menu) => {
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
    setShowDonors(false);
    setShowIncomes(false);
    setShowExpenses(false);
    setShowUserMenu(false);
  };

  // Ref for detecting clicks outside the user menu
  const userMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    }

    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserMenu]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100" dir="rtl">
      {/* Header */}
      <header className="bg-blue-900 text-white p-4 shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">

          <h1 className="text-xl font-bold">جمعية الزهراء الثقافية</h1>

          {/* Hamburger Menu for Mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white md:hidden focus:outline-none"
            aria-label="Toggle menu"
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
            {/* Donors */}
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

            {/* Incomes */}
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

            {/* Expenses */}
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

            {/* Reports */}
            <div className="flex">
              <Link to="/reports/monthly" className="py-2 px-3 hover:bg-blue-800 rounded-md transition-colors">التقارير الشهرية</Link>
              <Link to="/reports/annual" className="py-2 px-3 hover:bg-blue-800 rounded-md transition-colors">التقارير السنوية</Link>
            </div>
          </nav>

          {/* Desktop Username + Logout submenu */}
          <div
            ref={userMenuRef}
            className="hidden md:flex items-center space-x-2 ml-4 relative cursor-pointer select-none"
          >
            <div
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-1 text-white select-none"
              aria-haspopup="true"
              aria-expanded={showUserMenu}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setShowUserMenu(!showUserMenu);
                }
              }}
            >
              <span className="text-sm font-semibold">مرحباً، {username}</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  showUserMenu ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>

            {showUserMenu && (
              <div
                className="absolute right-0 top-full mt-1 w-32 bg-blue-800 rounded-md shadow-lg py-1 z-20"
                role="menu"
                aria-label="User menu"
              >
                <button
                  onClick={() => {
                    onLogout();
                    setShowUserMenu(false);
                  }}
                  className="w-full text-right px-4 py-2 hover:bg-red-600 text-red-100 rounded-md text-sm"
                  role="menuitem"
                  aria-label="تسجيل الخروج"
                >
                  خروج
                </button>
              </div>
            )}
          </div>

        </div>
      </header>

      {/* Mobile Dropdown Menu */}
      <div
        className={`bg-blue-800 shadow-md transform transition-all duration-300 ease-in-out z-40 md:hidden ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <nav className="p-4 space-y-2 text-white">
          {/* Username + Logout in mobile */}
          <div className="flex justify-between items-center mb-4 border-b border-blue-700 pb-2">
            <span className="text-sm font-semibold">مرحباً، {username}</span>
            <button
              onClick={() => {
                onLogout();
                closeMenu();
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm transition"
              aria-label="تسجيل الخروج"
            >
              خروج
            </button>
          </div>

          {/* Donors */}
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

          {/* Incomes */}
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

         
          {/* Expenses */}
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

          {/* Reports */}
          <Link to="/reports/monthly" className="block p-2 hover:bg-blue-700 rounded-md" onClick={closeMenu}>التقارير الشهرية</Link>
          <Link to="/reports/annual" className="block p-2 hover:bg-blue-700 rounded-md" onClick={closeMenu}>التقارير السنوية</Link>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Quranic Verse */}
        <div
          className="bg-blue-50 text-blue-900 p-4 text-center text-lg font-semibold italic mx-6 my-4 rounded-md"
        >
          وَتَجْرِةٌ مَّعَ اللَّهِ ۖ وَمَا هِيَ بِخَسَارَةٍ
          <br />
          <span className="text-sm font-normal">سورة الفرقان - 25:58</span>
        </div>

        {/* Outlet for nested routes */}
        <main className="p-6 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
