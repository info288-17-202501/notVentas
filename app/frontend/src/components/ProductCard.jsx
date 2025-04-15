function ProductCard({ producto }) {
    return (
      <div className="border rounded-lg shadow p-4">
        <img src={producto.imagen} alt={producto.nombre} className="w-full h-48 object-cover rounded" />
        <h3 className="font-semibold text-lg mt-2">{producto.nombre}</h3>
        <p className="text-yellow-700 font-bold">${producto.precio}</p>
      </div>
    );
  }
  
  export default ProductCard;
  