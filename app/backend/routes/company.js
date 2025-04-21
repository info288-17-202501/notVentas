import { Router } from 'express';
import { createCompany, getCompanyById, updateCompany, deleteCompany } from '../controllers/company.function.js';

const router = Router();

// Route to create a new company
router.post('/create-company', async (req, res) => {
    try {
        const companyData = req.body;
        const newCompany = await createCompany(companyData);
        res.status(201).json(newCompany);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get a company by ID
router.get('/company/:id', async (req, res) => {
    try {
        const companyId = parseInt(req.params.id, 10);
        const company = await getCompanyById({companyId});
        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }
        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to update a company by ID
router.put('/update-company/:id', async (req, res) => {
    try {
        const companyId = parseInt(req.params.id, 10);
        const updatedData = req.body;
        const updatedCompany = await updateCompany(companyId, updatedData);
        if (!updatedCompany) {
            return res.status(404).json({ error: 'Company not found' });
        }
        res.status(200).json(updatedCompany);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to delete a company by ID
router.delete('/delete-company', async (req, res) => {
    try {
        await deleteCompany(req.body);
        res.status(200).json({ message: 'Company deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message || "Error to delete company" });
    }
});

export default router;