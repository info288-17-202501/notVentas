'use client';
import Link from 'next/link';
import { useLogout } from '../../hooks/useLogout'; // Ajusta si tu path base es diferente


export default function AdminLayout({ children }) {
    const { logout } = useLogout();
    return (
        <div className="min-h-screen flex bg-gray-900">
            <aside className="w-64 bg-gray-800 p-6 flex flex-col">
                <nav className="flex flex-col h-full">
                <h2 className="m-0 text-2xl font-bold tracking-wide">
                    <Link href="/admin" className="text-white text-[22px] font-bold p-0 no-underline">
                    Admin
                    </Link>
                </h2>
                <ul className="list-none p-0 mt-8 flex flex-col gap-2">
                    <li>
                        <Link
                            href="/admin/products"
                            className="block text-white no-underline font-medium text-base py-2 px-3 rounded-md transition-colors hover:bg-white/10"
                        >
                            Productos
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/admin/users"
                            className="block text-white no-underline font-medium text-base py-2 px-3 rounded-md transition-colors hover:bg-white/10"
                        >
                            Usuarios
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/admin/stores"
                            className="block text-white no-underline font-medium text-base py-2 px-3 rounded-md transition-colors hover:bg-white/10"
                        >
                            Tiendas
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/admin/companies"
                            className="block text-white no-underline font-medium text-base py-2 px-3 rounded-md transition-colors hover:bg-white/10"
                        >
                            Empresa
                        </Link>
                    </li>
                    <li>
                    <Link
                        href="/dashboard"
                        className="block text-white no-underline font-medium text-base py-2 px-3 rounded-md transition-colors hover:bg-white/10"
                    >
                        Dashboard
                    </Link>
                    </li>
                </ul>
                <div className="mt-auto text-xs opacity-70">
                    <button
                    onClick={logout}
                    className="w-full flex items-center gap-2 justify-center py-2 px-3 rounded-md bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-semibold shadow transition-all duration-200 mb-4 border border-red-700"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
                    </svg>
                    Salir
                    </button>
                    © {new Date().getFullYear()} NotVentas
                </div>
                </nav>
            </aside>
            <main className="flex-1 p-8">{children}</main>
        </div>
    );
}