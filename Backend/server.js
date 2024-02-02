/*const  express= require("express")
const  dotEnv =require ('dotenv')
const  { MongoClient }  = require("mongodb")
 
const  app =  express()
 
const  PORT = 3000;

app.listen(PORT,() =>{
    console.log(`server  Started and running at ${PORT}`);
});*/

const  express = require ("express")
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

app.listen(3001,() => {
    console.log("database  connected");
});

