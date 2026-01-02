"use client";

import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  LogOut,
  LayoutDashboard,
  User,
  Home,
  BookOpen,
  FileText,
  Phone,
  Menu,
  ChevronRight,
  BookText,
} from "lucide-react";
import Image from "next/image";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { useState } from "react";

// Fungsi helper untuk mengubah pathname menjadi Judul Halaman
const getTitleFromPathname = (pathname) => {
  if (pathname.startsWith("/dashboard/profile")) return "Pasien Dashboard";
  if (pathname.startsWith("/history/assessment")) return "Riwayat Asesmen";
  if (pathname.startsWith("/assessment")) return "Mulai Asesmen";
  if (pathname.startsWith("/dashboard/admin")) return "Admin Dashboard";
  if (pathname.startsWith("/dashboard/manajemen-user"))
    return "Manajemen Pasien";
  if (pathname.startsWith("/dashboard/artikel")) return "Artikel";
  if (pathname.startsWith("/dashboard/assessment")) return "Asesmen";
  return "e-OMC";
};

export default function DashboardHeader({ onMenuClick }) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const [isArtikelOpen, setIsArtikelOpen] = useState(false);

  const pageTitle = getTitleFromPathname(pathname);

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  return (
    <header className="flex h-17 items-center justify-between border-b px-8 text-gray-900">
      <div className="items-center flex gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden hover:bg-gray-300"
          onClick={onMenuClick}
        >
          <Menu className="h-6 w-6" />
        </Button>

        <h1 className="text-xl font-semibold">{pageTitle}</h1>
      </div>

      {/* Menu */}
      <div className="flex items-center gap-4 ">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="border rounded-full border-gray-900 cursor-pointer">
              <Image
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.username || "U"}`}
                alt="Avatar"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full p-0.5"
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel>
              <p className="text-sm text-gray-500 truncate">{user?.username}</p>
              <p className="font-medium truncate">{user?.email}</p>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => router.push("/")}>
                <Home className="mr-2 h-4 w-4" />
                <span className="cursor-pointer">Beranda</span>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => router.push("/assessment/1")}>
                <FileText className="mr-2 h-4 w-4" />
                <span className="cursor-pointer">Asesmen</span>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => router.push("/contact")}>
                <Phone className="mr-2 h-4 w-4" />
                <span className="cursor-pointer">Kontak</span>
              </DropdownMenuItem>

              <Collapsible open={isArtikelOpen} onOpenChange={setIsArtikelOpen}>
                <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
                  <CollapsibleTrigger className="flex justify-between items-center w-full cursor-pointer">
                    <div className="flex items-center gap-2">
                      <BookOpen className="mr-2 h-4 w-4" />
                      <span>Artikel</span>
                    </div>
                    <ChevronRight
                      className={`h-4 w-4 transition-transform ${isArtikelOpen ? "rotate-90" : ""}`}
                    />
                  </CollapsibleTrigger>
                </DropdownMenuItem>

                <CollapsibleContent>
                  <DropdownMenuItem
                    onClick={() => router.push("/artikel/pasien")}
                    className="pl-10 cursor-pointer"
                  >
                    <BookText className="h-4 w-4" />
                    Edukasi Pasien
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push("/artikel/petugas")}
                    className="pl-10 cursor-pointer"
                  >
                    <BookText className="h-4 w-4" />
                    Edukasi Petugas
                  </DropdownMenuItem>
                </CollapsibleContent>
              </Collapsible>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            {/* Dashboard */}
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => router.push("/dashboard/profile")}
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span className="cursor-pointer">Dashboard</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuItem onClick={handleLogout} className="text-red-500">
              <LogOut className="mr-2 h-4 w-4" />
              <span className="cursor-pointer">Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
