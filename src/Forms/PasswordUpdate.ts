export interface PasswordUpdateFormTypes {
  password: string;
  passwordConfirm: string;
}

export const PasswordUpdateFormDefaultValues: PasswordUpdateFormTypes = {
  password: '',
  passwordConfirm: '',
};

export const SetPasswordUpdateFormDefaultValues = (settings: any) => {
  return {
    password: settings.password || '',
    passwordConfirm: settings.passwordConfirm || '',
  };
};
