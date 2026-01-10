"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import LogoPartnerLoop from "../shared/LogoPartnerLoop";

export default function HeroSection() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleStart = () => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    } else if (isAuthenticated && user?.role === "petugas") {
      router.push("/dashboard/admin");
    } else {
      router.push("/assessment");
    }
  };

  return (
    <section className="min-h-[calc(100vh-64px)] container mx-auto flex flex-col items-center justify-center sm:px-15 px-4 py-10 md:py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
        {/* Kolom Teks */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl xl:text-5xl">
            Perawatan <span className="italic">Mukositis Oral</span>,{" "}
            <span className="text-emerald-600">Langsung</span> dari Genggaman
            Anda.
          </h1>
          <p className="text-lg mt-5 text-gray-600 max-w-[600px]">
            Dapatkan edukasi, lakukan asesmen mandiri, dan pantau kesehatan Anda
            dengan e-OMc. Dirancang untuk pasien dan tenaga kesehatan.
          </p>
          <div className="mt-6">
            <Button
              size="lg"
              className="bg-cyan-600 hover:bg-cyan-700 rounded-full cursor-pointer"
              onClick={handleStart}
            >
              Mulai Asesmen
            </Button>
          </div>
          {/* <ul className="mt-6 space-y-2 text-gray-600">
            <li className="flex items-center gap-2">
              <Check className="h-5 w-5 text-cyan-600" />
              Cepat & Mudah
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-5 w-5 text-cyan-600" />
              Berdasarkan Panduan WHO
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-5 w-5 text-cyan-600" />
              Rekomendasi Perawatan Langsung
            </li>
          </ul> */}
        </div>

        <div className="flex justify-center w-full h-[400px] mx-auto relative">
          <Image
            src="/images/hero.png"
            alt="Petugas Kesehatan OMC"
            fill
            className="rounded-xl shadow-lg object-cover"
          />
        </div>
      </div>

      {/* Logo Loop di bawah hero */}
      <div className="w-full flex flex-col items-center justify-center mt-10 px-4">
        <p className="text-lg font-semibold mb-6 text-center">Dipercaya oleh</p>
        <div className="w-full h-16 sm:h-20 lg:h-24 flex items-center justify-center">
          <LogoPartnerLoop />
        </div>
      </div>
    </section>
  );
}
