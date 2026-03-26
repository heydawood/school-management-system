export interface CreateTeacherTypes {
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

export const CreateTeacherDefaultValues: CreateTeacherTypes = {
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

export interface UpdateTeacherType {
    name: string;
    email: string;
}

export const UpdateTeacherNameEmail: UpdateTeacherType = {
    name: '',
    email: '',
};