import React from 'react';
import { EmptyState, ErrorState, LoadingState } from '../../../components/ui';
import ContentCard from './ContentCard';

const ContentGrid = ({ items, loading, error, onRetry, emptyTitle = 'لا يوجد محتوى منشور حالياً', emptyDescription = 'تابعونا قريباً لمعرفة المستجدات.' }) => {
  if (loading) return <LoadingState />;
  if (error) {
    return (
      <div className="rounded-[2rem] border border-slate-200 bg-white">
        <ErrorState message={error} onRetry={onRetry} />
      </div>
    );
  }
  if (!items?.length) {
    return (
      <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white">
        <EmptyState title={emptyTitle} description={emptyDescription} />
      </div>
    );
  }
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => <ContentCard key={item.id} item={item} />)}
    </div>
  );
};

export default ContentGrid;
