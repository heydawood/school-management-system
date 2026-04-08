import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/Redux/Hooks';
import { getStudents } from '@/Redux/Students/Slice';
import type { StudentDataResponse } from '@/pages/Dashboard/AdminPanel/Students/Types';
import { useStudents } from '../TanStack/Students/useStudents';

// type Option = {
//   name: string;
//   value: string;
// };

// export const useStudents = (setLoading?: (val: boolean) => void) => {
//   const dispatch = useAppDispatch();
//   const [data, setData] = useState<Option[]>([]);

//   useEffect(() => {
//     setLoading?.(true);

//     dispatch(getStudents())
//       .unwrap()
//       .then((res: StudentDataResponse[]) => {
//         setData(
//           res.map((s) => ({
//             name: s.name,
//             value: s.id,
//           }))
//         );
//       })
//       .finally(() => setLoading?.(false));
//   }, [dispatch]);

//   return data;
// };

export const useStudentsOptions = () => {
  const { data = [], isLoading } = useStudents();

  return {
    options: data.map((s:StudentDataResponse) => ({
      name: s.name,
      value: s.id,
    })),
    isLoading,
  };
};
