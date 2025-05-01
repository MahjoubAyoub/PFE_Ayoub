import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose"; // Import jwtVerify from jose

export async function middleware(request: NextRequest) {
  console.log("Middleware triggered for:", request.nextUrl.pathname);

  if (request.nextUrl.pathname === "/login") {
    console.log("Bypassing middleware for /login");
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value; // Get token from cookies
  console.log("Authorization token:", token);

  if (!token) {
    console.log("No token found. Redirecting to /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    console.log("JWT_SECRET:", process.env.NEXT_PUBLIC_JWT_SECRET); // Debug log

    // Verify the token using jose
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
    const { payload } = await jwtVerify(token, secret); // Decode and verify the token
    console.log("Decoded token:", payload);

    if (request.nextUrl.pathname.startsWith("/dashboard")) {
      if (payload.role === "user" && !request.nextUrl.pathname.startsWith("/dashboard/designs") ) {
        console.log("User role detected. Redirecting to /dashboard/designs");
        return NextResponse.redirect(new URL("/dashboard/designs", request.url));
      } else if (payload.role === "admin") {
        console.log("Admin role detected. Redirecting to /dashboard/admin");
        return NextResponse.redirect(new URL("/dashboard/admin", request.url));
      }
    }
  } catch (error) {
    console.error("Token verification failed:", error);
    // return NextResponse.redirect(new URL("/login", request.url));
  }

  console.log("Token is valid. Proceeding to the next middleware or route.");
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // Ensure this does not include /login
};