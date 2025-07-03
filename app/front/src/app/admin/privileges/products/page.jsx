'use client';
import React, { useEffect, useState } from 'react';
import ProductCard from '../../../../components/ProductCard1';
import FormNewProduct from '../../../../components/ui/FormNewProduct';
import {createProduct} from '../../../../api/product'
import { getProducts } from '../../../../api/product';  
import { createCategory, getCategories} from '../../../../api/category'
import { createBrand, getBrands } from '../../../../api/brand';

const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    marginTop: '24px',
    borderRadius: '8px',
    overflow: 'hidden'
};

const thStyle = {
    color: '#fff',
    padding: '12px',
    textAlign: 'left',
    fontWeight: 'bold',
    borderBottom: '2px solid #1565c0'
};

const tdStyle = {
    padding: '10px 12px',
    borderBottom: '1px solid #e0e0e0',
    background: '#fff'
};

const trHoverStyle = {
    background: '#e3f2fd'
};

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
    const fetchProducts = async () => {
        try {
            const companyId = JSON.parse(localStorage.getItem('user'))?.company_id;
            const productsData = await getProducts(companyId);
            setProducts(Array.isArray(productsData) ? productsData : []);
        } catch (error) {
            setProducts([]);
            console.error('Error al obtener productos:', error);
        } finally {
            setLoading(false);
        }
    };
    fetchProducts();
}, []);


    const handleCreateProduct = async (productData) => {
        console.log("Enviando producto:", productData);
        try {
            const response = await createProduct(productData);
            setProducts(prev => [...prev, response]);
            console.log('Producto creado:', response);
        } catch (error) {
            console.error('Error al crear producto:', error);

        }
    };

    if (loading) return <div>Cargando productos...</div>;

    return (
        <div>
            <h1>Lista de Productos</h1>
            <div className="flex justify-end gap-3">
                <button 
                    className="flex items-center justify-center bg-green-500 text-white w-10 h-10 rounded-full shadow hover:bg-green-600 transition"
                    onClick={() => setShowForm(true)}
                >
                    <span className="text-2xl font-bold">+</span>
                </button>
                <button className="flex items-center justify-center bg-red-500 text-white w-10 h-10 rounded-full shadow hover:bg-red-600 transition">
                    <span className="text-xl font-bold">×</span>
                </button>
            </div>
            <div className=" text-black grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            
            <FormNewProduct 
                open={showForm}
                onClose={() => setShowForm(false)}
                onCreate={handleCreateProduct}
            />
        </div>
    );
};

export default ProductList;