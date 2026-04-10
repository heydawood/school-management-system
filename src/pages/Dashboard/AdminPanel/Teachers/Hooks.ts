// import { useQuery } from '@tanstack/react-query';
// import { customToast } from '@/Common/Components/ShowToast';
// import { useFetch } from '@/Hooks/TanStack/useFetch';
// import { useMutate } from '@/Hooks/TanStack/useMutate';
// import { createTeacher, getTeacherById, getTeacherProfile, getTeachers, updateTeacher } from '@/Services/Teacher/Teacher';

// // GET ALL TEACHERS
// export const useTeachers = () => {
//   return useFetch({
//     queryKey: ['teachers'],
//     queryFn: getTeachers,
//   });
// };

// // GET TEACHER BY ID
// export const useTeacherById = (id?: string | null) => {
//   return useQuery({
//     queryKey: ['teacher', id],
//     queryFn: () => getTeacherById(id as string),
//     enabled: !!id,
//   });
// };

// // GET TEACHER PROFILE
// export const useTeacherProfile = () => {
//   return useFetch({
//     queryKey: ['teacher-profile'],
//     queryFn: getTeacherProfile,
//   });
// };

// // CREATE TEACHER
// export const useCreateTeacher = () => {
//   return useMutate({
//     mutationFn: createTeacher,
//     invalidateKeys: [['teachers']],
//     onSuccess: () => {
//       customToast.success('Teacher created successfully');
//     },
//   });
// };

// // UPDATE TEACHER
// export const useUpdateTeacher = () => {
//   return useMutate({
//     mutationFn: ({
//       teacherId,
//       data,
//     }: {
//       teacherId: string;
//       data: any;
//     }) => updateTeacher(teacherId, data),

//     invalidateKeys: [['teachers']],

//     onSuccess: () => {
//       customToast.success('Teacher updated successfully');
//     },
//   });
// }