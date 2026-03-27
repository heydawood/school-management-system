export interface CreateProgramsTypes {
    name: string;
    description: string;
    createdBy?: string;
    duration: string;
    code: string;
    students: { value: string }[];
    subjects: { value: string }[];
    teachers: { value: string }[];
}

export const CreateProgramsDefaultValues: CreateProgramsTypes = {
    name: '',
    description: '',
    createdBy: '',
    duration: '',
    code: '',
    students: [{ value: '' }],
    subjects: [{ value: '' }],
    teachers: [{ value: '' }],
}