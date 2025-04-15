import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


import { PrismaClient } from '../generated/prisma/index.js';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/users', async (req, res) =>{
    try{
        const users = await prisma.user.findMany();
        res.json(users);
    }catch (error){
        res.status(500).json({error: "Error al comunicarse con la base de datos"});
    }
});


// registra usuarios
router.post('/register', async (req, res) => {
    try {
        const { email, password, name, rut, company_id, role_id } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
            data: { email, password: hashedPassword, rut, name, role_id, company_id }
        });
        res.status(201).json({ message: 'User Registered Successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
});

//login de usuario
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ error: 'Error during login' });
    }
});


export default router;