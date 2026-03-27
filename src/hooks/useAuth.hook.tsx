"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import {
    forgotPasswordRequest,
    loginRequest,
} from "@/services/auth.service";
import { ResponseType } from "@/types/http";
import {
    ForgotPasswordDto,
    LoginDto,
} from "@/types/auth.type";
import { showToast } from "@/lib/toast";
// import { UserType } from "@/types/user.type";
import Cookies from "js-cookie";
import { useAuthContext } from "@/context/AuthContext";

const useAuthHook = () => {
    const { storeToken } = useAuthContext();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect");

    const useLogin = useMutation({
        mutationFn: (data: LoginDto) => loginRequest(data),
        onSuccess: (response: ResponseType<{ token: string; }>) => {
            showToast("success", response.message);
            storeToken?.(response.entity.token);
            router.push(redirect || "/");
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
            showToast("error", error?.message);
        },
    });
    const useForgotPassword = useMutation({
        mutationFn: (data: ForgotPasswordDto) => {
            Cookies.set("rsp_ps_email", data.email, { expires: 0.0417 });
            return forgotPasswordRequest(data);
        },
        onSuccess: (response: ResponseType<unknown>) => {
            showToast("success", response.message);
            router.push("/verify-otp");
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
            showToast("error", error?.message);
        },
    });
    return {
        useLogin,
        useForgotPassword,
    };
};

export default useAuthHook;
