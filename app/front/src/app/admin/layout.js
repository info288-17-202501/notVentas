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
                            <div className="w-48 flex flex-col ">
                                <Link href="/admin/privileges/companies" className="mb-4 text-white border-1 border-gray-900 hover:bg-gray-900 transition-colors shadow-md rounded-lg p-2">
                                    EMPRESAS
                                </Link>
                                <Link href="/admin/privileges/products" className="mb-4 text-white bg-gray-800 border-1 border-gray-900 hover:bg-gray-900 transition-colors shadow-md rounded-lg p-2">
                                    PRODUCTOS
                                </Link>
                                <Link href="/admin/privileges/sale" className="mb-4 text-white bg-gray-800 border-1 border-gray-900 hover:bg-gray-900 transition-colors shadow-md rounded-lg p-2">
                                    VENTAS
                                </Link>
                                <Link href="/admin/privileges/stores" className="mb-4 text-white bg-gray-800 border-1 border-gray-900 hover:bg-gray-900 transition-colors shadow-md rounded-lg p-2">
                                    STORES / VENDEDORES
                                </Link>
                                <Link href="/admin/privileges/stadistics" className="mb-4 text-white bg-gray-800 border-1 border-gray-900 hover:bg-gray-900 transition-colors shadow-md rounded-lg p-2">
                                    ESTADISTICAS
                                </Link>
                                <Link href="/admin/privileges/maps" className="mb-4 text-white bg-gray-800 border-1 border-gray-900 hover:bg-gray-900 transition-colors shadow-md rounded-lg p-2">
                                    MAPAS
                                </Link>
                            </div>
                        )}
                        {/* Botones para SELLER */}
                        {userRole === 'seller' && (
                            <div className="w-48 flex flex-col ">
                                <Link href="/admin/seller/products" className="mb-4 text-white border-1 border-gray-900 hover:bg-gray-900 transition-colors shadow-md rounded-lg p-2">
                                    PRODUCTOS
                                </Link>
                                <Link href="/admin/seller/sales" className="mb-4 text-white border-1 border-gray-900 hover:bg-gray-900 transition-colors shadow-md rounded-lg p-2">
                                    VENTAS
                                </Link>
                                <Link href="/admin/seller/stores" className="mb-4 text-white border-1 border-gray-900 hover:bg-gray-900 transition-colors shadow-md rounded-lg p-2">
                                    STORES / VENDEDORES
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
