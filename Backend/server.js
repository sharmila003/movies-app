
/*const  express = require ("express")
const  mongoose = require('mongoose')
const  cors=require ("cors")
const  MoviesModel = require('./models/movies.js') 

const  app =  express()
app.use(express.json)
app.use(cors())

mongoose.connect ("mongodb://127.0.0.1:27017/movies")

app.post('./register',(req,res) =>{
   MoviesModel.create(req.body)
   .then(movies=>res.json (movies))
   .catch (err=>res.json(err))
})

app.get("/message", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
 


  app.listen(3000,() => {
    console.log("database  connected");
});*/

import 'dotenv/config'
import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
const saltRounds = 10;

// const corsOptions = {
//     origin: 'http://your-client-domain.com', // Specify the allowed origin(s)
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify allowed HTTP methods
//     allowedHeaders: 'Authorization,Content-Type', // Specify allowed headers
// };


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
const port = process.env.PORT || 3001
app.use(express.static("public"));


mongoose.connect(process.env.MONGODB_URI);

const movieSchema = new mongoose.Schema({
    email: String,
    password: String,
    bookmarked: [],
});

const Movie = mongoose.model('Movie', movieSchema);



app.post('/register', (req, res) => {
    const email = req.body.email
    const password = req.body.password

    bcrypt.hash(password, saltRounds, function (err, hash) {
        const movie = new Movie({
            email: email,
            password: hash,
        })

        movie.save()
            .then(() => {
                res.send("Saved successfully")
            })
            .catch((err) => {
                console.log(err.response.data)
            })

    });


});

function authenticate(req, res, next) {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1]
    if (!token) {
        return res.status(401).json({ msg: "Authorization Denied" });
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
        req.userId = decoded.userId;
        next()
    } catch (err) {
        res.status(401).json({ msg: "Token has expired" })

    }
}

app.post('/login', (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password

        Movie.findOne({ email: email })

            .then((foundUser) => {

                foundUser ?
                    bcrypt.compare(password, foundUser.password, function (err, result) {
                        result === true && res.json({ ACCESS_TOKEN: jwt.sign({ userId: foundUser._id }, process.env.ACCESS_TOKEN) });

                        result !== true && res.send("Invalid Email/Password")
                    }) :
                    res.send("User Not found")
            })
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

app.patch('/bookmarks', authenticate, (req, res) => {
    Movie.findById(req.userId)

        .then((foundUser) => {
            if (foundUser.bookmarked.includes(req.body.bookmarked)) {
                foundUser.bookmarked.remove(req.body.bookmarked);
                foundUser.save()

            }
            else {
                foundUser.bookmarked.push(req.body.bookmarked)
                foundUser.save()

            }
            alert('Comment saved');
        })
        .catch((err) => {
            res.send(err)
        })
});

app.get('/bookmarked', authenticate, (req, res) => {
    Movie.findById(req.userId)
        .then((found) => {
            res.send(found && found.bookmarked);
        })
})

app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})