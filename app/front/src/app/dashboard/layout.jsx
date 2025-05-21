import Link from 'next/link';

export default function DashboardLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-[#f4f6fa]">
            <nav className="w-60 bg-gradient-to-b from-[#232526] to-[#414345] p-8 text-white shadow-lg flex flex-col min-h-screen">
                <h2 className="m-0 text-2xl font-bold tracking-wide">
                    <Link href="/dashboard" className="text-white text-[22px] font-bold p-0 no-underline">
                        Dashboard
                    </Link>
                </h2>
                <ul className="list-none p-0 mt-8 flex flex-col gap-2">
                    <li>
                        <Link href="/dashboard/users" className="block text-white no-underline font-medium text-base py-2 px-3 rounded-md transition-colors hover:bg-white/10">
                            Usuarios
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/tiendas" className="block text-white no-underline font-medium text-base py-2 px-3 rounded-md transition-colors hover:bg-white/10">
                            Tiendas
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/empresa" className="block text-white no-underline font-medium text-base py-2 px-3 rounded-md transition-colors hover:bg-white/10">
                            Empresa
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/products" className="block text-white no-underline font-medium text-base py-2 px-3 rounded-md transition-colors hover:bg-white/10">
                            Productos
                        </Link>
                    </li>
                </ul>
                <div className="mt-auto text-xs opacity-70">
                    <button
                        className="w-full text-left py-2 px-3 rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors mb-4"
                
                    >
                        Salir
                    </button>
                    © {new Date().getFullYear()} NotVentas
                </div>
            </nav>
            <main className="flex-1 p-10 bg-[#f4f6fa] min-h-screen shadow-inner border-l border-[#e5e7eb]">
                {children}
            </main>
        </div>
    );
}
