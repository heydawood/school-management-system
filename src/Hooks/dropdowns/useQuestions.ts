import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/Redux/Hooks';
import { getQuestions } from '@/Redux/Questions/Slice';
import type { QuestionsDataResponse } from '@/pages/Dashboard/TeacherPanel/Questions/Types';

type Option = {
  name: string;
  value: string;
};

export const useQuestions = (setLoading?: (val: boolean) => void) => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<Option[]>([]);

  useEffect(() => {
    setLoading?.(true);

    dispatch(getQuestions())
      .unwrap()
      .then((res: QuestionsDataResponse[]) => {
        setData(
          res.map((q) => ({
            name: q.question,
            value: q.id,
          }))
        );
      })
      .finally(() => setLoading?.(false));
  }, [dispatch]);

  return data;
};