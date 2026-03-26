'use client';
import * as ColumnFormatters from './ColumnFormatters/ColumnFormatters';
import { useEffect, useState, type FC } from 'react';
import Table from '@/components/ui/table/Table';
import { Badge } from '@/components/ui/badge';
import type { TodayHighRisk } from '@/pages/Dashboard/Home/Types';
import { useAppDispatch } from '@/Redux/Hooks';
import { todayHighRisk } from '@/Redux/Home/Slice';
import type { Pagination } from '@/Utils/Types';
import { Button } from '@/components/ui/button';

const HighRiskUsersList: FC<{ data: any[] }> = ({ data }) => {
  const [highRiskUsersList, setHighRiskUsersList] = useState<TodayHighRisk[]>(data);
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
    dispatch(todayHighRisk({ page: pageNumber, limit: pageSize }))
      .unwrap()
      .then((res: { data: TodayHighRisk[]; meta: Pagination }) => {
        setHighRiskUsersList((prev) => [...prev, ...res.data]);
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

  const HighRiskUsersListColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) => {
        const nameA = a?.name?.toLowerCase() || '';
        const nameB = b?.name?.toLowerCase() || '';
        return nameA.localeCompare(nameB);
      },
      render: (_: any, record: TodayHighRisk) => ColumnFormatters.NameFormatter(record),
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
      render: (_: any, record: TodayHighRisk) => <span className="text-sm">{record.userId}</span>,
    },
    {
      title: 'Risk Score',
      dataIndex: 'riskScore',
      key: 'riskScore',
      sorter: (a: any, b: any) => {
        const riskScoreA = a?.riskScore || 0;
        const riskScoreB = b?.riskScore || 0;
        return riskScoreA - riskScoreB;
      },
      render: (_: any, record: TodayHighRisk) => <span className="text-sm">{record.score}</span>,
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
      render: (_: any, record: TodayHighRisk) => <Badge className="bg-primary-25 text-primary-800 rounded-full">{record.address ?? 'N/A'}</Badge>,
    },
  ];

  useEffect(() => {
    setHighRiskUsersList(data);
    if (data && data?.length < meta?.limit) {
      setHasNextPage(false);
    }
  }, [data]);

  return (
    <div>
      <Table scrollAble tableHeightClass="max-h-[500px]" columns={HighRiskUsersListColumns} dataSource={highRiskUsersList} rowKey="id" headerStyle="bg-neutral-500 rounded-xl" />
      {hasNextPage && (
        <div className="flex justify-center">
          {isLoading ? <Button>Loading...</Button> : <Button onClick={() => handleGetPaginatedList(meta?.page + 1, meta?.limit)}>Load More</Button>}
        </div>
      )}
    </div>
  );
};

export default HighRiskUsersList;
