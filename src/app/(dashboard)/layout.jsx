"use client";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import DashboardHeader from "@/components/shared/DashboardHeader";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

export default function AppLayout({ children }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const loading = useAuthStore((state) => state.loading);
  const router = useRouter();

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="flex min-h-screen">
        {/* === 1. SIDEBAR DESKTOP === */}
        <div className="hidden md:block h-screen">
          <Sidebar />
        </div>

        {/* === 2. SIDEBAR MOBILE (OVERLAY) === */}
        <div className="md:hidden">
          <Sheet
            open={isMobileSidebarOpen}
            onOpenChange={setIsMobileSidebarOpen}
          >
            <SheetContent side="left" className="w-64 p-0 border-r-0">
              <SheetHeader className="sr-only">
                <SheetTitle>Menu Utama</SheetTitle>
                <SheetDescription>
                  Navigasi utama untuk dashboard e-OMC
                </SheetDescription>
              </SheetHeader>
              <Sidebar onLinkClick={() => setIsMobileSidebarOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>

        {/* === 3. KONTEN KANAN === */}
        <div className="flex flex-1 flex-col h-screen overflow-hidden md:ml-64">
          <DashboardHeader onMenuClick={() => setIsMobileSidebarOpen(true)} />

          <main className="flex-1 bg-gray-100 p-4 md:p-8 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    );
  }

  return null;
}
