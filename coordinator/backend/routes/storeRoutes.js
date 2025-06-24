import { listStores, createStore, updateStateStore, updateStorePosition } from "../controllers/storeController.js";    

import { Router } from "express";

const router = Router();

// Ruta para crear una nueva tienda
router.post("/", async (req, res) => {
    try {
        const storeData = req.body;
        if (!storeData || !storeData.name || !storeData.company_id) {
            return res.status(400).json({ error: "Store data with a name and company_id is required" });
        }
        const newStore = await createStore(storeData);
        res.status(201).json(newStore);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para listar todas las tiendas
router.get("/", async (req, res) => {
    try {
        const stores = await listStores();
        res.status(200).json(stores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ruta para actualizar una tienda como active = true
router.put("/state", async (req, res) => {
    try {
        const store = await updateStateStore(req.body);
        res.status(200).json({ message: "Store state updated successfully", store });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.put("/position", async (req, res) => {
    try {
        const store = await updateStorePosition(req.body);
        res.status(200).json({ message: "Store position updated successfully", store });
    }catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Exportar el router
export default router;
