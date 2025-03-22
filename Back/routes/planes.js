const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();


const apiusername = process.env.openSkyUsername;
const apipassword = process.env.openSkyPassword;

//Definimos nuestros endpoints
router.get('/', async (req, res) => {
    try {
        // Hacemos la petición a la API de OpenSky usando axios
        const response = await axios.get('https://opensky-network.org/api/states/all')

        const spanishflights = response.data.states.filter(plane => plane[2] === 'Spain')

        // Enviamos la respuesta con los datos obtenidos de la API
        res.status(200).json(spanishflights);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en la petición a la API' });
    }
})

module.exports = router;