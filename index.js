const express = require('express');
//const mongoose = require('mongoose');
const bodyparser = require('body-parser');
//require('dotenv').config()

const app = express();

// cors
const cors = require('cors');
var corsOptions = {
    origin: 'https://youtube-search-jc.herokuapp.com', // Reemplazar con dominio
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

// capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// Conexión a Base de datos

// import routes
const youtubeRoutes = require('./routes/youtube');

// route middlewares
app.use('/api/youtube', youtubeRoutes);
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(__dirname + "/public"));

// iniciar server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`servidor andando en: ${PORT}`)
})