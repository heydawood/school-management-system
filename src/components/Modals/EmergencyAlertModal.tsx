import { Fragment, type FC, useState, useEffect } from 'react';
import { Button } from '../ui/button';
import Modalfooter from '../ui/modal/Footer';
import Modal from '../ui/modal/Modal';
import Modalheader from '../ui/modal/Header';
import Modalbody from '../ui/modal/Body';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '../ui/svg_icon/SvgIcon';
import { EmergencyAlertModalTabs, EmergencyAlertModalTabsTypes } from '@/pages/Dashboard/Home/Utils';
import { Avatar, AvatarImage } from '../ui/avatar';
import CardPagination from '../ui/pagination/CardPagination';
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { getEmergencyAlerts, remindAllMembers, remindSingleMember, updateReminderStatus } from '@/Redux/Home/Slice';
import type { AlertUser } from '@/pages/Dashboard/Home/Types';
import { MapWithSearch } from '@/Common/Components/Map';
import { customToast } from '@/Common/Components/ShowToast';
import Loader from '../ui/loader/Loader';
import Spinner from '../ui/spinner';
import { getDateRange } from '@/Utils/Helpers';

interface Props {
  close: () => void;
}

const Useritem: FC<{ user: AlertUser; onRemind: (userId: number) => void }> = ({ user, onRemind }) => {
  return (
    <div className="flex justify-between items-center mb-3">
      <div className="flex items-center gap-2">
        <span className="cursor-pointer">
          <Avatar className="rounded-lg">
            <AvatarImage src={user.avatar ? user.avatar : '/images/user-default.png'} alt="user" className="object-cover" />
          </Avatar>
        </span>
        <div className="hidden sm:block">
          <p className="text-sm font-semibold">{user.name}</p>
          <p className="text-xs text-gray-700">{user.phone}</p>
        </div>
      </div>

      <div>
        <Button disabled={user.isReminded} onClick={() => onRemind(user.userId)} className="bg-primary-25 text-primary-800 rounded-full py-1 flex gap-2">
          <span className="bg-primary-800 rounded-full h-2 w-2"></span> Remind Member
        </Button>
      </div>
    </div>
  );
};

const EmergencyAlertModal: FC<Props> = ({ close }) => {
  const [activeTab, setActiveTab] = useState<EmergencyAlertModalTabsTypes>(EmergencyAlertModalTabsTypes.Today);
  const { userAlerts, userAlertsPagination, loading } = useAppSelector((state) => state.homePage);
  const [apiLoading, setApiLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleRemindMember = (userId: number) => {
    setApiLoading(true);
    dispatch(remindSingleMember(userId))
      .unwrap()
      .then((res) => {
        dispatch(updateReminderStatus([userId]));
        customToast.success(res.message ?? 'Reminder sent successfully');
      })
      .catch((error) => {
        customToast.error(error);
      })
      .finally(() => {
        setApiLoading(false);
      });
  };

  const handleRemindAllMembers = (userIds: number[]) => {
    setApiLoading(true);
    dispatch(remindAllMembers(userIds))
      .unwrap()
      .then((res) => {
        dispatch(updateReminderStatus(userIds));
        customToast.success(res.message ?? 'Reminder sent successfully');
      })
      .catch((error) => {
        customToast.error(error);
      })
      .finally(() => {
        setApiLoading(false);
      });
  };

  useEffect(() => {
    const { fromDate, toDate } = getDateRange(activeTab);
    dispatch(getEmergencyAlerts({ page: 1, limit: 10, startDate: fromDate, endDate: toDate }));
  }, [dispatch]);
  return (
    <div>
      <Modal classNames={`md:max-w-[60%] md:min-w-[60%] h-fit overflow-x-auto scrollbar-thin`} closeModal={close}>
        <Fragment>
          <Modalheader
            logoClasses="bg-error"
            customLogo={<Icon icon="/icons/alert-icon.svg" className="text-white" />}
            className="p-4"
            contentLocation="left"
            showCloseButton={true}
            onCloseClick={close}
          >
            <div>
              <h1 className="text-heading font-semibold">Emergency Alert</h1>
              <p className="text-paragraph text-gray-500">Here you can see all of the recent emergency alerts.</p>
            </div>
          </Modalheader>
          <Modalbody fixedHeight={false}>
            <div>
              <Tabs
                defaultValue={activeTab}
                onValueChange={(val) =>
                  dispatch(
                    getEmergencyAlerts({
                      page: 1,
                      limit: 10,
                      startDate: getDateRange(val as EmergencyAlertModalTabsTypes).fromDate,
                      endDate: getDateRange(val as EmergencyAlertModalTabsTypes).toDate,
                    }),
                  )
                }
                className="w-full h-full col-span-12 mb-3"
              >
                <TabsList className="bg-transparent justify-between w-full h-fit">
                  <div className="flex w-full items-center gap-2">
                    {EmergencyAlertModalTabs.map((tab) => (
                      <TabsTrigger key={tab.value} value={tab.value} className="bg-neutral-400 text-paragraph flex-1 px-3 py-2 rounded-full">
                        {tab.name}
                      </TabsTrigger>
                    ))}
                  </div>
                </TabsList>
              </Tabs>

              <div className="grid grid-cols-12 gap-4 h-full">
                <div className="col-span-12 md:col-span-7 h-full">
                  <div className="mt-2">
                    <MapWithSearch
                      key={JSON.stringify(userAlerts)}
                      markers={userAlerts?.map((user) => ({ lat: parseFloat(user.latitude), lng: parseFloat(user.longitude), name: user.name, image: user.avatar }))}
                      width="100%"
                      height="500px"
                      zoom={10}
                    />
                  </div>
                </div>
                <div className="col-span-12 md:col-span-5 flex flex-col gap-2">
                  {loading ? <Spinner /> : userAlerts?.length === 0 ? <p className="text-center col-span-12 py-4 text-gray-500">No emergency alerts found.</p> : null}
                  {userAlerts?.map((user: AlertUser, index: number) => (
                    <Useritem onRemind={(id: number) => handleRemindMember(id)} key={index} user={user} />
                  ))}
                  {userAlerts?.length > 0 && (
                    <div className="mt-4">
                      <CardPagination
                        totalPages={userAlertsPagination?.totalPages}
                        onPageChange={(page: number) =>
                          dispatch(getEmergencyAlerts({ page, limit: 10, startDate: getDateRange(activeTab).fromDate, endDate: getDateRange(activeTab).toDate }))
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Modalbody>
          <Modalfooter>
            <div className="grid grid-cols-4 w-full gap-3">
              {/* Close Button */}
              <Button onClick={close} type="button" variant={'outline'} className="w-full col-span-1 rounded-xl hover:bg-primary hover:text-white  mt-2 px-5 py-3 h-12">
                Close
              </Button>

              {/* Remind All Members Button */}
              <Button
                disabled={userAlerts?.every((el) => el.isReminded)}
                onClick={() => handleRemindAllMembers(userAlerts?.filter((el) => !el.isReminded).map((el) => el.userId))}
                type="button"
                className="w-full col-span-3 rounded-xl text-white  mt-2 px-5 py-3 h-12"
              >
                Remind All Members
              </Button>
            </div>
          </Modalfooter>
        </Fragment>
      </Modal>
    </div>
  );
};

export default EmergencyAlertModal;
