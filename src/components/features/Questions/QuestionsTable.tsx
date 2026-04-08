import React, { useState, type FC } from 'react'
import Table from '@/components/ui/table/Table';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import type { Pagination } from '@/Utils/Types';
import { useLearningHubActionManager } from '@/pages/Dashboard/LearningHub/LearningHubActionManager';
import type { QuestionsDataResponse } from '@/pages/Dashboard/TeacherPanel/Questions/Types';
import QuestionsModal from '@/components/Modals/QuestionsModal';
import { useAppDispatch } from '@/Redux/Hooks';

import { customToast } from '@/Common/Components/ShowToast';
import UpdateQuestionsModal from '@/components/Modals/UpdateQuestionsModal';
import { updateQuestionsById } from '@/Redux/Questions/Slice';
import { useUpdateQuestions } from '@/Hooks/TanStack/Questions/useUpdateQuestions';

const QuestionsTable: FC<{
    loading: boolean;
    data: QuestionsDataResponse[];
    pagination: Pagination;
    filters: { search: string };
}> = ({ loading, data, pagination, filters }) => {

    const [openQuestionsActionsModal, setOpenQuestionsActionsModal] = useState<boolean>(false);

    const [selectedQuestionsId, setSelectedQuestionsId] = useState<string | null>(null);

    const [updateQuestionsId, setUpdateQuestionsId] = useState<string | null>(null);
    const [openUpdateQuestionsModal, setOpenUpdateQuestionsModal] = useState<boolean>(false);

    const [updating, setUpdating] = useState(false);


    const { handleGetLearningHub } = useLearningHubActionManager();


    const updateMutation = useUpdateQuestions();
    //update function
    const handleUpdateQuestions = async (updatedData: any) => {
        if (!updateQuestionsId) return;

        updateMutation.mutate({ id: updateQuestionsId, data: updatedData });
        setOpenUpdateQuestionsModal(false);


    };

    const QuestionsListColumns = [
        {
            title: 'Questions',
            dataIndex: 'questions',
            key: 'questions',
            sorter: (a: QuestionsDataResponse, b: QuestionsDataResponse) => { // these(sorter & render) are built in sorters for the table columns, they sort the data based on the column values
                const nameA = a?.question?.toLowerCase() || '';
                const nameB = b?.question?.toLowerCase() || '';
                return nameA.localeCompare(nameB);
            },
            render: (_: any, record: QuestionsDataResponse) => (
                <div className="flex items-center">
                    <span className="text-paragraph overflow-hidden">{record.question}</span>
                </div>
            ),
        },

        // {
        //   title: 'Description',
        //   dataIndex: 'description',
        //   key: 'description',
        //   sorter: (a: QuestionsDataResponse, b: QuestionsDataResponse) => {
        //     const descA = a?.description?.toLowerCase() || '';
        //     const descB = b?.description?.toLowerCase() || '';
        //     return descA.localeCompare(descB);
        //   },
        //   render: (_: any, record: QuestionsDataResponse) => (
        //     <div className="flex items-center">
        //       <span className="text-paragraph overflow-hidden">{record.description}</span>
        //     </div>
        //   ),
        // },

        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_: any, record: QuestionsDataResponse) => (
                <div>
                    <Button onClick={() => {


                        setSelectedQuestionsId(record.id);
                        setOpenQuestionsActionsModal(true)
                    }} variant="link" className="text-primary-800 font-semibold">
                        View
                    </Button>
                    <Button

                        onClick={() => {
                            setUpdateQuestionsId(record.id);
                            //setModalAction('update');
                            setOpenUpdateQuestionsModal(true)
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
                columns={QuestionsListColumns}
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
            {openQuestionsActionsModal && <QuestionsModal questionsId={selectedQuestionsId} close={() => setOpenQuestionsActionsModal(false)} />}

            {openUpdateQuestionsModal && <UpdateQuestionsModal
                questionsId={updateQuestionsId}
                onUpdate={handleUpdateQuestions}
                updating={updating}
                close={() => setOpenUpdateQuestionsModal(false)}
                initialData={(() => {
                    const q = data.find((item) => item.id === updateQuestionsId);

                    if (!q) return undefined;

                    return {
                        question: q.question,
                        optionA: q.optionA,
                        optionB: q.optionB,
                        optionC: q.optionC,
                        optionD: q.optionD,
                        correctAnswer: q.correctAnswer,
                    };
                })()}
            />
            }
        </>
    )
}

export default QuestionsTable