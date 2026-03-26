"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginDto } from "@/types/auth.type";
import { loginSchema } from "@/validation/auth.validation";
import useAuthHook from "@/hooks/useAuth.hook";
import { Loader2 } from "lucide-react";

const LoginForm = () => {
  const { useLogin } = useAuthHook();
  const { mutateAsync: login } = useLogin;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginDto>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: LoginDto) => {
    try {
      await login(data);
    } catch (error) {
    }

  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold">Admin Login</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Sign in to manage Padisquare
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              {...register("email")}
              id="email"
              type="email"
              placeholder="admin@padisquare.com"
              className={errors.email ? "border-destructive" : ""} />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Password</Label>
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              {...register("password")}
              id="password"
              type="password"
              placeholder="Enter your password"
              className={errors.password ? "border-destructive" : ""} />
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password.message}</p>
            )}
          </div>

          <Button disabled={isSubmitting} className="w-full">{isSubmitting ? <Loader2 className="animate-spin" /> : "Sign in"}</Button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
