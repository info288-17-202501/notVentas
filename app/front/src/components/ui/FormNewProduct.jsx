import React, { useState } from "react";

const initialState = {
    name: "",
    description: "",
    price: "",
    is_active: true,
    category_id: "",
    brand_id: "",
    colors: [{ name: "", code: "" }],
};

export default function FormNewProduct({ open, onClose, onCreate }) {
    const [form, setForm] = useState(initialState);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleColorChange = (idx, field, value) => {
        setForm((prev) => {
            const colors = [...prev.colors];
            colors[idx][field] = value;
            return { ...prev, colors };
        });
    };

    const addColor = () => {
        setForm((prev) => ({
            ...prev,
            colors: [...prev.colors, { name: "", code: "" }],
        }));
    };

    const removeColor = (idx) => {
        setForm((prev) => ({
            ...prev,
            colors: prev.colors.filter((_, i) => i !== idx),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate(form);
        setForm(initialState);
        onClose();
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-40 z-50">
            <div className="bg-white text-black p-8 rounded-lg min-w-[350px] shadow-lg">
                <h2 className="text-xl font-bold mb-4">Agregar Producto</h2>
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2">
                        Nombre:
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="block w-full border rounded px-2 py-1 mt-1"
                        />
                    </label>
                    <label className="block mb-2">
                        Descripción:
                        <input
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            required
                            className="block w-full border rounded px-2 py-1 mt-1"
                        />
                    </label>
                    <label className="block mb-2">
                        Precio:
                        <input
                            name="price"
                            type="number"
                            value={form.price}
                            onChange={handleChange}
                            required
                            min={0}
                            className="block w-full border rounded px-2 py-1 mt-1"
                        />
                    </label>
                    <label className="flex items-center mb-2">
                        Activo:
                        <input
                            name="is_active"
                            type="checkbox"
                            checked={form.is_active}
                            onChange={handleChange}
                            className="ml-2"
                        />
                    </label>
                    <label className="block mb-2">
                        ID Categoría:
                        <input
                            name="category_id"
                            type="number"
                            value={form.category_id}
                            onChange={handleChange}
                            required
                            min={1}
                            className="block w-full border rounded px-2 py-1 mt-1"
                        />
                    </label>
                    <label className="block mb-2">
                        ID Marca:
                        <input
                            name="brand_id"
                            type="number"
                            value={form.brand_id}
                            onChange={handleChange}
                            required
                            min={1}
                            className="block w-full border rounded px-2 py-1 mt-1"
                        />
                    </label>
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Colores:</label>
                        {form.colors.map((color, idx) => (
                            <div key={idx} className="flex items-center mb-2">
                                <input
                                    placeholder="Nombre"
                                    value={color.name}
                                    onChange={(e) =>
                                        handleColorChange(idx, "name", e.target.value)
                                    }
                                    required
                                    className="border rounded px-2 py-1 mr-2"
                                />
                                <input
                                    type="color"
                                    value={color.code}
                                    onChange={(e) =>
                                        handleColorChange(idx, "code", e.target.value)
                                    }
                                    required
                                    className="mr-2"
                                />
                                {form.colors.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeColor(idx)}
                                        className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Quitar
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addColor}
                            className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                        >
                            + Agregar Color
                        </button>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Crear Producto
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
