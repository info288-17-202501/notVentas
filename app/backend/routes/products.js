import express from 'express'
import { createProduct, getProducts, updateProduct, deleteProduct } from '../models/product.function.js'


const router = express.Router();

// Crear producto
router.post('/create-product', async (req, res) => {
    try{
        const newProduct = await createProduct(req.body);
        res.status(201).json({message: 'Product created successfull',newProduct});
    }catch (error){
        res.status(500).json({ error: error.message || 'Error to create a product' });
    }
})

// Actualizar producto
router.post('/update-product', async (req, res) => {
    try{
        const upProduct = await updateProduct(req.body);
        res.status(200).json({message: 'Product updated', upProduct});
    }catch(error){
        res.status(500).json({ error: error.message || 'Error to update a product'});
    }
})

// Obtener productos
router.get('/products', async(req, res) => {
    try{
        const products = await getProducts();
        res.status(200).json({products});
    }catch(error){
        res.status(500).json({ error: error.message || 'Error to get products'});
    }
})

// Eliminar producto
router.delete('/delete-product', async (req, res) => {
    try{
        await deleteProduct(req.body);
        res.status(200).json({message: "Product deleted"})
    }catch(error){
        res.status(500).json({error: error.message || 'Error to delete product'});
    }
})

export default router;