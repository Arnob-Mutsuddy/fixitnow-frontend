import { NextRequest, NextResponse } from "next/server";

const roleBasedRoutes: Record<string, string> = {
  "/dashboard/customer": "CUSTOMER",
  "/dashboard/technician": "TECHNICIAN",
  "/dashboard/admin": "ADMIN",
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("accessToken")?.value;

  const isProtectedRoute = pathname.startsWith("/dashboard");

  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/auth/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};