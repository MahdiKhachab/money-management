import React, { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  FiBarChart2, FiDollarSign, FiExternalLink, FiFileText, FiGrid, FiLogOut, FiMenu, FiShoppingBag, FiTool, FiUserPlus, FiUsers, FiX,
} from 'react-icons/fi';
import logo from '../../components/assets/logo.png';
import { useAuth } from '../../auth/AuthContext';
import { ORG_NAME } from '../../config/env';
import { USER_ROLES } from '../../constants/labels';

const NAV_SECTIONS = [
  {
    title: 'عام',
    items: [{ to: '/admin', label: 'لوحة التحكم', icon: FiGrid, end: true }],
  },
  {
    title: 'المالية',
    items: [
      { to: '/admin/donors', label: 'المتبرعون', icon: FiUsers },
      { to: '/admin/incomes', label: 'الإيرادات', icon: FiDollarSign },
      { to: '/admin/expenses', label: 'المصروفات', icon: FiShoppingBag },
      { to: '/admin/maintenance', label: 'الصيانة', icon: FiTool },
      { to: '/admin/reports', label: 'التقارير', icon: FiBarChart2 },
    ],
  },
  {
    title: 'الموقع العام',
    items: [{ to: '/admin/content', label: 'الأخبار والأنشطة', icon: FiFileText }],
  },
  {
    title: 'الإدارة',
    role: 'ADMIN',
    items: [{ to: '/admin/users', label: 'إضافة مستخدم', icon: FiUserPlus }],
  },
];

const Sidebar = ({ onNavigate }) => {
  const { user, logout } = useAuth();

  return (
    <div className="flex h-full flex-col bg-slate-900 text-slate-300">
      <Link to="/admin" onClick={onNavigate} className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
        <img src={logo} alt="" className="h-11 w-11 rounded-full border border-white/20 object-cover" />
        <div>
          <p className="text-sm font-black text-white">{ORG_NAME}</p>
          <p className="text-[11px] text-blue-200">لوحة الإدارة</p>
        </div>
      </Link>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5" aria-label="القائمة الرئيسية">
        {NAV_SECTIONS.filter((section) => !section.role || section.role === user?.role).map((section) => (
          <div key={section.title}>
            <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">{section.title}</p>
            <ul className="space-y-1">
              {section.items.map(({ to, label, icon: Icon, end }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={end}
                    onClick={onNavigate}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                        isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30' : 'hover:bg-white/5 hover:text-white'
                      }`
                    }
                  >
                    <Icon className="h-[18px] w-[18px]" />
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="space-y-2 border-t border-white/10 p-4">
        <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-white/5 hover:text-white">
          <FiExternalLink className="h-4 w-4" />
          عرض الموقع العام
        </a>
        <div className="flex items-center justify-between gap-2 rounded-xl bg-white/5 px-3 py-2.5">
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-white">{user?.username}</p>
            <p className="text-[11px] text-slate-400">{USER_ROLES[user?.role] || user?.role}</p>
          </div>
          <button type="button" onClick={logout} className="rounded-lg p-2 text-slate-400 hover:bg-red-500/10 hover:text-red-300" aria-label="تسجيل الخروج" title="تسجيل الخروج">
            <FiLogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setDrawerOpen(false), [location.pathname]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900" dir="rtl">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 right-0 z-30 hidden w-64 lg:block print:hidden">
        <Sidebar />
      </aside>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden print:hidden">
          <div className="absolute inset-0 bg-slate-900/60" onClick={() => setDrawerOpen(false)} aria-hidden="true" />
          <aside className="absolute inset-y-0 right-0 w-72 max-w-[85%] shadow-2xl">
            <button type="button" onClick={() => setDrawerOpen(false)} className="absolute left-3 top-5 z-10 rounded-lg p-1.5 text-slate-300 hover:bg-white/10" aria-label="إغلاق القائمة">
              <FiX className="h-5 w-5" />
            </button>
            <Sidebar onNavigate={() => setDrawerOpen(false)} />
          </aside>
        </div>
      )}

      <div className="lg:pr-64 print:p-0">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur lg:hidden print:hidden">
          <button type="button" onClick={() => setDrawerOpen(true)} className="rounded-lg border border-slate-200 p-2 text-slate-700" aria-label="فتح القائمة">
            <FiMenu className="h-5 w-5" />
          </button>
          <p className="font-black text-slate-900">{ORG_NAME}</p>
        </header>

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mb-6 rounded-2xl border border-blue-100 bg-gradient-to-l from-blue-50 via-white to-indigo-50 px-5 py-3 text-center print:hidden">
            <p className="font-serif text-base font-semibold leading-8 text-blue-900">
              إِنَّ الَّذِينَ يَتْلُونَ كِتَابَ اللَّهِ وَأَقَامُوا الصَّلَاةَ وَأَنفَقُوا مِمَّا رَزَقْنَاهُمْ سِرًّا وَعَلَانِيَةً يَرْجُونَ تِجَارَةً لَّن تَبُورَ
            </p>
            <p className="text-xs font-medium text-blue-700">سورة فاطر - 35:29</p>
          </div>

          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
