import Image from 'next/image';

const products = [
    {
      id: 1,
      name: "Cubre Mochila Rojo",
      image: "/images/rojo.jpeg",
      price: "$9.990",
      description: "Resistente al agua, ideal para días lluviosos."
    },
    {
      id: 2,
      name: "Cubre Mochila Azul",
      image: "/images/azul.jpeg",
      price: "$10.990",
      description: "Material reflectante para mayor seguridad."
    },
    {
      id: 3,
      name: "Cubre Mochila verde",
      image: "/images/verde.jpeg",
      price: "$7.990",
      description: "Resistente al fuego, ideal para el infierno."
    }
  ];
  
  export default function CatalogPage() {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6 text-green-700 text-center">Catálogo Cubre Mochilas</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-2xl overflow-hidden"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={200}
                className="w-full h-80 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-orange-700">{product.name}</h2>
                <p className="text-gray-700">{product.description}</p>
                <p className="text-gray-600 font-bold mt-2">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  