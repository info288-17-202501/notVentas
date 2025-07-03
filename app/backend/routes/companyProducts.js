import express from 'express';
import {addProductToCompany, removeProductFromCompany, getCompanyProducts} from '../controllers/companyProducts.function.js';

const router = express.Router();

// Agregar producto a una compañía
router.post('/', async (req, res) => {
  try {
    const result = await addProductToCompany(req.body);
    res.status(201).json({ message: "Product added to company", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener productos de una compañía
router.get('/:company_id', async (req, res) => {
  try {
    const company_id = parseInt(req.params.company_id);
    const products = await getCompanyProducts(company_id);
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar producto de una compañía
router.delete('/delete', async (req, res) => {
  try {
    const deleted = await removeProductFromCompany(req.body);
    res.status(200).json({ message: 'Product removed from company', deleted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
