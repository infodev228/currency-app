import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// List protected paths
const protectedPaths = ["/admin"];

// Middleware to protect routes
export function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken"); // Assume token is stored in cookies

  // Check if the path is protected
  if (protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
  return NextResponse.next();
}

// Run middleware on protected routes
export const config = {
  matcher: ["/admin/:path*"],
};
