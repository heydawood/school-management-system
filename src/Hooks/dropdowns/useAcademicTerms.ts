import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/Redux/Hooks';
import { getAcademicTerms } from '@/Redux/AdminPanel/AcademicTerms/Slice';
import type { AcademicTermDataResponse } from '@/pages/Dashboard/AdminPanel/AcademicTerms/Types';
import { useAcademicTerms } from '../TanStack/AcademicTerms/useAcademicTerms';

// type Option = {
//   name: string;
//   value: string;
// };

// export const useAcademicTerms = (setLoading?: (val: boolean) => void) => {
//   const dispatch = useAppDispatch();
//   const [data, setData] = useState<Option[]>([]);

//   useEffect(() => {
//     setLoading?.(true);

//     dispatch(getAcademicTerms())
//       .unwrap()
//       .then((res: AcademicTermDataResponse[]) => {
//         setData(
//           res.map((t) => ({
//             name: t.name,
//             value: t.id,
//           }))
//         );
//       })
//       .finally(() => setLoading?.(false));
//   }, [dispatch]);

//   return data;
// };

export const useAcademicTermsOptions = () => {
  const { data = [], isLoading } = useAcademicTerms();

  return {
    options: data.map((t:AcademicTermDataResponse) => ({
      name: t.name,
      value: t.id,
    })),
    isLoading,
  };
};