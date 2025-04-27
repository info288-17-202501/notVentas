import express from 'express';
import {getSales, createSale, updateSale, deleteSale} from '../controllers/sales.function.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const sales = await getSales();
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching sales' });
    }
}); 

router.post('/', async (req, res) => {
    try {
        const newSale = await createSale(req.body);
        res.status(201).json(newSale);
    } catch (error) {
        res.status(500).json({ error: 'Error creating sale' });
    }
});

router.put('/', async (req, res) => {
    try {
        const updatedSale = await updateSale(req.body);
        res.status(200).json(updatedSale);
    } catch (error) {
        res.status(500).json({ error: 'Error updating sale' });
    }
});

router.delete('/', async (req, res) => {
    try {
        const deletedSale = await deleteSale(req.body);
        res.status(200).json(deletedSale);
    } catch (error) {
        res.status(500).json({ error: 'Error deleting sale' });
    }
});


export default router;