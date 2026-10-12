import React from 'react';
import { Link } from 'react-router-dom';
import { fetchPublicContent } from '../../api/contentService';
import useAsync from '../../hooks/useAsync';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { formatDate } from '../../utils/format';
import { FaBookOpen, FaHandshake, FaLeaf, FaUsers, FaCompass, FaCalendarAlt } from 'react-icons/fa';

const pillars = [
  {
   title: 'رسالتنا',
   description: 'نؤمن بأن بناء المجتمعات القوية يبدأ من الإنسان، لذلك نعمل على دعم التعليم، الثقافة، والتضامن المجتمعي في إطار قيم إنسانية مستدامة.',
   icon: FaBookOpen,
  },
  {
   title: 'أهدافنا',
   description: 'نسعى إلى إفادة المجتمع عبر أوجه التعاون والبرامج المتنوعة التي تعزز الوعي، وتفتح آفاقاً جديدة للفكر والإبداع والرحمة.',
   icon: FaCompass,
  },
  {
   title: 'تأثيرنا',
   description: 'نضع بصمة واضحة في حياة الأسر والطلاب والمجتمع من خلال مبادرات عملية، منظّمة، وموجهة نحو التنمية المستدامة.',
   icon: FaUsers,
  },
];

const activities = [
  { label: 'ورش عمل تعليمية وتدريبية', icon: FaBookOpen },
  { label: 'مبادرات دعم اجتماعي وإنساني', icon: FaHandshake },
  { label: 'فعاليات ثقافية ودينية متنوعة', icon: FaLeaf },
  { label: 'برامج توعية صحية وبيئية', icon: FaUsers },
];

// Shown when no activities have been published yet
const fallbackEvents = [
  'ندوة ثقافية عن التنمية المجتمعية',
  'مبادرة تعليمية للطلاب والباحثين',
  'فعالية تضامنية لدعم الأسر',
];

