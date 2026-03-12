"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const LoginForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold">Admin Login</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Sign in to manage Padisquare
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" placeholder="admin@padisquare.com" required />
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

            <Input type="password" placeholder="Enter your password" required />
          </div>

          <Button className="w-full">Sign in</Button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
