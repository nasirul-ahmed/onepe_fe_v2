import { NextRequest, NextResponse } from "next/server";
import configuration from "@/config/config.json";
import { X } from "lucide-react";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const publicRoutes = configuration.publicRoutes;

  const authToken = request.cookies.get("authToken")?.value;

  if (!authToken && !publicRoutes.includes(pathname)) {
    // return NextResponse.redirect(new URL("/login", request.url));
    return NextResponse.next();
  }

  if (authToken && pathname === "/login") {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|login|select-language).*)",
  ],
};
