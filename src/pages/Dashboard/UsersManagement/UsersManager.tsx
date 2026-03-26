import { useAppDispatch } from '@/Redux/Hooks';
import { getFiltersMeta } from '@/Redux/UserManagement/Slice';
import type { FiltersMetaResponse } from './Types';
import { useState } from 'react';

export const useUserManager = () => {
  const dispatch = useAppDispatch();
  const [filters, setFilters] = useState<FiltersMetaResponse | null>(null);

  const handleFetchFilters = () => {
    dispatch(getFiltersMeta())
      .unwrap()
      .then((res: FiltersMetaResponse) => {
        setFilters(res);
      });
  };

  return {
    filters,
    handleFetchFilters,
  };
};
