const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/user');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');


dotenv.config({path: './.env' });

const app = express();

// use in order to pass value to back-ends
app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());

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
    const hashedPassword = await bcrypt.hash(userPassword, 8);

    try {
        await User.create({
            name: userName,
            email: userEmail,
            password: hashedPassword
        });
        res.send( "User Registered")
    } catch (error) {
        console.log(error);
        res.send("Email is already in the Database");
    }
});

app.post("/login", async (req, res) => {
    const email = req.body.userEmail;
    const password = req.body.userPassword
    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await User.find({ email: email});
    console.log( user );
    if ( user.length>0 ) {
                                            // password the user enters
        const isMatch = await bcrypt.compare(password, user[0].password);
        console.log( isMatch);

        if ( isMatch) {

            const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN                                              //telling them how long it will take to expire
            });

            console.log(token);

            const cookieOptions = {
                expires: new Date(
                    Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                ),
                httpOnly: true
            }

            res.cookie('jwt', token, cookieOptions);

            res.send("You are logged in");
        } else {
            res.send("Your login details are wrong");
        }
    } else {
        res.send("Your email does not exist in the database ");  // not telling them too much ie if its email or so could say login dtails wrong
    }

});


app.listen( 7000, () => {
    console.log("Server is running on Port 7000");
});