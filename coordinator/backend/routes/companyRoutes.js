import { Router } from 'express';
import { registerCompany, listStoresByCompanyId } from '../controllers/companyController.js';
const router = Router();


// Registra una nueva empresa
router.post('/', async (req, res) => {
  try {
    const companyData = req.body;
    console.log("Received company data:", companyData);
    if (!companyData || !companyData.admin) {
      return res.status(400).json({ error: "Company data with a name and admin is required" });
    }
    const newCompany = await registerCompany(companyData);
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// obtiene las tiendas de una empresa por su ID
router.get('/stores', async (req, res) => {
  try {
    
    const stores = await listStoresByCompanyId(req.body.company_id);
    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//router.post('/node-ping');

export default router;
