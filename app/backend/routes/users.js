import express from 'express';
import {createUser, deleteUser, getUsers, login} from '../models/user.function.js'
import {createSessionToken} from '../middleware/auth.js'

const router = express.Router();

//obtiene usuarios sin las contraseñas
router.get('/users', async (req, res) =>{
    try{
        const users = await getUsers();
        res.send(users)
    }catch (error){
        res.status(500).json({error: "Error al comunicarse con la base de datos"});
    }
});

// registra usuarios
router.post('/register', async (req, res) => {
    try {
        const newUser = await createUser(req.body);
        if (newUser) {
            // crear token y retornar
            res.status(201).json({ message: 'User Registered Successfully', user: newUser });
        } else {
            res.status(400).json({ error: 'Failed to create user' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
});

// elimina usuario
router.post('/delete-user', async (req, res) => {
    try{
        const updateUser = await deleteUser(req.body);
        res.status(201).json({message: "User deleted correctly"});
    } catch(error){
        res.status(500).json({error: error.message});
    }
});


//login de usuario
router.post('/login', async (req, res) => {
    try {
        const user = await login(req.body);
        const token = await createSessionToken(user);
        res.status(200).json({ message: 'Login successful', user, token });
    } catch (error) {        
        res.status(500).json({ error: error.message});
    }
});


export default router;