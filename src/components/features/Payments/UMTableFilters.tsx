import DateRangePicker from '@/components/ui/dateRangePicker';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { PaymentPlans } from '@/pages/Dashboard/Payments/Types';
import { useEffect, useState } from 'react';

interface Props {
  paymentPlans: PaymentPlans[];
  onChange: (filters: any) => void;
}

const PaymentTableFilters = ({ paymentPlans, onChange }: Props) => {
  const [filters, setFilters] = useState<{
    plan: string;
    search: string;
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
    plan: 'all',
    search: '',
  });

  useEffect(() => {
    onChange({
      plan: filters.plan === 'all' ? null : filters.plan,
      startDate: filters.startDate && filters.endDate ? filters.startDate : null,
      endDate: filters.startDate && filters.endDate ? filters.endDate : null,
      search: filters.search,
    });
  }, [filters]);

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <Select value={filters.plan} onValueChange={(value) => setFilters({ ...filters, plan: value })}>
          <SelectTrigger className="w-[160px] h-10 rounded-xl">
            <span className="text-sm text-gray-25">Plan:</span> <SelectValue placeholder="Plan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {paymentPlans.map((plan) => (
              <SelectItem key={plan.planId} value={plan.planId.toString()}>
                {plan.planName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="">
          <DateRangePicker
            label="Select Date"
            onDateChange={(start, end) => {
              setFilters({ ...filters, startDate: start, endDate: end });
            }}
            className="text-gray-25 h-10"
          />
        </div>

        <Input
          className="w-[248px] h-10 rounded-xl"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          placeholder="Search payment here"
        />
      </div>
    </div>
  );
};

export default PaymentTableFilters;
