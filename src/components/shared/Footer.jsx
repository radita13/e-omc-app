"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { BookOpenText, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const getAssessmentLink = () => {
    if (!isAuthenticated) return "/auth/login";
    if (user?.role === "petugas") return "/dashboard/admin";
    return "/assessment";
  };

  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto sm:px-15 px-4 pt-12 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {/* Logo & Deskripsi */}
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="OMC Logo"
                width={40}
                height={40}
              />
              <div>
                <h3 className="text-xl font-bold">e-OMc</h3>
              </div>
            </div>
            <p className="mt-2 text-gray-600 text-sm">
              Membantu pasien dan petugas kesehatan dalam mengelola Oral
              Mukositis.
            </p>
          </div>

          {/* Menu */}
          <div>
            <h4 className="font-semibold text-gray-900">Menu</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:underline">
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href={getAssessmentLink()}
                  className="text-gray-600 hover:underline"
                >
                  Asesmen
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:underline">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Artikel */}
          <div>
            <h4 className="font-semibold text-gray-900">Artikel</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-center gap-2 text-gray-600">
                <BookOpenText className="w-4 h-4 mt-0.5 shrink-0" />
                <Link
                  href="/artikel/pasien"
                  className="text-gray-600 hover:underline"
                >
                  Edukasi Pasien
                </Link>
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <BookOpenText className="w-4 h-4 mt-0.5 shrink-0" />
                <Link
                  href="/artikel/petugas"
                  className="text-gray-600 hover:underline"
                >
                  Edukasi Petugas
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="font-semibold text-gray-900">Kontak</h4>
            <ul className="mt-3 space-y-3 text-sm">
              <li className="flex items-start gap-2 text-gray-600">
                <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                <span className="wrap-break-word">
                  elektronikoralmukositis@gmail.com
                </span>
              </li>
              <li className="flex items-start gap-2 text-gray-600">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Puskesmas Berbah, Daerah Istimewa Yogyakarta</span>
              </li>
              <li className="flex items-start gap-2 text-gray-600">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Stikes Notokusumo Yogyakarta</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-500">
          © {new Date().getFullYear()} OMC App. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
