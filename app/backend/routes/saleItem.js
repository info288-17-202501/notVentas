import express from 'express';
import { addSaleItem, getSaleItems, deleteSaleItem } from '../controllers/saleItem.function.js';

const router = express.Router();

router.post('/add-sale-item', async (req, res) => {
    try {
        const saleItem = await addSaleItem(req.body);
        res.status(201).json({ message: "Sale item added", saleItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/sale-items/:sale_id', async (req, res) => {
    try {
        const items = await getSaleItems(Number(req.params.sale_id));
        res.status(200).json({ items });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/delete-sale-item', async (req, res) => {
    try {
        const deleted = await deleteSaleItem(req.body);
        res.status(200).json({ message: "Sale item deleted", deleted });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
