'use client';
import React, { useEffect, useState } from "react";

const initialState = {
  name: "",
  email: "",
  password: "",
  rut: "",
  role: "seller",
  company_id: "",
  store_id: ""
};

export default function FormNewUser({
  open,
  onClose,
  onCreate,
  onEdit,
  userToEdit = null,
  companies = [],
  stores = [],
  companyId = null
}) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (open) {
      if (userToEdit) {
        setForm({
          ...userToEdit,
          password: "",
          store_id: userToEdit.store_id?.toString() || "",
          company_id: userToEdit.company_id?.toString() || ""
        });
      } else {
        setForm(initialState);
      }
    }
  }, [open, userToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name: form.name,
      email: form.email,
      rut: form.rut,
      role: form.role,
      company_id: companyId || (form.role === 'admin' ? Number(form.company_id) : undefined),
      store_id: form.role === 'seller' ? Number(form.store_id) : undefined
    };
    console.log("Datos enviados al backend:", userData);

    // Solo incluir contraseña si fue escrita o es un nuevo usuario
    if (!userToEdit || form.password?.trim() !== "") {
      userData.password = form.password;
    }

    if (userToEdit) {
      onEdit(userData);
    } else {
      onCreate(userData);
    }

    setForm(initialState);
    onClose();
  };

  if (!open) return null;

  // Filtrar tiendas según el companyId (obligatorio en rol seller)
  const filteredStores = companyId
    ? stores.filter(store => store.company_id === Number(companyId))
    : stores;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-40 z-50">
      <div className="bg-white text-black p-8 rounded-lg min-w-[350px] shadow-lg">
        <h2 className="text-xl font-bold mb-4">{userToEdit ? 'Editar Usuario' : 'Agregar Usuario'}</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Nombre:
            <input name="name" value={form.name} onChange={handleChange} required className="block w-full border rounded px-2 py-1 mt-1" />
          </label>
          <label className="block mb-2">
            Email:
            <input name="email" type="email" value={form.email} onChange={handleChange} required className="block w-full border rounded px-2 py-1 mt-1" />
          </label>
          <label className="block mb-2">
            Contraseña:
            <input name="password" type="password" value={form.password} onChange={handleChange} required={!userToEdit} minLength={6} className="block w-full border rounded px-2 py-1 mt-1" />
          </label>
          <label className="block mb-2">
            RUT:
            <input name="rut" value={form.rut} onChange={handleChange} required className="block w-full border rounded px-2 py-1 mt-1" />
          </label>
          <label className="block mb-2">
            Rol:
            <select name="role" value={form.role} onChange={handleChange} required className="block w-full border rounded px-2 py-1 mt-1">
              <option value="admin">Admin</option>
              <option value="seller">Seller</option>
            </select>
          </label>

          {/* Mostrar selección de empresa solo si no viene desde sesión y es admin */}
          {!companyId && form.role === 'admin' && (
            <label className="block mb-2">
              Empresa:
              <select name="company_id" value={form.company_id} onChange={handleChange} required className="block w-full border rounded px-2 py-1 mt-1">
                <option value="">Seleccione una empresa</option>
                {companies.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </label>
          )}

          {/* Mostrar tiendas solo si es seller */}
          {form.role === 'seller' && (
            <label className="block mb-4">
              Tienda:
              <select name="store_id" value={form.store_id} onChange={handleChange} required className="block w-full border rounded px-2 py-1 mt-1">
                <option value="">Seleccione una tienda</option>
                {filteredStores.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </label>
          )}

          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              {userToEdit ? 'Actualizar Usuario' : 'Crear Usuario'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// 'use client';
// import React, { useEffect, useState } from "react";

// const initialState = {
//     name: "",
//     email: "",
//     password: "",
//     rut: "",
//     role: "seller",
//     company_id: "",
//     store_id: ""
// };

// export default function FormNewUser({ open, onClose, onCreate, onEdit, userToEdit = null, companies = [], stores = [], companyId = null }) {
//     const [form, setForm] = useState(initialState);

//     const filteredStores = companyId
//         ? stores.filter(store => store.company_id === Number(companyId))
//         : stores;

//     useEffect(() => {
//         if (open) {
//             if (userToEdit) {
//                 setForm({
//                     ...userToEdit,
//                     password: "",
//                     store_id: userToEdit.store_id?.toString() || "",
//                     company_id: userToEdit.company_id?.toString() || ""
//                 });
//             } else {
//                 setForm(initialState);
//             }
//         }
//     }, [open, userToEdit]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setForm(prev => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const userData = {
//             name: form.name,
//             email: form.email,
//             password: form.password,
//             rut: form.rut,
//             role: form.role,
//             company_id: companyId ? Number(companyId) : (form.role === 'admin' ? Number(form.company_id) : undefined),
//             store_id: form.role === 'seller' ? Number(form.store_id) : undefined
//         };

//         if (form.password && form.password.trim() !== "") {
//             userData.password = form.password;
//         }

//         if (userToEdit) {
//             onEdit(userData);
//         } else {
//             onCreate(userData);
//         }

//         setForm(initialState);
//         onClose();
//     };

//     if (!open) return null;

//     return (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-40 z-50">
//             <div className="bg-white text-black p-8 rounded-lg min-w-[350px] shadow-lg">
//                 <h2 className="text-xl font-bold mb-4">{userToEdit ? 'Editar Usuario' : 'Agregar Usuario'}</h2>
//                 <form onSubmit={handleSubmit}>
//                     <label className="block mb-2">
//                         Nombre:
//                         <input name="name" value={form.name} onChange={handleChange} required className="block w-full border rounded px-2 py-1 mt-1" />
//                     </label>
//                     <label className="block mb-2">
//                         Email:
//                         <input name="email" type="email" value={form.email} onChange={handleChange} required className="block w-full border rounded px-2 py-1 mt-1" />
//                     </label>
//                     <label className="block mb-2">
//                         Contraseña:
//                         <input name="password" type="password" value={form.password} onChange={handleChange} required={!userToEdit} minLength={6} className="block w-full border rounded px-2 py-1 mt-1" />
//                     </label>
//                     <label className="block mb-2">
//                         RUT:
//                         <input name="rut" value={form.rut} onChange={handleChange} required className="block w-full border rounded px-2 py-1 mt-1" />
//                     </label>
//                     <label className="block mb-2">
//                         Rol:
//                         <select name="role" value={form.role} onChange={handleChange} required className="block w-full border rounded px-2 py-1 mt-1">
//                             <option value="admin">Admin</option>
//                             <option value="seller">Seller</option>
//                         </select>
//                     </label>

//                     {!companyId && form.role === 'admin' && (
//                         <label className="block mb-2">
//                             Empresa:
//                             <select name="company_id" value={form.company_id} onChange={handleChange} required className="block w-full border rounded px-2 py-1 mt-1">
//                                 <option value="">Seleccione una empresa</option>
//                                 {companies.map((c) => (
//                                     <option key={c.id} value={c.id}>{c.name}</option>
//                                 ))}
//                             </select>
//                         </label>
//                     )}

//                     {form.role === 'seller' && (
//                         <label className="block mb-4">
//                             Tienda:
//                             <select name="store_id" value={form.store_id} onChange={handleChange} required className="block w-full border rounded px-2 py-1 mt-1">
//                                 <option value="">Seleccione una tienda</option>
//                                 {filteredStores.map((s) => (
//                                     <option key={s.id} value={s.id}>{s.name}</option>
//                                 ))}
//                             </select>
//                         </label>
//                     )}

//                     <div className="flex justify-end">
//                         <button type="button" onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancelar</button>
//                         <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
//                             {userToEdit ? 'Actualizar Usuario' : 'Crear Usuario'}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }
