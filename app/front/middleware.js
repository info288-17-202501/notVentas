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
    console.log("🛡️ Middleware activo en:", pathname);

  const protectedPaths = ["/admin/companies", "/admin/maps", "/admin/products", "/admin/stores", "/admin/users"];
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
      superadmin: ["/admin"],
      admin: ["/admin/companies", "/admin/maps", "/admin/products", "/admin/stores", "/admin/users"],
      seller: []
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
  matcher: ["/admin/:path*"], // Aplica el middleware a las rutas protegidas
};