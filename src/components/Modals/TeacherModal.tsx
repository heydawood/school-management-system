import { Fragment, useEffect, useState, type FC } from 'react';
import { Button } from '../ui/button';
import Modalfooter from '../ui/modal/Footer';
import Modal from '../ui/modal/Modal';
import Modalheader from '../ui/modal/Header';
import Modalbody from '../ui/modal/Body';
import Icon from '../ui/svg_icon/SvgIcon';
import { useAppDispatch } from '@/Redux/Hooks';
import Spinner from '../ui/spinner';
import { useTeacherManager } from '@/pages/Dashboard/AdminPanel/Teachers/TeacherManager';


interface Props {
    close: () => void;
    teacherId: string | null;
}


const TeacherModal: FC<Props> = ({close, teacherId}) => {

    const dispatch = useAppDispatch();

    const {getTeacher} = useTeacherManager();

 //const { data, isLoading } = useTeacherById(teacherId);
 const { data, isLoading } = getTeacher(teacherId);


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
                            <h1 className="text-heading font-semibold">Teacher Details</h1>
                            <p className="text-paragraph text-gray-500">Here you can see the details of the selected teacher.</p>
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
                                                    <span className="text-paragraph font-medium">{data.name}</span>
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

                                                <div className="flex flex-col">
                                                    <span className="text-gray-500 text-xs">Teacher's ID</span>
                                                    <span className="text-paragraph capitalize">{data.teacherId}</span>
                                                </div>

                                                <div className="flex flex-col">
                                                    <span className="text-gray-500 text-xs">Exams Created</span>
                                                    <span className="text-paragraph capitalize">{data.examsCreated?.length || 0}
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

export default TeacherModal