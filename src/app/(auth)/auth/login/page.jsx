import LoginForm from "@/components/auth/LoginForm";
import { Suspense } from "react";

export const metadata = {
  title: "Login",
  description: "Login e-OMc",
};

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="w-[350px] h-[350px] animate-pulse bg-white rounded-xl" />}>
      <LoginForm />
    </Suspense>
  );
}
