import { FiCheck } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { useState, type FC } from 'react';
import UpdateSubscriptionModal from '@/components/Modals/Subscriptions/UpdateSubscriptionModal';
import type { GetSubscriptions } from '@/pages/Dashboard/Subscriptions/Types';
interface Props {
  subscriptionData: GetSubscriptions[] | [];
}

const SubscriptionCards: FC<Props> = ({ subscriptionData }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [singleSubscription, setSingleSubscription] = useState<GetSubscriptions | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {subscriptionData.map((plan) => (
        <div key={plan.planId} className="min-h-[548px] border border-primary-500 p-6 rounded-[24px] bg-[#F5FFFC] flex flex-col">
          <div className="flex items-start gap-4 justify-between border-b border-[#DFE5E8] pb-3">
            <h2 className="text-xl font-bold break-all text-gray-950">{plan.planName}</h2>
            <p className="text-2xl font-semibold">
              ${Number(plan.price).toFixed(2)}
              <span className="text-gray-950 font-normal text-xs">/mn</span>
            </p>
          </div>

          <ul className="mt-4 space-y-4 flex-1">
            {plan.items.map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-primary-500 text-white">
                  <FiCheck size={10} />
                </span>
                <span className="font-medium text-lg text-gray-950">{item?.itemName}</span>
              </li>
            ))}
          </ul>

          <Button
            onClick={() => {
              setIsOpenModal(true);
              setSingleSubscription(plan);
            }}
            type="button"
            className="w-full h-[54px] rounded-lg bg-primary-25 hover:bg-primary-50 text-center font-semibold text-[14px] 2xl:text-[18px] text-primary-800 mt-auto"
          >
            Edit
          </Button>
        </div>
      ))}

      {/* Modals */}
      {isOpenModal && <UpdateSubscriptionModal subscriptionData={singleSubscription} close={() => setIsOpenModal(false)} />}
    </div>
  );
};

export default SubscriptionCards;
