import { NextResponse } from "next/server";

export function middleware(request) {
  const pathname = request.nextUrl.pathname;
  const userCookie = request.cookies.get("omc_user")?.value;
  const tokenCookie = request.cookies.get("omc_token")?.value;

  if (!tokenCookie) {
    return NextResponse.next();
  }

  let user = null;
  if (userCookie) {
    try {
      user = JSON.parse(userCookie);
    } catch (e) {
      console.error("Failed to parse user cookie:", e);
      return NextResponse.next();
    }
  }

  const patientOnlyUrls = ["/dashboard/profile", "/history", "/assessment"];

  const adminOnlyUrls = [
    "/dashboard/admin",
    "/dashboard/manajemen-user",
    "/dashboard/artikel",
    "/dashboard/assessment",
  ];

  const isPasien = user?.role === "pasien";
  const isAdminUrl = adminOnlyUrls.some((url) => pathname.startsWith(url));
  const isPatientUrl = patientOnlyUrls.some((url) => pathname.startsWith(url));

  if (isPasien && isAdminUrl) {
    console.warn(`[MIDDLEWARE] Pasien mencoba akses admin URL: ${pathname}`);
    return NextResponse.redirect(new URL("/dashboard/profile", request.url));
  }

  if (!isPasien && isPatientUrl) {
    console.warn(`[MIDDLEWARE] Admin mencoba akses patient URL: ${pathname}`);
    return NextResponse.redirect(new URL("/dashboard/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/history/:path*",
    "/assessment/:path*",
  ],
};
