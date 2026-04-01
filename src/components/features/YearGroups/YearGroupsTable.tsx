import { useState, type FC } from 'react'
import Table from '@/components/ui/table/Table';
import { Button } from '@/components/ui/button';
import type { Pagination } from '@/Utils/Types';
import { useLearningHubActionManager } from '@/pages/Dashboard/LearningHub/LearningHubActionManager';
import { useAppDispatch } from '@/Redux/Hooks';
import { customToast } from '@/Common/Components/ShowToast';
import type { YearGroupsDataResponse } from '@/pages/Dashboard/YearGroups/Types';
import { deleteYearGroupsById, updateYearGroupsById } from '@/Redux/YearGroups/Slice';
import DeleteYearGroupsModal from '@/components/Modals/DeleteYearGroupsModal';
import YearGroupsModal from '@/components/Modals/YearGroupsModal';
import UpdateYearGroupsModal from '@/components/Modals/UpdateYearGroupsModal';

const YearGroupsTable: FC<{
    loading: boolean;
    data: YearGroupsDataResponse[];
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
            await dispatch(updateYearGroupsById({ yearGroupsId: updateYearGroupsId, yearGroupsData: updatedData }))
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
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            sorter: (a: YearGroupsDataResponse, b: YearGroupsDataResponse) => {
                const descA = a?.createdAt?.toLowerCase() || '';
                const descB = b?.createdAt?.toLowerCase() || '';
                return descA.localeCompare(descB);
            },
            render: (_: any, record: YearGroupsDataResponse) => (
                <div className="flex items-center">
                    <span className="text-paragraph overflow-hidden">{new Date(record.createdAt).toLocaleDateString()}</span>
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
                            setUpdateYearGroupsId(record._id);
                            
                            setOpenUpdateYearGroupsModal(true)
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
                columns={YearGroupsListColumns}
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
            {openYearGroupsActionsModal && <YearGroupsModal
             YearGroupsId={selectedYearGroupsId} 
             close={() => setOpenYearGroupsActionsModal(false)} />}


             {/* delete modal*/}
            {openDeleteYearGroupsModal && <DeleteYearGroupsModal
                onDelete={handleDeleteYearGroups}
                deleting={deleting}
             
             close={() => setOpenDeleteYearGroupsModal(false)} />}

                {/* Update Modal */}

        {openUpdateYearGroupsModal && <UpdateYearGroupsModal
            yearGroupsId={updateYearGroupsId}
            onUpdate={handleUpdateYearGroups}
            updating={updating}
            close={() => setOpenUpdateYearGroupsModal(false)}
            
            initialName={data.find((term) => term._id === updateYearGroupsId)?.name || ''}
            initialDescription={data.find((term) => term._id === updateYearGroupsId)?.description || ''}
        />
        }
        </>
    )
}

export default YearGroupsTable

//YearGroupsTable