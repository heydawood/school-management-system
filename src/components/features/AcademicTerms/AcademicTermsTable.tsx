import { useState, type FC } from 'react'
import Table from '@/components/ui/table/Table';
import { Button } from '@/components/ui/button';
import type { Pagination } from '@/Utils/Types';
import { useLearningHubActionManager } from '@/pages/Dashboard/LearningHub/LearningHubActionManager';
import { useAppDispatch } from '@/Redux/Hooks';
import { customToast } from '@/Common/Components/ShowToast';
import AcademicTermModal from '@/components/Modals/AcademicTermModal';
import DeleteAcademicTermModal from '@/components/Modals/DeleteAcademicTermModal';
import UpdateAcademicTermModal from '@/components/Modals/UpdateAcademicTermModal';
import type { AcademicTermDataResponse } from '@/pages/Dashboard/AdminPanel/AcademicTerms/Types';
import { deleteAcademicTermById, updateAcademicTermById } from '@/Redux/AcademicTerms/Slice';

const AcademicTermsTable: FC<{
    loading: boolean;
    data: AcademicTermDataResponse[];
    pagination: Pagination;
    filters: { search: string };
}> = ({ loading, data, pagination, filters }) => {

    const [openAcademicTermActionsModal, setOpenAcademicTermActionsModal] = useState<boolean>(false);
    const [openDeleteAcademicTermModal, setOpenDeleteAcademicTermModal] = useState<boolean>(false);

    const [selectedAcademicTermId, setSelectedAcademicTermId] = useState<string | null>(null);

    const [updateAcademicTermId, setUpdateAcademicTermId] = useState<string | null>(null);
    const [openUpdateAcademicTermModal, setOpenUpdateAcademicTermModal] = useState<boolean>(false);


    const [deleting, setDeleting] = useState(false);
    const [updating, setUpdating] = useState(false);


    const dispatch = useAppDispatch();
    const { handleGetLearningHub } = useLearningHubActionManager();


    //delete function
    const handleDeleteAcademicTerm = async () => {
        if (!selectedAcademicTermId) return;

        setDeleting(true);
        try {
            await dispatch(deleteAcademicTermById(selectedAcademicTermId))
                .unwrap();
            customToast.success('Academic term deleted successfully.');

            // Close the modal
            setOpenDeleteAcademicTermModal(false);

            // Refresh the list after deletion
            setSelectedAcademicTermId(null);



        } catch (error: any) {
            customToast.error(error?.message || 'Failed to delete academic term.');
        } finally {
            setDeleting(false);
        }
    };

    //update function
    const handleUpdateAcademicTerm = async (updatedData: any) => {
        if (!updateAcademicTermId) return;

        setUpdating(true);
        try {
            await dispatch(updateAcademicTermById({ academicTermId: updateAcademicTermId, academicTermData: updatedData }))
                .unwrap();
            customToast.success('Academic term updated successfully.');

            // Close the modal
            setOpenUpdateAcademicTermModal(false);

            // Refresh the list after update
            setUpdateAcademicTermId(null);
        } catch (error: any) {
            customToast.error(error?.message || 'Failed to update academic term.');
        } finally {
            setUpdating(false);
        }
    };

    const AcademicTermsListColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a: AcademicTermDataResponse, b: AcademicTermDataResponse) => { // these(sorter & render) are built in sorters for the table columns, they sort the data based on the column values
                const nameA = a?.name?.toLowerCase() || '';
                const nameB = b?.name?.toLowerCase() || '';
                return nameA.localeCompare(nameB);
            },
            render: (_: any, record: AcademicTermDataResponse) => (
                <div className="flex items-center">
                    <span className="text-paragraph overflow-hidden">{record.name}</span>
                </div>
            ),
        },

        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            sorter: (a: AcademicTermDataResponse, b: AcademicTermDataResponse) => {
                const descA = a?.description?.toLowerCase() || '';
                const descB = b?.description?.toLowerCase() || '';
                return descA.localeCompare(descB);
            },
            render: (_: any, record: AcademicTermDataResponse) => (
                <div className="flex items-center">
                    <span className="text-paragraph overflow-hidden">{record.description}</span>
                </div>
            ),
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration',
            sorter: (a: AcademicTermDataResponse, b: AcademicTermDataResponse) => {
                const descA = a?.duration?.toLowerCase() || '';
                const descB = b?.duration?.toLowerCase() || '';
                return descA.localeCompare(descB);
            },
            render: (_: any, record: AcademicTermDataResponse) => (
                <div className="flex items-center">
                    <span className="text-paragraph overflow-hidden">{record.duration}</span>
                </div>
            ),
        },

        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_: any, record: AcademicTermDataResponse) => (
                <div>
                    <Button onClick={() => {


                        setSelectedAcademicTermId(record.id);
                        setOpenAcademicTermActionsModal(true)
                    }} variant="link" className="text-primary-800 font-semibold">
                        View
                    </Button>

                    <Button 
                        onClick={() => {
                            setSelectedAcademicTermId(record.id);
                           // setModalAction('delete');
                            setOpenDeleteAcademicTermModal(true)
                        }} 
                        variant="link" 
                        className="text-error-800 font-semibold"
                        disabled={deleting}
                    >
                        {deleting ? 'Deleting...' : 'Delete'}
                    </Button>
                    <Button 

                        onClick={() => {
                            setUpdateAcademicTermId(record.id);
                            //setModalAction('update');
                            setOpenUpdateAcademicTermModal(true)
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
                columns={AcademicTermsListColumns}
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
            {openAcademicTermActionsModal && <AcademicTermModal
             academicTermId={selectedAcademicTermId} 
             close={() => setOpenAcademicTermActionsModal(false)} />}

            {openDeleteAcademicTermModal && <DeleteAcademicTermModal
                onDelete={handleDeleteAcademicTerm}
                deleting={deleting}
             
             close={() => setOpenDeleteAcademicTermModal(false)} />}

                {/* Update Modal */}

        {openUpdateAcademicTermModal && <UpdateAcademicTermModal
            academicTermId={updateAcademicTermId}
            onUpdate={handleUpdateAcademicTerm}
            updating={updating}
            close={() => setOpenUpdateAcademicTermModal(false)}
            
            initialName={data.find((term) => term.id === updateAcademicTermId)?.name || ''}
            initialDescription={data.find((term) => term.id === updateAcademicTermId)?.description || ''}
        />
        }
    </>
    )
}

export default AcademicTermsTable