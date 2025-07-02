'use client';
import React, { useEffect, useState } from "react";
import { createCategory, getCategories } from "../../api/category";
import { createBrand, getBrands } from "../../api/brand";

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
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        if (open) {
            loadCategories();
            loadBrands();
        }
    }, [open]);

    const loadCategories = async () => {
        try {
            const res = await getCategories();
            setCategories(res.categories || res); // Por compatibilidad
        } catch (e) {
            console.error("Error al cargar categorías", e);
        }
    };

    const loadBrands = async () => {
        try {
            const res = await getBrands();
             console.log("Marcas obtenidas:", res);
            setBrands(res.brands || res); // Por compatibilidad
        } catch (e) {
            console.error("Error al cargar marcas", e);
        }
    };

    const handleAddCategory = async () => {
        const name = prompt("Nombre de la nueva categoría:");
        if (!name) return;
        try {
            await createCategory({ name });
            await loadCategories();
        } catch (e) {
            alert("Error al crear categoría: " + e.message);
        }
    };

    const handleAddBrand = async () => {
        const name = prompt("Nombre de la nueva marca:");
        if (!name) return;
        try {
            await createBrand({ name });
            await loadBrands();
        } catch (e) {
            alert("Error al crear marca: " + e.message);
        }
    };

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
        const selectedCategory = categories.find(c => c.id == form.category_id);
        const selectedBrand = brands.find(b => b.id == form.brand_id);
        const productData = {
            name: form.name,
            description: form.description,
            price: Number(form.price), // asegúrate de que sea número
            is_active: form.is_active,
            category: { name: selectedCategory?.name },
            brand: { name: selectedBrand?.name },
            colors: form.colors
    };

    onCreate(productData);
    setForm(initialState);
    onClose();
    };
    //     onCreate({
    //         ...form,
    //         category_id: Number(form.category_id),
    //         brand_id: Number(form.brand_id),
    //         price: Number(form.price),
    //     });

    //     setForm(initialState);
    //     onClose();
    // };

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

                    <div className="mb-2">
                        <label>Categoría:</label>
                        <div className="flex gap-2 items-center">
                            <select
                                name="category_id"
                                value={form.category_id}
                                onChange={handleChange}
                                required
                                className="block w-full border rounded px-2 py-1 mt-1"
                            >
                                <option value="">Seleccione una categoría</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            <button
                                type="button"
                                onClick={handleAddCategory}
                                className="text-sm text-blue-600 hover:underline"
                            >
                                + Nueva
                            </button>
                        </div>
                    </div>

                    <div className="mb-2">
                        <label>Marca:</label>
                        <div className="flex gap-2 items-center">
                            <select
                                name="brand_id"
                                value={form.brand_id}
                                onChange={handleChange}
                                required
                                className="block w-full border rounded px-2 py-1 mt-1"
                            >
                                <option value="">Seleccione una marca</option>
                                {brands.map((brand) => (
                                    <option key={brand.id} value={brand.id}>
                                        {brand.name}
                                    </option>
                                ))}
                            </select>
                            <button
                                type="button"
                                onClick={handleAddBrand}
                                className="text-sm text-blue-600 hover:underline"
                            >
                                + Nueva
                            </button>
                        </div>
                    </div>

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



// import React, { useState } from "react";

// const initialState = {
//     name: "",
//     description: "",
//     price: "",
//     is_active: true,
//     category_id: "",
//     brand_id: "",
//     colors: [{ name: "", code: "" }],
// };

