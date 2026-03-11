"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ForgotPasswordForm = () => {
  return (
    <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold">Forgot Password</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Enter your email and we&apos;ll send you a reset link
        </p>
      </div>

      {/* Form */}
      <form className="space-y-5">
        <div className="space-y-2">
          <Label>Email</Label>
          <Input type="email" placeholder="admin@padisquare.com" required />
        </div>

        <Button className="w-full">Send Reset Link</Button>
      </form>

      {/* Back to login */}
      <div className="mt-6 text-center">
        <Link href="/login" className="text-sm text-primary hover:underline">
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
