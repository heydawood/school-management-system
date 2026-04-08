import type { CreateAdminTypes, UpdateAdminType } from '@/Forms/CreateAdminForm';
import api from '../../Api';

// Get Admins
export const getAdminData = async () => {
  return api.get('/v1/admins');
};


//Create New Admin
export const createAdmin = async (adminData:CreateAdminTypes) => {
  return api.post('/v1/admins/signup', adminData);
};


//updateAdmin
export const updateAdminInfo = async (adminData: UpdateAdminType) => {
  return api.patch(`/v1/admins/updateAdmin`, adminData);
};



//get admin by id
export const getAdminDataById = async (adminId: string) => {
  return api.get(`/v1/admins/${adminId}`);
}