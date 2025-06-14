import { Router } from 'express';

import { registerUser } from '../controllers/userController.js';

const router = Router();

// Route to create a new user
router.post('/', async (req, res) => {
    try{
         const newUser = await registerUser(req.body);
         res.status(201).json({ message: 'User created successfully', user: newUser });
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: error.message || 'Internal server error' });
    }    
})


export default router;