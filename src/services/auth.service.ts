import { requestHandler } from "@/utils/requestHandler";
import {
  ForgotPasswordDto,
  LoginDto,
  ResetPasswordDto,
  VerifyOtpDto,
} from "@/types/auth.type";

export const loginRequest = async (data: LoginDto) => {
  return await requestHandler("post", "/auth/login", data);
};

export const registerRequest = async (data: LoginDto) => {
  return await requestHandler("post", "/auth/register", data);
};

export const forgotPasswordRequest = async (data: ForgotPasswordDto) => {
  return await requestHandler("post", "/auth/forgot-password", data);
};

export const verifyOtpRequest = async (data: VerifyOtpDto) => {
  return await requestHandler(
    "post",
    "/auth/verify-otp?purpose=forgot_password",
    data
  );
};

export const resetPasswordRequest = async (data: ResetPasswordDto) => {
  return await requestHandler("post", "/auth/reset-password", data);
};
