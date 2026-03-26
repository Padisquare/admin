import { NextRequest, NextResponse } from "next/server";

const isAuthenticated = (request: NextRequest) =>
  request.cookies.get("token") !== undefined;

const authPaths = ["/login", "/forgot-password"];

const protectedPaths = [
  "/",
  "/product-requests*",
  "/products*",
  "/settings/:path*",
  "/reels",
  "/users/:path*",
  "/websites/:path*",
];

const matchPaths = (pathname: string, patterns: string[]) => {
  return patterns.some((pattern) => {
    const regex = new RegExp("^" + pattern.replace(":path*", ".*") + "$");
    return regex.test(pathname);
  });
};

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const authenticated = isAuthenticated(request);

  if (
    !authenticated &&
    (matchPaths(pathname, protectedPaths) || protectedPaths.includes(pathname))
  ) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, request.url),
    );
  }

  if (authenticated && authPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
