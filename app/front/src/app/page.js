"use client";
import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/routes/ProtectedRoute";

function Page(){
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-100">
				<h1 className="text-4xl font-bold text-blue-600 mb-4">¡Bienvenido a la Página de notVentas!</h1>
				<p className="text-lg text-gray-700 mb-6">
					Explora nuestras increíbles características y disfruta de una experiencia única.
				</p>
				<div className="flex space-x-4">
					<a
						href="/catalog"
						className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
					>
						Ir al Catálogo
					</a>
					<a
						href="/login"
						className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
					>
						Iniciar Sesión
					</a>
				</div>
				<button
					className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
				>
					Iniciar sesión
				</button>
			</div>
		);
}

export default Page;
/** 
 * 
import Home from "./pages/home";
import CatalogPage from "./catalog/";
import Login from "./pages/Login";

function Page() {
   return (
	   <BrowserRouter>
	   <Routes>
	   {/* Ruta pública *}
	   <Route path="/" element={<Home />} />
	   <Route path="/login" element={<Login />} />
	   
	   {/* Rutas protegidas *}
	   <Route element={<ProtectedRoute />}>
				   <Route path="/catalog" element={<CatalogPagea />} />
			   </Route>
		   </Routes>
		   </BrowserRouter>
	   );
   }
   */