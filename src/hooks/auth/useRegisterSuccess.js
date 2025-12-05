import { useSearchParams, useRouter } from "next/navigation";
import { startTransition, useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";

export const useRegisterSuccess = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [allowRender, setAllowRender] = useState(false);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const loading = useAuthStore((state) => state.loading);
  const isFirstUnmount = useRef(true);

  useEffect(() => {
    if (loading) return;
    if (isAuthenticated) {
      router.replace("/dashboard/profile");
      return;
    }

    const tokenFromUrl = searchParams.get("token");
    const tokenFromStorage = sessionStorage.getItem("registerSuccessToken");

    if (!tokenFromUrl || tokenFromUrl !== tokenFromStorage) {
      router.replace("/auth/login");
      return;
    }

    startTransition(() => {
      setAllowRender(true);
    });

    return () => {
      if (process.env.NODE_ENV === "development" && isFirstUnmount.current) {
        isFirstUnmount.current = false;
        return;
      }
      sessionStorage.removeItem("registerSuccessToken");
    };
  }, [loading, isAuthenticated, router, searchParams]);

  const handleLoginClick = () => {
    sessionStorage.removeItem("registerSuccessToken");
    router.push("/auth/login");
  };

  return {
    allowRender,
    handleLoginClick,
  };
};
