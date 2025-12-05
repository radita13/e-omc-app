"use client";

import { useRegisterSuccess } from "@/hooks/auth/useRegisterSuccess";
import RegisterSuccessView from "@/components/auth/success/RegisterSuccessView";

export default function RegisterSuccessPage() {
  const { allowRender, handleLoginClick } = useRegisterSuccess();

  if (!allowRender) {
    return null;
  }

  return <RegisterSuccessView onLoginClick={handleLoginClick} />;
}
