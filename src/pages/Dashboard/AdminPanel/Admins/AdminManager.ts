import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { customToast } from '@/Common/Components/ShowToast';

import {
  createAdmin,
  getAdminById,
  getAdmins,
  updateAdmin,
} from '@/Services/AdminPanel/Admin/Admin';

export const useAdminManager = () => {
  const queryClient = useQueryClient();

  // GET ALL ADMINS
  const getAdminsList = () => {
    return useQuery({
      queryKey: ['admins'],
      queryFn: getAdmins,
      select: (res) => res // clean response
    });
  };

  // GET ADMIN BY ID
  const getAdmin = (id?: string | null) => {
    return useQuery({
      queryKey: ['admin', id],
      queryFn: () => getAdminById(id as string),
      enabled: !!id,
      select: (res) => res
    });
  };

  // CREATE ADMIN
  const { mutate: createNewAdmin, isPending: isCreating } = useMutation({
    mutationFn: createAdmin,

    onSuccess: () => {
      customToast.success('Admin created successfully');

      // refreshes the admin list. this is updating data directly in cache data
      queryClient.invalidateQueries({ queryKey: ['admins'] });
    },

    onError: (err: any) => {
      customToast.error(err?.message || 'Failed to create admin');
    },
  });



  // UPDATE ADMIN
//   const { mutate: updateAdminData, isPending: isUpdating } = useMutation({
//     mutationFn: ({
//       data,
//     }: {
//       data: any;
//     }) => updateAdmin(data),

//     onSuccess: () => {
//       customToast.success('Admin updated successfully');

//       queryClient.invalidateQueries({ queryKey: ['admins'] });
//     },

//     onError: (err: any) => {
//       customToast.error(err?.message || 'Failed to update admin');
//     },
//   });

const updateAdminData = useMutation({
  mutationFn: ({ data }: { data: any }) => updateAdmin(data),

  onSuccess: () => {
    customToast.success('Admin updated successfully');
    queryClient.invalidateQueries({ queryKey: ['admins'] });
  },

  onError: (err: any) => {
    customToast.error(err?.message || 'Failed to update admin');
  },
});


  return {
    // queries
    getAdminsList,
    getAdmin,

    // mutations
    createNewAdmin,
    isCreating,

    updateAdminData,
  };
};
