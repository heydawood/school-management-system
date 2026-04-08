import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/Redux/Hooks';
import { getAcademicYears } from '@/Redux/AdminPanel/AcademicYears/Slice';
import type { AcademicYearDataResponse } from '@/pages/Dashboard/AdminPanel/AcademicYears/Types';
import { useAcademicYears } from '../TanStack/AcademicYears/useAcademicYears';

// type Option = {
//   name: string;
//   value: string;
// };

// export const useAcademicYears = (setLoading?: (val: boolean) => void) => {
//   const dispatch = useAppDispatch();
//   const [data, setData] = useState<Option[]>([]);

//   useEffect(() => {
//     setLoading?.(true);

//     dispatch(getAcademicYears())
//       .unwrap()
//       .then((res: AcademicYearDataResponse[]) => {
//         setData(
//           res.map((y) => ({
//             name: y.name,
//             value: y.id,
//           }))
//         );
//       })
//       .finally(() => setLoading?.(false));
//   }, [dispatch]);

//   return data;
// };

export const useAcademicYearsOptions = () => {
  const { data = [], isLoading } = useAcademicYears();

  return {
    options: data.map((y:AcademicYearDataResponse) => ({
      name: y.name,
      value: y.id,
    })),
    isLoading,
  };
};