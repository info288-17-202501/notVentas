import express from 'express';
import { addProductToStore, updateProductInStore, getStoreProducts, deleteStoreProduct } from '../controllers/storeProducts.function.js';

const router = express.Router();

// Agregar producto a tienda
router.post('/', async (req, res) => {
    try {
        const storeProduct = await addProductToStore(req.body);
        res.status(201).json({ message: "Product added to store", storeProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar cantidad de producto en tienda
router.put('/', async (req, res) => {
    try {
        const updated = await updateProductInStore(req.body);
        res.status(200).json({ message: "Store product updated", updated });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener productos de una tienda
router.get('/:store_id', async (req, res) => {
    try {
        const store_id = parseInt(req.params.store_id);
        const products = await getStoreProducts(store_id);
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar producto de tienda
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await deleteStoreProduct(req.body);
        res.status(200).json({ message: "Product deleted from store", deleted });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
