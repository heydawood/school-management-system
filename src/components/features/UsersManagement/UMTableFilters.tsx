import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/svg_icon/SvgIcon';
import type { FiltersMetaResponse } from '@/pages/Dashboard/UsersManagement/Types';
import React, { useEffect, useState } from 'react';

const UMTableFilters = ({
  filters,
  onChange,
}: {
  filters: FiltersMetaResponse | null;
  onChange: (filters: { mobility: string; country: string; age: string; plan: string; status: string; search: string }) => void;
}) => {
  const [initialFilters, setInitialFilters] = useState({
    mobility: 'all',
    country: 'all',
    age: 'all',
    plan: 'all',
    status: 'all',
    search: '',
  });

  // Do not apply filter on first render
  const isFirstRender = React.useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    onChange({
      mobility: initialFilters.mobility === 'all' ? '' : initialFilters.mobility,
      country: initialFilters.country === 'all' ? '' : initialFilters.country,
      age: initialFilters.age === 'all' ? '' : initialFilters.age,
      plan: initialFilters.plan === 'all' ? '' : initialFilters.plan,
      status: initialFilters.status === 'all' ? '' : initialFilters.status,
      search: initialFilters.search,
    });
  }, [initialFilters]);

  return (
    <div>
      <div className="flex flex-wrap gap-3">

        {/* Mobility */}
        
        <Select value={initialFilters.mobility} onValueChange={(value) => setInitialFilters({ ...initialFilters, mobility: value })}>
          <SelectTrigger className="w-fit max-w-[180px] h-10 rounded-xl flex items-center justify-between gap-2">
            <span className="text-sm text-gray-25 shrink-0">Mobility:</span>
            <SelectValue placeholder="Mobility" className="truncate text-sm text-gray-700 max-w-[100px]" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {filters?.mobility?.map((item, index) => (
              <SelectItem key={index} value={String(item.value)}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* Country */}
        <Select value={initialFilters.country} onValueChange={(value) => setInitialFilters({ ...initialFilters, country: value })}>
          <SelectTrigger className="w-fit max-w-[180px] h-10 rounded-xl flex items-center justify-between gap-2">
            <span className="text-sm text-gray-25 shrink-0">Country:</span>
            <SelectValue placeholder="Country" className="truncate text-sm text-gray-700 max-w-[100px]" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {filters?.country?.map((item, index) => (
              <SelectItem key={index} value={String(item.value)}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* Age */}
        <Select value={initialFilters.age} onValueChange={(value) => setInitialFilters({ ...initialFilters, age: value })}>
          <SelectTrigger className="w-fit max-w-[180px] h-10 rounded-xl flex items-center justify-between gap-2">
            <span className="text-sm text-gray-25 shrink-0">Age:</span>
            <SelectValue placeholder="Age" className="truncate text-sm text-gray-700 max-w-[100px]" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {filters?.ages?.map((item, index) => (
              <SelectItem key={index} value={String(item.value)}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* Plan */}
        <Select value={initialFilters.plan} onValueChange={(value) => setInitialFilters({ ...initialFilters, plan: value })}>
          <SelectTrigger className="w-fit max-w-[180px] h-10 rounded-xl flex items-center justify-between gap-2">
            <span className="text-sm text-gray-25 shrink-0">Plan:</span>
            <SelectValue placeholder="Plan" className="truncate text-sm text-gray-700 max-w-[100px]" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {filters?.plans?.map((item, index) => (
              <SelectItem key={index} value={String(item.value)}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* Status */}
        <Select value={initialFilters.status} onValueChange={(value) => setInitialFilters({ ...initialFilters, status: value })}>
          <SelectTrigger className="w-fit max-w-[180px] h-10 rounded-xl flex items-center justify-between gap-2">
            <span className="text-sm text-gray-25 shrink-0">Status:</span>
            <SelectValue placeholder="Status" className="truncate text-sm text-gray-700 max-w-[100px]" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {filters?.status?.map((item, index) => (
              <SelectItem key={index} value={String(item.value)}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* Search */}
        <div className="relative">
          <span className="absolute top-1/2 ps-2 -translate-y-1/2">
            <Icon icon="/icons/search.svg" />
          </span>
          <Input
            className="w-[150px] ps-8 h-10 rounded-xl"
            value={initialFilters.search}
            onChange={(e) => setInitialFilters({ ...initialFilters, search: e.target.value })}
            placeholder="Search user here"
          />
        </div>
      </div>
    </div>
  );
};

export default UMTableFilters;
