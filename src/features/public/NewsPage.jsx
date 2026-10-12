import React from 'react';
import { FaNewspaper } from 'react-icons/fa';
import { fetchPublicContent } from '../../api/contentService';
import useAsync from '../../hooks/useAsync';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import ContentGrid from './components/ContentGrid';
import PageHero from './components/PageHero';

const NewsPage = () => {
  useDocumentTitle('الأخبار');
  const { data, loading, error, reload } = useAsync(() => fetchPublicContent('NEWS'), [], []);

  return (
    <div className="space-y-8" dir="rtl">
      <PageHero
        badge="آخر الأخبار"
        title="مستجدات الجمعية وما يحدث في مجتمعنا"
        description="نطلعكم على أحدث الأنشطة، المبادرات، والمواضيع المهمة التي تسهم في نمو المجتمع وتطويره."
        icon={FaNewspaper}
      />
      <ContentGrid items={data} loading={loading} error={error} onRetry={reload} emptyTitle="لا توجد أخبار منشورة حالياً" />
    </div>
  );
};

export default NewsPage;
