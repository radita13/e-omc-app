"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { startTransition, useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";

export default function RegisterSuccess() {
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

  if (!allowRender) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-white">
      <div className="flex flex-col items-center">
        <Image
          src="/images/illustration/aktivasi_akun.png"
          alt="Akun Sukses"
          width={200}
          height={200}
          className="mb-6"
        />
        <h1 className="text-2xl font-semibold text-[#28a745]">
          Akun Berhasil Dibuat
        </h1>
        <p className="text-gray-600 mt-2 mb-4">
          Akun Anda telah berhasil terdaftar. Silakan melakukan masuk dengan
          akun Anda.
        </p>
        <Button
          variant="ghost"
          onClick={handleLoginClick}
          className="border border-[#28a745] text-[#28a745] px-5 py-2 rounded-full hover:bg-[#28a745] hover:text-white transition"
        >
          Masuk
        </Button>
      </div>
    </div>
  );
}
