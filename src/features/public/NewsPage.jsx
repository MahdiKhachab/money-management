import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaNewspaper, FaArrowLeft } from 'react-icons/fa';
import { fetchPublicContent as getPublicContent } from '../../api/contentService';

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
   const fetchNews = async () => {
     const data = await getPublicContent();
     setNews(data.filter((item) => item.type === 'NEWS'));
   };
   fetchNews();
  }, []);

  const handleViewMore = (id) => {
   navigate(`/details/${id}`);
  };

  return (
   <div className="space-y-8" dir="rtl">
     <section className="reveal-section rounded-[2rem] bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6 text-white shadow-[0_30px_80px_rgba(30,64,175,0.25)] sm:p-8 lg:p-10">
       <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
         <div className="max-w-2xl space-y-4">
           <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-blue-100 ring-1 ring-white/20">
             آخر الأخبار
           </span>
           <h1 className="text-3xl font-black leading-tight sm:text-4xl">
             مستجدات الجمعية وما يحدث في مجتمعنا
           </h1>
           <p className="text-base leading-8 text-blue-100">
             نطلعكم على أحدث الأنشطة، المبادرات، والمواضيع المهمة التي تسهم في نمو المجتمع وتطويره.
           </p>
         </div>
         <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-white/10 ring-1 ring-white/10 backdrop-blur-sm">
           <FaNewspaper className="h-7 w-7 text-blue-100" />
         </div>
       </div>
     </section>

     <section className="reveal-section grid gap-6 md:grid-cols-2 xl:grid-cols-3">
       {news.map((item, index) => (
         <article
           key={item.id}
           className="premium-card group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_15px_35px_rgba(15,23,42,0.06)]"
           style={{ animationDelay: `${index * 120}ms` }}
         >
           <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-100 via-indigo-100 to-sky-100 p-5">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.15),_transparent_45%)]" />
             <div className="relative flex h-full items-start justify-between">
               <span className="inline-flex rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-blue-700 shadow-sm ring-1 ring-blue-100 backdrop-blur-sm">
                 خبر
               </span>
               <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 text-blue-700 shadow-sm ring-1 ring-blue-100 backdrop-blur-sm">
                 <FaNewspaper className="h-5 w-5" />
               </div>
             </div>
             <div className="absolute -bottom-8 left-5 h-16 w-16 rounded-full bg-white/50 blur-2xl" />
           </div>
           <div className="space-y-4 p-5">
             <h2 className="text-2xl font-black text-slate-900">{item.title}</h2>
             <p className="text-base leading-8 text-slate-600">{item.description}</p>
             <div className="flex justify-end">
               <button
                 onClick={() => handleViewMore(item.id)}
                 className="inline-flex items-center gap-2 rounded-full bg-blue-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-800"
               >
                 اقرأ المزيد
                 <FaArrowLeft className="h-3 w-3" />
               </button>
             </div>
           </div>
         </article>
       ))}
     </section>
   </div>
  );
};

export default NewsPage;
