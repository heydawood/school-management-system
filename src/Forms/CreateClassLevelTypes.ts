export interface CreateClassLevelTypes {
    name: string;
    description: string;
    createdBy?: string;
    students: { value: string }[];
    subjects: { value: string }[];
    teachers: { value: string }[];
}

export const CreateClassLevelDefaultValues: CreateClassLevelTypes = {
    name: '',
    description: '',
    createdBy: '',
    students: [{ value: '' }],
    subjects: [{ value: '' }],
    teachers: [{ value: '' }],
}