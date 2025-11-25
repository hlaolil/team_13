
export type RegisterState = {
  message: string | null;
  errors: {
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    firstName?: string[];
    lastName?: string[];
    _form?: string[];
  };
};