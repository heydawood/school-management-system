import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/Redux/Hooks';
import { getAcademicTerms } from '@/Redux/AcademicTerms/Slice';
import type { AcademicTermDataResponse } from '@/pages/Dashboard/AcademicTerms/Types';

type Option = {
  name: string;
  value: string;
};

export const useAcademicTerms = (setLoading?: (val: boolean) => void) => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<Option[]>([]);

  useEffect(() => {
    setLoading?.(true);

    dispatch(getAcademicTerms())
      .unwrap()
      .then((res: AcademicTermDataResponse[]) => {
        setData(
          res.map((t) => ({
            name: t.name,
            value: t.id,
          }))
        );
      })
      .finally(() => setLoading?.(false));
  }, [dispatch]);

  return data;
};