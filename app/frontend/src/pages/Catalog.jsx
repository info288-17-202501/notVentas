import ProductCard from '../components/ProductCard';

const productos = [
  { id: 1, nombre: 'Cubre Mochila Azul', precio: 9900, imagen: '/cubre-azul.jpg' },
  { id: 2, nombre: 'Cubre Mochila Rojo', precio: 10900, imagen: '/cubre-rojo.jpg' },
];

function Catalog() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Catálogo</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {productos.map(prod => (
          <ProductCard key={prod.id} producto={prod} />
        ))}
      </div>
    </div>
  );
}

export default Catalog;
