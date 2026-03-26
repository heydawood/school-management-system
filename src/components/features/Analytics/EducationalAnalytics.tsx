import StatChartCard from '@/components/features/Dashboard/StatChartCard';
import {
  analyticsPageData,
  moduleEngagementTabs,
  ModuleEngagementTabsTypes,
  quizCompletionTabs,
  QuizCompletionTabsTypes,
  timeSpentTabs,
  TimeSpentTabsTypes,
} from '@/pages/Dashboard/Analytics/Utils';
import ColoredLineChart from '@/components/Charts/ColoredLineChart';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppScatterChart from '@/components/Charts/ScatterChart';
import ComparisonBarChart from '@/components/Charts/ComparisonBarChart';
const EducationalAnalytics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
      {/* Module Engagement */}
      <div>
        <StatChartCard date={analyticsPageData?.moduleEngagement?.date} icon={analyticsPageData.moduleEngagement.icon} title={analyticsPageData.moduleEngagement.title}>
          <Tabs defaultValue={ModuleEngagementTabsTypes.Weekly} onValueChange={(val) => {}} className="w-full h-full col-span-12 py-3">
            <TabsList className="bg-transparent justify-between w-full h-fit">
              <div className="flex w-full items-center gap-2">
                {moduleEngagementTabs.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value} className="bg-neutral-400 text-paragraph flex-1 px-3 py-2 rounded-full">
                    {tab.name}
                  </TabsTrigger>
                ))}
              </div>
            </TabsList>
          </Tabs>
          <div>
            <AppScatterChart data={analyticsPageData.moduleEngagement.data} colors={['#30B795', '#CE8B27', '#FF6A6A']} height={250} />
          </div>
        </StatChartCard>
      </div>

      {/* Quiz Completion */}
      <div>
        <StatChartCard date={analyticsPageData?.quizCompletion?.date} icon={analyticsPageData.quizCompletion.icon} title={analyticsPageData.quizCompletion.title}>
          <Tabs defaultValue={QuizCompletionTabsTypes.Weekly} onValueChange={(val) => {}} className="w-full h-full col-span-12 py-3">
            <TabsList className="bg-transparent justify-between w-full h-fit">
              <div className="flex w-full items-center gap-2">
                {quizCompletionTabs.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value} className="bg-neutral-400 text-paragraph flex-1 px-3 py-2 rounded-full">
                    {tab.name}
                  </TabsTrigger>
                ))}
              </div>
            </TabsList>
          </Tabs>
          <div>
            <ComparisonBarChart data={analyticsPageData.quizCompletion.data} bars={analyticsPageData.quizCompletion.bars} height={250} />
          </div>
        </StatChartCard>
      </div>

      {/* Time spent per topic */}
      <div className="md:col-span-2">
        <StatChartCard date={analyticsPageData?.timeSpent?.date} icon={analyticsPageData.timeSpent.icon} title={analyticsPageData.timeSpent.title}>
          <Tabs defaultValue={TimeSpentTabsTypes.Weekly} onValueChange={(val) => {}} className="w-full h-full col-span-12 py-3">
            <TabsList className="bg-transparent justify-between w-full h-fit">
              <div className="flex w-full items-center gap-2">
                {timeSpentTabs.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value} className="bg-neutral-400 text-paragraph flex-1 px-3 py-2 rounded-full">
                    {tab.name}
                  </TabsTrigger>
                ))}
              </div>
            </TabsList>
          </Tabs>
          <div>
            <ColoredLineChart gradientId="growthGradient" data={analyticsPageData.timeSpent.data} dataKey="uv" color={analyticsPageData.timeSpent.color} />
          </div>
        </StatChartCard>
      </div>
    </div>
  );
};

export default EducationalAnalytics;
