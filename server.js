const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;


mongoose.connect(MONGODB_URI, {
    useNewUrlParser:true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}, error => {
    if(error){
        console.log('Database connection failed' + error.message );
    } 
});

mongoose.connection.once('open', ()=>{
    console.log('Database connected successfully');
});

app.listen(PORT, ()=>{
    console.log(`App is running on port : ${PORT}`);
})