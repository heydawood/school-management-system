export interface CreateAcademicTermTypes {
    name: string;
    description: string;
    duration: string;
    createdBy?: string;
}

export const CreateAcademicTermDefaultValues: CreateAcademicTermTypes = {
    name: '',
    description: '',
    duration: '',
    createdBy: '',
}

export interface UpdateAcademicTermFormTypes {
  name: string;
  description: string;
}
