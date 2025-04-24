"use client";
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <ul className="flex list-none m-0 p-0">
                <li className="mr-5">
                    <Link to="/catalogo" className="text-white no-underline text-lg">Catálogo</Link>
                </li>
                <li className="mr-5">
                    <Link to="/iniciarsesion" className="text-white no-underline text-lg">Iniciar Sesión</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
