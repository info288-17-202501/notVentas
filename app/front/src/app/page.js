"use client";
import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import Navbar from "./components/layout/navbar";
import Footer from "./components/layout/footer";
import Banner from "./components/ui/banner";

function Page(){
		return (
			<>
				<Navbar />
				<Banner />
				<Footer />
			</>
		);
}

export default Page;
/** 
 * 
import Home from "./pages/home";
import CatalogPage from "./catalog/";
import Login from "./pages/Login";
import Navbar from "./components/ui/navbar";

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