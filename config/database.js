//database imports 
//dotenv
require('dotenv').config();
//database
const mongoose= require('mongoose');
//url from .env
const url=process.env.MONGODB_URI;
const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true ,
   
}
const dbConnect = () => {mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('connected to the db')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })
}
module.exports = dbConnect;