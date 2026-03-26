import { Fragment, useEffect, useState, type FC } from 'react';
import { Button } from '../ui/button';
import Modalfooter from '../ui/modal/Footer';
import Modal from '../ui/modal/Modal';
import Modalheader from '../ui/modal/Header';
import Modalbody from '../ui/modal/Body';
import Icon from '../ui/svg_icon/SvgIcon';
import { useAppDispatch } from '@/Redux/Hooks';
import Spinner from '../ui/spinner';
import type { StudentDataResponse } from '@/pages/Dashboard/Students/Types';
import { getStudentById } from '@/Redux/Students/Slice';


interface Props {
    close: () => void;
    studentId: string | null;
}



const StudentModal: FC<Props> = ({ close, studentId }) => {


    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<StudentDataResponse | null>(null);


    const handleGetStudent = () => {
        setLoading(true);
        dispatch(getStudentById(studentId!))
            .unwrap()
            .then((res: any) => {
                setData(res.data.student);
                console.log("Data:", res.data.student);
            })
            .catch((err) => {
                console.log("Error: ", err);
            })
            .finally(() => {
                setLoading(false);

            });
    };

    useEffect(() => {
        if (studentId) {
            handleGetStudent();
        }
    }, [studentId]);


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
                            <h1 className="text-heading font-semibold">Student Details</h1>
                            <p className="text-paragraph text-gray-500">Here you can see the details of the selected student.</p>
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
                                                    <span className="text-gray-500 text-xs">Email</span>
                                                    <span className="text-paragraph">{data.email}</span>
                                                </div>

                                                <div className="flex flex-col">
                                                    <span className="text-gray-500 text-xs">Role</span>
                                                    <span className="text-paragraph capitalize">{data.role}</span>
                                                </div>

                                                <div className="flex flex-col">
                                                    <span className="text-gray-500 text-xs">Date Admitted</span>
                                                    <span className="text-paragraph">
                                                        {new Date(data.dateAdmitted).toLocaleDateString()}
                                                    </span>
                                                </div>

                                                <div className="flex flex-col">
                                                    <span className="text-gray-500 text-xs">Student's ID</span>
                                                    <span className="text-paragraph capitalize">{data.studentId}</span>
                                                </div>

                                                <div className="flex flex-col">
                                                    <span className="text-gray-500 text-xs">Class Levels</span>
                                                    <span className="text-paragraph capitalize">{data.classLevels?.length || 0}
                                                    </span>
                                                </div>

                                                <div className="flex flex-col">
                                                    <span className="text-gray-500 text-xs">Exam Results</span>
                                                    <span className="text-paragraph capitalize">{data.examResults?.length || 0}
                                                    </span>
                                                </div>

                                                <div className="flex flex-col">
                                                    <span className="text-gray-500 text-xs">Graduated</span>
                                                    <span className="text-paragraph capitalize">{data.isGraduated ? 'Yes' : 'No'}
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

export default StudentModal