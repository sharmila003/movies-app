
const  jwt=  require("jsonwebtoken");
const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const UserModel = require('./models/user.js');
const {bookmarkedSchema} = require('./models/bookmarked.js');
const dotenv=require("dotenv");

// configuration of env
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/movies", { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.model('Bookmarked', bookmarkedSchema);
//const MANGO_URI="mongodb+srv://sharmila077:<Sharmi077>@cluster0.dhhq1ln.mongodb.net/movies";
//mongoose.connect(MANGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Database connected");
});

// Authentication middleware

const authenticate = (req, res, next) => {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    console.log("test");
    // Extract token from header
    const token = authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    
    try {
        // Verify the token
        const decoded = jwt.verify(token, 'your_secret_key_here');
        
        // Set decoded userId onto the request object
        req.userId = decoded.userId;
        
        // Proceed to the next middleware
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authenticate;

// Endpoint to add or remove bookmarks
app.patch('/bookmarks', authenticate, (req, res) => {
    UserModel.findById(req.userId)
        .then((foundUser) => {
            if (!foundUser.bookmarked) {
                foundUser.bookmarked = []; 
            }
            if (foundUser.bookmarked.includes(req.body.bookmarks)) {
                foundUser.bookmarked.remove(req.body.bookmarked);
            } else {
                foundUser.bookmarked.push(req.body.bookmarked);
            }
            return foundUser.save();
        })
        .then(() => {
            res.json({ message: 'Bookmark updated successfully' });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        });
});

// Endpoint to get bookmarks
app.get('/bookmarked', authenticate, (req, res) => {
    UserModel.findById(req.userId)
        .populate('bookmarks') 
        .then((foundUser) => {
            res.json(foundUser.bookmarked);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        });
});

app.post('/register', (req, res) => {
   console.log(req.body);
   UserModel.create(req.body)
   .then(movies => res.json(movies))
   .catch(err => res.json(err));
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    try {
        // Check if the user exists
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

       console.log(password,user.password)
       /* const isPasswordValid = await bcrypt.compare(password, user.password);*/
        if (password!==user.password) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Generate token
        const token = jwt.sign({ userId: user._id }, 'your_secret_key_here', { expiresIn: '1h' });
       
        // Send token to the client
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


app.listen(3001, () => {
    console.log("Server started on port 3001");
});


