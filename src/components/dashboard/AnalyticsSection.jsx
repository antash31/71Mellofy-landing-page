import React from 'react';
import AnalyticsHeader from './AnalyticsHeader';
import AnalyticsGrid from './AnalyticsGrid';
import CampaignDetails from './CampaignDetails';
import LeadStatistics from './LeadStatistics';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';

const AnalyticsSection = ({ analyticsData, isLoadingAnalytics, analyticsError, onRetryAnalytics }) => {
  if (isLoadingAnalytics) {
    return <LoadingState />;
  }

  if (analyticsError) {
    return <ErrorState error={analyticsError} onRetry={onRetryAnalytics} isLoading={isLoadingAnalytics} />;
  }

  if (!analyticsData) {
    return null;
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-10">
      <AnalyticsHeader analyticsData={analyticsData} />
      <AnalyticsGrid analyticsData={analyticsData} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CampaignDetails analyticsData={analyticsData} />
        <LeadStatistics analyticsData={analyticsData} />
      </div>
    </div>
  );
};

export default AnalyticsSection;
