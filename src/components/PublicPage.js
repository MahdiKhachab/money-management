import React from 'react';
import { Link } from 'react-router-dom';
import logo from './assets/logo.png'; // Make sure the path is correct

const PublicPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100" dir="rtl">
      <header className="bg-blue-900 text-white p-4 shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-10 w-10 mr-2 rounded-full" />
            <h1 className="mr-2 text-xl font-bold">جمعية الزهراء الثقافية</h1>
          </div>
          <Link to="/login" className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors">
            تسجيل الدخول
          </Link>
        </div>
      </header>

      <main className="container mx-auto p-6 flex-1">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">
            مرحباً بكم في جمعية الزهراء الثقافية
          </h2>
          <section className="my-8">
            <h3 className="text-2xl font-semibold mb-3">أهدافنا وأعمالنا</h3>
            <p className="text-gray-700 leading-relaxed">
              تلتزم جمعية الزهراء الثقافية بتقديم الدعم للمجتمع من خلال مجموعة متنوعة من الأنشطة والبرامج. نحن نعمل على تعزيز الوعي الثقافي والمساهمة في التنمية الاجتماعية المستدامة.
            </p>
          </section>

          <section className="my-8">
            <h3 className="text-2xl font-semibold mb-3">نشاطاتنا</h3>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed">
              <li>فعاليات تعليمية وورش عمل</li>
              <li>مشاريع إغاثة ومساعدات إنسانية</li>
              <li>مناسبات ثقافية ودينية</li>
              <li>برامج توعية صحية وبيئية</li>
            </ul>
          </section>

          <section className="my-8">
            <h3 className="text-2xl font-semibold mb-3">مناسبات قادمة</h3>
            <p className="text-gray-700 leading-relaxed">
              ترقبوا المزيد من المناسبات المثمرة! سنقوم بتحديث هذا القسم بانتظام ليطلعكم على جميع فعالياتنا القادمة.
            </p>
          </section>
        </div>
      </main>

      <footer className="bg-blue-900 text-white text-center p-4">
        &copy; {new Date().getFullYear()} جمعية الزهراء الثقافية. جميع الحقوق محفوظة.
      </footer>
    </div>
  );
};

export default PublicPage;