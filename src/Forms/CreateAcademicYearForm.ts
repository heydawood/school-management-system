export interface CreateAcademicYearTypes {
    name: string;
    fromYear: string;
    toYear: string;
    createdBy: string;
}

export const CreateAcademicYearDefaultValues: CreateAcademicYearTypes = {
    name: '',
    fromYear: '',
    toYear: '',
    createdBy: '',
}