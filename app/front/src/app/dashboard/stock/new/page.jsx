'use client';
import { useState } from "react";

export default function NewProductPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    is_active: true,
    category_id: "",
    color_id: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        alert("Producto creado exitosamente");
        setFormData({
          name: "",
          description: "",
          price: "",
          is_active: true,
          category_id: "",
          color_id: "",
          image: null,
        });
      } else {
        alert("Error al crear el producto");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Nuevo Producto</h1>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div>
          <label className="block font-medium">Nombre</label>
          <input
            type="text"
            name="name"
            className="w-full border rounded p-2"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Descripción</label>
          <textarea
            name="description"
            className="w-full border rounded p-2"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div>
          <label className="block font-medium">Precio</label>
          <input
            type="number"
            name="price"
            className="w-full border rounded p-2"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="is_active"
            checked={formData.is_active}
            onChange={handleChange}
          />
          <label>Activo</label>
        </div>

        <div>
          <label className="block font-medium">Categoría</label>
          <select
            name="category_id"
            className="w-full border rounded p-2"
            value={formData.category_id}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una categoría</option>
            <option value="1">Electrónica</option>
            <option value="2">Ropa</option>
            {/* Más opciones según tu sistema */}
          </select>
        </div>

        <div>
          <label className="block font-medium">Color</label>
          <select
            name="color_id"
            className="w-full border rounded p-2"
            value={formData.color_id}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un color</option>
            <option value="1">Rojo</option>
            <option value="2">Azul</option>
            {/* Más opciones según tu sistema */}
          </select>
        </div>

        <div>
          <label className="block font-medium">Imagen</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="w-full"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Crear Producto
        </button>
      </form>
    </div>
  );
}
