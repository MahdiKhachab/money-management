import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPublicContentById } from '../../api/publicContentService';

const DetailPage = () => {
  const { id } = useParams();
  const [detailsItem, setDetailsItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetailsItem = async () => {
      try {
        const data = await getPublicContentById(id);
        setDetailsItem(data);
      } catch (error) {
        console.error('Error fetching details item:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetailsItem();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center" dir="rtl">
        <div className="rounded-full bg-white px-6 py-3 text-base font-medium text-slate-600 shadow-sm ring-1 ring-slate-200">
          جاري التحميل...
        </div>
      </div>
    );
  }

  if (!detailsItem) {
    return (
      <div className="space-y-5 rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-[0_15px_35px_rgba(15,23,42,0.06)]" dir="rtl">
        <h2 className="text-3xl font-black text-slate-900">المحتوى غير موجود</h2>
        <p className="text-slate-600">عذراً، لا يمكن العثور على هذا العنصر في الوقت الحالي.</p>
        <Link to="/" className="inline-flex rounded-full bg-blue-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-800">
          العودة للرئيسية
        </Link>
      </div>
    );
  }

  return (
    <article className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_25px_60px_rgba(15,23,42,0.06)]" dir="rtl">
      <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 p-6 text-white sm:p-8 lg:p-10">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-blue-100 ring-1 ring-white/20">
            تفاصيل المحتوى
          </span>
          <h1 className="text-3xl font-black leading-tight sm:text-4xl">{detailsItem.title}</h1>
        </div>
      </div>

      <div className="space-y-6 p-6 sm:p-8 lg:p-10">
        <p className="text-lg leading-9 text-slate-700">{detailsItem.description}</p>
        <Link to="/" className="inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800">
          العودة إلى الرئيسية
        </Link>
      </div>
    </article>
  );
};

export default DetailPage;
