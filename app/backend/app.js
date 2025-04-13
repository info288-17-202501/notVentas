require('dotenv').config()

const express = require('express');
const app = express();


const LoggerMiddleware = require('./middleware/logger');
const ErrorHandler = require('./middleware/errorHandler');

const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();

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

// print console route
app.listen(PORT, () => {
    console.log(`app runing in: http://localhost:${PORT}`);

});