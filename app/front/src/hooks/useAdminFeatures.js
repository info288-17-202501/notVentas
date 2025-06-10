import { useState, useEffect } from 'react';

export const useAdminFeatures = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setIsAdmin(user?.role === 'admin');
    }, []);

    const AdminButtons = () => {
        if (!isAdmin) return null;

        return (
            <div className="flex flex-col gap-4 mb-6">
                {/* Botones de Productos */}
                <div className="flex gap-4">
                    <button 
                        onClick={() => setShowAddModal(true)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                    >
                        Agregar Producto
                    </button>
                    <button 
                        onClick={() => setShowDeleteModal(true)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                    >
                        Eliminar Producto
                    </button>
                </div>

                {/* Botones de Usuarios */}
                <div className="flex gap-4">
                    <button 
                        onClick={() => setShowAddUserModal(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                        Agregar Usuario
                    </button>
                    <button 
                        onClick={() => setShowDeleteUserModal(true)}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                    >
                        Eliminar Usuario
                    </button>
                </div>
            </div>
        );
    };

    return {
        isAdmin,
        showAddModal,
        showDeleteModal,
        showAddUserModal,
        showDeleteUserModal,
        setShowAddModal,
        setShowDeleteModal,
        setShowAddUserModal,
        setShowDeleteUserModal,
        AdminButtons
    };
}; 