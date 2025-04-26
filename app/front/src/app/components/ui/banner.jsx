"use client"
import React from 'react';
import Image from "next/image";
import Link from "next/link";

const Banner = () => {
    return (
        
        <div className="banner w-full h-screen relative">
            <Image
                src="/images/cubremochilas/8colores.jpeg"
                alt="Photo description"
                layout="fill"
                objectFit="cover"
                className="opacity-80 "
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 p-16">
                <h1 className="text-5xl font-bold text-center text-white" style={{ textShadow: '2px 2px 4px #000000' }}>
                ¡Bienvenido a notVentas!
                </h1>
                <h2 className='text-white text-lg font-semibold text-center mx-3' style={{ textShadow: '2px 2px 4px #000000' }}>
                Explora nuestras increíbles características y disfruta de una experiencia única.
                </h2>
                <Link href="/servicios">
                    <span className="wave-text bg-lime-500 text-white px-6 py-2 text-center rounded-full text-lg font-semibold hover:bg-lime-800 transition duration-300">
                    Conoce nuestro catálogo
                    </span>
                </Link>
                <style jsx>{`
                    .wave-text {
                        display: inline-block;
                        animation: wave 2s infinite;
                    }

                    @keyframes wave {
                        0%, 100% {
                            transform: translateY(0);
                        }
                        50% {
                            transform: translateY(-10px);
                        }
                    }
                `}</style>
            </div>
        </div>
    );
};

export default Banner;