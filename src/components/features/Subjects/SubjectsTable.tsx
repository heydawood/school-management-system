import { useState, type FC } from 'react'
import Table from '@/components/ui/table/Table';
import { Button } from '@/components/ui/button';
import type { Pagination } from '@/Utils/Types';
import { useLearningHubActionManager } from '@/pages/Dashboard/LearningHub/LearningHubActionManager';
import { useAppDispatch } from '@/Redux/Hooks';
import { customToast } from '@/Common/Components/ShowToast';
import type { SubjectsDataResponse } from '@/pages/Dashboard/AdminPanel/Subjects/Types';
import { deleteSubjectsById, updateSubjectsById } from '@/Redux/Subjects/Slice';
import SubjectsModal from '@/components/Modals/SubjectsModal';
import DeleteSubjectsModal from '@/components/Modals/DeleteSubjectsModal';
import UpdateSubjectsModal from '@/components/Modals/UpdateSubjectsModal';

const SubjectsTable: FC<{
    loading: boolean;
    data: SubjectsDataResponse[];
    pagination: Pagination;
    filters: { search: string };
}> = ({ loading, data, pagination, filters }) => {

    const [openSubjectsActionsModal, setOpenSubjectsActionsModal] = useState<boolean>(false);
    const [openDeleteSubjectsModal, setOpenDeleteSubjectsModal] = useState<boolean>(false);

    const [selectedSubjectsId, setSelectedSubjectsId] = useState<string | null>(null);

    const [updateSubjectsId, setUpdateSubjectsId] = useState<string | null>(null);
    const [openUpdateSubjectsModal, setOpenUpdateSubjectsModal] = useState<boolean>(false);


    const [deleting, setDeleting] = useState(false);
    const [updating, setUpdating] = useState(false);


    const dispatch = useAppDispatch();
    const { handleGetLearningHub } = useLearningHubActionManager();


    //delete function
    const handleDeleteSubjects= async () => {
      console.log('deleted clicked. id:', selectedSubjectsId)
        if (!selectedSubjectsId) return;

        setDeleting(true);
        try {
            await dispatch(deleteSubjectsById(selectedSubjectsId))
                .unwrap();
            customToast.success('Subjects deleted successfully.');

            // Close the modal
            setOpenDeleteSubjectsModal(false);

            // Refresh the list after deletion
            setSelectedSubjectsId(null);



        } catch (error: any) {
            customToast.error(error?.message || 'Failed to delete Subjects.');
        } finally {
            setDeleting(false);
        }
    };

    //update function
    const handleUpdateSubjects = async (updatedData: any) => {
        if (!updateSubjectsId) return;

        setUpdating(true);
        try {
          console.log(updatedData)
            await dispatch(updateSubjectsById({ subjectsId: updateSubjectsId, subjectsData: updatedData }))
                .unwrap();
            customToast.success('Subjects updated successfully.');

            // Close the modal
            setOpenUpdateSubjectsModal(false);

            // Refresh the list after update
            setUpdateSubjectsId(null);
        } catch (error: any) {
            customToast.error(error?.message || 'Failed to update Subjects.');
        } finally {
            setUpdating(false);
        }
    };

    const SubjectsListColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a: SubjectsDataResponse, b: SubjectsDataResponse) => { // these(sorter & render) are built in sorters for the table columns, they sort the data based on the column values
                const nameA = a?.name?.toLowerCase() || '';
                const nameB = b?.name?.toLowerCase() || '';
                return nameA.localeCompare(nameB);
            },
            render: (_: any, record: SubjectsDataResponse) => (
                <div className="flex items-center">
                    <span className="text-paragraph overflow-hidden">{record.name}</span>
                </div>
            ),
        },

        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            sorter: (a: SubjectsDataResponse, b: SubjectsDataResponse) => {
                const descA = a?.description?.toLowerCase() || '';
                const descB = b?.description?.toLowerCase() || '';
                return descA.localeCompare(descB);
            },
            render: (_: any, record: SubjectsDataResponse) => (
                <div className="flex items-center">
                    <span className="text-paragraph overflow-hidden">{record.description}</span>
                </div>
            ),
        },

        

        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_: any, record: SubjectsDataResponse) => (
                <div>
                    <Button onClick={() => {


                        setSelectedSubjectsId(record.id);
                        setOpenSubjectsActionsModal(true)
                    }} variant="link" className="text-primary-800 font-semibold">
                        View
                    </Button>

                    <Button 
                        onClick={() => {
                          console.log("record:", record);
                            setSelectedSubjectsId(record.id);
                           
                            setOpenDeleteSubjectsModal(true)
                        }} 
                        variant="link" 
                        className="text-error-800 font-semibold"
                        disabled={deleting}
                    >
                        {deleting ? 'Deleting...' : 'Delete'}
                    </Button>
                    <Button 

                        onClick={() => {
                            setUpdateSubjectsId(record.id);
                            
                            setOpenUpdateSubjectsModal(true)
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
                columns={SubjectsListColumns}
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
            {openSubjectsActionsModal && <SubjectsModal
             subjectsId={selectedSubjectsId} 
             close={() => setOpenSubjectsActionsModal(false)} />}

            {openDeleteSubjectsModal && <DeleteSubjectsModal
                onDelete={handleDeleteSubjects}
                deleting={deleting}
             
             close={() => setOpenDeleteSubjectsModal(false)} />}

                {/* Update Modal */}

        {openUpdateSubjectsModal && <UpdateSubjectsModal
            subjectsId={updateSubjectsId}
            onUpdate={handleUpdateSubjects}
            updating={updating}
            close={() => setOpenUpdateSubjectsModal(false)}
            
            initialName={data.find((term) => term.id === updateSubjectsId)?.name || ''}
            initialDescription={data.find((term) => term.id === updateSubjectsId)?.description || ''}
        />
        }
        </>
    )
}

export default SubjectsTable

//SubjectsTable