import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Define the arrays of forbidden routes
const sellerForbiddenRoutes = ["/consumer-route1", "/consumer-route2"];
const consumerForbiddenRoutes = ["/seller-route1", "/seller-route2"];
const visitorForbiddenRoutes = ["/profile", "/dashboard", "/settings"];

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  if (!token) {
    // User is not authenticated (visitor)
    if (visitorForbiddenRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    if (token.role === "seller" && sellerForbiddenRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    if (
      token.role === "consumer" &&
      consumerForbiddenRoutes.includes(pathname)
    ) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
