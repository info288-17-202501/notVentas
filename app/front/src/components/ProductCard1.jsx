export default function ProductCard({ product }) {
  return (
    <div className="max-w-sm rounded-2xl shadow-md border p-4 bg-white">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold">{product.name}</h2>
      </div>
      <p className="text-sm text-gray-600 mb-2">{product.description}</p>
      <p className="text-base font-semibold text-gray-800">
        {new Intl.NumberFormat("es-CL", {
          style: "currency",
          currency: "CLP",
        }).format(product.price)}
      </p>
      <p className="text-sm text-gray-500 mb-2">{product.category}</p>
      {/* Mostrar marca */}
      {product.brand && (
        <p className="text-sm text-gray-500 mb-2">Marca: {product.brand.name}</p>
      )}
      {/* Mostrar colores */}
      {product.colors && product.colors.length > 0 && (
        <div className="flex items-center mb-2">
          <span className="text-sm text-gray-500 mr-2">Colores:</span>
          {product.colors.map((color, idx) => (
            <span
              key={idx}
              className="w-4 h-4 rounded-full border mr-1 inline-block"
              title={color.name}
              style={{ backgroundColor: color.code }}
            ></span>
          ))}
        </div>
      )}
      <span
        className={`inline-block px-2 py-1 rounded text-xs font-medium ${
          product.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}
      >
        {product.is_active ? "Disponible" : "Agotado"}
      </span>
    </div>
  );
}
