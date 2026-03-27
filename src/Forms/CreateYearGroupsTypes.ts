export interface CreateYearGroupsTypes {
    name: string;
    createdBy?: string;
    academicYear: string
}

export const CreateYearGroupsDefaultValues: CreateYearGroupsTypes = {
    name: '',
    createdBy: '',
    academicYear: ''
}