// export default function FormNewProduct({ open, onClose, onCreate }) {
//     const [form, setForm] = useState(initialState);

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setForm((prev) => ({
//             ...prev,
//             [name]: type === "checkbox" ? checked : value,
//         }));
//     };

//     const handleColorChange = (idx, field, value) => {
//         setForm((prev) => {
//             const colors = [...prev.colors];
//             colors[idx][field] = value;
//             return { ...prev, colors };
//         });
//     };

//     const addColor = () => {
//         setForm((prev) => ({
//             ...prev,
//             colors: [...prev.colors, { name: "", code: "" }],
//         }));
//     };

//     const removeColor = (idx) => {
//         setForm((prev) => ({
//             ...prev,
//             colors: prev.colors.filter((_, i) => i !== idx),
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         onCreate(form);
//         setForm(initialState);
//         onClose();
//     };

//     if (!open) return null;

//     return (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-40 z-50">
//             <div className="bg-white text-black p-8 rounded-lg min-w-[350px] shadow-lg">
//                 <h2 className="text-xl font-bold mb-4">Agregar Producto</h2>
//                 <form onSubmit={handleSubmit}>
//                     <label className="block mb-2">
//                         Nombre:
//                         <input
//                             name="name"
//                             value={form.name}
//                             onChange={handleChange}
//                             required
//                             className="block w-full border rounded px-2 py-1 mt-1"
//                         />
//                     </label>
//                     <label className="block mb-2">
//                         Descripción:
//                         <input
//                             name="description"
//                             value={form.description}
//                             onChange={handleChange}
//                             required
//                             className="block w-full border rounded px-2 py-1 mt-1"
//                         />
//                     </label>
//                     <label className="block mb-2">
//                         Precio:
//                         <input
//                             name="price"
//                             type="number"
//                             value={form.price}
//                             onChange={handleChange}
//                             required
//                             min={0}
//                             className="block w-full border rounded px-2 py-1 mt-1"
//                         />
//                     </label>
//                     <label className="flex items-center mb-2">
//                         Activo:
//                         <input
//                             name="is_active"
//                             type="checkbox"
//                             checked={form.is_active}
//                             onChange={handleChange}
//                             className="ml-2"
//                         />
//                     </label>
//                     <label className="block mb-2">
//                         ID Categoría:
//                         <input
//                             name="category_id"
//                             type="number"
//                             value={form.category_id}
//                             onChange={handleChange}
//                             required
//                             min={1}
//                             className="block w-full border rounded px-2 py-1 mt-1"
//                         />
//                     </label>
//                     <label className="block mb-2">
//                         ID Marca:
//                         <input
//                             name="brand_id"
//                             type="number"
//                             value={form.brand_id}
//                             onChange={handleChange}
//                             required
//                             min={1}
//                             className="block w-full border rounded px-2 py-1 mt-1"
//                         />
//                     </label>
//                     <div className="mb-4">
//                         <label className="block font-medium mb-1">Colores:</label>
//                         {form.colors.map((color, idx) => (
//                             <div key={idx} className="flex items-center mb-2">
//                                 <input
//                                     placeholder="Nombre"
//                                     value={color.name}
//                                     onChange={(e) =>
//                                         handleColorChange(idx, "name", e.target.value)
//                                     }
//                                     required
//                                     className="border rounded px-2 py-1 mr-2"
//                                 />
//                                 <input
//                                     type="color"
//                                     value={color.code}
//                                     onChange={(e) =>
//                                         handleColorChange(idx, "code", e.target.value)
//                                     }
//                                     required
//                                     className="mr-2"
//                                 />
//                                 {form.colors.length > 1 && (
//                                     <button
//                                         type="button"
//                                         onClick={() => removeColor(idx)}
//                                         className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//                                     >
//                                         Quitar
//                                     </button>
//                                 )}
//                             </div>
//                         ))}
//                         <button
//                             type="button"
//                             onClick={addColor}
//                             className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
//                         >
//                             + Agregar Color
//                         </button>
//                     </div>
//                     <div className="flex justify-end">
//                         <button
//                             type="button"
//                             onClick={onClose}
//                             className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//                         >
//                             Cancelar
//                         </button>
//                         <button
//                             type="submit"
//                             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                         >
//                             Crear Producto
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }
