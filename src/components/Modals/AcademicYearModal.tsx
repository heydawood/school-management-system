import { Fragment, useEffect, useState, type FC } from 'react';
import { Button } from '../ui/button';
import Modalfooter from '../ui/modal/Footer';
import Modal from '../ui/modal/Modal';
import Modalheader from '../ui/modal/Header';
import Modalbody from '../ui/modal/Body';
import Icon from '../ui/svg_icon/SvgIcon';
import { useAppDispatch } from '@/Redux/Hooks';
import Spinner from '../ui/spinner';
import { getAcademicYearById } from '@/Redux/AcademicYears/Slice';
import type { AcademicYearDataResponse } from '@/pages/Dashboard/AcademicYears/Types';


interface Props {
    close: () => void;
    academicYearId: string | null;
}



const AcademicYearModal: FC<Props> = ({ close, academicYearId }) => {


    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<AcademicYearDataResponse | null>(null);


    const handleGetAcademicYear = () => {
        setLoading(true);
        dispatch(getAcademicYearById(academicYearId!))
            .unwrap()
            .then((res: any) => {
                setData(res.data.academicYear);
                console.log("Data:", res.data.academicYear);
            })
            .catch((err) => {
                console.log("Error: ", err);
            })
            .finally(() => {
                setLoading(false);

            });
    };

    useEffect(() => {
        if (academicYearId) {
            handleGetAcademicYear();
        }
    }, [academicYearId]);




    return (
        <>
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
                            <h1 className="text-heading font-semibold">Academic Year Details</h1>
                            <p className="text-paragraph text-gray-500">Here you can see the details of the selected academic year.</p>
                        </div>
                    </Modalheader>

                    <Modalbody fixedHeight={false}>

                         <div>
                            <div className="mt-2">
                                <div>
                                    <div className="after:absolute after:inset-y-0 after:w-px after:bg-gray-500/20 relative pl-6 after:left-0 grid dark:after:bg-gray-400/20">
                                        {!data && !loading && (
                                            <p>No data found</p>
                                        )}
                                        {loading && <Spinner />}


                                        {data && (
                                            <div className="grid grid-cols-2 gap-4 text-sm mt-4">

                                                <div className="flex flex-col">
                                                    <span className="text-gray-500 text-xs">Name</span>
                                                    <span className="text-paragraph capitalize ">{data.name}</span>
                                                </div>

                                                <div className="flex flex-col">
                                                    <span className="text-gray-500 text-xs">ID</span>
                                                    <span className="text-paragraph">{data.id}</span>
                                                </div>

                                                <div className="flex flex-col">
                                                    <span className="text-gray-500 text-xs">Created By</span>
                                                    <span className="text-paragraph">{data.createdBy}</span>
                                                </div>

                                                <div className="flex flex-col">
                                                    <span className="text-gray-500 text-xs">From Year</span>
                                                    <span className="text-paragraph">
                                                        {new Date(data.fromYear).toLocaleDateString()}
                                                    </span>
                                                </div>

                                                <div className="flex flex-col">
                                                    <span className="text-gray-500 text-xs">To Year</span>
                                                    <span className="text-paragraph">
                                                        {new Date(data.toYear).toLocaleDateString()}
                                                    </span>
                                                </div>


                                                <div className="flex flex-col">
                                                    <span className="text-gray-500 text-xs">Students</span>
                                                    <span className="text-paragraph capitalize">{data.students?.length || 0}
                                                    </span>
                                                </div>

                                                <div className="flex flex-col">
                                                    <span className="text-gray-500 text-xs">Teachers</span>
                                                    <span className="text-paragraph capitalize">{data.teachers?.length || 0}
                                                    </span>
                                                </div>

                                                <div className="flex flex-col">
                                                    <span className="text-gray-500 text-xs">Current</span>
                                                    <span className="text-paragraph capitalize">{data.isCurrent ? 'Yes' : 'No'}
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

        </>
    )
}

export default AcademicYearModal