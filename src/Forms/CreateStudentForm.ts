export interface CreateStudentTypes {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
  program: string;
  classLevel: string;
  academicYear: string;
}

export const CreateStudentDefaultValues: CreateStudentTypes = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  program: '',
  classLevel: '',
  academicYear: '',
};

export interface UpdateStudentType {
    name: string;
    email: string;
}

export const UpdateStudentNameEmail: UpdateStudentType = {
    name: '',
    email: '',
};