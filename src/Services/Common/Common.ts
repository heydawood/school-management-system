import api from '../Api';

// Common File Upload
export const commonFileUploadHandler = async (data: any) => {
  return api.post('file-upload', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
