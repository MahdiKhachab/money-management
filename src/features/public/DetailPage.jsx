import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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

  if (loading) return <p className="text-center mt-10">جاري التحميل...</p>;
  if (!detailsItem) return <p className="text-center mt-10">المحتوى غير موجود</p>;

  return (
    <div className="container mx-auto p-6" dir="rtl">
      <h2 className="text-3xl font-bold mb-4">{detailsItem.title}</h2>
      <p className="text-gray-700 text-lg">{detailsItem.description}</p>
    </div>
  );
};

export default DetailPage;
