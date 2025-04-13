require('dotenv').config()
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/',(req, res) => {
    res.send(`
        <h1>Developing NotVentas API</h1>    
        <h3>Hola</h3>
    `);
});

app.listen(PORT, () => {
    console.log(`app run in port: ${PORT}`);

});