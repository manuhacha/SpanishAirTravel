const express = require('express');
const router = express.Router();
const axios = require('axios')

//Definimos nuestros endpoints
router.get('/', async(req,res) => {
    try {

        //Hacemos nuestra petición a la API de OpenSky
        const response = await axios.get('https://opensky-network.org/api/states/all');

        res.status(200).json(response.data);

    } catch(error) {
        console.log(error)
    }
})

module.exports = router;