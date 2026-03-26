import { useState } from 'react';
import { AnalyticsPageTabs, AnalyticsPageTabsTypes } from './Utils';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BehavioralAnalitics from '@/components/features/Analytics/BehavioralAnalitics';
import EducationalAnalytics from '@/components/features/Analytics/EducationalAnalytics';

const AnalyticsPage = () => {
  const [activeTab, setActiveTab] = useState<AnalyticsPageTabsTypes>(AnalyticsPageTabsTypes.BehavioralAnalytics);
  return (
    <div>
      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={(val) => setActiveTab(val as AnalyticsPageTabsTypes)} className="w-full h-full col-span-12 py-3">
        <TabsList className="bg-transparent justify-between w-full h-fit">
          <div className="flex w-full items-center gap-2">
            {AnalyticsPageTabs.map((tab) => (
              <TabsTrigger disabled={tab.disabled} key={tab.value} value={tab.value} className="bg-neutral-400 text-paragraph flex-1 px-3 py-2 rounded-full">
                {tab.name}
              </TabsTrigger>
            ))}
          </div>
        </TabsList>
      </Tabs>
      {activeTab === AnalyticsPageTabsTypes.BehavioralAnalytics && <BehavioralAnalitics />}
      {activeTab === AnalyticsPageTabsTypes.EducationalAnalytics && <EducationalAnalytics />}
    </div>
  );
};

export default AnalyticsPage;
