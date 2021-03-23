const dotenv=require('dotenv');
const mongoose=require('mongoose');
const app=require('./app');
const PORT=8000;


// require mongodb here
const connectDB = require('./db');

//Connect DB  
connectDB();

app.listen(PORT , ()=>{
    console.log(`app running on ${PORT} , server.js`)
});
