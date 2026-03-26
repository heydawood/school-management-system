'use client';
import * as ColumnFormatters from './ColumnFormatters/ColumnFormatters';
import { useEffect, useState, type FC } from 'react';
import Table from '@/components/ui/table/Table';
import { Badge } from '@/components/ui/badge';
import type { RecentFallEvent } from '@/pages/Dashboard/Home/Types';
import { useAppDispatch } from '@/Redux/Hooks';
import { recentFallEvents } from '@/Redux/Home/Slice';
import type { Pagination } from '@/Utils/Types';
import { Button } from '@/components/ui/button';

const RecentFallUsersList: FC<{ data: any[] }> = ({ data }) => {
  const [recentFallUsersList, setRecentFallUsersList] = useState<RecentFallEvent[]>(data);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [meta, setMeta] = useState<Pagination>({
    page: 1,
    limit: 10,
    totalPages: 1,
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const handleGetPaginatedList = (pageNumber: number, pageSize: number) => {
    setIsLoading(true);
    dispatch(recentFallEvents({ page: pageNumber, limit: pageSize }))
      .unwrap()
      .then((res: { data: RecentFallEvent[]; meta: Pagination }) => {
        setRecentFallUsersList((prev) => [...prev, ...res.data]);
        setMeta(res.meta);
        if (+res.meta.page >= +res.meta.totalPages) {
          setHasNextPage(false);
        }
      })
      .catch((error) => {
        console.error('Failed to fetch paginated list:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const recentFallUsersListColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) => {
        const nameA = a?.name?.toLowerCase() || '';
        const nameB = b?.name?.toLowerCase() || '';
        return nameA.localeCompare(nameB);
      },
      render: (_: any, record: RecentFallEvent) => ColumnFormatters.NameFormatter(record),
    },
    {
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userId',
      sorter: (a: any, b: any) => {
        const userIdA = a?.userId?.toLowerCase() || '';
        const userIdB = b?.userId?.toLowerCase() || '';
        return userIdA.localeCompare(userIdB);
      },
      render: (_: any, record: RecentFallEvent) => <span className="text-sm">{record.userId}</span>,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a: any, b: any) => {
        const dateA = new Date(a?.date).getTime();
        const dateB = new Date(b?.date).getTime();
        return dateA - dateB;
      },
      render: (_: any, record: RecentFallEvent) => <span className="text-sm text-nowrap">{record.fallDateTime}</span>,
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      sorter: (a: any, b: any) => {
        const nameA = a?.location?.toLowerCase() || '';
        const nameB = b?.location?.toLowerCase() || '';
        return nameA.localeCompare(nameB);
      },
      render: (_: any, record: RecentFallEvent) => <Badge className="bg-primary-25 text-primary-800 rounded-full">{record.location ?? 'N/A'}</Badge>,
    },
  ];

  useEffect(() => {
    setRecentFallUsersList(data);
    if (data && data.length < meta.limit) {
      setHasNextPage(false);
    }
  }, [data]);

  return (
    <div>
      <Table
        scrollAble
        tableHeightClass="max-h-[500px]"
        columns={recentFallUsersListColumns}
        dataSource={recentFallUsersList}
        rowKey="id"
        headerStyle="bg-neutral-500 rounded-xl"
      />
      {hasNextPage && (
        <div className="flex justify-center">
          {isLoading ? <Button>Loading...</Button> : <Button onClick={() => handleGetPaginatedList(meta?.page + 1, meta?.limit)}>Load More</Button>}
        </div>
      )}
    </div>
  );
};

export default RecentFallUsersList;
