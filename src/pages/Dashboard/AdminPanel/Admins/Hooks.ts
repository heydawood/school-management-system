import { useQuery } from '@tanstack/react-query';
import { customToast } from '@/Common/Components/ShowToast';
import { useFetch } from '@/Hooks/TanStack/useFetch';
import { createAdmin, getAdminById, getAdmins, updateAdmin } from '@/Services/AdminPanel/Admin/Admin';
import { useMutate } from '@/Hooks/TanStack/useMutate';


// GET ALL
export const useAdmins = () => {
  return useFetch({
    queryKey: ['admins'],
    queryFn: getAdmins,
  });
};


// GET BY ID
export const useAdminById = (id?: string | null) => {
  return useQuery({
    queryKey: ['admin', id],
    queryFn: () => getAdminById(id as string),
    enabled: !!id,
  });
};


// CREATE
export const useCreateAdmin = () => {
  return useMutate({
    mutationFn: createAdmin,
    invalidateKeys: [['admins']],
    onSuccess: () => {
      customToast.success('Admin created successfully');
    },
  });
};


// UPDATE
export const useUpdateAdmin = () => {
  return useMutate({
    mutationFn: updateAdmin,
    invalidateKeys: [['admins']],
    onSuccess: () => {
      customToast.success('Admin updated successfully');
    },
  });
};