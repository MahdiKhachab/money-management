import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import logo from '../components/assets/logo.png';

const menuGroups = [
  {
    key: 'donors',
    label: 'المتبرعين',
    links: [
      { to: '/donors/list', label: 'قائمة المتبرعين' },
      { to: '/donors/card', label: 'بطاقة المتبرع' },
    ],
  },
  {
    key: 'incomes',
    label: 'الإيرادات',
    links: [
      { to: '/incomes/list', label: 'قائمة الإيرادات' },
      { to: '/incomes/card', label: 'بطاقة الإيراد' },
    ],
  },
  {
    key: 'expenses',
    label: 'المصروفات',
    links: [
      { to: '/expenses/list', label: 'قائمة المصروفات' },
      { to: '/expenses/card', label: 'بطاقة المصروف' },
    ],
  },
];

const Layout = ({ onLogout }) => {
  const [openGroup, setOpenGroup] = useState('donors');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const username = localStorage.getItem('username') || 'ضيف';
  const userMenuRef = useRef(null);

  const toggleGroup = (key) => {
    setOpenGroup((current) => (current === key ? '' : key));
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenGroup('donors');
    setShowUserMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900" dir="rtl">
      <header className="sticky top-0 z-50 border-b border-blue-900/10 bg-slate-900 text-white shadow-lg shadow-slate-900/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/donors/list" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/5 shadow-md">
              <img src={logo} alt="شعار الجمعية" className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="text-base font-black text-white">جمعية الزهراء الثقافية</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-blue-200">Administrator panel</p>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setIsMenuOpen((value) => !value)}
            className="rounded-lg border border-white/20 p-2 text-white md:hidden"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <nav className="hidden items-center gap-2 md:flex">
            {menuGroups.map(({ key, label, links }) => (
              <div key={key} className="relative">
                <button
                  type="button"
                  onClick={() => toggleGroup(key)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    openGroup === key ? 'bg-blue-700 text-white' : 'text-slate-200 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {label}
                </button>

                {openGroup === key && (
                  <div className="absolute right-0 top-full z-20 mt-2 w-52 overflow-hidden rounded-2xl border border-white/10 bg-slate-800 shadow-2xl">
                    {links.map(({ to, label: linkLabel }) => (
                      <Link
                        key={to}
                        to={to}
                        onClick={closeMenu}
                        className="block border-b border-white/5 px-4 py-3 text-right text-sm text-slate-200 transition hover:bg-blue-700/80 hover:text-white last:border-b-0"
                      >
                        {linkLabel}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="flex items-center gap-2 border-r border-white/10 pl-3">
              <NavLink to="/reports/monthly" className="rounded-full px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/5 hover:text-white">التقارير الشهرية</NavLink>
              <NavLink to="/reports/annual" className="rounded-full px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/5 hover:text-white">التقارير السنوية</NavLink>
            </div>
          </nav>

          <div ref={userMenuRef} className="relative hidden md:block">
            <button
              type="button"
              onClick={() => setShowUserMenu((value) => !value)}
              className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/10"
              aria-expanded={showUserMenu}
            >
              <span>مرحباً، {username}</span>
              <svg className={`h-4 w-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                <path d="M5.5 7.5 10 12l4.5-4.5" />
              </svg>
            </button>

            {showUserMenu && (
              <div className="absolute left-0 top-full z-20 mt-2 w-40 overflow-hidden rounded-2xl border border-white/10 bg-slate-800 shadow-2xl">
                <button
                  type="button"
                  onClick={() => {
                    onLogout();
                    setShowUserMenu(false);
                  }}
                  className="w-full bg-red-600/10 px-4 py-3 text-right text-sm font-medium text-red-200 transition hover:bg-red-600/20"
                >
                  تسجيل الخروج
                </button>
              </div>
            )}
          </div>
        </div>

        {isMenuOpen && (
          <div className="border-t border-white/10 bg-slate-900/95 md:hidden">
            <nav className="mx-auto max-w-7xl space-y-3 px-4 py-5 text-white">
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="text-sm font-medium">مرحباً، {username}</span>
                <button
                  type="button"
                  onClick={() => {
                    onLogout();
                    closeMenu();
                  }}
                  className="rounded-full bg-red-600 px-3 py-1.5 text-xs font-bold text-white"
                >
                  خروج
                </button>
              </div>

              {menuGroups.map(({ key, label, links }) => (
                <div key={key} className="rounded-2xl border border-white/10 bg-white/5">
                  <button
                    type="button"
                    onClick={() => toggleGroup(key)}
                    className="flex w-full items-center justify-between px-4 py-3 text-right text-sm font-medium"
                  >
                    {label}
                    <svg className={`h-4 w-4 transition-transform ${openGroup === key ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                      <path d="M5.5 7.5 10 12l4.5-4.5" />
                    </svg>
                  </button>
                  {openGroup === key && (
                    <div className="space-y-1 border-t border-white/10 px-3 py-3">
                      {links.map(({ to, label: linkLabel }) => (
                        <Link key={to} to={to} onClick={closeMenu} className="block rounded-xl px-3 py-2 text-sm text-slate-200 transition hover:bg-white/5 hover:text-white">
                          {linkLabel}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <NavLink to="/reports/monthly" onClick={closeMenu} className="block rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white">التقارير الشهرية</NavLink>
              <NavLink to="/reports/annual" onClick={closeMenu} className="block rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white">التقارير السنوية</NavLink>
            </nav>
          </div>
        )}
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 rounded-[1.75rem] border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-indigo-50 px-5 py-4 text-center text-lg font-semibold text-blue-900 shadow-sm">
          <span className="font-serif tracking-[0.08em]">وَتَجْرِبَةٌ مَعَ اللَّهِ ۖ وَمَا هِيَ بِخَسَارَةٍ</span>
          <div className="mt-1 text-sm font-medium text-blue-700">سورة الفرقان - 25:58</div>
        </div>

        <main className="rounded-[2rem] bg-white/80 p-4 shadow-[0_20px_50px_rgba(15,23,42,0.06)] backdrop-blur-sm sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
