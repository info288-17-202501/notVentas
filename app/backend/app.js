require('dotenv').config()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const express = require('express');
const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies


const LoggerMiddleware = require('./middleware/logger');
const ErrorHandler = require('./middleware/errorHandler');

const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();

const authenticateToken = require('./middleware/auth')


app.get('/protected-route', authenticateToken, (req, res) =>{
    res.send('Esta es una ruta protegida');
})

app.use(LoggerMiddleware);
app.use(ErrorHandler)
const PORT = process.env.PORT || 3000;




app.get('/error', (req, res, next) => {
    next(new Error('Error intencional'));
})


// base route
app.get('/',(req, res) => {
    res.send(`
        <h1>Developing NotVentas API</h1>    
        <h3>Hola</h3>
    `);
});

// get user from DB
app.get('/users', async (req, res) => {
    try{
        const users = await prisma.user.findMany();
        res.json(users);
    }catch (error){
        res
        .status(500)
        .json({error: "Error al comunicarse con la base de datos"});
    }
});


// registra usuarios
app.post('/register', async (req, res) => {
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

// print console route
app.listen(PORT, () => {
    console.log(`app runing in: http://localhost:${PORT}`);

});


