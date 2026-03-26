export interface CreateAdminTypes {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

export const CreateAdminDefaultValues: CreateAdminTypes = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
};

export interface UpdateAdminType {
    name: string;
    email: string;
}

export const UpdateAdminNameEmail: UpdateAdminType = {
    name: '',
    email: '',
};


