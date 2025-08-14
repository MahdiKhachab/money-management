import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPublicContent } from '../../api/publicContentService';

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      const data = await getPublicContent();
      setNews(data.filter(item => item.type === 'NEWS'));
    };
    fetchNews();
  }, []);

  const handleViewMore = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <div className="container mx-auto p-6" dir="rtl">
      <h2 className="text-3xl font-bold text-center mb-6">آخر الأخبار</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map(item => (
          <div 
            key={item.id} 
            className="bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            <div className="mb-2">
              <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
            </div>
            <div className="mb-2">
              <p className="text-gray-600 text-sm line-clamp-3">{item.description}</p>
            </div>
            <div className="mt-2 flex justify-end">
              <button 
                onClick={() => handleViewMore(item.id)}
                className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                اقرأ المزيد
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
