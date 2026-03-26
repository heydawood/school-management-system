export interface CreateStudentTypes {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
    subject: string;
  program: string;
  classLevel: string;
  academicYear: string;
  academicTerm: string;
}

export const CreateStudentDefaultValues: CreateStudentTypes = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
     subject: '',
  program: '',
  classLevel: '',
  academicYear: '',
  academicTerm: '',
};

export interface UpdateStudentType {
    name: string;
    email: string;
}

export const UpdateStudentNameEmail: UpdateStudentType = {
    name: '',
    email: '',
};