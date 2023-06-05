const express = require('express');
const app = express();
require('dotenv').config();

//Conexión MongoDb
const { dbConnection } = require('./database/config.js');
async function connectAtlas(){
    await dbConnection()
}
connectAtlas()

const marca = require('./routes/marca.js')
const modelo = require('./routes/modelo.js')

//middleware
app.use(express.json())

app.use('/marca',marca)
app.use('/modelo',modelo)

app.listen(process.env.PORT)
console.log(`Server listening on port ${process.env.PORT}`)