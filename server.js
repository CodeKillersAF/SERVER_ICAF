const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const AttendeeAPI = require('./routes/attendeeAPI');
const KeynoteAPI = require("./routes/keynote.route");
const WorkShopConductorAPI = require('./routes/workShopConductorAPI');
const ResearchPaperPublisherAPI = require('./routes/researchPaperPublisherAPI');
const ContactUsAPI = require('./routes/contactUsAPI');
const passport = require('passport');


dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(cors());

//inject as middleware
app.use(passport.initialize());

require('./middlewares/Validate.token')(passport);

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

app.use('/api/keynotes',KeynoteAPI());
app.use('/api/attendee', AttendeeAPI());
app.use('/api/work-shop-conductor', WorkShopConductorAPI());
app.use('/api/research-paper-publisher',ResearchPaperPublisherAPI());
app.use('/api/contact-us', ContactUsAPI());
app.use('/api/users', require('./routes/Login_Routes/User_login.route'));
app.use('/api/users', require('./routes/Protected_Routes/User_Protected.route'));
app.use('/api/users', require('./routes/Register_Routes/User_Register.route'));


app.listen(PORT, ()=>{
    console.log(`App is running on port : ${PORT}`);
})