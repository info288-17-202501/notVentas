import Navbar from '../components/layout/navbar';
import ProductCard from '../components/ui/productCard';

const products = [
  {
    id: 1,
    name: "Cubre Mochila Rojo",
    image: "/images/cubremochilas/azulRosa.jpeg",
    price: "$9.990",
    description: "Resistente al agua, ideal para días lluviosos."
  },
  {
    id: 2,
    name: "Cubre Mochila Azul",
    image: "/images/cubremochilas/moradoNaranjo.jpeg",
    price: "$10.990",
    description: "Material reflectante para mayor seguridad."
  },
  {
    id: 3,
    name: "Cubre Mochila verde",
    image: "/images/cubremochilas/queNoSeTeMoje.jpeg",
    price: "$7.990",
    description: "Resistente al fuego, ideal para el infierno."
  }
];

export default function CatalogPage() {
  return (
    <div className="p-8">
      <Navbar />
      <h1 className="text-3xl font-bold mb-6 text-green-700 text-center">Catálogo Cubre Mochilas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
