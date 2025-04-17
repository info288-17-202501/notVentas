import express from 'express'
import { createProduct } from '../models/product.function.js'


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

export default router;