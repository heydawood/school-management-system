import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/Redux/Hooks';
import { getSubjects } from '@/Redux/Subjects/Slice';
import type { SubjectsDataResponse } from '@/pages/Dashboard/AdminPanel/Subjects/Types';

type Option = {
  name: string;
  value: string;
};

export const useSubjects = (setLoading?: (val: boolean) => void) => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<Option[]>([]);

  useEffect(() => {
    setLoading?.(true);

    dispatch(getSubjects())
      .unwrap()
      .then((res: SubjectsDataResponse[]) => {
        setData(
          res.map((s) => ({
            name: s.name,
            value: s.id,
          }))
        );
      })
      .finally(() => setLoading?.(false));
  }, [dispatch]);

  return data;
};
