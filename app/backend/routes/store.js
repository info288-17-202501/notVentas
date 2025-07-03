import express from 'express';

import { getStores, createStore, updateStore, deleteStore } from '../controllers/store.function.js';
import { getStoresByCompany } from '../controllers/store.function.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const stores = await getStores();
        res.status(200).json(stores);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching stores' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const companyId = parseInt(req.params.id);
        const stores = await getStoresByCompany(companyId);
        res.status(200).json(stores);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Error fetching stores by company' });
    }
});


router.post('/', async (req, res) => {
    try {
        const newStore = await createStore(req.body);
        res.status(201).json(newStore);
    } catch (error) {
        res.status(500).json({ error: 'Error creating store' });
    }
});

router.put('/', async (req, res) => {
    try {
        const updatedStore = await updateStore(req.body);
        res.status(200).json(updatedStore);
    } catch (error) {
        res.status(500).json({ error: 'Error updating store' });
    }
});


router.delete('/', async (req, res) => {
    try {
        const deletedStore = await deleteStore(req.body);
        res.status(200).json(deletedStore);
    } catch (error) {
        res.status(500).json({ error: 'Error deleting store' });
    }
});

export default router;
