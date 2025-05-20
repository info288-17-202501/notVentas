import express from 'express';
import {login, createUser} from '../controllers/user.function.js';
import { createSessionToken } from '../middleware/auth.js';
const router = express.Router();

//router.post('/login', loginUserController);

//login de usuario
router.post('/login', async (req, res) => {
    try {
        const user = await login(req.body);
        const token = await createSessionToken(user);
        res.status(200).json({ message: 'Login successful', user, token });
    } catch (error) {        
        res.status(401).json({ error: error.message || 'Error logging in' });
    }
});

// registra usuarios
router.post('/register', async (req, res) => {
    try {
        const newUser = await createUser(req.body);
        const { password, ...userWithoutPassword } = newUser;
        res.status(201).json({ message: 'User Registered Successfully', user: userWithoutPassword });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Error registering user' });
    }
});

export default router;