"use client";

import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import {
  LogOut,
  LayoutDashboard,
  History,
  FileText,
  Shield,
  Users,
  Newspaper,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Sidebar({ onLinkClick }) {
  const router = useRouter();
  const pathname = usePathname();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  // Pasien navLinks
  const patientNavLinks = [
    {
      href: "/dashboard/profile",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/history/assessment",
      label: "Riwayat",
      icon: History,
    },
    {
      href: "/assessment",
      label: "Mulai Assessment",
      icon: FileText,
    },
  ];

  // Petugas navLinks
  const adminNavLinks = [
    {
      href: "/dashboard/admin",
      label: "Admin Dashboard",
      icon: Shield,
    },
    {
      href: "/dashboard/manajemen-user",
      label: "Manajemen User",
      icon: Users,
    },
    {
      href: "/dashboard/artikel",
      label: "Artikel",
      icon: Newspaper,
    }
  ]

  const handleLogout = () => {
    if (onLinkClick) onLinkClick();
    logout();
    router.push("/auth/login");
  };

  const handleLinkClick = (href) => {
    if (onLinkClick) onLinkClick();
    router.push(href);
  };

  const navLinks = user?.role === "pasien" ? patientNavLinks : adminNavLinks

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r text-gray-900 flex flex-col justify-between bg-white z-50">
      <div className="h-17 p-4 md:p-6 md:h-auto flex items-center justify-center gap-3">
        <div>
          <Image src="/images/logo.png" alt="Logo" width={50} height={50} />
        </div>
        <h1 className="text-2xl hidden font-bold text-gray-900 md:block">
          e-OMC
        </h1>
      </div>

      {/* Link Navigasi Utama */}
      <nav className="flex-1 space-y-2 p-4 ">
        {navLinks.map((link) => {
          const isActive = pathname.startsWith(link.href);
          return (
            <Button
              key={link.label}
              onClick={() => handleLinkClick(link.href)}
              variant="ghost"
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium transition-colors w-full justify-start cursor-pointer",
                isActive
                  ? "bg-cyan-600 text-white"
                  : "text-gray-700 hover:bg-gray-800 hover:text-white"
              )}
            >
              <link.icon className="h-5 w-5" />
              {link.label}
            </Button>
          );
        })}
      </nav>

      <div className="p-4 border-t space-y-2">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start gap-3 text-red-500 hover:bg-gray-800 hover:text-white cursor-pointer"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </Button>
      </div>
    </aside>
  );
}
