"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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
  Menu,
  User,
  LogOut,
  LayoutDashboard,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

// Tautan Navigasi Utama
const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/assessment", label: "Asesmen" },
  { href: "/contact", label: "Kontak" },
];

export default function Navbar() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const [isArtikelOpen, setIsArtikelOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  // Ambil path dashboard berdasarkan role
  const getDashboardPath = (role) => {
    switch (role) {
      case "petugas":
        return "/dashboard/admin";
      case "pasien":
        return "/dashboard/profile";
      default:
        return "/dashboard/profile";
    }
  };

  // Fungsi untuk menentukan href berdasarkan role
  const getLinkByRole = (href) => {
    if (href === "/assessment" && user?.role === "petugas") {
      return "/dashboard/admin";
    }
    return href;
  };

  // Render tombol auth desktop
  const renderAuthButtonsDesktop = () => {
    if (isAuthenticated) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <Button variant="ghost" className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span>{user?.username || "Profil"}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => router.push(getDashboardPath(user?.role))}
              className="cursor-pointer"
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-500 cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    } else {
      return <Button onClick={() => router.push("/auth/login")}>Login</Button>;
    }
  };

  // Render link navigasi utama untuk mobile dropdown
  const renderMobileNavLinks = () => (
    <div>
      {navLinks.map((link) => (
        <DropdownMenuItem
          key={link.href}
          onClick={() => router.push(getLinkByRole(link.href))}
          className="cursor-pointer"
        >
          {link.label}
        </DropdownMenuItem>
      ))}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between sm:px-10 px-4 ">
        <Link href="/" className="flex items-center gap-3">
          <div>
            <Image
              src="/images/logo.png"
              alt="OMC Logo"
              width={40}
              height={40}
            />
          </div>
          <span className="font-bold text-xl">e-OMc</span>
        </Link>

        {/* Navigasi Desktop */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={getLinkByRole(link.href)}
              className="text-base font-medium"
            >
              {link.label}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-1 text-base font-medium cursor-pointer"
              >
                Artikel
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-base p-3">
              <DropdownMenuItem
                onClick={() => router.push("/artikel/pasien")}
                className="cursor-pointer"
              >
                Edukasi Pasien
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push("/artikel/petugas")}
                className="cursor-pointer"
              >
                Edukasi Petugas
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Tombol Auth (Kanan - Desktop) */}
        <div className="hidden md:flex">{renderAuthButtonsDesktop()}</div>

        {/* Menu Mobile */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="cursor-pointer">
                <Menu className="h-11 w-11" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {/* Grup untuk Link Navigasi */}
              <DropdownMenuGroup>
                <DropdownMenuLabel className="font-semibold">
                  Menu
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {renderMobileNavLinks()}
              </DropdownMenuGroup>

              {/* Grup untuk Artikel */}
              <Collapsible open={isArtikelOpen} onOpenChange={setIsArtikelOpen}>
                <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
                  <CollapsibleTrigger className="flex justify-between items-center w-full cursor-pointer">
                    <span>Artikel</span>
                    <ChevronRight
                      className={`h-4 w-4 transition-transform ${isArtikelOpen ? "rotate-90" : ""}`}
                    />
                  </CollapsibleTrigger>
                </DropdownMenuItem>

                <CollapsibleContent>
                  <DropdownMenuItem
                    onClick={() => router.push("/artikel/pasien")}
                    className="pl-8 cursor-pointer"
                  >
                    Edukasi Pasien
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push("/artikel/petugas")}
                    className="pl-8 cursor-pointer"
                  >
                    Edukasi Petugas
                  </DropdownMenuItem>
                </CollapsibleContent>
              </Collapsible>
              <DropdownMenuSeparator />

              {/* Grup untuk Autentikasi */}
              <DropdownMenuGroup>
                {isAuthenticated ? (
                  <>
                    <DropdownMenuItem
                      onClick={() => router.push("/dashboard/profile")}
                      className="cursor-pointer"
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-red-500 cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem onClick={() => router.push("/auth/login")}>
                    Login
                  </DropdownMenuItem>
                )}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
