export type LoginDto = {
  email: string;
  password: string;
};
export type RegisterDto = LoginDto & {
  firstName: string;
  lastName: string;
  confirmPassword: string;
  username: string;
  phoneNumber: string;
};
export type ForgotPasswordDto = {
  email: string;
};
export type VerifyOtpDto = {
  email: string;
  otp: number;
};
export type ResetPasswordDto = {
  email: string;
  password: string;
  confirmPassword: string;
  purpose: string;
  otp: number;
};
