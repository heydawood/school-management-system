import AnalyticsCard from '@/components/features/Dashboard/AnalyticsCard';
import { useEffect, useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/svg_icon/SvgIcon';
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import PaymentTable from '@/components/features/Payments/PaymentTable';
import PaymentTableFilters from '@/components/features/Payments/UMTableFilters';
import { exportPayments, getPaymentsList, getPlansList } from '@/Redux/Payments/Slice';
import type { PaymentPlans } from './Types';
import { is } from 'date-fns/locale';

const statsKeyValue = [
  {
    title: 'Total Users Listed',
    key: 'userCount',
    icon: '/icons/user-management.svg',
    isAmount: false,
  },
  {
    title: 'Active Subscriptions',
    key: 'activeSubscriptions',
    icon: '/icons/badge-percent.svg',
    isAmount: false,
  },
  {
    title: 'Total Revenue',
    key: 'revenue',
    icon: '/icons/wallet.svg',
    isAmount: true,
  },
];

const Header = ({
  onChange,
  ActionButtons,
  logo,
  logoClasses,
  title,
}: {
  onChange: (e: any) => void;
  ActionButtons?: ReactNode;
  logo: ReactNode;
  logoClasses: string;
  title: string;
}) => (
  <div className="flex gap-4 justify-between items-center flex-wrap pb-4 mb-4 border-b border-neutral-975">
    <div className="flex items-center gap-3">
      <div className={`h-12 w-12 flex justify-center items-center rounded-full ${logoClasses}`}>{logo}</div>
      <h3 className="text-heading">{title}</h3>
    </div>
    {ActionButtons}
  </div>
);

const PaymentPage = () => {
  const [paymentPlans, setPaymentPlans] = useState<PaymentPlans[]>([]);
  const { payments, loading, statsLoading, pagination, stats } = useAppSelector((state) => state.paymentRecords);
  const [filters, setFilters] = useState<{ plan: number | null; search: string; startDate?: Date | null; endDate?: Date | null }>({
    plan: null,
    search: '',
    startDate: null,
    endDate: null,
  });

  const dispatch = useAppDispatch();

  const handleExportPayments = () => {
    dispatch(exportPayments({ page: pagination.page, limit: pagination.limit, plan: filters.plan, search: filters.search, startDate: filters.startDate, endDate: filters.endDate }))
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob.payload], { type: 'text/csv' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'payments.csv');
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    dispatch(getPlansList()).then((res: any) => {
      setPaymentPlans(res.payload);
    });
    dispatch(getPaymentsList({ page: 1, limit: 10 }));
  }, [dispatch]);

  const onFiltersChange = (filters: { plan: number; search: string; startDate?: Date | null; endDate?: Date | null }) => {
    setFilters(filters);
    dispatch(
      getPaymentsList({
        page: 1,
        limit: 10,
        plan: filters.plan,
        search: filters.search,
        startDate: filters.startDate,
        endDate: filters.endDate,
      }),
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statsKeyValue.map((item) => (
          <AnalyticsCard
            icon={item?.icon}
            key={item.key}
            isAmount={item.isAmount}
            loading={statsLoading}
            title={item.title}
            value={stats[item.key as keyof typeof stats] as any}
            change="0%"
          />
        ))}
      </div>
      <div className=" border border-gray-light p-4 bg-forground rounded-xl overflow-hidden">
        <Header
          title="All Payments"
          ActionButtons={
            <div className="flex gap-3 items-center">
              <PaymentTableFilters paymentPlans={paymentPlans} onChange={onFiltersChange} />
              <Button onClick={handleExportPayments} className="bg-primary-25 text-primary-800 rounded-xl px-5 py-5" type="button">
                Export CSV
              </Button>
            </div>
          }
          onChange={(e: any) => {}}
          logo={<Icon icon="/icons/wallet.svg" className="text-primary-800" />}
          logoClasses="bg-primary-25"
        />
        <PaymentTable loading={loading} payments={payments} pagination={pagination} />
      </div>
    </div>
  );
};

export default PaymentPage;
