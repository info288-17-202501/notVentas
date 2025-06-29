"use client";


export default function ProductsLayout({ children }) {


    return (
        <div className="flex flex-col gap-6">
            <div className="flex gap-4">
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Agregar
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                    Eliminar
                </button>
            </div>
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
}