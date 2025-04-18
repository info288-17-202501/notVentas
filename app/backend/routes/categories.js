import express from 'express'
import { createCategory, deleteCategory, getCategories } from '../models/category.function.js'


const router = express.Router();

// Crear categoria
router.post('/create-category', async (req, res) => {
    try{
        const newCategory = await createCategory(req.body);
        res.status(201).json({message: 'Category created successfull',newCategory});
    }catch (error){
        res.status(500).json({ error: error.message || 'Error to create a category' });
    }
})

router.get('/categories', async (req, res) =>{
    try{
        const categories = await getCategories();
        res.status(201).json({categories});
    }catch(error){
        res.status(500).json({error: "Error obtaining categories" || error.message})
    }
})

router.delete('/delete-category', async (req, res) =>{
    try{
        const delCategory = await deleteCategory(req.body);
        res.status(200).json({message: 'Category Deleted successfull'});
    }catch(error){
        res.status(500).json({error: error.message || 'Error to delete this category'});
    }
})

export default router;
