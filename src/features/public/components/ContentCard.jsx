import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaCalendarAlt, FaHandsHelping, FaNewspaper } from 'react-icons/fa';
import { assetUrl, isImage } from '../../../api/contentService';
import { CONTENT_TYPES } from '../../../constants/labels';
import { excerpt, formatDate } from '../../../utils/format';

const TYPE_ICONS = { NEWS: FaNewspaper, ACTIVITY: FaHandsHelping };

const ContentCard = ({ item }) => {
  const Icon = TYPE_ICONS[item.type] || FaNewspaper;
  const [imageFailed, setImageFailed] = useState(false);
  const image = !imageFailed && isImage(item.attachmentUrl) ? assetUrl(item.attachmentUrl) : null;

  return (
    <article className="premium-card group flex flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_15px_35px_rgba(15,23,42,0.06)]">
      <Link to={`/details/${item.id}`} className="relative block h-48 overflow-hidden bg-gradient-to-br from-blue-100 via-indigo-100 to-sky-100" tabIndex={-1} aria-hidden="true">
        {image ? (
          <img src={image} alt="" loading="lazy" onError={() => setImageFailed(true)} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        ) : (
          <div className="flex h-full items-center justify-center text-blue-300">
            <Icon className="h-12 w-12" />
          </div>
        )}
        <span className="absolute right-4 top-4 inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-blue-700 shadow-sm ring-1 ring-blue-100 backdrop-blur-sm">
          {CONTENT_TYPES[item.type] || item.type}
        </span>
      </Link>
      <div className="flex min-w-0 flex-1 flex-col gap-3 break-words p-5">
        {item.createdAt && (
          <p className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <FaCalendarAlt className="h-3 w-3" />
            {formatDate(item.createdAt)}
          </p>
        )}
        <h3 className="text-xl font-black leading-snug text-slate-900">
          <Link to={`/details/${item.id}`} className="hover:text-blue-700">{item.title}</Link>
        </h3>
        <p className="flex-1 text-base leading-8 text-slate-600">{excerpt(item.description, 140)}</p>
        <Link
          to={`/details/${item.id}`}
          className="inline-flex items-center gap-2 self-start rounded-full bg-blue-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-800"
        >
          اقرأ المزيد
          <FaArrowLeft className="h-3 w-3" />
        </Link>
      </div>
    </article>
  );
};

export default ContentCard;
