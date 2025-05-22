import React from 'react';
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="bg-lime-500 h-8">
            <ul className="flex justify-end text-center items-center h-full">
                <li className="p-2">
                    <Link href="/dashboard/products" className="text-white no-underline text-xs hover:text-lime-800">Catálogo</Link>
                </li>
                <li className="p-2">
                    <Link href="/login" className="text-white no-underline text-xs hover:text-lime-800" >Log In</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;