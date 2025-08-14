import React from 'react';
 
const AboutPage = () => {
  return (
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
  
  );
};

export default AboutPage;