import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { customToast } from '@/Common/Components/ShowToast';

import {
  createTeacher,
  getTeacherById,
  getTeacherProfile,
  getTeachers,
  updateTeacher,
} from '@/Services/Teacher/Teacher';

export const useTeacherManager = () => {
  const queryClient = useQueryClient();



  // GET ALL TEACHERS
  const getTeachersList = () => {
    return useQuery({
      queryKey: ['teachers'],
      queryFn: getTeachers,
      select: (res) => res // for clean response
    });
  };


  // GET TEACHER BY ID
  const getTeacher = (id?: string | null) => {
    return useQuery({
      queryKey: ['teacher', id],
      queryFn: () => getTeacherById(id as string),
      enabled: !!id,
      select: (res) => res,
    });
  };


  // GET PROFILE
  const getProfile = () => {
    return useQuery({
      queryKey: ['teacher-profile'],
      queryFn: getTeacherProfile,
      select: (res) => res,
    });
  };


  // CREATE TEACHER
  const { mutate: createNewTeacher, isPending: isCreating } = useMutation({
    mutationFn: createTeacher,

    onSuccess: () => {
      customToast.success('Teacher created successfully');

      //invalidate instead of refetch manually
      queryClient.invalidateQueries({ queryKey: ['teachers'] });
    },

    onError: (err: any) => {
      customToast.error(err?.message || 'Failed to create teacher');
    },
  });

  // UPDATE TEACHER
  const { mutate: updateTeacherData, isPending: isUpdating } = useMutation({
    mutationFn: ({
      teacherId,
      data,
    }: {
      teacherId: string;
      data: any;
    }) => updateTeacher(teacherId, data),

    onSuccess: () => {
      customToast.success('Teacher updated successfully');

      queryClient.invalidateQueries({ queryKey: ['teachers'] });
    },

    onError: (err: any) => {
      customToast.error(err?.message || 'Failed to update teacher');
    },
  });

  return {
    // queries
    getTeachersList,
    getTeacher,
    getProfile,

    // mutations
    createNewTeacher,
    isCreating,

    updateTeacherData,
    isUpdating,
  };
};
