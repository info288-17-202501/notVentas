require('dotenv').config()
const express = require('express');
const LoggerMiddleware = require('./middleware/logger');
const ErrorHandler = require('./middleware/errorHandler')


const app = express();
app.use(LoggerMiddleware);
app.use(ErrorHandler)
const PORT = process.env.PORT || 3000;




app.get('/error', (req, res, next) => {
    next(new Error('Error intencional'));
})


app.get('/',(req, res) => {
    res.send(`
        <h1>Developing NotVentas API</h1>    
        <h3>Hola</h3>
    `);
});

app.listen(PORT, () => {
    console.log(`app runing in: http://localhost:${PORT}`);

});