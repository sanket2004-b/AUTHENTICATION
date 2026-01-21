require('dotenv').config();
const express = require('express');
const mongoose=require('mongoose');
const cookieParser = require('cookie-parser'); 
const path = require('path');    

const app = express();

const PORT = (process.env.PORT)|| 5000

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Connected to MongoDB"))    
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.resolve("./views")); 

app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
    res.render("layout");
});

app.use('/user', require('./routes/user'));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


