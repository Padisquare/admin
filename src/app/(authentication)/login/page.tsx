import LoginForm from "@/components/authentication/login-form";
import React, { Suspense } from "react";

const LoginPage = () => {
  return (
    <div className="">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default LoginPage;
