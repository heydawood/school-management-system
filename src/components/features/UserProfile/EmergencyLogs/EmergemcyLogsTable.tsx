'use client';
import type { FC } from 'react';
import Table from '@/components/ui/table/Table';
import { Badge } from '@/components/ui/badge';
import { getEmergencyLogsStatusBadge, getStatusBadge } from '@/pages/Dashboard/UserProfilePage/Utils';
import type { EmergencyAtertLogItem } from '@/pages/Dashboard/UserProfilePage/Types';

const EmergencyLogsTable: FC<{ data: EmergencyAtertLogItem[] }> = ({ data }) => {
  const emergencyLogsTableColumns = [
    {
      title: 'Alert Call Date',
      dataIndex: 'alertCallDate',
      key: 'alertCallDate',
      sorter: (a: any, b: any) => {
        const alertCallDateA = new Date(a?.alertCallDate) || 0;
        const alertCallDateB = new Date(b?.alertCallDate) || 0;
        return alertCallDateA.getTime() - alertCallDateB.getTime();
      },
      render: (_: any, record: any) => (
        <div className="py-2">
          <span className="text-paragraph font-semibold">{record.alertCallDate}</span>
        </div>
      ),
    },
    {
      title: 'Contact Person',
      dataIndex: 'contactPerson',
      key: 'contactPerson',
      sorter: (a: any, b: any) => {
        const contactPersonA = a?.contactPerson?.toLowerCase() || '';
        const contactPersonB = b?.contactPerson?.toLowerCase() || '';
        return contactPersonA.localeCompare(contactPersonB);
      },
      render: (_: any, record: any) => <span className="text-paragraph font-semibold">{record.contactPerson}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: (a: any, b: any) => {
        const statusA = a?.status || 0;
        const statusB = b?.status || 0;
        return statusA - statusB;
      },
      render: (_: any, record: any) => <Badge className={`text-center shadow-none rounded-full ${getEmergencyLogsStatusBadge(record.status)}`}>{record.status}</Badge>,
    },
  ];

  return (
    <div>
      <Table columns={emergencyLogsTableColumns} dataSource={data} rowKey="id" headerStyle="bg-neutral-500 rounded-xl" />
    </div>
  );
};

export default EmergencyLogsTable;
