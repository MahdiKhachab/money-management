// components/PublicLayout.jsx
import React from "react";
import { Link, Outlet } from "react-router-dom";
import logo from '../components/assets/logo.png';

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100" dir="rtl">
      {/* Header */}
      <header className="bg-blue-900 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-10 w-10 mr-2 rounded-full" />
            <h1 className="mr-2 text-xl font-bold">جمعية الزهراء الثقافية</h1>
          </div>

          {/* Public Navigation */}
          <nav className="flex space-x-4 text-sm">
            <Link to="/" className="hover:bg-blue-800 rounded-md px-3 py-2">الرئيسية</Link>
            
            <Link to="/activity" className="hover:bg-blue-800 rounded-md px-3 py-2">الأنشطة</Link>

            <Link to="/news" className="hover:bg-blue-800 rounded-md px-3 py-2">الأخبار</Link>

            <Link to="/about" className="hover:bg-blue-800 rounded-md px-3 py-2">من نحن</Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container mx-auto p-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 text-white p-4 text-center text-sm">
        &copy; {new Date().getFullYear()} جمعية الزهراء الثقافية. جميع الحقوق محفوظة.
      </footer>
    </div>
  );
};

export default PublicLayout;
