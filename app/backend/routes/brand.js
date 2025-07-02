import express from 'express';
import { createBrand, deleteBrand, getBrands, updateBrand } from '../controllers/brand.function.js';

const router = express.Router();

// Crear marca
router.post('/', async (req, res) => {
    try {
        console.log("Nueva marca: ", req.body);
        const newBrand = await createBrand(req.body);
        res.status(201).json({ message: 'Brand created successfully', newBrand });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Error to create a brand' });
    }
});

// Obtener todas las marcas
router.get('/', async (req, res) => {
    try {
        const brands = await getBrands();
        res.status(200).json({ brands });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Error obtaining brands' });
    }
});

// Eliminar marca
router.delete('/', async (req, res) => {
    try {
        const delBrand = await deleteBrand(req.body);
        res.status(200).json({ message: 'Brand deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Error to delete this brand' });
    }
});

// Actualizar marca
router.put('/', async (req, res) => {
    try {
        const upBrand = await updateBrand(req.body);
        res.status(200).json({ message: 'Brand updated', upBrand });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Error to update this brand' });
    }
});

export default router;
