import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaArrowRight, FaCalendarAlt, FaPaperclip } from 'react-icons/fa';
import { assetUrl, fetchPublicContentById, isImage } from '../../api/contentService';
import { LoadingState } from '../../components/ui';
import { CONTENT_TYPES } from '../../constants/labels';
import useAsync from '../../hooks/useAsync';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { formatDate } from '../../utils/format';

const BACK_LINKS = {
  NEWS: { to: '/news', label: 'العودة إلى الأخبار' },
  ACTIVITY: { to: '/activity', label: 'العودة إلى الأنشطة' },
  ABOUT: { to: '/about', label: 'العودة إلى من نحن' },
};

const DetailPage = () => {
  const { id } = useParams();
  const { data: item, loading, error } = useAsync(() => fetchPublicContentById(id), [id]);
  useDocumentTitle(item?.title);

  if (loading) return <LoadingState />;

  if (error || !item) {
    return (
      <div className="space-y-5 rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-[0_15px_35px_rgba(15,23,42,0.06)]" dir="rtl">
        <h1 className="text-3xl font-black text-slate-900">المحتوى غير موجود</h1>
        <p className="text-slate-600">عذراً، لا يمكن العثور على هذا العنصر في الوقت الحالي.</p>
        <Link to="/" className="inline-flex rounded-full bg-blue-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-800">
          العودة للرئيسية
        </Link>
      </div>
    );
  }

  const back = BACK_LINKS[item.type] || { to: '/', label: 'العودة إلى الرئيسية' };
  const attachment = assetUrl(item.attachmentUrl);
  const image = isImage(item.attachmentUrl) ? attachment : null;

  return (
    <article className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_25px_60px_rgba(15,23,42,0.06)]" dir="rtl">
      <header className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 p-6 text-white sm:p-8 lg:p-10">
        <Link to={back.to} className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-blue-200 hover:text-white">
          <FaArrowRight className="h-3 w-3" />
          {back.label}
        </Link>
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="inline-flex rounded-full bg-white/10 px-4 py-1.5 font-medium text-blue-100 ring-1 ring-white/20">
              {CONTENT_TYPES[item.type] || item.type}
            </span>
            {item.createdAt && (
              <span className="flex items-center gap-2 text-blue-200">
                <FaCalendarAlt className="h-3 w-3" />
                {formatDate(item.createdAt)}
              </span>
            )}
          </div>
          <h1 className="break-words text-3xl font-black leading-tight sm:text-4xl">{item.title}</h1>
        </div>
      </header>

      {image && <img src={image} alt={item.title} onError={(e) => { e.currentTarget.style.display = "none"; }} className="max-h-[480px] w-full object-cover" />}

      <div className="space-y-6 p-6 sm:p-8 lg:p-10">
        <p className="whitespace-pre-line break-words text-lg leading-9 text-slate-700">{item.description}</p>
        {attachment && !image && (
          <a href={attachment} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50">
            <FaPaperclip />
            عرض المرفق
          </a>
        )}
      </div>
    </article>
  );
};

export default DetailPage;
