import { useEffect, type ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import SubscriptionCards from '@/components/features/Subscriptions/SubscriptionCards';
import { getSubscriptionList } from '@/Redux/Subscription/Slice';

const SubscriptionPage = () => {
  const dispatch = useAppDispatch();

  const { subscriptions, loading, statsLoading } = useAppSelector((state) => state.subscriptionRecords);

  useEffect(() => {
    dispatch(getSubscriptionList());
  }, [dispatch]);

  return (
    <div className="">
      <SubscriptionCards subscriptionData={subscriptions} />
    </div>
  );
};

export default SubscriptionPage;
