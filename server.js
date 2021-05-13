const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();


app.use(cors());
app.use(express.json());

const port = 5000;
const uri = "mongodb+srv://CodeKiller:codekiller123@codekillers.v97wx.mongodb.net/icaf_DB?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser:true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

app.listen(port, ()=>{
    console.log(`App is running on port : ${port}`);
})