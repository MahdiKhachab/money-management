import React from 'react';
import { FaHandsHelping } from 'react-icons/fa';
import { fetchPublicContent } from '../../api/contentService';
import useAsync from '../../hooks/useAsync';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import ContentGrid from './components/ContentGrid';
import PageHero from './components/PageHero';

const ActivityPage = () => {
  useDocumentTitle('الأنشطة');
  const { data, loading, error, reload } = useAsync(() => fetchPublicContent('ACTIVITY'), [], []);

  return (
    <div className="space-y-8" dir="rtl">
      <PageHero
        badge="الأنشطة"
        title="برامج ومبادرات تخدم الإنسان والمجتمع"
        description="ورش تعليمية، فعاليات ثقافية ودينية، ومبادرات تضامنية ننظمها على مدار العام."
        icon={FaHandsHelping}
      />
      <ContentGrid items={data} loading={loading} error={error} onRetry={reload} emptyTitle="لا توجد أنشطة منشورة حالياً" />
    </div>
  );
};

export default ActivityPage;
