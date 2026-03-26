export interface ResetPasswordFormTypes {
  password: string;
  confirmPassword: string;
}

export const ResetPasswordFormDefaultValues: ResetPasswordFormTypes = {
  password: '',
  confirmPassword: '',
};
