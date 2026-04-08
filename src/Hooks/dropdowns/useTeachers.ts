import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/Redux/Hooks';
import { getTeachers } from '@/Redux/Teachers/Slice';
import type { TeacherDataResponse } from '@/pages/Dashboard/AdminPanel/Teachers/Types';

type Option = {
  name: string;
  value: string;
};

export const useTeachers = (setLoading?: (val: boolean) => void) => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<Option[]>([]);

  useEffect(() => {
    setLoading?.(true);

    dispatch(getTeachers())
      .unwrap()
      .then((res: TeacherDataResponse[]) => {
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