import React, { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import logo from '../components/assets/logo.png';
import { useAuth } from '../auth/AuthContext';
import { ORG_NAME } from '../config/env';

const navItems = [
  { to: '/', label: 'الرئيسية' },
  { to: '/news', label: 'الأخبار' },
  { to: '/activity', label: 'الأنشطة' },
  { to: '/about', label: 'من نحن' },
];

const navClass = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
    isActive ? 'bg-blue-700 text-white shadow-md' : 'text-slate-700 hover:bg-blue-50 hover:text-blue-700'
  }`;

const PublicLayout = () => {
  const { isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const adminLink = (
    <Link
      to={isAuthenticated ? '/admin' : '/login'}
      className="inline-flex items-center justify-center rounded-full bg-blue-700 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800"
    >
      {isAuthenticated ? 'لوحة الإدارة' : 'دخول الإدارة'}
    </Link>
  );

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900" dir="rtl">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:right-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2">
        تخطي إلى المحتوى
      </a>

      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-700 to-indigo-900 shadow-md">
              <img src={logo} alt="شعار جمعية الزهراء" className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="text-lg font-black text-slate-900">{ORG_NAME}</p>
              <p className="text-xs text-slate-500">مجتمع متعاون • تنمية مستدامة</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 md:flex" aria-label="التنقل الرئيسي">
            {navItems.map(({ to, label }) => (
              <NavLink key={to} to={to} end={to === '/'} className={navClass}>{label}</NavLink>
            ))}
          </nav>

          <div className="hidden md:block">{adminLink}</div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="rounded-lg border border-slate-200 p-2 text-slate-700 md:hidden"
            aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
          </button>
        </div>

        {menuOpen && (
          <nav className="space-y-1 border-t border-slate-200 bg-white px-4 py-4 md:hidden" aria-label="التنقل الرئيسي">
            {navItems.map(({ to, label }) => (
              <NavLink key={to} to={to} end={to === '/'} className={(state) => `block ${navClass(state)}`}>{label}</NavLink>
            ))}
            <div className="pt-3">{adminLink}</div>
          </nav>
        )}
      </header>

      <main id="main" className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img src={logo} alt="" className="h-10 w-10 rounded-full object-cover" />
              <p className="text-lg font-black text-white">{ORG_NAME}</p>
            </div>
            <p className="text-sm leading-7">جمعية تنموية اجتماعية وثقافية تعمل على تمكين الإنسان وخدمة المجتمع عبر التعليم والثقافة والتضامن.</p>
          </div>
          <div>
            <p className="mb-3 font-bold text-white">روابط سريعة</p>
            <ul className="space-y-2 text-sm">
              {navItems.map(({ to, label }) => (
                <li key={to}><Link to={to} className="hover:text-white">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 font-bold text-white">قيمنا</p>
            <div className="flex flex-wrap gap-2 text-sm">
              {['الرسالة', 'التعلم', 'التضامن', 'الثقافة'].map((value) => (
                <span key={value} className="rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10">{value}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} {ORG_NAME}. جميع الحقوق محفوظة.
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
