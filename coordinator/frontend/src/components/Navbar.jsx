
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-yellow-400 p-4 flex justify-between">
      <h1 className="font-bold text-xl">NotVentas</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Inicio</Link>
        <Link to="/catalog" className="hover:underline">Catálogo</Link>
      </div>
    </nav>
  );
}

export default Navbar;
