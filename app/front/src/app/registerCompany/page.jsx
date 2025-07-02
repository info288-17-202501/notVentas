'use client';
import { useState } from 'react';
import { registerCompanyUser } from '../../api/company'; // Adjust the import path as necessary

export default function RegisterCompany() {
    const [formData, setFormData] = useState({
        name: '',
        rut: '',
        address_street: '',
        address_city: '',
        address_state: '',
        address_zip: '',
        user: {
            email: '',
            password: '',
            name: '',
            rut: ''
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('user.')) {
            const key = name.split('.')[1];
            setFormData({
                ...formData,
                user: {
                    ...formData.user,
                    [key]: value
                }
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        registerCompanyUser(formData)
            .then((response) => {
                console.log('Company registered successfully:', response);
                window.location.href = '/login';
            })
            .catch((error) => {
                console.error('Error registering company:', error);
                // Optionally show an error message to the user
                alert('Error registering company: ' + (error.response?.data?.error || 'Unknown error'));
            });
        // redirect to login page after registration
  
        //window.location.href = '/login'; // Uncomment if you want to redirect after registration
        
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Registrar Compañía</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                            Nombre de la Compañía
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="rut" className="block mb-2 text-sm font-medium text-gray-700">
                            RUT de la Compañía
                        </label>
                        <input
                            type="text"
                            id="rut"
                            name="rut"
                            value={formData.rut}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="address_street" className="block mb-2 text-sm font-medium text-gray-700">
                            Calle
                        </label>
                        <input
                            type="text"
                            id="address_street"
                            name="address_street"
                            value={formData.address_street}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="address_city" className="block mb-2 text-sm font-medium text-gray-700">
                            Ciudad
                        </label>
                        <input
                            type="text"
                            id="address_city"
                            name="address_city"
                            value={formData.address_city}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="address_state" className="block mb-2 text-sm font-medium text-gray-700">
                            Región/Estado
                        </label>
                        <input
                            type="text"
                            id="address_state"
                            name="address_state"
                            value={formData.address_state}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="address_zip" className="block mb-2 text-sm font-medium text-gray-700">
                            Código Postal
                        </label>
                        <input
                            type="text"
                            id="address_zip"
                            name="address_zip"
                            value={formData.address_zip}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <hr className="my-6" />
                    <h3 className="mb-4 text-lg font-semibold text-gray-800">Usuario Administrador</h3>
                    <div className="mb-4">
                        <label htmlFor="user.name" className="block mb-2 text-sm font-medium text-gray-700">
                            Nombre de Usuario
                        </label>
                        <input
                            type="text"
                            id="user.name"
                            name="user.name"
                            value={formData.user.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="user.rut" className="block mb-2 text-sm font-medium text-gray-700">
                            RUT de Usuario
                        </label>
                        <input
                            type="text"
                            id="user.rut"
                            name="user.rut"
                            value={formData.user.rut}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="user.email" className="block mb-2 text-sm font-medium text-gray-700">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            id="user.email"
                            name="user.email"
                            value={formData.user.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="user.password" className="block mb-2 text-sm font-medium text-gray-700">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="user.password"
                            name="user.password"
                            value={formData.user.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Registrar
                    </button>
                </form>
            </div>
        </div>
    );
}