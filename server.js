const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/user');

dotenv.config({path: './.env' });

const app = express();

// use in order to pass value to back-ends
app.use(express.urlencoded());
app.use(express.json());

mongoose.connect(process.env.DB_URL, {
    
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})

.then( () => console.log("MongoDB is Connected") );

app.get("/", (req, res) => {
    res.send("Hello from Node js")
});

app.post("/register", async(req, res) => {
    let userName = req.body.userName
    let userEmail = req.body.userEmail
    let userPassword = req.body.userPassword

    try {
        await User.create({
            name: userName,
            email: userEmail,
            password: userPassword
        });
        res.send("User Registered")
    } catch (error) {
        console.log(error);
        res.send("Email is already in the Database");
    }
});

app.listen( 7000, () => {
    console.log("Server is running on Port 7000");
});