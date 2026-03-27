export interface CreateSubjectsTypes {
    name: string;
    description: string;
    createdBy?: string;
    duration: string;
    teacher: string;
    academicTerm: string
    programId: string
}

export const CreateSubjectsDefaultValues: CreateSubjectsTypes = {
    name: '',
    description: '',
    createdBy: '',
    duration: '',
    teacher: '',
    academicTerm: '',
    programId: ''
}