const AboutPage = () => {
  useDocumentTitle('من نحن');
  const { data: content } = useAsync(() => fetchPublicContent(), [], []);
  const aboutEntries = content.filter((item) => item.type === 'ABOUT');
  const latestActivities = content.filter((item) => item.type === 'ACTIVITY').slice(0, 3);

  return (
   <div className="space-y-8" dir="rtl">
     <section className="reveal-section overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white shadow-[0_30px_80px_rgba(15,23,42,0.2)]">
       <div className="grid gap-8 px-6 py-10 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-10 lg:py-14">
         <div className="space-y-5">
           <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-blue-100 ring-1 ring-white/20">
             من نحن
           </span>
           <div className="space-y-4">
             <h1 className="text-3xl font-black leading-tight sm:text-4xl">
               جمعية الزهراء الثقافية، رافعة للتغيير المجتمعي.
             </h1>
             <p className="max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
               نحن جمعية تنموية اجتماعية وثقافية تعمل على دعم المجتمع من خلال مبادرات تعليمية، ثقافية، وإنسانية تساهم في بناء مستقبل أكثر تماسكاً وازدهاراً.
             </p>
           </div>
           <div className="flex flex-wrap gap-3">
             <a href="#mission" className="rounded-full bg-white px-5 py-3 text-sm font-bold text-blue-800 shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50">
               تعرف على رسالتنا
             </a>
             <a href="#events" className="rounded-full border border-white/30 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10">
               المناسبات القادمة
             </a>
           </div>
         </div>

         <div className="relative flex items-center justify-center">
           <div className="absolute inset-5 rounded-full bg-blue-400/20 blur-3xl" />
           <div className="relative w-full max-w-md rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-md">
             <div className="rounded-[1.5rem] bg-white p-5 text-slate-900">
               <div className="mb-5 flex items-center justify-between">
                 <span className="text-sm font-bold text-blue-700">مؤشراتنا</span>
                 <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">نشطة</span>
               </div>
               <div className="space-y-4">
                 {[
                   ['5+', 'سنوات خبرة'],
                   ['12', 'مبادرة مستمرة'],
                   ['90%', 'مستوى رضا المجتمع'],
                 ].map(([value, label]) => (
                   <div key={label} className="flex items-end justify-between border-b border-slate-200 pb-3 last:border-0 last:pb-0">
                     <span className="text-2xl font-black text-slate-900">{value}</span>
                     <span className="text-sm text-slate-500">{label}</span>
                   </div>
                 ))}
               </div>
             </div>
           </div>
         </div>
       </div>
     </section>

     <section id="mission" className="reveal-section grid gap-5 md:grid-cols-3">
       {pillars.map(({ title, description, icon: Icon }, index) => (
         <article
           key={title}
           className="premium-card rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_15px_35px_rgba(15,23,42,0.06)]"
           style={{ animationDelay: `${index * 120}ms` }}
         >
           <div className="mb-4 flex items-center justify-between">
             <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">{title}</span>
             <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200">
               <Icon className="h-5 w-5" />
             </div>
           </div>
           <p className="text-base leading-8 text-slate-600">{description}</p>
         </article>
       ))}
     </section>

     {aboutEntries.length > 0 && (
       <section className="reveal-section space-y-5">
         {aboutEntries.map((entry) => (
           <article key={entry.id} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_15px_35px_rgba(15,23,42,0.06)] sm:p-8">
             <h2 className="mb-3 text-2xl font-black text-slate-900">{entry.title}</h2>
             <p className="whitespace-pre-line text-base leading-8 text-slate-600">{entry.description}</p>
           </article>
         ))}
       </section>
     )}

     <section className="reveal-section grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
       <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_45px_rgba(15,23,42,0.06)] sm:p-8">
         <div className="mb-6 flex items-center justify-between gap-4">
           <div>
             <p className="text-sm font-bold text-blue-700">أعمالنا</p>
             <h2 className="mt-2 text-3xl font-black text-slate-900">مجالاتنا التنموية والإنسانية</h2>
           </div>
           <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100">
             <FaCalendarAlt className="h-5 w-5" />
           </div>
         </div>
         <div className="grid gap-4 sm:grid-cols-2">
           {activities.map(({ label, icon: Icon }, index) => (
             <div key={label} className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-100 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_15px_30px_rgba(59,130,246,0.08)]">
               <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-lg font-black text-white shadow-lg shadow-blue-200">
                 <Icon className="h-5 w-5" />
               </div>
               <p className="text-base font-medium text-slate-700">{label}</p>
               <span className="mt-3 inline-flex text-xs font-bold text-blue-700">0{index + 1}</span>
             </div>
           ))}
         </div>
       </div>

       <aside id="events" className="rounded-[2rem] bg-slate-900 p-6 text-white shadow-[0_25px_60px_rgba(15,23,42,0.15)] sm:p-8">
         <div className="mb-4 flex items-center justify-between">
           <p className="text-sm font-bold text-blue-200">مناسبات قادمة</p>
           <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
             <FaCalendarAlt className="h-4 w-4 text-blue-200" />
           </div>
         </div>
         <h3 className="mt-3 text-3xl font-black">نخطط لفعاليات مجتمعية تعزز الوعي والتواصل</h3>
         <ul className="mt-6 space-y-4">
           {latestActivities.length
             ? latestActivities.map((item) => (
                 <li key={item.id}>
                   <Link to={`/details/${item.id}`} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">
                     <span className="mt-2 inline-flex h-3 w-3 shrink-0 rounded-full bg-blue-400" aria-hidden="true" />
                     <span>
                       <span className="block text-base text-slate-100">{item.title}</span>
                       <span className="text-xs text-blue-200">{formatDate(item.createdAt)}</span>
                     </span>
                   </Link>
                 </li>
               ))
             : fallbackEvents.map((event) => (
                 <li key={event} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                   <span className="mt-1 inline-flex h-3 w-3 rounded-full bg-blue-400" aria-hidden="true" />
                   <span className="text-base text-slate-100">{event}</span>
                 </li>
               ))}
         </ul>
       </aside>
     </section>
   </div>
  );
};

export default AboutPage;