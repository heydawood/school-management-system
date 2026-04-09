import type { CreateAdminTypes, UpdateAdminType } from '@/Forms/CreateAdminForm';
import api from '../../Api';

// // Get Admins
// export const getAdminData = async () => {
//   return api.get('/v1/admins');
// };


// //Create New Admin
// export const createAdmin = async (adminData:CreateAdminTypes) => {
//   return api.post('/v1/admins/signup', adminData);
// };


// //updateAdmin
// export const updateAdminInfo = async (adminData: UpdateAdminType) => {
//   return api.patch(`/v1/admins/updateAdmin`, adminData);
// };



// //get admin by id
// export const getAdminDataById = async (adminId: string) => {
//   return api.get(`/v1/admins/${adminId}`);
// }

// GET ALL
export const getAdmins = async () => {
  const res = await api.get('/v1/admins');
  return res.data.data;
};

// CREATE
export const createAdmin = async (adminData: CreateAdminTypes) => {
  const res = await api.post('/v1/admins/signup', adminData);
  return res.data;
};

// UPDATE
export const updateAdmin = async (adminData: UpdateAdminType) => {
  const res = await api.patch(`/v1/admins/updateAdmin`, adminData);
  return res.data;
};

// GET BY ID
export const getAdminById = async (adminId: string) => {
  const res = await api.get(`/v1/admins/${adminId}`);
  console.log("Admin Data by ID Response:", res.data);
  return res.data.data.admin;
};