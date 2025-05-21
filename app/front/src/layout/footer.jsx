import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-5 mt-auto">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <p className="text-sm m-0">© {new Date().getFullYear()} NotVentas. Todos los derechos reservados.</p>
                <div className="">
                    <a href="#about" className="text-green-500 mx-2 text-sm hover:underline">Acerca de</a>
                    <a href="#contact" className="text-green-500 mx-2 text-sm hover:underline">Contacto</a>
                    <a href="#privacy" className="text-green-500 mx-2 text-sm hover:underline">Privacidad</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
