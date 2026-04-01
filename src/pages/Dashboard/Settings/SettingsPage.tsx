import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { settingsTabs, SettingsTabsTypes } from './Utils';
import { useEffect, useState } from 'react';
import BasicSettingsComponent from '@/components/features/Settings/BasicSettingsComponent';
import { useAppDispatch } from '@/Redux/Hooks';
import { getAdminBasicSettings } from '@/Redux/Settings/Slice';
import type { BasicSettingsResponse } from './Types';
import Loader from '@/components/ui/loader/Loader';

const SettingsPage = () => {
  const [tab, setTab] = useState<SettingsTabsTypes>(SettingsTabsTypes.BASIC);
  const [setting, setSetting] = useState<BasicSettingsResponse>();
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  // const handleGetSettings = () => {
  //   setLoading(true);
  //   dispatch(getAdminBasicSettings())
  //     .unwrap()
  //     .then((res: BasicSettingsResponse) => {
  //       setSetting(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  // useEffect(() => {
  //   handleGetSettings();
  // }, [dispatch]);
  
  return (
    <div>
      {loading && <Loader />}
      <Tabs defaultValue={tab} value={tab} onValueChange={(val) => setTab(val as SettingsTabsTypes)} className="w-full h-full col-span-12 py-3">
        <TabsList className="bg-transparent justify-between w-full h-fit">
          <div className="flex w-full items-center gap-2">
            {settingsTabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="bg-neutral-400 text-paragraph flex-1 px-3 py-2 rounded-full">
                {tab.name}
              </TabsTrigger>
            ))}
          </div>
        </TabsList>
      </Tabs>
      <div>
        {tab === SettingsTabsTypes.BASIC && <BasicSettingsComponent setLoading={setLoading} basicSetting={setting} />}
        {/* {tab === SettingsTabsTypes.SYSTEM && <SystemMonitoringComponent />} */}
      </div>
    </div>
  );
};

export default SettingsPage;
