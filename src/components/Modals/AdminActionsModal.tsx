import { Fragment, useEffect, type FC } from 'react';
import { Button } from '../ui/button';
import Modalfooter from '../ui/modal/Footer';
import Modal from '../ui/modal/Modal';
import Modalheader from '../ui/modal/Header';
import Modalbody from '../ui/modal/Body';
import Icon from '../ui/svg_icon/SvgIcon';
import CardPagination from '../ui/pagination/CardPagination';
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { getAdminActivities } from '@/Redux/Home/Slice';
import { formatTimeAgo } from '@/Utils/Helpers';
import Spinner from '../ui/spinner';

interface Props {
  close: () => void;
}

const AdminActionsModal: FC<Props> = ({ close }) => {
  const { adminActivities, adminActivitiesPagination, loading } = useAppSelector((state) => state.homePage);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAdminActivities({ page: adminActivitiesPagination?.page ?? 1, limit: adminActivitiesPagination?.limit ?? 10 }));
  }, [dispatch]);
  return (
    <div>
      <Modal classNames={`md:max-w-[40%] md:min-w-[40%] h-fit overflow-x-auto scrollbar-thin`} closeModal={close}>
        <Fragment>
          <Modalheader
            logoClasses="bg-primary"
            customLogo={<Icon icon="/icons/user-block.svg" className="text-white" />}
            className="p-4"
            contentLocation="left"
            showCloseButton={true}
            onCloseClick={close}
          >
            <div>
              <h1 className="text-heading font-semibold">Latest Admin Actions</h1>
              <p className="text-paragraph text-gray-500">Here you can see the last activities of users in sanady.</p>
            </div>
          </Modalheader>

          <Modalbody fixedHeight={false}>
            <div>
              <div className="mt-2">
                <div>
                  <div className="after:absolute after:inset-y-0 after:w-px after:bg-gray-500/20 relative pl-6 after:left-0 grid dark:after:bg-gray-400/20">
                    {adminActivities?.length === 0 && !loading && (
                      <div>
                        <p>No activities available</p>
                      </div>
                    )}
                    {loading && <Spinner />}
                    {adminActivities?.map((activity, index) => (
                      <div key={index} className="grid gap-1 text-sm mb-6 relative">
                        <div className="aspect-square flex justify-center items-center w-4 bg-warning-100 rounded-full absolute left-0 translate-x-[-30.5px] z-10 top-1">
                          <div className="w-3 aspect-square rounded-full bg-warning-600" />
                        </div>

                        <div className="flex gap-4 justify-between">
                          <div className="flex gap-1 items-center">
                            {/* render html */}
                            <p dangerouslySetInnerHTML={{ __html: activity.content }} className="text-paragraph" />
                          </div>
                          <div className="text-gray-500 text-nowrap">{formatTimeAgo(activity.createdAt)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <CardPagination
                  key={adminActivities?.length}
                  showItems={5}
                  totalPages={adminActivitiesPagination?.totalPages}
                  onPageChange={(page: number) => dispatch(getAdminActivities({ page, limit: adminActivitiesPagination.limit }))}
                />{' '}
              </div>
            </div>
          </Modalbody>

          <Modalfooter>
            {/* Close Button */}
            <Button onClick={close} type="button" variant={'outline'} className="w-full col-span-1 rounded-xl hover:bg-primary hover:text-white  mt-2 px-5 py-3 h-12">
              Close
            </Button>
          </Modalfooter>
        </Fragment>
      </Modal>
    </div>
  );
};

export default AdminActionsModal;
