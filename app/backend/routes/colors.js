import express, { json } from 'express'
import {createColor, getColor} from '../controllers/color.function.js'

const router = express.Router();

router.post('/', async (req, res) =>{
    try{
        const newColor = await createColor(req.body);
        res.status(201).json({message: "Color Created", newColor})
    }catch(error){
        res.status(500).json({error: error.message || 'Error to create Color'})
    }
})

router.get('/', async (req, res) => {
    try{
        const colors = await getColor();
        res.status(201).json({colors})
    }catch(error){
        res.status(500).json({error: error.message || 'Error to get Color'})
    }
})

export default router;