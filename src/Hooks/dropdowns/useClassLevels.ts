import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/Redux/Hooks';
import { getClassLevels } from '@/Redux/AdminPanel/ClassLevels/Slice';
import type { ClassLevelDataResponse } from '@/pages/Dashboard/AdminPanel/ClassLevels/Types';
import { useClassLevels } from '../TanStack/ClassLevels/useClassLevels';

// type Option = {
//   name: string;
//   value: string;
// };

// export const useClassLevels = (setLoading?: (val: boolean) => void) => {
//   const dispatch = useAppDispatch();
//   const [data, setData] = useState<Option[]>([]);

//   useEffect(() => {
//     setLoading?.(true);

//     dispatch(getClassLevels())
//       .unwrap()
//       .then((res: ClassLevelDataResponse[]) => {
//         setData(
//           res.map((c) => ({
//             name: c.name,
//             value: c.id,
//           }))
//         );
//       })
//       .finally(() => setLoading?.(false));
//   }, [dispatch]);

//   return data;
// };

export const useClassLevelsOptions = () => {
  const { data = [], isLoading } = useClassLevels();

  return {
    options: data.map((c:ClassLevelDataResponse) => ({
      name: c.name,
      value: c.id,
    })),
    isLoading,
  };
};