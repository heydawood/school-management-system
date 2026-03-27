import { useState, type FC } from 'react'
import Table from '@/components/ui/table/Table';
import { Button } from '@/components/ui/button';
import type { Pagination } from '@/Utils/Types';
import { useLearningHubActionManager } from '@/pages/Dashboard/LearningHub/LearningHubActionManager';
import { useAppDispatch } from '@/Redux/Hooks';
import { customToast } from '@/Common/Components/ShowToast';
import type { ProgramsDataResponse } from '@/pages/Dashboard/Programs/Types';
import { deleteProgramsById, updateProgramsById } from '@/Redux/Programs/Slice';
import ProgramsModal from '@/components/Modals/ProgramsModal';
import DeleteProgramsModal from '@/components/Modals/DeleteProgramsModal';
import UpdateProgramsModal from '@/components/Modals/UpdateProgramsModal';

const ProgramsTable: FC<{
    loading: boolean;
    data: ProgramsDataResponse[];
    pagination: Pagination;
    filters: { search: string };
}> = ({ loading, data, pagination, filters }) => {

    const [openProgramsActionsModal, setOpenProgramsActionsModal] = useState<boolean>(false);
    const [openDeleteProgramsModal, setOpenDeleteProgramsModal] = useState<boolean>(false);

    const [selectedProgramsId, setSelectedProgramsId] = useState<string | null>(null);

    const [updateProgramsId, setUpdateProgramsId] = useState<string | null>(null);
    const [openUpdateProgramsModal, setOpenUpdateProgramsModal] = useState<boolean>(false);


    const [deleting, setDeleting] = useState(false);
    const [updating, setUpdating] = useState(false);


    const dispatch = useAppDispatch();
    const { handleGetLearningHub } = useLearningHubActionManager();


    //delete function
    const handleDeletePrograms= async () => {
      console.log('deleted clicked. id:', selectedProgramsId)
        if (!selectedProgramsId) return;

        setDeleting(true);
        try {
            await dispatch(deleteProgramsById(selectedProgramsId))
                .unwrap();
            customToast.success('Program deleted successfully.');

            // Close the modal
            setOpenDeleteProgramsModal(false);

            // Refresh the list after deletion
            setSelectedProgramsId(null);



        } catch (error: any) {
            customToast.error(error?.message || 'Failed to delete Programs.');
        } finally {
            setDeleting(false);
        }
    };

    //update function
    const handleUpdatePrograms = async (updatedData: any) => {
        if (!updateProgramsId) return;

        setUpdating(true);
        try {
          console.log(updatedData)
            await dispatch(updateProgramsById({ programsId: updateProgramsId, programsData: updatedData }))
                .unwrap();
            customToast.success('Programs updated successfully.');

            // Close the modal
            setOpenUpdateProgramsModal(false);

            // Refresh the list after update
            setUpdateProgramsId(null);
        } catch (error: any) {
            customToast.error(error?.message || 'Failed to update Programs.');
        } finally {
            setUpdating(false);
        }
    };

    const ProgramsListColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a: ProgramsDataResponse, b: ProgramsDataResponse) => { // these(sorter & render) are built in sorters for the table columns, they sort the data based on the column values
                const nameA = a?.name?.toLowerCase() || '';
                const nameB = b?.name?.toLowerCase() || '';
                return nameA.localeCompare(nameB);
            },
            render: (_: any, record: ProgramsDataResponse) => (
                <div className="flex items-center">
                    <span className="text-paragraph overflow-hidden">{record.name}</span>
                </div>
            ),
        },

        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            sorter: (a: ProgramsDataResponse, b: ProgramsDataResponse) => {
                const descA = a?.description?.toLowerCase() || '';
                const descB = b?.description?.toLowerCase() || '';
                return descA.localeCompare(descB);
            },
            render: (_: any, record: ProgramsDataResponse) => (
                <div className="flex items-center">
                    <span className="text-paragraph overflow-hidden">{record.description}</span>
                </div>
            ),
        },

        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
            sorter: (a: ProgramsDataResponse, b: ProgramsDataResponse) => {
                const descA = a?.code?.toLowerCase() || '';
                const descB = b?.code?.toLowerCase() || '';
                return descA.localeCompare(descB);
            },
            render: (_: any, record: ProgramsDataResponse) => (
                <div className="flex items-center">
                    <span className="text-paragraph overflow-hidden">{record.code}</span>
                </div>
            ),
        },

        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_: any, record: ProgramsDataResponse) => (
                <div>
                    <Button onClick={() => {


                        setSelectedProgramsId(record._id);
                        setOpenProgramsActionsModal(true)
                    }} variant="link" className="text-primary-800 font-semibold">
                        View
                    </Button>

                    <Button 
                        onClick={() => {
                          console.log("record:", record);
                            setSelectedProgramsId(record._id);
                           
                            setOpenDeleteProgramsModal(true)
                        }} 
                        variant="link" 
                        className="text-error-800 font-semibold"
                        disabled={deleting}
                    >
                        {deleting ? 'Deleting...' : 'Delete'}
                    </Button>
                    <Button 

                        onClick={() => {
                            setUpdateProgramsId(record._id);
                            
                            setOpenUpdateProgramsModal(true)
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
                columns={ProgramsListColumns}
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
            {openProgramsActionsModal && <ProgramsModal
             programsId={selectedProgramsId} 
             close={() => setOpenProgramsActionsModal(false)} />}

            {openDeleteProgramsModal && <DeleteProgramsModal
                onDelete={handleDeletePrograms}
                deleting={deleting}
             
             close={() => setOpenDeleteProgramsModal(false)} />}

                {/* Update Modal */}

        {openUpdateProgramsModal && <UpdateProgramsModal
            programsId={updateProgramsId}
            onUpdate={handleUpdatePrograms}
            updating={updating}
            close={() => setOpenUpdateProgramsModal(false)}
            
            initialName={data.find((term) => term._id === updateProgramsId)?.name || ''}
            initialDescription={data.find((term) => term._id === updateProgramsId)?.description || ''}
        />
        }
        </>
    )
}

export default ProgramsTable

//ProgramsTable