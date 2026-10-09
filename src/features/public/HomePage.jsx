import React from 'react';
import { Link } from 'react-router-dom';

const highlights = [
  { title: 'التعلم', description: 'ورش عمل تعليمية تساهم في تنمية مهارات المجتمع وتوسيع مدارك أفراده.', badge: 'برامج تعليمية' },
  { title: 'التضامن', description: 'مبادرات مجتمعية تدعم الأسر والطلبة وتعمل على تحقيق أثر ملموس في الحياة اليومية.', badge: 'مساندة مجتمعية' },
  { title: 'الثقافة', description: 'أنشطة ثقافية وفكرية تعزز الهوية وترسخ القيم الاجتماعية والدينية في المجتمع.', badge: 'هوية وفكر' },
];

const stats = [
  { value: '250+', label: 'مشارك' },
  { value: '18', label: 'نشاطاً سنوياً' },
  { value: '12', label: 'مشروعاً مستمراً' },
];

const HomePage = () => {
  return (
    <div className="space-y-8" dir="rtl">
      <section className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white shadow-[0_30px_80px_rgba(30,64,175,0.35)]">
        <div className="grid gap-8 px-6 py-10 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-10 lg:py-14">
          <div className="space-y-6">
            <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-blue-100 ring-1 ring-white/20">
              جمعية تنموية اجتماعية وثقافية
            </span>
            <div className="space-y-4">
              <h1 className="text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                رعاية المجتمع، بناء المستقبل، ورفع الوعي الثقافي.
              </h1>
              <p className="max-w-xl text-base text-blue-100 sm:text-lg">
                نسعى إلى تمكين الأفراد والمجتمعات عبر برامج تعليمية، أنشطة ثقافية، ومبادرات تضامنية تخدم الإنسان وتبني مجتمعا أكثر تماسكاً وازدهاراً.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/about" className="rounded-full bg-white px-5 py-3 text-sm font-bold text-blue-800 shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50">
                تعرف علينا
              </Link>
              <Link to="/news" className="rounded-full border border-white/30 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10">
                آخر الأخبار
              </Link>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-5 rounded-full bg-blue-400/20 blur-3xl" />
            <div className="relative w-full max-w-sm rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-md">
              <div className="rounded-[1.5rem] bg-white p-5 text-slate-900">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-bold text-blue-700">مؤشرات الجمعية</span>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">حالة نشطة</span>
                </div>
                <div className="space-y-4">
                  {stats.map((stat) => (
                    <div key={stat.label} className="flex items-end justify-between border-b border-slate-200 pb-3 last:border-0 last:pb-0">
                      <span className="text-2xl font-black text-slate-900">{stat.value}</span>
                      <span className="text-sm text-slate-500">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {highlights.map((item) => (
          <article key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_15px_35px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(59,130,246,0.12)]">
            <span className="mb-4 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">{item.badge}</span>
            <h2 className="mb-3 text-2xl font-black text-slate-900">{item.title}</h2>
            <p className="text-base leading-8 text-slate-600">{item.description}</p>
          </article>
        ))}
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_45px_rgba(15,23,42,0.06)] sm:p-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-blue-700">لماذا نحن؟</p>
            <h2 className="mt-2 text-3xl font-black text-slate-900">مسار مستمر نحو مجتمع أكثر إشراقاً</h2>
          </div>
          <Link to="/activity" className="hidden rounded-full bg-slate-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-800 sm:inline-flex">
            استكشف الأنشطة
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[
            'مبادرات تعليمية متخصصة',
            'برامج دعم اجتماعي',
            'ورش عمل ثقافية متجددة',
            'تواصل مستمر مع المجتمع',
          ].map((item, index) => (
            <div key={item} className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-100">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-lg font-black text-blue-700">
                0{index + 1}
              </div>
              <p className="text-base font-medium text-slate-700">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
