import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Define the arrays of forbidden routes
const sellerForbiddenRoutes = ["/sdsakdlsakdlska", "/consumer-route2"];
const consumerForbiddenRoutes = ["/seller-route1", "/seller-route2"];
const visitorForbiddenRoutes = ["/seller", "/dashboard", "/settings"];

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  console.log(token);
  const { pathname } = request.nextUrl;

  const isForbidden = (forbiddenRoutes: string[], path: string) =>
    forbiddenRoutes.some((route) => path.startsWith(route));

  if (!token) {
    if (isForbidden(visitorForbiddenRoutes, pathname)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    if (
      token.roles === "seller" &&
      isForbidden(sellerForbiddenRoutes, pathname)
    ) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    if (
      token.roles === "consumer" &&
      isForbidden(consumerForbiddenRoutes, pathname)
    ) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
