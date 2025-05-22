import { NextResponse } from "next/server";

function parseJwt(token) {
  try {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  } 
  catch (e) {
      return null;
  }
}

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token"); // Obtén el token de las cookies

  const protectedPaths = ["/catalog", "/admin", "/mapa", "/products", "/companies"];
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  // Si no hay token y el usuario intenta acceder a una ruta protegida
  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/login", req.url)); // Redirige al login
  }

  if (token) {
    const payload = parseJwt(token.value);
    const role = payload?.role;

    // 🔒 Rutas por rol
    const rolePermissions = {
      superadmin: ["/admin", "/products", "/companies", "/mapa"],
      admin: ["/products", "/companies", "/mapa"],
      seller: ["/catalog", "/mapa"]
    };

    const allowedPaths = rolePermissions[role] || [];

    const isAllowed = allowedPaths.some((path) => pathname.startsWith(path));

    if (!isAllowed && isProtected) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
}
 }

  return NextResponse.next();
}

// Configura las rutas protegidas
export const config = {
  matcher: ["/path*"], // Aplica el middleware a las rutas protegidas
};