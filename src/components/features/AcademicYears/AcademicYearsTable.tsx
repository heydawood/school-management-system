import { useState, type FC } from 'react'
import Table from '@/components/ui/table/Table';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import type { Pagination } from '@/Utils/Types';
import { useLearningHubActionManager } from '@/pages/Dashboard/LearningHub/LearningHubActionManager';
import type { AcademicYearDataResponse } from '@/pages/Dashboard/AdminPanel/AcademicYears/Types';
import AcademicYearModal from '@/components/Modals/AcademicYearModal';
import { deleteAcademicYearById, updateAcademicYearById } from '@/Redux/AdminPanel/AcademicYears/Slice';
import { useAppDispatch } from '@/Redux/Hooks';
import { customToast } from '@/Common/Components/ShowToast';
import DeleteAcademicYearModal from '@/components/Modals/DeleteAcademicYearModal';
import UpdateAcademicYearModal from '@/components/Modals/UpdateAcademicYearModal';
import { useDeleteAcademicYears } from '@/Hooks/TanStack/AcademicYears/useDeleteAcademicYears';
import { useUpdateAcademicYears } from '@/Hooks/TanStack/AcademicYears/useUpdateAcademicYears';

const AcademicYearsTable: FC<{
    loading: boolean;
    data: AcademicYearDataResponse[];
    pagination: Pagination;
    filters: { search: string };
}> = ({ loading, data, pagination, filters }) => {

    const [openAcademicYearActionsModal, setOpenAcademicYearActionsModal] = useState<boolean>(false);
    const [openDeleteAcademicYearModal, setOpenDeleteAcademicYearModal] = useState<boolean>(false);

    const [selectedAcademicYearId, setSelectedAcademicYearId] = useState<string | null>(null);

    const [updateAcademicYearId, setUpdateAcademicYearId] = useState<string | null>(null);
    const [openUpdateAcademicYearModal, setOpenUpdateAcademicYearModal] = useState<boolean>(false);


    const [deleting, setDeleting] = useState(false);
    const [updating, setUpdating] = useState(false);




    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { handleGetLearningHub } = useLearningHubActionManager();


    const deleteMutation = useDeleteAcademicYears();
    const updateMutation = useUpdateAcademicYears();


    //delete function
    const handleDeleteAcademicYear = async () => {
        if (!selectedAcademicYearId) return;

            deleteMutation.mutate(selectedAcademicYearId);
            setOpenDeleteAcademicYearModal(false);

    };

    //update function
    const handleUpdateAcademicYear = async (updatedData: any) => {
        if (!updateAcademicYearId) return;

            updateMutation.mutate({ id: updateAcademicYearId, data: updatedData });
    };

    const AcademicYearsListColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a: AcademicYearDataResponse, b: AcademicYearDataResponse) => { // these(sorter & render) are built in sorters for the table columns, they sort the data based on the column values
                const nameA = a?.name?.toLowerCase() || '';
                const nameB = b?.name?.toLowerCase() || '';
                return nameA.localeCompare(nameB);
            },
            render: (_: any, record: AcademicYearDataResponse) => (
                <div className="flex items-center">
                    <span className="text-paragraph overflow-hidden">{record.name}</span>
                </div>
            ),
        },

        {
            title: 'From Year',
            dataIndex: 'fromYear',
            key: 'fromYear',
            sorter: (a: AcademicYearDataResponse, b: AcademicYearDataResponse) => {
                const descA = a?.fromYear?.toLowerCase() || '';
                const descB = b?.fromYear?.toLowerCase() || '';
                return descA.localeCompare(descB);
            },
            render: (_: any, record: AcademicYearDataResponse) => (
                <div className="flex items-center">
                    <span className="text-paragraph overflow-hidden">{new Date(record.fromYear).toLocaleDateString()}</span>
                </div>
            ),
        },
        {
            title: 'To Year',
            dataIndex: 'toYear',
            key: 'toYear',
            sorter: (a: AcademicYearDataResponse, b: AcademicYearDataResponse) => {
                const descA = a?.toYear?.toLowerCase() || '';
                const descB = b?.toYear?.toLowerCase() || '';
                return descA.localeCompare(descB);
            },
            render: (_: any, record: AcademicYearDataResponse) => (
                <div className="flex items-center">
                    <span className="text-paragraph overflow-hidden">{new Date(record.toYear).toLocaleDateString()}</span>
                </div>
            ),
        },

        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_: any, record: AcademicYearDataResponse) => (
                <div>
                    <Button onClick={() => {


                        setSelectedAcademicYearId(record.id);
                        setOpenAcademicYearActionsModal(true)
                    }} variant="link" className="text-primary-800 font-semibold">
                        View
                    </Button>

                    <Button 
                        onClick={() => {
                            setSelectedAcademicYearId(record.id);
                           // setModalAction('delete');
                            setOpenDeleteAcademicYearModal(true)
                        }} 
                        variant="link" 
                        className="text-error-800 font-semibold"
                        disabled={deleting}
                    >
                        {deleting ? 'Deleting...' : 'Delete'}
                    </Button>
                    <Button 

                        onClick={() => {
                            setUpdateAcademicYearId(record.id);
                            //setModalAction('update');
                            setOpenUpdateAcademicYearModal(true)
                        }} 
                        variant="link" 
                        className="text-green-600 font-semibold"
                        disabled={updating}
                    >
                        Update
                    </Button>
                </div>
            ),
        },
    ];



    return (
        <>
            <Table
                loading={loading}
                columns={AcademicYearsListColumns}
                dataSource={data}
                rowKey="id"
                headerStyle="bg-neutral-400 rounded-xl"
                pagination={{
                    totalItems: +pagination.total,
                    totalPages: +pagination.totalPages,
                    itemCount: data.length,
                    itemsPerPage: +pagination.limit,
                    currentPage: +pagination.page,
                    setitemsPerPage: (val: number) => {
                        handleGetLearningHub({ page: 1, limit: val });
                    },
                    onPageChange: (page: number) => {
                        handleGetLearningHub({ page, limit: pagination.limit });
                    },
                }}
            />


            {/* View Modal */}
            {openAcademicYearActionsModal && <AcademicYearModal
             academicYearId={selectedAcademicYearId} 
             close={() => setOpenAcademicYearActionsModal(false)} />}

            {openDeleteAcademicYearModal && <DeleteAcademicYearModal
                onDelete={handleDeleteAcademicYear}
                deleting={deleting}
             
             close={() => setOpenDeleteAcademicYearModal(false)} />}

                {/* Update Modal */}

        {openUpdateAcademicYearModal && <UpdateAcademicYearModal
            academicYearId={updateAcademicYearId}
            onUpdate={handleUpdateAcademicYear}
            updating={updating}
            close={() => setOpenUpdateAcademicYearModal(false)}
            
            initialName={data.find((year) => year.id === updateAcademicYearId)?.name || ''}
        />
        }
        </>
    )
}

export default AcademicYearsTable