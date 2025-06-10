"use client";
import Link from 'next/link';
import { useLogout } from '../../hooks/useLogout';
import { CartProvider } from '@/context/CartContext';

export default function AdminLayout({ children }) {
    const { logout } = useLogout();
    const user = JSON.parse(localStorage.getItem('user'));
    const userRole = user?.role; // 'admin' o 'seller'

    //imprimimos en la consola el local storage
    //console.log(localStorage);

    return (
        <CartProvider>
            <div className="min-h-screen flex bg-gray-900">
                <aside className="w-72 bg-gray-800 p-6 flex flex-col items-center relative">
                    {/* Saludo */}
                    <div className="mb-8 w-full text-center">
                        <span className="text-white text-xl font-bold tracking-wide">
                            {userRole === 'admin' ? 'HOLA ADMIN' : 'HOLA SELLER'}
                        </span>
                    </div>
                    {/* Botones del sidebar */}
                    <nav className="flex flex-col gap-6 w-full items-center">
                        {/* Botones para ADMIN */}
                        {userRole === 'admin' && (
                            <div className="w-48 flex flex-col bg-blue-950 hover:bg-blue-900 transition-colors shadow-md rounded-lg p-4">
                                <Link href="/admin/companies" className="mb-4 text-white hover:text-blue-500">
                                    EMPRESAS
                                </Link>
                                <Link href="/admin/products" className="mb-4 text-white hover:text-blue-500">
                                    PRODUCTOS
                                </Link>
                                <Link href="/admin/stores" className="mb-4 text-white hover:text-blue-500">
                                    ESTADÍSTICAS
                                </Link>
                                <Link href="/admin/stores" className="mb-4 text-white hover:text-blue-500">
                                    MAPAS
                                </Link>
                                <Link href="/admin/stores" className="mb-4 text-white hover:text-blue-500">
                                    VENTAS
                                </Link>
                                <Link href="/admin/stores" className="mb-4 text-white hover:text-blue-500">
                                    VENDEDORES
                                </Link>
                            </div>
                        )}
                        {/* Botones para SELLER */}
                        {userRole === 'seller' && (
                            <div className="w-48 flex flex-col bg-blue-950 hover:bg-blue-900 transition-colors shadow-md rounded-lg p-4">
                                <Link href="/admin/products" className="mb-4 text-white hover:text-green-300">
                                    PRODUCTOS
                                </Link>
                                <Link href="/admin/sales" className="mb-4 text-white hover:text-green-300">
                                    VENTAS
                                </Link>
                                <Link href="/admin/stores" className="mb-4 text-white hover:text-green-300">
                                    STORES
                                </Link>
                            </div>
                        )}
                    </nav>
                    {/* Botón Salir fijo a la izquierda */}
                    <button
                        onClick={logout}
                        className="mt-auto bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg p-1 w-full"
                    >
                        SALIR
                    </button>
                </aside>
                <main className="flex-1 p-8">{children}</main>
            </div>
        </CartProvider>
    );
}
