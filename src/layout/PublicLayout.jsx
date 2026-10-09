// components/PublicLayout.jsx
import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import logo from '../components/assets/logo.png';

const navItems = [
  { to: '/', label: 'الرئيسية' },
  { to: '/activity', label: 'الأنشطة' },
  { to: '/news', label: 'الأخبار' },
  { to: '/about', label: 'من نحن' },
  { to: '/login', label: 'تسجيل الدخول' },
];

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900" dir="rtl">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-700 to-indigo-900 shadow-md">
              <img src={logo} alt="شعار جمعية الزهراء" className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="text-lg font-black text-slate-900">جمعية الزهراء الثقافية</p>
              <p className="text-xs text-slate-500">مجتمع متعاون • تنمية مستدامة</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-700 text-white shadow-md'
                      : 'text-slate-700 hover:bg-blue-50 hover:text-blue-700'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <Link
            to="/login"
            className="inline-flex items-center rounded-full bg-blue-700 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800"
          >
            دخول الإدارة
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-slate-900 text-slate-100">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-center text-sm sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} جمعية الزهراء الثقافية. جميع الحقوق محفوظة.</p>
          <div className="flex items-center justify-center gap-4 text-slate-300">
            <span>الرسالة</span>
            <span>•</span>
            <span>التعلم</span>
            <span>•</span>
            <span>التضامن</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
