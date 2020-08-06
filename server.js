const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/user');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const user = require('./models/user');


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
    const userName = req.body.userName
    const userEmail = req.body.userEmail
    const userPassword = req.body.userPassword
    const confirmPassword = req.body.confirmPassword;

    if ( userPassword !== confirmPassword ) {
        res.send("Passwords did not match");
        return
    }
    
    const hashedPassword = await bcrypt.hash(userPassword, 8);

    try {
        await User.create({
            name: userName,
            email: userEmail,
            password: hashedPassword,
            score: 0
        });
        res.send("User Registered")
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
            res.send(["You are logged in", user[0].email]);
        } else {
            res.send("Your login details are wrong");
        }
    } else {
        res.send("Your email does not exist in the database ");  // not telling them too much ie if its email or so could say login dtails wrong
    }
});

app.post("/update/:id", async (req, res) => {
    // const score = req.body.score;
    const email = req.params.id;
    const user = await User.find({ email: email});

    await User.updateOne({email: email}, {
        score: user[0].score +1
    });
    res.send("Score was added to leaderboard")
    // res.redirect("/leaderboards");
});

app.get("/LeaderBoards", async (req,res)=> {
    const users = await User.find({})
    res.send(JSON.stringify(users.map((user)=>{
        return{
            name: user.name, 
            score: user.score
        }
    })))
    
}) 


app.listen( 7000, () => {
    console.log("Server is running on Port 7000");
});
