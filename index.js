
const express = require('express');
const { manejarChatConFunciones } = require('./services/chatHandler');
require('dotenv').config();
const { dbConnection } = require('./database/config')
const mongoose = require('mongoose');

dbConnection()

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;



app.post('/chat', async (req, res) => {
    const { message, usuarioId } = req.body;
    console.log('Hola')

    if (!message || !usuarioId) {
        return res.status(400).json({ error: 'Faltan datos' });
    }

    try {
        const reply = await manejarChatConFunciones(message, usuarioId);
        res.json({ reply });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Error generando respuesta' });
    }
});
app.use('/api/events', require('./routes/events'))

app.use('/api/agenda', require('./routes/agenda'))

app.listen(port, () => {
    console.log(`🚀 Alba está escuchando en http://localhost:${port}`);
});