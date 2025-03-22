const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const planes = require('./routes/planes');
app.use(cors());
app.use(express.json());

//Definimos nuestro endpoint planes
app.use('/api/v1/planes/',planes);

const port = 3000;
//Iniciamos backend en el puerto 3000
app.listen(port, () => {
    console.log('Listening on port: ' + port)
})


//Nos conectamos a nuestra BBDD MongoDB
mongoose.connect('mongodb://localhost/SpanishAirTravel', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'),)
    .catch(error => console.log(error));