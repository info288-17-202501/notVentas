import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token"); // Obtén el token de las cookies

  // Si no hay token y el usuario intenta acceder a una ruta protegida
  if (!token && req.nextUrl.pathname.startsWith("/catalog")) {
    return NextResponse.redirect(new URL("/login", req.url)); // Redirige al login
  }

  return NextResponse.next(); // Permite el acceso si hay un token
}

// Configura las rutas protegidas
export const config = {
  matcher: ["/admin/:path*"], // Aplica el middleware a las rutas protegidas
};