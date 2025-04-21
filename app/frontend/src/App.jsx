import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/routes/ProtectedRoute";

import Home from "./pages/home";
import Catalog from "./pages/Catalog";
import Login from "./pages/Login";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* Ruta pública */}
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />

				{/* Rutas protegidas */}
				<Route element={<ProtectedRoute />}>
					<Route path="/catalog" element={<Catalog />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;