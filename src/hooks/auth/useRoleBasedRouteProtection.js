"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export function useRoleBasedRouteProtection(requiredRole = null) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // URL user
  const patientOnlyUrls = ["/dashboard/profile", "/history", "/assessment"];

  // URL admin
  const adminOnlyUrls = [
    "/dashboard/admin",
    "/dashboard/manajemen-user",
    "/dashboard/artikel",
    "/dashboard/assessment",
  ];

  useEffect(() => {
    if (!isAuthenticated || !user) {
      return;
    }

    const isPasien = user.role === "pasien";
    const isAdminUrl = adminOnlyUrls.some((url) => pathname.startsWith(url));

    const isPatientUrl = patientOnlyUrls.some((url) =>
      pathname.startsWith(url)
    );

    if (requiredRole) {
      if (requiredRole === "pasien" && !isPasien) {
        console.warn(
          `[ROUTE PROTECTION] User tidak punya role 'pasien' untuk akses ${pathname}`
        );
        router.replace("/dashboard/admin");
        return;
      }
      if (requiredRole === "admin" && isPasien) {
        console.warn(
          `[ROUTE PROTECTION] User tidak punya role 'admin' untuk akses ${pathname}`
        );
        router.replace("/dashboard/profile");
        return;
      }
    }

    if (isPasien && isAdminUrl) {
      console.warn(
        `[ROUTE PROTECTION] Pasien mencoba akses admin URL: ${pathname}`
      );
      router.replace("/dashboard/profile");
      return;
    }

    if (!isPasien && isPatientUrl) {
      console.warn(
        `[ROUTE PROTECTION] Admin mencoba akses patient URL: ${pathname}`
      );
      router.replace("/dashboard/admin");
      return;
    }
  }, [user, isAuthenticated, pathname, requiredRole, router]);
}
