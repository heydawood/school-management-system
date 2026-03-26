import { Badge } from '@/components/ui/badge';
import * as ColumnFormatters from './ColumnFormatters/ColumnFormatters';
import Table from '@/components/ui/table/Table';
import { getReportLevelBadge } from '@/pages/Dashboard/Settings/Utils';
import { format } from 'date-fns';
import type { UserSupportQuestion } from '@/pages/Dashboard/Settings/Types';
import type { Pagination } from '@/Utils/Types';
interface Props {
  data: UserSupportQuestion[] | undefined;
  onScrollEnd?: (page: number, limit: number) => void;
  pagination?: Pagination;
}
const ReportsTable = ({ data, onScrollEnd, pagination }: Props) => {
  const reportsListColumns = [
    {
      title: 'Reported By',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) => {
        const nameA = a?.name?.toLowerCase() || '';
        const nameB = b?.name?.toLowerCase() || '';
        return nameA.localeCompare(nameB);
      },
      render: (_: any, record: UserSupportQuestion) => ColumnFormatters.NameFormatter(record),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a: any, b: any) => {
        const dateA = a?.date || 0;
        const dateB = b?.date || 0;
        return dateA - dateB;
      },
      render: (_: any, record: UserSupportQuestion) => <span className="text-paragraph min-w-[200px]">{format(new Date(record.date), 'MMM dd, yyyy')}</span>,
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
      sorter: (a: any, b: any) => {
        const levelA = a?.level?.toLowerCase() || '';
        const levelB = b?.level?.toLowerCase() || '';
        return levelA.localeCompare(levelB);
      },
      render: (_: any, record: UserSupportQuestion) => (
        <Badge className={`text-center shadow-none  rounded-full py-[6px] ${getReportLevelBadge(record.level)}`}>{record.level}</Badge>
      ),
    },

    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      sorter: (a: any, b: any) => {
        const messageA = a?.message?.toLowerCase() || '';
        const messageB = b?.message?.toLowerCase() || '';
        return messageA.localeCompare(messageB);
      },
      render: (_: any, record: UserSupportQuestion) => <span className="text-paragraph">{record.message}</span>,
    },
  ];

  return (
    <div
      className="max-h-[60vh] overflow-auto primary-scrollbar"
      onScroll={(e) => {
        const target = e.target as HTMLElement;
        const scrollTop = target.scrollTop;
        const scrollHeight = target.scrollHeight;
        const clientHeight = target.clientHeight;
        // Check if scrolled to 100%
        if (scrollTop + clientHeight >= scrollHeight - 1) {
          if (onScrollEnd && pagination) {
            if (pagination.page <= pagination.totalPages) {
              onScrollEnd(pagination.page + 1, pagination.limit);
            }
          }
        }
      }}
    >
      <Table loading={false} columns={reportsListColumns} dataSource={data!} rowKey="id" headerStyle="bg-neutral-400 rounded-xl" />
    </div>
  );
};

export default ReportsTable;
