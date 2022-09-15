//database imports 
//dotenv
require('dotenv').config();
//database
const mongoose= require('mongoose');
//url from .env
const url= process.env.DB_CONNECT;
const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
const dbConnect = () => {mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })
}
module.exports = dbConnect;