import express from 'express';
import {getSales, createSale, updateSale, deleteSal, getSaleById} from '../controllers/sales.function.js';

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
        res.status(500).json({ error: 'Error creating sale' || error });
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

router.get('/:id', async (req, res) => {
    try {
        const sale = await getSaleById(req.params.id);
        if (!sale) {
            return res.status(404).json({ error: 'Sale not found' });
        }
        res.status(200).json(sale);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching sale by id' });
    }
});

export default router;