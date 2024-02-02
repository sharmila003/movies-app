const  mongoose = require ('mongoose')

const  MoviesSchema = new mongoose.Schema({
       email: String,
       password:String,
       Repeatpassword:String
})

const  MoviesModel = mongoose.model("movies",MoviesSchema)


module.exports = MoviesModel