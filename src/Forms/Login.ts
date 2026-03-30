export interface LoginFormTypes {
  email: string;
  password: string;
  role: "admin" | "teacher" | "student";
}

export const LoginFormDefaultValues: LoginFormTypes = {
  email: '',
  password: '',
  role: 'admin',
};
