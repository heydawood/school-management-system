import { Fragment, useEffect, useState, type FC } from 'react';
import { Button } from '../ui/button';
import Modalfooter from '../ui/modal/Footer';
import Modal from '../ui/modal/Modal';
import Modalheader from '../ui/modal/Header';
import Modalbody from '../ui/modal/Body';
import Icon from '../ui/svg_icon/SvgIcon';
import Spinner from '../ui/spinner';
import { useAdminManager } from '@/pages/Dashboard/AdminPanel/Admins/AdminManager';

interface Props {
    close: () => void;
    adminId: string | null;
}

const AdminModal: FC<Props> = ({ close, adminId }) => {

    //const { adminActivities } = useAppSelector((state) => state.homePage);

    //const dispatch = useAppDispatch();

    // const [loading, setLoading] = useState<boolean>(false);
    // const [data, setData] = useState<AdminDataByIdResponse | null>(null);


    // const handleGetAdmin = () => {
    //     setLoading(true);
    //     dispatch(getAdminById(adminId!))
    //         .unwrap()
    //         .then((res: any) => {
    //             setData(res.data.admin);
    //             console.log("Data:", res.data.admin);
    //         })
    //         .catch((err) => {
    //             console.log("Error: ", err);
    //         })
    //         .finally(() => {
    //             setLoading(false);

    //         });
    // };

    // useEffect(() => {
    //     if (adminId) {
    //         handleGetAdmin();
    //     }
    // }, [adminId]);

    const {getAdmin} = useAdminManager();

    //const { data, isLoading } = useAdminById(adminId);
    const { data, isLoading } = getAdmin(adminId);

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
                            <h1 className="text-heading font-semibold">Admin Details</h1>
                            <p className="text-paragraph text-gray-500">Here you can see the details of the selected admin.</p>
                        </div>
                    </Modalheader>

                    <Modalbody fixedHeight={false}>
                        <div>
                            <div className="mt-2">
                                <div>
                                    <div className="after:absolute after:inset-y-0 after:w-px after:bg-gray-500/20 relative pl-6 after:left-0 grid dark:after:bg-gray-400/20">
                                        {!data && !isLoading && (
                                            <p>No data found</p>
                                        )}
                                        {isLoading && <Spinner />}


                                        {data && (
                                            <div className="grid grid-cols-2 gap-4 text-sm mt-4">

                                                <div className="flex flex-col">
                                                    <span className="text-gray-500 text-xs">Name</span>
                                                    <span className="text-paragraph">{data.name}</span>
                                                </div>

                                                <div className="flex flex-col">
                                                    <span className="text-gray-500 text-xs">ID</span>
                                                    <span className="text-paragraph ">{data.id}</span>
                                                </div>

                                                <div className="flex flex-col">
                                                    <span className="text-gray-500 text-xs">Email</span>
                                                    <span className="text-paragraph">{data.email}</span>
                                                </div>

                                                <div className="flex flex-col">
                                                    <span className="text-gray-500 text-xs">Role</span>
                                                    <span className="text-paragraph capitalize">{data.role}</span>
                                                </div>

                                                <div className="flex flex-col">
                                                    <span className="text-gray-500 text-xs">Created At</span>
                                                    <span className="text-paragraph">
                                                        {new Date(data.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>

                                            </div>
                                        )}




                                    </div>
                                </div>
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

export default AdminModal;