import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '@/Redux/Hooks';
import StatChartCard from '@/components/features/Dashboard/StatChartCard';
import { usePage } from '@/Providers/PageProvider';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Info } from 'lucide-react';
import { getPaymentDetail } from '@/Redux/Payments/Slice';
import Loader from '@/components/ui/loader/Loader';
import type { PaymentDetailResponse } from '../Types';

const BackButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button className="p-2 bg-neutral-200 hover:bg-neutral-300 text-black shadow-none" onClick={onClick}>
      <ChevronLeft size={20} />
    </Button>
  );
};

const InfoItem = ({ label, value, className }: { label: string; value: string | number; className?: string }) => (
  <div className={className}>
    <p className="text-xs text-gray-25 font-medium block">{label}</p>
    <h5 className="font-bold block text-sm text whitespace-nowrap text-gray-1000">{value}</h5>
  </div>
);

const PaymentViewAndEditPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [payment, setPayment] = useState<PaymentDetailResponse | null>(null);

  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { pageInfo, setPageInfo } = usePage();
  const navigate = useNavigate();

  const handleGetPaymentDetail = (id: number) => {
    setLoading(true);
    dispatch(getPaymentDetail(id))
      .unwrap()
      .then((res: PaymentDetailResponse) => {
        setPayment(res);
      })
      .catch((err) => {
        console.error('Error fetching payment detail:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (id) {
      handleGetPaymentDetail(Number(id));
      setPageInfo({ title: 'Payment Detail', withBackButton: true, backButton: <BackButton onClick={() => navigate(-1)} /> });
    }
  }, [id]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {loading && <Loader />}
      {/* {loading && <Loader />} */}
      <StatChartCard date={''} withDate={false} icon={'/icons/user-group.svg'} title={'User Information'}>
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 text-sm text-gray-100 py-4">
          <InfoItem label="Name" value={payment?.user?.name ?? 'N/A'} />
          <InfoItem label="Email" value={payment?.user?.email ?? 'N/A'} />
          <InfoItem label="Number" value={payment?.user?.phone ?? 'N/A'} />
          <InfoItem label="Start Date" value={payment?.user?.startDate ?? 'N/A'} />
          <InfoItem label="End Date" value={payment?.user?.endDate ?? 'N/A'} />
          <InfoItem label="Country" value={payment?.user?.country ?? 'N/A'} />
        </div>
      </StatChartCard>

      <StatChartCard date={''} withDate={false} icon={'/icons/sidebar-badge-percent.svg'} title={'Subscription Information'}>
        <div className="grid grid-cols-1 xl:grid-cols-2  gap-4 text-sm text-gray-100 py-4">
          <InfoItem label="Plan Name" value={payment?.subscriptionDetails?.planName ?? 'N/A'} />
          <InfoItem label="Payment Gateway" value={payment?.subscriptionDetails?.paymentGateWay ?? 'N/A'} />
        </div>
      </StatChartCard>

      <StatChartCard date={''} withDate={false} icon={'/icons/user-group.svg'} title={'Transaction Details'}>
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 text-sm text-gray-100 py-4">
          <InfoItem className="md:col-span-2" label="Transaction ID" value={payment?.transactionDetails?.transactionId ?? 'N/A'} />
          <InfoItem label="Date & Time" value={payment?.transactionDetails?.paymentDate ?? 'N/A'} />
          <InfoItem label="Amount Paid" value={`${payment?.transactionDetails?.amount ? `$ ${payment?.transactionDetails?.amount}` : 'N/A'}`} />
          <InfoItem label="Currency" value={payment?.transactionDetails?.currency ?? 'N/A'} />
          <InfoItem label="Payment Status" value={payment?.transactionDetails?.status ?? 'N/A'} />
          <InfoItem label="System Error" value={payment?.transactionDetails?.systemError ?? 'N/A'} />
        </div>
      </StatChartCard>
    </div>
  );
};

export default PaymentViewAndEditPage;
