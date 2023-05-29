const express = require('express');
const app = express();
require('dotenv').config();

//Conexión MongoDb
const { dbConnection } = require('./database/config.js');
async function connectAtlas(){
    await dbConnection()
}
connectAtlas()

//middleware
app.use(express.json())

app.listen(process.env.PORT)
console.log(`Server listening on port ${process.env.PORT}`)