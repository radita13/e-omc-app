"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export default function CtaSection() {
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
    <section className="bg-cyan-800 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Kesehatan Mulut Tidak Perlu Rumit
        </h2>
        <p className="text-lg text-cyan-100 max-w-2xl mx-auto mb-8">
          Ambil langkah pertama untuk kenyamanan Anda. Mulai asesmen mandiri
          Anda hari ini dan dapatkan panduan perawatan yang tepat.
        </p>
        <Button
          size="lg"
          className="bg-white text-cyan-800 hover:bg-gray-100 cursor-pointer"
          onClick={handleStart}
        >
          Mulai Assessment Sekarang
        </Button>
      </div>
    </section>
  );
}
