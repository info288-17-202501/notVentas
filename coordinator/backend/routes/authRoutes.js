import { Router } from 'express';
import { loginUser } from '../controllers/authController.js';
import { createSessionToken } from '../middlewares/auth.js';

const router = Router();

// login de usuario
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await loginUser({ email, password });
        const token = await createSessionToken(user);
        res.status(200).json({ message: 'Login successful', user, token });
    } catch (error) {        
        res.status(401).json({ error: error.message || 'Error logging in' });
    }
});

export default router;