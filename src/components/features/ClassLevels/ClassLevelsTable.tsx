import { useState, type FC } from 'react'
import Table from '@/components/ui/table/Table';
import { Button } from '@/components/ui/button';
import type { Pagination } from '@/Utils/Types';
import { useLearningHubActionManager } from '@/pages/Dashboard/LearningHub/LearningHubActionManager';
import { useAppDispatch } from '@/Redux/Hooks';
import { customToast } from '@/Common/Components/ShowToast';
import type { ClassLevelDataResponse } from '@/pages/Dashboard/AdminPanel/ClassLevels/Types';
import DeleteClassLevelsModal from '@/components/Modals/DeleteClassLevelsModal';
import ClassLevelsModal from '@/components/Modals/ClassLevelsModal';
import UpdateClassLevelsModal from '@/components/Modals/UpdateClassLevelsModal';
import { useDeleteClassLevels } from '@/Hooks/TanStack/ClassLevels/useDeleteClassLevels';
import { useUpdateClassLevels } from '@/Hooks/TanStack/ClassLevels/useUpdateClassLevels';

const ClassLevelsTable: FC<{
    loading: boolean;
    data: ClassLevelDataResponse[];
    pagination: Pagination;
    filters: { search: string };
}> = ({ loading, data, pagination, filters }) => {

    const [openClassLevelsActionsModal, setOpenClassLevelsActionsModal] = useState<boolean>(false);
    const [openDeleteClassLevelsModal, setOpenDeleteClassLevelsModal] = useState<boolean>(false);

    const [selectedClassLevelsId, setSelectedClassLevelsId] = useState<string | null>(null);

    const [updateClassLevelsId, setUpdateClassLevelsId] = useState<string | null>(null);
    const [openUpdateClassLevelsModal, setOpenUpdateClassLevelsModal] = useState<boolean>(false);


    const [deleting, setDeleting] = useState(false);
    const [updating, setUpdating] = useState(false);


    const dispatch = useAppDispatch();
    const { handleGetLearningHub } = useLearningHubActionManager();


    const deleteMutation = useDeleteClassLevels();
    const updateMutation = useUpdateClassLevels();


    //delete function
    const handleDeleteClassLevels = async () => {
        console.log('deleted clicked. id:', selectedClassLevelsId)
        if (!selectedClassLevelsId) return;

        deleteMutation.mutate(selectedClassLevelsId);
        setOpenDeleteClassLevelsModal(false);
    }


    //update function
    const handleUpdateClassLevels = async (updatedData: any) => {
        if (!updateClassLevelsId) return;

        updateMutation.mutate({ id: updateClassLevelsId, data: updatedData });
        setOpenUpdateClassLevelsModal(false);
    };

    const ClassLevelsListColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a: ClassLevelDataResponse, b: ClassLevelDataResponse) => { // these(sorter & render) are built in sorters for the table columns, they sort the data based on the column values
                const nameA = a?.name?.toLowerCase() || '';
                const nameB = b?.name?.toLowerCase() || '';
                return nameA.localeCompare(nameB);
            },
            render: (_: any, record: ClassLevelDataResponse) => (
                <div className="flex items-center">
                    <span className="text-paragraph overflow-hidden">{record.name}</span>
                </div>
            ),
        },

        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            sorter: (a: ClassLevelDataResponse, b: ClassLevelDataResponse) => {
                const descA = a?.description?.toLowerCase() || '';
                const descB = b?.description?.toLowerCase() || '';
                return descA.localeCompare(descB);
            },
            render: (_: any, record: ClassLevelDataResponse) => (
                <div className="flex items-center">
                    <span className="text-paragraph overflow-hidden">{record.description}</span>
                </div>
            ),
        },

        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_: any, record: ClassLevelDataResponse) => (
                <div>
                    <Button onClick={() => {


                        setSelectedClassLevelsId(record.id);
                        setOpenClassLevelsActionsModal(true)
                    }} variant="link" className="text-primary-800 font-semibold">
                        View
                    </Button>

                    <Button
                        onClick={() => {
                            setSelectedClassLevelsId(record.id);
                            // setModalAction('delete');
                            setOpenDeleteClassLevelsModal(true)
                        }}
                        variant="link"
                        className="text-error-800 font-semibold"
                        disabled={deleting}
                    >
                        {deleting ? 'Deleting...' : 'Delete'}
                    </Button>
                    <Button

                        onClick={() => {
                            setUpdateClassLevelsId(record.id);
                            //setModalAction('update');
                            setOpenUpdateClassLevelsModal(true)
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
                columns={ClassLevelsListColumns}
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
            {openClassLevelsActionsModal && <ClassLevelsModal
                classLevelsId={selectedClassLevelsId}
                close={() => setOpenClassLevelsActionsModal(false)} />}

            {openDeleteClassLevelsModal && <DeleteClassLevelsModal
                onDelete={handleDeleteClassLevels}
                deleting={deleting}

                close={() => setOpenDeleteClassLevelsModal(false)} />}

            {/* Update Modal */}

            {openUpdateClassLevelsModal && <UpdateClassLevelsModal
                classLevelsId={updateClassLevelsId}
                onUpdate={handleUpdateClassLevels}
                updating={updating}
                close={() => setOpenUpdateClassLevelsModal(false)}

                initialName={data.find((term) => term.id === updateClassLevelsId)?.name || ''}
                initialDescription={data.find((term) => term.id === updateClassLevelsId)?.description || ''}
            />
            }
        </>
    )
}

export default ClassLevelsTable

//ClassLevelsTable