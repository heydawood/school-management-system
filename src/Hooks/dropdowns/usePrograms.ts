import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/Redux/Hooks';
import { getPrograms } from '@/Redux/Programs/Slice';
import type { ProgramsDataResponse } from '@/pages/Dashboard/Programs/Types';

type Option = {
  name: string;
  value: string;
};

export const usePrograms = (setLoading?: (val: boolean) => void) => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<Option[]>([]);

  useEffect(() => {
    setLoading?.(true);

    dispatch(getPrograms())
      .unwrap()
      .then((res: ProgramsDataResponse[]) => {
        setData(
          res.map((p) => ({
            name: p.name,
            value: p._id,
          }))
        );
      })
      .finally(() => setLoading?.(false));
  }, [dispatch]);

  return data;
};