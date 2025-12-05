import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function RegisterSuccessView({ onLoginClick }) {
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
          onClick={onLoginClick}
          className="border border-[#28a745] text-[#28a745] px-5 py-2 rounded-full hover:bg-[#28a745] hover:text-white transition cursor-pointer"
        >
          Masuk
        </Button>
      </div>
    </div>
  );
}
