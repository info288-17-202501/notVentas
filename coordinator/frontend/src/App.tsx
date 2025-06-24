import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Company from "./pages/Companies";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* Ruta pública */}
				<Route path="/" element={<Login />} />
				
				{/* Rutas protegidas */}
				<Route element={<ProtectedRoute />}>
					<Route path="/dashboard" element={<Dashboard />} />				
					<Route path="/empresas" element={<Company />} />	
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;