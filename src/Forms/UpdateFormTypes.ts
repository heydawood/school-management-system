export interface FormTypes {
  name: string;
  description: string;
}

export const defaultValues: FormTypes = {
  name: '',
  description: '',
};

export const setDefaultValues = (data?: Partial<FormTypes>): FormTypes => ({
  name: data?.name ?? '',
  description: data?.description ?? '',
});