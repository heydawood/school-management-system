import { useEffect, useState } from 'react';
import ReportsTable from './Reports/ReportsTable';
import { AppUsageTabs, AppUsageTabsTypes, reportsTableData, SettingsData, userFeedbackTabs, UserFeedbackTabsTypes } from '@/pages/Dashboard/Settings/Utils';
import StatChartCard from '../Dashboard/StatChartCard';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PieDonutChart from '@/components/Charts/PieDonutChart';
import ComparisonLineChart from '@/components/Charts/ComparisionLineChart';
import { useAppDispatch } from '@/Redux/Hooks';
import type { AdminSystemSettingsResponse, AppUsage, UserFeedbackSummary, UserSupportQuestion } from '@/pages/Dashboard/Settings/Types';
import { getAdminSystemSettings, getSettingsAppUsage, getUserFeedbackSummary, getUserSupportQuestions } from '@/Redux/Settings/Slice';
import { format } from 'date-fns';
import { getDailyToYearlyDateRange } from '@/Utils/Helpers';
import type { Pagination } from '@/Utils/Types';

const SystemMonitoringComponent = () => {
  const [systemSettings, setSystemSettings] = useState<AdminSystemSettingsResponse>();
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 10, totalPages: 1, total: 0 });

  const dispatch = useAppDispatch();

  const getSystemSettings = () => {
    setLoading(true);
    dispatch(getAdminSystemSettings())
      .unwrap()
      .then((data) => {
        setSystemSettings(data);
      })
      .catch((error) => {
        console.error('Failed to fetch system settings:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGetUserSupportQuestions = (page: number, limit: number) => {
    setLoading(true);
    dispatch(getUserSupportQuestions({ page, limit }))
      .unwrap()
      .then((data: { userSupportQuestions: UserSupportQuestion[]; meta: Pagination }) => {
        setSystemSettings((prev) => ({
          ...prev,
          userFeedBackSummary: systemSettings?.userFeedBackSummary!,
          appUsages: prev?.appUsages || [],
          userSupportQuestions: [...(prev?.userSupportQuestions || []), ...data.userSupportQuestions],
        }));
        setPagination({ page: +data.meta.page, limit: +data.meta.limit, totalPages: +data.meta.totalPages, total: +data.meta.total });
      })
      .catch((error) => {
        console.error('Failed to fetch system settings:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getSystemSettingsRange = (startDate: string | null, endDate: string | null) => {
    setLoading(true);
    dispatch(getSettingsAppUsage({ startDate, endDate }))
      .unwrap()
      .then((data: AppUsage[]) => {
        setSystemSettings(
          (prev) =>
            ({
              ...prev,
              appUsages: data,
            } as AdminSystemSettingsResponse),
        );
      })
      .catch((error) => {
        console.error('Failed to fetch system settings:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGetFeedbackRange = (startDate: string | null, endDate: string | null) => {
    setLoading(true);
    dispatch(getUserFeedbackSummary({ startDate, endDate }))
      .unwrap()
      .then((data: UserFeedbackSummary[]) => {
        setSystemSettings(
          (prev) =>
            ({
              ...prev,
              userFeedBackSummary: data,
            } as AdminSystemSettingsResponse),
        );
      })
      .catch((error) => {
        console.error('Failed to fetch system settings:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getSystemSettings();
  }, [dispatch]);

  return (
    <div>
      <div>
        <ReportsTable pagination={pagination} onScrollEnd={handleGetUserSupportQuestions} data={systemSettings?.userSupportQuestions} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* App Usage */}
        <StatChartCard date={SettingsData.appUsage.date} icon={SettingsData.appUsage.icon} title={SettingsData.appUsage.title}>
          <Tabs
            defaultValue={AppUsageTabsTypes.Weekly}
            onValueChange={(val) => {
              const { fromDate, toDate } = getDailyToYearlyDateRange(val as any);
              getSystemSettingsRange(fromDate, toDate);
            }}
            className="w-full h-full col-span-12 py-3"
          >
            <TabsList className="bg-transparent justify-between w-full h-fit">
              <div className="flex w-full items-center gap-2">
                {AppUsageTabs.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value} className="bg-neutral-400 text-paragraph flex-1 px-3 py-2 rounded-full">
                    {tab.name}
                  </TabsTrigger>
                ))}
              </div>
            </TabsList>
          </Tabs>
          <div className="mt-2">
            <ComparisonLineChart
              key={systemSettings?.appUsages?.length}
              data={systemSettings?.appUsages?.map((item) => ({ name: format(new Date(item.date), 'MMM dd'), active: item.active, inactive: item.idle }))!}
              height={300}
            />
          </div>
        </StatChartCard>
        {/* User Feedback */}
        <StatChartCard date={SettingsData.userFeedback.date} icon={SettingsData.userFeedback.icon} title={SettingsData.userFeedback.title}>
          <Tabs
            defaultValue={UserFeedbackTabsTypes.Weekly}
            onValueChange={(val) => {
              const { fromDate, toDate } = getDailyToYearlyDateRange(val as any, true);
              handleGetFeedbackRange(fromDate, toDate);
            }}
            className="w-full h-full col-span-12 py-3"
          >
            <TabsList className="bg-transparent justify-between w-full h-fit">
              <div className="flex w-full items-center gap-2">
                {userFeedbackTabs.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value} className="bg-neutral-400 text-paragraph flex-1 px-3 py-2 rounded-full">
                    {tab.name}
                  </TabsTrigger>
                ))}
              </div>
            </TabsList>
          </Tabs>
          <div className="mt-2">
            {systemSettings?.userFeedBackSummary?.length == 0 || systemSettings?.userFeedBackSummary.every((item) => item.percentage == 0) ? (
              <div className="w-full h-72 flex items-center justify-center">
                <p className="text-paragraph">No data available</p>
              </div>
            ) : (
              <div>
                <PieDonutChart
                  key={systemSettings?.userFeedBackSummary?.length}
                  data={systemSettings?.userFeedBackSummary?.map((item) => ({ name: item.label, value: item.percentage }))! || []}
                  height={300}
                />
              </div>
            )}
          </div>
        </StatChartCard>
      </div>
    </div>
  );
};

export default SystemMonitoringComponent;
