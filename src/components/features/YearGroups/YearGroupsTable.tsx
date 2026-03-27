import { useState, type FC } from 'react'
import Table from '@/components/ui/table/Table';
import { Button } from '@/components/ui/button';
import type { Pagination } from '@/Utils/Types';
import { useLearningHubActionManager } from '@/pages/Dashboard/LearningHub/LearningHubActionManager';
import { useAppDispatch } from '@/Redux/Hooks';
import { customToast } from '@/Common/Components/ShowToast';
import type { SubjectsDataResponse } from '@/pages/Dashboard/Subjects/Types';
import { deleteSubjectsById, updateSubjectsById } from '@/Redux/Subjects/Slice';
import SubjectsModal from '@/components/Modals/SubjectsModal';
import DeleteSubjectsModal from '@/components/Modals/DeleteSubjectsModal';
import UpdateSubjectsModal from '@/components/Modals/UpdateSubjectsModal';
import type { YearGroupsDataResponse } from '@/pages/Dashboard/YearGroups/Types';

const SubjectsTable: FC<{
    loading: boolean;
    data: SubjectsDataResponse[];
    pagination: Pagination;
    filters: { search: string };
}> = ({ loading, data, pagination, filters }) => { 

    const [openYearGroupsActionsModal, setOpenYearGroupsActionsModal] = useState<boolean>(false);
    const [openDeleteYearGroupsModal, setOpenDeleteYearGroupsModal] = useState<boolean>(false);

    const [selectedYearGroupsId, setSelectedYearGroupsId] = useState<string | null>(null);

    const [updateYearGroupsId, setUpdateYearGroupsId] = useState<string | null>(null);
    const [openUpdateYearGroupsModal, setOpenUpdateYearGroupsModal] = useState<boolean>(false);


    const [deleting, setDeleting] = useState(false);
    const [updating, setUpdating] = useState(false);


    const dispatch = useAppDispatch();
    const { handleGetLearningHub } = useLearningHubActionManager();


    //delete function
    const handleDeleteYearGroups= async () => {
      console.log('deleted clicked. id:', selectedYearGroupsId)
        if (!selectedYearGroupsId) return;

        setDeleting(true);
        try {
            await dispatch(deleteYearGroupsById(selectedYearGroupsId))
                .unwrap();
            customToast.success('YearGroup deleted successfully.');

            // Close the modal
            setOpenDeleteYearGroupsModal(false);

            // Refresh the list after deletion
            setSelectedYearGroupsId(null);



        } catch (error: any) {
            customToast.error(error?.message || 'Failed to delete Subjects.');
        } finally {
            setDeleting(false);
        }
    };

    //update function
    const handleUpdateYearGroups = async (updatedData: any) => {
        if (!updateYearGroupsId) return;

        setUpdating(true);
        try {
          console.log(updatedData)
            await dispatch(updateYearGroupsById({ subjectsId: updateYearGroupsId, subjectsData: updatedData }))
                .unwrap();
            customToast.success('Subjects updated successfully.');

            // Close the modal
            setOpenUpdateYearGroupsModal(false);

            // Refresh the list after update
            setUpdateYearGroupsId(null);
        } catch (error: any) {
            customToast.error(error?.message || 'Failed to update Subjects.');
        } finally {
            setUpdating(false);
        }
    };

    const YearGroupsListColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a: YearGroupsDataResponse, b: YearGroupsDataResponse) => { // these(sorter & render) are built in sorters for the table columns, they sort the data based on the column values
                const nameA = a?.name?.toLowerCase() || '';
                const nameB = b?.name?.toLowerCase() || '';
                return nameA.localeCompare(nameB);
            },
            render: (_: any, record: YearGroupsDataResponse) => (
                <div className="flex items-center">
                    <span className="text-paragraph overflow-hidden">{record.name}</span>
                </div>
            ),
        },

        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            sorter: (a: YearGroupsDataResponse, b: YearGroupsDataResponse) => {
                const descA = a?.description?.toLowerCase() || '';
                const descB = b?.description?.toLowerCase() || '';
                return descA.localeCompare(descB);
            },
            render: (_: any, record: YearGroupsDataResponse) => (
                <div className="flex items-center">
                    <span className="text-paragraph overflow-hidden">{record.description}</span>
                </div>
            ),
        },

        

        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_: any, record: YearGroupsDataResponse) => (
                <div>
                    <Button onClick={() => {


                        setSelectedYearGroupsId(record._id);
                        setOpenYearGroupsActionsModal(true)
                    }} variant="link" className="text-primary-800 font-semibold">
                        View
                    </Button>

                    <Button 
                        onClick={() => {
                          console.log("record:", record);
                            setSelectedYearGroupsId(record._id);
                           
                            setOpenDeleteYearGroupsModal(true)
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

//YearGroupsTable