import React, { useState, type FC } from 'react'
import Table from '@/components/ui/table/Table';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import type { Pagination } from '@/Utils/Types';
import { useLearningHubActionManager } from '@/pages/Dashboard/LearningHub/LearningHubActionManager';
import type { TeacherDataResponse } from '@/pages/Dashboard/Teachers/Types';
import TeacherModal from '@/components/Modals/TeacherModal';

const TeacherTable: FC<{
    loading: boolean;
    data: TeacherDataResponse[];
    pagination: Pagination;
    filters: { search: string };
}> = ({ loading, data, pagination, filters }) => {

    const [openTeacherActionsModal, setOpenTeacherActionsModal] = useState<boolean>(false);

    const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(null);



    const navigate = useNavigate();
    const { handleGetLearningHub } = useLearningHubActionManager();

    const TeacherListColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a: TeacherDataResponse, b: TeacherDataResponse) => { // these(sorter & render) are built in sorters for the table columns, they sort the data based on the column values
                const nameA = a?.name?.toLowerCase() || '';
                const nameB = b?.name?.toLowerCase() || '';
                return nameA.localeCompare(nameB);
            },
            render: (_: any, record: TeacherDataResponse) => (
                <div className="flex items-center">
                    <span className="text-paragraph overflow-hidden">{record.name}</span>
                </div>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a: TeacherDataResponse, b: TeacherDataResponse) => { // these(sorter & render) are built in sorters for the table columns, they sort the data based on the column values
                const nameA = a?.email?.toLowerCase() || '';
                const nameB = b?.email?.toLowerCase() || '';
                return nameA.localeCompare(nameB);
            },
            render: (_: any, record: TeacherDataResponse) => (
                <div className="flex items-center">
                    <span className="text-paragraph overflow-hidden">{record.email}</span>
                </div>
            ),
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            sorter: (a: TeacherDataResponse, b: TeacherDataResponse) => {
                const descA = a?.role?.toLowerCase() || '';
                const descB = b?.role?.toLowerCase() || '';
                return descA.localeCompare(descB);
            },
            render: (_: any, record: TeacherDataResponse) => (
                <div className="flex items-center">
                    <span className="text-paragraph overflow-hidden">{record.role}</span>
                </div>
            ),
        },
        {
            title: 'Date Employed',
            dataIndex: 'dateEmployed',
            key: 'dateEmployed',
            sorter: (a: TeacherDataResponse, b: TeacherDataResponse) => {
                const descA = a?.dateEmployed?.toLowerCase() || '';
                const descB = b?.dateEmployed?.toLowerCase() || '';
                return descA.localeCompare(descB);
            },
            render: (_: any, record: TeacherDataResponse) => (
                <div className="flex items-center">
                    <span className="text-paragraph overflow-hidden">{new Date(record.dateEmployed).toLocaleDateString()}</span>
                </div>
            ),
        },
        // {
        //     title: 'Status',
        //     dataIndex: 'status',
        //     key: 'status',
        //     sorter: (a: LearningHubResponse, b: LearningHubResponse) => {
        //         const statusA = a?.isActive ? 'Active' : 'Inactive';
        //         const statusB = b?.isActive ? 'Active' : 'Inactive';
        //         return statusA.localeCompare(statusB);
        //     },
        //     render: (_: any, record: LearningHubResponse) => (
        //         <Badge className={`text-center shadow-none rounded-full ${getCategoryStatusBadge(record.isActive)}`}>{record.isActive ? 'Active' : 'Inactive'}</Badge>
        //     ),
        // },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_: any, record: TeacherDataResponse) => (
                <div>
                    <Button onClick={() => {


                        setSelectedTeacherId(record.id);
                        setOpenTeacherActionsModal(true)
                    }} variant="link" className="text-primary-800 font-semibold">
                        View
                    </Button>
                </div>
            ),
        },
    ];



    return (
        <>
            <Table
                loading={loading}
                columns={TeacherListColumns}
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
            {openTeacherActionsModal && <TeacherModal teacherId={selectedTeacherId} close={() => setOpenTeacherActionsModal(false)} />}
        </>
    )
}

export default TeacherTable